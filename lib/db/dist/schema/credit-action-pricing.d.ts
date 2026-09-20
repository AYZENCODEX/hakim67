/**
 * credit_action_pricing
 * ─────────────────────────────────────────────────────────────────────────
 * PHASE 5 — admin credit console.
 *
 * `services/credit-meter.ts`'s `METERED_ACTIONS` map is still the source of
 * truth for WHICH actions exist (key, app, label) and their default cost —
 * that stays a code change, same as before. This table is only the admin
 * console's override layer on top of it: one row per action the admin has
 * touched, so "set the fee for wallet creation to 4 credits" or "waive the
 * fee on mail view for now" is a PATCH from the admin console, not a code
 * deploy. An action with no row here just uses its code default.
 *
 * `enabled = false` means the fee is waived (effective cost 0) — it does
 * NOT hide or block the action. Per the master plan (§5): tiers/pricing
 * never become feature walls, so there is deliberately no "disabled action
 * refuses the request" path anywhere in credit-meter.ts.
 */
export declare const creditActionPricingTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "credit_action_pricing";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "credit_action_pricing";
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
        actionKey: import("drizzle-orm/pg-core").PgColumn<{
            name: "action_key";
            tableName: "credit_action_pricing";
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
        cost: import("drizzle-orm/pg-core").PgColumn<{
            name: "cost";
            tableName: "credit_action_pricing";
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
        enabled: import("drizzle-orm/pg-core").PgColumn<{
            name: "enabled";
            tableName: "credit_action_pricing";
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
        updatedBy: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_by";
            tableName: "credit_action_pricing";
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
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "credit_action_pricing";
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
            tableName: "credit_action_pricing";
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
export type CreditActionPricingRow = typeof creditActionPricingTable.$inferSelect;
//# sourceMappingURL=credit-action-pricing.d.ts.map