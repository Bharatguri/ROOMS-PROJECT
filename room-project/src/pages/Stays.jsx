import DashboardLayout from "../components/DashboardLayout";

export default function Stays() {
  const stays = [
    { id: 1, title: "Salasar Gym - Red Sqare", price: "₹600 -\Per", city: "Hisar" },
    { id: 2, title: "Rock Gym - Parijat Chowk ", price: "₹1500 -Per", city: "Hisar" },
    { id: 3, title: "Black Monster - Rishi Nagar", price: "₹1000 -Per", city: "Hisar" },
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold"></h2>

        <input
          placeholder="Search area / landmark..."
          className="px-4 py-2 border rounded-lg w-72"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stays.map((s) => (
          <div key={s.id} className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
            <h3 className="font-semibold text-lg">{s.title}</h3>
            <p className="text-gray-500 text-sm">{s.city}</p>
            <p className="mt-2 font-bold text-blue-600">{s.price}/month</p>

            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg">
              View Details
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
