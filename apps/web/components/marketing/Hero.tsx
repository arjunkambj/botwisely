import NextLink from "next/link";
// tailwind only; no UI library imports
import { FadeIn } from "./motion";

export const Hero = () => {
  return (
    <section className="relative  min-h-[90vh] flex w-full flex-col items-center justify-center overflow-hidden px-4 pb-14 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-20 lg:flex-row lg:items-center">
        <MainContent />
        <MockupImage />
      </div>
      <div className="h-12" />
      <BrandRow />
    </section>
  );
};

const MainContent = () => {
  return (
    <div className="flex w-full flex-col gap-6 lg:w-[50%]">
      {/* Achievement badges row */}
      <FadeIn className="flex w-fit flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-divider bg-content1 px-3 py-1 text-xs font-medium text-default-600">
          Achievement
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-divider bg-content1 px-3 py-1 text-xs font-medium text-default-600">
          Rated No.1 App of 2025 →
        </span>
      </FadeIn>
      <FadeIn>
        <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
        Build Smarter with AI Agents
        </h1>
      </FadeIn>
      <FadeIn>
        <p className="max-w-prose text-pretty text-base text-default-600 sm:text-lg">
          Launch production-grade AI workflows in minutes. Design, test, and
          deploy collaborative agents with reliable data access and delightful UX.
        </p>
      </FadeIn>
      <FadeIn className="flex flex-wrap items-center gap-3">
        <NextLink
          href="/sign-in"
          className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:scale-[1.02]"
        >
          Download App
        </NextLink>
        <NextLink
          href="#features"
          className="inline-flex items-center justify-center rounded-md border border-divider bg-content1 px-5 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-content2"
        >
          Download App
        </NextLink>
      </FadeIn>
      {/* Download stat row */}
      <FadeIn className="mt-1 flex items-center gap-3 text-xs text-default-500">
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-default-300" />
          <span className="h-2 w-2 rounded-full bg-default-300" />
          <span className="h-2 w-2 rounded-full bg-default-300" />
        </div>
        <span>200K+ Downloads</span>
      </FadeIn>
    </div>
  );
};

const MockupImage = () => {
  return (
    <div className="relative w-full lg:flex-1">
      <div className="relative mx-auto aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-xl border border-divider bg-content1">
        {/* placeholder background */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(40rem_20rem_at_70%_-10%,hsl(var(--heroui-default-200)/.7),transparent_60%),repeating-linear-gradient(45deg,hsl(var(--heroui-default-200)/.5)_0_10px,transparent_10px_20px)]"
        />
        <div className="relative z-10 grid h-full place-items-center">
          <span className="text-xs text-default-500">Image placeholder</span>
        </div>
        {/* subtle top highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-background to-transparent" />
      </div>
    </div>
  );
};

const BrandRow = () => {
  const brands = ["rum", "logopipsum", "ccd", "mono", "ll"] as const;
  return (
    <div className="mx-auto mt-14 w-full max-w-6xl">
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-sm text-center text-xs font-medium uppercase tracking-wide text-default-500 lg:text-left">
          We are partnered with more than 50+ companies around the globe.
        </p>
        <div className="flex w-full flex-1 flex-wrap items-center justify-center gap-6 text-default-500 lg:justify-end">
          {brands.map((name) => (
            <div key={name} className="h-8 w-24 rounded-md border border-dashed border-divider bg-content2 text-center text-[11px] leading-8">
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
