/**
 * schema/vault-backup-cloud-connections.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Feature 15l — Cloud Backup Delivery (migration 063).
 *
 * One row per (userId, provider) — an OAuth connection to the user's own
 * Google Drive or Dropbox account, used by lib/vault-backup-delivery.ts to
 * push a copy of a vault_snapshots blob there, the same way "email" and
 * "webhook" destinations already work (see vault-backup-schedules.ts's
 * `destination` column, which now also accepts "google_drive" | "dropbox").
 *
 * accessToken/refreshToken are always stored through encryptField()/
 * decryptField() (lib/vault-crypto.ts) — same envelope-encryption machinery
 * every other Vault secret uses, so this rides the same key-rotation story
 * rather than introducing a second one.
 */
export declare const vaultBackupCloudConnectionsTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "vault_backup_cloud_connections";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "vault_backup_cloud_connections";
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
            tableName: "vault_backup_cloud_connections";
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
        provider: import("drizzle-orm/pg-core").PgColumn<{
            name: "provider";
            tableName: "vault_backup_cloud_connections";
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
        accessToken: import("drizzle-orm/pg-core").PgColumn<{
            name: "access_token";
            tableName: "vault_backup_cloud_connections";
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
        refreshToken: import("drizzle-orm/pg-core").PgColumn<{
            name: "refresh_token";
            tableName: "vault_backup_cloud_connections";
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
        expiresAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "expires_at";
            tableName: "vault_backup_cloud_connections";
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
        accountLabel: import("drizzle-orm/pg-core").PgColumn<{
            name: "account_label";
            tableName: "vault_backup_cloud_connections";
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
        folderId: import("drizzle-orm/pg-core").PgColumn<{
            name: "folder_id";
            tableName: "vault_backup_cloud_connections";
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
            tableName: "vault_backup_cloud_connections";
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
            tableName: "vault_backup_cloud_connections";
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
export type VaultBackupCloudConnection = typeof vaultBackupCloudConnectionsTable.$inferSelect;
//# sourceMappingURL=vault-backup-cloud-connections.d.ts.map