import { action } from "../_generated/server";
import { v } from "convex/values";
import { RAG } from "@convex-dev/rag";
import { openai } from "@ai-sdk/openai";
import { exaFetchContents } from "../connectors/exa";
import { splitTextLocal } from "../connectors/llama";

export const fromUrls = action({
  args: {
    namespace: v.string(),
    urls: v.array(v.string()),
    filters: v.optional(v.record(v.string(), v.string())),
  },
  handler: async (ctx, { namespace, urls, filters }) => {
    // Fetch page contents via Exa connector (dynamic import to avoid type coupling during codegen)
    const pages = await exaFetchContents(urls);

    let added = 0;
    for (const p of pages) {
      if (!p.text) continue;

      // Split with LlamaIndex
      const chunks = await splitTextLocal(p.text);

      // Initialize RAG inside handler to avoid static dependency on generated components
      const mod = await import("../_generated/api");
      const ragComponents = (
        mod as unknown as { components?: ConstructorParameters<typeof RAG>[0] }
      ).components;
      if (!ragComponents || !(ragComponents as { rag?: unknown }).rag) {
        throw new Error(
          "RAG component not installed. Remove this action or add @convex-dev/rag to convex.config and upgrade convex to a components-capable version."
        );
      }
      const rag = new RAG(ragComponents, {
        textEmbeddingModel: openai.embedding("text-embedding-3-small"),
        embeddingDimension: 1536,
      });

      await rag.add(ctx, {
        namespace,
        key: p.url,
        chunks,
        title: p.title,
        filterValues: filters
          ? Object.entries(filters).map(([name, value]) => ({ name, value }))
          : undefined,
        metadata:
          p.publishedDate !== undefined
            ? { url: p.url, publishedDate: p.publishedDate }
            : { url: p.url },
      });
      added += 1;
    }

    return { added };
  },
});
