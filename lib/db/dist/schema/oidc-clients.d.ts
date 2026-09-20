import { z } from "zod/v4";
/**
 * schema/oidc-clients.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * OIDC Roadmap — Season 1, Phase 2A: Client registry table design
 * (migration 079).
 *
 * The trusted registry of first-party OIDC clients (Sylo, Ryft, Wisp, Verve,
 * Zynth) that Phase 3's `/oidc/authorize` and `/oidc/token` endpoints will
 * validate every request against — which `client_id`s exist, which
 * `redirect_uris` each may send a user back to, and which `allowed_scopes`
 * each may request. Today nothing reads or writes this table; it's the
 * storage layer only.
 *
 * `clientSecretHash` is nullable: a first-party client doing Authorization
 * Code + PKCE (required for all first-party clients per the roadmap's
 * global security requirements, section 3.2) doesn't strictly need a
 * client secret — PKCE is the proof of possession. Whether Sylo etc. end up
 * confidential or public is a Phase 2B seeding decision, not this one.
 *
 * `redirectUris` / `allowedScopes` are JSONB arrays of strings, matching the
 * existing `api_keys.scopes` precedent rather than introducing a native
 * Postgres array column type into this codebase.
 *
 * Scope note: schema ONLY, same discipline as the migration — no seed data
 * (Phase 2B), no repository/data-access helpers (Phase 2C-a), no
 * redirect-uri or scope validation (Phase 2C/2D), no wiring into
 * `/oidc/authorize` (Phase 2E). Do not add fields beyond what 2A-a
 * specifies unless a later phase concretely needs them.
 *
 * UPDATE — Season 3, Phase 6a-d (migration 084): `postLogoutRedirectUris`
 * added. RP-Initiated Logout 1.0's own registered allow-list — a JSONB
 * array of strings with the identical shape/default/nullability as
 * `redirectUris` above, for the identical reason (see migration 084's own
 * header): a Sign-out target and an OAuth callback target are two
 * independent registered lists, never one reused for both purposes.
 *
 * UPDATE — Season 3, Phase 6e-b (migration 085): `backchannelLogoutUri`
 * added. A single nullable TEXT column (not JSONB — this is one URI per
 * client, never a list), `null` by default/fail-closed. See migration
 * 085's own header for why this is a third, independent column rather
 * than folded into `redirectUris` or `postLogoutRedirectUris`, and
 * `lib/oidc-clients.ts`'s `listBackchannelLogoutTargets()` for the one
 * reader.
 */
export declare const oidcClientsTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "oidc_clients";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "oidc_clients";
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
        clientId: import("drizzle-orm/pg-core").PgColumn<{
            name: "client_id";
            tableName: "oidc_clients";
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
        clientSecretHash: import("drizzle-orm/pg-core").PgColumn<{
            name: "client_secret_hash";
            tableName: "oidc_clients";
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
        redirectUris: import("drizzle-orm/pg-core").PgColumn<{
            name: "redirect_uris";
            tableName: "oidc_clients";
            dataType: "json";
            columnType: "PgJsonb";
            data: string[];
            driverParam: unknown;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: string[];
        }>;
        postLogoutRedirectUris: import("drizzle-orm/pg-core").PgColumn<{
            name: "post_logout_redirect_uris";
            tableName: "oidc_clients";
            dataType: "json";
            columnType: "PgJsonb";
            data: string[];
            driverParam: unknown;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: string[];
        }>;
        backchannelLogoutUri: import("drizzle-orm/pg-core").PgColumn<{
            name: "backchannel_logout_uri";
            tableName: "oidc_clients";
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
        allowedScopes: import("drizzle-orm/pg-core").PgColumn<{
            name: "allowed_scopes";
            tableName: "oidc_clients";
            dataType: "json";
            columnType: "PgJsonb";
            data: string[];
            driverParam: unknown;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: string[];
        }>;
        isFirstParty: import("drizzle-orm/pg-core").PgColumn<{
            name: "is_first_party";
            tableName: "oidc_clients";
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
            tableName: "oidc_clients";
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
            tableName: "oidc_clients";
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
export declare const insertOidcClientSchema: z.ZodObject<{
    clientId: z.ZodString;
    clientSecretHash: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    redirectUris: z.ZodArray<z.ZodString>;
    postLogoutRedirectUris: z.ZodArray<z.ZodString>;
    backchannelLogoutUri: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    allowedScopes: z.ZodArray<z.ZodString>;
    isFirstParty: z.ZodOptional<z.ZodBoolean>;
}, {
    out: {};
    in: {};
}>;
export type InsertOidcClient = z.infer<typeof insertOidcClientSchema>;
export type OidcClientRow = typeof oidcClientsTable.$inferSelect;
//# sourceMappingURL=oidc-clients.d.ts.map