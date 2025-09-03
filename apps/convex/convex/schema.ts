import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Consolidated Chatbase-style schema (no billing yet)
export default defineSchema({
  // ---------------- USERS & ORGANIZATIONS ----------------
  users: defineTable({
    name: v.string(),
    email: v.string(),
    isActive: v.boolean(),
    lastLoginAt: v.optional(v.number()),
    clerkId: v.string(),
    avatarUrl: v.optional(v.string()),
    updatedAt: v.optional(v.number()),
    createdAt: v.optional(v.number()),
  })
    .index("by_email", ["email"]) // lookup
    .index("by_clerkId", ["clerkId"]), // webhook upsert / session resolve

  organizations: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    ownerId: v.id("users"),
    slug: v.optional(v.string()),
    plan: v.optional(v.string()),
    limits: v.optional(v.any()),
    logoUrl: v.optional(v.string()),
    updatedAt: v.optional(v.number()),
    createdAt: v.optional(v.number()),
  })
    .index("by_owner", ["ownerId"]) // owner’s orgs
    .index("by_slug", ["slug"]), // friendly routing

  memberships: defineTable({
    userId: v.id("users"),
    organizationId: v.id("organizations"),
    role: v.union(
      v.literal("owner"),
      v.literal("admin"),
      v.literal("editor"),
      v.literal("viewer"),
      v.literal("billing"),
    ),
    status: v.optional(
      v.union(v.literal("active"), v.literal("invited"), v.literal("removed")),
    ),
    invitedBy: v.optional(v.id("users")),
    invitedAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
    createdAt: v.optional(v.number()),
  })
    .index("by_org_user", ["organizationId", "userId"]) // guards
    .index("by_user", ["userId"]) // org switcher
    .index("by_org", ["organizationId"]),

  // ---------------- AGENTS ----------------
  agents: defineTable({
    organizationId: v.id("organizations"),
    createdBy: v.id("users"),
    name: v.string(),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    model: v.string(),
    temperature: v.optional(v.number()),
    instructions: v.optional(v.string()),
    contextOptions: v.optional(v.any()),
    tools: v.array(v.string()),
    status: v.optional(v.union(v.literal("draft"), v.literal("active"), v.literal("paused"))),
    publishedAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
    createdAt: v.optional(v.number()),
  })
    .index("by_org", ["organizationId"]) // list by org
    .index("by_org_name", ["organizationId", "name"]) // search
    .index("by_org_slug", ["organizationId", "slug"]), // routing

  // Agent API keys (for server/API access to a bot)
  agentApiKeys: defineTable({
    agentId: v.id("agents"),
    organizationId: v.id("organizations"),
    name: v.string(),
    keyHash: v.string(),
    lastUsedAt: v.optional(v.number()),
    createdAt: v.optional(v.number()),
  })
    .index("by_agent", ["agentId"]) // per-agent keys
    .index("by_org", ["organizationId"]),

  // Embed/widget configuration per agent
  agentEmbedConfigs: defineTable({
    agentId: v.id("agents"),
    theme: v.optional(v.any()),
    allowedOrigins: v.optional(v.array(v.string())),
    widgetOptions: v.optional(v.any()),
    updatedAt: v.optional(v.number()),
  }).index("by_agent", ["agentId"]),

  // ---------------- SOURCES & INGESTION ----------------
  // Sources are organization-wide and reusable across multiple agents.
  sources: defineTable({
    organizationId: v.id("organizations"),
    type: v.union(
      v.literal("website"),
      v.literal("file"),
      v.literal("text"),
      v.literal("qna"),
    ),
    name: v.string(),
    enabled: v.boolean(),
    configRef: v.optional(v.any()),
    lastSyncAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
    createdAt: v.optional(v.number()),
  })
    .index("by_org", ["organizationId"]) // list by org
    .index("by_org_type", ["organizationId", "type"]) // filter by type
    .index("by_org_name", ["organizationId", "name"]),

  // Many-to-many assignment of sources to agents (reusability)
  agentSources: defineTable({
    agentId: v.id("agents"),
    sourceId: v.id("sources"),
    enabled: v.boolean(),
    // Optional per-agent overrides (e.g., weights, tags, rank)
    overrides: v.optional(v.any()),
    rank: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
    createdAt: v.optional(v.number()),
  })
    .index("by_agent", ["agentId"]) // agent’s assigned sources
    .index("by_source", ["sourceId"]) // which agents reuse a source
    .index("by_agent_source", ["agentId", "sourceId"]), // quick lookup

  websiteSources: defineTable({
    sourceId: v.id("sources"),
    rootUrls: v.array(v.string()),
    sitemapUrls: v.optional(v.array(v.string())),
    include: v.optional(v.array(v.string())),
    exclude: v.optional(v.array(v.string())),
    crawlDepth: v.optional(v.number()),
    followRobotsTxt: v.optional(v.boolean()),
  }).index("by_source", ["sourceId"]),

  fileSources: defineTable({
    sourceId: v.id("sources"),
    files: v.array(
      v.object({
        storageId: v.id("_storage"),
        filename: v.string(),
        mimeType: v.string(),
        size: v.number(),
      }),
    ),
  }).index("by_source", ["sourceId"]),

  textSources: defineTable({
    sourceId: v.id("sources"),
    blocks: v.array(
      v.object({
        id: v.string(),
        title: v.optional(v.string()),
        text: v.string(),
      }),
    ),
  }).index("by_source", ["sourceId"]),

  qnaSources: defineTable({
    sourceId: v.id("sources"),
    pairs: v.array(
      v.object({ id: v.string(), q: v.string(), a: v.string() }),
    ),
  }).index("by_source", ["sourceId"]),

  ingestionJobs: defineTable({
    sourceId: v.id("sources"),
    kind: v.union(
      v.literal("crawl"),
      v.literal("parse"),
      v.literal("chunk"),
      v.literal("embed"),
      v.literal("index"),
    ),
    runId: v.string(),
    status: v.union(
      v.literal("queued"),
      v.literal("running"),
      v.literal("succeeded"),
      v.literal("failed"),
      v.literal("canceled"),
    ),
    startedAt: v.optional(v.number()),
    finishedAt: v.optional(v.number()),
    stats: v.optional(v.any()),
    error: v.optional(v.any()),
  })
    .index("by_source", ["sourceId"]) // list jobs per source
    .index("by_status", ["status"]),

  // ---------------- DOCUMENTS & CHUNKS ----------------
  documents: defineTable({
    organizationId: v.id("organizations"),
    sourceId: v.id("sources"),
    externalId: v.optional(v.string()),
    uri: v.optional(v.string()),
    title: v.optional(v.string()),
    content: v.string(),
    hash: v.string(),
    chunked: v.boolean(),
    updatedAt: v.optional(v.number()),
    createdAt: v.optional(v.number()),
  })
    .index("by_org", ["organizationId"]) // list docs per org
    .index("by_source", ["sourceId"]) // list docs per source
    .index("by_org_hash", ["organizationId", "hash"]), // dedupe per org

  chunks: defineTable({
    docId: v.id("documents"),
    sourceId: v.id("sources"), // denormalized for fast filtering by assigned sources
    idx: v.number(),
    text: v.string(),
    tokens: v.optional(v.number()),
    embeddingId: v.optional(v.string()), // id in vector index component
    metadata: v.optional(v.any()),
    updatedAt: v.optional(v.number()),
    createdAt: v.optional(v.number()),
  })
    .index("by_doc", ["docId"]) // chunks per doc
    .index("by_source", ["sourceId"]), // chunks for a source

  // ---------------- CHAT (messages & threads live in Agent component) ----------------
  // We only add participants metadata linked to the component's `threads` table.
  threadParticipants: defineTable({
    threadId: v.id("threads"),
    userId: v.id("users"),
    role: v.union(
      v.literal("user"),
      v.literal("agent"),
      v.literal("tool"),
      v.literal("human"),
    ),
  })
    .index("by_thread_user", ["threadId", "userId"]) // access checks
    .index("by_user", ["userId"]),

  feedback: defineTable({
    agentId: v.id("agents"),
    threadId: v.id("threads"),
    // Message ids are stored in the Agent component; use string linkage
    messageId: v.string(),
    userId: v.optional(v.id("users")),
    rating: v.union(v.literal(-1), v.literal(0), v.literal(1)),
    comment: v.optional(v.string()),
    createdAt: v.optional(v.number()),
  }).index("by_agent_createdAt", ["agentId", "createdAt"]),

  // ---------------- IMAGES ----------------
  images: defineTable({
    url: v.string(),
    height: v.optional(v.number()),
    width: v.optional(v.number()),
    type: v.union(v.literal("generated"), v.literal("uploaded")),
    organizationId: v.id("organizations"),
    // Link to a message in the Agent component by string id
    chatMessageId: v.optional(v.string()),
    updatedAt: v.optional(v.number()),
    createdAt: v.optional(v.number()),
  })
    .index("by_org", ["organizationId"]) // media library
    .index("by_message", ["chatMessageId"]),
});
