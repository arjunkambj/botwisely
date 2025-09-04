import { action } from "../_generated/server";
import { v } from "convex/values";
import { RAG } from "@convex-dev/rag";
import { openai } from "@ai-sdk/openai";

// Tool 1: search the web via Exa
export const tool_search_web = action({
  args: { query: v.string(), site: v.optional(v.string()) },
  handler: async (_ctx, { query, site }) => {
    // Mark as used to satisfy lint until implemented
    void _ctx; void query; void site;
    // TODO: Implement Exa search + contents and return summarized items
    return { items: [] as Array<{ url: string; title?: string; snippet?: string }> };
  },
});

// Tool 2: knowledge (RAG)
export const tool_rag = action({
  args: { namespace: v.string(), query: v.string() },
  handler: async (
    ctx,
    { namespace, query }
  ): Promise<{ context: string; sources: Array<{ title?: string; key: string }> }> => {
    const mod: unknown = await import("../_generated/api");
    const ragComponents = (mod as { components?: unknown }).components;
    if (!ragComponents || !(ragComponents as { rag?: unknown }).rag) {
      throw new Error(
        "RAG component not installed. Add @convex-dev/rag in convex.config and upgrade convex to a components-capable version."
      );
    }
    const rag = new RAG(ragComponents as ConstructorParameters<typeof RAG>[0], {
      textEmbeddingModel: openai.embedding("text-embedding-3-small"),
      embeddingDimension: 1536,
    });
    const { text, entries } = (await rag.search(ctx, {
      namespace,
      query,
      limit: 8,
    })) as { text: string; entries: Array<{ title?: string; key: string }> };
    const sources = entries.map((e) => ({
      title: e.title,
      key: e.key,
    }));
    return { context: text, sources };
  },
});
