import { config as base } from "../../packages/eslint-config/base.js";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...base,
  {
    // Ignore generated Convex files to avoid noisy warnings
    ignores: ["convex/_generated/**"],
  },
];
