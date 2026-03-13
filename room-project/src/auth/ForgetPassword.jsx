import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../service/baseurl";
import toast from "react-hot-toast";
import AuthLayout from "../components/AuthLayout";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [otpSent,  setOtpSent]  = useState(false);
  const [verified, setVerified] = useState(false);
  const [email,    setEmail]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [focused,  setFocused]  = useState(null);
  const [otp,      setOtp]      = useState(["","","","","",""]);

  const { register, handleSubmit, formState:{ errors } } = useForm();

  const sendOtp = async (data) => {
    setLoading(true);
    try {
      await baseUrl.post("/user/forget-password", { userName: data.email });
      toast.success("OTP sent to your email 📩");
      setEmail(data.email);
      setOtpSent(true);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Email not found");
    } finally { setLoading(false); }
  };

  const verifyOtp = async () => {
    const code = otp.join("");
    if (code.length < 6) { toast.error("Enter complete OTP"); return; }
    setLoading(true);
    try {
      await baseUrl.post("/user/verify-forget-otp", { email, otp: code });
      toast.success("OTP verified! ✅");
      setVerified(true);
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      toast.error("Invalid OTP. Try again.");
    } finally { setLoading(false); }
  };

  // OTP box handler
  const handleOtpChange = (val, idx) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    if (val && idx < 5) document.getElementById(`otp-${idx+1}`)?.focus();
  };
  const handleOtpKey = (e, idx) => {
    if (e.key==="Backspace" && !otp[idx] && idx > 0) document.getElementById(`otp-${idx-1}`)?.focus();
  };

  const inputStyle = (name) => ({
    width:"100%", padding:"11px 14px 11px 38px",
    background: focused===name ? "#fff" : "#fdf8f4",
    border:`1.5px solid ${errors[name] ? "#dc2626" : focused===name ? "#e85d00" : "#ede5dc"}`,
    borderRadius:"11px", color:"#1a0a00",
    fontFamily:"'Rajdhani',sans-serif", fontSize:"14px", fontWeight:"600",
    outline:"none", transition:"all .22s", boxSizing:"border-box",
    boxShadow: focused===name ? "0 0 0 3px rgba(232,93,0,0.08)" : "none",
    opacity: otpSent ? .6 : 1,
  });

  // Step indicator
  const steps = [
    { label:"Email",  icon:"📧", done: otpSent  },
    { label:"OTP",    icon:"🔢", done: verified  },
    { label:"Done",   icon:"✅", done: verified  },
  ];
  const currentStep = verified ? 2 : otpSent ? 1 : 0;

  return (
    <AuthLayout title="Reset Password 🔐" subtitle="Verify your identity to regain access">
      <style>{`
        @keyframes fp-up  { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes al-spin{ from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fp-pop { 0%{transform:scale(.85);opacity:0} 60%{transform:scale(1.05)} 100%{transform:scale(1);opacity:1} }
        @keyframes fp-success{ 0%{transform:scale(0) rotate(-20deg);opacity:0} 60%{transform:scale(1.15) rotate(5deg)} 100%{transform:scale(1) rotate(0deg);opacity:1} }
        input::placeholder{ color:#c4a882; font-weight:400; }
      `}</style>

      {/* ── STEP INDICATOR ── */}
      <div style={{ display:"flex", alignItems:"center", marginBottom:"clamp(12px,1.8vh,18px)" }}>
        {steps.map((s,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", flex: i<2 ? 1 : "none" }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"3px" }}>
              <div style={{
                width:"26px", height:"26px", borderRadius:"50%", flexShrink:0,
                display:"flex", alignItems:"center", justifyContent:"center",
                background: i<=currentStep ? "linear-gradient(135deg,#ff6b1a,#e85d00)" : "#fdf8f4",
                border:`1.5px solid ${i<=currentStep?"#e85d00":"#ede5dc"}`,
                fontSize:"11px",
                boxShadow: i===currentStep ? "0 2px 10px rgba(232,93,0,0.4)" : "none",
                transition:"all .4s",
              }}>{s.done ? "✓" : s.icon}</div>
              <span style={{ color:i<=currentStep?"#e85d00":"#c4a882", fontSize:"8px", fontFamily:"'Rajdhani',sans-serif", fontWeight:"700", letterSpacing:"1px", textTransform:"uppercase" }}>{s.label}</span>
            </div>
            {i < 2 && (
              <div style={{ flex:1, height:"1.5px", margin:"0 6px 14px", background:`linear-gradient(90deg,${i<currentStep?"#e85d00":"#ede5dc"},${i+1<=currentStep?"#e85d00":"#ede5dc"})`, transition:"background .4s" }}/>
            )}
          </div>
        ))}
      </div>

      {/* ── SUCCESS STATE ── */}
      {verified ? (
        <div style={{ textAlign:"center", padding:"20px 0", animation:"fp-success .6s both" }}>
          <div style={{ fontSize:"52px", marginBottom:"12px", display:"inline-block" }}>🎉</div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"22px", letterSpacing:"2px", color:"#1a0a00", marginBottom:"6px" }}>IDENTITY VERIFIED!</div>
          <p style={{ color:"#8a6a50", fontSize:"12px", fontFamily:"'Rajdhani',sans-serif" }}>Redirecting to login...</p>
          <div style={{ marginTop:"16px", height:"3px", background:"#f0e8e0", borderRadius:"3px", overflow:"hidden" }}>
            <div style={{ height:"100%", width:"100%", background:"linear-gradient(90deg,#e85d00,#ff9950)", borderRadius:"3px", animation:"fp-up 1.2s both" }}/>
          </div>
        </div>

      ) : !otpSent ? (
        /* ── STEP 1: EMAIL ── */
        <form onSubmit={handleSubmit(sendOtp)}>
          <div style={{ display:"flex", flexDirection:"column", gap:"clamp(10px,1.5vh,14px)", animation:"fp-up .4s both" }}>

            <div style={{ background:"rgba(232,93,0,0.05)", border:"1px solid rgba(232,93,0,0.15)", borderRadius:"10px", padding:"10px 13px", display:"flex", alignItems:"flex-start", gap:"8px" }}>
              <span style={{ fontSize:"14px", flexShrink:0 }}>💡</span>
              <p style={{ color:"#8a6a50", fontSize:"11px", fontFamily:"'Rajdhani',sans-serif", lineHeight:1.55, margin:0 }}>
                Enter your registered email. We'll send a 6-digit OTP to verify your identity.
              </p>
            </div>

            <div>
              <div style={{ color:"#c4a882", fontSize:"9px", letterSpacing:"2px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase", marginBottom:"5px", fontWeight:"700" }}>Email Address</div>
              <div style={{ position:"relative" }}>
                <span style={{ position:"absolute", left:"11px", top:"50%", transform:"translateY(-50%)", fontSize:"13px", pointerEvents:"none", zIndex:1 }}>📧</span>
                <input type="email" placeholder="your@email.com" style={inputStyle("email")}
                  {...register("email",{ required:"Email is required", pattern:{ value:/^\S+@\S+\.\S+$/, message:"Invalid email" } })}
                  onFocus={()=>setFocused("email")} onBlur={()=>setFocused(null)}/>
              </div>
              {errors.email && <p style={{ color:"#dc2626", fontSize:"10px", margin:"4px 0 0", fontFamily:"'Rajdhani',sans-serif", fontWeight:"600" }}>{errors.email.message}</p>}
            </div>

            <button type="submit" disabled={loading}
              style={{ width:"100%", padding:"11px", background:loading?"#f0e0d0":"linear-gradient(135deg,#ff6b1a,#e85d00)", border:"none", borderRadius:"11px", color:loading?"#c4a882":"#fff", fontFamily:"'Bebas Neue',sans-serif", fontSize:"15px", letterSpacing:"3px", cursor:loading?"not-allowed":"pointer", boxShadow:loading?"none":"0 4px 16px rgba(232,93,0,0.4)", transition:"all .25s", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" }}
              onMouseEnter={e=>{ if(!loading){ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 7px 20px rgba(232,93,0,0.5)"; }}}
              onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=loading?"none":"0 4px 16px rgba(232,93,0,0.4)"; }}>
              {loading
                ? <><div style={{ width:"13px", height:"13px", border:"2px solid #c4a882", borderTopColor:"#e85d00", borderRadius:"50%", animation:"al-spin .7s linear infinite" }}/>SENDING OTP...</>
                : <>📩 SEND OTP</>}
            </button>
          </div>
        </form>

      ) : (
        /* ── STEP 2: OTP ── */
        <div style={{ display:"flex", flexDirection:"column", gap:"clamp(10px,1.5vh,14px)", animation:"fp-pop .4s both" }}>

          {/* Email confirmed strip */}
          <div style={{ background:"rgba(22,163,74,0.06)", border:"1px solid rgba(22,163,74,0.2)", borderRadius:"10px", padding:"9px 13px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"7px" }}>
              <span style={{ fontSize:"12px" }}>✅</span>
              <span style={{ color:"#16a34a", fontSize:"11px", fontFamily:"'Rajdhani',sans-serif", fontWeight:"700" }}>OTP sent to</span>
              <span style={{ color:"#1a0a00", fontSize:"11px", fontFamily:"'Rajdhani',sans-serif", fontWeight:"700" }}>{email}</span>
            </div>
            <button type="button" onClick={()=>{ setOtpSent(false); setOtp(["","","","","",""]); }}
              style={{ background:"none", border:"none", color:"#e85d00", fontSize:"10px", fontFamily:"'Rajdhani',sans-serif", fontWeight:"700", cursor:"pointer", letterSpacing:"0.5px" }}>
              CHANGE
            </button>
          </div>

          {/* OTP boxes */}
          <div>
            <div style={{ color:"#c4a882", fontSize:"9px", letterSpacing:"2px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase", marginBottom:"10px", fontWeight:"700" }}>Enter 6-digit OTP</div>
            <div style={{ display:"flex", gap:"7px", justifyContent:"center" }}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text" inputMode="numeric" maxLength={1}
                  value={digit}
                  onChange={e=>handleOtpChange(e.target.value, idx)}
                  onKeyDown={e=>handleOtpKey(e, idx)}
                  onFocus={()=>setFocused(`otp-${idx}`)}
                  onBlur={()=>setFocused(null)}
                  style={{
                    width:"40px", height:"48px",
                    textAlign:"center",
                    fontFamily:"'Bebas Neue',sans-serif", fontSize:"22px", letterSpacing:"1px",
                    background: digit ? "rgba(232,93,0,0.06)" : focused===`otp-${idx}` ? "#fff" : "#fdf8f4",
                    border:`2px solid ${digit ? "#e85d00" : focused===`otp-${idx}` ? "#e85d00" : "#ede5dc"}`,
                    borderRadius:"11px", color:"#1a0a00",
                    outline:"none",
                    boxShadow: focused===`otp-${idx}` ? "0 0 0 3px rgba(232,93,0,0.08)" : digit ? "0 2px 8px rgba(232,93,0,0.2)" : "none",
                    transition:"all .2s",
                  }}
                />
              ))}
            </div>
            {/* OTP progress dots */}
            <div style={{ display:"flex", justifyContent:"center", gap:"4px", marginTop:"8px" }}>
              {otp.map((d,i) => (
                <div key={i} style={{ width:"4px", height:"4px", borderRadius:"50%", background:d?"#e85d00":"#ede5dc", transition:"background .2s" }}/>
              ))}
            </div>
          </div>

          {/* Verify button */}
          <button type="button" onClick={verifyOtp} disabled={loading || otp.join("").length < 6}
            style={{ width:"100%", padding:"11px", background: otp.join("").length<6 ? "#f0e8e0" : loading ? "#f0e0d0" : "linear-gradient(135deg,#ff6b1a,#e85d00)", border:"none", borderRadius:"11px", color: otp.join("").length<6 ? "#c4a882" : loading ? "#c4a882" : "#fff", fontFamily:"'Bebas Neue',sans-serif", fontSize:"15px", letterSpacing:"3px", cursor: otp.join("").length<6||loading ? "not-allowed" : "pointer", boxShadow: otp.join("").length>=6&&!loading ? "0 4px 16px rgba(232,93,0,0.4)" : "none", transition:"all .25s", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" }}
            onMouseEnter={e=>{ if(otp.join("").length>=6&&!loading){ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 7px 20px rgba(232,93,0,0.5)"; }}}
            onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; }}>
            {loading
              ? <><div style={{ width:"13px", height:"13px", border:"2px solid #c4a882", borderTopColor:"#e85d00", borderRadius:"50%", animation:"al-spin .7s linear infinite" }}/>VERIFYING...</>
              : <>🔓 VERIFY OTP</>}
          </button>

          {/* Resend */}
          <p style={{ textAlign:"center", color:"#c4a882", fontSize:"11px", fontFamily:"'Rajdhani',sans-serif", margin:0 }}>
            Didn't receive?{" "}
            <button type="button" onClick={()=>{ setOtpSent(false); setOtp(["","","","","",""]); toast("Re-enter email to resend 📩"); }}
              style={{ background:"none", border:"none", color:"#e85d00", fontWeight:"700", fontSize:"11px", fontFamily:"'Rajdhani',sans-serif", cursor:"pointer", borderBottom:"1px solid rgba(232,93,0,0.3)", padding:"0 1px" }}>
              Resend OTP
            </button>
          </p>
        </div>
      )}

      {/* Login link */}
      <p style={{ textAlign:"center", marginTop:"clamp(10px,1.5vh,16px)", color:"#8a6a50", fontSize:"12px", fontFamily:"'Rajdhani',sans-serif" }}>
        Remember password?{" "}
        <button type="button" onClick={()=>navigate("/")}
          style={{ background:"none", border:"none", color:"#e85d00", fontWeight:"700", fontSize:"12px", fontFamily:"'Rajdhani',sans-serif", cursor:"pointer", borderBottom:"1px solid rgba(232,93,0,0.3)", padding:"0 1px" }}
          onMouseEnter={e=>e.currentTarget.style.borderBottomColor="#e85d00"}
          onMouseLeave={e=>e.currentTarget.style.borderBottomColor="rgba(232,93,0,0.3)"}>
          Login →
        </button>
      </p>

    </AuthLayout>
  );
}