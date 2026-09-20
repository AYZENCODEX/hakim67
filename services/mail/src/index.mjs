import { createServiceServer } from "@ayzen/service-runtime";
createServiceServer({
  service: "mail",
  displayName: "WISP Mailbox",
  port: Number(process.env.PORT ?? 8103),
  routePrefixes: ["/api/mail"],
  dependencies: { configuration: true },
}).start();