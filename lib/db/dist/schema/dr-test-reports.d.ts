/**
 * schema/dr-test-reports.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * DR Evidence Collector — Phase 1 (Backup Integrity) + Phase 2 (Schema-
 * Isolated Restore). See dr-evidence-collector-design.md for the full
 * multi-phase design this table is drawn from (§3 Data Model).
 *
 * Phase 1 only ran the two checks that need no restore and no isolated
 * schema at all — verifyStoredChecksum() and envelopeDecryptBackup(), both
 * already implemented for the manual/scheduled backup paths — and recorded
 * the result here as evidence.
 *
 * Phase 2 (migration 069, hand-applied via `drizzle-kit push` — see
 * CHANGES_DR_EVIDENCE_PHASE2.md) ALTERs in the restore-related columns
 * below: isolated_schema_name / restore_result / records_expected /
 * records_restored / rto_ms, matching how this codebase grows other tables
 * incrementally (see vault_snapshots' *Count columns across migrations
 * 056-065) rather than pre-adding columns nothing wrote to yet. Everything
 * ABOVE the "Phase 2" comment marker below is unchanged from Phase 1.
 * report_hash/prev_report_hash/runner_version (the hash chain) are still
 * Phase 3's job.
 *
 * Like vault_snapshots and every other backup-adjacent table in this app,
 * this table NEVER stores plaintext/decrypted content — envelopeDecryptBackup()
 * is called only to prove it *can* succeed, and applyRestoreDiff() restores
 * into a throwaway schema that's dropped before this row is even written;
 * only counts, timestamps, pass/fail, and checksum/schema-name values are
 * recorded, matching the discipline already documented on vault_snapshots /
 * buildRestoreDiff().
 */
export declare const drTestReportsTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "dr_test_reports";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "dr_test_reports";
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
        testId: import("drizzle-orm/pg-core").PgColumn<{
            name: "test_id";
            tableName: "dr_test_reports";
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
        triggeredBy: import("drizzle-orm/pg-core").PgColumn<{
            name: "triggered_by";
            tableName: "dr_test_reports";
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
        snapshotId: import("drizzle-orm/pg-core").PgColumn<{
            name: "snapshot_id";
            tableName: "dr_test_reports";
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
        encryptionMode: import("drizzle-orm/pg-core").PgColumn<{
            name: "encryption_mode";
            tableName: "dr_test_reports";
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
        keyVersion: import("drizzle-orm/pg-core").PgColumn<{
            name: "key_version";
            tableName: "dr_test_reports";
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
        backupChecksum: import("drizzle-orm/pg-core").PgColumn<{
            name: "backup_checksum";
            tableName: "dr_test_reports";
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
        startedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "started_at";
            tableName: "dr_test_reports";
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
        completedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "completed_at";
            tableName: "dr_test_reports";
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
        checksumResult: import("drizzle-orm/pg-core").PgColumn<{
            name: "checksum_result";
            tableName: "dr_test_reports";
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
        decryptionResult: import("drizzle-orm/pg-core").PgColumn<{
            name: "decryption_result";
            tableName: "dr_test_reports";
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
        isolatedSchemaName: import("drizzle-orm/pg-core").PgColumn<{
            name: "isolated_schema_name";
            tableName: "dr_test_reports";
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
        restoreResult: import("drizzle-orm/pg-core").PgColumn<{
            name: "restore_result";
            tableName: "dr_test_reports";
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
        recordsExpected: import("drizzle-orm/pg-core").PgColumn<{
            name: "records_expected";
            tableName: "dr_test_reports";
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
        recordsRestored: import("drizzle-orm/pg-core").PgColumn<{
            name: "records_restored";
            tableName: "dr_test_reports";
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
        rtoMs: import("drizzle-orm/pg-core").PgColumn<{
            name: "rto_ms";
            tableName: "dr_test_reports";
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
        overallResult: import("drizzle-orm/pg-core").PgColumn<{
            name: "overall_result";
            tableName: "dr_test_reports";
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
        failureStage: import("drizzle-orm/pg-core").PgColumn<{
            name: "failure_stage";
            tableName: "dr_test_reports";
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
        failureReason: import("drizzle-orm/pg-core").PgColumn<{
            name: "failure_reason";
            tableName: "dr_test_reports";
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
            tableName: "dr_test_reports";
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
export declare const insertDrTestReportSchema: import("zod/v4").ZodObject<{
    encryptionMode: import("zod/v4").ZodOptional<import("zod/v4").ZodString>;
    snapshotId: import("zod/v4").ZodInt;
    keyVersion: import("zod/v4").ZodOptional<import("zod/v4").ZodNullable<import("zod/v4").ZodInt>>;
    testId: import("zod/v4").ZodString;
    triggeredBy: import("zod/v4").ZodOptional<import("zod/v4").ZodString>;
    backupChecksum: import("zod/v4").ZodOptional<import("zod/v4").ZodNullable<import("zod/v4").ZodString>>;
    startedAt: import("zod/v4").ZodOptional<import("zod/v4").ZodDate>;
    completedAt: import("zod/v4").ZodOptional<import("zod/v4").ZodNullable<import("zod/v4").ZodDate>>;
    checksumResult: import("zod/v4").ZodOptional<import("zod/v4").ZodNullable<import("zod/v4").ZodString>>;
    decryptionResult: import("zod/v4").ZodOptional<import("zod/v4").ZodNullable<import("zod/v4").ZodString>>;
    isolatedSchemaName: import("zod/v4").ZodOptional<import("zod/v4").ZodNullable<import("zod/v4").ZodString>>;
    restoreResult: import("zod/v4").ZodOptional<import("zod/v4").ZodNullable<import("zod/v4").ZodString>>;
    recordsExpected: import("zod/v4").ZodOptional<import("zod/v4").ZodNullable<import("zod/v4").ZodType<import("drizzle-zod").Json, unknown, import("zod/v4/core").$ZodTypeInternals<import("drizzle-zod").Json, unknown>>>>;
    recordsRestored: import("zod/v4").ZodOptional<import("zod/v4").ZodNullable<import("zod/v4").ZodType<import("drizzle-zod").Json, unknown, import("zod/v4/core").$ZodTypeInternals<import("drizzle-zod").Json, unknown>>>>;
    rtoMs: import("zod/v4").ZodOptional<import("zod/v4").ZodNullable<import("zod/v4").ZodInt>>;
    overallResult: import("zod/v4").ZodString;
    failureStage: import("zod/v4").ZodOptional<import("zod/v4").ZodNullable<import("zod/v4").ZodString>>;
    failureReason: import("zod/v4").ZodOptional<import("zod/v4").ZodNullable<import("zod/v4").ZodString>>;
}, {
    out: {};
    in: {};
}>;
//# sourceMappingURL=dr-test-reports.d.ts.map