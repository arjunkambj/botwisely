"use client";

import { useState } from "react";

const faqs = [
  { q: "Is there a free plan?", a: "Yes. Get started free with generous limits. Upgrade as you grow." },
  { q: "Can I self-host?", a: "Absolutely. The UI and patterns work great in self-hosted setups." },
  { q: "How do you handle auth?", a: "We use Clerk for authentication with first-class SSR and server actions." },
  { q: "What about my existing data?", a: "Bring your own data sources. We provide hooks and adapters for integration." },
  { q: "How is performance handled?", a: "Server-first rendering, stable handlers, and CLS-safe skeletons by default." },
];

export const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faqs" className="w-full scroll-mt-24 lg:scroll-mt-28 px-4 py-20 md:py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left heading column */}
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl leading-[1.15]">FAQ Section</h2>
            <div className="mt-3 h-1 w-28 rounded bg-default-200" />
            <p className="mt-3 text-default-600">Quick answers to common questions.</p>
          </div>

          {/* Right list column */}
          <div className="lg:col-span-2">
            <ul className="flex flex-col gap-3">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <li key={i} className="overflow-hidden rounded-xl border border-divider bg-content1">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid h-6 w-6 place-items-center rounded-md bg-content2 text-default-600">+</span>
                        <span className="text-sm font-medium">{f.q}</span>
                      </div>
                      <span className="text-default-400">{isOpen ? "–" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="px-12 pb-4 text-sm text-default-600">{f.a}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
