/**
 * schema/vault-attachments.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Feature 12 — Document/File Attachments.
 *
 * Lets a user attach small files (ID scan, contract, screenshot, etc.) to a
 * Vault entity (vault_entries row), the same way vault_activity_log and
 * vault_field_history are scoped by vaultEntryId — no FK/cascade, same
 * rationale as those tables (see schema/vault.ts).
 *
 * Storage: there is no object-storage (S3/R2/etc.) wired into this project,
 * so file bytes are base64-encoded, then encrypted at rest with the same
 * envelope-encryption helper every other Vault secret uses
 * (lib/vault-crypto.ts's encryptField/decryptField — namespace "vault",
 * columns are TEXT so this reuses the exact same DEK/KEK machinery, no new
 * key material). This keeps every credential AND every attachment behind
 * one key-rotation story instead of two.
 *
 * Because everything rides through a single TEXT column with no streaming,
 * this is deliberately sized for small documents (ID photos, PDF contracts),
 * not bulk file storage — see MAX_ATTACHMENT_BYTES in
 * routes/vault-attachments.ts. A future move to real object storage would
 * replace encryptedContent with a storage key/URL and leave every other
 * column (and the API contract) unchanged.
 */
export declare const vaultAttachmentsTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "vault_attachments";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "vault_attachments";
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
            tableName: "vault_attachments";
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
        vaultEntryId: import("drizzle-orm/pg-core").PgColumn<{
            name: "vault_entry_id";
            tableName: "vault_attachments";
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
        fileName: import("drizzle-orm/pg-core").PgColumn<{
            name: "file_name";
            tableName: "vault_attachments";
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
        mimeType: import("drizzle-orm/pg-core").PgColumn<{
            name: "mime_type";
            tableName: "vault_attachments";
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
        fileSizeBytes: import("drizzle-orm/pg-core").PgColumn<{
            name: "file_size_bytes";
            tableName: "vault_attachments";
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
        category: import("drizzle-orm/pg-core").PgColumn<{
            name: "category";
            tableName: "vault_attachments";
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
        note: import("drizzle-orm/pg-core").PgColumn<{
            name: "note";
            tableName: "vault_attachments";
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
        encryptedContent: import("drizzle-orm/pg-core").PgColumn<{
            name: "encrypted_content";
            tableName: "vault_attachments";
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
        uploadedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "uploaded_at";
            tableName: "vault_attachments";
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
            tableName: "vault_attachments";
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
export type VaultAttachment = typeof vaultAttachmentsTable.$inferSelect;
//# sourceMappingURL=vault-attachments.d.ts.map