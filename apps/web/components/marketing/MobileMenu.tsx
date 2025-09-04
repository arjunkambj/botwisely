"use client";

import NextLink from "next/link";
import { useState } from "react";
import { Icon } from "@iconify/react";

type LinkItem = { href: string; label: string };

export const MobileMenu = ({
  links,
  cta,
}: {
  links: readonly LinkItem[];
  cta: { href: string; label: string };
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        aria-label="Menu"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-divider bg-content2 text-foreground shadow-sm"
      >
        <Icon icon="mdi:menu" className="h-5 w-5" />
      </button>
      {open && (
        <div className="fixed inset-0 z-[60] bg-default-900 opacity-30 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div
            className="absolute right-3 top-3 w-[90vw] max-w-sm rounded-xl border border-divider bg-content1 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Menu</span>
              <button
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-content2"
              >
                <Icon icon="mdi:close" className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {links.map((l) => (
                <NextLink
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-1 py-2 text-base hover:text-primary"
                >
                  {l.label}
                </NextLink>
              ))}
            </nav>
            <div className="mt-4">
              <NextLink
                href={cta.href}
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm"
              >
                {cta.label}
              </NextLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
