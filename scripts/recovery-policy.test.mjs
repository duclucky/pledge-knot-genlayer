import {test} from 'node:test';
import assert from 'node:assert/strict';
import {recoveryPlan} from './recovery-policy.mjs';
const donors=['a','b','c'];
const ready={id:'pk-cycle-v1',donors,phase:'READY',deadline:100,pledged_mask:7,received:'3 GEN',locked:'3 GEN',credits:'0 GEN',withdrawn:'0 GEN'};
test('recovery cannot bypass expiry at boundary minus one; equality is eligible',()=>{
 assert.throws(()=>recoveryPlan(ready,99,donors),/RecoveryDeadlineNotReached/);
 for(const now of [100,101])assert.deepEqual(recoveryPlan(ready,now,donors),{recover:true,withdrawals:donors.map((address,owner)=>({address,owner,amount:1}))});
});
test('recovery refuses finalized allocation, unexpected value, and actor mismatch',()=>{
 for(const invalid of [{phase:'FUNDED'},{phase:'REFUNDED'},{locked:'2 GEN'},{received:'4 GEN'},{pledged_mask:3}])assert.throws(()=>recoveryPlan({...ready,...invalid},101,donors));
 assert.throws(()=>recoveryPlan(ready,101,['a','a','c']));
});
test('expired recovery resumes withdrawals without another recovery; closed needs zero liability',()=>{
 assert.equal(recoveryPlan({...ready,phase:'EXPIRED',locked:'0 GEN',credits:'2 GEN',withdrawn:'1 GEN'},101,donors).recover,false);
 assert.deepEqual(recoveryPlan({...ready,phase:'CLOSED',locked:'0 GEN',credits:'0 GEN',withdrawn:'3 GEN'},101,donors),{recover:false,withdrawals:[]});
 assert.throws(()=>recoveryPlan({...ready,phase:'CLOSED'},101,donors));
});
test('explicit V2 unclear recovery keeps the same expiry, payer and accounting guards',()=>{
 for(const id of ['pk-unclear-v2','pk-unclear-v2b']){
 const pool={...ready,id};
 assert.equal(recoveryPlan(pool,101,donors,id).recover,true);
 assert.throws(()=>recoveryPlan(pool,99,donors,id),/RecoveryDeadlineNotReached/);
 assert.throws(()=>recoveryPlan(pool,101,donors,'pk-cycle-v1'));
 assert.throws(()=>recoveryPlan({...pool,phase:'FUNDED'},101,donors,id));
 assert.throws(()=>recoveryPlan({...pool,id:'other'},101,donors,'other'));
 }
});
