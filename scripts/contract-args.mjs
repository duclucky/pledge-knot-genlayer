/** Convert only ABI Address positions; ordinary declaration text stays text. */
import {CalldataAddress} from 'genlayer-js/types';
import {hexToBytes} from 'viem';
export function contractArgs(name,args){
 const result=[...args],positions=name==='create_pool'?[1,2,3,4]:name==='get_credit'?[1]:[];
 for(const index of positions){
  if(result[index] instanceof CalldataAddress)continue;
  if(typeof result[index]!=='string'||!/^0x[0-9a-fA-F]{40}$/.test(result[index])||/^0x0{40}$/i.test(result[index]))throw Error('InvalidContractAddressArgument');
  result[index]=new CalldataAddress(hexToBytes(result[index]));
 }
 return result;
}
