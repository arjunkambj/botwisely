import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";
import type { FunctionReference } from "convex/server";

const crons = cronJobs();

// Periodic site refresh using internal action.
const internalIngest = (internal as unknown as {
  ingest: { refreshSource: FunctionReference<"action", "internal"> };
}).ingest;

crons.interval("hourly refresh", { hours: 1 }, internalIngest.refreshSource, {
  namespace: "org:proj:dataset",
  seedUrls: ["https://example.com/"],
});

export default crons;
