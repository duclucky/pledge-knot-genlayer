# Approved PledgeKnot V2 design and retained proposal

Status: OWNER APPROVED V2 AND CUMULATIVE19GEN. Implementation now authorized;
V2 local implementation now passes semantic lint and122 Python tests.
V2 deployment is finalized/SUCCESS;independent funded lifecycle is RUNNING.
Original proposal
and rationale below are retained. Aggregate fee cap remains1GEN across revisions.
This is a proposed repair of IDEA-048, not a new contribution or novelty claim.

## Observations and hypothesis

V1 batch judgment disagreed live on the original cycle; its oracle and failed
network evidence remain preserved. A separately frozen cycle-input-v2 made the
three scopes explicitly exclusive. The exact unchanged production judge still
returned NOT_COVERED for D1:D2 instead of the frozen COVERED, computed core0,
on its first unsigned simulation. That result is retained as FAIL, not relabeled.

An isolated alternative asks one directed relation at a time, supplying only
the owner's peer requirement and the peer's funding purpose. It retains the
same COVERED / NOT_COVERED / UNCLEAR coverage definitions and independent
validator replay. Before every probe, fixture and source hashes were recorded;
expected labels were never sent to the model. Results:

| Frozen input | Runs | Cells matching original/frozen oracle | Scope |
|---|---|---|---|
| New explicit cycle | 2/2 | 12/12 | Unsigned model simulation |
| Original pair | 2/2 | 12/12 | Unsigned model simulation |
| Original unavailable-annex case | 2/2 | 12/12 | Unsigned model simulation |

Total6 simulations,36/36 cells. This supports the hypothesis that a focused
single-relation question can reduce role/scope confusion. It does not establish
causality, future accuracy, independent network consensus or money settlement.
At that prototype checkpoint no production source or wallet changed.
The owner subsequently approved V2 implementation; original V1 oracle and
grading-bot remain unchanged.

Sanitized input/probe evidence is in evidence/local/reassessment-*.json.

## Exact proposed behavior

1. Keep the same public API, three native authenticated payer slots,1GEN
   deposits, fixed recipient,2/3GEN threshold and greatest-core algorithm.
2. Fetch and authenticate the same fixed W3C context once per independent
   leader/validator evaluation. Wrong status/version/digest stays non-penalizing.
3. Code selects each of the six locked directed IDs and sends only its exact
   owner-required / peer-purpose pair to one bounded semantic classification.
   Maximum6 model calls per leader evaluation and6 per validator evaluation.
4. Normalize one strict cell at a time; reject extra/missing/duplicate IDs,
   wrong enums, malformed output, model-supplied payouts or policy changes.
   Reason wording is not consensus-critical. Code assembles all six unique IDs.
5. The validator independently fetches context and reclassifies all six
   relations. It compares every normalized edge meaning and derived core,
   not response formatting or just the total/core. A changed edge with the
   same core still fails. Non-Return/malformed output never passes.
6. Keep all native accounting, authorization, clock, retries, expiry recovery,
   terminal credits,1/2GEN own withdrawals and zero-liability close rules.
   An UNCLEAR edge continues to allocate no money. No fallback accepts the
   leader just because replay failed or consumed more time.
7. Use a new immutable deployment/version PK_V2. V1 remains archived with
   actual refund/zero-balance proof. Evidence and source identity remain distinct.
   Existing source/evidence is not overwritten. No submitted project is carved up.

## New cycle declarations, frozen before the probe

| Slot | Funding purpose | Required peer purpose |
|---|---|---|
| D0 | Only publication of original English training manuals for free public download; excludes translation and accessibility testing | Translation of training manuals into French for free public download |
| D1 | Solely French translation of manuals and freely downloadable translations; excludes original English publication and accessibility tests | Public accessibility testing of documentation |
| D2 | Only public accessibility tests of documentation; excludes original English publication and French translation | Publication of original English training manuals for free public download |

Expected directed classes remain
COVERED,NOT_COVERED,NOT_COVERED,COVERED,COVERED,NOT_COVERED;
computed/funded mask7 at target3GEN. This is a new input, not a revision to
what old pk-cycle-v1 declared or to its failed oracle/result.

## Build and verification boundary

Before implementation, update the V2 specification, all14 admission rows and
claim/safety/value matrices. The same6 write cards and destinations remain
mandatory; new semantic failure/cost cases supplement them. Run meaningful RED
tests before the repair, then all safety/semantic replay/temporal/accounting tests,
AST metadata and genvm-lint with the same verified runner/API family. Preserve
existing assertions; do not remove the failing V1 evidence or weaken any checker.

Only after local checks pass: archive V1 deployment identity with zero liability,
deploy V2 to Studio Dev61997, verify exact source/schema, run a bounded signed
caller smoke, then the full five scenarios on that exact revision: pair,
explicit cycle,target failure,unavailable-annex expiry,partial-funding expiry.
Require independent successful semantic agreement, canonical views, every
native balance decrease and delivered-recipient receipt, and zero closure.
V1 evidence cannot substitute for a V2 value lifecycle. Fee simulation cannot
substitute for finalized live judgment.

Keep the original full acceptance audit strict; use revision-specific journal
and evidence names. Do not count old disagreement/recovery as a successful cycle.
Finish Phases8-10, public hygiene/repo/CI and the unchanged objective grader only
after Phase7 exits. No app, no Vercel and no final Portal Submit.

## Additional transaction authority needed

Existing approval: five sequential cases,total13GEN escrow,1GEN total fee cap.
V1 actually received6GEN, all6GEN now withdrawn; no remaining liability.
A complete new-revision five-case suite needs13GEN more (3+3+3+3+1), because
the already-finished V1 pair cannot prove the new V2 judge. The cumulative
deposit authorization must therefore rise from13GEN to19GEN: an increase6GEN.
This is cumulative escrow, not a fee or expected loss. Maximum3GEN is locked
at one time, each deposit1GEN and each withdrawal1/2GEN. Use the same existing
three EOAs; no key generation, faucet or additional native funding is proposed.

Keep the aggregate fee ceiling at1GEN across V1+V2, retaining the same global
signed-fee journal. Before every broadcast, reserve encoded native gas plus
GenLayer fees; stop if the remaining allowance is insufficient. No budget reset.
No value-bearing V2 action or production behavior change is authorized by this
proposal alone. An approval must explicitly cover both the described V2 repair
and the19GEN cumulative escrow limit; otherwise remain at the existing scope.

The approval requirement comes from master Phase8: "ASK me before any change
that alters public behavior", and AGENTS.md's explicit-authorization boundary
for financial transactions. The new deployment cannot be patched into V1.
