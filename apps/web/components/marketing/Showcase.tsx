// Layout-focused showcase section with placeholder blocks (no images)

export const Showcase = () => {
  return (
    <section className="w-full px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-col gap-2">
          <span className="w-fit rounded-full border border-divider bg-content2 px-3 py-1 text-xs font-medium text-default-600">
            Showcase
          </span>
          <h2 className="text-3xl font-semibold sm:text-4xl">See the layout in action</h2>
          <p className="max-w-prose text-default-600">
            Structure only: blocks represent content areas you can replace later.
          </p>
        </header>

        {/* Responsive mosaic grid matching a typical marketing layout */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12">
          {/* Primary highlight card */}
          <div className="group relative col-span-1 sm:col-span-2 lg:col-span-7 lg:row-span-2 min-h-64 rounded-2xl border border-divider bg-content1 p-6">
            <div
              aria-hidden
              className="absolute inset-0 rounded-2xl bg-[radial-gradient(40rem_20rem_at_70%_-10%,hsl(var(--heroui-default-200)/.6),transparent_60%),repeating-linear-gradient(45deg,hsl(var(--heroui-default-200)/.4)_0_10px,transparent_10px_20px)]"
            />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="mb-2 h-3 w-28 rounded bg-default-200" />
                <div className="mb-3 h-6 w-64 rounded bg-default-200" />
                <div className="h-4 w-52 rounded bg-default-200" />
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-28 rounded-md bg-default-200" />
                <div className="h-8 w-28 rounded-md border border-divider bg-content2" />
              </div>
            </div>
          </div>

          {/* Right column stacked cards */}
          <div className="relative col-span-1 sm:col-span-1 lg:col-span-5 rounded-2xl border border-divider bg-content1 p-6">
            <div className="mb-4 h-5 w-40 rounded bg-default-200" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-24 rounded-lg bg-content2 ring-1 ring-divider" />
              <div className="h-24 rounded-lg bg-content2 ring-1 ring-divider" />
              <div className="h-24 rounded-lg bg-content2 ring-1 ring-divider" />
              <div className="h-24 rounded-lg bg-content2 ring-1 ring-divider" />
            </div>
          </div>

          <div className="relative col-span-1 sm:col-span-1 lg:col-span-5 rounded-2xl border border-divider bg-content1 p-6">
            <div className="mb-3 h-5 w-48 rounded bg-default-200" />
            <div className="h-36 rounded-lg bg-content2 ring-1 ring-divider" />
            <div className="mt-3 h-3 w-56 rounded bg-default-200" />
          </div>

          {/* Bottom row: three equal feature cards */}
          <div className="col-span-1 sm:col-span-1 lg:col-span-4 rounded-2xl border border-divider bg-content1 p-5">
            <div className="mb-3 h-5 w-32 rounded bg-default-200" />
            <div className="h-24 rounded-lg bg-content2 ring-1 ring-divider" />
          </div>
          <div className="col-span-1 sm:col-span-1 lg:col-span-4 rounded-2xl border border-divider bg-content1 p-5">
            <div className="mb-3 h-5 w-32 rounded bg-default-200" />
            <div className="h-24 rounded-lg bg-content2 ring-1 ring-divider" />
          </div>
          <div className="col-span-1 sm:col-span-2 lg:col-span-4 rounded-2xl border border-divider bg-content1 p-5">
            <div className="mb-3 h-5 w-32 rounded bg-default-200" />
            <div className="h-24 rounded-lg bg-content2 ring-1 ring-divider" />
          </div>
        </div>
      </div>
    </section>
  );
};

