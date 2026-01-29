import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { signUp } from "../service/userservice";
import { useForm } from "react-hook-form";

export default function Register() {
  const navigate = useNavigate();
  // const { register } = useAuth();

  const {
    register,
    handleSubmit,
    form,
    formState: { errors }
  } = useForm({ mode: "onChange" });

  const onSubmit = async (values) => {
    try {
      const response = await signUp(values)
    } catch (error) {

    }
  }

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (
  //     !form.name ||
  //     !form.weight ||
  //     !form.height ||
  //     !form.email ||
  //     !form.password ||
  //     !form.level
  //   ) {
  //     alert("Please fill all fields");
  //     return;
  //   }

  //   register(form);
  //   navigate("/dashboard");
  // };

  return (
    <AuthLayout title="Create Account" subtitle="Start your Beast House journey 💪">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Full Name"
          {...register("firstName", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Input
            placeholder="Weight (kg)"
            type="number"
            {...register("weight", { required: "Weight is required" })}

          />

          <Input
            placeholder="Height (cm)"
            type="number"
            {...register("height", { required: "Height is required" })}

          />
        </div>

        <Input
          placeholder="Email Address"
          type="email"
          {...register("email", { required: "Email is required" })}

        />

        <Input
          placeholder="Password"
          type="password"
          {...register("password", { required: "Password is required" })}
    
        />
 
         <Input
          placeholder="message"
          type="message"
          {...register("message", { required: "Password is required" })}

        />

        <select
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
