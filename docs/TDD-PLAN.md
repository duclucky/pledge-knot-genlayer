# Test-first implementation and proof plan

No implementation body may be completed before its safety negatives are run.
All work is local until admission/spec,lint,metadata and bounded runtime gates
pass. Do not ship permissive staging code or use live funds to debug it.

For every batch save command,test IDs,source SHA and full RED output under the
ignored .codex/tdd/ directory,then implement,run the same cases GREEN and save
output. RED must be an expected assertion/behavior failure (for example a
no-op method fails an expected unauthorized-call rejection),not missing imports,
syntax,fixtures or an unrelated not-implemented exception. No tests deleted or
critical cases skipped. End each completed batch with full npm run check.

1. Establish coherent imports,storage dataclasses,constructor,canonical views,
   time/accounting helpers and independent pure core/normalization tests.
2. create_pool: before body completion,test wrong caller,bad/duplicate/closed
   entity,invalid actors/target/time,nonpayable metadata and accounting corruption.
3. pledge: with a real valid pool,test wrong signer/digest,wrong state,duplicate,
   already terminal/closed,bad value,stale-phase deadline boundaries and unchanged
   accounting. Setup must not depend on the incomplete method under test.
4. adjudicate: with real funded pledges,test wrong caller/state,duplicate/closed,
   exhausted attempts,deadline,malformed and shape-valid wrong meaning,wrong
   source/authentication,accounting faults and no double credit. Test actual
   independent validator replay separately from direct leader execution.
5. recover: test wrong caller/state,duplicate/terminal/closed,expiry-1/equality/+1
   with stale phase,partial/full/unknown/empty actor interests and conservation.
6. withdraw_credit: create earned credits through working settlement/recovery;
   test wrong owner,state/zero,invalid/excess amount,duplicate/closed and corrupt
   ledgers. Test debit-before-correct-EVM-message and overlapping recipient/donor.
7. close_pool: test wrong caller,live/terminal states,remaining reserve/credit,
   duplicate closure and corrupt accounting before completing its body.
8. Run complete semantic/temporal/accounting suite,real SDK address boundary,
   raw+normalized receipt fixtures and safe secret projections. Reconcile exact
   test count. Only then do exact-source runtime smoke and authorized lifecycles.

Required proof assertions:per-pool/global received=locked+credits+withdrawn;
own credits sum exactly even with recipient overlap;every retained donor has a
covered peer in final core;every feasible subset lies within computed greatest
core;no model-selected payout or recipient;unknown/source failure allocates
nothing;rejected operations preserve canonical state. All64 directed binary
graphs and eight masks use an independent subset feasibility oracle.
