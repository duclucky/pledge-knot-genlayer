# PledgeKnot

A standalone GenLayer Intelligent Contract for mutually conditional cofunding.
Three named contributors escrow 1 GEN each with a declared funding purpose and
a required co-backer purpose. Independent validators interpret all six directed
relationships. Deterministic code computes the greatest support-closed group;
it funds one fixed recipient only if that viable group meets the locked target.
Excluded contributors, failed targets and expired unresolved pools refund the
actual payers. No organizer or model supplies recipients or payout amounts.

Status: implemented and locally verified; deployment/lifecycle evidence pending.
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

## Verification and network status

Use Python 3.12 and this repository's virtual environment, install
requirements.lock, run npm ci, then npm run check. It checks every contract with
the semantic linter, all direct tests and the SDK/receipt/script tests. Windows
uses .venv/Scripts; POSIX uses .venv/bin. Set PYTHONUTF8=1.

The exact committed source passed unsigned Studio Dev 61997 schema recognition
and constructor simulation. These probes do not create a deployed address or
prove finalized semantic consensus, payments or recipient delivery.
No deployment address, public repository, successful CI or submission readiness
is claimed yet. Three distinct authorized donor EOAs are required for execution.
