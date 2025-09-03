Convex Schema Design

Core

- users: { clerkId, email, name, avatarUrl, createdAt }
- orgs: { name, slug, ownerUserId, createdAt, plan, limits }
- orgMembers: { orgId, userId, role: "owner|admin|editor|viewer|billing", invitedBy, invitedAt, status }
  - Clerk provides identity only (auth). Org membership and roles stored in Convex.

Agents

- agents: { orgId, name, slug, status: "draft|active|paused", createdBy, model, temperature, instructions, contextOptions, publishedAt }
- agentApiKeys: { agentId, orgId, name, keyHash, lastUsedAt, createdAt }
- agentEmbedConfigs: { agentId, theme, allowedOrigins, widgetOptions, updatedAt }

Sources & Ingestion

- sources: { agentId, type: "website|file|text|qna", name, enabled, configRef, lastSyncAt }
- websiteSources: { sourceId, rootUrls: string[], sitemapUrls?: string[], include?: string[], exclude?: string[], crawlDepth?: number, followRobotsTxt?: boolean }
- fileSources: { sourceId, files: Array<{ storageId, filename, mimeType, size }> }
- textSources: { sourceId, blocks: Array<{ id, title?, text }> }
- qnaSources: { sourceId, pairs: Array<{ id, q, a }> }
- ingestionJobs: { sourceId, kind: "crawl|parse|chunk|embed|index", runId, status: "queued|running|succeeded|failed|canceled", startedAt, finishedAt, stats?, error? }
- documents: { agentId, sourceId, externalId?, uri?, title?, content, hash, chunked: boolean, createdAt }
- chunks: { agentId, docId, idx, text, tokens, embeddingId?, metadata }
- vectorIndex (component): store embeddings/ids via agent/vector component (see convex_docs/context.mdx)

Chat & Threads

- threads: { agentId, orgId, userId?, title?, createdAt, lastMessageAt }
- threadParticipants: { threadId, userId, role: "user|agent|tool|human" }
- messages (component): leverage @convex-dev/agent message tables; mirror linking via threadId
- feedback: { agentId, threadId, messageId, userId?, rating: -1|0|1, comment?, createdAt }

Analytics & Usage

- rawUsage: { userId?, orgId?, agentId?, agentName?, model, provider, usage, providerMetadata, billingPeriod }
- chatEvents: { agentId, threadId, messageId?, type: "start|reply|rate|error", payload, at }
- dailyStats: { agentId, date, chats, users, posRatings, negRatings, avgLatencyMs }
- invoices: { orgId, billingPeriod, amount, status }

Ops & Integrations

- webhooks: { orgId, url, events: string[], secretHash, active }
- auditLogs: { orgId, userId?, action, resource, metadata, at }

Indexes

- orgMembers by (orgId, userId); agents by (orgId, slug); sources by (agentId, type);
- threads by (agentId, lastMessageAt desc); feedback by (agentId, createdAt desc);
- rawUsage by (billingPeriod, orgId/agentId); dailyStats by (agentId, date);

Notes

- Use the Agent component for messages/embeddings; store linking keys in our tables.
- Prefer workflow + retrier components for ingestion and long jobs.
