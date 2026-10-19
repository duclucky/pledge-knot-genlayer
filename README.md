# PledgeKnot

A standalone GenLayer Intelligent Contract for mutually conditional cofunding.
Three named contributors escrow 1 GEN each with a declared funding purpose and
a required co-backer purpose. Independent validators interpret all six directed
relationships. Deterministic code computes the greatest support-closed group;
it funds one fixed recipient only if that viable group meets the locked target.
Excluded contributors, failed targets and expired unresolved pools refund the
actual payers. No organizer or model supplies recipients or payout amounts.

Status: deployed on Studio Dev; five-case lifecycle verification in progress.
This repository is contract-only: no user-facing app, hosted frontend or Vercel.
See [specification](docs/README.md) and [test-first plan](docs/TDD-PLAN.md).
See [commands and real local results](docs/LOCAL-VERIFICATION.md).

These are internal protocol-created grant pledges. The contract does not prove
external work, charity status, legal rights, real-world identity or delivery.
Proposed integrations are treasury cofunding coordinators, not adopted clients.

## How consensus controls the grant

For each directed Di:Dj relationship, validators independently decide whether
Dj's declared funding purpose covers Di's required co-backer purpose. All six
COVERED/NOT_COVERED/UNCLEAR classes must agree after normalization. Cell order,
enum case and rationale wording may differ; different edge meanings reject
even when they produce the same contributor core. The model cannot choose a
recipient, target, contributor set or payment amount.

Code repeatedly removes donors with no supporting peer left in the set.
The greatest surviving set jointly contributes only when its size meets the
locked 2 or 3 GEN target. Otherwise all actual payers receive their own refund.
Any UNCLEAR cell or unavailable pinned context allocates no money. Expiry
recovers every actual funded slot. Credits leave through own 1 or 2 GEN exits.

## Reuse

Call create_pool once with three distinct donor addresses, a fixed recipient,
a 2/3 GEN target and a deadline within seven days. Each donor reads get_pool,
then signs pledge with the exact definition digest and exactly 1 GEN. A funded
donor calls adjudicate; after successful finalization consumers read get_attempt,
get_matrix, get_core, get_credit and get_accounting. Owners withdraw their own
credits; zero-liability terminal pools can close. At or after expiry use recover
for an unresolved pool. Never treat accepted/provisional state as final.

Proposed callers are a LangGraph multi-treasury cofunding agent, a DAOhaus joint
grant coordinator and an A2A maintainer-support coordinator. They integrate
through these methods and canonical views without copying the semantic judge.

## Illustrative example, not a deployed result

D0 supports public documentation and requires an accessibility-testing backer.
D1 supports accessibility testing and requires a public-documentation backer.
D2 supports closed advertising analytics and requires medical-equipment backing.
With a 2 GEN target, a clear reciprocal D0/D1 matrix produces core {D0,D1}:
the locked recipient earns 2 GEN and D2 recovers 1 GEN. A 3 GEN target on that
same matrix refunds all three donors. Wording remains subject to real consensus.

## Deployment

NETWORK = Studio Dev, chain ID 61997.
CONTRACT_ADDRESS = 0x312185Ec90dF0B86CC7996d7d6D978aaa7694BdD.
[Contract Explorer](https://explorer-studio-dev.genlayer.com/address/0x312185Ec90dF0B86CC7996d7d6D978aaa7694BdD)
and [successful finalized deployment](https://explorer-studio-dev.genlayer.com/tx/0xb9298b617c2cb36b5fa8024370b3e2605992dad05531430f32d8f6dd1c956bb4).
The exact deployed source matches SHA256
`c483e13de92446f54b2b548f4614cbcf7380fbe08aee984ec9b73bec3c51343f`.
Browser observations and sanitized receipts are in docs/evidence/studio-dev/.

The real pk-pair-v1 pool finalized the reciprocal D0/D1 core with two completed,
independently agreeing validator executions. The recipient received 2 GEN and
D2 recovered 1 GEN. Both exits have exact native contract-balance decreases and
delivered-recipient receipts. The pool closed with zero remaining GEN/liability.
See semantic-pair.json, delivery-pair-exit0.json, delivery-pair-exit1.json and
case-pair-final.json under docs/evidence/studio-dev/. The next cycle case failed semantic consensus; see docs/NETWORK-BLOCKER.md.
The three remaining cases were not started. This first case alone is not
complete submission evidence.

## Verification and network status

Use Python 3.12 and this repository's virtual environment, install
requirements.lock, run npm ci, then npm run check. It checks every contract with
the semantic linter, all direct tests and the SDK/receipt/script tests. Windows
uses .venv/Scripts; POSIX uses .venv/bin. Set PYTHONUTF8=1.

The exact source passed lint, direct tests, metadata and unsigned target checks
before deployment. Current local suite:112 Python tests and21 script tests.
The owner approved reuse of three existing distinct EOAs,13 GEN total escrow
across five sequential cases,and a1 GEN total network-fee cap. Signed fee
envelopes are checked and journaled before broadcast. No new wallet or funding
was needed. Public repository,CI and submission readiness remain pending.

## Current blocker and completed recovery

The frozen pk-cycle-v1 fixture finalized with MAJORITY_DISAGREE. Leader SUCCESS
alone is not accepted consensus or applied state. A publication pledge did not
unambiguously determine the accessibility-testing relation. The frozen oracle,
validator and deployed contract are unchanged. This failure is preserved.

After its immutable expiry, recovery finalized and each original donor withdrew
1 GEN with exact native balance decrease and delivered-recipient proof. The
pool is CLOSED; global received6 GEN, withdrawn6 GEN, locked0 GEN, credits0 GEN,
native contract balance0. `node scripts/recovery-audit.mjs` independently
rechecked all5 recovery operations and3 actual refunds, recoveryPassed=true,
fullLifecyclePassed=false. See docs/evidence/studio-dev/cycle-recovery-audit.json.
This recovery does not turn a failed cycle judgment into successful consensus.

A proposed per-relation V2 judge is documented in docs/PROPOSED-V2.md. Six
unsigned simulations matched36/36 frozen cells across the explicit new cycle,
original pair and unavailable-annex case. A batch probe on the same new cycle
failed and is also retained. These are model simulations, not independent
network consensus or settlement. V2 is not implemented/deployed. Owner approval
is pending for its public behavior change and the cumulative19GEN escrow scope;
the existing aggregate1GEN fee ceiling would remain unchanged. No further demo
deposits or production behavior changes occur while approval is pending.
