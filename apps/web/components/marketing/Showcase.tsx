// Layout-focused showcase section with placeholder blocks (no images)

import { FadeIn } from "./motion";

export const Showcase = () => {
  return (
    <section id="features" className="w-full scroll-mt-24 lg:scroll-mt-28 px-4 py-20 md:py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-col gap-2">
          <span className="w-fit rounded-full border border-divider bg-content2 px-3 py-1 text-xs font-medium text-default-600">
            Features
          </span>
          <h2 className="text-3xl font-semibold sm:text-4xl leading-[1.15]">Features Section</h2>
          <p className="max-w-prose text-default-600">Structured with placeholders for imagery.</p>
        </header>

        {/* Row 1: one long highlight card */}
        <FadeIn className="mb-6 rounded-2xl border border-divider bg-content1 p-6">
          <div className="mb-2 h-3 w-28 rounded bg-default-200" />
          <div className="mb-3 h-6 w-64 rounded bg-default-200" />
          <div className="h-40 rounded-xl bg-content2 ring-1 ring-divider" />
        </FadeIn>

        {/* Row 2: three cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <FadeIn key={i} delay={i * 0.08} className="rounded-2xl border border-divider bg-content1 p-5">
              <div className="mb-3 h-5 w-40 rounded bg-default-200" />
              <div className="h-24 rounded-lg bg-content2 ring-1 ring-divider" />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
