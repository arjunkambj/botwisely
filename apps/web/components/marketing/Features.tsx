import { Icon } from "@iconify/react";

const features = [
  {
    icon: "solar:bolt-linear",
    title: "Fast setup",
    desc: "Start from templates and ship in minutes, not weeks.",
  },
  {
    icon: "solar:shield-check-linear",
    title: "Secure by design",
    desc: "Auth with Clerk, data with Convex, and least-privilege.",
  },
  {
    icon: "solar:gallery-linear",
    title: "Beautiful UI",
    desc: "HeroUI + Tailwind theme with consistent elevation and tokens.",
  },
  {
    icon: "solar:route-linear",
    title: "App Router native",
    desc: "Server-first with client leaves for optimal performance.",
  },
  {
    icon: "solar:cpu-bolt-linear",
    title: "Agent workflows",
    desc: "Composable tools, retries, and tracing for reliable agents.",
  },
  {
    icon: "solar:chart-2-linear",
    title: "Analytics-ready",
    desc: "Vercel Analytics and hooks for measuring core web vitals.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="w-full px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-col items-start gap-2">
          <span className="rounded-full border border-divider bg-content2 px-3 py-1 text-xs font-medium text-default-600">
            Product
          </span>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Features that matter
          </h2>
          <p className="max-w-prose text-default-600">
            Everything you need to design, ship, and scale modern AI products
            with great performance and accessibility.
          </p>
        </header>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="group rounded-xl border border-divider bg-content1 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-default-100 ring-1 ring-divider group-hover:bg-default-200">
                <Icon icon={f.icon} className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-1 text-lg font-semibold">{f.title}</h3>
              <p className="text-sm text-default-600">{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
