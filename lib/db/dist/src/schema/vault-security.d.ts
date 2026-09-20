/**
 * schema/vault-security.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Phase 5 — Vault Security: PINs & Session.
 *
 * One row per user. Two independent 4-digit PINs, both stored hashed (never
 * plaintext) via lib/password.ts's bcrypt helpers — the same hashing used for
 * account passwords:
 *
 *   vaultPinHash  — required to unlock Vault itself (gates all /vault/* pages,
 *                   see components/vault/vault-unlock-gate.tsx on the frontend).
 *   entityPinHash — required to view any entity's details. One shared PIN for
 *                   every entity, independent of vaultPinHash (changing one
 *                   never touches the other — see routes/vault-security.ts).
 *
 * Either column may be NULL — a user who hasn't set a given PIN yet is not
 * gated by it (see the frontend gate: no PIN set → no lock screen). This is
 * what lets a brand-new user reach /vault/security to set their first PIN
 * without being locked out of the page that sets it.
 */
export declare const vaultSecurityTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "vault_security";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "vault_security";
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
        userId: import("drizzle-orm/pg-core").PgColumn<{
            name: "user_id";
            tableName: "vault_security";
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
        vaultPinHash: import("drizzle-orm/pg-core").PgColumn<{
            name: "vault_pin_hash";
            tableName: "vault_security";
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
        entityPinHash: import("drizzle-orm/pg-core").PgColumn<{
            name: "entity_pin_hash";
            tableName: "vault_security";
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
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "vault_security";
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
export type VaultSecurity = typeof vaultSecurityTable.$inferSelect;
//# sourceMappingURL=vault-security.d.ts.map