Roadmap (Phased)

Phase 1: Foundations

- Auth & orgs: Clerk identity; org/members CRUD in Convex; RBAC guards.
- Agents CRUD: create, list, overview; embed config; API keys.
- Playground: threads/messages with streaming per convex_docs/messages.mdx.
- Usage tracking: wire `usageHandler` and org usage page.

Phase 2: Sources & Ingestion

- Sources tabs: Website/Files/Text/Q&A with create/edit.
- Ingestion pipeline: Workflow + Retrier; documents/chunks/embeddings.
- Knowledge page: document list, chunk viewer, reindex.

Phase 3: Analytics & Activity

- Activity logs: searchable chat logs with filters, feedback.
- Analytics: chats over time, top queries, quality metrics.
- Export CSV for logs; simple dashboards.

Phase 4: Connect & Embed

- Widget script + SDK docs; allowedOrigins enforcement.
- Channel integrations: Slack (MVP), webhooks.

Phase 5: Billing & Plans

- Plan enforcement; invoices; overage warnings; Stripe integration.

Quality & Ops

- Audit logs; test coverage of convex functions; performance budgets.

Routes

- Separate route groups:
  - `(protected)/(dashboard)` for org-scoped pages (overview, usage, members, billing, settings, integrations).
  - `(protected)/agents` for agents list and agent-level pages (overview, playground, sources, knowledge, analytics, activity, connect, settings).
