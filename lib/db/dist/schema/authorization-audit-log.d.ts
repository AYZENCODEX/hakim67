/**
 * schema/authorization-audit-log.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * AYZEN Policy & Authorization Mega Engine — Phase 17 (Authorization Audit).
 *
 * Dedicated, append-only durable store for every PDP decision (migration
 * 103) — the roadmap's own Phase 17 field list, made concrete. This is
 * DIFFERENT from `policy_admin_audit_log` (schema/policy-registry.ts,
 * Phase 07): that table records ADMINISTRATIVE mutations to the policy
 * registry itself (who created/versioned/activated a policy); THIS table
 * records the runtime OUTCOME of asking the PDP a WHO/WHAT/WHICH
 * authorization question — every `PolicyEngine.evaluate()` call, not just
 * ones that happen to touch the registry. The two audit trails answer
 * different questions and are never merged into one table, same as
 * `vault_backup_audit_log` (Round 6) and `user_activity` (schema/
 * activity-log.ts) already coexist as two separate, independently-scoped
 * audit surfaces rather than one shared one.
 *
 * Schema ONLY (Drizzle table def + insert-schema-equivalent typing) — same
 * `lib/db`-must-not-depend-on-`lib/policy` boundary `policy-registry.ts`'s
 * own header already establishes. All actual logic (deciding WHAT to
 * write) lives in `lib/policy/audit/*`; this file only defines WHERE it
 * lands.
 *
 * ── Append-only, DB-enforced (migration 103) ──────────────────────────────
 * Same discipline `vault_backup_audit_log` (migration 073) already
 * established: a BEFORE DELETE/UPDATE trigger raises an exception, so an
 * authorization audit trail that could be quietly edited or erased by
 * application code (a bug, or a compromised account with DB write access)
 * isn't one. No UPDATE or DELETE path is ever wired up in the app to begin
 * with — the trigger makes that a DB-level guarantee, not just a
 * convention.
 *
 * ── Why subject/resource/risk/assurance are typed columns, not one JSONB
 *    blob ────────────────────────────────────────────────────────────────
 * Unlike `policy_admin_audit_log`'s `before`/`after` (opaque
 * `PolicyRecord` snapshots with no fixed query shape — see that table's
 * own header), Phase 17's field list is fixed and roadmap-specified, and
 * every field on it is something an incident-response query needs to
 * filter/aggregate by directly ("every DENY for user 42", "every HIGH_RISK
 * decision this week", "every decision against policy X version 3") —
 * columns get real indexes; a JSONB blob would not.
 *
 * ── No DB-level FOREIGN KEY constraints ────────────────────────────────────
 * Matches every other table in this schema directory (see
 * `policy-registry.ts`'s own header) — `subjectUserId` is a plain indexed
 * integer, not `.references()`.
 */
export declare const authorizationAuditLogTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "authorization_audit_log";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "authorization_audit_log";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        decisionId: import("drizzle-orm/pg-core").PgColumn<{
            name: "decision_id";
            tableName: "authorization_audit_log";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        requestId: import("drizzle-orm/pg-core").PgColumn<{
            name: "request_id";
            tableName: "authorization_audit_log";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        subjectUserId: import("drizzle-orm/pg-core").PgColumn<{
            name: "subject_user_id";
            tableName: "authorization_audit_log";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        subjectRole: import("drizzle-orm/pg-core").PgColumn<{
            name: "subject_role";
            tableName: "authorization_audit_log";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        subjectAuthType: import("drizzle-orm/pg-core").PgColumn<{
            name: "subject_auth_type";
            tableName: "authorization_audit_log";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        subjectOrganizationId: import("drizzle-orm/pg-core").PgColumn<{
            name: "subject_organization_id";
            tableName: "authorization_audit_log";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        product: import("drizzle-orm/pg-core").PgColumn<{
            name: "product";
            tableName: "authorization_audit_log";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        resourceType: import("drizzle-orm/pg-core").PgColumn<{
            name: "resource_type";
            tableName: "authorization_audit_log";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        resourceId: import("drizzle-orm/pg-core").PgColumn<{
            name: "resource_id";
            tableName: "authorization_audit_log";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        action: import("drizzle-orm/pg-core").PgColumn<{
            name: "action";
            tableName: "authorization_audit_log";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        decision: import("drizzle-orm/pg-core").PgColumn<{
            name: "decision";
            tableName: "authorization_audit_log";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        reasonCode: import("drizzle-orm/pg-core").PgColumn<{
            name: "reason_code";
            tableName: "authorization_audit_log";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        policyId: import("drizzle-orm/pg-core").PgColumn<{
            name: "policy_id";
            tableName: "authorization_audit_log";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        policyVersion: import("drizzle-orm/pg-core").PgColumn<{
            name: "policy_version";
            tableName: "authorization_audit_log";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        risk: import("drizzle-orm/pg-core").PgColumn<{
            name: "risk";
            tableName: "authorization_audit_log";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        assuranceMethods: import("drizzle-orm/pg-core").PgColumn<{
            name: "assurance_methods";
            tableName: "authorization_audit_log";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        requiredAssurance: import("drizzle-orm/pg-core").PgColumn<{
            name: "required_assurance";
            tableName: "authorization_audit_log";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        timestamp: import("drizzle-orm/pg-core").PgColumn<{
            name: "timestamp";
            tableName: "authorization_audit_log";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        latencyMs: import("drizzle-orm/pg-core").PgColumn<{
            name: "latency_ms";
            tableName: "authorization_audit_log";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "authorization_audit_log";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export type AuthorizationAuditLogRow = typeof authorizationAuditLogTable.$inferSelect;
export type NewAuthorizationAuditLogRow = typeof authorizationAuditLogTable.$inferInsert;
//# sourceMappingURL=authorization-audit-log.d.ts.map