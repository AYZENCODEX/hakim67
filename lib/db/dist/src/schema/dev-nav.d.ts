/**
 * `content` (added for the WordPress-style page builder): the HTML body
 * rendered by DevCustomPage (client/pages/dev/custom-page.tsx) for a nav
 * item's auto-generated blank page. Null/empty = still showing the
 * "not wired up yet" placeholder. Only dev/admin can write it — same
 * requireDev gate as the rest of this table — so it's treated as
 * trusted-author HTML (sanitized against <script>/inline-handler
 * injection client-side before render, same as any other admin-authored
 * WYSIWYG field).
 */
/**
 * dev_nav_items
 * ─────────────────────────────────────────────────────────────────────────────
 * Backs every fully-configurable sidebar, scoped by navType:
 *   "dev" | "user" | "admin" | "moderator" | "team_leader"
 * (table/export names kept as "dev_nav_items"/devNavItemsTable for backward
 * compatibility — it originally only backed the Dev sidebar before the
 * navType column was added).
 *
 * Supports up to 3 levels via the self-referencing parentId, independently
 * per navType:
 *   level 1 → category   (top of sidebar, no href — just a header)
 *   level 2 → section/link (direct link, or a section if it has level-3 children)
 *   level 3 → sub-item   (always a direct link)
 *
 * pluginSlug (optional) hides an item when that plugin is disabled — mirrors
 * the pluginSlug gating the old hardcoded nav arrays used.
 *
 * Adding an item without an explicit href auto-generates one
 * (/<navType>/custom/:slug, "/dev/custom/:slug" for navType "dev") that
 * resolves to a blank placeholder page — new sidebar entries are usable
 * immediately, no code changes required.
 */
export declare const devNavItemsTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "dev_nav_items";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "dev_nav_items";
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
        navType: import("drizzle-orm/pg-core").PgColumn<{
            name: "nav_type";
            tableName: "dev_nav_items";
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
        parentId: import("drizzle-orm/pg-core").PgColumn<{
            name: "parent_id";
            tableName: "dev_nav_items";
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
        level: import("drizzle-orm/pg-core").PgColumn<{
            name: "level";
            tableName: "dev_nav_items";
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
        label: import("drizzle-orm/pg-core").PgColumn<{
            name: "label";
            tableName: "dev_nav_items";
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
        icon: import("drizzle-orm/pg-core").PgColumn<{
            name: "icon";
            tableName: "dev_nav_items";
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
        href: import("drizzle-orm/pg-core").PgColumn<{
            name: "href";
            tableName: "dev_nav_items";
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
        content: import("drizzle-orm/pg-core").PgColumn<{
            name: "content";
            tableName: "dev_nav_items";
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
        pluginSlug: import("drizzle-orm/pg-core").PgColumn<{
            name: "plugin_slug";
            tableName: "dev_nav_items";
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
        enabled: import("drizzle-orm/pg-core").PgColumn<{
            name: "enabled";
            tableName: "dev_nav_items";
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
        sortOrder: import("drizzle-orm/pg-core").PgColumn<{
            name: "sort_order";
            tableName: "dev_nav_items";
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
        isSeed: import("drizzle-orm/pg-core").PgColumn<{
            name: "is_seed";
            tableName: "dev_nav_items";
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
            tableName: "dev_nav_items";
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
            tableName: "dev_nav_items";
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
export declare const NAV_TYPES: readonly ["dev", "user", "admin", "moderator", "team_leader"];
export type NavType = (typeof NAV_TYPES)[number];
//# sourceMappingURL=dev-nav.d.ts.map