import {test} from 'node:test';
import assert from 'node:assert/strict';
import {reserveEscrow} from './escrow-budget.mjs';
const hash=n=>'0x'+n.toString(16).padStart(64,'0');
test('nineteen cumulative GEN includes recovered deposits; twentieth stops before broadcast',()=>{
 let b={capGEN:'19',reservedGEN:'0',entries:{}};
 for(let i=1;i<=19;i++)b=reserveEscrow(b,hash(i),'1');
 assert.equal(b.reservedGEN,'19');assert.equal(Object.keys(b.entries).length,19);
 assert.throws(()=>reserveEscrow(b,hash(20),'1'),/AuthorizedEscrowBudgetExceeded/);
});
test('hash resumption and zero-value writes never reserve another deposit',()=>{
 const b=reserveEscrow({capGEN:'19',reservedGEN:'6',entries:Object.fromEntries(Array.from({length:6},(_,i)=>[hash(i+1),'1']))},hash(7),'1');
 assert.equal(reserveEscrow(b,hash(7),'1'),b);assert.equal(reserveEscrow(b,hash(8),'0'),b);
 assert.throws(()=>reserveEscrow(b,hash(7),'0'),/EscrowBudgetReplayMismatch/);
});
test('missing baseline, wrong cap, fractional deposit and corrupt sum fail closed',()=>{
 for(const b of [null,{capGEN:'20',reservedGEN:'0',entries:{}},{capGEN:'19',reservedGEN:'1',entries:{}}])assert.throws(()=>reserveEscrow(b,hash(1),'1'));
 assert.throws(()=>reserveEscrow({capGEN:'19',reservedGEN:'0',entries:{}},hash(1),'0.5'));
});
