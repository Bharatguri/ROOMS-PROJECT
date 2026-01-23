import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6 ml-64 fixed top-0 right-0 left-0">
      <h1 className="text-lg font-semibold text-gray-800">
        {}
      </h1>
     

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {user?.name || "User"}
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded-lg text-sm font-semibold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
