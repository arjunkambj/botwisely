import { defineApp } from "convex/server";
import rag from "@convex-dev/rag/convex.config";
import agent from "@convex-dev/agent/convex.config";

// Minimal app config (no components). Add components later when ready.
const app = defineApp() as unknown as { use: (c: unknown) => void };
app.use(rag);
app.use(agent);
export default app;
