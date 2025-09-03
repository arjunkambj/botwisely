import Link from "next/link";

const tiers = [
  {
    name: "Free",
    price: "$0",
    desc: "For trying things out",
    cta: { href: "/sign-in", label: "Get started" },
    features: ["Up to 1 workspace", "Community support", "Basic templates"],
  },
  {
    name: "Pro",
    price: "$29",
    desc: "For growing teams",
    cta: { href: "/sign-in", label: "Start Pro" },
    features: ["Unlimited workspaces", "Priority support", "Advanced features"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For large organizations",
    cta: { href: "/contact", label: "Contact sales" },
    features: ["SLA & SSO", "Custom integrations", "Dedicated support"],
  },
];

export default function PricingPage() {
  return (
    <section className="w-full px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold">Pricing</h1>
          <p className="mt-2 text-default-600">Simple, usage-based pricing that grows with you.</p>
        </header>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((t) => (
            <article key={t.name} className="rounded-2xl border border-divider bg-content1 p-6">
              <h2 className="text-xl font-semibold">{t.name}</h2>
              <div className="mt-1 text-3xl font-bold">{t.price}</div>
              <p className="mt-1 text-sm text-default-600">{t.desc}</p>
              <ul className="mt-4 space-y-2 text-sm text-default-700">
                {t.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <Link
                href={t.cta.href}
                className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                {t.cta.label}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
