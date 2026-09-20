/**
 * schema/vault-backup-audit-log.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Vault Backup hardening, Round 6 — dedicated audit trail (migration 073).
 *
 * Append-only (DB-enforced, see the migration's UPDATE/DELETE triggers) log
 * of every security-relevant vault-backup event: ciphertext leaving the
 * server (download), a stored backup being decrypted/restored/deleted, a
 * schedule's off-vault destination changing (email/webhook/cloud), a cloud
 * connection being made or revoked, and every DEK rotation (manual or
 * automatic). See lib/vault-backup-audit.ts for the write helper and the
 * full event_type vocabulary.
 */
export declare const vaultBackupAuditLogTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "vault_backup_audit_log";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "vault_backup_audit_log";
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
        ownerUserId: import("drizzle-orm/pg-core").PgColumn<{
            name: "owner_user_id";
            tableName: "vault_backup_audit_log";
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
        actorUserId: import("drizzle-orm/pg-core").PgColumn<{
            name: "actor_user_id";
            tableName: "vault_backup_audit_log";
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
        actorKind: import("drizzle-orm/pg-core").PgColumn<{
            name: "actor_kind";
            tableName: "vault_backup_audit_log";
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
        eventType: import("drizzle-orm/pg-core").PgColumn<{
            name: "event_type";
            tableName: "vault_backup_audit_log";
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
        snapshotId: import("drizzle-orm/pg-core").PgColumn<{
            name: "snapshot_id";
            tableName: "vault_backup_audit_log";
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
        keyVersion: import("drizzle-orm/pg-core").PgColumn<{
            name: "key_version";
            tableName: "vault_backup_audit_log";
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
        ip: import("drizzle-orm/pg-core").PgColumn<{
            name: "ip";
            tableName: "vault_backup_audit_log";
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
        userAgent: import("drizzle-orm/pg-core").PgColumn<{
            name: "user_agent";
            tableName: "vault_backup_audit_log";
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
        detail: import("drizzle-orm/pg-core").PgColumn<{
            name: "detail";
            tableName: "vault_backup_audit_log";
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
            tableName: "vault_backup_audit_log";
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
export type VaultBackupAuditLogRow = typeof vaultBackupAuditLogTable.$inferSelect;
//# sourceMappingURL=vault-backup-audit-log.d.ts.map