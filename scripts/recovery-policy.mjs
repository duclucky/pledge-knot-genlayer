import {SafeError} from './network.mjs';
export function recoveryPlan(pool,now,donors,expectedId='pk-cycle-v1'){
 if(donors.length!==3||new Set(donors.map(a=>a.toLowerCase())).size!==3||pool.donors?.some((a,i)=>a.toLowerCase()!==donors[i].toLowerCase())||pool.donors?.length!==3)throw new SafeError('RecoveryDonorMismatch');
 if(!['pk-cycle-v1','pk-unclear-v2'].includes(expectedId)||pool.id!==expectedId||pool.pledged_mask!==7||pool.received!=='3 GEN')throw new SafeError('UnexpectedRecoveryPool');
 const units=x=>/^[0-3] GEN$/.test(x)?Number(x[0]):NaN;
 if(pool.phase==='CLOSED'){
  if(pool.locked!=='0 GEN'||pool.credits!=='0 GEN'||pool.withdrawn!=='3 GEN')throw new SafeError('ClosedRecoveryLiability');
  return {recover:false,withdrawals:[]};
 }
 if(pool.phase==='EXPIRED'){
  if(pool.locked!=='0 GEN'||units(pool.credits)+units(pool.withdrawn)!==3)throw new SafeError('ExpiredRecoveryAccountingMismatch');
 }else{
  if(!['OPEN','READY','RETRYABLE'].includes(pool.phase)||pool.locked!=='3 GEN'||pool.credits!=='0 GEN'||pool.withdrawn!=='0 GEN')throw new SafeError('RecoveryStateForbidden');
  if(!Number.isSafeInteger(now)||!Number.isSafeInteger(pool.deadline)||now<pool.deadline)throw new SafeError('RecoveryDeadlineNotReached');
 }
 return {recover:pool.phase!=='EXPIRED',withdrawals:donors.map((address,owner)=>({address,owner,amount:1}))};
}
