import { createServiceServer } from "@ayzen/service-runtime";
createServiceServer({
  service: "ai-agent",
  displayName: "AI / Agent / ZYNTH",
  port: Number(process.env.PORT ?? 8106),
  routePrefixes: ["/api/ai"],
  dependencies: { configuration: true },
}).start();