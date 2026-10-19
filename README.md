# PledgeKnot

A standalone GenLayer Intelligent Contract for mutually conditional cofunding.
Three named contributors escrow 1 GEN each with a declared funding purpose and
a required co-backer purpose. Independent validators interpret all six directed
relationships. Deterministic code computes the greatest support-closed group;
it funds one fixed recipient only if that viable group meets the locked target.
Excluded contributors, failed targets and expired unresolved pools refund the
actual payers. No organizer or model supplies recipients or payout amounts.

Status: specification locked; implementation and deployed evidence pending.
This repository is contract-only: no user-facing app, hosted frontend or Vercel.
See [specification](docs/README.md) and [test-first plan](docs/TDD-PLAN.md).

These are internal protocol-created grant pledges. The contract does not prove
external work, charity status, legal rights, real-world identity or delivery.
Proposed integrations are treasury cofunding coordinators, not adopted clients.
