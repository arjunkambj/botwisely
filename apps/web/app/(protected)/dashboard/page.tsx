import Link from "next/link";

export default function DashboardPage() {
  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Home</h1>
        <Link
          href="/agent/new"
          className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm"
        >
          Create Agent
        </Link>
      </header>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-divider bg-content1 p-4 min-h-[140px]">
          <h2 className="text-sm font-medium">Quick start</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-default-600">
            <li>Name your agent</li>
            <li>Connect a website or files</li>
            <li>Test and publish</li>
          </ul>
        </article>
        <article className="rounded-xl border border-divider bg-content1 p-4 min-h-[140px]">
          <h2 className="text-sm font-medium">Recent activity</h2>
          <p className="mt-2 text-sm text-default-600">No activity yet.</p>
        </article>
      </div>
    </section>
  );
}
