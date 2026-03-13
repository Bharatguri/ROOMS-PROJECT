import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { baseUrl } from "../service/baseurl";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";


export default function Login() {
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [focused,  setFocused]  = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const { register, handleSubmit, formState:{ errors } } = useForm({ mode:"onChange" });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await baseUrl.post("/user/login", values);
      if (res.status === 200) {
        const token = res?.data?.token;
        if (token) localStorage.setItem("token", token);
        toast.success("Welcome back! 💪");
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed. Check credentials.");
    } finally { setLoading(false); }
  };

  const inputStyle = (name) => ({
    width:"100%",
    padding:"11px 14px 11px 38px",
    background: focused===name ? "#fff" : "#fdf8f4",
    border:`1.5px solid ${errors[name] ? "#dc2626" : focused===name ? "#e85d00" : "#ede5dc"}`,
    borderRadius:"11px",
    color:"#1a0a00",
    fontFamily:"'Rajdhani',sans-serif",
    fontSize:"14px", fontWeight:"600",
    outline:"none",
    boxShadow: focused===name ? "0 0 0 3px rgba(232,93,0,0.08)" : "none",
    transition:"all .22s",
    boxSizing:"border-box",
  });

  return (
    <AuthLayout title="Welcome Back 👋" subtitle="Login to continue your beast journey">
      <style>{`
        @keyframes lg-up  { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes al-spin{ from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes lg-shake{ 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-4px)} 40%,80%{transform:translateX(4px)} }
        input::placeholder{ color:#c4a882; font-weight:400; }
      `}</style>

      <div style={{ display:"flex", flexDirection:"column", gap:"clamp(9px,1.3vh,13px)", animation:"lg-up .4s both" }}>

        {/* ── EMAIL ── */}
        <div style={{ position:"relative" }}>
          <div style={{ color:"#c4a882", fontSize:"9px", letterSpacing:"2px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase", marginBottom:"5px", fontWeight:"700" }}>Email Address</div>
          <div style={{ position:"relative" }}>
            <span style={{ position:"absolute", left:"11px", top:"50%", transform:"translateY(-50%)", fontSize:"13px", pointerEvents:"none", zIndex:1 }}>📧</span>
            <input
              type="email"
              placeholder="your@email.com"
              style={inputStyle("email")}
              {...register("email",{ required:"Email is required", pattern:{ value:/^\S+@\S+\.\S+$/, message:"Invalid email" } })}
              onFocus={()=>setFocused("email")}
              onBlur={()=>setFocused(null)}
            />
          </div>
          {errors.email && (
            <div style={{ display:"flex", alignItems:"center", gap:"4px", marginTop:"4px" }}>
              <span style={{ width:"3px", height:"3px", borderRadius:"50%", background:"#dc2626", flexShrink:0 }}/>
              <p style={{ color:"#dc2626", fontSize:"10px", margin:0, fontFamily:"'Rajdhani',sans-serif", fontWeight:"600" }}>{errors.email.message}</p>
            </div>
          )}
        </div>

        {/* ── PASSWORD ── */}
        <div style={{ position:"relative" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"5px" }}>
            <div style={{ color:"#c4a882", fontSize:"9px", letterSpacing:"2px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase", fontWeight:"700" }}>Password</div>
            <button type="button" onClick={()=>navigate("/forgot-password")}
              style={{ background:"none", border:"none", cursor:"pointer", color:"#e85d00", fontSize:"10px", fontFamily:"'Rajdhani',sans-serif", fontWeight:"700", letterSpacing:"0.5px", padding:0, transition:"opacity .2s" }}
              onMouseEnter={e=>e.currentTarget.style.opacity=".7"}
              onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              Forgot Password?
            </button>
          </div>
          <div style={{ position:"relative" }}>
            <span style={{ position:"absolute", left:"11px", top:"50%", transform:"translateY(-50%)", fontSize:"13px", pointerEvents:"none", zIndex:1 }}>🔒</span>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter your password"
              style={{ ...inputStyle("password"), paddingRight:"38px" }}
              {...register("password",{ required:"Password is required", minLength:{ value:6, message:"Min 6 characters" } })}
              onFocus={()=>setFocused("password")}
              onBlur={()=>setFocused(null)}
            />
            <button type="button" onClick={()=>setShowPass(s=>!s)}
              style={{ position:"absolute", right:"11px", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", fontSize:"12px", color:"#c4a882", padding:0, zIndex:1 }}>
              {showPass ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.password && (
            <div style={{ display:"flex", alignItems:"center", gap:"4px", marginTop:"4px" }}>
              <span style={{ width:"3px", height:"3px", borderRadius:"50%", background:"#dc2626", flexShrink:0 }}/>
              <p style={{ color:"#dc2626", fontSize:"10px", margin:0, fontFamily:"'Rajdhani',sans-serif", fontWeight:"600" }}>{errors.password.message}</p>
            </div>
          )}
        </div>

        {/* ── REMEMBER ME ── */}
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          <label style={{ display:"flex", alignItems:"center", gap:"7px", cursor:"pointer" }}>
            <div style={{ position:"relative", width:"16px", height:"16px", flexShrink:0 }}>
              <input type="checkbox" style={{ position:"absolute", opacity:0, width:"100%", height:"100%", cursor:"pointer", margin:0 }}
                onChange={()=>{}}/>
              <div style={{ width:"16px", height:"16px", borderRadius:"4px", border:"1.5px solid #ede5dc", background:"#fdf8f4", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ color:"#e85d00", fontSize:"10px", lineHeight:1 }}>✓</span>
              </div>
            </div>
            <span style={{ color:"#8a6a50", fontSize:"11px", fontFamily:"'Rajdhani',sans-serif", fontWeight:"600" }}>Remember me</span>
          </label>
        </div>

        {/* ── LOGIN BUTTON ── */}
        <button
          type="button"
          disabled={loading}
          onClick={handleSubmit(onSubmit)}
          style={{
            width:"100%",
            padding:"clamp(10px,1.5vh,13px)",
            background: loading
              ? "#f0e0d0"
              : "linear-gradient(135deg,#ff6b1a,#e85d00)",
            border:"none", borderRadius:"12px",
            color: loading ? "#c4a882" : "#fff",
            fontFamily:"'Bebas Neue',sans-serif",
            fontSize:"clamp(14px,1.8vw,16px)", letterSpacing:"3px",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: loading ? "none" : "0 4px 18px rgba(232,93,0,0.4)",
            transition:"all .25s",
            display:"flex", alignItems:"center", justifyContent:"center", gap:"8px",
            position:"relative", overflow:"hidden",
          }}
          onMouseEnter={e=>{ if(!loading){ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(232,93,0,0.52)"; }}}
          onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=loading?"none":"0 4px 18px rgba(232,93,0,0.4)"; }}>
          {loading ? (
            <>
              <div style={{ width:"14px", height:"14px", border:"2px solid #c4a882", borderTopColor:"#e85d00", borderRadius:"50%", animation:"al-spin .7s linear infinite" }}/>
              LOGGING IN...
            </>
          ) : (
            <>💀 LOGIN TO BEAST HOUSE</>
          )}
        </button>

        {/* ── DIVIDER ── */}
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <div style={{ flex:1, height:"1px", background:"linear-gradient(90deg,transparent,#ede5dc)" }}/>
          <span style={{ color:"#c4a882", fontSize:"10px", fontFamily:"'Rajdhani',sans-serif", letterSpacing:"1.5px" }}>OR</span>
          <div style={{ flex:1, height:"1px", background:"linear-gradient(90deg,#ede5dc,transparent)" }}/>
        </div>

       

        {/* ── REGISTER LINK ── */}
        <p style={{ textAlign:"center", color:"#8a6a50", fontSize:"12px", fontFamily:"'Rajdhani',sans-serif", margin:0 }}>
          Don't have an account?{" "}
          <button type="button" onClick={()=>navigate("/register")}
            style={{ background:"none", border:"none", color:"#e85d00", fontWeight:"700", fontSize:"12px", fontFamily:"'Rajdhani',sans-serif", cursor:"pointer", borderBottom:"1px solid rgba(232,93,0,0.3)", padding:"0 1px", transition:"border-color .2s" }}
            onMouseEnter={e=>e.currentTarget.style.borderBottomColor="#e85d00"}
            onMouseLeave={e=>e.currentTarget.style.borderBottomColor="rgba(232,93,0,0.3)"}>
            Register Now →
          </button>
        </p>

      </div>
    </AuthLayout>
  );
}