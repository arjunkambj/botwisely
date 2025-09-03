export default function ContactPage() {
  return (
    <section className="w-full px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <header className="mb-6 text-center">
          <h1 className="text-4xl font-bold">Contact us</h1>
          <p className="mt-2 text-default-600">We’ll get back to you within 1 business day.</p>
        </header>
        <form className="space-y-4 rounded-2xl border border-divider bg-content1 p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">First name</label>
              <input className="rounded-md border border-divider bg-content2 px-3 py-2 text-sm outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Last name</label>
              <input className="rounded-md border border-divider bg-content2 px-3 py-2 text-sm outline-none" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Email</label>
            <input type="email" className="rounded-md border border-divider bg-content2 px-3 py-2 text-sm outline-none" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Message</label>
            <textarea rows={5} className="rounded-md border border-divider bg-content2 px-3 py-2 text-sm outline-none" />
          </div>
          <button className="w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}
