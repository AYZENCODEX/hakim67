# AYZEN roadmap phases 10–25

This repository keeps these phases in the modular-monolith migration path. The
roadmap requires meaningful business boundaries, not one process per route.
The implementation below makes each boundary reviewable and extraction-ready
without duplicating the existing Finance, Vault, Workflow, Mail, Notification,
AI, Event Bus, and Idempotency code.

## Implemented boundary map

| Phase | Boundary or control | Current implementation |
| --- | --- | --- |
| 10 | Database boundaries | `architecture/domains.ts`, `lib/service-boundaries.ts`, and the `service_registry` / `service_table_ownership` tables. Ownership checks fail closed when a module attempts to use another domain's table. |
| 11 | Finance / RYFT | Existing Finance ledger, books, journal, invoice, repayment, reporting, and wallet bridge routes and schemas are registered as the Finance contract. |
| 12 | Vault / SYLO | Existing encrypted Vault, step-up/reveal controls, sharing, backup, snapshot, activity, and attachment modules are registered as the Vault contract. |
| 13 | Workflow / SKARN | Existing durable definitions/runs, retries, compensation, scheduling, replay, and workflow metrics are registered as the Workflow contract. |
| 14 | AI / Agent / ZYNTH | Existing AI action, credit-meter, agent, and policy-controlled routes are registered as the AI contract. |
| 15 | WISP Mailbox | Existing AYZEN mailbox tables/routes, threading, spam/reputation, folders, drafts, and mailbox delivery state are registered as the Mail contract. |
| 16 | Mail delivery | Existing durable send queue, provider delivery tracking, inbound webhook verification, attachments, retry, and delivery health remain owned by Mail. |
| 17 | Notification | Existing notification records, preferences, in-app delivery, Telegram/email adapters, and SSE delivery remain owned by Notification. |
| 17 (event bus) | Event Bus | Registered event vocabulary plus durable outbox, dispatcher, retry, processed-event, and dead-letter tables are reused. |
| 18 | Outbox | Domain events are inserted into `event_outbox` before dispatch; event IDs and trace/correlation/causation IDs are retained for recovery and diagnosis. |
| 19 | Idempotency | API writes use `idempotency_keys`; event consumers use processed-event/processing claims; Telegram and scheduled jobs retain their own dedupe keys. |
| 20 | Service-to-service security | Signed HMAC requests use `X-Ayzen-Service`, `X-Ayzen-Request-Id`, `X-Ayzen-Timestamp`, and `X-Ayzen-Signature`. Timestamp validation, constant-time signature comparison, allowed-service checks, and durable nonce replay protection are mandatory. |
| 21 | Observability | Structured Pino logs, request/engine metrics, AsyncLocalStorage trace context, and propagated trace/correlation/causation IDs are shared across domain, event, workflow, and scheduler paths. |
| 22 | Rate limiting | API-wide and sensitive/auth/OTP limiters are centralized in `middlewares/security.ts`; limits are configurable by environment and emit standard headers. |
| 23 | Security hardening | Helmet, locked-down CORS, body limits, query de-duplication, prototype-key sanitization, auth/policy gates, encrypted Vault fields, and fail-closed service authentication are retained. |
| 24 | Testing strategy | `scripts/src/test-service-contracts.ts` checks the service inventory, ownership failure path, signed-request tamper detection, and nonce replay behavior. Existing domain-specific tests remain alongside it. |
| 25 | Contract testing | `DomainServiceContract` is the shared contract inventory: owned tables, capabilities, events, and required quality gates are checked for every declared domain. |

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