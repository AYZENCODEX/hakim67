import { z } from "zod/v4";
/**
 * passkey_credentials — WebAuthn/FIDO2 credentials ("passkeys") registered
 * against a user account, used as an alternative (or replacement) login
 * method for username+password.
 *
 * Nothing secret is ever stored here: `credentialId` and `publicKey` are the
 * public half of a key pair the authenticator (phone/laptop/security key)
 * generated and kept the private half of. The server can only ever verify a
 * signature with them — it can't sign in as the user without the physical
 * authenticator. `counter` is the signature counter used to detect cloned
 * authenticators (should only ever increase; a login with a lower or equal
 * counter than what's stored is rejected as a replay/clone).
 *
 * `transports` stores the browser-reported hints (e.g. ["internal"],
 * ["usb","nfc"]) as a comma-separated string so the client can skip
 * unusable transports on repeat logins — purely a UX hint, never trusted
 * for security decisions.
 */
export declare const passkeyCredentialsTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "passkey_credentials";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "passkey_credentials";
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
            tableName: "passkey_credentials";
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
        credentialId: import("drizzle-orm/pg-core").PgColumn<{
            name: "credential_id";
            tableName: "passkey_credentials";
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
        publicKey: import("drizzle-orm/pg-core").PgColumn<{
            name: "public_key";
            tableName: "passkey_credentials";
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
        counter: import("drizzle-orm/pg-core").PgColumn<{
            name: "counter";
            tableName: "passkey_credentials";
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
        deviceType: import("drizzle-orm/pg-core").PgColumn<{
            name: "device_type";
            tableName: "passkey_credentials";
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
        backedUp: import("drizzle-orm/pg-core").PgColumn<{
            name: "backed_up";
            tableName: "passkey_credentials";
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
        transports: import("drizzle-orm/pg-core").PgColumn<{
            name: "transports";
            tableName: "passkey_credentials";
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
        name: import("drizzle-orm/pg-core").PgColumn<{
            name: "name";
            tableName: "passkey_credentials";
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
        lastUsedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "last_used_at";
            tableName: "passkey_credentials";
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
            tableName: "passkey_credentials";
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
export declare const insertPasskeyCredentialSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    userId: z.ZodInt;
    lastUsedAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    credentialId: z.ZodString;
    publicKey: z.ZodString;
    counter: z.ZodOptional<z.ZodInt>;
    deviceType: z.ZodOptional<z.ZodString>;
    backedUp: z.ZodOptional<z.ZodBoolean>;
    transports: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, {
    out: {};
    in: {};
}>;
export type InsertPasskeyCredential = z.infer<typeof insertPasskeyCredentialSchema>;
export type PasskeyCredential = typeof passkeyCredentialsTable.$inferSelect;
//# sourceMappingURL=passkeys.d.ts.map