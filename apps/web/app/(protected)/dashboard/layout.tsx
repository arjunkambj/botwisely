import Sidebar from "@/components/layouts/DashboardSidebar";
import AppHeader from "@/components/layouts/AppHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-dvh flex w-full bg-content2">
      <aside className="h-full w-72 shrink-0">
        <Sidebar />
      </aside>
      <div className="flex min-w-0 flex-1 py-2 flex-col">
        <div className="flex min-h-0 flex-1  flex-col overflow-hidden rounded-l-2xl bg-content1">
          <AppHeader />
          <main className="flex-1 min-h-0 min-w-0 overflow-y-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </section>
  );
}
