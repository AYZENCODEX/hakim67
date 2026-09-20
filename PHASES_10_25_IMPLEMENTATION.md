# AYZEN roadmap phases 10–25

This repository implements phases 10–25 as an extraction-ready modular
monolith. The attached V2 roadmap is the source of truth for phase numbering.
Runtime readiness is represented by
`artifacts/api-server/src/lib/roadmap-contracts.ts`; the Phase 25 route
matrix is represented by `migration-registry.ts`.

## Implemented boundary map

| Phase | Boundary or control | Current implementation |
| --- | --- | --- |
| 10 | Event Bus | Registered event vocabulary plus durable envelopes, schema validation, dispatcher, consumer idempotency, retry, and dead-letter tables are reused. |
| 11 | Outbox & reliability | Domain events are inserted into `event_outbox` in the caller's transaction; leases, backoff, jitter, stale-lock recovery, and graceful shutdown are implemented. |
| 12 | Finance / RYFT | Finance ledger, books, journal, invoice, repayment, reporting, and wallet bridge routes and schemas are registered as the Finance contract. |
| 13 | Vault / SYLO | Encrypted Vault, step-up/reveal controls, sharing, backup, snapshot, activity, and attachment modules are registered as the Vault contract. |
| 14 | WISP mailbox | AYZEN mailbox tables/routes, threading, spam/reputation, folders, drafts, attachments, and mailbox delivery state are registered as the Mail contract. |
| 15 | Mail delivery | Durable send queue, provider delivery tracking, inbound webhook verification, attachments, retry, and delivery health remain separate from mailbox behavior. |
| 16 | Notifications | Notification records, preferences, in-app delivery, Telegram/email adapters, and SSE delivery remain owned by Notification. |
| 17 | Workflow / SKARN | Durable definitions/runs, retries, compensation, scheduling, replay, and workflow metrics are registered as the Workflow contract. |
| 18 | AI / Agent / ZYNTH | AI action, credit-meter, agent, tool, and policy-controlled routes are registered as the AI contract. |
| 19 | VERVE | Existing communication/productivity capabilities remain workspace-scoped and are listed as an extraction-ready boundary without inventing unsupported tables. |
| 20 | Marketplace / Search / Knowledge / Analytics | Existing marketplace, search, and telemetry boundaries are registered independently and are event-consumer-ready. |
| 21 | Observability | Structured Pino logs, AsyncLocalStorage trace context, request/engine metrics, and propagated trace/correlation/causation IDs are shared across domains. |
| 22 | Testing & contracts | Service contract tests cover inventory, ownership failure, signatures, tamper detection, roadmap readiness, and strangler safety gates. |
| 23 | Frontend & clients | Public clients use gateway-owned paths and shared contract packages; internal service addresses are not exposed as a client dependency. |
| 24 | Database ownership | `service_registry` / `service_table_ownership` and `assertTableOwnedBy()` make ownership explicit and fail closed. |
| 25 | Data migration | `migration-registry.ts` provides an explicit route matrix and requires backup, characterization, backfill, validation, and rollback gates for each cutover. |

## Service-to-service request contract

The signing secret is intentionally not stored in source. Configure
`AYZEN_SERVICE_AUTH_SECRET` (or the migration-compatible
`SERVICE_TO_SERVICE_SECRET`) in the deployment environment. The existing
`requireServiceRequest` middleware is mounted on the internal platform probe;
future extracted-service routes should mount the same middleware before their
domain handler.

The caller signs the service name, Unix timestamp in milliseconds, unique
request ID, and SHA-256 hash of the canonical JSON body. A request ID can be
accepted only once. The database-backed nonce store makes replay protection
work across multiple API instances.

The middleware is opt-in rather than global because browser, Telegram webhook,
and public OIDC requests are not service-to-service requests. Internal routes
must mount it before their domain handler.

## Remaining extraction work

These phases establish boundaries inside the modular monolith. They do not
claim that Finance, Vault, or another domain has already been split into a
separate deployable process. Actual extraction remains a later migration step:
introduce a network adapter, move the owned schema, keep the contract tests,
and switch traffic only after rollback and data-migration checks pass.