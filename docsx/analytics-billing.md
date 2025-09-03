Analytics & Billing

Usage Tracking (convex_docs/usage-tracking.mdx)

- Configure Agent `usageHandler` to write token usage per call to `rawUsage`.
- Attributes: userId?, orgId?, agentId?, agentName, model, provider, usage, providerMetadata.
- Cron aggregates `rawUsage` → `invoices` monthly; UI shows org/agent usage.

Analytics

- chatEvents: track start/reply/error/rate; include latency, size, source type.
- dailyStats: rollups for charts: chats/day, users/day, rating distribution.
- Top queries: sample/count by normalized prompt; link to logs.

UI Pages

- Org / Usage: stacked by agent, time range picker, estimated cost by model pricing.
- Agent / Analytics / Chats: chats over time, top queries, response times.
- Agent / Activity / Chat logs: searchable, filters (status, rating, time), export CSV.

Billing

- Plan tiers: limits on bots, sources, total documents, monthly tokens.
- Overages: compute from `rawUsage`; show warnings; throttle if exceeding hard cap.
- Invoices: show status; owner/billing can update payment method (Stripe later).
