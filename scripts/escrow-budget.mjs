import {SafeError} from './network.mjs';
export function reserveEscrow(budget,hash,amountGEN){
 if(!budget||!['19','22'].includes(budget.capGEN)||!budget.entries||typeof budget.entries!=='object'||!/^(?:0|[1-9][0-9]*)$/.test(budget.reservedGEN)||!/^0x[0-9a-fA-F]{64}$/.test(hash)||!['0','1'].includes(amountGEN))throw new SafeError('InvalidEscrowBudget');
 const cap=Number(budget.capGEN);
 const amounts=Object.values(budget.entries);
 if(amounts.some(v=>v!=='1')||amounts.length!==Number(budget.reservedGEN)||amounts.length>cap)throw new SafeError('EscrowBudgetAccountingMismatch');
 if(Object.hasOwn(budget.entries,hash)){
  if(budget.entries[hash]!==amountGEN)throw new SafeError('EscrowBudgetReplayMismatch');
  return budget;
 }
 if(amountGEN==='0')return budget;
 if(amounts.length+1>cap)throw new SafeError('AuthorizedEscrowBudgetExceeded');
 return {capGEN:budget.capGEN,reservedGEN:String(amounts.length+1),entries:{...budget.entries,[hash]:amountGEN}};
}
