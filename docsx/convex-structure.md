Convex Folder Structure (apps/convex/convex)

Base Files

- convex.config.ts: install Convex components (Workflow, Action Retrier, @convex-dev/agent, etc.).
- schema.ts: defineSchema/defineTable with indexes (see docsx/schema.md).
- index.ts: central exports, shared component instances, usage handler wiring.
- auth.config.ts: (already present) Clerk auth integration if needed in actions.
- _generated/: auto-generated API and server bindings.

Domain Modules (recommended layout)

- orgs/
  - members.ts: list/add/remove/update roles; guards by orgId and role.
  - invites.ts: create/resend/revoke invites; accept flow.
  - settings.ts: org profile, domains, webhooks, security.

- agents/
  - queries.ts: listAgents, getAgent, stats.
  - mutations.ts: createAgent, updateAgent, deleteAgent.
  - settings.ts: model/config/instructions/contextOptions.
  - apiKeys.ts: create/revoke/list agent API keys (hash & partial reveal).
  - embed.ts: allowedOrigins, widget config.

- sources/
  - website.ts (mutation/query): upsert website source config (Exa); validate domains.
  - files.ts (action/mutation): upload file, track metadata; link to source.
  - text.ts (mutation): add/update text blocks.
  - qna.ts (mutation): add/update Q&A pairs.

- actions/ (side-effects & external calls)
  - crawl.exa.ts: call Exa API; normalize content.
  - parse.docs.ts: cheap-first parse chain (pdf-parse/mammoth/remark → Tika; LlamaParse on flag).
  - embed.ts: batch embed chunks; capture model + dimension.
  - indexVector.ts: write to vector index via @convex-dev/agent or RAG component.
  - rag.ts: helpers to add/search content using @convex-dev/rag (optional).

- jobs/ (durable workflows, queues, crons)
  - ingestion.workflow.ts: crawl → parse → chunk → embed → index with retries & idempotency.
  - jobs.ts: create job, update status, list jobs, cancel.
  - cron.ts: invoices/monthly; analytics rollups/nightly.

- chat/
  - threads.ts (mutation/query): create/list threads; participants.
  - messages.ts (query): list thread messages; stream deltas.
  - actions.ts (action): generateText/streamText using Agent; saveStreamDeltas true.
  - tools.ts: define Convex-backed tools (search knowledge, fetch doc, askHuman, etc.).

- analytics/
  - usage.ts: insertRawUsage (vUsage), invoices; usageHandler wiring.
  - events.ts: chatEvents insert/list; feedback.
  - rollups.ts: dailyStats computation.
  - (moved to jobs/cron.ts in jobs group)

- settings/
  - org.ts: general/billing/api-keys/webhooks/security (org-level).
  - agent.ts: general/model/tools/embed/notifications/access/api-keys (agent-level).

- lib/ (pure helpers used by Convex functions)
  - rbac.ts: getCurrentUser, getCurrentOrg, assertRole, canAccessAgent.
  - hash.ts: sha256(bytes/text), contentHash.
  - normalize.ts: html → text, whitespace collapse, safe truncation.
  - exa.ts: HTTP client for Exa (with rate limiting, retries).
  - tika.ts: HTTP client for Apache Tika server.
  - llamaParse.ts: client wrapper, guarded by quotas/flags.
  - chunk.ts: recursive splitter, token count (tiktoken binding if used in actions).
  - embed.ts: adapter for embedding model (OpenAI by default) and vector writes.
  - errors.ts: typed error helpers; result unions.
  - integrations/: common webhook validators, signature verification.

Naming & Patterns

- File naming: one domain concern per file; export functions with `operation` suffix.
- Function names: `module.operation` when defined (e.g., `agents.create`, `sources.upsertWebsite`).
- Public surface: queries/mutations consumed by `apps/web/hooks`.
- Background: actions/internalAction and workflow steps not directly callable from client.
- Keep validation at the boundary (zod schemas) and RBAC checks first in handlers.

Components & Wiring (index.ts)

- Create shared instances:
  - Agent component(s) with `usageHandler` to capture token usage (per docsx/analytics-billing.md).
  - RAG component for semantic search and RAG flows (see convex_docs/rag.mdx).
  - Workflow/Workpool for ingestion orchestration.
  - Action Retrier for flaky external calls.

Environment

- OPENAI_API_KEY (embeddings), EXA_API_KEY (crawl), TIKA_URL (fallback parser), LLAMA_CLOUD_API_KEY (optional), CLERK keys for auth.
 - WEBHOOK_SECRET (integrations), SLACK_BOT_TOKEN/APP_ID (future), DISCORD_BOT_TOKEN (future), ZAPIER_SIGNING_SECRET (future).

Example Skeletons

// agents/mutations.ts
import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { assertRole } from "../lib/rbac";

export const create = mutation({
  args: { orgId: v.id("orgs"), name: v.string() },
  handler: async (ctx, { orgId, name }) => {
    await assertRole(ctx, orgId, ["owner", "admin", "editor"]);
    return await ctx.db.insert("agents", { orgId, name, status: "draft", createdAt: Date.now() });
  },
});

// ingestion/workflow.ts (sketch)
// define workflow steps: crawl → parse → chunk → embed → index

// chat/actions.ts (sketch)
// export const sendMessage = mutation(...); export const generateResponse = action(...)

Notes

- Keep Convex code self-contained; do not import from `apps/web/*`.
- Reuse pure helpers from `lib/` or `packages/utils`.
- Follow repo rules: logic in hooks on web side; types in packages/types.
