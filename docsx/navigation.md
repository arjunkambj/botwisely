Navigation (Agents-first)

Top-Level (Org scope, Dashboard)

- Overview: Org-wide KPIs, recent activity, quick actions.
- Agents: List, search, create/import, duplicate/archive.
- Usage: Token/cost usage across org (by bot, by period).
- Members: Invite/manage users, roles, pending invites.
- Settings: Org profile, domains, security, webhooks, tabs for Billing and API Keys.
- Integrations: Slack, Intercom, Zendesk, etc.
 - Integrations: Slack, Discord, Zapier (future), webhooks.

Agent-Level (when an agent is selected)

- Overview: Health, last ingest, quick links, publish status.
- Playground: Live chat with streaming; thread history.
- Sources: Website, Files, Text, Q&A (each as tab).
- Knowledge: Documents, chunks, sync history, dedupe rules.
- Analytics: Chats, Top queries, Response quality, CSAT.
- Activity: Chat logs, filters, export, feedback flags.
- Connect & Embed: Web widget, script tag, channels, SDKs.
- Settings (tabbed): General, Model & Context, Tools, Notifications, Access, API Keys.

Header Bar

- Org switcher, Agent switcher (searchable), Global search, Create Agent, Help.

Footer

- Teams & Orgs, Integrations, Settings (already present in your footer items).

Notes

- Preserve separate tabs for Sources (Website/Files/Text/Q&A).
- Keep dedicated pages for Playground, Connect/Embed, Analytics→Chats, Activity→Chat logs, Settings→Notifications.
- Separate route groups: `(protected)/(dashboard)` for org pages; `(protected)/agents` for agent pages.
