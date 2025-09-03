import Link from "next/link";
import { Icon } from "@iconify/react";

const links = [
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
  { href: "#features", label: "Features" },
];

export const Footer = () => {
  return (
    <footer className="w-full border-t border-divider bg-content2">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="text-sm text-default-600">© {new Date().getFullYear()} Acme</div>
          <nav className="flex items-center gap-5">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-default-700 hover:underline">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a aria-label="X" href="#" className="text-default-600 hover:text-foreground">
              <Icon icon="mdi:twitter" className="h-5 w-5" />
            </a>
            <a aria-label="GitHub" href="#" className="text-default-600 hover:text-foreground">
              <Icon icon="mdi:github" className="h-5 w-5" />
            </a>
            <a aria-label="LinkedIn" href="#" className="text-default-600 hover:text-foreground">
              <Icon icon="mdi:linkedin" className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
