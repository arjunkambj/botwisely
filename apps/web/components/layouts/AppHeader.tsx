"use client";

import UserProfile from "../shared/UserProfile";
import { OrgSwitcher } from "./OrgSwitcher";
import { AcmeIcon } from "../shared/Logo";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default function AppHeader() {
  return (
    <header className="w-full border-b border-default-300 bg-content1">
      <div className="flex min-h-12 items-center justify-between gap-3 px-4 py-1">
        {/* Left: brand + workspace */}
        <div className="flex min-w-0 items-center gap-3">
          <div
            aria-label="Brand"
            className="bg-foreground text-background flex h-8 w-8 items-center justify-center rounded-full"
          >
            <AcmeIcon className="text-background" />
          </div>
          <OrgSwitcher />
        </div>

        {/* Center: search */}
        <div className="hidden min-w-0 flex-1 items-center justify-center md:flex">
          <div className="w-full max-w-lg">
            <SearchBar />
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/agent/new"
            className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm"
          >
            New Agent
          </Link>
          <Link href="/docs" className="text-sm text-default-600 hover:text-foreground">
            Help
          </Link>
          <UserProfile />
        </div>
      </div>
    </header>
  );
}
