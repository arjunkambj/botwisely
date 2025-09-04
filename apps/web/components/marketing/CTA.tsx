import NextLink from "next/link";

export const CTA = () => {
  return (
    <section className="w-full px-4 py-20 md:py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-2xl border border-divider bg-content1 p-8 text-center">
        <h3 className="text-2xl font-semibold">Ready to build faster?</h3>
        <p className="mt-2 text-default-600">
          Start free, then scale with usage-based pricing.
        </p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <NextLink
            href="/sign-in"
            className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:scale-[1.02]"
          >
            Create your account
          </NextLink>
          <NextLink
            href="/pricing"
            className="rounded-md border border-divider bg-content2 px-5 py-3 text-sm font-medium text-foreground hover:bg-content3"
          >
            View pricing
          </NextLink>
        </div>
      </div>
    </section>
  );
};
