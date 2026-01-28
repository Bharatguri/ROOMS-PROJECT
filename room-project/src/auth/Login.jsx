import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please enter email and password");
      return;
    }

    const success = login(form.email);

    if (success) {
      navigate("/dashboard");
    } else {
      alert("User not found. Please register first.");
    }
  };

  return (
    <AuthLayout
      title="Welcome 👋"
      subtitle="Login to continue building your beast body 💪"
    >
      <form onSubmit={handleLogin}>
        <Input
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
