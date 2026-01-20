import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome, {user?.name || "User"} 👋
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage your stays and food services from one place.
        </p>
      </div>

      {/* Common Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <p className="text-sm text-gray-500">Active City</p>
          <p className="text-2xl font-bold mt-1">Jaipur</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <p className="text-sm text-gray-500">Verified Providers</p>
          <p className="text-2xl font-bold mt-1">120+</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <p className="text-sm text-gray-500">Support Status</p>
          <p className="text-2xl font-bold mt-1 text-green-600">Online</p>
        </div>
      </div>

      {/* Role Based UI */}
      {user?.role === "student" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Find Stay */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg text-gray-800">
              🏠 Find Verified Stay
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Browse PG / rooms / flats near your college or office.
            </p>

            <button
              onClick={() => navigate("/stays")}
              className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Explore Stays
            </button>
          </div>

          {/* Order Tiffin */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg text-gray-800">
              🍱 Order Tiffin Service
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Get home-style food near your location with monthly plans.
            </p>

            <button
              onClick={() => navigate("/tiffins")}
              className="mt-5 w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Explore Tiffins
            </button>
          </div>
        </div>
      )}

      {user?.role === "owner" && (
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-lg text-gray-800">
            🏢 Owner Panel
          </h3>
          <p className="text-gray-500 text-sm mt-2">
            Add and manage your PG / Rooms / Flats listings.
          </p>

          <div className="flex gap-3 mt-5">
            <button
              onClick={() => navigate("/owner/properties")}
              className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Manage Properties
            </button>
            <button
              onClick={() => navigate("/owner/properties")}
              className="flex-1 border border-purple-600 text-purple-700 py-2 rounded-lg font-semibold hover:bg-purple-50 transition"
            >
              Add New
            </button>
          </div>
        </div>
      )}

      {user?.role === "tiffin" && (
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-lg text-gray-800">
            🍳 Tiffin Provider Panel
          </h3>
          <p className="text-gray-500 text-sm mt-2">
            Add food plans, manage subscribers, track orders.
          </p>

          <div className="flex gap-3 mt-5">
            <button
              onClick={() => navigate("/provider/plans")}
              className="flex-1 bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition"
            >
              Manage Plans
            </button>
            <button
              onClick={() => navigate("/provider/plans")}
              className="flex-1 border border-orange-600 text-orange-700 py-2 rounded-lg font-semibold hover:bg-orange-50 transition"
            >
              Add Plan
            </button>
          </div>
        </div>
      )}

      {/* If role missing */}
      {!user?.role && (
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-600">Role not found. Please login again.</p>
        </div>
      )}
    </DashboardLayout>
  );
}
