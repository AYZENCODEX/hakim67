import { createServiceServer } from "@ayzen/service-runtime";
createServiceServer({
  service: "workflow",
  displayName: "Workflow / SKARN",
  port: Number(process.env.PORT ?? 8105),
  routePrefixes: ["/api/workflows"],
  dependencies: { configuration: true },
}).start();