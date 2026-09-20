import { z } from "zod/v4";
/**
 * schema/resource-grants.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * AYZEN Policy & Authorization Mega Engine — Phase 03 (Resource / Ownership
 * Authorization), sub-phase 3B: data model backing `lib/policy/resource/
 * explicit-grant-rule.ts`. This file is schema ONLY (Drizzle table def +
 * insert-schema validation) — the actual rule/matching logic lives in
 * `artifacts/api-server/src/lib/policy/resource/*`, not here. Same
 * `lib/db`-must-not-depend-on-`lib/policy` boundary `rbac.ts` documents.
 *
 * ── One table for both "explicit grants" and "resource-level deny" ───────
 * The roadmap's Phase 03 list names these as two separate line items
 * ("explicit grants", "resource-level deny"), but both are really the same
 * statement shape: "for this (subject, resource, action) tuple, the answer
 * is X" — only `effect` differs ("allow" vs "deny"). Splitting that into
 * two tables (an allow-grants table and a separate deny-list table) would
 * mean two lookups per request and two places a future admin/sharing UI
 * has to write to, for no additional expressiveness — a row can only ever
 * mean one or the other for a given tuple anyway (enforced below by the
 * unique index on the full tuple, so a second row can't quietly contradict
 * the first). One table, one `effect` column, one provider method
 * (`ResourceGrantProvider.getResourceGrant`) — see explicit-grant-rule.ts's
 * header for how the rule consumes this.
 *
 * ── Why `resource_id` is TEXT, not INTEGER ────────────────────────────────
 * `ResourceRef.id` (lib/policy/types.ts) is typed `string | number` because
 * different resource types in this codebase key themselves differently
 * (numeric serial ids for most tables, but not guaranteed for every future
 * resource type this engine might ever authorize against). Storing it as
 * TEXT and having the rule `String(resource.id)` before lookup (see
 * explicit-grant-rule.ts) keeps this table resource-type-agnostic instead
 * of assuming every resource is integer-keyed forever.
 *
 * ── Why there is no `expiresAt` column yet ────────────────────────────────
 * Nothing in the roadmap's Phase 03 list asks for time-boxed grants, and no
 * caller exists yet to populate one (see file header of
 * drizzle-resource-grant-provider.ts — nothing constructs that provider
 * yet either). Adding an unused nullable column now would be speculative
 * schema per Rule 16 ("do not implement future phases prematurely"); a
 * future sharing/admin-console phase that actually needs expiring shares
 * can add it then.
 *
 * ── No DB-level FOREIGN KEY constraints ────────────────────────────────────
 * Matches every other table in this schema directory (see `rbac.ts`,
 * `api-keys.ts`, etc.) — `subjectUserId`/`grantedBy` are plain indexed
 * integers, not `.references()`. An orphaned grant (subject or granter no
 * longer exists) is an application-level concern the provider is free to
 * just return as-is (the rule doesn't care whether the subject row still
 * exists — only whether the tuple was granted), consistent with the rest
 * of this codebase's referential-integrity posture.
 */
export declare const resourceGrantsTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "resource_grants";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "resource_grants";
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
            tableName: "resource_grants";
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
            tableName: "resource_grants";
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
            tableName: "resource_grants";
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
        action: import("drizzle-orm/pg-core").PgColumn<{
            name: "action";
            tableName: "resource_grants";
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
        effect: import("drizzle-orm/pg-core").PgColumn<{
            name: "effect";
            tableName: "resource_grants";
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
        grantedBy: import("drizzle-orm/pg-core").PgColumn<{
            name: "granted_by";
            tableName: "resource_grants";
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
        reason: import("drizzle-orm/pg-core").PgColumn<{
            name: "reason";
            tableName: "resource_grants";
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
            tableName: "resource_grants";
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
export declare const insertResourceGrantSchema: z.ZodObject<{
    action: z.ZodString;
    grantedBy: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
    reason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    subjectUserId: z.ZodInt;
    resourceType: z.ZodString;
    resourceId: z.ZodString;
    effect: z.ZodString & z.ZodType<"allow" | "deny", string, z.core.$ZodTypeInternals<"allow" | "deny", string>>;
}, {
    out: {};
    in: {};
}>;
export type InsertResourceGrant = z.infer<typeof insertResourceGrantSchema>;
export type ResourceGrant = typeof resourceGrantsTable.$inferSelect;
export declare const resourceAdminAuditLogTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "resource_admin_audit_log";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "resource_admin_audit_log";
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
        actorId: import("drizzle-orm/pg-core").PgColumn<{
            name: "actor_id";
            tableName: "resource_admin_audit_log";
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
        action: import("drizzle-orm/pg-core").PgColumn<{
            name: "action";
            tableName: "resource_admin_audit_log";
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
        subjectKey: import("drizzle-orm/pg-core").PgColumn<{
            name: "subject_key";
            tableName: "resource_admin_audit_log";
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
        before: import("drizzle-orm/pg-core").PgColumn<{
            name: "before";
            tableName: "resource_admin_audit_log";
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
        after: import("drizzle-orm/pg-core").PgColumn<{
            name: "after";
            tableName: "resource_admin_audit_log";
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
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "resource_admin_audit_log";
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
export declare const insertResourceAdminAuditLogSchema: z.ZodObject<{
    action: z.ZodString;
    actorId: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
    subjectKey: z.ZodString;
    before: z.ZodOptional<z.ZodNullable<z.ZodType<import("drizzle-zod").Json, unknown, z.core.$ZodTypeInternals<import("drizzle-zod").Json, unknown>>>>;
    after: z.ZodOptional<z.ZodNullable<z.ZodType<import("drizzle-zod").Json, unknown, z.core.$ZodTypeInternals<import("drizzle-zod").Json, unknown>>>>;
}, {
    out: {};
    in: {};
}>;
export type InsertResourceAdminAuditLog = z.infer<typeof insertResourceAdminAuditLogSchema>;
export type ResourceAdminAuditLog = typeof resourceAdminAuditLogTable.$inferSelect;
//# sourceMappingURL=resource-grants.d.ts.map