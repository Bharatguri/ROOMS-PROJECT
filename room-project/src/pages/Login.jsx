import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState("student");

  const handleLogin = () => {
    login(role); // role saved
    navigate("/dashboard");
  };

  return (
    <AuthLayout title="Welcome Back 👋" subtitle="Login to continue to CityNest">
      <Input placeholder="Email or Mobile Number" />
      <Input type="password" placeholder="Password" />

      {/* Role Select */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg"
      >
        <option value="student">Student</option>
        <option value="owner">Property Owner</option>
        <option value="tiffin">Tiffin Provider</option>
        <option value="tiffin">Employee</option>
      </select>

      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Login
      </button>

      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-600 font-semibold">
          Register
        </Link>
      </p>
    </AuthLayout>
  );
}
