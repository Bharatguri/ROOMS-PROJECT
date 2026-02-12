import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { profile } from "../service/userservice";
import toast from "react-hot-toast";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      const response = await profile({});
      setUser(response.data);
    } catch (error) {
      toast.error("Failed to load profile");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  console.log(user)

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-center text-gray-500">Loading profile...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <div className="bg-white p-6 rounded-xl shadow max-w-2xl">
        <ProfileItem label="First Name" value={user?.firstName} />
        <ProfileItem label="Email" value={user?.email} />
        <ProfileItem label="Weight (kg)" value={user?.weight} />
        <ProfileItem label="Height (cm)" value={user?.height} />
        <ProfileItem label="Fitness Level" value={user?.level} />
        <ProfileItem label="Message" value={user?.message} />

        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Edit Profile
        </button>
      </div>
    </DashboardLayout>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div className="mb-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-800">
        {value || "—"}
      </p>
    </div>
  );
}
