# PledgeKnot Portal fields

Track: Builders

Contribution type: Intelligent Contracts

Title: PledgeKnot - Semantic Cofunding Clearing

Description (804 characters, spaces and punctuation included):

PledgeKnot clears mutually conditional, cash-backed cofunding pledges. Three donors each escrow 1 GEN; only the greatest group satisfying its members' co-backer conditions can fund a fixed recipient at a locked target. GenLayer validators independently classify all six directed purpose relationships and agree on their meaning, not JSON formatting. Contract code derives the viable group, grant and refunds; unclear evidence allocates nothing and expiry returns actual deposits. The same pool/pledge/review/core/credit API serves agent treasury coordination, joint DAO grants and maintainer matching pools. Ships one contract, 122 direct tests, 26 script tests, safety docs and five Studio Dev lifecycles plus a preserved disagreement/refund case. Deployed at 0xeceE9CaFf3DC3fE026eA71d8fD3a1532cA7f230a.

Evidence URL: https://github.com/duclucky/pledge-knot-genlayer

Contract Address: 0xeceE9CaFf3DC3fE026eA71d8fD3a1532cA7f230a

Contract Explorer: https://explorer-studio-dev.genlayer.com/address/0xeceE9CaFf3DC3fE026eA71d8fD3a1532cA7f230a

Explorer Deploy Tx URL: https://explorer-studio-dev.genlayer.com/tx/0xf5e68d2f2cec90e7d21fd5652f7c8e5b53b662c0abca56f73cc2dd2eb006bd3e

Network: Studio Dev, chain ID 61997

Successful CI: https://github.com/duclucky/pledge-knot-genlayer/actions/runs/39334713953

Lifecycle evidence: https://github.com/duclucky/pledge-knot-genlayer/blob/main/docs/evidence/studio-dev/lifecycle-audit.json

Worked result: pk-pair-v2 finalized the six directed classes
COVERED,NOT_COVERED,COVERED,NOT_COVERED,NOT_COVERED,NOT_COVERED.
Independent validators agreed; computed/funded core{D0,D1} paid the fixed
recipient2GEN and refunded D2's1GEN. At target3GEN the same core refunded all
three actual donors. The cash-backed three-cycle funded3GEN; unclear input
allocated nothing then refunded3GEN at expiry; partial funding refunded only
the actual1GENpayer. Every acceptance pool is CLOSED0.

Audit totals:5acceptance cases,4successful independent semantic reviews,
1additional failed-review/refund case,52lifecycle operations,14native exits,
V2received/withdrawn16GEN,locked/credits/native0. V1 separately withdrew6GEN;
cumulative deposits/exits22GEN. Signed-fee reservation upper bound
0.633753753600786752GEN within1GEN cap;this is not actual fee spending.

Limits: three donors,1GENpledges,2/3GENtarget; constitutive funding purposes,
not external-work verification. No adoption, universal model stability,
independent security audit, global novelty guarantee or Portal acceptance claim.
Explorer HTTP URLs and exact deployed code/receipts were verified; V2 browser
visual inspection was unavailable because local browser use is disabled.

Paste the GitHub repository URL into Evidence. The owner submits at
https://portal.genlayer.foundation under Builders -> Intelligent Contracts,
connects the required account and completes reCAPTCHA. No Submit action was
performed by this task.
