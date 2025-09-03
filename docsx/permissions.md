Permissions & Roles

Org Roles

- owner: full access; manage billing, members, bots, keys, webhooks.
- admin: manage bots, members (except owner), integrations.
- editor: edit bots, sources, embeddings, connect/embed, view analytics.
- viewer: read-only access to bots, logs, analytics.
- billing: view billing/usage/invoices; no bot edits.

Access Rules

- Bot access is inherited from org role; optional per-bot ACL for sensitive bots.
- API keys: scoped to bot; show only partial key to non-owners/admins.
- Webhooks and audit logs: owner/admin.
- Chat logs: hide PII; viewer can read; editor/admin can export.

Implementation

- On every query/mutation/action: resolve orgId via membership by Clerk userId.
- Guard resource by orgId (and optional per-bot ACL).
- Write audit logs for admin actions: billing changes, API key CRUD, source edits.
