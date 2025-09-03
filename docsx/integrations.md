Integrations (Future-ready)

Goals

- Keep clean seams for third-party integrations without coupling core flows.
- Support inbound webhooks and outbound events with signature verification.

Targets (planned)

- Slack: send agent replies to channels/DMs; slash commands to query agents; events via Slack Events API.
- Discord: bot user to interact with agents; message commands; webhooks for events.
- Zapier: expose triggers (new chat, ingestion complete) and actions (ask agent, start ingestion).
- Webhooks (generic): configurable org-level endpoints for events (chatEvents, job status, invoices).

Convex Structure (apps/convex/convex)

- integrations/
  - slack.ts: verify requests; map Slack events to actions; respond with agent output.
  - discord.ts: verify signatures; route messageCreate to agent.
  - zapier.ts: webhook handlers; token exchange (if needed); throttling.
  - webhooks.ts: org-scoped outbound delivery with retry & backoff.
- lib/integrations/: shared validation (HMAC), payload schemas, rate limits.
- jobs/cron.ts: delivery retries and dead-letter handling for webhooks.

UI & Settings

- Dashboard → Settings → Integrations: configure apps, rotate secrets, select events.
- Per-agent toggles (e.g., which agents post to Slack/Discord).

Security

- Verify every inbound request (Slack/Discord signatures, Zapier secret).
- Store only hashed secrets; show partial.
- Implement per-org rate limits; backoff + queue long-running replies.
