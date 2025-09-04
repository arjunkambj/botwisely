// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// -------------------------
// Shared validators & consts
// -------------------------
export const EMBED_DIM = 1536; // change to your embedding model (e.g. 3072, 1024)

export const OrgRole = v.union(
  v.literal("owner"),
  v.literal("admin"),
  v.literal("member")
);

export const ChatRole = v.union(
  v.literal("user"),
  v.literal("assistant"),
  v.literal("tool"),
  v.literal("system")
);

export const Visibility = v.union(
  v.literal("private"),
  v.literal("org"),
  v.literal("public")
);

export const SourceKind = v.union(
  v.literal("file"), // file upload to Convex storage
  v.literal("url"), // single URL
  v.literal("sitemap"), // website sitemap
  v.literal("notion"),
  v.literal("slack"),
  v.literal("drive"),
  v.literal("github"),
  v.literal("confluence"),
  v.literal("webhook")
);

export const JobType = v.union(
  v.literal("crawl"),
  v.literal("ingest"),
  v.literal("chunk"),
  v.literal("embed"),
  v.literal("sync")
);

export const JobStatus = v.union(
  v.literal("queued"),
  v.literal("running"),
  v.literal("succeeded"),
  v.literal("failed"),
  v.literal("canceled")
);

export const Usage = v.object({
  inputTokens: v.number(),
  outputTokens: v.number(),
  totalTokens: v.number(),
  costUsd: v.optional(v.number()),
});

export const Citation = v.object({
  chunkId: v.id("chunks"),
  score: v.number(), // similarity score or normalized rank
  startChar: v.optional(v.number()),
  endChar: v.optional(v.number()),
});

// -------------------------
// Schema
// -------------------------
export default defineSchema({
  // Identity & tenancy
  users: defineTable({
    // Your app-level users (map to Clerk via clerkId)
    clerkId: v.string(), // provider user id
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    lastSeenAt: v.optional(v.number()),
    // free-form metadata about the user (plan, flags, etc.)
    meta: v.optional(v.any()),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_email", ["email"]),

  organizations: defineTable({
    name: v.string(),
    slug: v.string(),
    ownerId: v.id("users"),
    // billing, feature flags, etc.
    meta: v.optional(v.any()),
  })
    .index("by_slug", ["slug"])
    .index("by_owner", ["ownerId"]),

  memberships: defineTable({
    orgId: v.id("organizations"),
    userId: v.id("users"),
    role: OrgRole,
  })
    .index("by_user", ["userId"])
    .index("by_org", ["orgId"])
    .index("by_org_user", ["orgId", "userId"]),

  // Projects (bots/agents)
  projects: defineTable({
    orgId: v.id("organizations"),
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    visibility: Visibility, // who can access the bot
    status: v.optional(v.union(v.literal("active"), v.literal("archived"))),

    // Model & RAG config
    llmModel: v.string(), // e.g. "gpt-4o" | "gpt-4.1-mini" | "claude-3-5-sonnet"
    temperature: v.optional(v.number()),
    topP: v.optional(v.number()),
    systemPrompt: v.optional(v.string()),
    retrieval: v.object({
      topK: v.number(), // default K for retrieval
      minScore: v.optional(v.number()), // optional similarity gating
    }),
    embedModel: v.optional(v.string()), // for clarity; mirror EMBED_DIM if you vary it
    embedDim: v.optional(v.number()), // override EMBED_DIM per project if needed

    // Client widget / API exposure
    widget: v.optional(
      v.object({
        enabled: v.boolean(),
        allowedOrigins: v.array(v.string()),
        theme: v.optional(
          v.object({
            // keep flexible; UI reads these
            brandColor: v.optional(v.string()),
          })
        ),
      })
    ),
    rateLimits: v.optional(v.object({ rpm: v.number(), tpm: v.number() })),
    meta: v.optional(v.any()),
  })
    .index("by_org", ["orgId"])
    .index("by_org_slug", ["orgId", "slug"]),

  // Datasets (grouping of sources & documents)
  datasets: defineTable({
    orgId: v.id("organizations"),
    name: v.string(),
    description: v.optional(v.string()),
    visibility: Visibility,
    // default processing config
    chunking: v.object({
      // tune to your splitter
      maxTokens: v.number(),
      overlapTokens: v.number(),
    }),
    embedDim: v.optional(v.number()), // override project/global
    meta: v.optional(v.any()),
  })
    .index("by_org", ["orgId"])
    .index("by_org_name", ["orgId", "name"]),

  // Project↔Dataset membership (many-to-many)
  projectDatasets: defineTable({
    projectId: v.id("projects"),
    datasetId: v.id("datasets"),
  })
    .index("by_project", ["projectId"])
    .index("by_dataset", ["datasetId"])
    .index("by_project_dataset", ["projectId", "datasetId"]),

  // Source connectors
  sources: defineTable({
    orgId: v.id("organizations"),
    datasetId: v.id("datasets"),
    addedBy: v.id("users"),
    kind: SourceKind,
    status: v.union(
      v.literal("pending"),
      v.literal("active"),
      v.literal("error"),
      v.literal("disabled")
    ),
    // flexible configuration per connector
    config: v.object({
      url: v.optional(v.string()),
      sitemapUrl: v.optional(v.string()),
      storageId: v.optional(v.id("_storage")), // uploaded file
      include: v.optional(v.array(v.string())), // glob/paths
      exclude: v.optional(v.array(v.string())),
      authRef: v.optional(v.id("connectorSecrets")),
      headers: v.optional(v.record(v.string(), v.string())),
    }),
    schedule: v.optional(
      v.object({
        // for periodic syncs
        // e.g. "0 3 * * *" or your own format
        cron: v.string(),
        enabled: v.boolean(),
      })
    ),
    lastSyncedAt: v.optional(v.number()),
    error: v.optional(v.string()),
    meta: v.optional(v.any()),
  })
    .index("by_org", ["orgId"])
    .index("by_dataset", ["datasetId"])
    .index("by_kind", ["kind"]),

  // Connector credentials (references from sources.config.authRef)
  connectorSecrets: defineTable({
    orgId: v.id("organizations"),
    kind: v.string(), // "notion", "slack", etc.
    label: v.string(),
    // store tokens/keys indirectly if you can; otherwise encrypt app-side
    data: v.any(),
  })
    .index("by_org", ["orgId"])
    .index("by_org_kind", ["orgId", "kind"]),

  // Canonical documents derived from sources
  documents: defineTable({
    orgId: v.id("organizations"),
    datasetId: v.id("datasets"),
    sourceId: v.optional(v.id("sources")),
    title: v.optional(v.string()),
    url: v.optional(v.string()),
    storageId: v.optional(v.id("_storage")),
    mime: v.optional(v.string()),
    bytes: v.optional(v.number()),
    language: v.optional(v.string()),
    hash: v.optional(v.string()), // dedupe/versioning
    version: v.optional(v.number()),
    status: v.union(
      v.literal("processing"),
      v.literal("ready"),
      v.literal("error")
    ),
    meta: v.optional(v.any()),
  })
    .index("by_dataset", ["datasetId"])
    .index("by_source", ["sourceId"])
    .index("by_hash", ["hash"])
    .index("by_url", ["url"]),

  // Final chunks used for retrieval; embedding lives here
  chunks: defineTable({
    orgId: v.id("organizations"),
    datasetId: v.id("datasets"),
    docId: v.id("documents"),
    // optional scoping to project if you snapshot datasets
    projectId: v.optional(v.id("projects")),
    seq: v.number(), // chunk order within doc
    text: v.string(), // plain text used for RAG
    tokenCount: v.number(),
    embedding: v.array(v.float64()), // required for vector index
    // lightweight metadata (page, heading path, anchors, etc.)
    meta: v.optional(v.any()),
  })
    // vector search for retrieval (filter by org/dataset/project)
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: EMBED_DIM,
      filterFields: ["orgId", "datasetId", "projectId"],
    })
    // keyword fallback / debugging
    .searchIndex("search_text", {
      searchField: "text",
      filterFields: ["orgId", "datasetId", "projectId"],
    })
    .index("by_doc_seq", ["docId", "seq"])
    .index("by_dataset", ["datasetId"]),

  // End-user conversations
  conversations: defineTable({
    orgId: v.id("organizations"),
    projectId: v.id("projects"),
    // if chatting users are anonymous, store a stable clerkId
    clerkId: v.optional(v.string()),
    createdBy: v.optional(v.id("users")), // dashboard user
    title: v.optional(v.string()),
    status: v.union(
      v.literal("open"),
      v.literal("closed"),
      v.literal("archived")
    ),
    lastActiveAt: v.optional(v.number()),
    meta: v.optional(v.any()),
  })
    .index("by_project", ["projectId"])
    .index("by_clerkId", ["projectId", "clerkId"])
    .index("by_createdBy", ["createdBy"]),

  messages: defineTable({
    orgId: v.id("organizations"),
    projectId: v.id("projects"),
    conversationId: v.id("conversations"),
    role: ChatRole,
    text: v.string(), // normalized plain text for search & analytics
    // raw message payload if you stream/tools/etc.
    payload: v.optional(v.any()),
    model: v.optional(v.string()),
    usage: v.optional(Usage),
    latencyMs: v.optional(v.number()),
    citations: v.optional(v.array(Citation)),
    error: v.optional(v.string()),
    meta: v.optional(v.any()),
  })
    .index("by_conversation", ["conversationId"]) 
    .index("by_project", ["projectId"]) 
    .searchIndex("search_text", {
      searchField: "text",
      filterFields: ["projectId", "orgId"],
    }),

  feedback: defineTable({
    orgId: v.id("organizations"),
    projectId: v.id("projects"),
    messageId: v.id("messages"),
    // simple thumbs / NPS / category
    rating: v.union(v.literal("up"), v.literal("down")),
    reason: v.optional(v.string()),
    labels: v.optional(v.array(v.string())),
    createdBy: v.optional(v.id("users")),
    clerkId: v.optional(v.string()),
  })
    .index("by_message", ["messageId"])
    .index("by_project", ["projectId"]),

  // API keys (for server→server calls)
  apiKeys: defineTable({
    orgId: v.id("organizations"),
    name: v.string(),
    // store only a prefix and a hash on the server side
    prefix: v.string(), // e.g. first 6 chars for display
    secretHash: v.string(), // HMAC/SHA-256 hash of the key
    scopes: v.array(v.string()),
    status: v.union(v.literal("active"), v.literal("revoked")),
    lastUsedAt: v.optional(v.number()),
    createdBy: v.id("users"),
  })
    .index("by_org", ["orgId"])
    .index("by_prefix", ["prefix"]),

  // Daily usage aggregation for billing/analytics
  usageDaily: defineTable({
    orgId: v.id("organizations"),
    projectId: v.optional(v.id("projects")),
    apiKeyId: v.optional(v.id("apiKeys")),
    day: v.string(), // "YYYY-MM-DD"
    usage: Usage,
  })
    .index("by_org_day", ["orgId", "day"])
    .index("by_project_day", ["projectId", "day"])
    .index("by_key_day", ["apiKeyId", "day"]),

  // Ingestion & sync jobs
  jobs: defineTable({
    orgId: v.id("organizations"),
    type: JobType,
    status: JobStatus,
    // references to what the job works on
    sourceId: v.optional(v.id("sources")),
    docId: v.optional(v.id("documents")),
    datasetId: v.optional(v.id("datasets")),
    attempts: v.number(),
    runAt: v.optional(v.number()),
    startedAt: v.optional(v.number()),
    finishedAt: v.optional(v.number()),
    error: v.optional(v.string()),
    input: v.optional(v.any()),
    output: v.optional(v.any()),
  })
    .index("by_status_type", ["status", "type", "runAt"])
    .index("by_source", ["sourceId"])
    .index("by_doc", ["docId"]),

  // Lightweight evaluation support
  evalSets: defineTable({
    orgId: v.id("organizations"),
    name: v.string(),
    description: v.optional(v.string()),
  }).index("by_org", ["orgId"]),

  evalExamples: defineTable({
    setId: v.id("evalSets"),
    question: v.string(),
    expected: v.optional(v.string()),
    metadata: v.optional(v.any()),
  }).index("by_set", ["setId"]),

  evalRuns: defineTable({
    orgId: v.id("organizations"),
    projectId: v.id("projects"),
    setId: v.id("evalSets"),
    model: v.string(),
    status: v.union(
      v.literal("running"),
      v.literal("succeeded"),
      v.literal("failed")
    ),
    metrics: v.optional(
      v.object({
        exactMatch: v.optional(v.number()),
        rougeL: v.optional(v.number()),
        custom: v.optional(v.any()),
      })
    ),
    createdBy: v.id("users"),
  })
    .index("by_project", ["projectId"])
    .index("by_set", ["setId"]),

  evalResults: defineTable({
    runId: v.id("evalRuns"),
    exampleId: v.id("evalExamples"),
    answer: v.optional(v.string()),
    score: v.optional(v.number()),
    details: v.optional(v.any()),
  })
    .index("by_run", ["runId"])
    .index("by_run_example", ["runId", "exampleId"]),
});
