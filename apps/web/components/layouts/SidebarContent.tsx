"use client";

import { Button } from "@heroui/button";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { cn } from "@heroui/theme";
import { Icon } from "@iconify/react";
import { useAtom } from "jotai";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Logo } from "@/components/shared/Logo";
import { getSidebarConfigForPath } from "@/constants/dashboard-sidebar";
import { sidebarOpenAtom } from "../../store/atoms";
import { FooterItems } from "./FooterItems";
import SidebarMenu from "./SidebarMenu";

interface SidebarContentProps {
  onClose: () => void;
}

const SidebarContent = React.memo(({ onClose }: SidebarContentProps) => {
  const [isOpen] = useAtom(sidebarOpenAtom);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const pathname = usePathname();

  const containerClasses = useMemo(
    () =>
      `relative flex h-full max-w-[280px] flex-1 flex-col bg-content2 transition-all duration-300 ease-in-out ${
        // Use open=true before mount to avoid SSR/CSR mismatch
        mounted && isOpen
          ? "w-[280px] p-6 opacity-100 overflow-hidden"
          : "w-0 p-0 opacity-0 overflow-hidden"
      }`,
    [isOpen, mounted]
  );

  const scrollShadowClasses = useMemo(
    () =>
      `h-full max-h-full transition-all duration-300 ${
        (mounted && isOpen) ? "-mr-6 pr-6 opacity-100" : "opacity-0"
      }`,
    [isOpen, mounted]
  );

  const handleCloseClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const logoSection = useMemo(() => {
    const { backButton } = getSidebarConfigForPath(pathname);
    return (
      <div className="flex items-center justify-between px-3 py-2 relative">
        <div className="flex items-center gap-2">
          <Logo />
          {backButton?.enabled && (
            <Link
              aria-label={backButton.label || "Back"}
              className={cn(
                "hidden sm:inline-flex items-center gap-2 text-xs px-2 py-1 rounded-md",
                "text-default-600 hover:text-default-900 hover:bg-default-200"
              )}
              href={backButton.href || "/"}
              prefetch={true}
            >
              <Icon aria-hidden icon={backButton.icon || "solar:alt-arrow-left-linear"} width={16} />
              <span>{backButton.label || "Back"}</span>
            </Link>
          )}
        </div>
        {/* Close button - only visible on mobile */}
        <Button
          isIconOnly
          aria-label="Close sidebar"
          className="sm:hidden absolute right-2 top-2"
          size="sm"
          variant="light"
          onPress={handleCloseClick}
        >
          <Icon icon="solar:close-circle-bold" width={20} />
        </Button>
      </div>
    );
  }, [handleCloseClick, pathname]);

  const headerItemsContent = useMemo(() => {
    const config = getSidebarConfigForPath(pathname);
    const items = config.headerItems && config.headerItems.length > 0
      ? config.headerItems
      : (config.headerItem ? [config.headerItem] : []);
    if (!items.length) return null;
    return (
      <div className="flex flex-col gap-2">
        {items.map((headerItem) => {
          const isActive = pathname === headerItem.href;
          return (
            <Link
              key={headerItem.key}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 min-h-9",
                "no-underline w-full",
                isActive
                  ? "bg-primary text-white font-medium shadow-sm"
                  : "text-default-800 hover:text-default-900 hover:bg-default-200"
              )}
              href={headerItem.href}
              prefetch={true}
            >
              {headerItem.icon && (
                <Icon aria-hidden className="shrink-0 transition-colors w-5 h-5" icon={headerItem.icon} />
              )}
              <span className="text-sm font-medium truncate">{headerItem.label}</span>
            </Link>
          );
        })}
      </div>
    );
  }, [pathname]);

  const sidebarMenuContent = useMemo(() => {
    const config = getSidebarConfigForPath(pathname);
    // If categories are provided, render grouped; otherwise, support a flat list of items
    if (config.categories && config.categories.length > 0) {
      return (
        <SidebarMenu
          items={config.categories.map((section) => ({
            key: section.label.toLowerCase().replace(/\s+/g, "-"),
            title: section.label,
            icon: section.icon,
            isCategoryOpen: section.isCategoryOpen !== false,
            items: section.items.map((item) => ({
              key: item.key,
              title: item.label,
              icon: item.icon,
              href: item.href,
            })),
          }))}
        />
      );
    }
    // Flat list fallback
    const flatItems = (config.items || []).map((item) => ({
      key: item.key,
      title: item.label,
      icon: item.icon,
      href: item.href,
    }));
    return <SidebarMenu items={flatItems} />;
  }, [pathname]);

  const footerItemsContent = useMemo(() => {
    const { footerItems } = getSidebarConfigForPath(pathname);
    return <FooterItems items={footerItems} />;
  }, [pathname]);

  return (
    <div className={containerClasses}>
      {/* Logo and Close Button */}
      <div className="mb-6">{logoSection}</div>

      {/* Header Items (e.g., Overview, Agents) */}
      <div className="mb-4">{headerItemsContent}</div>

      {/* Main Navigation */}
      <div className="flex-1 min-h-0">
        <ScrollShadow className={scrollShadowClasses}>
          {sidebarMenuContent}
        </ScrollShadow>
      </div>

      {/* Footer Items */}
      <div className="mt-auto pt-4">{footerItemsContent}</div>
    </div>
  );
});

SidebarContent.displayName = "SidebarContent";

export default SidebarContent;
