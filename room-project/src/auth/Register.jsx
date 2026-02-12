import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { signUp } from "../service/userservice";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    form,
    formState: { errors }
  } = useForm({ mode: "onChange" });

  const onSubmit = async (values) => {
    // values.message = "abcdefghijk"
    values.isOtp = false
    try {
      const response = await signUp(values)
    } catch (error) {

    }
  }

  return (
    <AuthLayout title="Create Account" subtitle="Start your Beast House journey 💪">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Name */}
        <div>
          <Input
            placeholder="Full Name"
            {...register("firstName", { required: "Name is required" })}
            className={errors.firstName ? "border-red-500" : ""}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
          )}
        </div>

        {/* Weight + Height */}
        <div className="grid grid-cols-2 gap-3">

          <div>
            <Input
              placeholder="Weight (kg)"
              type="number"
              {...register("weight", { required: "Weight is required" })}
              className={errors.weight ? "border-red-500" : ""}
            />
            {errors.weight && (
              <p className="text-red-500 text-xs mt-1">{errors.weight.message}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Height (cm)"
              type="number"
              {...register("height", { required: "Height is required" })}
              className={errors.height ? "border-red-500" : ""}
            />
            {errors.height && (
              <p className="text-red-500 text-xs mt-1">{errors.height.message}</p>
            )}
          </div>

        </div>

        {/* Email */}  
        <div>
          <Input
            placeholder="Email Address"
            type="email"
            {...register("email", { required: "Email is required" })}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <Input
            placeholder="Password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

         <div>
          <Input
            placeholder=" Message "
            type="Message"
            {...register("message", { required: "Message is required" })}
            className={errors.message ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Fitness Level */}
        <div>
          <select
            {...register("level", { required: "Level is required" })}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.level ? "border-red-500" : ""
              }`}
          >
            <option value="">Select Fitness Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="professional">Professional</option>
          </select>

          {errors.level && (
            <p className="text-red-500 text-xs mt-1">{errors.level.message}</p>
          )}
        </div>

        <Button text="Create Account" />

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>

      </form>

    </AuthLayout>
  );
}