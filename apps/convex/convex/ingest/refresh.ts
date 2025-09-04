import { internalAction } from "../_generated/server";
import { v } from "convex/values";

export const refreshSource = internalAction({
  args: { namespace: v.string(), seedUrls: v.array(v.string()) },
  handler: async (_ctx, _args) => {
    void _ctx; void _args;
    // TODO: Implement discovery via Exa search + contents, then call fromUrls.
    // This is a placeholder to wire scheduling.
    return { ok: true };
  },
});
