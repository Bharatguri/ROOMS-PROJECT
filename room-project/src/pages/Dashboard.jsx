import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      {/* Top Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 md:p-8 shadow mb-8">
        {/* Decorative blur */}
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-10 w-72 h-72 bg-black/10 rounded-full blur-3xl" />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Welcome to <span className="text-white/95">Beast House</span> 💀
            </h2>
            <p className="text-white/80 text-sm md:text-base mt-2">
              Track workouts, diet plans, supplements and your progress — all in
              one place.
            </p>

            {/* mini badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-xs bg-white/15 border border-white/20 px-3 py-1 rounded-full">
                ✅ Verified Trainers
              </span>
              <span className="text-xs bg-white/15 border border-white/20 px-3 py-1 rounded-full">
                🏋️ Gym Plans
              </span>
              <span className="text-xs bg-white/15 border border-white/20 px-3 py-1 rounded-full">
                🥗 Diet Guides
              </span>
            </div>
          </div>

          {/* Search bar */}
          <div className="bg-white/10 border border-white/20 rounded-2xl p-3 w-full md:w-[420px] backdrop-blur">
            <p className="text-xs text-white/70 mb-2">Quick Search</p>

            <div className="flex gap-2">
              <input
                className="w-full px-4 py-2 bg-white/15 border border-white/20 text-white placeholder:text-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/60"
                placeholder="Search gyms, trainers, plans..."
              />
              <button className="px-4 py-2 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="group bg-white p-6 rounded-2xl shadow hover:shadow-xl transition border border-transparent hover:border-blue-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Active City</p>
              <p className="text-2xl font-extrabold mt-1 text-gray-800">
                Hisar
              </p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center text-lg group-hover:scale-105 transition">
              📍
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Current selected gym location
          </p>
        </div>

        <div className="group bg-white p-6 rounded-2xl shadow hover:shadow-xl transition border border-transparent hover:border-indigo-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Verified Gyms</p>
              <p className="text-2xl font-extrabold mt-1 text-gray-800">
                12+
              </p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-indigo-50 flex items-center justify-center text-lg group-hover:scale-105 transition">
              🏢
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Safe & verified partners
          </p>
        </div>

        <div className="group bg-white p-6 rounded-2xl shadow hover:shadow-xl transition border border-transparent hover:border-green-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Gym Rating</p>
              <p className="text-2xl font-extrabold mt-1 text-green-600">
                ★★★★★
              </p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-green-50 flex items-center justify-center text-lg group-hover:scale-105 transition">
              ⭐
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Based on customer feedback
          </p>
        </div>
      </div>

      {/* Dashboard Grid: Left - Actions, Right - Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Quick actions */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6 border">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-extrabold text-gray-800">
                Quick Actions ⚡
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Fast access to important features.
              </p>
            </div>

            <button
              onClick={() => navigate("/profile")}
              className="hidden md:block text-sm font-semibold px-4 py-2 rounded-xl border hover:bg-gray-50 transition"
            >
              View Profile →
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
            <button
              onClick={() => navigate("/searchgym")}
              className="px-4 py-3 rounded-2xl bg-blue-50 text-blue-800 font-bold hover:bg-blue-100 transition"
            >
              🔎 Search Gym
            </button>
            <button
              onClick={() => navigate("/trainer-profile")}
              className="px-4 py-3 rounded-2xl bg-indigo-50 text-indigo-800 font-bold hover:bg-indigo-100 transition"
            >
              🧑‍🏫 Trainers
            </button>
            <button
              onClick={() => navigate("/diets")}
              className="px-4 py-3 rounded-2xl bg-orange-50 text-orange-800 font-bold hover:bg-orange-100 transition"
            >
              🥗 Diets
            </button>
            <button
              onClick={() => navigate("/supplements")}
              className="px-4 py-3 rounded-2xl bg-green-50 text-green-800 font-bold hover:bg-green-100 transition"
            >
              🛒 Supplements
            </button>
          </div>

          <div className="mt-6 flex flex-col md:flex-row gap-3">
            <button
              onClick={() => navigate("/city")}
              className="flex-1 px-4 py-3 rounded-2xl border font-semibold hover:bg-gray-50 transition"
            >
              🌍 Change City
            </button>
            <button
              onClick={() => navigate("/searchgym")}
              className="flex-1 px-4 py-3 rounded-2xl bg-gray-900 text-white font-semibold hover:bg-black transition"
            >
              🚀 Find Gym Near Me
            </button>
          </div>
        </div>

        {/* Right widgets */}
        <div className="bg-white rounded-2xl shadow p-6 border">
          <h3 className="text-lg font-extrabold text-gray-800">
            Weekly Progress 📈
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Your activity summary (demo)
          </p>

          {/* Fake progress bars */}
          <div className="mt-5 space-y-4">
            <div>
              <div className="flex justify-between text-sm font-semibold text-gray-700">
                <span>Workouts</span>
                <span>70%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
                <div className="h-2 w-[70%] bg-blue-600 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-semibold text-gray-700">
                <span>Diet Follow</span>
                <span>55%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
                <div className="h-2 w-[55%] bg-orange-500 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-semibold text-gray-700">
                <span>Hydration</span>
                <span>80%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
                <div className="h-2 w-[80%] bg-green-600 rounded-full" />
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate("/diets")}
            className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-2xl font-extrabold hover:opacity-95 transition"
          >
            Improve Your Plan 💪
          </button>
        </div>
      </div>

      {/* Role Based Panels */}
      {user?.role === "member" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Member main */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow hover:shadow-xl transition border">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-lg text-gray-800">
                🏋️ Member Control
              </h3>
              <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                Member
              </span>
            </div>

            <p className="text-gray-500 text-sm mt-2">
              Explore gyms, book trainers and manage your routine easily.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              <button
                onClick={() => navigate("/searchgym")}
                className="p-4 rounded-2xl bg-blue-50 text-blue-800 font-bold hover:bg-blue-100 transition text-left"
              >
                🔎 Find Gyms
                <p className="text-xs text-blue-700/80 mt-1 font-semibold">
                  Nearby gyms with rating & offers
                </p>
              </button>

              <button
                onClick={() => navigate("/trainer-profile")}
                className="p-4 rounded-2xl bg-indigo-50 text-indigo-800 font-bold hover:bg-indigo-100 transition text-left"
              >
                🧑‍🏫 Book Trainer
                <p className="text-xs text-indigo-700/80 mt-1 font-semibold">
                  Choose best trainer for you
                </p>
              </button>

              <button
                onClick={() => navigate("/supplements")}
                className="p-4 rounded-2xl bg-green-50 text-green-800 font-bold hover:bg-green-100 transition text-left"
              >
                🛒 Buy Supplements
                <p className="text-xs text-green-700/80 mt-1 font-semibold">
                  Whey, Creatine, Vitamins
                </p>
              </button>

              <button
                onClick={() => navigate("/diets")}
                className="p-4 rounded-2xl bg-orange-50 text-orange-800 font-bold hover:bg-orange-100 transition text-left"
              >
                🥗 Diet Plans
                <p className="text-xs text-orange-700/80 mt-1 font-semibold">
                  Fat loss / Muscle gain plans
                </p>
              </button>
            </div>
          </div>

          {/* Recent activity */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition border">
            <h3 className="text-lg font-extrabold text-gray-800">
              Recent Activity 🕒
            </h3>
            <p className="text-sm text-gray-500 mt-1">Your last actions (demo)</p>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
                  🏋️
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    Viewed “Gold Gym”
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-green-50 flex items-center justify-center">
                  🛒
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    Checked “Whey Protein”
                  </p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center">
                  🥗
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    Opened Diet Plan
                  </p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/searchgym")}
              className="mt-6 w-full border py-3 rounded-2xl font-bold hover:bg-gray-50 transition"
            >
              Explore More →
            </button>
          </div>
        </div>
      )}

      {user?.role === "trainer" && (
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition border">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg text-gray-800">
              🧑‍🏫 Trainer Panel
            </h3>
            <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">
              Trainer
            </span>
          </div>

          <p className="text-gray-500 text-sm mt-2">
            Manage clients, assign workout plans and track progress.
          </p>

          <div className="flex flex-col md:flex-row gap-3 mt-5">
            <button
              onClick={() => navigate("/trainer/clients")}
              className="flex-1 bg-purple-600 text-white py-3 rounded-2xl font-bold hover:bg-purple-700 transition"
            >
              My Clients
            </button>
            <button
              onClick={() => navigate("/trainer/workouts")}
              className="flex-1 border border-purple-600 text-purple-700 py-3 rounded-2xl font-bold hover:bg-purple-50 transition"
            >
              Workout Plans
            </button>
          </div>
        </div>
      )}

      {user?.role === "admin" && (
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition border">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg text-gray-800">🛠 Admin Panel</h3>
            <span className="text-xs bg-gray-200 text-gray-800 px-3 py-1 rounded-full font-semibold">
              Admin
            </span>
          </div>

          <p className="text-gray-500 text-sm mt-2">
            Control system — manage members, trainers, packages, payments.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
            <button
              onClick={() => navigate("/admin/members")}
              className="bg-blue-600 text-white py-3 rounded-2xl font-bold hover:bg-blue-700 transition"
            >
              Members
            </button>
            <button
              onClick={() => navigate("/admin/trainers")}
              className="bg-indigo-600 text-white py-3 rounded-2xl font-bold hover:bg-indigo-700 transition"
            >
              Trainers
            </button>
            <button
              onClick={() => navigate("/admin/packages")}
              className="bg-gray-900 text-white py-3 rounded-2xl font-bold hover:bg-black transition"
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
