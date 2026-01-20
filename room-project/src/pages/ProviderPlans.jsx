import DashboardLayout from "../components/DashboardLayout";

export default function ProviderPlans() {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">My Food Plans</h2>

      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-600">
          Provider dashboard: yahan plans list + add plan form aayega.
        </p>

        <button className="mt-4 bg-orange-600 text-white px-4 py-2 rounded-lg">
          + Add Food Plan
        </button>
      </div>
    </DashboardLayout>
  );
}

