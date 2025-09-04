import { action } from "../_generated/server";
import { v } from "convex/values";

// Expose only splitting; install: `npm i llamaindex`
export const splitText = action({
  args: {
    text: v.string(),
    chunkSize: v.optional(v.number()),
    chunkOverlap: v.optional(v.number()),
  },
  handler: async (_ctx, { text, chunkSize, chunkOverlap }) => {
    const { SentenceSplitter } = await import("llamaindex");
    const splitter = new SentenceSplitter({
      chunkSize: chunkSize ?? 1024,
      chunkOverlap: chunkOverlap ?? 200,
    });
    const chunks: string[] = splitter.splitText(text);
    return chunks;
  },
});

export async function splitTextLocal(
  text: string,
  chunkSize = 1024,
  chunkOverlap = 200
): Promise<string[]> {
  const { SentenceSplitter } = await import("llamaindex");
  const splitter = new SentenceSplitter({ chunkSize, chunkOverlap });
  return splitter.splitText(text);
}
// Action using external library; no Node built-ins required.
