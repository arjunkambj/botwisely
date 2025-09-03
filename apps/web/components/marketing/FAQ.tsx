"use client";

import { Accordion, AccordionItem, Card } from "@heroui/react";

const faqs = [
  {
    q: "Is there a free plan?",
    a: "Yes. Get started free with generous limits. Upgrade as you grow.",
  },
  {
    q: "Can I self-host?",
    a: "Absolutely. The UI and patterns work great in self-hosted setups.",
  },
  {
    q: "How do you handle auth?",
    a: "We use Clerk for authentication with first-class SSR and server actions.",
  },
  {
    q: "What about my existing data?",
    a: "Bring your own data sources. We provide hooks and adapters for integration.",
  },
  {
    q: "How is performance handled?",
    a: "Server-first rendering, stable handlers, and CLS-safe skeletons by default.",
  },
];

export const FAQ = () => {
  return (
    <section className="w-full px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">FAQs</h2>
          <p className="mt-2 text-default-600">
            Quick answers to common questions.
          </p>
        </header>
        <Card className="p-2">
          <Accordion selectionMode="multiple" className="bg-transparent">
            {faqs.map((f, idx) => (
              <AccordionItem key={idx} aria-label={f.q} title={f.q}>
                <p className="text-sm text-default-700">{f.a}</p>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </section>
  );
};
