/**
 * schema/encryption-keys.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * KMS-style envelope encryption for lib/vault-crypto.ts (see that file for the
 * full design note). This table never stores a key that can decrypt data on
 * its own:
 *
 *   - Each row holds one *data-encryption key* (DEK), but only in wrapped
 *     (encrypted) form — wrapped_dek is the DEK encrypted with the app's
 *     key-encryption key (KEK, from VAULT_MASTER_KEY / VAULT_FIELD_ENCRYPTION_KEY
 *     in the environment, never persisted to the database).
 *   - "namespace" separates independent key chains — "vault" for
 *     lib/vault-crypto.ts today; a distinct namespace (e.g. "wallet") can be
 *     added later for lib/wallet-crypto.ts without touching this one, same
 *     reasoning as the two modules already using separate keys.
 *   - "version" is what vault-crypto.ts stamps onto every ciphertext it
 *     writes ("enc:v<version>:..."), so old rows keep decrypting under the
 *     DEK that was active when they were written, even after rotation.
 *   - Exactly one row per namespace has active = true at a time — that's the
 *     DEK new writes use. Old versions are never deleted: they're needed
 *     until the reencrypt-vault script has migrated every row off them.
 *
 * Rows are created/updated only by lib/vault-crypto.ts's loadKeyManager() /
 * rotateKey() and by scripts/src/reencrypt-vault.ts — nothing else should
 * write here.
 */
export declare const encryptionKeysTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "encryption_keys";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "encryption_keys";
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
        namespace: import("drizzle-orm/pg-core").PgColumn<{
            name: "namespace";
            tableName: "encryption_keys";
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
        version: import("drizzle-orm/pg-core").PgColumn<{
            name: "version";
            tableName: "encryption_keys";
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
        wrappedDek: import("drizzle-orm/pg-core").PgColumn<{
            name: "wrapped_dek";
            tableName: "encryption_keys";
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
        active: import("drizzle-orm/pg-core").PgColumn<{
            name: "active";
            tableName: "encryption_keys";
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
            tableName: "encryption_keys";
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
export type EncryptionKeyRow = typeof encryptionKeysTable.$inferSelect;
//# sourceMappingURL=encryption-keys.d.ts.map