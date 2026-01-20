import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800">
            Welcome to <span className="text-blue-600">GymNest</span> 💪
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Track workouts, diet plans and progress — all in one dashboard.
          </p>
        </div>

        {/* Search bar */}
        <div className="flex gap-2">
          <input
            className="w-full md:w-72 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search gyms, trainers, plans..."
          />
          <button className="px-4 py-2 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition">
            Search
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Active City</p>
          <p className="text-2xl font-bold mt-1">Hisar</p>
          <p className="text-xs text-gray-400 mt-2">
            Current selected gym location
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Verified Gyms</p>
          <p className="text-2xl font-bold mt-1">12+</p>
          <p className="text-xs text-gray-400 mt-2">
            Safe & verified partners
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Gym Rating</p>
          <p className="text-2xl font-bold mt-1 text-green-600">★★★★★</p>
          <p className="text-xs text-gray-400 mt-2">
            Based on customer feedback
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold">Quick Actions ⚡</h3>
            <p className="text-sm opacity-90 mt-1">
              Jump directly to important features.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/searchgym")}
              className="bg-white text-blue-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Search Gym
            </button>
            <button
              onClick={() => navigate("/trainer-profile")}
              className="bg-white text-blue-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Trainers
            </button>
            <button
              onClick={() => navigate("/diets")}
              className="bg-white text-blue-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Diets
            </button>
            <button
              onClick={() => navigate("/supplements")}
              className="bg-white text-blue-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Supplements
            </button>
          </div>
        </div>
      </div>

      {/* Role Based Panels */}
      {user?.role === "member" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Find Gym */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-800">🏋️ Find Gyms</h3>
              <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                Member
              </span>
            </div>

            <p className="text-gray-500 text-sm mt-2">
              Explore gyms near you with ratings, trainers and packages.
            </p>

            <button
              onClick={() => navigate("/searchgym")}
              className="mt-5 w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Explore Gym
            </button>
          </div>

          {/* Supplements */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-800">
                🛒 Buy Supplements
              </h3>
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                Store
              </span>
            </div>

            <p className="text-gray-500 text-sm mt-2">
              Order whey protein, creatine and vitamins with discounts.
            </p>

            <button
              onClick={() => navigate("/supplements")}
              className="mt-5 w-full bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              Explore Supplements
            </button>
          </div>

          {/* Diet */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition md:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-800">🥗 Diet Plans</h3>
              <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold">
                Nutrition
              </span>
            </div>

            <p className="text-gray-500 text-sm mt-2">
              Get muscle gain, fat loss and balanced diet plans created by
              trainers.
            </p>

            <button
              onClick={() => navigate("/diets")}
              className="mt-5 bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-orange-700 transition"
            >
              View Diet Plans
            </button>
          </div>
        </div>
      )}

      {user?.role === "trainer" && (
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-gray-800">🧑‍🏫 Trainer Panel</h3>
            <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">
              Trainer
            </span>
          </div>

          <p className="text-gray-500 text-sm mt-2">
            Manage your clients, assign workout plans and track progress.
          </p>

          <div className="flex flex-col md:flex-row gap-3 mt-5">
            <button
              onClick={() => navigate("/trainer/clients")}
              className="flex-1 bg-purple-600 text-white py-2 rounded-xl font-semibold hover:bg-purple-700 transition"
            >
              My Clients
            </button>
            <button
              onClick={() => navigate("/trainer/workouts")}
              className="flex-1 border border-purple-600 text-purple-700 py-2 rounded-xl font-semibold hover:bg-purple-50 transition"
            >
              Workout Plans
            </button>
          </div>
        </div>
      )}

      {user?.role === "admin" && (
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-gray-800">🛠 Admin Panel</h3>
            <span className="text-xs bg-gray-200 text-gray-800 px-3 py-1 rounded-full font-semibold">
              Admin
            </span>
          </div>

          <p className="text-gray-500 text-sm mt-2">
            Control gym system — members, trainers, packages, payments.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
            <button
              onClick={() => navigate("/admin/members")}
              className="bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Members
            </button>
            <button
              onClick={() => navigate("/admin/trainers")}
              className="bg-indigo-600 text-white py-2 rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Trainers
            </button>
            <button
              onClick={() => navigate("/admin/packages")}
              className="bg-gray-900 text-white py-2 rounded-xl font-semibold hover:bg-black transition"
            >
              Packages
            </button>
          </div>
        </div>
      )}

      {!user?.role && (
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-600">Role not found. Please login again.</p>
        </div>
      )}
    </DashboardLayout>
  );
}
