"use client";

import { useEffect, useMemo, useState } from "react";
import NextLink from "next/link";

type LinkItem = { href: string; label: string };

export const NavLinks = ({ links }: { links: readonly LinkItem[] }) => {
  const [active, setActive] = useState<string>(links[0]?.href ?? "");

  const ids = useMemo(() => links.map((l) => l.href.replace(/^#/, "")), [links]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el instanceof HTMLElement);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target && (visible.target as HTMLElement).id) {
          setActive(`#${(visible.target as HTMLElement).id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return (
    <ul className="flex items-center gap-6">
      {links.map((l) => (
        <li key={l.href}>
          <NextLink
            href={l.href}
            className={
              (active === l.href ? "text-primary" : "text-default-700 hover:text-primary") +
              " text-sm font-medium rounded-md px-1 -mx-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            }
            aria-current={active === l.href ? "page" : undefined}
          >
            {l.label}
          </NextLink>
        </li>
      ))}
    </ul>
  );
};
