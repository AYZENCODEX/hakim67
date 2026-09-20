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
 * vaultTwoFaSecret / vaultTwoFaEnabled — Vault's OWN TOTP 2FA, entirely
 * separate from the account-level 2FA at users.two_fa_secret (the one used
 * for login and shown on the account /security page). Set up on
 * /vault/security, this is what components/vault/vault-auth.tsx checks
 * during the password+2FA fallback of the Vault re-auth gate — see
 * routes/vault-reauth.ts, which now reads these columns instead of the
 * account's. Changing/disabling account 2FA never touches these, and vice
 * versa.
 *
 * vaultPasswordHash — Vault's OWN password, same idea as vaultTwoFaSecret
 * above but for the "password" half of the PIN/password + 2FA re-auth
 * fallback. Entirely independent of the account login password
 * (users.password_hash) — routes/vault-reauth.ts's /vault/reauth/verify
 * NEVER checks the account password, only vaultPinHash or vaultPasswordHash,
 * so a shared/observed account login can never unlock Vault on its own.
 * When both vaultPinHash and vaultPasswordHash are set, the PIN takes
 * priority (shorter, faster to enter) — see GET /vault/reauth/status's
 * usesVaultPin/usesVaultPassword fields. If NEITHER is set, Vault re-auth's
 * fallback step can't be completed at all (only passkey works, or nothing
 * does) — routes/vault-reauth.ts responds 428 CREDENTIAL_NOT_SET and sends
 * the person to /vault/security to set one up.
 *
 * All of vaultPinHash / entityPinHash / vaultPasswordHash may be NULL — a
 * user who hasn't set a given one yet is not gated by it on /vault/security
 * itself (see the frontend gates: nothing set → no lock screen there),
 * though vaultPinHash/vaultPasswordHash being both NULL does block the
 * /vault/reauth/verify fallback as described above.
 */
/**
 * authStepPolicy — governs how many of the three Vault re-auth steps
 * (1: passkey, 2: Vault PIN/password + Vault 2FA, 3: email code + Vault PIN
 * failover) must succeed before Vault unlocks. See routes/vault-reauth.ts.
 *   "any"    — passing ANY ONE step unlocks Vault (default, matches the
 *              original passkey-OR-password+2FA behavior).
 *   "step12" — steps 1 AND 2 must both succeed.
 *   "step123"— steps 1 AND 2 AND 3 must all succeed.
 * Step 3 is always available as a fail-over when step 2 can't be completed
 * (lost authenticator app), regardless of this policy — this only changes
 * whether passing it is OPTIONAL or REQUIRED for unlock.
 */
export declare const AUTH_STEP_POLICIES: readonly ["any", "step12", "step123"];
export type AuthStepPolicy = (typeof AUTH_STEP_POLICIES)[number];
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
        vaultTwoFaSecret: import("drizzle-orm/pg-core").PgColumn<{
            name: "vault_two_fa_secret";
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
        vaultTwoFaEnabled: import("drizzle-orm/pg-core").PgColumn<{
            name: "vault_two_fa_enabled";
            tableName: "vault_security";
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
        vaultPasswordHash: import("drizzle-orm/pg-core").PgColumn<{
            name: "vault_password_hash";
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
        authStepPolicy: import("drizzle-orm/pg-core").PgColumn<{
            name: "auth_step_policy";
            tableName: "vault_security";
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