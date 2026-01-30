import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { baseUrl } from "../service/baseurl";

export default function VerifyOtp() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    const password = watch("newPassword");

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const verifyRes = await baseUrl.post("/user/verify-otp", {
                userName: email,
                otp: data.otp,
            });

            if (verifyRes.status === 200) {
                const userToken = verifyRes.data.token;

                const resetRes = await baseUrl.post("/user/reset-password", {
                    token: userToken,
                    newPassword: data.newPassword,
                });

                if (resetRes.status === 200) {
                    toast.success("Password reset successfully.");
                    navigate("/");
                } else {
                    toast.error(resetRes?.data?.messages?.[0] || "Password reset failed");
                }
            } else {
                toast.error("OTP verification failed");
            }

        } catch (error) {
            toast.error(
                error?.response?.data?.messages?.[0] || "Invalid OTP"
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
                        Verify OTP 🔑
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Enter OTP & set new password
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* OTP */}
                    <div>
                        <input
                            placeholder="Enter OTP"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("otp", { required: "OTP is required" })}
                        />
                        {errors.otp && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.otp.message}
                            </p>
                        )}
                    </div>

                    {/* New Password */}
                    <div>
                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("newPassword", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 characters",
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("confirmPassword", {
                                required: "Confirm your password",
                                validate: (value) =>
                                    value === password || "Passwords do not match",
                            })}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-extrabold hover:opacity-95 transition"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>

                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Back to{" "}
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
