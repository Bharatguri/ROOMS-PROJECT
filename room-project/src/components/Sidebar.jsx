import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg transition ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
    }`;

  return (
    <div className="h-screen w-64 bg-gray-900 text-white fixed left-0 top-0">

      <div className="p-6 text-2xl font-extrabold border-b border-gray-700">
        MY GYM
      </div>


      <div className="px-6 py-3 text-xs uppercase tracking-widest text-gray-400">
        {user?.role || "guest"} panel
      </div>


      <nav className="p-4 space-y-2">
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>


        {user?.role === "student" && (
          <>
            <NavLink to="/profile" className={linkClass}>Your Profile</NavLink>
            <NavLink to="/city" className={linkClass}>City</NavLink>
            <NavLink to="/searchgym" className={linkClass}>Search Gym</NavLink>
            <NavLink to="/trainer-profile" className={linkClass}>Trainer Profile</NavLink>
            <NavLink to="/diets" className={linkClass}>About Diets</NavLink>
            <NavLink to="/supplements" className={linkClass}>Buy Supplements</NavLink>

          </>
        )}


        {user?.role === "owner" && (
          <NavLink to="/owner/properties" className={linkClass}>
            My Properties
          </NavLink>
        )}


        {user?.role === "tiffin" && (
          <NavLink to="/provider/plans" className={linkClass}>
            My Food Plans
          </NavLink>
        )}


        <NavLink to="/profile" className={linkClass}>
          Profile
        </NavLink>
      </nav>
    </div>
  );
}
