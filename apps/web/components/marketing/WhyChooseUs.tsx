// Image placeholder only; no external images

const items = [
  {
    title: "Production-grade",
    desc: "Battle-tested patterns for auth, data, and deployments.",
    img: "https://placehold.co/640x400/png?text=Reliable",
  },
  {
    title: "DX your team loves",
    desc: "Opinionated configs, shared UI, and strict TypeScript.",
    img: "https://placehold.co/640x400/png?text=Developer+Experience",
  },
  {
    title: "Performance first",
    desc: "Server-first rendering and carefully optimized client leaves.",
    img: "https://placehold.co/640x400/png?text=Performance",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="w-full px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <h2 className="text-3xl font-semibold sm:text-4xl">Why choose us</h2>
          <p className="mt-2 max-w-prose text-default-600">
            We sweat the details so you can focus on outcomes: clear patterns,
            fast defaults, and delightful product quality.
          </p>
        </header>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <article
              key={it.title}
              className="rounded-xl border border-divider bg-content1 p-4"
            >
              <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-lg bg-content2">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[repeating-linear-gradient(45deg,hsl(var(--heroui-default-200)/.6)_0_10px,transparent_10px_20px)]"
                />
                <div className="relative z-10 grid h-full place-items-center">
                  <span className="text-[10px] text-default-500">Placeholder</span>
                </div>
              </div>
              <h3 className="mb-1 text-lg font-semibold">{it.title}</h3>
              <p className="text-sm text-default-600">{it.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
