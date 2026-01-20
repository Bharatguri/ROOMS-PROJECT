import DashboardLayout from "../components/DashboardLayout";

export default function SearchGym() {
  const gyms = [
    { id: 1, name: "Gold Gym", place: "Mansarovar", rating: "4.5" },
    { id: 2, name: "Fitness Arena", place: "Vaishali Nagar", rating: "4.2" },
    { id: 3, name: "Power House Gym", place: "Malviya Nagar", rating: "4.7" },
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Search Gym</h2>
        <input
          placeholder="Search gym name / area..."
          className="px-4 py-2 border rounded-lg w-72"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {gyms.map((g) => (
          <div key={g.id} className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
            <h3 className="text-lg font-semibold">{g.name}</h3>
            <p className="text-gray-500 text-sm">{g.place}</p>
            <p className="mt-2 text-sm font-semibold text-green-600">
              ⭐ Rating: {g.rating}
            </p>

            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg">
              View Details
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
