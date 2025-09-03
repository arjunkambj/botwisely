import Sidebar from "@/components/layouts/DashboardSidebar";
import AppHeader from "@/components/layouts/AppHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-dvh flex flex-col w-full">
      <AppHeader />
      <section className="h-full flex w-full bg-content2">
        <aside className="h-full">
          <Sidebar />
        </aside>
        <main className="h-full pb-2 w-full">
          <section className="flex-1 bg-content1 rounded-l-2xl p-4 h-full w-full">
            {children}
          </section>
        </main>
      </section>
    </section>
  );
}
