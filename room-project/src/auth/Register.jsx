import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthLayout from "../components/AuthLayout";
import { signUp } from "../service/userservice";
import toast from "react-hot-toast";

const FITNESS_LEVELS = [
  { value:"beginner",     label:"🌱 Beginner",    sub:"Just starting" },
  { value:"intermediate", label:"💪 Intermediate", sub:"6+ months"     },
  { value:"advanced",     label:"🔥 Advanced",     sub:"2+ years"      },
  { value:"professional", label:"🏆 Pro",          sub:"Compete"       },
];

const F = {
  base: { width:"100%", padding:"9px 13px 9px 36px", background:"#fdf8f4", border:"1.5px solid #ede5dc", borderRadius:"9px", color:"#1a0a00", fontFamily:"'Rajdhani',sans-serif", fontSize:"13px", fontWeight:"600", outline:"none", transition:"border .2s,box-shadow .2s,background .2s", boxSizing:"border-box" },
  err:  { borderColor:"#dc2626", background:"rgba(220,38,38,0.03)" },
};

export default function Register() {
  const navigate = useNavigate();
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [step,     setStep]     = useState(1);

  const { register, handleSubmit, formState:{ errors }, watch, trigger } = useForm({ mode:"onChange" });

  const onSubmit = async (values) => {
    values.isOtp = false;
    setLoading(true);
    try {
      await signUp(values);
      toast.success("Account created! 💪");
      navigate("/dashboard");
    } catch (e) {
      toast.error("Registration failed");
    } finally { setLoading(false); }
  };

  const goStep2 = async () => {
    const ok = await trigger(["firstName","weight","height","email","password"]);
    if (ok) setStep(2);
  };

  const Field = ({ name, placeholder, type="text", icon, rules }) => {
    const isPass = name === "password";
    const hasErr = !!errors[name];
    return (
      <div style={{ position:"relative" }}>
        <span style={{ position:"absolute", left:"11px", top:"50%", transform:"translateY(-50%)", fontSize:"13px", pointerEvents:"none", zIndex:1, lineHeight:1 }}>{icon}</span>
        <input
          type={isPass ? (showPass?"text":"password") : type}
          placeholder={placeholder}
          {...register(name, rules)}
          style={{ ...F.base, ...(hasErr ? F.err : {}) }}
          onFocus={e=>{ e.target.style.borderColor="#e85d00"; e.target.style.boxShadow="0 0 0 3px rgba(232,93,0,0.08)"; e.target.style.background="#fff"; }}
          onBlur={e=>{  e.target.style.borderColor=hasErr?"#dc2626":"#ede5dc"; e.target.style.boxShadow="none"; e.target.style.background="#fdf8f4"; }}
        />
        {isPass && (
          <button type="button" onClick={()=>setShowPass(s=>!s)}
            style={{ position:"absolute", right:"10px", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", fontSize:"12px", color:"#c4a882", padding:0 }}>
            {showPass?"🙈":"👁️"}
          </button>
        )}
        {hasErr && <p style={{ color:"#dc2626", fontSize:"10px", margin:"3px 0 0 2px", fontFamily:"'Rajdhani',sans-serif", fontWeight:"600" }}>{errors[name].message}</p>}
      </div>
    );
  };

  const pwd = watch("password") || "";
  const strength = pwd.length >= 10 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) ? 3 : pwd.length >= 6 ? 2 : pwd.length > 0 ? 1 : 0;
  const sColor   = ["#ede5dc","#dc2626","#d97706","#16a34a"][strength];
  const sLabel   = ["","Weak","Medium","Strong"][strength];

  return (
    <AuthLayout title="Create Account" subtitle="Start your Beast House journey 💪">
      <style>{`
        @keyframes rg-up  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes al-spin{ from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        input::placeholder{ color:#c4a882; font-weight:400; }
        textarea::placeholder{ color:#c4a882; font-weight:400; }
      `}</style>

      {/* ── STEP BAR ── */}
      <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"clamp(10px,1.4vh,16px)" }}>
        {[1,2].map(s=>(
          <div key={s} style={{ display:"flex", alignItems:"center", gap:"6px", flex: s===1 ? 1 : "none" }}>
            <div style={{
              width:"24px", height:"24px", borderRadius:"50%", flexShrink:0,
              display:"flex", alignItems:"center", justifyContent:"center",
              background: step>=s ? "linear-gradient(135deg,#ff6b1a,#e85d00)" : "#fdf8f4",
              border:`1.5px solid ${step>=s?"#e85d00":"#ede5dc"}`,
              fontFamily:"'Bebas Neue',sans-serif", fontSize:"11px",
              color: step>=s ? "#fff" : "#c4a882",
              boxShadow: step>=s ? "0 2px 8px rgba(232,93,0,0.35)" : "none",
              transition:"all .3s",
            }}>{step>s?"✓":s}</div>
            <span style={{ color:step>=s?"#e85d00":"#c4a882", fontSize:"10px", fontFamily:"'Rajdhani',sans-serif", fontWeight:"700", letterSpacing:"1px", textTransform:"uppercase", whiteSpace:"nowrap" }}>
              {s===1?"Basic Info":"Fitness Profile"}
            </span>
            {s===1 && <div style={{ flex:1, height:"1.5px", background:`linear-gradient(90deg,${step>=2?"#e85d00":"#ede5dc"},transparent)`, borderRadius:"1px", transition:"background .4s" }}/>}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* ══ STEP 1 ══ */}
        {step===1 && (
          <div style={{ display:"flex", flexDirection:"column", gap:"8px", animation:"rg-up .35s both" }}>
            <Field name="firstName" placeholder="Full Name"      icon="👤" rules={{ required:"Name required", minLength:{ value:2, message:"Min 2 chars" } }}/>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
              <Field name="weight" placeholder="Weight (kg)" type="number" icon="⚖️" rules={{ required:"Required", min:{ value:20, message:"Min 20" } }}/>
              <Field name="height" placeholder="Height (cm)" type="number" icon="📏" rules={{ required:"Required", min:{ value:100, message:"Min 100" } }}/>
            </div>

            <Field name="email"    placeholder="Email Address" type="email" icon="📧" rules={{ required:"Email required", pattern:{ value:/^\S+@\S+\.\S+$/, message:"Invalid email" } }}/>
            <Field name="password" placeholder="Password"                   icon="🔒" rules={{ required:"Password required", minLength:{ value:6, message:"Min 6 chars" } }}/>

            {/* Password strength */}
            {strength > 0 && (
              <div style={{ marginTop:"-2px" }}>
                <div style={{ height:"2px", background:"#f0e8e0", borderRadius:"2px", overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${strength*33.3}%`, background:sColor, borderRadius:"2px", transition:"width .4s,background .4s" }}/>
                </div>
                <span style={{ color:sColor, fontSize:"9px", fontFamily:"'Rajdhani',sans-serif", fontWeight:"700", letterSpacing:"1px" }}>{sLabel} Password</span>
              </div>
            )}

            {/* Continue */}
            <button type="button" onClick={goStep2}
              style={{ width:"100%", padding:"10px", background:"linear-gradient(135deg,#ff6b1a,#e85d00)", border:"none", borderRadius:"10px", color:"#fff", fontFamily:"'Bebas Neue',sans-serif", fontSize:"15px", letterSpacing:"3px", cursor:"pointer", boxShadow:"0 4px 16px rgba(232,93,0,0.4)", transition:"all .25s", marginTop:"2px" }}
              onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 7px 20px rgba(232,93,0,0.5)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 16px rgba(232,93,0,0.4)"; }}>
              CONTINUE →
            </button>
          </div>
        )}

        {/* ══ STEP 2 ══ */}
        {step===2 && (
          <div style={{ display:"flex", flexDirection:"column", gap:"8px", animation:"rg-up .35s both" }}>

            {/* Fitness Level */}
            <div>
              <div style={{ color:"#c4a882", fontSize:"9px", letterSpacing:"2px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase", marginBottom:"6px" }}>Fitness Level</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px" }}>
                {FITNESS_LEVELS.map(lvl=>{
                  const sel = watch("level")===lvl.value;
                  return (
                    <label key={lvl.value} style={{ display:"block", cursor:"pointer", background:sel?"rgba(232,93,0,0.06)":"#fdf8f4", border:`1.5px solid ${sel?"#e85d00":"#ede5dc"}`, borderRadius:"9px", padding:"8px 10px", transition:"all .2s", boxShadow:sel?"0 2px 10px rgba(232,93,0,0.14)":"none" }}>
                      <input type="radio" value={lvl.value} {...register("level",{required:"Select a level"})} style={{ display:"none" }}/>
                      <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:"12px", fontWeight:"700", color:sel?"#e85d00":"#3d1a00", marginBottom:"1px" }}>{lvl.label}</div>
                      <div style={{ color:"#c4a882", fontSize:"9px" }}>{lvl.sub}</div>
                    </label>
                  );
                })}
              </div>
              {errors.level && <p style={{ color:"#dc2626", fontSize:"10px", margin:"3px 0 0", fontFamily:"'Rajdhani',sans-serif" }}>{errors.level.message}</p>}
            </div>

            {/* Goal textarea */}
            <div>
              <div style={{ color:"#c4a882", fontSize:"9px", letterSpacing:"2px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase", marginBottom:"6px" }}>Fitness Goal</div>
              <textarea rows={2} placeholder="e.g. Lose 10kg in 3 months and build muscle..."
                {...register("message",{ required:"Share your goal" })}
                style={{ width:"100%", padding:"9px 13px", background:"#fdf8f4", border:`1.5px solid ${errors.message?"#dc2626":"#ede5dc"}`, borderRadius:"9px", color:"#1a0a00", fontFamily:"'Rajdhani',sans-serif", fontSize:"12px", fontWeight:"600", outline:"none", resize:"none", boxSizing:"border-box", transition:"border .2s,box-shadow .2s" }}
                onFocus={e=>{ e.target.style.borderColor="#e85d00"; e.target.style.boxShadow="0 0 0 3px rgba(232,93,0,0.08)"; e.target.style.background="#fff"; }}
                onBlur={e=>{ e.target.style.borderColor=errors.message?"#dc2626":"#ede5dc"; e.target.style.boxShadow="none"; e.target.style.background="#fdf8f4"; }}
              />
              {errors.message && <p style={{ color:"#dc2626", fontSize:"10px", margin:"3px 0 0", fontFamily:"'Rajdhani',sans-serif" }}>{errors.message.message}</p>}
            </div>

            {/* Back + Submit */}
            <div style={{ display:"grid", gridTemplateColumns:"auto 1fr", gap:"8px", marginTop:"2px" }}>
              <button type="button" onClick={()=>setStep(1)}
                style={{ padding:"10px 16px", background:"transparent", border:"1.5px solid #ede5dc", borderRadius:"10px", color:"#8a6a50", fontFamily:"'Bebas Neue',sans-serif", fontSize:"14px", letterSpacing:"2px", cursor:"pointer", transition:"all .2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor="#e85d0055"; e.currentTarget.style.color="#e85d00"; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor="#ede5dc"; e.currentTarget.style.color="#8a6a50"; }}>
                ← BACK
              </button>
              <button type="submit" disabled={loading}
                style={{ padding:"10px", background:loading?"#f0e0d0":"linear-gradient(135deg,#ff6b1a,#e85d00)", border:"none", borderRadius:"10px", color:loading?"#c4a882":"#fff", fontFamily:"'Bebas Neue',sans-serif", fontSize:"14px", letterSpacing:"2.5px", cursor:loading?"not-allowed":"pointer", boxShadow:loading?"none":"0 4px 16px rgba(232,93,0,0.4)", transition:"all .25s", display:"flex", alignItems:"center", justifyContent:"center", gap:"7px" }}
                onMouseEnter={e=>{ if(!loading){ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 7px 20px rgba(232,93,0,0.5)"; }}}
                onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=loading?"none":"0 4px 16px rgba(232,93,0,0.4)"; }}>
                {loading ? (
                  <><div style={{ width:"13px", height:"13px", border:"2px solid #c4a882", borderTopColor:"#e85d00", borderRadius:"50%", animation:"al-spin .7s linear infinite" }}/>CREATING...</>
                ) : "CREATE ACCOUNT 💪"}
              </button>
            </div>
          </div>
        )}

        {/* Login link */}
        <p style={{ textAlign:"center", marginTop:"clamp(8px,1.2vh,14px)", color:"#8a6a50", fontSize:"12px", fontFamily:"'Rajdhani',sans-serif" }}>
          Already have an account?{" "}
          <Link to="/" style={{ color:"#e85d00", fontWeight:"700", textDecoration:"none", borderBottom:"1px solid rgba(232,93,0,0.3)" }}
            onMouseEnter={e=>e.target.style.borderBottomColor="#e85d00"}
            onMouseLeave={e=>e.target.style.borderBottomColor="rgba(232,93,0,0.3)"}>
            Login →
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}