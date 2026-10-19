import {test} from 'node:test';
import assert from 'node:assert/strict';
import {cases,edgeIds,validateMeaning,successfulAgreementCount,withdrawalPlan} from './demo-cases.mjs';
const observation=kind=>{const c=cases[kind],pool={id:c.id,phase:c.phase,definition_digest:'bound',locked:kind==='unclear'?'3 GEN':'0 GEN',credits:kind==='unclear'?'0 GEN':'3 GEN'};return [pool,{stage:'OK',definition_digest:'bound',cells:edgeIds.map((id,i)=>({id,class:c.classes[i]}))},{computed_mask:c.computed,funded_mask:c.funded,resolved:kind!=='unclear'}];};
test('fixture expectations never accept an edge swap just because core totals match',()=>{
 for(const kind of ['pair','cycle','target','unclear'])assert.equal(validateMeaning(kind,...observation(kind)),true);
 const args=observation('pair');args[1].cells[1].class='COVERED';assert.throws(()=>validateMeaning('pair',...args));
 const extra=observation('pair');extra[1].cells.push(extra[1].cells[0]);assert.throws(()=>validateMeaning('pair',...extra));
});
test('all five fixed withdrawal schedules conserve the authorized 13 GEN with only 1/2 GEN exits',()=>{
 let total=0;for(const kind of Object.keys(cases)){
  const plan=withdrawalPlan(kind);assert.ok(plan.every(x=>[1,2].includes(x.amount)));
  assert.equal(plan.reduce((n,x)=>n+x.amount,0),cases[kind].count);total+=cases[kind].count;
 }
 assert.equal(total,13);assert.deepEqual(withdrawalPlan('cycle'),[{owner:0,amount:2},{owner:0,amount:1}]);
});
test('idle or shape-only validator rows cannot establish independent successful agreement',()=>{
 assert.equal(successfulAgreementCount({consensus_data:{validators:[{mode:'validator',vote:'agree',execution_result:'SUCCESS'},{mode:'validator',vote:'idle',execution_result:'ERROR'},{mode:'leader',vote:'agree',execution_result:'SUCCESS'}]}}),1);
 assert.equal(successfulAgreementCount({}),0);
});
