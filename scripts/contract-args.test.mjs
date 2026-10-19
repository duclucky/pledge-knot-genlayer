import {test} from 'node:test';
import assert from 'node:assert/strict';
import {abi} from 'genlayer-js';
import {CalldataAddress} from 'genlayer-js/types';
import {contractArgs} from './contract-args.mjs';
test('real SDK encodes all four pool addresses with distinct Address wire tags',()=>{
 const roles=['a','b','c','d'].map(c=>'0x'+c.repeat(40));
 const args=['pool',...roles,2,1893456600];
 const decoded=abi.calldata.decode(abi.calldata.encode(abi.calldata.makeCalldataObject('create_pool',contractArgs('create_pool',args)))).get('args');
 for(const i of [1,2,3,4])assert.ok(decoded[i] instanceof CalldataAddress);
 assert.equal(decoded[0],'pool');assert.equal(Number(decoded[5]),2);assert.deepEqual(args.slice(1,5),roles);
 assert.ok(contractArgs('get_credit',['pool',roles[0]])[1] instanceof CalldataAddress);
});
test('bad or zero address fails before signing; declaration text remains byte-for-byte text',()=>{
 for(const value of ['bad','0x123','0x'+'0'.repeat(40)])assert.throws(()=>contractArgs('get_credit',['pool',value]));
 const args=['pool','digest','0x'+'a'.repeat(40),'fund French translation'];
 assert.deepEqual(contractArgs('pledge',args),args);
});
