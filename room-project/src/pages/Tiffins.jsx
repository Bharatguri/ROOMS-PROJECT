import DashboardLayout from "../components/DashboardLayout";

export default function Tiffins() {
  const tiffins = [
    { id: 1, name: "Sharma Tiffin Service", price: "₹2,400", type: "Veg" },
    { id: 2, name: "Home Taste Kitchen", price: "₹3,200", type: "Veg + Nonveg" },
    { id: 3, name: "Jain Tiffin Center", price: "₹2,800", type: "Jain" },
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Tiffin Services</h2>

        <select className="px-4 py-2 border rounded-lg">
          <option>All</option>
          <option>Veg</option>
          <option>Non-Veg</option>
          <option>Jain</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiffins.map((t) => (
          <div key={t.id} className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
            <h3 className="font-semibold text-lg">{t.name}</h3>
            <p className="text-gray-500 text-sm">{t.type}</p>
            <p className="mt-2 font-bold text-green-600">{t.price}/month</p>

            <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg">
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
