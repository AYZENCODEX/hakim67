import { createServiceServer } from "@ayzen/service-runtime";
createServiceServer({
  service: "search-knowledge",
  displayName: "Search / Knowledge",
  port: Number(process.env.PORT ?? 8108),
  routePrefixes: ["/api/search"],
  dependencies: { configuration: true },
}).start();