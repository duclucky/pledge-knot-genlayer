/** Frozen protocol declarations, not receipts or proof of external work. */
import {SafeError} from './network.mjs';
export const edgeIds=['D0:D1','D0:D2','D1:D0','D1:D2','D2:D0','D2:D1'];
const pair=[
 ['Financial support for creating openly downloadable documentation with accessible text.','Support for public accessibility testing of documentation.'],
 ['Financial backing for public accessibility testing of documentation.','Support for creating freely downloadable documentation.'],
 ['Backing only closed proprietary advertising analytics.','Support for shipping physical medical equipment.']
];
const cycle=[
 [
  "Funding only the publication of original English training manuals for free public download. This pledge excludes translation work and accessibility testing.",
  "Funding translation of training manuals into French for free public download."
 ],
 [
  "Financial backing solely for translating training manuals into French and making those translations freely downloadable. This pledge excludes publishing original English manuals and performing accessibility tests.",
  "Funding public accessibility testing of documentation."
 ],
 [
  "Funding only public accessibility tests of documentation. This pledge excludes publishing original English manuals and translating manuals into French.",
  "Funding publication of original English training manuals for free public download."
 ]
];
const unclear=[
 ['Support for creating freely downloadable documentation.','Support for the activity defined only in unavailable annex Q. No activity meaning is specified here.'],
 ['Support for public accessibility testing of documentation.','Support for creating freely downloadable documentation.'],
 ['Backing only closed proprietary advertising analytics.','Support for shipping physical medical equipment.']
];
const pairVector=['COVERED','NOT_COVERED','COVERED','NOT_COVERED','NOT_COVERED','NOT_COVERED'];
export const cases={
 pair:{id:'pk-pair-v2',target:2,pledges:pair,count:3,classes:pairVector,computed:3,funded:3,phase:'FUNDED',credits:[2,0,1]},
 cycle:{id:'pk-cycle-v2',target:3,pledges:cycle,count:3,classes:['COVERED','NOT_COVERED','NOT_COVERED','COVERED','COVERED','NOT_COVERED'],computed:7,funded:7,phase:'FUNDED',credits:[3,0,0]},
 target:{id:'pk-target-v2',target:3,pledges:pair,count:3,classes:pairVector,computed:3,funded:0,phase:'REFUNDED',credits:[1,1,1]},
 unclear:{id:'pk-unclear-v2',target:2,pledges:unclear,count:3,classes:['UNCLEAR','UNCLEAR','COVERED','NOT_COVERED','NOT_COVERED','NOT_COVERED'],computed:0,funded:0,phase:'RETRYABLE',credits:[1,1,1]},
 partial:{id:'pk-partial-v2',target:2,pledges:pair,count:1,credits:[1,0,0]}
};
export function validateMeaning(kind,pool,attempt,core){
 const c=cases[kind];
 if(!c?.classes||pool.id!==c.id||pool.phase!==c.phase||attempt.stage!=='OK'||attempt.definition_digest!==pool.definition_digest||attempt.cells?.length!==6)throw new SafeError('CanonicalSemanticObservationMismatch');
 for(let i=0;i<6;i++)if(attempt.cells[i].id!==edgeIds[i]||attempt.cells[i].class!==c.classes[i])throw new SafeError('ObservedMeaningNeedsInspection');
 if(core.computed_mask!==c.computed||core.funded_mask!==c.funded||core.resolved!==(kind!=='unclear')||pool.locked!==(kind==='unclear'?'3 GEN':'0 GEN')||pool.credits!==(kind==='unclear'?'0 GEN':'3 GEN'))throw new SafeError('SemanticConsequenceMismatch');
 return true;
}
export function successfulAgreementCount(tx){
 const rows=tx?.consensus_data?.validators;
 return Array.isArray(rows)?rows.filter(x=>x?.mode==='validator'&&x.vote==='agree'&&x.execution_result==='SUCCESS').length:0;
}
export function withdrawalPlan(kind){
 const c=cases[kind];if(!c)throw new SafeError('UnknownDemoCase');
 return c.credits.flatMap((n,i)=>n===3?[{owner:i,amount:2},{owner:i,amount:1}]:n?[{owner:i,amount:n}]:[]);
}
