/** Read-only audit of V1 recovery, explicitly not the five-case acceptance audit. */
import {readFile} from 'node:fs/promises';
import {parseUnits} from 'viem';
import {client,read,balance,gen,transaction,verifyNetwork,save,SafeError,safeError,sourcePath,sha} from './network.mjs';
import {loadJournal} from './journal.mjs';
import {receiptState} from './receipt.mjs';
import {externalDeliveryProof} from './external-delivery.mjs';
async function main(){
 const network=await verifyNetwork(),deployment=await loadJournal('deployment.json');
 if(!deployment?.address)throw new SafeError('DeploymentRequired');
 const target=deployment.address,code=await client().getContractCode(target);
 if(code!==await readFile(sourcePath,'utf8')||sha(code)!==deployment.sourceSha256)throw new SafeError('RecoverySourceMismatch');
 const pair=JSON.parse(await read(target,'get_pool',['pk-pair-v1'])),cycle=JSON.parse(await read(target,'get_pool',['pk-cycle-v1']));
 const accounting=JSON.parse(await read(target,'get_accounting')),native=gen(await balance(target));
 for(const p of [pair,cycle])if(p.phase!=='CLOSED'||p.received!=='3 GEN'||p.withdrawn!=='3 GEN'||p.locked!=='0 GEN'||p.credits!=='0 GEN')throw new SafeError('RecoveredPoolClosureMismatch');
 if(cycle.resolved!==false||cycle.attempts!==0||!pair.resolved||pair.attempts!==1)throw new SafeError('RecoveryCannotBeClaimedAsSemanticSettlement');
 const operations=[];
 for(const key of ['cycle-recovery','cycle-recovery-exit0','cycle-recovery-exit1','cycle-recovery-exit2','cycle-recovery-close']){
  const j=await loadJournal('lifecycle-'+key+'.json');
  if(!j?.verified||j.target?.toLowerCase()!==target.toLowerCase()||j.args?.[0]!==cycle.id||j.valueGEN!=='0')throw new SafeError('RecoveryOperationIdentityMismatch');
  const tx=await transaction(j.hash),state=receiptState(tx);
  if(!state.successful||(tx.from_address??tx.sender)?.toLowerCase()!==j.actor.toLowerCase())throw new SafeError('RecoveryOperationNotFinalizedSuccessfully');
  if(key==='cycle-recovery'&&(j.operation!=='recover'||j.before.pool.deadline>Math.floor(Date.parse(j.preparedAt)/1000)||!cycle.donors.includes(j.actor.toLowerCase())))throw new SafeError('RecoveryTimeOrCallerMismatch');
  if(key==='cycle-recovery-close'&&j.operation!=='close_pool')throw new SafeError('RecoveryCloseMethodMismatch');
  operations.push({key,hash:j.hash,actor:j.actor,...state});
 }
 const exits=[];
 for(let i=0;i<3;i++){
  const key='cycle-recovery-exit'+i,j=await loadJournal('lifecycle-'+key+'.json'),p=await loadJournal('delivery-'+key+'.json');
  if(j.operation!=='withdraw_credit'||j.args[1]!==1||j.actor.toLowerCase()!==cycle.donors[i]||p?.parentHash!==j.hash||p.recipient?.toLowerCase()!==cycle.donors[i]||p.expectedTransferGEN!=='1'||!p.balanceProven||parseUnits(p.contractBeforeGEN,18)-parseUnits(p.contractAfterGEN,18)!==10n**18n)throw new SafeError('ExactRecoveryExitMismatch');
  const delivered=externalDeliveryProof(await transaction(j.hash),cycle.donors[i],'1');
  if(!delivered.messageValueDelivered||await read(target,'get_credit',[cycle.id,cycle.donors[i]])!=='0 GEN')throw new SafeError('RecoveryDeliveryOrCreditMismatch');
  exits.push({hash:j.hash,recipient:cycle.donors[i],valueGEN:'1',exactNativeDecrease:true,delivered:true});
 }
 const budget=await loadJournal('fee-budget.json');
 if(accounting.received!=='6 GEN'||accounting.withdrawn!=='6 GEN'||accounting.locked!=='0 GEN'||accounting.credits!=='0 GEN'||!accounting.invariant||native!=='0'||budget.capGEN!=='1'||parseUnits(budget.reservedGEN,18)>10n**18n)throw new SafeError('RecoveredGlobalAccountingMismatch');
 const result={command:'node scripts/recovery-audit.mjs',observedAt:new Date().toISOString(),...network,target,scope:'V1 pair plus failed-cycle recovery only; not the five-case lifecycle acceptance',sourceSha256:sha(code),codeMatchesDeployment:true,pair,cycle,operations,exits,accounting,nativeContractGEN:native,feeCapGEN:budget.capGEN,reservedFeeUpperBoundGEN:budget.reservedGEN,recoveryPassed:true,fullLifecyclePassed:false};
 await save('cycle-recovery-audit.json',result);
 console.log(JSON.stringify({recoveryPassed:true,fullLifecyclePassed:false,operations:operations.length,exactNativeRefunds:exits.length,accounting,nativeContractGEN:native,reservedFeeUpperBoundGEN:budget.reservedGEN}));
}
try{await main();}catch(e){console.log(JSON.stringify({recoveryAuditStopped:safeError(e)}));process.exitCode=1;}
