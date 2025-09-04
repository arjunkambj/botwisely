import { action } from "../_generated/server";
import { v } from "convex/values";
import { mustGet } from "../utils/env";

type ExaContent = {
  url: string;
  title?: string;
  text?: string;
  publishedDate?: string;
};

export async function exaFetchContents(urls: string[]): Promise<ExaContent[]> {
  const apiKey = mustGet("EXA_API_KEY");
  // Using exa-js SDK; defer import to avoid bundling in client
  const { Exa } = await import("exa-js");
  const exa = new Exa(apiKey);
  // getContents signature: getContents(urlsOrResults, options)
  const res = await exa.getContents(urls, { text: true });
  type ExaResult = {
    url: string;
    title?: string;
    text?: string;
    highlights?: string[];
    publishedDate?: string;
  };
  const results = res.results as ExaResult[];
  return results.map((r) => ({
    url: r.url,
    title: r.title ?? undefined,
    text: r.text ?? (r.highlights ? r.highlights.join("\n") : undefined),
    publishedDate: r.publishedDate ?? undefined,
  }));
}

export const fetchContents = action({
  args: { urls: v.array(v.string()) },
  handler: async (_ctx, { urls }) => {
    return await exaFetchContents(urls);
  },
});
// Action using external SDK; no Node built-ins required.
