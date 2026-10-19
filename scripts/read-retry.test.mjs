import {test} from 'node:test';
import assert from 'node:assert/strict';
import {retryRead} from './read-retry.mjs';
import {safeError} from './network.mjs';
test('only a recognized fetch connection failure is retried without signing',async()=>{
 let calls=0;const pauses=[];
 const result=await retryRead(async()=>{if(++calls===1)throw new TypeError('fetch failed');return 'canonical';},{pause:async n=>pauses.push(n)});
 assert.equal(result,'canonical');assert.equal(calls,2);assert.deepEqual(pauses,[10000]);
});
test('recognized read timeout has a bounded four-attempt ceiling',async()=>{
 let calls=0;const error=new DOMException('timed out','TimeoutError');
 await assert.rejects(retryRead(async()=>{calls++;throw error;},{pause:async()=>{}}));assert.equal(calls,4);
});
test('programming TypeError never silently retries',async()=>{
 let calls=0;await assert.rejects(retryRead(async()=>{calls++;throw new TypeError('wrong shape');},{pause:async()=>assert.fail('no retry')}));assert.equal(calls,1);
});
test('diagnostic projects only recognized transport markers and no private message',()=>{
 const error=new TypeError('fetch failed',{cause:{code:'ECONNRESET',node_config:'PRIVATE_DIAGNOSTIC'}}),result=safeError(error);
 assert.equal(result.markers.fetchFailed,true);assert.equal(result.transportCode,'ECONNRESET');
 assert.equal(JSON.stringify(result).includes('PRIVATE_DIAGNOSTIC'),false);assert.equal(JSON.stringify(result).includes('node_config'),false);
});
