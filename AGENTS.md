# Repository Guidelines

## Project Structure & Module Organization
- apps/web: Next.js (App Router). Routes in `app/`, UI in `components/`, styles in `styles/`.
- apps/convex: Convex backend. Functions in `convex/`, generated API in `apps/convex/_generated/`.
- packages/ui: Shared React components. Also `packages/eslint-config` and `packages/typescript-config`.
- Shared types live in `packages/types`. Use the `@/*` path alias where configured (`tsconfig.json`).
- Auth + UI: `ClerkProvider` is wired in `apps/web/app/layout.tsx`; HeroUI provider in `components/Provider.tsx`.

## Build, Test, and Development Commands
- `bun run dev`: Run all workspaces in dev via Turbo. Filter a target: `bun run dev --filter=web` or `--filter=convex-app`.
- `bun run build`: Production build for all; filter one: `bun run build --filter=web`.
- `bun run lint`: ESLint across packages.
- `bun run check-types`: TypeScript `noEmit` type check.
- `bun run format`: Prettier format for `ts/tsx/md` files.

## Coding Style & Naming Conventions
- TypeScript (strict), 2-space indent, semicolons on. Prettier required before commit.
- ESLint: use `@repo/eslint-config` (Next.js, React Hooks, Prettier-compatible).
- Components: PascalCase filenames/exports (e.g., `Button.tsx`). Next.js routes under `apps/web/app`.
- Keep `page.tsx` as Server Components; put `use client` only on subcomponents.

## Testing Guidelines
- Emphasize type-safety and linting. If adding tests, colocate as `*.test.ts`/`*.test.tsx` next to source.
- Prefer unit tests for hooks/utils; mock Convex/Clerk in tests. Avoid networked tests.
- Ensure `bun run lint` and `bun run check-types` pass locally and in CI.

## Commit & Pull Request Guidelines
- Conventional Commits (scope optional): `feat(web): add auth route`, `fix(ui): button aria-label`.
- PRs: clear description, linked issues, and screenshots for UI changes.
- Note env or migration steps. Ensure `bun run lint` and `bun run check-types` pass.

## Architecture & Security Notes
- Stack: Next.js frontend, Convex backend, Clerk auth; Convex bound via `ConvexProviderWithClerk`.
- Keep tenant data isolated; access data only through Convex functions.
- Do not leak secrets. Only expose `NEXT_PUBLIC_*` when truly client-safe; keep secrets in `.env.local`.

## Repository Rules
- Always follow `@rules_convex.md`, `@Rules_performance.md` (Convex) and `@rules_Style.md`, `@Rules_performance.md` (Next.js).
- Keep components modular. Place Convex logic in `web/hooks` or `mobile/hooks` (not inside components).
- Write shared types in `packages/types`.

## Dependency Management (Turbo Workspaces)
- Do not hand-edit `package.json` to add deps. Always install via the workspace using Bun with approval.
- Install to a specific workspace by running commands in that workspace directory:
  - `cd apps/convex && bun add <pkg...>`
- Examples (Convex RAG stack):
  - `cd apps/convex && bun add @convex-dev/rag @convex-dev/agent @ai-sdk/openai exa-js llamaindex`
- Rationale: keeps versions resolved by the package manager and avoids drift across workspaces.
- Convex env vars (e.g., `EXA_API_KEY`, `OPENAI_API_KEY`) must be set in the Convex dashboard. Do not add them to repo `.env` files for server functions.

## Codegen & Checks
- Run convex locally to generate `_generated/` (the CLI watches and updates):
  - `bun run dev --filter=convex-app`
- Type check and lint (convex only):
  - `bun run check-types --filter=convex-app`
  - `bun run lint --filter=convex-app`
