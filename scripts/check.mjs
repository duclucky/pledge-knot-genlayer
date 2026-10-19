import {spawnSync} from 'node:child_process';
import {existsSync,readdirSync,readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const win=process.platform==='win32';
const python=win?'.venv/Scripts/python.exe':'.venv/bin/python';
if(!existsSync(python))throw Error('Project Python 3.12 virtual environment required');
const run=(command,args)=>{
 const result=spawnSync(command,args,{stdio:'inherit',windowsHide:true,env:{...process.env,PYTHONUTF8:'1'}});
 if(result.error)throw result.error;
 if(result.status!==0)process.exit(result.status??1);
};
for(const name of readdirSync('scripts').filter(p=>p.endsWith('.mjs')))run(process.execPath,['--check','scripts/'+name]);
for(const name of readdirSync('contracts').filter(p=>p.endsWith('.py')))run(python,['scripts/genvm_lint_rc.py','check','contracts/'+name]);
run(win?'.venv/Scripts/gltest.exe':'.venv/bin/gltest',['tests/']);
const scriptTests=readdirSync('scripts').filter(p=>p.endsWith('.test.mjs')).map(p=>'scripts/'+p);
if(scriptTests.length)run(process.execPath,['--test',...scriptTests]);
mkdirSync('.codex',{recursive:true});
writeFileSync('.codex/last-check.json',JSON.stringify({at:new Date().toISOString(),command:'npm run check',exitCode:0,sourceSha256:createHash('sha256').update(readFileSync('contracts/pledge_knot.py')).digest('hex')},null,2)+'\n');
console.log('PLEDGEKNOT_CHECK_PASS: semantic lint, direct tests and applicable script tests.');
