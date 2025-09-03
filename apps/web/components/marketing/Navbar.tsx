"use client";

import { useEffect, useState } from "react";
import { AcmeIcon } from "../shared/Logo";
import { Button } from "@heroui/react";
import Link from "next/link";
import { Authenticated, Unauthenticated } from "convex/react";

const navlinks = [
  {
    href: "#features",
    label: "Features",
  },
  {
    href: "#testimonials",
    label: "Testimonials",
  },
  {
    href: "/pricing",
    label: "Pricing",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md transition-all duration-300 ease-in-out bg-content1/70 ">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-2 transition-all duration-300 ease-in-out py-6">
        <AcmeIcon />

        <nav className="hidden items-center gap-8 md:flex">
          {navlinks.map((link) => (
            <NavbarLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>
        <Authenticated>
          <Button color="primary" radius="md" as={Link} href="/overview">
            Go to App
          </Button>
        </Authenticated>
        <Unauthenticated>
          <Button color="primary" radius="md" as={Link} href="/sign-in">
            Get Started
          </Button>
        </Unauthenticated>
      </div>
    </header>
  );
};

const NavbarLink = ({ href, label }: { href: string; label: string }) => {
  return (
    <Link
      href={href}
      className="text-sm font-medium underline-offset-8 transition-colors duration-200 hover:text-primary hover:underline"
    >
      {label}
    </Link>
  );
};
