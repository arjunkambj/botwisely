import Link from "next/link";
import { Spacer } from "@heroui/react";

export const Hero = () => {
  return (
    <section className="relative  min-h-[90vh] flex w-full flex-col items-center justify-center overflow-hidden px-4 pb-14 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-20 lg:flex-row lg:items-center">
        <MainContent />
        <MockupImage />
      </div>
      <Spacer y={12} />
      <BrandRow />
    </section>
  );
};

const MainContent = () => {
  return (
    <div className="flex w-full flex-col gap-6 lg:w-[50%]">
      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-divider bg-content1/70 px-4 py-2 text-xs font-medium text-default-600 backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-primary" />
        New: Agent Templates and Traces
      </div>
      <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
        Build Smarter with AI Agents
      </h1>
      <p className="max-w-prose text-pretty text-base text-default-600 sm:text-lg">
        Launch production-grade AI workflows in minutes. Design, test, and
        deploy collaborative agents with reliable data access and delightful UX.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/sign-in"
          className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:scale-[1.02]"
        >
          Get started free
        </Link>
        <Link
          href="#features"
          className="inline-flex items-center justify-center rounded-md border border-divider bg-content1 px-5 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-content2"
        >
          Explore features
        </Link>
      </div>
      <ul className="mt-1 flex flex-wrap items-center gap-8 text-xs text-default-500">
        <li>No credit card required</li>
        <li>Cancel anytime</li>
        <li>Open-source friendly</li>
      </ul>
    </div>
  );
};

const MockupImage = () => {
  return (
    <div className="relative w-full lg:flex-1">
      <div className="relative mx-auto aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-xl border border-divider/50 bg-content1">
        {/* placeholder background */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(40rem_20rem_at_70%_-10%,hsl(var(--heroui-default-200)/.7),transparent_60%),repeating-linear-gradient(45deg,hsl(var(--heroui-default-200)/.5)_0_10px,transparent_10px_20px)]"
        />
        <div className="relative z-10 grid h-full place-items-center">
          <span className="text-xs text-default-500">Image placeholder</span>
        </div>
        {/* subtle top highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-background/60 to-transparent" />
      </div>
    </div>
  );
};

const BrandRow = () => {
  const brands = ["OpenAI", "Vercel", "Convex", "Clerk", "HeroUI"] as const;
  return (
    <div className="mx-auto mt-14 w-full max-w-6xl">
      <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-default-500">
        Trusted by modern teams
      </p>
      <div className="grid grid-cols-2 items-center gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {brands.map((name) => (
          <div
            key={name}
            className="flex items-center justify-center rounded-md border border-dashed border-divider bg-content2 px-3 py-6 text-sm text-default-500"
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};
