import { createServiceServer } from "@ayzen/service-runtime";
createServiceServer({
  service: "finance",
  displayName: "Finance / RYFT",
  port: Number(process.env.PORT ?? 8101),
  routePrefixes: ["/api/finance"],
  dependencies: { configuration: true },
}).start();