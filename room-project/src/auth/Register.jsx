import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    weight: "",
    height: "",
    email: "",
    password: "",
    level: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.weight ||
      !form.height ||
      !form.email ||
      !form.password ||
      !form.level
    ) {
      alert("Please fill all fields");
      return;
    }

    register(form);
    navigate("/dashboard");
  };

  return (
    <AuthLayout title="Create Account" subtitle="Start your Beast House journey 💪">
      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            name="weight"
            placeholder="Weight (kg)"
            type="number"
            value={form.weight}
            onChange={handleChange}
          />

          <Input
            name="height"
            placeholder="Height (cm)"
            type="number"
            value={form.height}
            onChange={handleChange}
          />
        </div>

        <Input
          name="email"
          placeholder="Email Address"
          type="email"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />

        <select
          name="level"
          value={form.level}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Fitness Level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="professional">Professional</option>
        </select>

        <Button text="Create Account" />

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
