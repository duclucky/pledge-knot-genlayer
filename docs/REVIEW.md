# PledgeKnot review after the completed Studio Dev lifecycle

Observed 2026-10-19 22:20 UTC / 2026-10-20 Bangkok. One reusable contract,
six writes, eight views. No contract behavior was changed in this review.

| Criterion | Finding and concrete proof |
|---|---|
|Meaning validator|PASS. _judge independently fetches the fixed context and reclassifies all six directed relations. _signature compares normalized class meanings and the derived core; reason wording is ignored. A changed edge with the same core rejects. test_semantic_validator_replay_all_edges_not_only_same_core and test_v2_judge_scopes_each_relation_and_validator_replays_all_six pass. Four actual reviews have completed independent agreeing executions in lifecycle-audit.json.|
|State and types|PASS. Pool/pledge/attempt/cell/credit storage is entity keyed; money uses bigint; immutable named roles, target and digest precede deposits. Append-only attempts and explicit OPEN/READY/RETRYABLE/terminal/CLOSED states are inspected through canonical views. Local isolation tests and all six closed V2 pools verify the boundary.|
|Failure handling|PASS within the specified boundary. Bad caller/state/value/digest, malformed output, duplicate settlement/withdrawal and invalid settlement meaning reject without accounting mutation. Missing context yields non-penalizing retry; malformed model output cannot allocate. Live duplicate adjudication and wrong-credit-owner calls failed unchanged.|
|Every safety row|PASS. All six complete cards existed in the initial specification commit9bb5e95, before source commit46110a1. Six retained test-first RED/GREEN batches cover forbidden transitions and accounting. V2 changes only the judge; write bodies retain those rules.|
|Temporal entrypoints|PASS. create_pool bounds its future deadline; pledge and adjudicate independently require now<deadline; recover independently requires now>=deadline plus payer/state conditions. Tests use boundary-1/equality/+1 with stale phase and unchanged rejected state. Earned withdrawal and zero-liability closure have documented time-independent legality. Live expiry recoveries are reread by the audit.|
|Value destinations|PASS. Code derives every grant/refund from locked roles and validated classes; no model-supplied amount or recipient is accepted. withdraw_credit debits the owner's ledger before the EVM transfer boundary. Audit independently verifies14 V2 native decreases and delivered-recipient messages totaling16GEN; all6pools/native/locked/credits close at zero. V1 separately recovered6GEN.|
|Reusable trust problem|PASS. A biased coordinator could select semantic support edges and thereby charge conditional donors. Neutral meaning judgment is essential; deterministic closure alone cannot supply those edges. The same public API supports the three proposed treasury/grant integrations in README, without an app or copied judge. No adoption is claimed.|
|Authenticity tripwire|PASS. Pool configuration and pledges are constitutive onchain acts, authenticated by actual native sender, exact deposit, once-only named slot and full pool digest. No claimant file can prove external work. W3C vocabulary is fetched at the fixed versioned HTTPS origin, with byte checks before interpretation. Wrong actor/pool/digest, injected authority/payout text and forged source tests cannot allocate. See the four-row authority matrix and tests.|

Safe improvements applied: replace the illustrative example with actual pair
and failed-target results; update stale execution claims and counts; link each
claim to canonical network evidence; retain every failed input and frozen oracle.
No source, validator, classification rule or grader was loosened.

Command `node scripts/audit.mjs` returned `Result: SUCCESS`, auditPassed=true,
acceptedCases5, extraNegativeCases1, operations52, successfulSemanticReviews4,
exactNativeExits14, totalV2WithdrawnGEN16, cumulativeV1V2WithdrawnGEN22.
Native/locked/credits are0, invariant=true. Reserved signed-fee upper bound is
0.633753753600786752GEN within the unchanged1GEN cap, not actual fee spending.
Full record: evidence/studio-dev/lifecycle-audit.json. Local check output:
evidence/local/check.txt,122Python+26Node passed,0failed/0skipped.

Limits: exactly three donors and fixed1GEN pledges; six model questions per
independent evaluation; ambiguous inputs, source changes or model disagreement
can prevent allocation and require expiry recovery. Two preserved live failures
disprove any universal stability claim. No independent security audit, external
delivery proof, adoption, global novelty guarantee or Portal acceptance is proved.
Explorer address/deploy URLs returned HTTP200; RPC proves successful deployment
and exact code. Browser visual inspection remains unavailable because local
browser use is disabled in Work settings. No screenshot proof is claimed for V2.
