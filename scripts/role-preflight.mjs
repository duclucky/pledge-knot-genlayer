/** Reads only project and authorized parent configuration; never creates keys. */
import {privateKeyToAccount} from 'viem/accounts';
import {configuration,verifyNetwork,balance,gen,save,safeError} from './network.mjs';
const record={at:new Date().toISOString(),scope:'Read-only role discovery; no key generation, funding, signing or broadcast.',network:await verifyNetwork()};
try{
 const config=await configuration();
 const names=['STUDIONET_PRIVATE_KEY',config.PLEDGEKNOT_DONOR1_PRIVATE_KEY?'PLEDGEKNOT_DONOR1_PRIVATE_KEY':'STUDIONET_INTEGRATOR_PRIVATE_KEY',config.PLEDGEKNOT_DONOR2_PRIVATE_KEY?'PLEDGEKNOT_DONOR2_PRIVATE_KEY':'STUDIONET_STEWARD_PRIVATE_KEY'];
 record.roles=[];
 for(let i=0;i<names.length;i++){
  const key=config[names[i]],valid=typeof key==='string'&&/^0x[0-9a-fA-F]{64}$/.test(key);
  const account=valid?privateKeyToAccount(key):null;
  record.roles.push({role:'D'+i,configurationPresent:!!key,validKey:valid,address:account?.address??null,balanceGEN:account?gen(await balance(account.address)):null});
 }
 record.distinctRoles=new Set(record.roles.filter(r=>r.address).map(r=>r.address.toLowerCase())).size;
 record.ready=record.roles.every(r=>r.validKey)&&record.distinctRoles===3;
}catch(error){record.ready=false;record.error=safeError(error);}
await save('role-preflight.local.json',record);console.log(JSON.stringify(record));process.exitCode=record.ready?0:1;
