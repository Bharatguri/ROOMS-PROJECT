import DashboardLayout from "../components/DashboardLayout";

export default function City() {
  const cities = ["Jaipur", "Delhi", "Pune", "Chandigarh", "Ahmedabad", "Mumbai"];

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Select City</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl">
        {cities.map((city) => (
          <div
            key={city}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer text-center font-semibold"
          >
            {city}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
