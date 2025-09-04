"use client";

import { useMemo, useState } from "react";

const steps = ["Name", "Connect", "Test & Publish"] as const;

export default function NewAgentWizard() {
  const [step, setStep] = useState<typeof steps[number]>("Name");
  const idx = useMemo(() => steps.indexOf(step), [step]);

  return (
    <section className="mx-auto max-w-4xl space-y-4">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold">Welcome! Let’s build your first agent</h1>
        <p className="text-sm text-default-600">Create → Connect → Test/Publish</p>
      </header>

      {/* Stepper */}
      <ol className="flex items-center gap-3 text-xs">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span className={"grid h-6 w-6 place-items-center rounded-full " + (i <= idx ? "bg-primary text-primary-foreground" : "bg-default-200 text-default-600")}>{i + 1}</span>
            <span className={i === idx ? "font-medium" : "text-default-600"}>{s}</span>
            {i < steps.length - 1 && <span className="mx-2 h-px w-8 bg-divider" />}
          </li>
        ))}
      </ol>

      {step === "Name" && <StepName onNext={() => setStep("Connect")} />}
      {step === "Connect" && (
        <StepConnect onNext={() => setStep("Test & Publish")} onBack={() => setStep("Name")} />
      )}
      {step === "Test & Publish" && <StepTest onBack={() => setStep("Connect")} />}
    </section>
  );
}

function StepName({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-4 rounded-xl border border-divider bg-content1 p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Agent name</label>
          <input placeholder="Website Answer Bot" className="rounded-md border border-divider bg-content2 px-3 py-2 text-sm outline-none" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Use case</label>
          <select className="rounded-md border border-divider bg-content2 px-3 py-2 text-sm outline-none">
            <option>Website Q&A</option>
            <option>Docs Assistant</option>
            <option>Customer Support</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end">
        <button onClick={onNext} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Continue</button>
      </div>
    </div>
  );
}

function StepConnect({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const connectTabs = ["Websites", "Files"] as const;
  type ConnectTab = typeof connectTabs[number];
  const [tab, setTab] = useState<ConnectTab>("Websites");
  return (
    <div className="space-y-4 rounded-xl border border-divider bg-content1 p-4">
      <div className="flex items-center gap-2">
        {connectTabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={"rounded-md px-3 py-1.5 text-xs " + (tab === t ? "bg-primary text-primary-foreground" : "border border-divider bg-content2")}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === "Websites" && (
        <div className="space-y-3">
          <label className="text-sm font-medium">Add website URL</label>
          <input placeholder="https://example.com" className="w-full rounded-md border border-divider bg-content2 px-3 py-2 text-sm outline-none" />
          <div className="rounded-lg border border-dashed border-divider p-3 text-xs text-default-600">
            We’ll fetch pages for you.
          </div>
        </div>
      )}
      {tab === "Files" && (
        <div className="space-y-3">
          <label className="text-sm font-medium">Upload files</label>
          <div className="grid place-items-center rounded-lg border border-dashed border-divider p-8 text-sm text-default-600">
            Drag & drop PDFs/Docs
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="rounded-md border border-divider bg-content2 px-4 py-2 text-sm">Back</button>
        <button onClick={onNext} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Add content</button>
      </div>
      <div className="rounded-lg border border-divider bg-content2 p-3 text-xs text-default-600">
        Queue: Fetching → Parsing → Indexing
      </div>
    </div>
  );
}

function StepTest({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-4 rounded-xl border border-divider bg-content1 p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Chat</label>
          <div className="min-h-[220px] rounded-lg border border-divider bg-content2" />
          <p className="text-xs text-default-500">Try: “What’s on the pricing page?”</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Sources</label>
          <div className="min-h-[220px] rounded-lg border border-divider bg-content2" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="rounded-md border border-divider bg-content2 px-4 py-2 text-sm">Finish later</button>
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Publish</button>
      </div>
      <p className="text-xs text-default-500">No code needed. You can add or remove sources anytime. We keep your knowledge fresh automatically.</p>
    </div>
  );
}
