Botwisely Docs Index

- navigation.md: App navigation and menus (UX). Agents-first branding.
- route-map.md: Next.js route structure for pages.
- data-flow.md: Web ↔ Convex ↔ Clerk flows.
- schema.md: Convex data model and tables.
- ingestion.md: Sources, crawling, chunking, embeddings.
- permissions.md: Org roles and access rules.
- analytics-billing.md: Usage, analytics, billing.
- org.md: Organizations, members, settings.
- roadmap.md: Phased implementation plan.
- context-structure.md: Contexts, layers, and code organization (actions, analyze, core, utils/helpers).
- convex-structure.md: apps/convex/convex folder layout, modules, helpers, patterns.
- integrations.md: Future Slack/Discord/Zapier structure and security.

Conventions

- Keep Convex logic in `apps/web/hooks` and call generated `api.*` functions.
- Keep React server components in `page.tsx`; use client in subcomponents.
- Types live in `packages/types`.
- Clerk provides identity; orgs/membership stored in Convex and enforced in server functions.
