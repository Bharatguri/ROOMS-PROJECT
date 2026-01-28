import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Register() {
  return (
    <AuthLayout
      title="Create Account "
      subtitle="Start your journey with CityNest"
    >
      <Input placeholder="Full Name" />
      <Input placeholder="Weight" />
      <Input placeholder="Height" />
       <Input placeholder="Email Address" />
      <Input type="password" placeholder="Password" />

      <select className="w-full mb-4 px-4 py-2 border rounded-lg">
        <option>Select Role</option>
        <option>Begginer</option>
        <option>Modrate</option>
        <option>Experience Holder </option>
        <option>Professional</option>
      </select>

      <Button text="Create Account" />

      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <Link to="/" className="text-blue-600 font-semibold">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}