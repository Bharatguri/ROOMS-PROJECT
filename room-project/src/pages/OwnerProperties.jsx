import DashboardLayout from "../components/DashboardLayout";

export default function OwnerProperties() {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">My Properties</h2>

      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-600">
          Owner dashboard: yahan properties list + add property form aayega.
        </p>

        <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg">
          + Add New Property
        </button>
      </div>
    </DashboardLayout>
  );
}
