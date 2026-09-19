import { db } from "@workspace/db";
import { sql } from "drizzle-orm";
import { getTelegramBotDescriptor } from "./telegram-bot-registry";
import { assertTableOwnedBy } from "./service-boundaries";

assertTableOwnedBy("telegram-gateway", "telegram_update_receipts");

export interface TelegramUpdateEnvelope {
  updateId: number;
  botKey: string;
  receivedAt: Date;
  payload: unknown;
}

export function normalizeTelegramUpdate(botKey: string, payload: unknown): TelegramUpdateEnvelope | null {
  const descriptor = getTelegramBotDescriptor(botKey);
  if (!descriptor || typeof payload !== "object" || payload === null) return null;
  const updateId = (payload as { update_id?: unknown }).update_id;
  if (!Number.isSafeInteger(updateId) || (updateId as number) < 0) return null;
  return { updateId: updateId as number, botKey, receivedAt: new Date(), payload };
}

/**
 * Claims an update exactly once per bot. The unique database key makes this
 * safe across multiple API instances and restarts; callers should return a
 * fast 2xx for duplicates.
 */
export async function claimTelegramUpdate(envelope: TelegramUpdateEnvelope): Promise<boolean> {
  const result = await db.execute(sql`
    INSERT INTO telegram_update_receipts (bot_key, update_id, received_at, status)
    VALUES (${envelope.botKey}, ${envelope.updateId}, ${envelope.receivedAt}, 'received')
    ON CONFLICT (bot_key, update_id) DO NOTHING
    RETURNING id
  `);
  return result.rows.length > 0;
}