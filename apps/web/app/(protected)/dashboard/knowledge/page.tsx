import Link from "next/link";

export default function KnowledgePage() {
  return (
    <section className="space-y-2">
      <h1 className="text-xl font-semibold">Knowledge</h1>
      <p className="text-sm text-default-600">Websites and Files connected across agents.</p>
      <div className="flex gap-2 text-sm">
        <Link className="underline" href="/dashboard/knowledge/websites">Websites</Link>
        <span className="text-default-400">/</span>
        <Link className="underline" href="/dashboard/knowledge/files">Files</Link>
      </div>
      <div className="min-h-[200px] rounded-xl border border-divider bg-content1" />
    </section>
  );
}

