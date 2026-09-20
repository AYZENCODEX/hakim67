/**
 * schema/vault-snapshots.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Feature 15b — Stored Vault Backups.
 *
 * routes/vault-snapshot.ts (Feature 15) already builds a password-encrypted
 * full-vault blob, but until now it only ever streamed that blob straight to
 * the browser as a download — nothing was kept server-side, so "backup" was
 * really just an export button: lose the file and the backup is gone, and
 * there was no way to see what backups even existed.
 *
 * This table makes the vault the actual backup store: every export is also
 * persisted here (see POST /vault/snapshot/export), so the Snapshot Backup
 * page can list, re-download, restore-from, or delete past backups without
 * the user having to keep track of downloaded .ayzenbak files themselves.
 *
 * The stored `blob` is the exact same AYZENBAK1:... string that would be
 * written to a downloaded file — it is already AES-256-GCM encrypted with a
 * password AYZEN never sees again after the request completes, so storing it
 * server-side adds no new secret exposure: without the password this row is
 * just as unreadable as a downloaded file would be.
 */
export declare const vaultSnapshotsTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "vault_snapshots";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "vault_snapshots";
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
            tableName: "vault_snapshots";
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
        label: import("drizzle-orm/pg-core").PgColumn<{
            name: "label";
            tableName: "vault_snapshots";
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
        blob: import("drizzle-orm/pg-core").PgColumn<{
            name: "blob";
            tableName: "vault_snapshots";
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
        sizeBytes: import("drizzle-orm/pg-core").PgColumn<{
            name: "size_bytes";
            tableName: "vault_snapshots";
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
        includesAttachments: import("drizzle-orm/pg-core").PgColumn<{
            name: "includes_attachments";
            tableName: "vault_snapshots";
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
        entriesCount: import("drizzle-orm/pg-core").PgColumn<{
            name: "entries_count";
            tableName: "vault_snapshots";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
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
        walletsCount: import("drizzle-orm/pg-core").PgColumn<{
            name: "wallets_count";
            tableName: "vault_snapshots";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
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
        mailboxCount: import("drizzle-orm/pg-core").PgColumn<{
            name: "mailbox_count";
            tableName: "vault_snapshots";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
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
        projectsCount: import("drizzle-orm/pg-core").PgColumn<{
            name: "projects_count";
            tableName: "vault_snapshots";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
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
        tasksCount: import("drizzle-orm/pg-core").PgColumn<{
            name: "tasks_count";
            tableName: "vault_snapshots";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
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
        financeCount: import("drizzle-orm/pg-core").PgColumn<{
            name: "finance_count";
            tableName: "vault_snapshots";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
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
        walletHubCount: import("drizzle-orm/pg-core").PgColumn<{
            name: "wallet_hub_count";
            tableName: "vault_snapshots";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
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
        activityCount: import("drizzle-orm/pg-core").PgColumn<{
            name: "activity_count";
            tableName: "vault_snapshots";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
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
        entityCoverageCount: import("drizzle-orm/pg-core").PgColumn<{
            name: "entity_coverage_count";
            tableName: "vault_snapshots";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
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
        emergencyAccessCount: import("drizzle-orm/pg-core").PgColumn<{
            name: "emergency_access_count";
            tableName: "vault_snapshots";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
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
        accountExtrasCount: import("drizzle-orm/pg-core").PgColumn<{
            name: "account_extras_count";
            tableName: "vault_snapshots";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
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
        teamCount: import("drizzle-orm/pg-core").PgColumn<{
            name: "team_count";
            tableName: "vault_snapshots";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
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
        earningCount: import("drizzle-orm/pg-core").PgColumn<{
            name: "earning_count";
            tableName: "vault_snapshots";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
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
        backupSystemCount: import("drizzle-orm/pg-core").PgColumn<{
            name: "backup_system_count";
            tableName: "vault_snapshots";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
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
        emailAccountsCount: import("drizzle-orm/pg-core").PgColumn<{
            name: "email_accounts_count";
            tableName: "vault_snapshots";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
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
        mailboxReputationCount: import("drizzle-orm/pg-core").PgColumn<{
            name: "mailbox_reputation_count";
            tableName: "vault_snapshots";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
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
        externalMailCount: import("drizzle-orm/pg-core").PgColumn<{
            name: "external_mail_count";
            tableName: "vault_snapshots";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
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
        checksum: import("drizzle-orm/pg-core").PgColumn<{
            name: "checksum";
            tableName: "vault_snapshots";
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
        source: import("drizzle-orm/pg-core").PgColumn<{
            name: "source";
            tableName: "vault_snapshots";
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
        encryptionMode: import("drizzle-orm/pg-core").PgColumn<{
            name: "encryption_mode";
            tableName: "vault_snapshots";
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
        encryptionVersion: import("drizzle-orm/pg-core").PgColumn<{
            name: "encryption_version";
            tableName: "vault_snapshots";
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
        deletedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "deleted_at";
            tableName: "vault_snapshots";
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
            tableName: "vault_snapshots";
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
export declare const insertVaultSnapshotSchema: import("zod/v4").ZodObject<{
    userId: import("zod/v4").ZodInt;
    label: import("zod/v4").ZodOptional<import("zod/v4").ZodNullable<import("zod/v4").ZodString>>;
    deletedAt: import("zod/v4").ZodOptional<import("zod/v4").ZodNullable<import("zod/v4").ZodDate>>;
    source: import("zod/v4").ZodOptional<import("zod/v4").ZodString>;
    blob: import("zod/v4").ZodString;
    sizeBytes: import("zod/v4").ZodInt;
    includesAttachments: import("zod/v4").ZodOptional<import("zod/v4").ZodBoolean>;
    entriesCount: import("zod/v4").ZodOptional<import("zod/v4").ZodInt>;
    walletsCount: import("zod/v4").ZodOptional<import("zod/v4").ZodInt>;
    mailboxCount: import("zod/v4").ZodOptional<import("zod/v4").ZodInt>;
    projectsCount: import("zod/v4").ZodOptional<import("zod/v4").ZodInt>;
    tasksCount: import("zod/v4").ZodOptional<import("zod/v4").ZodInt>;
    financeCount: import("zod/v4").ZodOptional<import("zod/v4").ZodInt>;
    walletHubCount: import("zod/v4").ZodOptional<import("zod/v4").ZodInt>;
    activityCount: import("zod/v4").ZodOptional<import("zod/v4").ZodInt>;
    entityCoverageCount: import("zod/v4").ZodOptional<import("zod/v4").ZodInt>;
    emergencyAccessCount: import("zod/v4").ZodOptional<import("zod/v4").ZodInt>;
    accountExtrasCount: import("zod/v4").ZodOptional<import("zod/v4").ZodInt>;
    teamCount: import("zod/v4").ZodOptional<import("zod/v4").ZodInt>;
    earningCount: import("zod/v4").ZodOptional<import("zod/v4").ZodInt>;
    backupSystemCount: import("zod/v4").ZodOptional<import("zod/v4").ZodInt>;
    emailAccountsCount: import("zod/v4").ZodOptional<import("zod/v4").ZodInt>;
    mailboxReputationCount: import("zod/v4").ZodOptional<import("zod/v4").ZodInt>;
    externalMailCount: import("zod/v4").ZodOptional<import("zod/v4").ZodInt>;
    checksum: import("zod/v4").ZodOptional<import("zod/v4").ZodNullable<import("zod/v4").ZodString>>;
    encryptionMode: import("zod/v4").ZodOptional<import("zod/v4").ZodString>;
    encryptionVersion: import("zod/v4").ZodOptional<import("zod/v4").ZodNullable<import("zod/v4").ZodInt>>;
}, {
    out: {};
    in: {};
}>;
//# sourceMappingURL=vault-snapshots.d.ts.map