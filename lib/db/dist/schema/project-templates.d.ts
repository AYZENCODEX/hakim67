import { z } from "zod/v4";
/**
 * schema/project-templates.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Project Templates — see migrations/070_ayzen_project_templates.sql for the
 * full rationale. One-click prefill for admin/projects.tsx's "Initialize New
 * Protocol" dialog: an admin/moderator saves the recurring, non-identity
 * fields (category/type, tier/experience/duration/difficulty/cost, XP
 * system, tutorial link+steps, badges) once as a named template, then picks
 * it from a dropdown next time instead of re-filling the same Meta/Economics/
 * Tutorial tabs for every new "Exchange Campaign" or "L2 Airdrop" project.
 *
 * `data` is stored as a JSON string (same string-in/string-out convention as
 * projects.tutorial_steps/badges) rather than individual columns — see the
 * migration file for why. routes/project-templates.ts is the only place
 * that parses/validates its shape.
 */
export declare const projectTemplatesTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "ayzen_project_templates";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "ayzen_project_templates";
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
        name: import("drizzle-orm/pg-core").PgColumn<{
            name: "name";
            tableName: "ayzen_project_templates";
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
        description: import("drizzle-orm/pg-core").PgColumn<{
            name: "description";
            tableName: "ayzen_project_templates";
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
        data: import("drizzle-orm/pg-core").PgColumn<{
            name: "data";
            tableName: "ayzen_project_templates";
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
        createdBy: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_by";
            tableName: "ayzen_project_templates";
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
        folder: import("drizzle-orm/pg-core").PgColumn<{
            name: "folder";
            tableName: "ayzen_project_templates";
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
        usageCount: import("drizzle-orm/pg-core").PgColumn<{
            name: "usage_count";
            tableName: "ayzen_project_templates";
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
        defaultForProjectType: import("drizzle-orm/pg-core").PgColumn<{
            name: "default_for_project_type";
            tableName: "ayzen_project_templates";
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
            tableName: "ayzen_project_templates";
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
            tableName: "ayzen_project_templates";
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
export declare const insertProjectTemplateSchema: z.ZodObject<{
    name: z.ZodString;
    data: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    folder: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdBy: z.ZodInt;
    defaultForProjectType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, {
    out: {};
    in: {};
}>;
export type InsertProjectTemplate = z.infer<typeof insertProjectTemplateSchema>;
export type ProjectTemplate = typeof projectTemplatesTable.$inferSelect;
export declare const PROJECT_TEMPLATE_DATA_KEYS: readonly ["category", "subcategory", "projectType", "exchangeSubType", "accountCategory", "tier", "experienceLevel", "durationType", "difficulty", "costType", "xpName", "xpPrice", "tutorialLink", "tutorialSteps", "badges"];
export type ProjectTemplateDataKey = typeof PROJECT_TEMPLATE_DATA_KEYS[number];
//# sourceMappingURL=project-templates.d.ts.map