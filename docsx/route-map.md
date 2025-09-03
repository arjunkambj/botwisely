Next.js Route Map (App Router)

Base

- apps/web/app/(marketing)/page.tsx: Public landing (optional).
- apps/web/app/(auth)/sign-in/[[...sign-in]]/page.tsx: Clerk auth.
- apps/web/app/(protected)/(dashboard)/layout.tsx: Dashboard shell (server) with Sidebar.
- apps/web/app/(protected)/agents/layout.tsx: Agents area shell.

Org-Level (Dashboard group)

- apps/web/app/(protected)/(dashboard)/overview/page.tsx
- apps/web/app/(protected)/(dashboard)/usage/page.tsx
- apps/web/app/(protected)/(dashboard)/members/page.tsx
- apps/web/app/(protected)/(dashboard)/settings/page.tsx (tabs)
- apps/web/app/(protected)/(dashboard)/settings/billing/page.tsx
- apps/web/app/(protected)/(dashboard)/settings/api-keys/page.tsx
- apps/web/app/(protected)/(dashboard)/settings/webhooks/page.tsx
- apps/web/app/(protected)/(dashboard)/settings/security/page.tsx
- apps/web/app/(protected)/(dashboard)/integrations/page.tsx

Agents Area

- apps/web/app/(protected)/agents/page.tsx (list & create)
- apps/web/app/(protected)/agents/[agentId]/page.tsx (Overview)
- apps/web/app/(protected)/agents/[agentId]/playground/page.tsx
- apps/web/app/(protected)/agents/[agentId]/sources/page.tsx
- apps/web/app/(protected)/agents/[agentId]/knowledge/page.tsx
- apps/web/app/(protected)/agents/[agentId]/analytics/chats/page.tsx
- apps/web/app/(protected)/agents/[agentId]/activity/chat-logs/page.tsx
- apps/web/app/(protected)/agents/[agentId]/connect/page.tsx
- apps/web/app/(protected)/agents/[agentId]/settings/page.tsx (tabs)
- apps/web/app/(protected)/agents/[agentId]/settings/model/page.tsx
- apps/web/app/(protected)/agents/[agentId]/settings/tools/page.tsx
- apps/web/app/(protected)/agents/[agentId]/settings/embed/page.tsx
- apps/web/app/(protected)/agents/[agentId]/settings/notifications/page.tsx
- apps/web/app/(protected)/agents/[agentId]/settings/access/page.tsx
- apps/web/app/(protected)/agents/[agentId]/settings/api-keys/page.tsx

Sources Tabs (client subcomponents)

- Website, Files, Text, Q&A as client components under `components/bots/sources/*`.

Implementation Notes

- Keep `page.tsx` as server components; move stateful UI to client subcomponents.
- Use `ConvexProviderWithClerk` in app root; call hooks from client components.
- Clerk provides identity; orgs and memberships are stored in Convex.
- Settings pages render a tabbed UI; nested routes enable deep-linking to tabs.
