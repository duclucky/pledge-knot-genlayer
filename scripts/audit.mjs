/** Read-only reconciliation of exact code, canonical entities and native exits. */
import {readFile,readdir} from 'node:fs/promises';
import {parseUnits} from 'viem';
import {evidence,sourcePath,sha,rpc,client,read,balance,gen,transaction,verifyNetwork,save,SafeError,safeError} from './network.mjs';
import {loadJournal} from './journal.mjs';
import {receiptState} from './receipt.mjs';
import {externalDeliveryProof} from './external-delivery.mjs';
import {cases,validateMeaning,withdrawalPlan,successfulAgreementCount} from './demo-cases.mjs';
async function main(){
 const network=await verifyNetwork(),deployment=await loadJournal('deployment.json'),final=await loadJournal('lifecycle-final-state.json');
 if(!deployment||!final?.fullLifecyclePassed||final.target?.toLowerCase()!==deployment.address?.toLowerCase())throw new SafeError('CompletedDeploymentAndLifecycleRequired');
 const target=deployment.address,code=await client().getContractCode(target),local=await readFile(sourcePath,'utf8');
 if(code!==local||sha(code)!==deployment.sourceSha256||!receiptState(await transaction(deployment.hash)).successful)throw new SafeError('ExactDeployedSourceOrSuccessMismatch');
 const schema=await rpc('gen_getContractSchema',[target]);
 const methods=Object.entries(schema.methods??{}).map(([name,m])=>({name,payable:m.payable===true,readonly:m.readonly===true})).sort((a,b)=>a.name.localeCompare(b.name));
 if(methods.length!==14||methods.filter(m=>m.readonly).length!==8||methods.filter(m=>m.payable).length!==1||!methods.find(m=>m.name==='pledge'&&m.payable&&!m.readonly))throw new SafeError('DeployedMetadataMismatch');
 await save('schema-metadata.json',{at:new Date().toISOString(),...network,address:target,methods,passed:true});
 const pools=[],semantics=[],operations=[],deliveries=[],required=[];
 for(const [kind,c]of Object.entries(cases)){
  const p=JSON.parse(await read(target,'get_pool',[c.id]));
  if(p.phase!=='CLOSED'||p.locked!=='0 GEN'||p.credits!=='0 GEN'||p.received!==c.count+' GEN'||p.withdrawn!==c.count+' GEN'||p.target!==c.target+' GEN'||p.pledged_mask!==(1<<c.count)-1||new Set(p.donors).size!==3||p.recipient.toLowerCase()!==deployment.actor.toLowerCase())throw new SafeError('PoolPolicyOrClosureMismatch');
  const pledges=[];
  for(let i=0;i<3;i++){
   const pledge=JSON.parse(await read(target,'get_pledge',[c.id,'D'+i]));
   if(pledge.funded!==(i<c.count)||pledge.payer!==p.donors[i]||await read(target,'get_credit',[c.id,p.donors[i]])!=='0 GEN')throw new SafeError('ActualPayerOrRemainingCreditMismatch');
   if(pledge.funded&&(pledge.amount!=='1 GEN'||pledge.purpose!==c.pledges[i][0]||pledge.peer_required!==c.pledges[i][1]||pledge.timestamp>=p.deadline||!/^[a-f0-9]{64}$/.test(pledge.pledge_digest)))throw new SafeError('CanonicalPledgeBindingMismatch');
   pledges.push(pledge);
  }
  pools.push({...p,pledges});
  required.push('lifecycle-'+kind+'-create.json');
  for(let i=0;i<c.count;i++)required.push('lifecycle-'+kind+'-pledge'+i+'.json');
  if(kind!=='partial'){
   required.push('lifecycle-'+kind+'-adjudicate.json');
   const s=await loadJournal('semantic-'+kind+'.json'),j=await loadJournal('lifecycle-'+kind+'-adjudicate.json');
   if(!s||p.attempts!==1)throw new SafeError('SemanticEvidenceMissing');
   validateMeaning(kind,s.pool,s.attempt,s.core);
   const attempt=JSON.parse(await read(target,'get_attempt',[c.id,p.attempts])),core=JSON.parse(await read(target,'get_core',[c.id]));
   if(JSON.stringify(attempt)!==JSON.stringify(s.attempt)||JSON.stringify(core)!==JSON.stringify(s.core))throw new SafeError('CanonicalSemanticHistoryChanged');
   const tx=await transaction(j.hash),agree=successfulAgreementCount(tx);
   if(!receiptState(tx).successful||agree<1)throw new SafeError('IndependentSuccessfulValidatorMissing');
   const votes={agree:0,disagree:0,idle:0,other:0};
   for(const vote of Object.values(tx.consensus_data?.votes??{})){const key=String(vote).toLowerCase();votes[Object.hasOwn(votes,key)?key:'other']++;}
   semantics.push({case:kind,hash:j.hash,attempt,core,phaseAfterReview:s.pool.phase,successfulIndependentValidators:agree,votes});
  }
  if(['partial','unclear'].includes(kind))required.push('lifecycle-'+kind+'-recover.json');
  for(let i=0;i<withdrawalPlan(kind).length;i++)required.push('lifecycle-'+kind+'-exit'+i+'.json');
  required.push('lifecycle-'+kind+'-close.json');
  console.log(JSON.stringify({auditedPool:c.id,phase:p.phase,received:p.received,withdrawn:p.withdrawn}));
 }
 required.push('lifecycle-pair-double-settlement-rejected.json','lifecycle-pair-wrong-credit-owner-rejected.json');
 if(required.length!==42||new Set(required).size!==42)throw new SafeError('ExactOperationPlanMismatch');
 const names=await readdir(evidence);
 for(const name of required){
  if(!names.includes(name))throw new SafeError('RequiredOperationMissing');
  const j=await loadJournal(name),tx=await transaction(j.hash),state=receiptState(tx);
  if(!j.verified||j.target?.toLowerCase()!==target.toLowerCase()||state.status!=='FINALIZED'||state.successful!==j.expectedSuccess||(tx.from_address??tx.sender)?.toLowerCase()!==j.actor.toLowerCase())throw new SafeError('FinalizedOperationOrActorMismatch');
  operations.push({file:name,operation:j.operation,hash:j.hash,actor:j.actor,valueGEN:j.valueGEN,expectedSuccess:j.expectedSuccess,...state});
  if(operations.length%10===0)console.log(JSON.stringify({auditedOperations:operations.length}));
 }
 for(const name of names.filter(n=>/^delivery-.+\.json$/.test(n))){
  const p=await loadJournal(name),message=externalDeliveryProof(await transaction(p.parentHash),p.recipient,p.expectedTransferGEN);
  if(!p.balanceProven||parseUnits(p.contractBeforeGEN,18)-parseUnits(p.contractAfterGEN,18)!==parseUnits(p.expectedTransferGEN,18)||!message.messageValueDelivered)throw new SafeError('NativeDeliveryProofMismatch');
  deliveries.push({file:name,parentHash:p.parentHash,recipient:p.recipient,valueGEN:p.expectedTransferGEN,exactNativeDecrease:true,externalMessageDelivered:true});
 }
 const accounting=JSON.parse(await read(target,'get_accounting')),native=gen(await balance(target)),budget=await loadJournal('fee-budget.json');
 if(deliveries.length!==11||deliveries.reduce((n,p)=>n+parseUnits(p.valueGEN,18),0n)!==13n*10n**18n||accounting.received!=='13 GEN'||accounting.withdrawn!=='13 GEN'||accounting.locked!=='0 GEN'||accounting.credits!=='0 GEN'||!accounting.invariant||native!=='0'||budget.capGEN!=='1'||parseUnits(budget.reservedGEN,18)>10n**18n)throw new SafeError('FinalAccountingDeliveryOrBudgetMismatch');
 const record={at:new Date().toISOString(),command:'node scripts/audit.mjs',...network,target,sourceSha256:sha(code),codeMatchesDeployment:true,deploymentResult:'SUCCESS',recognizedMethods:14,pools,semantics,operations,deliveries,accounting,nativeContractGEN:native,feeCapGEN:'1',reservedFeeUpperBoundGEN:budget.reservedGEN,passed:true};
 await save('lifecycle-audit.json',record);console.log('Result: SUCCESS');console.log(JSON.stringify({auditPassed:true,pools:5,operations:42,semanticReviews:4,exactNativeExits:11,totalWithdrawnGEN:'13',accounting,nativeContractGEN:native,reservedFeeUpperBoundGEN:budget.reservedGEN}));
}
try{await main();}catch(error){console.log(JSON.stringify({auditStopped:safeError(error)}));process.exitCode=1;}
