"use client";

import Link from "next/link";
import { useState } from "react";

const tabs = [
  "Overview",
  "Chat",
  "Knowledge",
  "Behavior",
  "Tools",
  "Deploy",
  "Analytics",
  "Settings",
] as const;

export default function AgentPage() {
  const [active, setActive] = useState<(typeof tabs)[number]>("Overview");

  return (
    <div className="flex h-full flex-col">
      {/* Agent header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-success" aria-hidden />
          <h1 className="text-lg font-semibold">Agent name</h1>
          <span className="text-xs text-default-500">Ready</span>
        </div>
        <div className="flex items-center gap-2">
          <Link href="#" className="rounded-md border border-divider bg-content2 px-3 py-1.5 text-xs font-medium">
            Refresh data
          </Link>
          <Link href="#" className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
            Publish
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActive(t)}
            className={
              "rounded-md px-3 py-1.5 text-xs transition-colors " +
              (active === t
                ? "bg-primary text-primary-foreground"
                : "border border-divider bg-content2 text-default-700 hover:bg-content3")
            }
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto rounded-xl border border-divider bg-content1 p-4">
        {active === "Overview" && (
          <div className="space-y-4">
            <h2 className="text-sm font-medium">Overview</h2>
            <p className="text-sm text-default-600">Health, sources, quick actions.</p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="min-h-[100px] rounded-lg border border-divider bg-content2" />
              <div className="min-h-[100px] rounded-lg border border-divider bg-content2" />
              <div className="min-h-[100px] rounded-lg border border-divider bg-content2" />
            </div>
          </div>
        )}
        {active === "Chat" && (
          <div className="space-y-2">
            <h2 className="text-sm font-medium">Chat</h2>
            <div className="min-h-[220px] rounded-lg border border-divider bg-content2" />
            <p className="text-xs text-default-500">Try: “What’s on the pricing page?”</p>
          </div>
        )}
        {active === "Knowledge" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium">Knowledge</h2>
              <div className="flex gap-2">
                <button className="rounded-md border border-divider bg-content2 px-3 py-1.5 text-xs">Add website</button>
                <button className="rounded-md border border-divider bg-content2 px-3 py-1.5 text-xs">Upload files</button>
              </div>
            </div>
            <div className="min-h-[180px] rounded-lg border border-divider bg-content2" />
          </div>
        )}
        {active === "Behavior" && (
          <div className="space-y-3">
            <h2 className="text-sm font-medium">Behavior</h2>
            <div className="min-h-[160px] rounded-lg border border-divider bg-content2" />
          </div>
        )}
        {active === "Tools" && (
          <div className="space-y-3">
            <h2 className="text-sm font-medium">Tools</h2>
            <div className="min-h-[160px] rounded-lg border border-divider bg-content2" />
          </div>
        )}
        {active === "Deploy" && (
          <div className="space-y-3">
            <h2 className="text-sm font-medium">Deploy</h2>
            <div className="min-h-[160px] rounded-lg border border-divider bg-content2" />
          </div>
        )}
        {active === "Analytics" && (
          <div className="space-y-3">
            <h2 className="text-sm font-medium">Analytics</h2>
            <div className="min-h-[160px] rounded-lg border border-divider bg-content2" />
          </div>
        )}
        {active === "Settings" && (
          <div className="space-y-3">
            <h2 className="text-sm font-medium">Settings</h2>
            <div className="min-h-[160px] rounded-lg border border-divider bg-content2" />
          </div>
        )}
      </div>
    </div>
  );
}
