import { createServiceServer } from "@ayzen/service-runtime";
createServiceServer({
  service: "vault",
  displayName: "Vault / SYLO",
  port: Number(process.env.PORT ?? 8102),
  routePrefixes: ["/api/vault"],
  dependencies: { configuration: true },
}).start();