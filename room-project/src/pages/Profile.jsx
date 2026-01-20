import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Your Profile</h2>

      <div className="bg-white p-6 rounded-xl shadow max-w-xl">
        <p className="text-gray-600">Name</p>
        <h3 className="text-lg font-semibold mb-4">{user?.name || "User"}</h3>

        <p className="text-gray-600">Role</p>
        <h3 className="text-lg font-semibold mb-6">
          {user?.role?.toUpperCase() || "MEMBER"}
        </h3>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Edit Profile
        </button>
      </div>
    </DashboardLayout>
  );
}
