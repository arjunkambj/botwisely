"use client";

export const HowItWorks = () => {
  const steps = [
    {
      title: "Create your bot",
      desc: "Name it, choose a template, and set goals.",
    },
    {
      title: "Connect data",
      desc: "Add docs or URLs; embeddings optional for retrieval.",
    },
    {
      title: "Embed and iterate",
      desc: "Drop-in widget/React component; tweak behavior safely.",
    },
  ];

  return (
    <section id="how-it-works" className="w-full scroll-mt-24 lg:scroll-mt-28 px-4 py-20 md:py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">How It Works</h2>
          <p className="mt-2 text-default-600">Three simple steps to live chat.</p>
        </header>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="rounded-xl border border-divider bg-content1 p-6 text-center"
            >
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-default-100 ring-1 ring-divider">
                <span className="text-sm font-semibold text-default-600">{i + 1}</span>
              </div>
              <h3 className="mb-1 text-lg font-semibold">{s.title}</h3>
              <p className="text-sm text-default-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
