import http from "node:http";
import { URL } from "node:url";

const port = Number(process.env.PORT ?? process.env.AYZEN_GATEWAY_PORT ?? 5000);
const monolithUrl = (process.env.MONOLITH_URL ?? "http://127.0.0.1:8080").replace(/\/+$/, "");
const requestTimeoutMs = Number(process.env.GATEWAY_REQUEST_TIMEOUT_MS ?? 15_000);

const serviceRoutes = [
  ["/api/finance", "FINANCE_SERVICE_URL", "finance"],
  ["/api/vault", "VAULT_SERVICE_URL", "vault"],
  ["/api/mail", "WISP_SERVICE_URL", "mail"],
  ["/api/notifications", "NOTIFICATION_SERVICE_URL", "notification"],
  ["/api/workflows", "WORKFLOW_SERVICE_URL", "workflow"],
  ["/api/ai", "AI_SERVICE_URL", "ai-agent"],
  ["/api/marketplace", "MARKETPLACE_SERVICE_URL", "marketplace"],
  ["/api/search", "SEARCH_SERVICE_URL", "search-knowledge"],
];

function routeFor(pathname) {
  return serviceRoutes
    .filter(([prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`))
    .sort((a, b) => b[0].length - a[0].length)[0];
}

function targetFor(pathname) {
  const route = routeFor(pathname);
  if (!route) return { url: monolithUrl, service: "monolith", mode: "fallback" };
  const configuredUrl = process.env[route[1]];
  return configuredUrl
    ? { url: configuredUrl.replace(/\/+$/, ""), service: route[2], mode: "extracted" }
    : { url: monolithUrl, service: route[2], mode: "monolith" };
}

function writeJson(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
  res.end(payload);
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}

async function proxy(req, res, target) {
  const body = req.method === "GET" || req.method === "HEAD" ? undefined : await readBody(req);
  const incoming = new URL(req.url ?? "/", "http://gateway.local");
  const destination = new URL(`${incoming.pathname}${incoming.search}`, `${target.url}/`);
  const headers = { ...req.headers };
  delete headers.host;
  delete headers.connection;
  headers["x-ayzen-gateway"] = "api-gateway";
  headers["x-ayzen-route-mode"] = target.mode;
  headers["x-ayzen-service"] = target.service;

  const abort = new AbortController();
  const timeout = setTimeout(() => abort.abort(), requestTimeoutMs);
  try {
    const response = await fetch(destination, { method: req.method, headers, body, redirect: "manual", signal: abort.signal });
    const responseBody = Buffer.from(await response.arrayBuffer());
    const outputHeaders = {};
    response.headers.forEach((value, key) => {
      if (!["connection", "transfer-encoding", "keep-alive"].includes(key)) outputHeaders[key] = value;
    });
    outputHeaders["x-ayzen-route-mode"] = target.mode;
    outputHeaders["x-ayzen-service"] = target.service;
    res.writeHead(response.status, outputHeaders);
    res.end(responseBody);
  } catch (error) {
    const timedOut = error?.name === "AbortError";
    writeJson(res, timedOut ? 504 : 502, {
      error: timedOut ? "Upstream request timed out" : "Upstream service unavailable",
      code: timedOut ? "UPSTREAM_TIMEOUT" : "UPSTREAM_UNAVAILABLE",
      service: target.service,
      mode: target.mode,
    });
  } finally {
    clearTimeout(timeout);
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://gateway.local");
  if (req.method === "GET" && ["/health", "/live"].includes(url.pathname)) {
    writeJson(res, 200, { ok: true, status: "ok", service: "api-gateway", timestamp: new Date().toISOString() });
    return;
  }
  if (req.method === "GET" && url.pathname === "/ready") {
    writeJson(res, 200, {
      ok: true,
      status: "ready",
      service: "api-gateway",
      monolith: monolithUrl,
      extractedServices: serviceRoutes.filter(([, env]) => Boolean(process.env[env])).map(([, , service]) => service),
    });
    return;
  }
  if (req.method === "GET" && url.pathname === "/internal/routes") {
    writeJson(res, 200, {
      gateway: "api-gateway",
      fallback: "monolith",
      routes: serviceRoutes.map(([prefix, env, service]) => ({
        prefix,
        service,
        configured: Boolean(process.env[env]),
        target: process.env[env] ?? monolithUrl,
        env,
      })),
    });
    return;
  }
  await proxy(req, res, targetFor(url.pathname));
});

server.listen(port, "0.0.0.0", () => {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    level: "info",
    service: "api-gateway",
    event: "gateway.started",
    port,
    monolithUrl,
    extractedServices: serviceRoutes.filter(([, env]) => Boolean(process.env[env])).map(([, , service]) => service),
  }));
});

function shutdown(signal) {
  console.log(JSON.stringify({ timestamp: new Date().toISOString(), level: "info", service: "api-gateway", event: "gateway.stopping", signal }));
  server.close(() => process.exit(0));
}
process.once("SIGTERM", () => shutdown("SIGTERM"));
process.once("SIGINT", () => shutdown("SIGINT"));