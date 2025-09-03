import type { RouteSidebarConfig } from "./dashboard-sidebar";

// Agent route sidebar config (applies to paths starting with /agent/)
// Uses dynamic :id placeholders which are replaced based on the current pathname.
export const AGENT_SIDEBAR_CONFIG: RouteSidebarConfig = {
  // Keep hybrid top-level navigation consistent with dashboard
  headerItems: [
    {
      key: "overview",
      href: "/overview",
      icon: "hugeicons:home-01",
      label: "Overview",
    },
    {
      key: "agents",
      href: "/agents",
      icon: "solar:robot-linear",
      label: "Agents",
    },
  ],
  // Provide a subtle back affordance near the logo
  backButton: {
    enabled: true,
    href: "/agents",
    label: "Back to Agents",
    icon: "solar:alt-arrow-left-linear",
  },
  // Simple flat list for now; extend as subroutes are added
  items: [
    {
      key: "agent-overview",
      href: "/agent/:id",
      icon: "solar:home-2-linear",
      label: "Agent Overview",
    },
  ],
  footerItems: [
    {
      key: "team",
      href: "/settings/team",
      icon: "solar:team-linear",
      label: "Teams & Orgs",
    },
    {
      key: "settings",
      href: "/settings",
      icon: "solar:settings-linear",
      label: "Settings",
    },
  ],
};
