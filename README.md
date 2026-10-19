# PledgeKnot

A standalone GenLayer Intelligent Contract for mutually conditional cofunding.
Three named contributors escrow 1 GEN each with a declared funding purpose and
a required co-backer purpose. Independent validators interpret all six directed
relationships. Deterministic code computes the greatest support-closed group;
it funds one fixed recipient only if that viable group meets the locked target.
Excluded contributors, failed targets and expired unresolved pools refund the
actual payers. No organizer or model supplies recipients or payout amounts.

Status: deployed on Studio Dev;three funded cases passed;missing-annex
consensus failed and all its funds recovered. Full acceptance is incomplete.
This repository is contract-only: no user-facing app, hosted frontend or Vercel.
See [specification](docs/README.md) and [test-first plan](docs/TDD-PLAN.md).
See [commands and real local results](docs/LOCAL-VERIFICATION.md).

These are internal protocol-created grant pledges. The contract does not prove
external work, charity status, legal rights, real-world identity or delivery.
Proposed integrations are treasury cofunding coordinators, not adopted clients.

## How consensus controls the grant

For each directed Di:Dj relationship, validators independently decide whether
Dj's declared funding purpose covers Di's required co-backer purpose. All six
COVERED/NOT_COVERED/UNCLEAR classes must agree after normalization. Code assigns
each directed ID and asks one relation at a time;each validator independently
refetches context and reclassifies all6. Enum case and rationale wording may
differ;different edge meanings reject
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

Active V2: NETWORK = Studio Dev,chain ID61997.
CONTRACT_ADDRESS = 0xeceE9CaFf3DC3fE026eA71d8fD3a1532cA7f230a.
[Contract Explorer](https://explorer-studio-dev.genlayer.com/address/0xeceE9CaFf3DC3fE026eA71d8fD3a1532cA7f230a)
and [finalized successful deploy](https://explorer-studio-dev.genlayer.com/tx/0xf5e68d2f2cec90e7d21fd5652f7c8e5b53b662c0abca56f73cc2dd2eb006bd3e).
Exact sourceSHA3879221193c6affce84c9d9cc14f92e0f3dc40376710d3f5124100e364298c4f;
14recognized methods,empty initial ledger and signed caller smoke passed.
Three V2 semantic cases are finalized and CLOSED:pair,three-cycle,target failure.
They withdrew9GEN. Original missing-annex review finalized MAJORITY_DISAGREE,
applied no attempt/allocation,and recovered3GEN to actual payers after expiry.
V2 now received12GEN,withdrew12GEN,locked/credits/native0. Read-only independent
proof:docs/evidence/studio-dev/v2-blocked-checkpoint.json. Full acceptance remains
blocked;partial case has not started.
Explorer URLs returnedHTTP200 with address/transaction markers; browser visual
inspection is unavailable because local browser use is disabled in Work settings.

Historical V1 address0x312185Ec90dF0B86CC7996d7d6D978aaa7694BdD is superseded
with zero liability. Its failed cycle and all6GEN native exits are preserved
under docs/evidence/studio-dev/v1-* with an archive manifest. They are not V2
execution proof. No archive/failure was relabeled as V2 success.

## Verification and network status

Use Python 3.12 and this repository's virtual environment, install
requirements.lock, run npm ci, then npm run check. It checks every contract with
the semantic linter, all direct tests and the SDK/receipt/script tests. Windows
uses .venv/Scripts; POSIX uses .venv/bin. Set PYTHONUTF8=1.

The exact source passed lint, direct tests, metadata and unsigned target checks
before deployment. Current local suite:122 Python tests and24 script tests.
The owner approved reuse of three existing distinct EOAs,19 GEN cumulative escrow
(6GEN V1 already recovered plus13GEN for the complete new V2 suite)
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
fullLifecyclePassed=false. See docs/evidence/studio-dev/v1-cycle-recovery-audit.json.
This recovery does not turn a failed cycle judgment into successful consensus.

A proposed per-relation V2 judge is documented in docs/PROPOSED-V2.md. Six
unsigned simulations matched36/36 frozen cells across the explicit new cycle,
original pair and unavailable-annex case. A batch probe on the same new cycle
failed and is also retained. These are model simulations, not independent
network consensus or settlement. V2 is implemented and deployed;funded
lifecycle verification is blocked by the preserved annex disagreement.
Owner explicitly approved
its public behavior change and cumulative19GEN escrow scope;
the existing aggregate1GEN fee ceiling would remain unchanged. V2 implementation and deployment are verified;three cases passed and the
failed-annex case was recovered. A new explicit unresolved declaration matched
12/12cells in2unsigned probes. Its proposed run needs cumulative22GEN approval;
see docs/UNCLEAR-CASE-RETRY.md. No new deposit before approval. Both cumulative19GENescrow and aggregate1GENfee caps are
enforced before broadcast,including the old6GENdeposits already recovered.
