import type { RouteSidebarConfig } from "./dashboard-sidebar";

// Settings route sidebar config (applies to paths starting with /settings)
export const SETTINGS_SIDEBAR_CONFIG: RouteSidebarConfig = {
  // No header; single item only, plus optional back button
  items: [
    {
      key: "settings-general",
      href: "/settings",
      icon: "solar:settings-linear",
      label: "General",
    },
  ],
  backButton: {
    enabled: true,
    href: "/overview",
    label: "Back",
    icon: "solar:alt-arrow-left-linear",
  },
};

export default SETTINGS_SIDEBAR_CONFIG;
