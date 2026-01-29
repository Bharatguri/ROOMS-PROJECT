import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { signUp } from "../service/userservice";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (values) => {
    try {
      await signUp(values);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Start your Beast House journey 💪">
      <form onSubmit={handleSubmit(onSubmit)}>

        <Input
          placeholder="Full Name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <div className="grid grid-cols-2 gap-3">
          <Input
            type="number"
            placeholder="Weight (kg)"
            {...register("weight", { required: "Weight is required" })}
          />

          <Input
            type="number"
            placeholder="Height (cm)"
            {...register("height", { required: "Height is required" })}
          />
        </div>

        <Input
          type="email"
          placeholder="Email Address"
          {...register("email", { required: "Email is required" })}
        />

        <Input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
        />

        <select
          className="w-full mb-4 px-4 py-3 border rounded-xl"
          {...register("level", { required: "Level is required" })}
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
