// Sample dashboard sidebar config matching navigation.md
// Copy parts into apps/web/constants/dashboard-sidebar.ts as pages become available.

export const DASHBOARD_SIDEBAR_ITEMS = [
  {
    label: "Chatbots",
    items: [
      { key: "chatbots", href: "/chatbots", icon: "solar:chat-round-linear", activeIcon: "solar:chat-round-bold", label: "All Chatbots" },
      { key: "create-bot", href: "/chatbots/new", icon: "solar:add-square-linear", activeIcon: "solar:add-square-bold", label: "Create" },
    ],
  },
  {
    label: "Analytics",
    items: [
      { key: "usage", href: "/usage", icon: "solar:graph-new-linear", activeIcon: "solar:graph-new-bold", label: "Usage" },
    ],
  },
];

export const DASHBOARD_FOOTER_ITEMS = [
  { key: "orgs", href: "/orgs", icon: "solar:team-linear", activeIcon: "solar:team-bold", label: "Teams & Orgs" },
  { key: "integrations", href: "/integrations", icon: "hugeicons:connect", activeIcon: "hugeicons:connect", label: "Integrations" },
  { key: "settings", href: "/settings", icon: "solar:settings-linear", activeIcon: "solar:settings-bold", label: "Settings" },
];

// Bot subnav (render when route matches /bots/[botId])
export const BOT_SUBNAV = [
  { key: "overview", href: (id: string) => `/bots/${id}`, label: "Overview", icon: "hugeicons:home-01" },
  { key: "playground", href: (id: string) => `/bots/${id}/playground`, label: "Playground", icon: "solar:robot-linear" },
  { key: "sources", href: (id: string) => `/bots/${id}/sources`, label: "Sources", icon: "solar:folder-with-files-linear" },
  { key: "knowledge", href: (id: string) => `/bots/${id}/knowledge`, label: "Knowledge", icon: "solar:database-linear" },
  { key: "analytics", href: (id: string) => `/bots/${id}/analytics/chats`, label: "Analytics", icon: "solar:graph-new-linear" },
  { key: "activity", href: (id: string) => `/bots/${id}/activity/chat-logs`, label: "Activity", icon: "solar:clock-circle-linear" },
  { key: "connect", href: (id: string) => `/bots/${id}/connect`, label: "Connect", icon: "solar:widget-5-linear" },
  { key: "settings", href: (id: string) => `/bots/${id}/settings`, label: "Settings", icon: "solar:settings-linear" },
];
