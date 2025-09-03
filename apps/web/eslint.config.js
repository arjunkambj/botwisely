import { nextJsConfig } from "@repo/eslint-config/next-js";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextJsConfig,
  {
    rules: {
      // Using TypeScript; prop-types are unnecessary
      "react/prop-types": "off",
    },
  },
];
