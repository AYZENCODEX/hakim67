/**
 * schema/vault-backup-schedules.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Feature 15c — Automatic Vault Backups (migration 056).
 *
 * One row per user, upserted by PUT /vault/backup/schedule
 * (routes/vault-backup-schedule.ts) and swept every
 * VAULT_BACKUP_SCHEDULE_CRON interval by lib/vault-backup-schedule-cron.ts.
 * When enabled and nextRunAt is due, the sweep builds the same full-vault
 * snapshot the manual export button does, encrypts it under the server
 * envelope key (lib/vault-backup-envelope.ts), stores it as a vault_snapshots
 * row (source = "scheduled"), optionally delivers a copy off-vault (email,
 * webhook, or — Feature 15l — the user's own Google Drive/Dropbox, see
 * vault-backup-deliveries.ts / vault-backup-cloud-connections.ts below),
 * then advances nextRunAt.
 */
export declare const vaultBackupSchedulesTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "vault_backup_schedules";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "vault_backup_schedules";
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
            tableName: "vault_backup_schedules";
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
        enabled: import("drizzle-orm/pg-core").PgColumn<{
            name: "enabled";
            tableName: "vault_backup_schedules";
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
        frequency: import("drizzle-orm/pg-core").PgColumn<{
            name: "frequency";
            tableName: "vault_backup_schedules";
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
        dayOfWeek: import("drizzle-orm/pg-core").PgColumn<{
            name: "day_of_week";
            tableName: "vault_backup_schedules";
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
        dayOfMonth: import("drizzle-orm/pg-core").PgColumn<{
            name: "day_of_month";
            tableName: "vault_backup_schedules";
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
        hourOfDay: import("drizzle-orm/pg-core").PgColumn<{
            name: "hour_of_day";
            tableName: "vault_backup_schedules";
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
        includeAttachments: import("drizzle-orm/pg-core").PgColumn<{
            name: "include_attachments";
            tableName: "vault_backup_schedules";
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
        destination: import("drizzle-orm/pg-core").PgColumn<{
            name: "destination";
            tableName: "vault_backup_schedules";
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
        destinationEmail: import("drizzle-orm/pg-core").PgColumn<{
            name: "destination_email";
            tableName: "vault_backup_schedules";
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
        webhookUrl: import("drizzle-orm/pg-core").PgColumn<{
            name: "webhook_url";
            tableName: "vault_backup_schedules";
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
        webhookSecret: import("drizzle-orm/pg-core").PgColumn<{
            name: "webhook_secret";
            tableName: "vault_backup_schedules";
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
        lastRunAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "last_run_at";
            tableName: "vault_backup_schedules";
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
        lastRunStatus: import("drizzle-orm/pg-core").PgColumn<{
            name: "last_run_status";
            tableName: "vault_backup_schedules";
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
        lastRunError: import("drizzle-orm/pg-core").PgColumn<{
            name: "last_run_error";
            tableName: "vault_backup_schedules";
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
        nextRunAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "next_run_at";
            tableName: "vault_backup_schedules";
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
        runningSince: import("drizzle-orm/pg-core").PgColumn<{
            name: "running_since";
            tableName: "vault_backup_schedules";
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
            tableName: "vault_backup_schedules";
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
            tableName: "vault_backup_schedules";
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
export declare const insertVaultBackupScheduleSchema: import("zod/v4").ZodObject<{
    userId: import("zod/v4").ZodInt;
    enabled: import("zod/v4").ZodOptional<import("zod/v4").ZodBoolean>;
    frequency: import("zod/v4").ZodOptional<import("zod/v4").ZodString>;
    dayOfWeek: import("zod/v4").ZodOptional<import("zod/v4").ZodInt>;
    dayOfMonth: import("zod/v4").ZodOptional<import("zod/v4").ZodInt>;
    hourOfDay: import("zod/v4").ZodOptional<import("zod/v4").ZodInt>;
    includeAttachments: import("zod/v4").ZodOptional<import("zod/v4").ZodBoolean>;
    destination: import("zod/v4").ZodOptional<import("zod/v4").ZodString>;
    destinationEmail: import("zod/v4").ZodOptional<import("zod/v4").ZodNullable<import("zod/v4").ZodString>>;
    webhookUrl: import("zod/v4").ZodOptional<import("zod/v4").ZodNullable<import("zod/v4").ZodString>>;
    webhookSecret: import("zod/v4").ZodOptional<import("zod/v4").ZodNullable<import("zod/v4").ZodString>>;
    lastRunAt: import("zod/v4").ZodOptional<import("zod/v4").ZodNullable<import("zod/v4").ZodDate>>;
    lastRunStatus: import("zod/v4").ZodOptional<import("zod/v4").ZodNullable<import("zod/v4").ZodString>>;
    lastRunError: import("zod/v4").ZodOptional<import("zod/v4").ZodNullable<import("zod/v4").ZodString>>;
    nextRunAt: import("zod/v4").ZodOptional<import("zod/v4").ZodNullable<import("zod/v4").ZodDate>>;
    runningSince: import("zod/v4").ZodOptional<import("zod/v4").ZodNullable<import("zod/v4").ZodDate>>;
}, {
    out: {};
    in: {};
}>;
export type VaultBackupSchedule = typeof vaultBackupSchedulesTable.$inferSelect;
//# sourceMappingURL=vault-backup-schedules.d.ts.map