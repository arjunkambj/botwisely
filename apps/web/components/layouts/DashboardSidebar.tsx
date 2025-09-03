"use client";

import type { SidebarItem } from "./SidebarContent";

import React from "react";
import {
  User,
  Badge,
  Avatar,
  Chip,
  Button,
  ScrollShadow,
  Card,
  CardBody,
  CardFooter,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Input,
  Spacer,
  SelectSection,
} from "@heroui/react";
import { Icon } from "@iconify/react";

import Sidebar from "./SidebarContent";

import { AcmeIcon } from "../shared/Logo";

const sidebarItems: SidebarItem[] = [
  {
    key: "home",
    href: "#",
    icon: "solar:home-2-linear",
    title: "Home",
  },
  {
    key: "projects",
    href: "#",
    icon: "solar:widget-2-outline",
    title: "Projects",
    endContent: (
      <Icon
        className="text-default-400"
        icon="solar:add-circle-line-duotone"
        width={24}
      />
    ),
  },
  {
    key: "tasks",
    href: "#",
    icon: "solar:checklist-minimalistic-outline",
    title: "Tasks",
    endContent: (
      <Icon
        className="text-default-400"
        icon="solar:add-circle-line-duotone"
        width={24}
      />
    ),
  },
  {
    key: "team",
    href: "#",
    icon: "solar:users-group-two-rounded-outline",
    title: "Team",
  },
  {
    key: "tracker",
    href: "#",
    icon: "solar:sort-by-time-linear",
    title: "Tracker",
    endContent: (
      <Chip size="sm" variant="flat">
        New
      </Chip>
    ),
  },
  {
    key: "analytics",
    href: "#",
    icon: "solar:chart-outline",
    title: "Analytics",
  },
  {
    key: "perks",
    href: "#",
    icon: "solar:gift-linear",
    title: "Perks",
    endContent: (
      <Chip size="sm" variant="flat">
        3
      </Chip>
    ),
  },
  {
    key: "expenses",
    href: "#",
    icon: "solar:bill-list-outline",
    title: "Expenses",
  },
  {
    key: "settings",
    href: "#",
    icon: "solar:settings-outline",
    title: "Settings",
  },
];

const workspaces = [
  {
    value: "0",
    label: "Acme Inc.",
    items: [
      {
        value: "1",
        label: "Core workspace",
      },
      {
        value: "2",
        label: "Design workspace",
      },
      {
        value: "3",
        label: "Dev. workspace",
      },
      {
        value: "4",
        label: "Marketing workspace",
      },
    ],
  },
];

const users = [
  {
    id: 1,
    name: "Kate Moore",
    role: "Customer Support",
    team: "Customer Support",
    avatar:
      "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatars/e1b8ec120710c09589a12c0004f85825.jpg",
    email: "kate.moore@example.com",
  },
  {
    id: 2,
    name: "John Doe",
    role: "Product Designer",
    team: "Design",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026708c",
    email: "john.doe@example.com",
  },
  {
    id: 3,
    name: "Jane Doe",
    role: "Product Manager",
    team: "Product",
    avatar: "https://i.pravatar.cc/150?u=a04258114e22026708c",
    email: "jane.doe@example.com",
  },
];

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
export default function Component() {
  return (
    <div className="h-full min-h-192">
      <div className="relative flex h-full w-72 flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-2">
            <div className="bg-foreground flex h-8 w-8 items-center justify-center rounded-full">
              <AcmeIcon className="text-background" />
            </div>
            <span className="text-small font-bold uppercase">Acme</span>
          </div>
        </div>

        <ScrollShadow className="-mr-6 h-full max-h-full py-6 pr-6">
          <Sidebar
            defaultSelectedKey="home"
            iconClassName="group-data-[selected=true]:text-primary-foreground"
            itemClasses={{
              base: "data-[selected=true]:bg-primary-400 dark:data-[selected=true]:bg-primary-300 data-[hover=true]:bg-default-300/20 dark:data-[hover=true]:bg-default-200/40",
              title: "group-data-[selected=true]:text-primary-foreground",
            }}
            items={sidebarItems}
          />
        </ScrollShadow>

        <Button>
          <Icon icon="solar:settings-linear" width={22} />
          Settings
        </Button>
      </div>
    </div>
  );
}
