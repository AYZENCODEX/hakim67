import { createServiceServer } from "@ayzen/service-runtime";
createServiceServer({
  service: "marketplace",
  displayName: "Marketplace",
  port: Number(process.env.PORT ?? 8107),
  routePrefixes: ["/api/marketplace"],
  dependencies: { configuration: true },
}).start();