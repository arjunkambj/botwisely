App Data Flow

Auth & Session

- ClerkProvider in layout binds auth to UI; `ConvexProviderWithClerk` bridges Clerk → Convex.
- Clerk = identity only. Orgs and memberships live in Convex (RBAC enforced in queries/mutations/actions).
- Use Clerk userId in Convex to scope org membership and agent access.

Reads

- UI calls `useQuery(api.module.fn, args)` via typed hooks in `apps/web/hooks/*`.
- Queries are reactive; data streams to client (e.g., messages, analytics panels).

 Writes

- UI triggers `useMutation(api.module.fn)` for CRUD (bots, sources, members).
- For LLM or external calls, kick actions/workflows; mutations write initial rows optimistically.

 Chat Lifecycle (recommended per convex_docs/messages.mdx)

- Mutation saveMessage: save user prompt (optimistic UI) and get `messageId`.
- Action generate: streamText/save deltas with `{ saveStreamDeltas: true }`.
- Query messages: subscribe to thread messages and deltas for live updates.

Ingestion Lifecycle (Sources)

- Mutation create/update source config (website/files/text/qna).
- Action/workflow schedules jobs: crawl → extract → chunk → embed → index.
- Website crawl: Exa API (chosen vendor). Docs parsing: LlamaIndex (LlamaParse) for complex documents; cheap-first local/Tika fallback.
- Retrieval: Use RAG component for semantic search where appropriate (see convex_docs/rag.mdx) and Agent component for messaging and tool calls (see convex_docs/agent.mdx).
- Progress persisted in `ingestionJobs` and `documents`; UI subscribes to status.

 Usage Tracking & Billing (per convex_docs/usage-tracking.mdx)

- Provide `usageHandler` on Agent to capture token usage to `rawUsage`.
- Cron aggregates raw usage to invoices; UI shows Usage per org/bot.

 Tooling (per convex_docs/tools.mdx)

- Expose safe data/tools to LLM: search docs, knowledge lookup, human-in-the-loop.
- Tool calls persisted as messages; use `stopWhen: stepCountIs(n)` for multi-step.

 Files & Images (per convex_docs/files.mdx)

- Action upload to Convex storage; save references in agent messages.
- Prefer mutation to save message metadata; then action to generate response.
