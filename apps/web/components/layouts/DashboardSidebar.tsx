"use client";

import type { SidebarItem } from "./SidebarContent";
import { SidebarItemType } from "./SidebarContent";

import React from "react";
import { Button, ScrollShadow } from "@heroui/react";
import { Icon } from "@iconify/react";

import Sidebar from "./SidebarContent";

// brand moved to the AppHeader

const sidebarItems: SidebarItem[] = [
  {
    key: "home",
    title: "Home",
    items: [
      {
        key: "Home",
        href: "/dashboard",
        icon: "solar:home-2-linear",
        title: "Home",
      },
      {
        key: "Agents",
        href: "/dashboard/agents",
        icon: "solar:users-group-two-rounded-outline",
        title: "Agents",
      },
      {
        key: "Knowledge",
        href: "/dashboard/knowledge",
        icon: "solar:book-outline",
        title: "Knowledge",
        type: SidebarItemType.Nest,
        items: [
          { key: "Websites", href: "/dashboard/knowledge/websites", title: "Websites" },
          { key: "Files", href: "/dashboard/knowledge/files", title: "Files" },
        ],
      },
      {
        key: "Analytics",
        href: "/dashboard/analytics",
        icon: "solar:chart-outline",
        title: "Analytics",
      },
      {
        key: "Deploy",
        href: "/dashboard/deploy",
        icon: "solar:widget-2-outline",
        title: "Deploy",
      },
      {
        key: "Settings",
        href: "/dashboard/settings",
        icon: "solar:settings-outline",
        title: "Settings",
      },
    ],
  },
];

// (sample workspace/user data removed; not used here)

/**
 * 💡 TIP: You can use the usePathname hook from Next.js App Router to get the current pathname
 * and use it as the active key for the Sidebar component.
 *
 * ```tsx
 * import {usePathname} from "next/navigation";
 *
 * const pathname = usePathname();
 * const currentPath = pathname.split("/")?.[1]
 *
 * <Sidebar defaultSelectedKey="home" selectedKeys={[currentPath]} />
 * ```
 */
export default function DashboardSidebar() {
  return (
    <div className="h-full min-h-192 min-w-65 border-r border-default-200 bg-content1 w-full">
      <div className="relative flex h-full w-full flex-1 flex-col px-4 py-2">
        <ScrollShadow className="-mr-4 h-full max-h-full py-4 pr-4">
          <Sidebar
            defaultSelectedKey="Playground"
            iconClassName="text-default-600 group-data-[selected=true]:text-primary-foreground"
            itemClasses={{
              base:
                "data-[selected=true]:bg-primary-400 dark:data-[selected=true]:bg-primary-300 data-[hover=true]:bg-default-200",
              title:
                "text-default-600 group-data-[selected=true]:text-primary-foreground",
            }}
            sectionClasses={{
              base: "px-1",
              heading:
                "px-2 py-1 text-tiny uppercase tracking-wide text-default-400",
              group: "gap-1",
            }}
            items={sidebarItems}
          />
        </ScrollShadow>

        <Button className="mt-auto w-full" variant="flat" color="default">
          <Icon icon="solar:settings-linear" width={22} />
          Settings
        </Button>
      </div>
    </div>
  );
}
