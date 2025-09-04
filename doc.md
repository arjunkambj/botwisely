Great—since you’re using Exa for web content, LlamaIndex.TS for parsing only, and Convex’s RAG + Agent Components for storage/retrieval + chat/agents, here’s a concrete, production‑ready architecture you can drop into a Next.js + Convex repo.

Below you’ll get:

Data flow diagrams (Next.js → Convex and background sync paths)

A clean Convex folder structure with file names, responsibilities, and function skeletons

A short “meta flow” doc showing how metadata moves from sources → entries → search → answers

Key Convex facts used below:

Vector search must run inside actions.
Convex Developer Hub

Use HTTP Actions + Router for webhooks/public endpoints.
Convex Developer Hub
+1

Use Cron Jobs and Scheduled Functions for periodic or deferred work.
Convex Developer Hub
+1

Environment variables are configured in the Convex dashboard and read via process.env in functions.
Convex Developer Hub

Convex supports full‑text search and file storage if/when you need them.
Convex Developer Hub
+1

The RAG component exposes a high‑level RAG class (add, addAsync, search, generateText,…); you can pass your own chunks (from LlamaIndex) and use keys/content hashes for idempotent upserts.
GitHub

The Agent component manages threads/messages, built‑in hybrid search on messages, tool calls, and integrates with the RAG component.
Convex Developer Hub
npm

1. Data flows
   A. Admin “ingest website” (push)

Next.js UI → Convex (actions)

Admin enters site or list of URLs in Next.

Next calls api.ingest.fromUrls (Convex action).

Action calls Exa with SDK (exa-js) to fetch page contents (search + get contents or direct contents) with text: true.
npm
Exa
+1

Transform HTML/Markdown → plain text (quick cleanups).

Run LlamaIndex SentenceSplitter / TokenTextSplitter to produce chunks (you are using LlamaIndex only for parsing/splitting).
next.ts.llamaindex.ai
+1

Upsert into @convex-dev/rag: rag.add(ctx, { namespace, key, chunks, filterValues, metadata }). The component handles embedding & storage; or you can provide your own embeddings per‑chunk if needed.
GitHub

Optional: attach onComplete handler to set your “document is ready” flags.
GitHub

B. Background “keep site fresh” (pull)

Convex Cron → Action

convex/cron.ts runs hourly/daily and calls internal.ingest.refreshSource.

It queries Exa again (subpage crawling as needed), diffs URLs and contentHash, and re‑adds changed pages via rag.add with the same key to gracefully replace.
Exa
GitHub

A periodic “delete replaced content older than 7d” job runs (see lifecycle example in RAG docs).
GitHub

C. Chat / Agent with RAG

Next.js UI → Convex Agent Component → RAG search

User writes a message; Next calls agent.threads.sendMessage (your wrapper) which:

Does tool calling if needed (e.g., “search_web” tool uses Exa; “knowledge” tool calls rag.search for relevant context).

Uses the Agent component’s built‑in memory/streaming; optional hybrid search on message history.
Convex Developer Hub

Agent composes a final answer with the context from rag.search.
GitHub

2. Convex folder structure (clean architecture)
   /convex
   ├─ convex.config.ts # Install Convex Components (RAG, Agent)
   ├─ schema.ts # Your app tables (orgs, datasets, sources…), optional if RAG-only
   ├─ cron.ts # Periodic syncs / cleanup
   ├─ http.ts # Public HTTP endpoints (webhooks, uploads)
   ├─ utils/
   │ ├─ env.ts # Safe, typed access to process.env
   │ ├─ hashing.ts # sha256(content) helper
   │ └─ types.ts # Shared interfaces (SourceConfig, DocMeta…)
   ├─ connectors/
   │ ├─ exa.ts # Calls Exa search/contents APIs
   │ └─ llama.ts # LlamaIndex-based splitters (parsing only)
   ├─ datasets/
   │ ├─ create.ts # Create dataset/source
   │ ├─ sources.ts # Enable/disable sync, set crawl config
   │ └─ documents.ts # Track “doc added/ready/error” for admin UI
   ├─ ingest/
   │ ├─ fromUrls.ts # Entry point: ingest list of URLs now
   │ ├─ fromSearch.ts # Entry point: ingest by Exa query/domain
   │ ├─ refresh.ts # Re-crawl/replace via key+contentHash
   │ └─ onComplete.ts # RAG onComplete handlers to update your tables
   ├─ rag/
   │ ├─ ask.ts # One-off: RAG.search + generateText
   │ └─ search.ts # Thin wrapper around rag.search (actions)
   └─ agent/
   ├─ threads.ts # Create thread, list threads, sendMessage
   └─ tools.ts # Tool definitions (search_web, knowledge, etc.)

Why components?
They encapsulate their own tables/functions and you call them through a typed API while keeping your app’s tables separate—clean boundaries, easy upgrades.
Convex Developer Hub

3. Files you can copy‑paste (skeletons)
   convex/convex.config.ts – install components
   import { defineApp } from "convex/server";
   import rag from "@convex-dev/rag/convex.config";
   import agent from "@convex-dev/agent/convex.config";

const app = defineApp();
app.use(rag);
app.use(agent);

export default app;

RAG exposes a RAG helper class from your generated components. Agent exposes thread/message functions with built-in memory & tool calling.
GitHub
npm

convex/utils/env.ts
export function mustGet(name: string): string {
const v = process.env[name];
if (!v) throw new Error(`Missing env var: ${name}`);
return v;
}
// EXA_API_KEY, OPENAI_API_KEY, etc. Set in Convex dashboard.

Convex functions read env via process.env.
Convex Developer Hub

convex/connectors/exa.ts – Exa helpers (actions)
import { action } from "./\_generated/server";
import { v } from "convex/values";
import { mustGet } from "../utils/env";

type ExaContent = { url: string; title?: string; text?: string; publishedDate?: string };

async function exaFetchContents(urls: string[]): Promise<ExaContent[]> {
const apiKey = mustGet("EXA_API_KEY");
// Using exa-js SDK; alternatively call REST /contents directly.
// npm i exa-js
const { Exa } = await import("exa-js");
const exa = new Exa(apiKey);

// Prefer direct contents for known URLs; for discovery use search/auto + contents
// https://docs.exa.ai/reference/get-contents
const res = await exa.getContents({ urls, text: true, summary: false });
// Normalize to our structure
return res.results.map(r => ({
url: r.url,
title: r.title ?? undefined,
text: r.text ?? r.highlights?.join("\n") ?? undefined,
publishedDate: r.publishedDate ?? undefined
}));
}

export const fetchContents = action({
args: { urls: v.array(v.string()) },
handler: async (\_ctx, { urls }) => {
return await exaFetchContents(urls);
},
});

Exa: use exa-js or call POST /contents and/or search + “crawling subpages” for discovery.
npm
Exa
+1

convex/connectors/llama.ts – LlamaIndex splitters (parsing only)
import { action } from "./\_generated/server";
import { v } from "convex/values";

// We only expose splitting. Install: npm i llamaindex
export const splitText = action({
args: {
text: v.string(),
chunkSize: v.optional(v.number()),
chunkOverlap: v.optional(v.number()),
},
handler: async (\_ctx, { text, chunkSize, chunkOverlap }) => {
// Lazy import so client bundle stays lean
const { SentenceSplitter } = await import("llamaindex");
const splitter = new SentenceSplitter({
chunkSize: chunkSize ?? 1024,
chunkOverlap: chunkOverlap ?? 200,
});
const chunks = splitter.splitText(text); // returns string[]
return chunks;
},
});

LlamaIndex.TS SentenceSplitter and TokenTextSplitter are standard text splitters for JS; SentenceSplitter keeps sentences/paragraphs intact by default.
next.ts.llamaindex.ai
+1

convex/ingest/fromUrls.ts – Orchestration
import { action, internalAction } from "./\_generated/server";
import { v } from "convex/values";
import { components } from "./\_generated/api";
import { RAG } from "@convex-dev/rag";
import { openai } from "@ai-sdk/openai";

const rag = new RAG(components.rag, {
textEmbeddingModel: openai.embedding("text-embedding-3-small"),
embeddingDimension: 1536, // Must match model dimension
});

export const fromUrls = action({
args: {
namespace: v.string(), // e.g. orgId:projectId:datasetId
urls: v.array(v.string()),
filters: v.optional(v.record(v.string(), v.string())), // {source:"web", site:"example.com"}
},
handler: async (ctx, { namespace, urls, filters }) => {
const pages = await ctx.runAction(components.connectors.exa.fetchContents, { urls });

    for (const p of pages) {
      if (!p.text) continue;

      // Split with LlamaIndex
      const { chunks } = await ctx.runAction(internal.splitTextInternal, { text: p.text });

      // Upsert into RAG. Use key=url for replace-on-change, and attach metadata.
      await rag.add(ctx, {
        namespace,
        key: p.url,
        // Option A: pass chunks so RAG embeds for you
        chunks,
        title: p.title,
        filterValues: filters
          ? Object.entries(filters).map(([name, value]) => ({ name, value }))
          : undefined,
        metadata: { url: p.url, publishedDate: p.publishedDate },
        // Optionally: compute and pass contentHash to skip re-add when unchanged
      });
    }
    return { added: pages.length };

},
});

// Internal wrapper so we don't expose raw llama params publicly
export const splitTextInternal = internalAction({
args: { text: v.string() },
handler: async (\_ctx, { text }) => {
const { SentenceSplitter } = await import("llamaindex");
const chunks = new SentenceSplitter({}).splitText(text);
return { chunks };
},
});

RAG’s add supports your own chunks/embeddings, key for replacements, filters, and onComplete handlers.
GitHub

OpenAI 1536‑dim embeddings example shown (can swap to any AI SDK model).
OpenAI Platform

convex/ingest/refresh.ts – Scheduled refresh / replace
import { internalAction } from "./\_generated/server";
import { v } from "convex/values";
import { components } from "./\_generated/api";
import { RAG } from "@convex-dev/rag";
import { openai } from "@ai-sdk/openai";

const rag = new RAG(components.rag, {
textEmbeddingModel: openai.embedding("text-embedding-3-small"),
embeddingDimension: 1536,
});

export const refreshSource = internalAction({
args: { namespace: v.string(), seedUrls: v.array(v.string()) },
handler: async (ctx, { namespace, seedUrls }) => {
// Example: call Exa to crawl subpages under seed URLs, then call fromUrls again.
// ... your discovery logic here ...
// await ctx.runAction(fromUrls, { namespace, urls: discoveredUrls });
},
});

convex/rag/search.ts – Thin wrapper
import { action } from "./\_generated/server";
import { v } from "convex/values";
import { components } from "./\_generated/api";
import { RAG } from "@convex-dev/rag";
import { openai } from "@ai-sdk/openai";

const rag = new RAG(components.rag, {
textEmbeddingModel: openai.embedding("text-embedding-3-small"),
embeddingDimension: 1536,
});

export const search = action({
args: { namespace: v.string(), query: v.string(), limit: v.optional(v.number()) },
handler: async (ctx, { namespace, query, limit }) => {
const { results, entries, text } = await rag.search(ctx, {
namespace,
query,
limit: limit ?? 10,
vectorScoreThreshold: 0.5,
chunkContext: { before: 1, after: 1 },
});
return { results, entries, text };
},
});

RAG’s search returns both per‑chunk results and per‑entry merged text to drop straight into prompts.
GitHub

convex/agent/tools.ts – Tools the Agent can call
import { internalAction, action } from "./\_generated/server";
import { v } from "convex/values";
import { components } from "./\_generated/api";
import { RAG } from "@convex-dev/rag";
import { openai } from "@ai-sdk/openai";

const rag = new RAG(components.rag, {
textEmbeddingModel: openai.embedding("text-embedding-3-small"),
embeddingDimension: 1536,
});

// Tool 1: search the web via Exa
export const tool_search_web = action({
args: { query: v.string(), site: v.optional(v.string()) },
handler: async (ctx, { query, site }) => {
// Use Exa auto-search or filter by site, then fetch contents
// Return top N summarized links w/ snippets or prepared context
return { items: [] };
},
});

// Tool 2: knowledge (RAG)
export const tool_rag = action({
args: { namespace: v.string(), query: v.string() },
handler: async (ctx, { namespace, query }) => {
const { text, entries } = await rag.search(ctx, { namespace, query, limit: 8 });
return { context: text, sources: entries.map(e => ({ title: e.title, key: e.key })) };
},
});

Agent component docs describe tools + message/threads, and it integrates with RAG.
Convex Developer Hub

convex/cron.ts – scheduled maintenance
import { cronJobs } from "convex/server";
import { internal } from "./\_generated/api";

const crons = cronJobs();

crons.cron("hourly refresh", { hour: { every: 1 } }, internal.ingest.refreshSource, {
namespace: "org:proj:dataset",
seedUrls: ["https://example.com/"],
});

crons.cron("delete old replaced", { hour: { every: 1 } }, internal.ingest.deleteOldReplaced, {});

export default crons;

Cron syntax may vary (intervals or cron‑like spec); see docs.
Convex Developer Hub
+1

convex/http.ts – public endpoints (optional)
import { httpRouter } from "convex/server";
import { httpAction } from "./\_generated/server";

const http = httpRouter();

http.route({
path: "/healthz",
method: "GET",
handler: httpAction(async () => new Response("ok")),
});

// Example: direct file upload endpoint or admin triggers can live here.

export default http;

Use HTTP actions for webhooks or a small public API surface.
Convex Developer Hub

4. How the Next.js side calls this

Use convex/react hooks: useAction(api.ingest.fromUrls), useAction(api.rag.search), etc. They’re reactive for queries and straightforward for actions/mutations.
Convex Developer Hub

Example (App Router):

import { useAction } from "convex/react";
import { api } from "@/convex/\_generated/api";

export function IngestForm() {
const fromUrls = useAction(api.ingest.fromUrls);
async function onSubmit(urls: string[]) {
await fromUrls({ namespace: "org:proj:dataset", urls });
}
// render your form...
}

5. “Meta flow” (what metadata goes where)

Goal: Keep the RAG store clean and link back to your admin records.

Your app tables (schema.ts, optional if you lean entirely on the RAG component): sources, documents rows track what you intended to ingest (status: processing/ready/error), owner org/project, schedule, etc.

RAG Entry (inside component): you add content per entry with:

namespace — choose a stable scope, e.g. orgId:projectId:datasetId

key — unique ID per document (use the URL); repeat with same key to replace

chunks — string[] from LlamaIndex splitters

filterValues — searchable facets (e.g. site, contentType, language, category)

metadata — carry through url, title, publishedDate, sourceId, etc.

Lifecycle:

When content changes, call rag.add(... { key }) again; the component stages the new vectors, swaps, and lets you delete the old version after onComplete (or on a cron).
GitHub

Retrieval:

Call rag.search in an action (or via the Agent tools). You get:

results (chunks + scores, with optional surrounding context)

entries (source entries back—use metadata to show attributions)

text (preformatted context string) to paste straight into prompts.
GitHub

6. What to configure (one time)

Convex env vars: EXA_API_KEY, OPENAI_API_KEY, any others → set in dashboard; read with process.env only in server functions.
Convex Developer Hub

RAG embedding model & dimension in the RAG helper (e.g., OpenAI text-embedding-3-small = 1536 dims).
GitHub
OpenAI Platform

Namespaces strategy: pick a consistent format (org:proj:dataset) so filtering/permissions are easy.

7. Optional upgrades

Hybrid search on your messages by using the Agent component (it already supports hybrid message search).
Convex Developer Hub

Scheduled Functions for idempotent ingest retries; call ctx.scheduler.runAfter(...) from your mutations/actions.
Convex Developer Hub

HTTP uploads or Convex upload URLs for large files → then use rag.addAsync({ chunkerAction, metadata }).
GitHub
Convex Developer Hub

Quick checklist

Install: npm i exa-js llamaindex @convex-dev/rag @convex-dev/agent @ai-sdk/openai

Add convex/convex.config.ts with app.use(rag); app.use(agent);
GitHub

Set env: EXA_API_KEY, OPENAI_API_KEY (Convex dashboard).
Convex Developer Hub

Build convex/connectors/exa.ts + connectors/llama.ts

Build convex/ingest/fromUrls.ts + cron.ts

Wire Next.js UI with useAction/useQuery.
Convex Developer Hub

If you want, I can tailor the code to your exact namespace convention and the datasets/sources
