// Sidebar configuration types
export type SidebarLinkItem = {
  key: string;
  label: string;
  href: string;
  icon?: string;
};

export type SidebarCategory = {
  label: string;
  icon?: string;
  items: SidebarLinkItem[];
  isCategoryOpen?: boolean;
};

export type SidebarBackButton = {
  enabled: boolean;
  href?: string;
  label?: string;
  icon?: string;
};

export type RouteSidebarConfig = {
  headerItems?: SidebarLinkItem[];
  headerItem?: SidebarLinkItem;
  categories?: SidebarCategory[];
  items?: SidebarLinkItem[];
  footerItems?: SidebarLinkItem[];
  backButton?: SidebarBackButton; // optional Back to Home
};

export type RouteSidebarConfigMap = {
  default: RouteSidebarConfig;
  [routePrefix: string]: RouteSidebarConfig; // keys like "/agents", "/settings"
};

// Default config used when no specific route-prefix match is found
const DEFAULT_CONFIG: RouteSidebarConfig = {
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

  footerItems: [
    {
      key: "team",
      href: "/team",
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
  backButton: { enabled: false },
};

// Exported config map
import { AGENT_SIDEBAR_CONFIG } from "./agent-sidebar";
import { SETTINGS_SIDEBAR_CONFIG } from "./settings-sidebar";

export const SIDEBAR_CONFIGS: RouteSidebarConfigMap = {
  default: DEFAULT_CONFIG,
  "/agent/": AGENT_SIDEBAR_CONFIG,
  "/settings": SETTINGS_SIDEBAR_CONFIG,
};

// Helper to get config for a given pathname with longest-prefix match
export function getSidebarConfigForPath(pathname: string): RouteSidebarConfig {
  const entries = Object.entries(SIDEBAR_CONFIGS).filter(
    ([key]) => key !== "default"
  );
  const match = entries
    .filter(([prefix]) => pathname.startsWith(prefix))
    .sort((a, b) => b[0].length - a[0].length)[0];

  const baseConfig = match ? match[1] : SIDEBAR_CONFIGS.default;

  // Apply dynamic placeholders like :id for agent routes
  const applyDynamicHrefs = (config: RouteSidebarConfig): RouteSidebarConfig => {
    const clone = (obj: any) => (obj ? JSON.parse(JSON.stringify(obj)) : obj);
    const c = clone(config) as RouteSidebarConfig;

    const replaceId = (href?: string) => {
      if (!href) return href;
      if (!pathname.startsWith("/agent/")) return href;
      const parts = pathname.split("/");
      const id = parts[2];
      if (!id) return href;
      return href.replace(":id", id);
    };

    c.headerItems = (c.headerItems || []).map((i) => ({ ...i, href: replaceId(i.href) || i.href }));
    if (c.headerItem) c.headerItem = { ...c.headerItem, href: replaceId(c.headerItem.href) || c.headerItem.href };
    c.items = (c.items || []).map((i) => ({ ...i, href: replaceId(i.href) || i.href }));
    c.categories = (c.categories || []).map((cat) => ({
      ...cat,
      items: cat.items.map((i) => ({ ...i, href: replaceId(i.href) || i.href })),
    }));
    c.footerItems = (c.footerItems || []).map((i) => ({ ...i, href: replaceId(i.href) || i.href }));
    if (c.backButton) c.backButton = { ...c.backButton, href: replaceId(c.backButton.href) };
    return c;
  };

  return applyDynamicHrefs(baseConfig);
}

// Legacy exports for backward compatibility (kept but not used by new components)
export const DASHBOARD_SIDEBAR_ITEMS = DEFAULT_CONFIG.categories?.map((c) => ({
  label: c.label,
  items: c.items.map((i) => ({
    key: i.key,
    href: i.href,
    icon: i.icon,
    activeIcon: i.icon,
    label: i.label,
  })),
}));

export const DASHBOARD_FOOTER_ITEMS = DEFAULT_CONFIG.footerItems ?? [];

export const sectionItems = DASHBOARD_SIDEBAR_ITEMS;
export const footerItems = DASHBOARD_FOOTER_ITEMS;
export const dashboardSidebar = {
  sectionItems: DASHBOARD_SIDEBAR_ITEMS,
  footerItems: DASHBOARD_FOOTER_ITEMS,
};
