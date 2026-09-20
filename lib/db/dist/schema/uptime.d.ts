/**
 * uptime_pings
 * ─────────────────────────────────────────────────────────────────────────────
 * One row per keepalive/health check (see services/uptime-bot.ts). The bot
 * pings the server's own public URL every few minutes so free-tier hosts
 * (Render/Replit) that sleep on inbound-traffic inactivity never see a long
 * enough gap to spin the app down — and every ping's result is logged here
 * so the public status page (client/pages/status.tsx) can show live status +
 * 24h/7d/30d uptime % + a response-time history, without depending on a
 * third-party monitoring service.
 */
export declare const uptimePingsTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "uptime_pings";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "uptime_pings";
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
        target: import("drizzle-orm/pg-core").PgColumn<{
            name: "target";
            tableName: "uptime_pings";
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
        isUp: import("drizzle-orm/pg-core").PgColumn<{
            name: "is_up";
            tableName: "uptime_pings";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
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
        statusCode: import("drizzle-orm/pg-core").PgColumn<{
            name: "status_code";
            tableName: "uptime_pings";
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
        latencyMs: import("drizzle-orm/pg-core").PgColumn<{
            name: "latency_ms";
            tableName: "uptime_pings";
            dataType: "number";
            columnType: "PgReal";
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
        errorMessage: import("drizzle-orm/pg-core").PgColumn<{
            name: "error_message";
            tableName: "uptime_pings";
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
        checkedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "checked_at";
            tableName: "uptime_pings";
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
//# sourceMappingURL=uptime.d.ts.map