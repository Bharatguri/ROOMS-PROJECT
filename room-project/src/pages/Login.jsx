import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dumbbell, Eye, EyeOff, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
 
export default function GymLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
 
  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };
 
  return (
<div
      className={`min-h-screen grid grid-cols-1 md:grid-cols-2 transition-all duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-slate-900 to-slate-800 text-white"
          : "bg-gradient-to-br from-slate-100 to-slate-200"
      }`}
>
      {/* Left Branding Section */}
<div className="hidden md:flex flex-col justify-center items-center p-10">
<motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
>
<h1 className="text-5xl font-extrabold tracking-tight mb-4">Beast House 💀</h1>
<p className="text-lg opacity-80 max-w-md">
            Don’t compare yourself to others. Compare yourself to the person you were yesterday.
</p>
</motion.div>
</div>
 
      {/* Right Login Card */}
<div className="flex items-center justify-center p-6">
<motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
>
<Card className="w-[360px] rounded-2xl shadow-2xl">
<CardContent className="p-6 space-y-5">
              {/* Header */}
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<Dumbbell className="w-6 h-6" />
<h2 className="text-2xl font-semibold">Welcome Back</h2>
</div>
<button onClick={() => setDarkMode(!darkMode)}>
                  {darkMode ? <Sun /> : <Moon />}
</button>
</div>
 
              <p className="text-sm opacity-70">
                Login to continue building your best body
</p>
 
              {/* Inputs */}
<Input type="text" placeholder="Email or Mobile Number" />
 
              <div className="relative">
<Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
<button
                  type="button"
                  className="absolute right-3 top-2.5 opacity-60"
                  onClick={() => setShowPassword(!showPassword)}
>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
</button>
</div>
 
              {/* Forgot Password */}
<p className="text-sm text-right text-blue-500 cursor-pointer">
                Forgot password?
</p>
 
              {/* Login Button */}
<Button
                className="w-full rounded-xl text-base"
                onClick={handleLogin}
                disabled={loading}
>
                {loading ? "Logging in..." : "Login"}
</Button>
 
              {/* Register */}
<p className="text-sm text-center opacity-70">
                Don’t have an account? <span className="text-blue-600 cursor-pointer">Register</span>
</p>
</CardContent>
</Card>
</motion.div>
</div>
</div>
  );
}