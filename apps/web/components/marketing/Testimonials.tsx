// Replace avatars with placeholders; no images used
import { Icon } from "@iconify/react";
import { FadeIn } from "./motion";

const testimonials = [
  {
    name: "Alex Carter",
    role: "CTO, Northwind",
    quote:
      "We shipped our MVP 3x faster. The defaults are thoughtfully designed.",
    rating: 5,
  },
  {
    name: "Priya Shah",
    role: "Product Lead, Acme",
    quote:
      "The best developer experience I've had. Everything just works out of the box.",
    rating: 5,
  },
  {
    name: "Diego Ramos",
    role: "Founder, Aurora",
    quote:
      "Performance is stellar and the UI looks polished from day one.",
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section id="reviews" className="w-full scroll-mt-24 lg:scroll-mt-28 px-4 py-20 md:py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-col gap-2">
          <h2 className="text-3xl font-semibold sm:text-4xl leading-[1.15]">Review Section</h2>
          <p className="max-w-prose text-default-600">
            Hear from builders who moved faster and delivered better product
            experiences.
          </p>
        </header>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <FadeIn key={t.name} delay={idx * 0.08} className="rounded-xl border border-divider bg-content1 p-6">
              <div className="mb-3 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon
                    key={i}
                    icon={i < (t.rating || 0) ? "mdi:star" : "mdi:star-outline"}
                    className={i < (t.rating || 0) ? "h-4 w-4 text-warning-400" : "h-4 w-4 text-default-300"}
                  />
                ))}
              </div>
              <blockquote className="text-sm text-default-700">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-content2 ring-1 ring-divider">
                  <span className="text-[10px] font-medium text-default-500">{t.name.slice(0, 1)}</span>
                </div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-default-500">{t.role}</div>
                </div>
              </figcaption>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
