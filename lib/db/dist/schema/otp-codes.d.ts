/**
 * schema/otp-codes.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * BUG FIX — "code always says expired/invalid, even right after receiving it,
 * even after resend."
 *
 * ROOT CAUSE: lib/otp-store.ts used to keep codes in a plain in-memory
 * `Map()`. That works fine on a single long-running process, but .replit
 * has `deploymentTarget = "autoscale"` — Replit (and Render, where this is
 * also deployed per replit.md) can and does run multiple stateless instances
 * of api-server, and can recycle/restart an instance at any time. Whichever
 * instance handled POST /auth/send-otp stored the code in ITS OWN memory.
 * The very next request (verify, or even a resend) can just as easily land
 * on a different instance — which has never seen that code, so it always
 * looks "expired or invalid" no matter how fast or how many times the user
 * retries. This is not a race condition or a timing bug, it's structural:
 * an in-memory Map can never work correctly behind a multi-instance/
 * autoscale deployment.
 *
 * FIX: move the store into Postgres (this table), which every instance
 * already shares. Codes are hashed (sha256) before being written — same
 * reasoning as never storing plaintext passwords — since a raw 6-digit code
 * sitting in a DB dump/backup would otherwise be trivially replayable during
 * its 10-minute window.
 *
 * `key` is the same arbitrary string lib/otp-store.ts always used: an email
 * address for signup/login/reset codes, or `stepup:<challengeToken>` for the
 * anomalous-IP step-up flow (see routes/passkey.ts). One row per key —
 * requesting a new code (send or resend) overwrites the previous row for
 * that key, so only the most recently sent code is ever valid, matching the
 * old Map's `.set()` semantics.
 */
export declare const otpCodesTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "otp_codes";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "otp_codes";
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
        key: import("drizzle-orm/pg-core").PgColumn<{
            name: "key";
            tableName: "otp_codes";
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
        codeHash: import("drizzle-orm/pg-core").PgColumn<{
            name: "code_hash";
            tableName: "otp_codes";
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
        expiresAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "expires_at";
            tableName: "otp_codes";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
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
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "otp_codes";
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
export type OtpCodeRow = typeof otpCodesTable.$inferSelect;
//# sourceMappingURL=otp-codes.d.ts.map