"use client";

import UserProfile from "../shared/UserProfile";
import { OrgSwitcher } from "./OrgSwitcher";
import AgentSwitcher from "./AgentSwitcher";

export default function AppHeader() {
  return (
    <header className="w-full border-b border-default-200">
      <div className="flex h-12 items-center justify-between px-3 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <OrgSwitcher />
          <span className="text-default-300">/</span>
          <AgentSwitcher />
        </div>
        <div className="flex items-center gap-2">
          <UserProfile />
        </div>
      </div>
    </header>
  );
}
