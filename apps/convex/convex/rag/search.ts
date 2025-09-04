import { action } from "../_generated/server";
import { v } from "convex/values";
import { RAG } from "@convex-dev/rag";
import { openai } from "@ai-sdk/openai";

// Initialize RAG per call to avoid static dependency on generated components

export const search = action({
  args: { namespace: v.string(), query: v.string(), limit: v.optional(v.number()) },
  handler: async (
    ctx,
    { namespace, query, limit }
  ): Promise<{ results: unknown; entries: unknown; text: string }> => {
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
    const { results, entries, text } = (await rag.search(ctx, {
      namespace,
      query,
      limit: limit ?? 10,
      vectorScoreThreshold: 0.5,
      chunkContext: { before: 1, after: 1 },
    })) as { results: unknown; entries: unknown; text: string };
    return { results, entries, text };
  },
});
