/**
 * page_layouts
 * ─────────────────────────────────────────────────────────────────────────────
 * One row = one named section on one page (e.g. "featured-stats" on
 * "user-dashboard"). `sortOrder` + `visible` are set by dragging/toggling
 * in the Layout Builder (/admin/layout-builder) and read back by the page
 * itself via usePageLayoutOrder() to decide what order to render its
 * sections in — same live-editable-without-redeploy idea as
 * dev_nav_items and config_entries, applied to page composition instead
 * of nav items / config arrays.
 *
 * Only pages that call usePageLayoutOrder() with their section keys are
 * actually reorderable in effect — registering a pageKey in
 * layout-sections.ts (the registry) just makes it selectable in the
 * builder UI.
 */
export declare const pageLayoutsTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "page_layouts";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "page_layouts";
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
        pageKey: import("drizzle-orm/pg-core").PgColumn<{
            name: "page_key";
            tableName: "page_layouts";
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
        sectionKey: import("drizzle-orm/pg-core").PgColumn<{
            name: "section_key";
            tableName: "page_layouts";
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
        sortOrder: import("drizzle-orm/pg-core").PgColumn<{
            name: "sort_order";
            tableName: "page_layouts";
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
        visible: import("drizzle-orm/pg-core").PgColumn<{
            name: "visible";
            tableName: "page_layouts";
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
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "page_layouts";
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
//# sourceMappingURL=page-layouts.d.ts.map