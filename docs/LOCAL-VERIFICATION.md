# Local verification and unsigned compatibility

Observed 2026-10-19. This is not deployed-lifecycle proof.

Command: `npm run check` (PYTHONUTF8=1, own Python3.12 virtual environment).
Observed exit0, recognized PledgeKnotContract with14 methods:8 view,6 write.
Python:111 passed. Node:7 passed,0 failed,0 skipped. Source SHA256:
`c483e13de92446f54b2b548f4614cbcf7380fbe08aee984ec9b73bec3c51343f`.
Full local run: ignored `.codex/tdd/09-fixture-preservation-check.txt`.

```text
Lint passed (3 checks)
Validation passed
  Contract: PledgeKnotContract
  Methods: 14 (8 view, 6 write)
111 passed in 21.77s
tests 7
pass 7
fail 0
PLEDGEKNOT_CHECK_PASS: semantic lint, direct tests and applicable script tests.
```

Coverage includes caller/pool isolation, exact1GEN deposits, immutable roles and
digest, independent semantic validator replay, changed edge with unchanged core,
malicious output coverage/IDs/enums/payout fields, unavailable/changed source,
prompt-injection boundaries, deadlines -1/equality/+1 with stale phase,
partial/unknown expiry, duplicate settlement/recovery/withdrawal, recipient/donor
overlap, debit-before-EVM-message, zero-liability closure and metadata/ASCII.
One test enumerates512 graph/mask cases using independent subset feasibility;
1024 target/conservation checks cover both targets. These are assertions inside
the111 test count, not another1536 pytest cases.

## Test-first chronology

For each method the safety card existed first. Before completing the body,
the focused suite ran against a no-op staging body and failed on observable
behavior (DID NOT RAISE or wrong canonical result), not an import/setup error.
No staging revision was deployed or published. Full RED logs and source SHA
records remain in ignored `.codex/tdd/`. Commands used own `.venv/Scripts/gltest.exe`
on `tests/direct/test_pledgeknot.py` with the selectors below.

|Batch / selector|Observed RED|Next full check GREEN|Pre-body source SHA256|
|---|---|---|---|
|01: initial helpers + create safety|10 failed,1 deselected|11 passed|3e32e46cd333d951e0d6138f7e6b2bf5969e5784dfe9f50a656ff20a8c84553b|
|02: test_pledge_safety or test_pledge_deadline or test_three_real_pledges|18 failed,11 deselected|29 passed|c7df7620090d31117e74dbbe6cee24994c9e56367d5ca908dd499826d409ea25|
|03: adjudicate or semantic_validator|24 failed,29 deselected|53 passed|7e094dac78b997427487e7b99c3f616e50ed1d1325c0b3a1ce42baa20521ddb4|
|04: recover|20 failed,53 deselected|73 passed|6c816bf4fd69cde6177dddFf89c51330b387577c0dc97ced62fe3bfda3f759d3|
|05: withdraw or recipient_overlaps|13 failed,73 deselected|86 passed|3b3f760f76ffabbf42f8cc55af40f73c615d5c73f98e2a05d376ee3de5601fc4|
|06: close|9 failed,5 passed,81 deselected|95 passed|2d0073e0224a941c4d9fe412b4883f9427ac6d1c755e3d9149f9aa51d12e552b|

An unavailable-source test initially registered a second web mock behind a
matching success mock. Direct mode uses the first match; clearing mocks before
the503 case fixed that fixture. The failed run is retained. A script check
also initially lacked its external-delivery module; the dependency was restored,
then all checks passed. Neither failure is counted as meaningful TDD RED.

The authoritative HTML fixture is losslessly gzip-compressed so upstream
whitespace stays intact and git diff --check remains strict. Decompression must
produce exactly181875 bytes and SHA256
`af187a2c26b2429a579039403f34d9a5d5f29a1e01019662043068fa1ca2beaa`.
It is a local HTTP mock, never authority for an outside-work/payment claim.

## Unsigned target compatibility

Command: `node scripts/runtime-probe.mjs`.
Observed Studio Dev chain61997; exact-source schema14 methods; constructor
`executionResult: SUCCESS`; `passed: true`.
See `evidence/studio-dev/runtime-probe.json` for source commit/SHA and methods.
No key loading, signing, funding or broadcast occurs in this probe.

## Historical pre-authorization execution boundary

Read-only command: `node scripts/role-preflight.mjs`.
Observed all three authorized configuration roles present but `distinctRoles:1`,
`ready:false`. No secret values are printed. Local role/balance details are ignored.
The contract requires three actual distinct payers; one EOA must not impersonate
three donors. Owner authorization is needed to use two other existing demo EOAs
and for any required native funding. No wallets were generated and no GEN moved.

Pending: real deployment, bounded signed authority smoke, five funded lifecycles,
every native balance/recipient proof, zero closure, public repository/CI, unchanged
objective grader NO BLOCKER and submission fields. Admission PASS is not execution PASS.

Pre-deployment original checker command (PowerShell7, no SkipDynamic):
`pwsh -NoProfile -File ../tools/genlayer-grading-bot/genlayer-precheck.ps1 -Project <this child> -Category intelligent-contracts`.
Observed0 static BLOCKER,0 WARN; npm run check PASS; gltest PASS. It still reports
MISSING repository/Studio URL and deployed Explorer URL. Its automatic text
heuristic mistakes this unsigned constructor SUCCESS for deployment evidence;
that inference is false and is not accepted here. The real acceptance command
with a verified deployed address has not run. No checker file was changed.

## Runtime compatibility notes

genvm-linter0.11.1rc2 AST rules predate the v0.3 sandbox/storage rename.
scripts/genvm_lint_rc.py registers run_nondet_default as the safe entrypoint with
both closures traversed and recognizes gl.storage.allow. It disables no safety
check; semantic validation still loads the pinned SDK and recognizes the actual
project class. No grading-bot file is changed. Generic Windows direct-mode,
receipt, fee and journaling infrastructure is reused from the workspace; the
conditional cofunding state machine, contributor closure and tests are new.

## Current checkpoint, 2026-10-19

The role blocker above was resolved by explicit owner approval of two existing
EOAs, 13 GEN total sequential escrow and a 1 GEN aggregate fee cap. Deployment,
signed native-sender smoke and the pair case have real Studio Dev evidence.
The cycle case failed MAJORITY_DISAGREE; it is not successful settlement despite
leader execution SUCCESS. See NETWORK-BLOCKER.md. No new wallets/funding occurred.

Receipt regression: `.codex/tdd/17-disagreement-red.txt` reproduces finalized
MAJORITY_DISAGREE incorrectly accepted as success. The parser now additionally
requires accepted consensus when result_name is present; normalized receipts
retain their tested interpretation. `.codex/tdd/17-disagreement-green.txt`:
112 Python tests, 18 Node tests passed, no skips. Read-only network verification
shows pair MAJORITY_AGREE successful=true and cycle MAJORITY_DISAGREE
successful=false, with cycle canonical state unchanged (blocked-state.json).

Recovery-policy RED: `node --test scripts/recovery-policy.test.mjs` with the
unimplemented policy, log `.codex/tdd/18-recovery-red.txt`. Three focused tests
now pass: expiry -1/equality/+1, forbidden state/value/actor mismatches, and
expired/closed resumability. Required final check includes these three tests.
The deployed contract source is unchanged; this change only protects tooling.

Final command `npm run check`, log `.codex/tdd/18-recovery-green.txt`:
112 Python tests passed in20.90s,21 Node tests passed,0 failed,0 skipped,
PLEDGEKNOT_CHECK_PASS,exit0. Lint recognizes PledgeKnotContract with14 methods.
`node scripts/lifecycle.mjs --execute --recover-cycle` at14:54:16UTC returned
RecoveryDeadlineNotReached,exit1; fee-budget SHA unchanged, no broadcast.
This proves early refusal, not completed recovery.

## Recovery and unsigned repair reassessment, 2026-10-19

`node scripts/lifecycle.mjs --execute --recover-cycle` completed5 finalized
operations after expiry,3 exact1GEN refunds and zero closure at16:21UTC.
`node scripts/recovery-audit.mjs` independently reread source/receipts/state:
recoveryPassed=true,fullLifecyclePassed=false,operations5,exactNativeRefunds3;
global received6GEN,withdrawn6GEN,locked0GEN,credits0GEN,native0,invariant=true.
See evidence/studio-dev/cycle-recovery-audit.json. Existing1GEN fee cap retained;
reserved signed-fee upper bound0.309102232800227744GEN,not actual fee expenditure.

`.codex/reassessment-probe.mjs` used the exact production judge on a new frozen
explicit-scope cycle:1run failed expected D1:D2,computed core0. Failure retained.
`.codex/cellwise-probe.mjs` tested one directed relation at a time with same
coverage definitions:2runs new cycle+2original pair+2original unavailable-annex,
36/36 normalized cells matched frozen oracles. No expected labels in model
input, no key/signing/broadcast or GEN. This is unsigned feasibility only, not
live independent consensus. Public sanitized records: evidence/local/reassessment-*.
V2 production behavior/scope changes await approval; see PROPOSED-V2.md.
