import {test} from 'node:test';
import assert from 'node:assert/strict';
import {serializeTransaction,parseUnits} from 'viem';
import {feeReservation,reserveFees} from './fee-budget.mjs';
const tx=(valueGEN='1.01')=>serializeTransaction({type:'legacy',chainId:61997,nonce:0,to:'0x'+'a'.repeat(40),gas:100000n,gasPrice:1000000000n,value:parseUnits(valueGEN,18)});
const h='0x'+'1'.repeat(64),h2='0x'+'2'.repeat(64);
test('reserve actual encoded gas upper bound separately from application GEN',()=>{
 const r=feeReservation(tx(),'0.01','1');assert.equal(r.gasGEN,'0.0001');assert.equal(r.totalGEN,'0.0101');
 assert.throws(()=>feeReservation(tx(),'0.01','2'));
});
test('cap violation stops before broadcast; hash replay reserves exactly once',()=>{
 const first=reserveFees(null,h,{feeGEN:'0.7',gasGEN:'0.1',totalGEN:'0.8'});
 assert.equal(first.reservedGEN,'0.8');
 assert.deepEqual(reserveFees(first,h,{feeGEN:'0.7',gasGEN:'0.1',totalGEN:'0.8'}),first);
 assert.throws(()=>reserveFees(first,h2,{feeGEN:'0.2',gasGEN:'0.1',totalGEN:'0.3'}));
 assert.throws(()=>reserveFees(first,h,{feeGEN:'0.1',gasGEN:'0',totalGEN:'0.1'}));
 assert.equal(first.reservedGEN,'0.8');
});
test('verified zero EVM gas price still reserves positive GenLayer fees',()=>{
 const signed=serializeTransaction({type:'legacy',chainId:61997,nonce:0,to:'0x'+'a'.repeat(40),gas:200000n,gasPrice:0n,value:parseUnits('0.01',18)});
 assert.deepEqual(feeReservation(signed,'0.01','0'),{feeGEN:'0.01',gasGEN:'0',totalGEN:'0.01'});
});
