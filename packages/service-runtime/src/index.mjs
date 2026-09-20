import http from "node:http";

const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};

function json(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, { ...JSON_HEADERS, "content-length": Buffer.byteLength(payload) });
  res.end(payload);
}

function requestUrl(req) {
  return new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
}

function now() {
  return new Date().toISOString();
}

/**
 * Small transport-only runtime shared by extracted services.
 *
 * It deliberately contains no database client and no domain behavior. Domain
 * services own their handlers and can be deployed independently without
 * importing the legacy API server.
 */
export function createServiceServer({
  service,
  displayName = service,
  version = "1.0.0",
  port = Number(process.env.PORT ?? 8080),
  routePrefixes = [],
  handle = async () => ({ status: 404, body: { error: "Route not implemented" } }),
  dependencies = {},
}) {
  let draining = false;
  let server;

  const manifest = {
    service,
    displayName,
    version,
    routePrefixes,
    mode: "independent-process",
    transport: "http",
    startedAt: now(),
  };

  async function handler(req, res) {
    const url = requestUrl(req);
    if (req.method === "GET" && (url.pathname === "/health" || url.pathname === "/live")) {
      json(res, 200, { ok: true, status: "ok", service, timestamp: now() });
      return;
    }
    if (req.method === "GET" && url.pathname === "/ready") {
      const checks = Object.fromEntries(
        Object.entries(dependencies).map(([name, value]) => [name, value === true || typeof value !== "function" ? Boolean(value) : Boolean(value())]),
      );
      const ready = Object.values(checks).every(Boolean) && !draining;
      json(res, ready ? 200 : 503, { ok: ready, status: ready ? "ready" : "not_ready", service, checks, timestamp: now() });
      return;
    }
    if (req.method === "GET" && url.pathname === "/internal/manifest") {
      json(res, 200, { ...manifest, draining });
      return;
    }
    if (req.method === "GET" && url.pathname === "/internal/health") {
      json(res, 200, { ...manifest, ok: true, draining, timestamp: now() });
      return;
    }
    if (draining) {
      json(res, 503, { error: "Service is draining", code: "SERVICE_DRAINING" });
      return;
    }

    try {
      const result = await handle({ req, res, url, service });
      if (res.writableEnded) return;
      json(res, result?.status ?? 200, result?.body ?? { ok: true });
    } catch (error) {
      console.error(JSON.stringify({
        timestamp: now(),
        level: "error",
        service,
        event: "request.failed",
        method: req.method,
        path: url.pathname,
        error: error instanceof Error ? error.message : String(error),
      }));
      if (!res.writableEnded) json(res, 500, { error: "Internal service error", code: "SERVICE_REQUEST_FAILED" });
    }
  }

  function start() {
    server = http.createServer(handler);
    server.listen(port, "0.0.0.0", () => {
      console.log(JSON.stringify({ timestamp: now(), level: "info", service, event: "service.started", port, routePrefixes }));
    });
    const shutdown = (signal) => {
      if (draining) return;
      draining = true;
      console.log(JSON.stringify({ timestamp: now(), level: "info", service, event: "service.draining", signal }));
      server.close(() => process.exit(0));
    };
    process.once("SIGTERM", shutdown);
    process.once("SIGINT", shutdown);
    return server;
  }

  return { start, manifest };
}

export { json };