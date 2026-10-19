# PledgeKnot specification

## Identity

IDEA-048 / PledgeKnot / pledge-knot / Intelligent Contracts.
Status: V2 PASS_ADMISSION / OWNER_APPROVED_IMPLEMENTATION / PENDING_EXECUTION.
Owner explicitly approved PROPOSED-V2 and cumulative19GEN escrow; aggregate
fees stay1GEN across V1+V2. V1 all6GEN exited with zero liability; its failure
and recovery remain archived evidence, not V2 proof. V2 not deployed yet.
Target: Studio Dev61997, https://studio-next.genlayer.com/api .
Pinned family: Python API v0.3.0,GenVM v0.6.0-rc5,runner
5jycge4q8k23462jtb0b9fyey1s9qz928sz2nbrd9mg4sxqg2qng;
JS2.0.0-rc.1,Python client0.19.0rc2,genlayer-test0.30.0rc2,
genvm-linter0.11.1rc2. Same verified API; no runner migration.
Six unsigned per-relation simulations matched36/36 frozen cells across new
explicit cycle,original pair and missing-annex. No expected labels in prompt.
This is model feasibility,not real independent consensus or value execution.
Public repository/CI and Phase7-10 remain pending. See PROPOSED-V2.md.

## One-sentence product hook

Release only the already-funded pledges whose co-backer conditions remain true
inside the greatest viable contributing group, or return the actual payers' GEN.

## Trust problem

An organizer wants a large payable group; a contributor wants its peer-purpose
condition honored. Counting deposits cannot decide whether differently worded
funding purposes satisfy those conditions. A private semantic engine can choose
edges that determine who loses escrow. Validators own interpretation; contract
code owns coalition computation, target, payer provenance and every value exit.

## Fingerprint

1. Trust problem: neutral interpretation of co-backer support before conditional
   actual payers can be charged together, including cascading loss of assurance.
2. Actors/adversary: three cash contributors and a fixed grantee; the grantee may
   overlap a donor, explicitly disclosed. No sponsor rewards competing executors.
3. Evidence class + authenticity mechanism: exact runtime-authored1GEN pledges,
   immutable pool/role/policy/source/domain-bound assent, and canonical native
   escrow; public vocabulary context is independently fetched at its fixed origin.
4. Consensus question: for each Di:Dj (i!=j), does Dj's exact declared support
   purpose cover Di's required peer purpose, exclude it, or remain unclear?
5. State machine: collect individual conditional pledges -> full review ->
   greatest support-closed core -> target grant or refunds -> own exits/closure.
6. Direct consequence: all viable contributors jointly fund one fixed grantee
   from their own cash; excluded contributors recover exactly their own1GEN.
7. Reuse surface: pool/pledge/review/matrix/core/credit/accounting API for agent
   treasury and collective-grant coordinators, without copying the judge.

## Mandatory gate matrix

| Gate | PASS/FAIL | Evidence/reason |
|---|---|---|
|Replacement|PASS_ADMISSION|A private backend choosing semantic support edges controls who is charged; deterministic core arithmetic cannot replace independent interpretation|
|Judgment|PASS_ADMISSION|Entailment/exclusion/underspecification require meaning; V2 per-relation spike matched36/36 cells across6 unsigned simulations; V1 failures retained,not counted PASS|
|Evidence availability|PASS_ADMISSION|Canonical bounded pledges plus target-fetched fixed W3C context; actual probe HTTP200,181875raw bytes,exact digest match|
|Evidence authenticity|PASS_ADMISSION|Actual sender/deposit/role/full pool digest constitute the internal pledge; no actor-hosted receipt or external-work fact is admitted; authority matrix below|
|Equivalence|PASS_ADMISSION|Code assigns all6 directed IDs;one bounded semantic question per relation;validator independently replays all6 classes and code-derived core;rationale ignored|
|Consequence|PASS_ADMISSION|Core membership determines whose actual1GEN funds the fixed recipient and whose1GEN is refunded|
|Adversarial|PASS_ADMISSION|Grantee prefers a larger core; contributors resist unsupported charges and may manipulate language or omit funding|
|State model|PASS_ADMISSION|Isolated immutable pools/slots,append-only attempts,own credits,explicit states,time guards,safety/value matrices and conservation|
|Reuse|PASS_ADMISSION|LangGraph multi-treasury,DAOhaus joint-grant and A2A maintainer-support coordinators have the concrete API path below; no adoption claim|
|Contract count|PASS_ADMISSION|One owner of conditional pledges,core,grant and refund ledgers; a second consumer would be pass-through|
|Differentiation|PASS_ADMISSION|Greatest cash-contributor closure and cascading assurance loss differ from priority execution pairs,capacity matching,policy authorization,netting and contingent branch reserves|
|Claim-to-code|PASS_ADMISSION|Six complete method/state/view/test/network rows below; actual execution evidence remains pending|
|Full lifecycle|PASS_ADMISSION / PENDING_EXECUTION|Two-member core grant,three-cycle grant,target failure,partial/unknown expiry,own native exits and zero closure specified before code|
|Scope honesty|PASS_ADMISSION|Constitutive declarations and cash-backed cofunding only; no external delivery,identity/charity fact,dominant-strategy theorem,unanimity,adoption or V2 deployment claim|

## Actors, roles and incentives

| Actor | Permissions | Value at risk | Incentive to bias |
|---|---|---|---|
|Three distinct named donors D0/D1/D2|Create if named;one own pledge;review/recover;own exit/closure|Exactly1GEN each|Avoid unsupported inclusion or exclude an unwanted peer|
|Creator|Locks pool once;may recover an empty expired pool|Only own actual pledge if any|Choose favorable terms;other donors must explicitly assent by funding|
|Fixed recipient|Own earned credit withdrawal|No deposit required|Broaden the viable group;cannot author donor slots or change amounts|

## Scope and non-goals

V2 has exactly three donors,one1GEN pledge per donor,target2 or3GEN,a deadline
within seven days and at most three semantic attempts. Recipient may overlap a
donor; credit accumulation must merge both roles without overwrite or duplication.
There is no external-work verification,arbitrary payment request,transferable
token,fee,slash,refund bonus,proof of public-good delivery or privileged organizer
cancellation. No assertion that an agent's declared motive is a real-world fact.

## Product/frontend blueprint and frontend lifecycle

N/A for the locked Intelligent Contracts category. No app,frontend,wallet picker,
browser write,hosting or Vercel is part of this contribution. Canonical views,
scripts and receipts are the integration boundary; no browser workflow is claimed.

## State model

Stable pool IDs: [A-Za-z0-9_-]{1,64}. D0/D1/D2 and six directed edge IDs are
fixed inside each pool. Str-keyed maps use pool-qualified keys; no global last
result or raw-JSON registry. Pool,Pledge,Cell,Attempt are storage dataclasses.
Money,counters,masks and deadlines use bigint. Public views expose JSON strings
of structured records,never raw mutable JSON as canonical storage.

Pool definition binds PK_V2,chain ID,contract address,pool ID,creator,three donor
addresses,recipient,target,deadline and source URL/hash. Its digest is immutable.
Each pledge authenticates that exact digest using its runtime sender and1GEN
deposit; its support and required-peer purpose are immutable and timestamped.

OPEN -> READY when all three slots are funded. READY/RETRYABLE -> RETRYABLE,
FUNDED or REFUNDED through review. OPEN/READY/RETRYABLE -> EXPIRED at deadline.
FUNDED/REFUNDED/EXPIRED -> CLOSED only when locked reserve and credits are zero.
Repeated closure is a no-op only after caller and invariant checks. Pledges,
definitions,recipient,donors,target and deadlines cannot be rewritten or reopened.

Transaction clock: gl.message.datetime interpreted as timezone-aware UTC seconds.
create: now < deadline <= now+7days. pledge/adjudicate: now < deadline.
recover: now >= deadline,equality allowed. Every affected public method enforces
its own clock even with stale phase. Withdrawn earned credits survive expiry;
closure is time-independent. Rejections leave canonical state/accounting unchanged.

## Write-method safety matrix

| Method | Caller | Allowed states | Forbidden states | Temporal/expiry gate | Idempotency | Value/accounting effect | Views affected | Negative tests |
|---|---|---|---|---|---|---|---|---|
|create_pool|Creator must be one configured donor|Absent unique ID|Existing ID,bad roles/target|now<deadline<=now+7days|Duplicate rejects|None;nonpayable|pool,accounting|wrong creator,duplicate/closed ID,bad target/roles,deadline boundaries,value rejects,global corruption|
|pledge payable|Exact named donor|OPEN,own empty slot|Duplicate,READY,retry,terminal|now<deadline|Second payment rejects|Exactly1GEN into actual payer slot;all3 ->READY|pool,pledge,accounting|wrong role/digest/pool/version,zero/dust/2GEN,wrong state,duplicate,closed,clock -1/equal/+1,accounting fault|
|adjudicate|Funded named donor|READY/RETRYABLE,all3 funded,attempt<3|Partial,unfunded,terminal,exhausted|now<deadline|One terminal allocation;retry history only|Clear core meets target -> fixed grant and excluded refunds;target fail -> all refund;unknown/source fail -> no allocation|pool,attempt,matrix,core,credit,accounting|wrong caller/state,duplicate/closed,clock boundaries,invalid semantic output,same-core edge swap,wrong provenance,accounting fault,no double credit|
|recover|Funded donor;creator only if empty|OPEN/READY/RETRYABLE|Premature,unfunded outsider,terminal|now>=deadline|Second recovery rejects|Every actual funded donor gets exactly1GEN;unfunded slots get nothing|pool,pledge,credit,accounting|wrong actor/state,stale phase -1/equal/+1,partial/full/retry/empty,duplicate,closed,accounting fault|
|withdraw_credit|Own credit owner actual sender|Positive own pool credit|Zero,other owner,excess|N/A owned earned credit survives time|Ledger debited before transfer;cannot reuse it|Exactly1/2GEN via @gl.evm recipient;prove native decrease and recipient message|credit,pool/global accounting|wrong actor,zero/excess/bool/invalid amount,duplicate,closed,corrupt ledger,no double withdrawal|
|close_pool|Creator or funded donor|FUNDED/REFUNDED/EXPIRED,zero reserve/credits|Live or any liability|N/A zero-liability closure|Already CLOSED no-op|None|pool,accounting|wrong caller,premature,remaining reserve/credit,duplicate,corrupt accounting|

## Evidence policy

Only exact canonical constitutive declarations and actual deposits are consequential
actor input. Signed offchain receipts,claimant URLs,screenshots,identity assertions,
delivery reports and LLM-read signatures are excluded. Role and pool digest are
checked before any effect. Freshness uses transaction time; unique immutable pool
and donor slot prevent replay. Inputs are bounded ASCII: support/requirement
1..600 chars each. No caller supplies a source URL or model-selected destination.

Required context is dated W3C ODRL2018 vocabulary at
https://www.w3.org/TR/2018/REC-odrl-model-20180215/ . HTTPS,HTTP200,raw bytes
1000..300000,UTF8 and SHA256
af187a2c26b2429a579039403f34d9a5d5f29a1e01019662043068fa1ca2beaa
are checked before extracting context or calling the model. It supplies vocabulary,
not proof of a donor's identity,actual intent,external work or grant delivery.
Missing/changed/unavailable context stays non-penalizing RETRYABLE;malformed
model output reverts before attempts or hard changes. Source and parser/model
failures must be distinguishable. Untrusted quoted text cannot redefine policy,
expected IDs,authority,amounts,recipient,target,deadline or allowed consequences.

### Evidence Authority Matrix

| Consequential claim/fact | Evidence/artifact | Data controller | Authoritative source/issuer | Deterministic verification | Canonical objective/entity/actor binding | Freshness/anti-replay | Semantic role after verification | Non-penalizing failure state | Consequence blocked | Required negative test |
|---|---|---|---|---|---|---|---|---|---|---|
|Pool payment policy|Immutable pool definition|Creator|Runtime-authenticated named donor|Nonzero distinct donor roles,valid target/deadline,unique ID;each deposit assents exact digest|PK_V2,chain,contract,pool,roles,recipient,target,time,source version|Unique ID,no update,creation clock|Policy loads from locked state;model cannot redefine it|Reject unchanged state|Pledge/review/funding/credit|Valid digest for wrong pool/chain/version/objective cannot enroll or pay|
|Actual conditional pledge|One1GEN deposit plus exact support/requirement|Exact donor|Runtime sender and native deposit|Named donor,empty own slot,1GEN,matching digest|This pool/donor/address/policy/source/version and own clauses|Once per role;now<deadline;canonical timestamp|Interpret declared cofunding purpose only,never outside fact|Reject unchanged accounting|Inclusion,funding,credit,rights|Hash-valid text from wrong actor;cross-pool replay;late/future window;fabricated receipt cannot replace sender/deposit|
|Public vocabulary context|Fixed dated W3C bytes|W3C origin|Fixed HTTPS version URL|HTTP/size/UTF8/exact raw SHA before model|Locked source/policy objective;not payout or actor authority|Dated version;independent validator refetch|Vocabulary only;cannot establish actual work or legal status|SOURCE_UNVERIFIABLE/RETRYABLE|Model review,grant/refund allocation|Stable attacker bytes/wrong digest/version/unavailable source -> no hard change or model invocation|
|Verdict and native exit|Complete six-cell result plus own ledger|Validator/protocol and owner|Independent replay plus deterministic code/runtime owner|Exact IDs/enums,source stage,core/target conservation;own sender;debit then EVM boundary|Pool/attempt/all donor IDs/recipient/remaining credit|One terminal allocation;own remaining credit only|Only edge classifications are model judgments|Invalid output reverts or explicit retry|Arbitrary amounts/recipient/core,duplicate settlement/exit|Wrong meaning with same core;extra/missing/duplicate IDs;payout injection;wrong owner;parent-only finality cannot prove delivery|

## Consensus design

One pool per review;one independently asked relation per model call. Six directed IDs D0:D1,D0:D2,D1:D0,D1:D2,D2:D0,D2:D1.
For Di:Dj compare Di.required_peer_purpose with Dj.declared_support_purpose.
COVERED means clear entailment/inclusion;NOT_COVERED means clear exclusion;
UNCLEAR means underspecified/missing referenced context or requiring an outside
fact. Self-support is forbidden. A generic documentation purpose does not prove
French translation,and a publicly fetched credible story cannot prove work.
Do not infer that any activity occurred or will occur from a funding purpose.

| Field | Type/bounds | Comparison rule | Why critical |
|---|---|---|---|
|Source stage|OK or SOURCE_UNVERIFIABLE|Exact normalized value|Missing required source cannot fund|
|Six directed classes|Exactly one COVERED/NOT_COVERED/UNCLEAR per expected ID|Independent semantic replay after normalization|Different edge meaning must reject even if totals/core coincide|
|Derived core,target result|Code-owned bitmask and fixed target arithmetic|Recompute from full six classes|No model-selected coalition or payout|
|Rationale|Optional bounded prose|Ignored for consensus|Different wording is not a different economic decision|

Nondeterminism uses captured locals,no storage access inside closures,and v0.3
sandboxed gl.vm.run_nondet_default. Non-Return/invalid leader rejects. Code assigns each ID,then normalizes one class response,assembles all6IDs and
validates complete coverage. Maximum6 model calls per leader or validator,with
source fetched once per independent evaluation. Each question includes only
locked owner requirement and peer purpose. Normalize text/LazyJSON,one optional
code fence and enum case;reason wording ignored. Reject duplicate
JSON keys,missing/extra/duplicate IDs,invalid types/enums and extra consequence,
recipient or amount fields. Errors must never become accepted shape-only results.
UNDETERMINED means no canonical decision: inspect state/attempt before retry,
do not pretend it is a recorded RETRYABLE attempt. At most3 recorded attempts.

## Consequence and accounting

Start S={D0,D1,D2}. Repeatedly remove every i with no other j in S for which
E[i,j]=COVERED. Stop at a fixed point,at most3 removals. This is the unique
greatest support-closed set: union of every feasible subset. A three-cycle may
survive because all cash already exists and is released atomically together;
this does not authenticate performance or borrow against future promises.

| Verdict | Canonical state change | Consumer action | Value movement |
|---|---|---|---|
|Complete clear matrix and core size >= target|FUNDED;freeze matrix/core|Read actual funded core|Recipient credit=size(core)GEN;each excluded actual donor gets1GEN|
|Complete clear matrix but insufficient core|REFUNDED;record computed core,funded core empty|Read failed threshold|Every donor gets own1GEN back|
|UNCLEAR/source unavailable|RETRYABLE;append attempt|Inspect source/model stage;retry before deadline|No reserve/credit/settlement change|
|Expiry of incomplete/unresolved pool|EXPIRED|Actual payers recover independently|Each actually funded donor receives own1GEN;empty slots get nothing|

For every pool and globally received=locked+credits+withdrawn;all nonnegative.
Per-pool credits must equal actual unique address ledger sum,including recipient
overlap. Allocation first removes locked reserve and credits exact deterministic
destinations once. No roundoff or undisclosed remainder. Hard outcomes are relied
upon only after successful finalized execution;accepted state is provisional.
EOA/EVM exit uses @gl.evm.contract_interface after ledger debit. Every real exit
requires finalized delivered recipient/value message and exact native contract
balance decrease. Cleared credits and successful parent alone are insufficient.
Failed/ambiguous delivery halts for reconciliation;no blind repeat or invented refund.

### Value-destination matrix

| Value item | Payer/source | Locked state | Release destination | Refund destination | Forfeit destination | Terminal states covered | Duplicate/late/retry behavior | Canonical proof view |
|---|---|---|---|---|---|---|---|---|
|One1GEN pledge|Actual named donor|OPEN/READY/RETRYABLE|Fixed recipient only if donor in sufficient final core|Same actual donor if excluded,failed target or expiry|None|FUNDED/REFUNDED/EXPIRED/CLOSED|One slot;late rejects;unknown locks until retry/expiry|pledge,pool,credit,accounting|
|Viable core aggregate|Actual included1GEN deposits|Before complete clear review|Fixed grantee,exact core sizeGEN|All donors if target not met|None|FUNDED or REFUNDED then CLOSED|Full condition closure first;single allocation|matrix,core,recipient credit|
|Excluded pledge|Actual excluded donor|Before allocation|None to grantee|Exactly1GEN to its actual payer|None|FUNDED/CLOSED|Cascade before allocation;no duplicate credit|core,pledge,own credit|
|Partial/unknown/no review|Only actual deposits|OPEN/READY/RETRYABLE|None|Each funded donor at deadline;no missing-slot credit|None|EXPIRED/CLOSED|Direct recovery time/caller/state;once only|pool,credit,accounting|
|Earned own credits|Grantee or refund owner ledger|Before debit|Own EOA/EVM,1/2GEN per exit|Already belongs to that owner|None|Any terminal until zero closure|Debit before message;recipient/native proof;no replay|own credit,pool/global/native balance|

## Reusable interface

Writes: create_pool(pool_id,d0:Address,d1:Address,d2:Address,recipient:Address,
target_gen:int,deadline:int);pledge(pool_id,pool_digest,support_purpose,
required_peer_purpose),payable1GEN;adjudicate(pool_id);recover(pool_id);
withdraw_credit(pool_id,amount_gen:int 1..2);close_pool(pool_id).
Views:get_pool,get_pledge,get_attempt,get_matrix,get_core,get_credit,get_accounting,
get_policy. Invalid public IDs or absent records raise UserError.

Proposed LangGraph multi-treasury coordinator,DAOhaus joint-grant coordinator,
A2A maintainer-support coordinator call create -> pledge -> adjudicate ->
get_core/get_credit -> withdraw. No core fork,callback or independent consumer
state is needed. Callback auth/idempotency and cure/restore are N/A;there is no
reopening or offchain completion claim. Recovery belongs to the main contract.

## Threat model and test plan

Test wrong sender even with a valid digest/credible purpose;wrong pool/version;
duplicate or late deposit;immutable target/recipient;prompt injection;missing
context/raw digest mismatch with no model call;malformed/duplicate JSON/IDs;
asymmetric or same-core wrong leader edges;independent validator replay;all
semantic classes;all64 binary graphs/eight available masks;greatestness against
independent subset feasibility;target2/3 and own refund conservation;recipient
overlap;entity isolation;every value/recovery write's wrong caller/state,duplicate,
terminal/closed and corrupt-accounting negatives;each time boundary -1/equality/+1
with stale phase and unchanged rejected state;payability metadata;raw/normalized
receipt parsers;proper EVM native exit and no double credit/settlement/withdrawal.
Historical RED must be recorded per implementation batch as in TDD-PLAN.md.

## Claim-to-code matrix

| Claim | Contract method/state | View/read | Test | Network evidence |
|---|---|---|---|---|
|Only authenticated actual payer pledges count|create_pool/pledge,immutable slots|pool/pledge|test_pledge_safety_before_body;test_pledge_deadline_stale_open;test_source_metadata_public_surface_and_temporal_guards|Separate donor pledge receipts and authority smoke planned|
|Validators compare all directed meaning|adjudicate/_judge/attempts|attempt/matrix|test_semantic_validator_replay_all_edges_not_only_same_core;test_adjudicate_invalid_output_no_mutation|Finalized review with completed independent validator executions planned|
|Greatest contributor set includes cash-backed cycles and cascades|adjudicate/_greatest_core|core/matrix|test_exhaustive_independent_subset_oracle_512_graph_masks;test_core_three_cycle_and_cascading_loss_require_actual_closure|Two-member and three-cycle canonical cores/credits planned|
|Only sufficient core funds fixed recipient|adjudicate,FUNDED/REFUNDED|pool/core/credit|test_adjudicate_core_and_conservation;test_recipient_overlaps_excluded_donor_credit_adds_then_split_exit;test_actual_settlement_cannot_repeat_or_change_pledges|Target2 success,target3 cycle and insufficient-core all-refund planned|
|Unresolved/partial deposits recover to actual payer|recover/EXPIRED|pool/pledge/credit|test_recover_stale_phase_all_actual_payers;test_retry_exhaustion_recovery_no_orphan;test_recover_safety_before_body|Partial and UNCLEAR expiry receipts/own refunds planned|
|Own money leaves and closes at zero liability|withdraw_credit/close_pool|credit/accounting/native balance|test_withdraw_actual_EVM_boundary_debit_then_message;test_withdraw_safety_before_body;test_close_actual_zero_liability_and_idempotent;receipt.test.mjs|Per-exit native decrease and recipient proof;all pools CLOSED planned|

## Analogue and differentiation matrix

| Analogue/prior idea | Similar dimensions | Structural difference | Collision decision |
|---|---|---|---|
|ConcordBatch|Signed constitutive input;bounded graph settlement (2)|Actual conditional payers,not rewarded executors;whole greatest core/cash-backed3-cycle,not priority/order/2tickets;excluded payer owns refund|PASS reasoned,<4 matches|
|SemanticPolicyQuorum/NormGround|Constitutive semantic declarations (1)|No single plan/all-owner authorization/defeat rules/executor ticket;endogenous contributor set may fund after refunding excluded payers|PASS reasoned|
|SkillSlot|Multiple economic parties;semantic matching (2)|No provider capacities,invocation or delivery escrow;one grantee,conditional contributor closure/cascade and own-payer refunds|PASS reasoned|
|SemanticSetoff/CycleWarrant|Funded participants;constitutive text (2)|No debts,netting,discharge,barter or ownership permutation;new joint grant from own conditional cash|PASS reasoned|
|BranchCover|Constitutive cash promises;semantic table (2)|No future branch/controller,max reserve or pre-choice surplus;multiple actual payers,one terminal greatest-coalition grant|PASS reasoned|
|CoverWeave/CohortRate/SlateFold|Signed participants and bounded group semantics (2)|No permission coalition,Shapley split,equivalence class price or ballot election;directed support is not equivalence|PASS reasoned|
|Numeric assurance contracts|Conditional collective contributions (1)|Assurance mechanism is an analogue,not invented here;neutral semantic peer-purpose interpretation supplies otherwise untrusted edges|PASS with limits|

Novelty is a reasoned landscape comparison,not a universal-originality guarantee.
Theory context: Tabarrok,Public Choice96(1998),345-362,
https://mason.gmu.edu/~atabarro/PrivateProvision.pdf . No refund bonus,dominant
strategy or public-good performance guarantee from that paper is claimed.

## Deployment and evidence plan

Studio Dev61997 only;own deployment identity binds source commit/SHA,runner/API,
SDK,address and transaction. Exact-source schema/constructor and bounded authority
smoke precede value flows. Reuse only already authorized distinct EOAs;any new
wallet or funding requires explicit action-time approval. Parent config discovery
is project .env then authorized root,never secret values in logs. No faucet.

Demonstrate funded two-member core,three-cycle threshold3,clear failed target,
partial expiry and UNCLEAR expiry. Deposit1GEN per donor;withdraw1/2GEN each.
For every step,first read canonical state and journal a signed hash before send;
resume finalized steps instead of replay. Reconcile ambiguous transfers before
retry. Save only allowed receipt/state/amount fields under docs/evidence/studio-dev/;
local and unsigned probes remain separate. Broken funded revision must be
explicitly abandoned/replaced;otherwise superseded revisions recover to zero.

## Definition of Done and honest limitations

V2 admission and unsigned per-relation feasibility passed36/36 frozen cells;
V1 batch failures remain preserved. Owner approved exact V2 behavior and19GEN
cumulative escrow scope before implementation. All six write safety cards and
value/authority destinations above precede V2 source changes;no state/value
write body changes are proposed. Add meaningful RED tests for six relation
questions,strict one-cell parser,source failure before any model call and full
independent replay. Keep every existing authorization,temporal,settlement,
accounting,semantic same-core edge-swap and source-authenticity assertion.
Required completion:one ASCII class,recognized semantic lint,all local checks,
exact-source schema/semantic smoke,successful finalized judgments/consequences,
every native exit/zero closure,public hygiene/history/CI,unchanged objective
grader NO BLOCKER,copy-ready description and final full master audit. V1 money
and unsigned V2 simulations do not prove any of the V2 network lifecycle.

## Adoption path and kill criteria

After accepted V1,a substantial milestone could add bounded variable pledge
amounts/multiple peer requirements with feasibility proof,or an actual treasury
adapter. None is included. Stop if a4-dimension collision is established,
unsupported payers are charged,different edge meaning can pass,source/provenance
failure allocates money,value is orphaned,or frozen single-pool meanings drift.
