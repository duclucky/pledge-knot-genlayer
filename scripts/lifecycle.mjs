/** Five sequential pools. Real finality, no mocks, exact native delivery proofs. */
import {parseUnits} from 'viem';
import {actors,client,read,balance,gen,save,verifyNetwork,identity,transaction,wait,SafeError,safeError,EXPLORER} from './network.mjs';
import {receiptState,safeReceipt} from './receipt.mjs';
import {loadJournal,sendJournal,nativeReceipt} from './journal.mjs';
import {quoteWrite} from './fees.mjs';
import {contractArgs} from './contract-args.mjs';
import {externalDeliveryProof} from './external-delivery.mjs';
import {cases,validateMeaning,withdrawalPlan,successfulAgreementCount} from './demo-cases.mjs';
import {recoveryPlan} from './recovery-policy.mjs';
const GEN=10n**18n,sleep=n=>new Promise(r=>setTimeout(r,n));
async function main(){
 const network=await verifyNetwork(),deployment=await loadJournal('deployment.json'),sourceIdentity=await identity();
 if(deployment?.status!=='FINALIZED'||deployment.executionResult!=='SUCCESS'||deployment.sourceSha256!==sourceIdentity.sourceSha256)throw new SafeError('SuccessfulCurrentDeploymentRequired');
 const accounts=await actors(),target=deployment.address;
 const pool=id=>read(target,'get_pool',[id]).then(JSON.parse),accounting=()=>read(target,'get_accounting').then(JSON.parse);
 const snapshot=async(id,absent=false,owner)=>({observedAt:new Date().toISOString(),pool:absent?null:await pool(id),accounting:await accounting(),nativeContractGEN:gen(await balance(target)),...owner?{recipient:owner.address,recipientBalanceGEN:gen(await balance(owner.address)),ownCredit:await read(target,'get_credit',[id,owner.address])}:{}});
 if(!process.argv.includes('--execute')){console.log(JSON.stringify({mode:'inspect',network,target,accounting:await accounting(),cases:Object.keys(cases)}));return;}
 const smoke=await loadJournal('caller-spoof-smoke.json');
 if(!smoke?.passed||smoke.target?.toLowerCase()!==target.toLowerCase())throw new SafeError('AuthoritySmokeRequiredBeforeGEN');
 async function outcome(hash){
  let last='';
  for(let i=0;i<180;i++){
   const tx=await transaction(hash),state=receiptState(tx);
   if(state.status!==last){console.log(JSON.stringify({hash,...state}));last=state.status;}
   if(state.status==='FINALIZED')return tx;
   if(['UNDETERMINED','CANCELED','LEADER_TIMEOUT','VALIDATORS_TIMEOUT'].includes(state.status))throw new SafeError('ConsensusRequiresInspection');
   await sleep(6000);
  }
  throw new SafeError('TransactionStillPending');
 }
 async function write(key,actor,method,args,value=0n,success=true){
  const name='lifecycle-'+key+'.json',id=args[0],owner=method==='withdraw_credit'?actor:undefined;
  let record=await loadJournal(name);
  if(record&&(record.target?.toLowerCase()!==target.toLowerCase()||record.actor?.toLowerCase()!==actor.address.toLowerCase()||record.operation!==method||JSON.stringify(record.args)!==JSON.stringify(args)||record.valueGEN!==gen(value)||record.expectedSuccess!==success))throw new SafeError('LifecycleJournalIdentityMismatch');
  if(record?.verified){console.log(JSON.stringify({recovered:key,hash:record.hash}));return record;}
  if(!record){
   const before=await snapshot(id,method==='create_pool',owner);
   const fees=success?await quoteWrite(actor,target,method,args,value):await client(actor).estimateTransactionFees();
   record=await sendJournal(name,{...network,identity:sourceIdentity,target,operation:method,actor:actor.address,args,valueGEN:gen(value),feeDepositGEN:gen(fees.feeValue),expectedSuccess:success,before},()=>client(actor).writeContract({address:target,functionName:method,args:contractArgs(method,args),value,fees}));
  }
  const tx=await outcome(record.hash),state=receiptState(tx);await nativeReceipt(record.hash);
  if(state.successful!==success||(!success&&state.execution!=='ERROR'))throw new SafeError('UnexpectedLifecycleExecution');
  record.after=await snapshot(id,false,owner);record.receipt=safeReceipt(tx);
  if(!success&&JSON.stringify([record.before.pool,record.before.accounting,record.before.nativeContractGEN])!==JSON.stringify([record.after.pool,record.after.accounting,record.after.nativeContractGEN]))throw new SafeError('RejectedWriteChangedCanonicalState');
  Object.assign(record,{status:'FINALIZED',executionResult:state.execution,finalizedObservedAt:new Date().toISOString(),explorer:EXPLORER+'/tx/'+record.hash,verified:true});
  await save(name,record);console.log(JSON.stringify({step:key,hash:record.hash,execution:state.execution,phase:record.after.pool.phase,accounting:record.after.accounting}));return record;
 }
 async function withdraw(kind,step,plans=withdrawalPlan(kind),prefix=kind){
  const key=prefix+'-exit'+step,c=cases[kind],plan=plans[step],actor=accounts[plan.owner],amount=plan.amount;
  const record=await write(key,actor,'withdraw_credit',[c.id,amount]),name='delivery-'+key+'.json',old=await loadJournal(name);
  if(old){if(old.parentHash!==record.hash||!old.balanceProven||!old.externalReceipt?.messageValueDelivered)throw new SafeError('SavedDeliveryMismatch');return;}
  const expected=parseUnits(record.before.nativeContractGEN,18)-BigInt(amount)*GEN;
  for(let i=0;i<40&&await balance(target)!==expected;i++)await sleep(3000);
  const after=await snapshot(c.id,false,actor),parent=await transaction(record.hash),budget=await loadJournal('fee-budget.json');
  const reservation=budget?.entries?.[record.hash];if(!reservation)throw new SafeError('MissingSignedFeeReservation');
  const increase=parseUnits(after.recipientBalanceGEN,18)-parseUnits(record.before.recipientBalanceGEN,18);
  const proof={checkedAt:new Date().toISOString(),parentHash:record.hash,recipient:actor.address,expectedTransferGEN:String(amount),contractBeforeGEN:record.before.nativeContractGEN,contractAfterGEN:after.nativeContractGEN,recipientBeforeGEN:record.before.recipientBalanceGEN,recipientAfterGEN:after.recipientBalanceGEN,recipientNetIncreaseGEN:gen(increase),reservedFeeUpperBoundGEN:reservation.totalGEN,creditAfter:after.ownCredit,externalReceipt:externalDeliveryProof(parent,actor.address,String(amount))};
  proof.balanceProven=parseUnits(proof.contractBeforeGEN,18)-parseUnits(proof.contractAfterGEN,18)===BigInt(amount)*GEN&&increase>=BigInt(amount)*GEN-parseUnits(reservation.totalGEN,18);
  await save(name,proof);if(!proof.balanceProven)throw new SafeError('ExactNativeRecipientDeliveryUnproven');
  console.log(JSON.stringify({delivery:key,contractDecreaseGEN:String(amount),recipient:actor.address,balanceProven:true}));
 }
 async function runCase(kind){
  const c=cases[kind],old=await loadJournal('lifecycle-'+kind+'-create.json');
  const deadline=Math.floor(Date.now()/1000)+(kind==='partial'?120:kind==='unclear'?600:7200);
  const args=old?.args??[c.id,...accounts.map(a=>a.address),accounts[0].address,c.target,deadline];
  await write(kind+'-create',accounts[0],'create_pool',args);
  const p=await pool(c.id);
  for(let i=0;i<c.count;i++)await write(kind+'-pledge'+i,accounts[i],'pledge',[c.id,p.definition_digest,...c.pledges[i]],GEN);
  if(kind!=='partial'){
   const review=await write(kind+'-adjudicate',accounts[0],'adjudicate',[c.id]),name='semantic-'+kind+'.json',prior=await loadJournal(name);
   if(!prior){
    const current=await pool(c.id),attempt=JSON.parse(await read(target,'get_attempt',[c.id,current.attempts])),core=JSON.parse(await read(target,'get_core',[c.id]));
    validateMeaning(kind,current,attempt,core);
    const tx=await transaction(review.hash),completedAgree=successfulAgreementCount(tx);
    if(completedAgree<1)throw new SafeError('IndependentSuccessfulValidatorRequired');
    const observation={checkedAt:new Date().toISOString(),pool:current,attempt,core,completedIndependentAgree:completedAgree,reviewHash:review.hash};
    if(kind!=='unclear')observation.matrix=JSON.parse(await read(target,'get_matrix',[c.id]));
    await save(name,observation);console.log(JSON.stringify({meaning:kind,phase:current.phase,computed:core.computed_mask,funded:core.funded_mask,completedIndependentAgree:completedAgree}));
   }else if(prior.reviewHash!==review.hash||prior.pool.definition_digest!==p.definition_digest)throw new SafeError('SavedSemanticIdentityMismatch');
  }
  if(['unclear','partial'].includes(kind)){
   const current=await pool(c.id);
   if(['OPEN','READY','RETRYABLE'].includes(current.phase))while(Date.now()<current.deadline*1000){const remaining=current.deadline*1000-Date.now();console.log(JSON.stringify({waitingFor:kind+' expiry',seconds:Math.ceil(remaining/1000)}));await sleep(Math.min(30000,remaining));}
   await write(kind+'-recover',accounts[0],'recover',[c.id]);
  }
  if(kind==='pair'){
   await write('pair-double-settlement-rejected',accounts[0],'adjudicate',[c.id],0n,false);
   await write('pair-wrong-credit-owner-rejected',accounts[1],'withdraw_credit',[c.id,1],0n,false);
  }
  for(let i=0;i<withdrawalPlan(kind).length;i++)await withdraw(kind,i);
  await write(kind+'-close',accounts[0],'close_pool',[c.id]);
  const final=await snapshot(c.id);
  if(final.pool.phase!=='CLOSED'||final.pool.locked!=='0 GEN'||final.pool.credits!=='0 GEN'||final.pool.received!==c.count+' GEN'||final.pool.withdrawn!==c.count+' GEN'||final.nativeContractGEN!=='0')throw new SafeError('CaseZeroLiabilityRequired');
  await save('case-'+kind+'-final.json',final);
 }
 if(process.argv.includes('--recover-cycle')||process.argv.includes('--recover-unclear')){
  if(process.argv.includes('--recover-cycle')&&process.argv.includes('--recover-unclear'))throw new SafeError('OneRecoveryScopeRequired');
  const kind=process.argv.includes('--recover-unclear')?'unclear':'cycle',prefix=kind+'-recovery';
  const c=cases[kind],current=await pool(c.id),expectedId=kind==='unclear'?c.id:'pk-cycle-v1',plan=recoveryPlan(current,Math.floor(Date.now()/1000),accounts.map(a=>a.address),expectedId);
  if(plan.recover)await write(prefix,accounts[0],'recover',[c.id]);
  for(let i=0;i<plan.withdrawals.length;i++){
   const step=plan.withdrawals[i],credit=await read(target,'get_credit',[c.id,accounts[step.owner].address]);
   if(credit==='0 GEN'&&!await loadJournal('lifecycle-'+prefix+'-exit'+i+'.json'))throw new SafeError('UnjournaledRecoveryWithdrawal');
   await withdraw(kind,i,plan.withdrawals,prefix);
  }
  if(current.phase!=='CLOSED')await write(prefix+'-close',accounts[0],'close_pool',[c.id]);
  const final=await snapshot(c.id);
  if(final.pool.phase!=='CLOSED'||final.pool.locked!=='0 GEN'||final.pool.credits!=='0 GEN'||final.pool.withdrawn!=='3 GEN'||final.nativeContractGEN!=='0'||!final.accounting.invariant)throw new SafeError('RecoveryZeroLiabilityRequired');
  for(let i=0;i<3;i++){
   const proof=await loadJournal('delivery-'+prefix+'-exit'+i+'.json');
   if(!proof?.balanceProven||!proof.externalReceipt?.messageValueDelivered||proof.expectedTransferGEN!=='1'||proof.recipient?.toLowerCase()!==accounts[i].address.toLowerCase())throw new SafeError('EachRecoveryRecipientProofRequired');
  }
  await save(prefix+'-final.json',final);console.log(JSON.stringify({recoveryComplete:true,scope:kind,fullLifecyclePassed:false,...final}));return;
 }
 const selected=process.argv.find(x=>x.startsWith('--case='))?.slice(7)??'all';
 if(selected!=='all'&&!cases[selected])throw new SafeError('UnknownDemoCase');
 for(const kind of selected==='all'?Object.keys(cases):[selected])await runCase(kind);
 const final={...network,target,checkedAt:new Date().toISOString(),pools:[],accounting:await accounting(),nativeContractGEN:gen(await balance(target)),feeBudget:await loadJournal('fee-budget.json')};
 for(const c of Object.values(cases)){try{final.pools.push(await pool(c.id));}catch{if(selected==='all')throw new SafeError('ExpectedPoolMissing');}}
 if(selected==='all'){
  const old=await pool('pk-unclear-v2'),escrow=await loadJournal('escrow-budget.json');
  if(old.phase!=='CLOSED'||old.resolved||old.attempts!==0||old.received!=='3 GEN'||old.withdrawn!=='3 GEN'||old.locked!=='0 GEN'||old.credits!=='0 GEN')throw new SafeError('FailedAnnexZeroLiabilityRequired');
  if(final.pools.length!==5||final.pools.some(p=>p.phase!=='CLOSED')||final.pools.reduce((n,p)=>n+parseUnits(p.received.replace(' GEN',''),18),0n)!==13n*GEN||!final.accounting.invariant||final.accounting.received!=='16 GEN'||final.accounting.withdrawn!=='16 GEN'||final.accounting.locked!=='0 GEN'||final.accounting.credits!=='0 GEN'||final.nativeContractGEN!=='0'||escrow?.capGEN!=='22'||escrow.reservedGEN!=='22')throw new SafeError('CompleteFiveCasesPlusFailedAnnexAndCumulativeBudgetRequired');
  final.extraNegativePool=old;final.cumulativeEscrow=escrow;
  final.fullLifecyclePassed=true;
 }
 await save('lifecycle-final-state.json',final);console.log(JSON.stringify(final));
}
try{await main();}catch(error){console.log(JSON.stringify({lifecycleStopped:safeError(error)}));process.exitCode=1;}
