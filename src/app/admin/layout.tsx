export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="sticky top-0 h-screen w-64 shrink-0 bg-gray-900 text-white">
        <div className="flex h-full flex-col px-5 py-6">
          {/* Logo / Title */}
          <h2 className="mb-10 text-2xl font-semibold tracking-wide">
            Admin Panel
          </h2>

          {/* Navigation */}
          <nav className="flex flex-col space-y-2 text-sm font-medium">
            <a
              href="/admin"
              className="rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition"
            >
              Dashboard
            </a>
            <a
              href="/admin/categories"
              className="rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition"
            >
              Categories
            </a>
            <a
              href="/admin/products"
              className="rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition"
            >
              Products
            </a>
            <a
              href="/admin/orders"
              className="rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition"
            >
              Orders
            </a>
            <a
              href="/admin/users"
              className="rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition"
            >
              Users
            </a>
          </nav>

          {/* Footer */}
          <div className="mt-auto pt-6 text-xs text-gray-400">
            © {new Date().getFullYear()} Admin Panel
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
