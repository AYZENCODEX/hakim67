---
name: Workspace typecheck baseline
description: A pre-existing parser error currently blocks the imported API package's full TypeScript check.
---

The full API package typecheck is currently blocked before reaching feature files by malformed source in the scheduler module.

**Why:** A direct TypeScript check reports parser errors in the existing scheduler file, while the new-engine source parses, bundles, and its focused test suite passes. Fixing unrelated scheduler source during engine work would expand scope and risk changing existing behavior.

**How to apply:** Run the focused new-engine bundle/test checks when validating N1–N15 changes. Repair the scheduler parser error separately before treating the workspace-wide typecheck as authoritative.