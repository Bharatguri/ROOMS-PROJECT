import DashboardLayout from "../components/DashboardLayout";

export default function Diets() {
  const diets = [
    { id: 1, title: "Fat Loss Diet", desc: "Low carb, high protein meals." },
    { id: 2, title: "Muscle Gain Diet", desc: "High protein + balanced carbs." },
    { id: 3, title: "Keto Diet", desc: "Low carbs & high fats diet plan." },
  ];

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">About Diets</h2>

      <div className="space-y-4 max-w-2xl">
        {diets.map((d) => (
          <div key={d.id} className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-lg font-semibold">{d.title}</h3>
            <p className="text-gray-500 text-sm mt-1">{d.desc}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
