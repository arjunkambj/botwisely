Hooks Design (apps/web/hooks)

Principles

- Keep Convex calls encapsulated; components import hooks, not `api.*` directly.
- Co-locate light state logic (loading/errors/optimistic) in hooks.

Org

- useCurrentOrg(): resolves active org from Clerk + user’s membership.
- useOrgMembers(), useInviteMember(), useUpdateMemberRole(), useRemoveMember().

Agents

- useAgents(), useCreateAgent(), useUpdateAgent(), useDeleteAgent().
- useAgent(agentId), useAgentStats(agentId).

Sources

- useSources(agentId), useUpsertWebsiteSource(), useUploadFiles(), useUpsertText(), useUpsertQna().
- useStartIngestion(sourceId), useCancelIngestion(runId), useIngestionJobs(sourceId).

Knowledge

- useDocuments(agentId), useChunks(agentId, filters), useReindex(agentId, docId?).

Chat

- useThread(threadId), useThreadMessages(threadId), useSendMessage(threadId), useRateMessage(messageId).
- Under the hood: mutation to save, action to generate/stream per convex_docs/messages.mdx.

Analytics & Usage

- useOrgUsage(range), useAgentUsage(agentId, range), useDailyStats(agentId, range), useTopQueries(agentId, range).

Embeds & API Keys

- useEmbedConfig(agentId), useUpdateEmbedConfig(); useApiKeys(), useCreateApiKey(), useDeleteApiKey().
