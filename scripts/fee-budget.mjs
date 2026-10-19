/** Persisted upper bounds include fee deposits and EVM gas before broadcast. */
import {parseTransaction,parseUnits,formatUnits} from 'viem';
import {SafeError} from './network.mjs';
export function feeReservation(serialized,feeGEN,applicationGEN){
 const tx=parseTransaction(serialized),fee=parseUnits(feeGEN,18),application=parseUnits(applicationGEN,18);
 // viem omits a legacy gasPrice field when its RLP integer is zero.
 const price=tx.type==='legacy'?(tx.gasPrice??0n):tx.maxFeePerGas;
 if(tx.chainId!==61997||!tx.gas||typeof price!=='bigint'||price<0n||fee<=0n||application<0n||application>2n*10n**18n||tx.value!==fee+application)throw new SafeError('SignedFeeEnvelopeMismatch');
 const gas=tx.gas*price;
 return {feeGEN:formatUnits(fee,18),gasGEN:formatUnits(gas,18),totalGEN:formatUnits(fee+gas,18)};
}
export function reserveFees(budget,txHash,reservation){
 if(!/^0x[0-9a-fA-F]{64}$/.test(txHash))throw new SafeError('InvalidBudgetTransactionHash');
 const current=budget??{capGEN:'1',reservedGEN:'0',entries:{}};
 if(current.capGEN!=='1'||!current.entries||typeof current.entries!=='object')throw new SafeError('InvalidFeeBudget');
 let sum=0n;
 for(const entry of Object.values(current.entries)){
  const fee=parseUnits(entry.feeGEN,18),gas=parseUnits(entry.gasGEN,18),total=parseUnits(entry.totalGEN,18);
  if(fee<=0n||gas<0n||total!==fee+gas)throw new SafeError('InvalidFeeBudgetEntry');
  sum+=total;
 }
 if(sum!==parseUnits(current.reservedGEN,18))throw new SafeError('FeeBudgetAccountingMismatch');
 if(current.entries[txHash]){
  if(JSON.stringify(current.entries[txHash])!==JSON.stringify(reservation))throw new SafeError('FeeBudgetReplayMismatch');
  return current;
 }
 const fee=parseUnits(reservation.feeGEN,18),gas=parseUnits(reservation.gasGEN,18),total=parseUnits(reservation.totalGEN,18);
 if(fee<=0n||gas<0n||total!==fee+gas)throw new SafeError('InvalidFeeBudgetEntry');
 if(sum+total>10n**18n)throw new SafeError('AuthorizedFeeBudgetExceeded');
 return {capGEN:'1',reservedGEN:formatUnits(sum+total,18),entries:{...current.entries,[txHash]:reservation}};
}
