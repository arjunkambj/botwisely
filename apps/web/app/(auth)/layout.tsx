export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh grid place-items-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-divider bg-content1 p-6 shadow-sm">
        {children}
      </div>
    </div>
  );
}
