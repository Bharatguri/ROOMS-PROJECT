import { useForm } from "react-hook-form";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { baseUrl } from "../service/baseurl";
import toast from "react-hot-toast";


export default function ForgetPassword() {
  const navigate = useNavigate();

  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

 
  const sendOtp = async (data) => {
    setLoading(true);
    try {
      await baseUrl.post("/user/forget-password", {
        userName: data.email,
      });

      toast.success("OTP sent to your email 📩");
      setEmail(data.email);
      setOtpSent(true);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Email not found");
    } finally {
      setLoading(false);
    }
  };

 
  const verifyOtp = async (data) => {
    setLoading(true);
    try {
      await baseUrl.post("/user/verify-forget-otp", {
        email,
        otp: data.otp,
      });

      toast.success("OTP verified successfully ✅");
      navigate("/"); 
    } catch (err) {
      toast.error("Invalid OTP");
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
            Enter email and verify OTP
          </p>
        </div>

   
        <form
          onSubmit={handleSubmit(otpSent ? verifyOtp : sendOtp)}
          className="space-y-4"
        >
       
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              disabled={otpSent}
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-3 border rounded-xl disabled:bg-gray-100"
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

      
          {otpSent && (
            <div>
              <label className="text-sm font-semibold text-gray-700">
                OTP
              </label>
              <input
                placeholder="Enter OTP"
                className="mt-1 w-full px-4 py-3 border rounded-xl"
                {...register("otp", {
                  required: "OTP is required",
                })}
              />
            </div>
          )}

          <button
            disabled={loading}
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-extrabold"
          >
            {loading
              ? "Please wait..."
              : otpSent
              ? "Verify OTP"
              : "Send OTP"}
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