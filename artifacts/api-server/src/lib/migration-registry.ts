import type { DomainService } from "./architecture/domains";

export type MigrationCutoverState =
  | "monolith"
  | "dual_read"
  | "read_switched"
  | "write_switched"
  | "extracted";

export interface MigrationRoute {
  routePrefix: string;
  service: DomainService;
  fallback: "monolith";
  state: MigrationCutoverState;
  requiredGates: readonly ["backup", "characterization", "backfill", "validation", "rollback"];
}

const REQUIRED_GATES: MigrationRoute["requiredGates"] = [
  "backup",
  "characterization",
  "backfill",
  "validation",
  "rollback",
];

/**
 * Phase 25 strangler matrix. Routes remain served by the modular monolith
 * until an operator explicitly advances a cutover state; there is no silent
 * traffic switch hidden in route registration.
 */
export const MIGRATION_ROUTES: readonly MigrationRoute[] = [
  { routePrefix: "/api/finance", service: "finance", fallback: "monolith", state: "monolith", requiredGates: REQUIRED_GATES },
  { routePrefix: "/api/vault", service: "vault", fallback: "monolith", state: "monolith", requiredGates: REQUIRED_GATES },
  { routePrefix: "/api/mail", service: "mail", fallback: "monolith", state: "monolith", requiredGates: REQUIRED_GATES },
  { routePrefix: "/api/notifications", service: "notification", fallback: "monolith", state: "monolith", requiredGates: REQUIRED_GATES },
  { routePrefix: "/api/workflows", service: "workflow", fallback: "monolith", state: "monolith", requiredGates: REQUIRED_GATES },
  { routePrefix: "/api/ai", service: "ai-agent", fallback: "monolith", state: "monolith", requiredGates: REQUIRED_GATES },
  { routePrefix: "/api/marketplace", service: "marketplace", fallback: "monolith", state: "monolith", requiredGates: REQUIRED_GATES },
  { routePrefix: "/api/search", service: "search-knowledge", fallback: "monolith", state: "monolith", requiredGates: REQUIRED_GATES },
];

const STATE_ORDER: readonly MigrationCutoverState[] = [
  "monolith",
  "dual_read",
  "read_switched",
  "write_switched",
  "extracted",
];

export function getMigrationRoute(routePrefix: string): MigrationRoute | undefined {
  return MIGRATION_ROUTES.find((route) => route.routePrefix === routePrefix);
}

export function canAdvanceMigration(
  current: MigrationCutoverState,
  next: MigrationCutoverState,
  completedGates: readonly string[],
): boolean {
  const currentIndex = STATE_ORDER.indexOf(current);
  const nextIndex = STATE_ORDER.indexOf(next);
  if (currentIndex < 0 || nextIndex !== currentIndex + 1) return false;
  return REQUIRED_GATES.every((gate) => completedGates.includes(gate));
}

export function getMigrationReadiness(): {
  ready: boolean;
  routes: Array<MigrationRoute & { missingGates: string[] }>;
} {
  const routes = MIGRATION_ROUTES.map((route) => ({
    ...route,
    missingGates: [...route.requiredGates],
  }));
  return { ready: false, routes };
}