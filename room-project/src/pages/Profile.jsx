import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  const profile = {
    name: user?.name || "Beast User",
    email: user?.email || "user@gymnest.com",
    weight: user?.weight || 70,
    height: user?.height || 170,
    level: user?.level || "beginner",
    role: user?.role || "member",
  };

  const heightMeter = profile.height / 100;
  const bmi = (profile.weight / (heightMeter * heightMeter)).toFixed(1);

  const bmiStatus =
    bmi < 18.5
      ? "Underweight"
      : bmi < 25
      ? "Fit"
      : bmi < 30
      ? "Overweight"
      : "Obese";

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-extrabold">Your Profile</h2>

        <span className="text-xs bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-bold uppercase">
          {profile.role}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  
        <div className="bg-white rounded-2xl shadow p-6 md:col-span-2">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center text-white text-2xl font-extrabold">
              {profile.name.charAt(0)}
            </div>

            <div>
              <h3 className="text-xl font-bold">{profile.name}</h3>
              <p className="text-gray-500 text-sm">{profile.email}</p>
              <p className="text-sm mt-1">
                Fitness Level:{" "}
                <span className="font-semibold capitalize">
                  {profile.level}
                </span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500">Weight</p>
              <p className="text-lg font-bold">{profile.weight} kg</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500">Height</p>
              <p className="text-lg font-bold">{profile.height} cm</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500">BMI</p>
              <p className="text-lg font-bold">{bmi}</p>
              <p className="text-xs text-gray-500">{bmiStatus}</p>
            </div>
          </div>

          <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition">
            Edit Profile
          </button>
        </div>


        <div className="space-y-5">
          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-sm text-gray-500">Membership</p>
            <p className="text-xl font-extrabold mt-1">Pro</p>
            <p className="text-xs text-gray-400">Upgrade anytime</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-sm text-gray-500">Trainer Discount</p>
            <p className="text-xl font-extrabold mt-1 text-green-600">15%</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-sm text-gray-500">Supplement Discount</p>
            <p className="text-xl font-extrabold mt-1 text-blue-600">10%</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
