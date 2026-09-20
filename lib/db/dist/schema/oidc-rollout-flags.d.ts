/**
 * schema/oidc-rollout-flags.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * OIDC Roadmap — Season 3, Phase 5c-a: Rollout Flag Storage (schema half).
 *
 * One row per `app_id`, holding whether that app currently authenticates via
 * OIDC (`true`) or the old shared-cookie credential path (`false`/no row).
 * `lib/oidc-client-rollout.ts` is the only reader/writer of this table
 * (`getOidcRolloutFlag()` / `setOidcRolloutFlag()`) — this file is schema
 * only, same discipline every other schema file in this roadmap follows
 * (see `schema/jwt-signing-keys.ts`, `schema/oidc-clients.ts`).
 *
 * `oidc_enabled` defaults to `false` at the column level in addition to
 * `lib/oidc-client-rollout.ts`'s own in-code fail-safe (`enabled = false` on
 * any read error) — belt-and-suspenders so a row inserted by anything other
 * than `setOidcRolloutFlag()` (a manual `INSERT`, a future admin tool) still
 * starts disabled rather than silently enabling OIDC for an app_id no one
 * meant to migrate yet.
 *
 * No foreign key to `oidc_clients` (migration 079) — `app_id` here is
 * intentionally a free-standing string, not a reference to that table's
 * `client_id`. A rollout flag can exist (and stay `false`) for an app_id
 * that has no OIDC client registration yet; the two tables answer different
 * questions ("is this app_id allowed to request tokens at all" vs. "should
 * THIS app_id's users be sent through OIDC login right now") and are read by
 * different call sites for different reasons.
 */
export declare const oidcClientRolloutFlagsTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "oidc_client_rollout_flags";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "oidc_client_rollout_flags";
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
        appId: import("drizzle-orm/pg-core").PgColumn<{
            name: "app_id";
            tableName: "oidc_client_rollout_flags";
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
        oidcEnabled: import("drizzle-orm/pg-core").PgColumn<{
            name: "oidc_enabled";
            tableName: "oidc_client_rollout_flags";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
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
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "oidc_client_rollout_flags";
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
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "oidc_client_rollout_flags";
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
export type OidcClientRolloutFlagRow = typeof oidcClientRolloutFlagsTable.$inferSelect;
//# sourceMappingURL=oidc-rollout-flags.d.ts.map