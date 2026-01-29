import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { baseUrl } from "../service/baseurl";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await baseUrl.post("/user/forgot-password", {
        email: data.email,
      });

      toast.success("OTP sent to your email 📩");
      navigate("/verify-otp", { state: { email: data.email, type: "forgot" } });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Email not found"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 px-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8">

        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800">
            Forgot Password 🔐
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter your email to receive OTP
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-extrabold hover:opacity-95 transition"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Remember password?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-blue-600 font-bold cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}
