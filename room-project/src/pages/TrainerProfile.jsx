import DashboardLayout from "../components/DashboardLayout";

export default function TrainerProfile() {
  const trainers = [
    { id: 1, name: "Amit Sharma", exp: "5 Years", spec: "Fat Loss" },
    { id: 2, name: "Neha Verma", exp: "3 Years", spec: "Muscle Gain" },
    { id: 3, name: "Rahul Singh", exp: "7 Years", spec: "Strength Training" },
  ];

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Trainer Profiles</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trainers.map((t) => (
          <div key={t.id} className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
            <h3 className="text-lg font-semibold">{t.name}</h3>
            <p className="text-gray-500 text-sm">Experience: {t.exp}</p>
            <p className="text-gray-500 text-sm">Speciality: {t.spec}</p>

            <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg">
              Book Trainer
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
