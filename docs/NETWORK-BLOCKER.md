# PledgeKnot - blocked at Phase 7

2026-10-19. NOT COMPLETE / NOT SUBMITTED. No further demo deposits.
The deployed contract, frozen oracle and semantic validator are unchanged.
Historical admission PASS is not current execution PASS.

## Verified network result

Contract: [Studio Dev61997](https://explorer-studio-dev.genlayer.com/address/0x312185Ec90dF0B86CC7996d7d6D978aaa7694BdD).
Source SHA256: c483e13de92446f54b2b548f4614cbcf7380fbe08aee984ec9b73bec3c51343f.

`node scripts/lifecycle.mjs --execute --case=pair` produced canonical semantic
agreement with two completed agreeing validators. The fixed recipient withdrew
2 GEN and excluded donor withdrew1 GEN. Each has exact contract-balance decrease
and delivered-recipient proof. Pool CLOSED, received/withdrawn3GEN, liability0.
See evidence/studio-dev/semantic-pair.json, delivery-pair-exit0.json,
delivery-pair-exit1.json and case-pair-final.json.

`node scripts/lifecycle.mjs --execute --case=cycle` stopped at
[adjudication](https://explorer-studio-dev.genlayer.com/tx/0x44d8a35e6adc9f0e0e132fc19bda9a7e2e80d1985e31c75eb758bfadcdba440d).
FINALIZED / MAJORITY_DISAGREE / leader execution SUCCESS. Consensus did not apply
the leader's changes. Its six classes were:
`COVERED, NOT_COVERED, UNCLEAR, COVERED, COVERED, NOT_COVERED`.
The frozen oracle expected NOT_COVERED at D1:D0. D1 asks for accessibility testing;
D0 supports freely downloadable manuals. Broad publication does not explicitly
exclude testing, so assuming a definite NOT_COVERED was not stable in live review.
This is a semantic/oracle ambiguity, not evidence of a network outage. No blind
adjudication retry, oracle relabeling or weaker equivalence check was used.

Read-only final verification (`read(get_pool)`, `read(get_accounting)`,
`eth_getBalance`, and allowlisted `eth_getTransactionByHash` projection) saved
evidence/studio-dev/blocked-state.json at 14:49:29 UTC:

- pair: MAJORITY_AGREE, successful=true, CLOSED, liability0;
- cycle: MAJORITY_DISAGREE, successful=false, READY, attempts0, unresolved;
- cycle locked3 GEN, credits0 GEN; native contract balance3 GEN;
- global received6 GEN, withdrawn3 GEN, locked3 GEN, accounting invariant=true.

Target-failure, unavailable-annex and partial-funding cases have not started.
Phase7/Gate13 execution remains blocked; Phase8-10 are not skipped or completed.
Return to Phase2/4 for viability/spec reassessment after handling existing funds.

## Recovery still pending

Immutable deadline: 1792425214, **2026-10-19 15:53:34 UTC** /
**22:53:34 Bangkok**. Recovery before that time is forbidden by the contract.
No contract-clock bypass or new deployment can release this pool early.

After the deadline, from this project:

```powershell
node scripts/lifecycle.mjs --execute --recover-cycle
```

This mode verifies original donors, exact current source/network and existing
authority smoke, then calls recover by the actual funded D0, returns each donor
1 GEN via its own signed withdrawal, checks each exact native decrease and
delivered-recipient message, and closes at zero liability. It never adjudicates,
creates a pool or receives another deposit. The existing1GEN aggregate fee cap
and hash-before-broadcast journal apply. Resuming inspects existing hashes.
Missing or ambiguous operation/delivery proof stops recovery instead of signing
an extra withdrawal. An already closed pool must still have all three delivery
proofs before recoveryComplete can be reported.

Before expiry the real command returned RecoveryDeadlineNotReached, exit1;
the signed-fee journal was unchanged and no write was broadcast (14:54:16 UTC).
The policy tests pass, but actual refund execution awaits expiry. No
background execution or scheduled wake-up has been created. Planned recovery
is not transfer proof. Do not label the3GEN recovered until canonical closure,
balance and all three recipient proofs exist.

## Receipt fix and objective checker

The old parser incorrectly accepted FINALIZED + leader SUCCESS despite
MAJORITY_DISAGREE. Its meaningful failing regression is preserved locally;
the fixed parser requires MAJORITY_AGREE when result_name exists. Real pair
and cycle receipts now map to true and false respectively. No contract or
grader code changed. Required local verification is documented separately.

Original checker, no SkipDynamic:

```powershell
pwsh -NoProfile -File ../tools/genlayer-grading-bot/genlayer-precheck.ps1 -Project "D:/Genlayer Project/pledge-knot" -Category intelligent-contracts -ExplorerUrl "https://explorer-studio-dev.genlayer.com/address/0x312185Ec90dF0B86CC7996d7d6D978aaa7694BdD"
```

Real output: static0 BLOCKER,0 WARN; npm run check PASS; gltest PASS;
deployed explorer address OK; repository/Studio contract URL MISS;
VERDICT GATE OK - address MISSING items; exit0.
The unchanged orchestrator SHA256 before/after is
0e90ae93c72c9464b4b995db6896cf08ea8f8d14b66a847156012f830e896746.
This automated0BLOCKER does not establish lifecycle completion or manual
acceptance. Public repo/CI and submission packet are pending. No final Submit.
