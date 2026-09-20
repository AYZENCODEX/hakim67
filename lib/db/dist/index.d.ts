import pg from "pg";
import * as schema from "./schema";
export declare function buildPoolConfig(): pg.PoolConfig;
export declare const pool: import("pg").Pool;
export declare const db: import("drizzle-orm/node-postgres").NodePgDatabase<typeof schema> & {
    $client: import("pg").Pool;
};
export * from "./schema";
//# sourceMappingURL=index.d.ts.map