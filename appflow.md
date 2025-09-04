1. First‑run flow (after sign‑up)

Goal: user creates a working agent in ≤3 minutes.

Screen 1 — Welcome / Create your first agent

Title: “Welcome! Let’s build your first agent”

Two big CTAs:

Create Agent (primary)

Explore Demo (secondary; opens a demo agent with sample data)

Screen 2 — Create Agent (stepper)

Name & Purpose

Fields: Agent name (placeholder: “Website Answer Bot”), Use case (dropdown: “Website Q&A”, “Docs Assistant”, “Customer Support”).

Primary: Continue

Connect Knowledge

Tabs: Websites (via Exa), Files

Websites: input “Add website URL”, hint “We’ll fetch pages for you”.

Files: drag‑and‑drop PDFs/Docs.

Primary: Add content → shows queued items with status (Fetching → Parsing → Indexing).

Test & Publish

Left: chat box with “Try: ‘What’s on pricing page?’”

Right: Sources list with “Last updated”, “Refresh”.

Primary: Publish (opens Share/Embed)

Secondary: Finish later

Empty state promises (always visible small text):

“No code needed. You can add or remove sources anytime.”

“We keep your knowledge fresh automatically.”

2. Global layout (what the user sees generally)

Header (top)

Left: Workspace switcher

Center: Search (placeholder: “Search agents & knowledge…”)

Right: New Agent (primary), Help (docs/FAQ), Account

Global Sidebar (simple, non‑technical names)

Home — recent activity, quick starts, “Create Agent”

Agents — list of agents (cards), “+ New Agent”

Knowledge — all connected data across agents

Subitems: Websites, Files

Analytics — usage, answer quality, feedback

Deploy — share links, embed widget, API key

Settings — workspace profile, team, billing

Tip: Keep 5–7 items max. Put advanced stuff (API keys, billing) inside Settings to avoid cognitive overload.

3. Agent workspace (when an agent is selected)

Header (sticky)

Agent name + status dot (“Ready” / “Indexing”)

Ask (primary) → jumps to chat

Actions: Publish, Refresh data

Agent Sidebar (tabs for this agent)

Overview

What: quick health (sources, last crawl, tokens used), top questions, quick actions.

Buttons: Connect data, Ask, Publish

Chat

Test the agent; shows citations & sources.

Knowledge

Sections: Websites (Exa) and Files

Each row: title, status, last updated, Refresh, Remove

Button: Add website / Upload files

Behavior

Simple fields: Tone (Professional/Friendly), Answer length (Short/Medium/Long), Sensitive topics (Off/On).

Advanced (collapse): System prompt textarea.

Tools

Toggles: Use Web Search (Exa) [On/Off]

(Future) Other tools list with simple names and short help text.

Deploy

Share link (copy)

Embed widget → code snippet shown

API access → show key prefix & usage note

Analytics

Simple charts: sessions, helpful vs unhelpful, top unanswered questions

Table: recent conversations with feedback

Settings (per‑agent)

Name, visibility (Private/Workspace/Public), delete agent

Keep it calm: 6–8 tabs max. Use plain language; hide jargon like “vector”, “embedding”.

4. Microcopy & empty‑states (ready to paste)

Agents (empty):
“No agents yet. Create one to answer questions from your website or files.”
Button: Create Agent

Knowledge > Websites (empty):
“Add a website. We’ll fetch pages and keep them fresh.”
Field: example.com | Button: Add website

Chat (empty):
“Ask something your customers would ask. Try: ‘What’s on the pricing page?’”

Indexing status:
“Fetching pages… Parsing… Indexing… Ready”

Error (source):
“We couldn’t read this page. Try again or contact support.”

5. Naming & defaults (non‑coder friendly)

“Agent” (not “bot” or “project”).

“Knowledge” (not “RAG”, “datasets”).

“Behavior” (not “prompt engineering”).

“Publish” (not “deploy to prod”).

Default chunking & models are hidden; show a single Quality slider (Fast ↔ Accurate) if needed.

6. Minimal flows to test end‑to‑end

Create → Connect website → Test → Publish

Add file → See it index → Ask → See citations

Refresh website → See ‘Last updated’ change

Share link → Try from incognito

Embed snippet → Paste into a dummy site

7. Accessibility & guardrails (quick checklist)

Buttons have verb labels (“Create Agent”, “Add website”, “Publish”).

One primary action per page.

Progress states for long tasks (with cancel).

Keyboard focus, readable contrast, ARIA for status updates.

Empty states explain the next step with a single CTA.

TL;DR for the team

After sign‑up: show a 3‑step wizard: Name → Connect → Test/Publish.

Global sidebar: Home, Agents, Knowledge, Analytics, Deploy, Settings.

Inside an agent: Overview, Chat, Knowledge, Behavior, Tools, Deploy, Analytics, Settings.

Language: plain, non‑technical; one clear action per screen; helpful empty states.
