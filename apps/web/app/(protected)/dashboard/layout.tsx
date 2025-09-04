import Sidebar from "@/components/layouts/DashboardSidebar";
import AppHeader from "@/components/layouts/AppHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-dvh w-full bg-content2 flex flex-col">
      <AppHeader />
      <div className="flex min-h-0 flex-1">
        <aside className="h-full shrink-0">
          <Sidebar />
        </aside>
        <div className="flex min-w-0 flex-1">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-content1">
            <main className="flex-1 min-h-0 min-w-0 overflow-y-auto p-4">
              {children}
            </main>
          </div>
        </div>
      </div>
    </section>
  );
}
