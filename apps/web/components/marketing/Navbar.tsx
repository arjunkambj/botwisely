import { AcmeIcon } from "../shared/Logo";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";

const navlinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#why-choose-us", label: "Why Choose Us" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faqs", label: "FAQs" },
] as const;

export const Navbar = async () => {
  const user = await currentUser();
  const ctaHref = user ? "/dashboard" : "/sign-in";
  const ctaLabel = user ? "Go to App" : "Get Started";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-divider bg-background backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-3 py-3 sm:py-4 sm:px-6">
        <Link href="/" aria-label="Home" className="flex items-center gap-2">
          <AcmeIcon />
        </Link>

        <nav className="hidden md:block">
          <NavLinks links={navlinks} />
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user && (
            <span className="text-sm text-default-600">Hi, {user.firstName ?? "there"}</span>
          )}
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-transform duration-200 hover:scale-[1.02]"
          >
            {ctaLabel}
          </Link>
        </div>

        <div className="md:hidden">
          <MobileMenu links={navlinks} cta={{ href: ctaHref, label: ctaLabel }} />
        </div>
      </div>
    </header>
  );
};
