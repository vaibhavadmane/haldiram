export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-800">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of store performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <Stat title="Total Orders" value="120" />
        <Stat title="Products" value="85" />
        <Stat title="Users" value="340" />
        <Stat title="Revenue" value="₹2,80,000" />
      </div>
    </div>
  );
}

function Stat({ title, value }: any) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-gray-500">
        {title}
      </p>
      <h2 className="mt-2 text-3xl font-semibold text-gray-800">
        {value}
      </h2>
    </div>
  );
}
