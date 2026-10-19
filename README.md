# PledgeKnot

A standalone GenLayer Intelligent Contract for mutually conditional cofunding.
Three named contributors escrow 1 GEN each with a declared funding purpose and
a required co-backer purpose. Independent validators interpret all six directed
relationships. Deterministic code computes the greatest support-closed group;
it funds one fixed recipient only if that viable group meets the locked target.
Excluded contributors, failed targets and expired unresolved pools refund the
actual payers. No organizer or model supplies recipients or payout amounts.

Status: Studio Dev lifecycle audit passed. Five acceptance cases and one
preserved failed-review/refund case are CLOSED with zero liability.
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

## Worked example: real finalized pair result

D0 supports public documentation and requires an accessibility-testing backer.
D1 supports accessibility testing and requires a public-documentation backer.
D2 supports closed advertising analytics and requires medical-equipment backing.
Pool pk-pair-v2 locked a 2 GEN target and three actual 1 GEN pledges.
Its finalized matrix, in D0:D1,D0:D2,D1:D0,D1:D2,D2:D0,D2:D1 order, is
COVERED,NOT_COVERED,COVERED,NOT_COVERED,NOT_COVERED,NOT_COVERED.
Two completed independent validators agreed. get_core returns computed_mask3,
funded_mask3 and grant2GEN: the fixed recipient withdrew 2 GEN, while D2
withdrew its own 1 GEN refund. get_pool now returns CLOSED with zero liability.
See [canonical meaning](docs/evidence/studio-dev/semantic-pair.json),
[recipient exit](docs/evidence/studio-dev/delivery-pair-exit0.json) and
[excluded donor refund](docs/evidence/studio-dev/delivery-pair-exit1.json).
The separately finalized pk-target-v2 uses the same matrix with target3GEN;
its funded_mask0 caused all three donors to recover their own 1 GEN.

## Deployment

Active V2: NETWORK = Studio Dev,chain ID61997.
CONTRACT_ADDRESS = 0xeceE9CaFf3DC3fE026eA71d8fD3a1532cA7f230a.
[Contract Explorer](https://explorer-studio-dev.genlayer.com/address/0xeceE9CaFf3DC3fE026eA71d8fD3a1532cA7f230a)
and [finalized successful deploy](https://explorer-studio-dev.genlayer.com/tx/0xf5e68d2f2cec90e7d21fd5652f7c8e5b53b662c0abca56f73cc2dd2eb006bd3e).
Exact sourceSHA3879221193c6affce84c9d9cc14f92e0f3dc40376710d3f5124100e364298c4f;
14recognized methods,empty initial ledger and signed caller smoke passed.
Pair, three-cycle and insufficient-target cases are finalized and CLOSED.
The new pk-unclear-v2b review finalized successfully with two independent
agreeing validators: RETRYABLE, no allocation, then all three expiry refunds.
The original pk-unclear-v2 review failed MAJORITY_DISAGREE and applied no attempt
or allocation. All its 3 GEN were refunded after expiry; this remains an extra
negative case, never a successful judgment. See [case rationale](docs/UNCLEAR-CASE-RETRY.md).
The partial pool received and refunded only D0's 1 GEN; unfunded slots earned
no credit. The [read-only lifecycle audit](docs/evidence/studio-dev/lifecycle-audit.json)
verified 52 operations, four successful independent semantic reviews and
14 native exits totaling 16 GEN on V2. All six V2 pools are CLOSED; native
balance, locked value and credits are zero. Five acceptance cases account for
13 GEN; the preserved failed-review case accounts for the other 3 GEN.
Explorer URLs returnedHTTP200 with address/transaction markers; browser visual
inspection is unavailable because local browser use is disabled in Work settings.

Historical V1 address0x312185Ec90dF0B86CC7996d7d6D978aaa7694BdD is superseded
with zero liability. Its failed cycle and all6GEN native exits are preserved
under docs/evidence/studio-dev/v1-* with an archive manifest. They are not V2
execution proof. No archive/failure was relabeled as V2 success.

## Verification and network status

Use Windows Python 3.12 and this repository's virtual environment, install
requirements.lock, run npm ci, then npm run check. It checks every contract with
the semantic linter, all direct tests and the SDK/receipt/script tests. The
verified Windows setup uses .venv/Scripts. Set PYTHONUTF8=1.

The exact source passed lint, direct tests, metadata and unsigned target checks
before deployment. Current local suite: 122 Python tests and 26 script tests.
The owner approved reuse of three existing distinct EOAs and 22 GEN cumulative
escrow: 6 GEN V1, 13 GEN across five acceptance cases and 3 GEN in the preserved
failed annex case. The aggregate network-fee cap remains 1 GEN. Signed fee
envelopes are checked and journaled before broadcast. No new wallet or funding
was needed. The signed-fee reservation upper bound across both revisions is
0.633753753600786752 GEN, below the 1 GEN cap; this is not actual fee spending.
See [local output](docs/evidence/local/check.txt) and [review](docs/REVIEW.md).
The [public repository](https://github.com/duclucky/pledge-knot-genlayer) is
published with incremental history.
[CI passed](https://github.com/duclucky/pledge-knot-genlayer/actions/runs/39334713953)
on a fresh Windows runner with the same 122 Python and 26 script tests.
Copy-ready fields are in [SUBMISSION.md](docs/SUBMISSION.md); Portal submission
is performed by the owner. The unchanged objective checker returned
0 BLOCKER, 0 WARN, npm/gltest PASS, all four gates PASS and all three evidence
checks OK with the real repository and deployed Explorer URL.
See [acceptance proof](docs/evidence/local/acceptance.json).

## Preserved failures and limits

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

The owner-approved per-relation V2 repair is documented in PROPOSED-V2.md.
Unsigned simulations supported feasibility but did not guarantee consensus:
the first live V2 annex input still disagreed. The owner then approved a distinct
explicitly unidentified-activity declaration and the 22 GEN cumulative limit.
The old input, oracle and failure were preserved. Contract source and semantic
policy did not change for that new case.

This bounded primitive supports exactly three contributors, one fixed recipient,
1 GEN pledges and a 2 or 3 GEN target. Six classifications per independent
evaluation increase model cost. Source unavailability and ambiguous declarations
can delay allocation until expiry; future model agreement is not guaranteed.
No external-work verification, audited-security, adoption or Portal acceptance
claim is made. All cumulative deposits, including recovered ones, remain counted
by the pre-broadcast escrow and fee guards.
