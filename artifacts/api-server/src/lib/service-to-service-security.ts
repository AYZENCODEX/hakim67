import crypto from "node:crypto";
import type { Request, Response, NextFunction } from "express";
import { db, serviceRequestNoncesTable } from "@workspace/db";
import { lt } from "drizzle-orm";

const MAX_CLOCK_SKEW_MS = 5 * 60 * 1000;

function signingInput(service: string, timestamp: string, requestId: string, bodyHash: string): string {
  return `${service}.${timestamp}.${requestId}.${bodyHash}`;
}

export function hashRequestBody(body: unknown): string {
  return crypto.createHash("sha256").update(JSON.stringify(body ?? null)).digest("hex");
}

export function signServiceRequest(input: {
  service: string;
  timestamp: string;
  requestId: string;
  bodyHash: string;
  secret?: string;
}): string {
  const secret = input.secret ?? process.env.AYZEN_SERVICE_AUTH_SECRET;
  if (!secret) throw new Error("AYZEN_SERVICE_AUTH_SECRET is not configured");
  return crypto.createHmac("sha256", secret)
    .update(signingInput(input.service, input.timestamp, input.requestId, input.bodyHash))
    .digest("hex");
}

export function verifyServiceRequest(req: Request): boolean {
  const service = req.header("x-ayzen-service");
  const timestamp = req.header("x-ayzen-timestamp");
  const requestId = req.header("x-ayzen-request-id");
  const signature = req.header("x-ayzen-signature");
  const secret = process.env.AYZEN_SERVICE_AUTH_SECRET;
  if (!service || !timestamp || !requestId || !signature || !secret) return false;
  const timestampMs = Number(timestamp);
  if (!Number.isSafeInteger(timestampMs) || Math.abs(Date.now() - timestampMs) > MAX_CLOCK_SKEW_MS) return false;
  const expected = signServiceRequest({ service, timestamp, requestId, bodyHash: hashRequestBody(req.body), secret });
  const actual = Buffer.from(signature, "hex");
  const wanted = Buffer.from(expected, "hex");
  return actual.length === wanted.length && crypto.timingSafeEqual(actual, wanted);
}

async function claimRequestNonce(service: string, requestId: string, expiresAt: Date): Promise<boolean> {
  await db.delete(serviceRequestNoncesTable).where(lt(serviceRequestNoncesTable.expiresAt, new Date()));
  const claimed = await db.insert(serviceRequestNoncesTable).values({
    service, requestId, expiresAt,
  }).onConflictDoNothing().returning({ id: serviceRequestNoncesTable.id });
  return claimed.length > 0;
}

export async function requireServiceRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
  if (!verifyServiceRequest(req)) {
    res.status(401).json({ error: "Invalid service request", code: "INVALID_SERVICE_SIGNATURE" });
    return;
  }
  const service = req.header("x-ayzen-service")!;
  const requestId = req.header("x-ayzen-request-id")!;
  const timestampMs = Number(req.header("x-ayzen-timestamp"));
  const claimed = await claimRequestNonce(service, requestId, new Date(timestampMs + MAX_CLOCK_SKEW_MS));
  if (!claimed) {
    res.status(409).json({ error: "Service request has already been used", code: "REPLAYED_SERVICE_REQUEST" });
    return;
  }
  next();
}