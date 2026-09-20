import { createServiceServer } from "@ayzen/service-runtime";
createServiceServer({
  service: "notification",
  displayName: "Notification",
  port: Number(process.env.PORT ?? 8104),
  routePrefixes: ["/api/notifications"],
  dependencies: { configuration: true },
}).start();