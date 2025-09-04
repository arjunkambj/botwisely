// No external images; placeholders only

const items = [
  {
    title: "Production-grade",
    desc: "Battle-tested patterns for auth, data, and deployments.",
    color: "",
  },
  {
    title: "DX your team loves",
    desc: "Opinionated configs, shared UI, and strict TypeScript.",
    color: "",
  },
  {
    title: "Performance first",
    desc: "Server-first rendering and carefully optimized client leaves.",
    color: "",
  },
  {
    title: "Secure by default",
    desc: "Clerk-backed auth and per-tenant isolation patterns.",
    color: "",
  },
];

import { FadeIn } from "./motion";

export const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="w-full scroll-mt-24 lg:scroll-mt-28 px-4 py-20 md:py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <h2 className="text-3xl font-semibold sm:text-4xl leading-[1.15]">Why choose us</h2>
          <p className="mt-2 max-w-prose text-default-600">
            We sweat the details so you can focus on outcomes: clear patterns,
            fast defaults, and delightful product quality.
          </p>
        </header>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, idx) => (
            <FadeIn key={it.title} delay={idx * 0.08} className="rounded-xl border border-divider bg-content1 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-default-100 ring-1 ring-divider">
                  <span className="text-default-600">?</span>
                </div>
                <h3 className="text-lg font-semibold">{it.title}</h3>
              </div>
              <div className="h-3 w-24 rounded bg-default-200" />
              <p className="mt-2 text-sm text-default-600">{it.desc}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
