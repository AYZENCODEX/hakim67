import { z } from "zod/v4";
/**
 * schema/jwt-signing-keys.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * OIDC Roadmap — Season 1, Phase 1C: Multi-key storage/schema (migration 078).
 *
 * Durable, kid-indexed record of every RS256 public key AYZEN Central
 * Account has ever signed session tokens with — what lib/jwt-keys.ts's
 * single env-var-resolved `getActiveKeypair()` doesn't give any visibility
 * into. Storing the PUBLIC key here (never the private key — that stays a
 * single active env var) is what lets a future rotation keep an old key
 * valid for verification during an overlap window instead of invalidating
 * every in-flight token the instant AYZEN_JWT_KID changes.
 *
 * `status` is the overlap window itself:
 *   "active"   — currently signs new tokens. Exactly one row at a time
 *                (DB-enforced, see migration 078's partial unique index) —
 *                must match the env's AYZEN_JWT_KID.
 *   "retiring" — stopped signing, still valid for verification.
 *   "retired"  — no longer valid for verification either; kept as history.
 *
 * Scope note: this file is schema ONLY, same discipline as the migration —
 * no rotation policy, no read/write helpers, no wiring into lib/jwt-keys.ts
 * or lib/jwt.ts yet. Phase 1D adds getVerificationKeys(kid?) and the
 * rotation trigger that actually reads/writes this table; Phase 1E's
 * /.well-known/jwks.json publishes what 1D writes here.
 */
export declare const jwtSigningKeysTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "jwt_signing_keys";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "jwt_signing_keys";
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
        kid: import("drizzle-orm/pg-core").PgColumn<{
            name: "kid";
            tableName: "jwt_signing_keys";
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
        publicKey: import("drizzle-orm/pg-core").PgColumn<{
            name: "public_key";
            tableName: "jwt_signing_keys";
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
        algorithm: import("drizzle-orm/pg-core").PgColumn<{
            name: "algorithm";
            tableName: "jwt_signing_keys";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        status: import("drizzle-orm/pg-core").PgColumn<{
            name: "status";
            tableName: "jwt_signing_keys";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        retiringAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "retiring_at";
            tableName: "jwt_signing_keys";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
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
        retiredAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "retired_at";
            tableName: "jwt_signing_keys";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
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
            tableName: "jwt_signing_keys";
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
export declare const insertJwtSigningKeySchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodString>;
    publicKey: z.ZodString;
    kid: z.ZodString;
    algorithm: z.ZodOptional<z.ZodString>;
    retiringAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    retiredAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
}, {
    out: {};
    in: {};
}>;
export type InsertJwtSigningKey = z.infer<typeof insertJwtSigningKeySchema>;
export type JwtSigningKeyRow = typeof jwtSigningKeysTable.$inferSelect;
//# sourceMappingURL=jwt-signing-keys.d.ts.map