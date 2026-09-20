import { z } from "zod/v4";
/**
 * schema/temporary-access-grants.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * AYZEN Policy & Authorization Mega Engine — Phase 11 (Temporary / Expiring
 * Access). Data model backing `lib/policy/temporary-access/temporary-access-
 * rule.ts`. This file is schema ONLY (Drizzle table def + insert-schema
 * validation) — the actual matching/expiry logic lives in
 * `artifacts/api-server/src/lib/policy/temporary-access/*`, not here. Same
 * `lib/db`-must-not-depend-on-`lib/policy` boundary `resource-grants.ts` /
 * `rbac.ts` document.
 *
 * ── Why this is a NEW table, not `expiresAt`/`startsAt` bolted onto
 *    `resource_grants` ──────────────────────────────────────────────────────
 * `resource-grants.ts`'s own header already flagged this exact question
 * ("Why there is no `expiresAt` column yet") and left it for "a future
 * sharing/admin-console phase that actually needs expiring shares". Two
 * things changed by the time Phase 11 actually needs it:
 *
 *   1. `resource_grants` is EXACT-MATCH-ONLY by design (one row per
 *      (subject, resourceType, resourceId, action), enforced by a unique
 *      index — see that file's header) — reasonable for a PERMANENT grant,
 *      where each explicit statement is meant to be a single, durable
 *      source of truth. A short-lived grant is very often broader than one
 *      resource instance ("give this contractor 48h read access to every
 *      vault item in org 7", not one specific item) — cramming that into
 *      `resource_grants`' one-row-per-exact-tuple shape would mean writing
 *      (and later expiring) one row per resource, which does not fit a
 *      table designed around a permanent 1:1 mapping.
 *   2. `resource_grants` has no `effect: "allow" | "deny"` distinction this
 *      table needs to preserve — a *temporary* grant is inherently about
 *      GRANTING (the roadmap's own Phase 11 section says "Support grants
 *      with: ..." — it never asks for a time-boxed deny). Keeping this
 *      table allow-only (no `effect` column at all) means
 *      `temporary-access-rule.ts` can never produce an unexpected DENY from
 *      a row whose only job was to add a time-limited access path — see
 *      that file's own header for the full reasoning.
 *
 * ── The `scope` column — what makes this broader than `resource_grants` ────
 * The roadmap's Phase 11 field list names `scope` as its own field,
 * separate from `resource`/`action`. This table gives it a concrete,
 * two-value meaning:
 *   - `"resource"`  — same exact-match granularity as `resource_grants`:
 *     this grant covers only `resourceType` + this exact `resourceId` +
 *     `action`.
 *   - `"resource_type"` — covers EVERY resource of `resourceType` (for this
 *     `action`), optionally narrowed further to one `organizationId`.
 *     `resourceId` is NULL for these rows — see the CHECK constraint in the
 *     matching migration, which the insert schema below mirrors at the
 *     application layer.
 *
 * ── Why `startsAt`/`expiresAt` are both required, not just `expiresAt` ─────
 * The roadmap's own field list names both `startsAt` and `expiresAt`
 * explicitly ("Support grants with: ... startsAt, expiresAt, ..."). A grant
 * that is not yet active (now < startsAt) must not authorize any more than
 * an already-expired one — "temporary access" means a bounded WINDOW, not
 * merely a deadline. `temporary-access-rule.ts` checks both bounds against
 * `request.context.timestamp` (never a fresh `new Date()` read inside the
 * rule — see that file's header for why: Rule 12, deterministic
 * evaluation).
 *
 * ── No DB-level FOREIGN KEY constraints ────────────────────────────────────
 * Same posture as `resource_grants.ts`/`rbac.ts` — `subjectUserId`/
 * `grantedBy` are plain indexed integers, not `.references()`.
 *
 * ── No `revokedAt` / early-termination column yet ──────────────────────────
 * The roadmap's Phase 11 section does not ask for early revocation (that is
 * closer to Phase 23's admin console / a PAP write-path concern) — adding an
 * unused nullable column now, with no writer to ever populate it, would be
 * speculative schema per Rule 16 ("do not implement future phases
 * prematurely"). A grant that should stop early today can simply have its
 * `expiresAt` updated by whatever future admin surface manages these rows;
 * nothing about this schema forecloses adding a dedicated `revokedAt` column
 * (and a "revoked beats expiresAt" check in the rule) later.
 */
export declare const temporaryAccessGrantsTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "temporary_access_grants";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "temporary_access_grants";
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
        subjectUserId: import("drizzle-orm/pg-core").PgColumn<{
            name: "subject_user_id";
            tableName: "temporary_access_grants";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
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
        resourceType: import("drizzle-orm/pg-core").PgColumn<{
            name: "resource_type";
            tableName: "temporary_access_grants";
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
        resourceId: import("drizzle-orm/pg-core").PgColumn<{
            name: "resource_id";
            tableName: "temporary_access_grants";
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
            tableName: "temporary_access_grants";
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
        scope: import("drizzle-orm/pg-core").PgColumn<{
            name: "scope";
            tableName: "temporary_access_grants";
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
        organizationId: import("drizzle-orm/pg-core").PgColumn<{
            name: "organization_id";
            tableName: "temporary_access_grants";
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
        startsAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "starts_at";
            tableName: "temporary_access_grants";
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
        expiresAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "expires_at";
            tableName: "temporary_access_grants";
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
        grantedBy: import("drizzle-orm/pg-core").PgColumn<{
            name: "granted_by";
            tableName: "temporary_access_grants";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
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
        reason: import("drizzle-orm/pg-core").PgColumn<{
            name: "reason";
            tableName: "temporary_access_grants";
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
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "temporary_access_grants";
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
export declare const insertTemporaryAccessGrantSchema: z.ZodObject<{
    action: z.ZodString;
    expiresAt: z.ZodDate;
    grantedBy: z.ZodInt;
    reason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    subjectUserId: z.ZodInt;
    resourceType: z.ZodString;
    resourceId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    scope: z.ZodString & z.ZodType<"resource_type" | "resource", string, z.core.$ZodTypeInternals<"resource_type" | "resource", string>>;
    organizationId: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
    startsAt: z.ZodDate;
}, {
    out: {};
    in: {};
}>;
export type InsertTemporaryAccessGrant = z.infer<typeof insertTemporaryAccessGrantSchema>;
export type TemporaryAccessGrantRow = typeof temporaryAccessGrantsTable.$inferSelect;
//# sourceMappingURL=temporary-access-grants.d.ts.map