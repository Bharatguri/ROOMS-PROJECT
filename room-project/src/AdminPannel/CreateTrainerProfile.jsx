import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { tranner } from "../service/userservice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function TrainerProfileCreate() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (values) => {
    try {
      await tranner(values);

      toast.success("Trainer profile created successfully 💪");

      navigate("/dashboard");

    } catch (error) {
      toast.error("Trainer profile creation failed");
      console.log(error);
    }
  };

  return (
    <AuthLayout
      title="Create Trainer Profile"
      subtitle="Join Beast House as Trainer 🏋️"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* First Name */}
        <div>
          <Input
            placeholder="First Name"
            {...register("firstname", { required: "First name is required" })}
            className={errors.firstname ? "border-red-500" : ""}
          />
          {errors.firstname && (
            <p className="text-red-500 text-xs mt-1">
              {errors.firstname.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <Input
            placeholder="Last Name"
            {...register("lastname", { required: "Last name is required" })}
            className={errors.lastname ? "border-red-500" : ""}
          />
          {errors.lastname && (
            <p className="text-red-500 text-xs mt-1">
              {errors.lastname.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <Input
            placeholder="Email ID"
            type="email"
            {...register("email", { required: "Email is required" })}
            className={errors.emailid ? "border-red-500" : ""}
          />
          {errors.emailid && (
            <p className="text-red-500 text-xs mt-1">
              {errors.emailid.message}
            </p>
          )}
        </div>

        {/* Mobile */}
        <div>
          <Input
            placeholder="Mobile Number"
            {...register("phoneNumber", { required: "Mobile number required" })}
            className={errors.mobileno ? "border-red-500" : ""}
          />
          {errors.mobileno && (
            <p className="text-red-500 text-xs mt-1">
              {errors.mobileno.message}
            </p>
          )}
        </div>

        {/* Gym ID */}
        <div>
          <Input
            placeholder="Gym ID"
            {...register("gymid", { required: "Gym ID is required" })}
            className={errors.gymid ? "border-red-500" : ""}
          />
          {errors.gymid && (
            <p className="text-red-500 text-xs mt-1">
              {errors.gymid.message}
            </p>
          )}
        </div>

        <Button text="Create Trainer Profile" />

      </form>
    </AuthLayout>
  );
}
