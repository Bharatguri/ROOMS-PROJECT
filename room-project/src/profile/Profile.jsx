import { useState, useRef, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";

const C = {
  bg:       "#1c1f24",
  bgCard:   "#22262d",
  bgDeep:   "#181b20",
  border:   "#2e3340",
  cyan:     "#00c8ff",
  cyanDim:  "#00c8ff18",
  cyanMid:  "#00c8ff40",
  text:     "#e8edf5",
  textSub:  "#6b7585",
  textMute: "#3d4455",
  green:    "#34d399",
  gold:     "#fbbf24",
  purple:   "#a78bfa",
  red:      "#f87171",
};

function StatBadge({ label, value, icon, accent }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? `${accent}12` : C.bgDeep,
        border: `1px solid ${hov ? accent+"50" : C.border}`,
        borderRadius: "11px", padding: "14px 13px",
        transition: "all .28s ease",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hov ? `0 8px 24px ${accent}20` : "none",
        position: "relative", overflow: "hidden", cursor: "default",
      }}>
      {hov && <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px", background:`linear-gradient(90deg,transparent,${accent}70,transparent)` }} />}
      <div style={{ fontSize: "17px", marginBottom: "7px" }}>{icon}</div>
      <div style={{ color: C.textMute, fontSize: "10px", letterSpacing: "2px", fontFamily: "'Rajdhani',sans-serif", textTransform: "uppercase", marginBottom: "3px" }}>{label}</div>
      <div style={{ color: accent, fontSize: "14px", fontFamily: "'Bebas Neue',sans-serif", letterSpacing: "1.5px" }}>{value}</div>
    </div>
  );
}

function Divider({ label }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"10px", margin:"16px 0 13px" }}>
      <div style={{ flex:1, height:"1px", background:`linear-gradient(90deg,${C.border},transparent)` }} />
      <span style={{ color:C.textMute, fontSize:"10px", letterSpacing:"2.5px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase" }}>{label}</span>
      <div style={{ flex:1, height:"1px", background:`linear-gradient(90deg,transparent,${C.border})` }} />
    </div>
  );
}

export default function Profile3D() {
  const { user: authUser } = useAuth();
  const cardRef = useRef(null);
  const [rotation, setRotation]     = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [glowPos, setGlowPos]       = useState({ x: 50, y: 50 });
  const [tick, setTick]             = useState(0);

  const user = {
    name:        authUser?.name  || "Mynk",
    email:       authUser?.email || "mynk@gmail.com",
    gender:      "Male",
    weight:      "72 kg",
    height:      "175 cm",
    level:       authUser?.level || "Intermediate",
    description: "Morning jogging and yoga, followed by strength training and cardio at the gym. Evening cycling to stay active and consistent.",
  };

  const initials = user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  useEffect(() => {
    let frame;
    const loop = () => { setTick(t => t + 1); frame = requestAnimationFrame(loop); };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const r  = cardRef.current.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    const dx = (e.clientX - cx) / (r.width  / 2);
    const dy = (e.clientY - cy) / (r.height / 2);
    setRotation({ x: -dy * 13, y: dx * 13 });
    setGlowPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  }, []);

  const handleMouseLeave = () => { setIsHovering(false); setRotation({ x: 0, y: 0 }); };

  const floatY = Math.sin(tick * 0.025) * 7;

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: C.bg,
      fontFamily: "'Rajdhani',sans-serif",
      overflow: "hidden", position: "relative", padding: "24px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;600;700&display=swap');
        @keyframes pr-scan { 0%{top:-10%} 100%{top:110%} }
        @keyframes pr-dot  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.3)} }
        @keyframes pr-up   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pr-spin { to{transform:rotate(360deg)} }
      `}</style>

      {/* BG subtle grid */}
      <div style={{ position:"fixed", inset:0, zIndex:0, opacity:.022, backgroundImage:`repeating-linear-gradient(0deg,transparent,transparent 44px,${C.cyan} 44px,${C.cyan} 45px),repeating-linear-gradient(90deg,transparent,transparent 44px,${C.cyan} 44px,${C.cyan} 45px)` }} />

      {/* BG orbs */}
      <div style={{ position:"fixed", top:"12%", right:"8%", width:"380px", height:"380px", background:`radial-gradient(circle,${C.cyan}08 0%,transparent 70%)`, borderRadius:"50%", zIndex:0, pointerEvents:"none", transform:`translate(${Math.sin(tick*.018)*18}px,${Math.cos(tick*.014)*18}px)` }} />
      <div style={{ position:"fixed", bottom:"10%", left:"6%", width:"300px", height:"300px", background:`radial-gradient(circle,${C.purple}06 0%,transparent 70%)`, borderRadius:"50%", zIndex:0, pointerEvents:"none", transform:`translate(${Math.cos(tick*.016)*14}px,${Math.sin(tick*.013)*14}px)` }} />

      {/* Corner HUD */}
      <div style={{ position:"fixed", top:"14px", left:"16px", color:C.textMute, fontFamily:"monospace", fontSize:"10px", letterSpacing:"1.5px", zIndex:5 }}>SYS://PROFILE</div>
      <div style={{ position:"fixed", top:"14px", right:"16px", color:C.textMute, fontFamily:"monospace", fontSize:"10px", letterSpacing:"1.5px", zIndex:5 }}>{new Date().toLocaleTimeString()}</div>

      {/* ── 3D CARD ── */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: "1100px", zIndex: 10,
          transform: `translateY(${floatY}px)`,
          transition: isHovering ? "none" : "transform 0.8s ease",
          animation: "pr-up .5s .1s both",
        }}>
        <div style={{
          width: "min(460px, 92vw)",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isHovering ? "transform 0.1s ease" : "transform 0.7s cubic-bezier(.23,1,.32,1)",
          transformStyle: "preserve-3d",
          borderRadius: "18px",
          background: C.bgCard,
          border: `1px solid ${isHovering ? C.cyan+"45" : C.border}`,
          boxShadow: isHovering
            ? `0 30px 70px rgba(0,0,0,.7), 0 0 0 1px ${C.cyan}20, 0 0 40px ${C.cyan}10`
            : `0 16px 48px rgba(0,0,0,.55)`,
          overflow: "hidden", position: "relative",
        }}>

          {/* Top cyan line */}
          <div style={{ height:"2px", background:`linear-gradient(90deg,transparent,${C.cyan}90,transparent)`, boxShadow:`0 0 12px ${C.cyan}60` }} />

          {/* Scan line */}
          <div style={{ position:"absolute", left:0, right:0, height:"40px", background:`linear-gradient(180deg,transparent,${C.cyan}05,transparent)`, animation:"pr-scan 5s linear infinite", pointerEvents:"none", zIndex:1 }} />

          {/* Mouse glow */}
          {isHovering && (
            <div style={{ position:"absolute", width:"200px", height:"200px", background:`radial-gradient(circle,${C.cyan}10 0%,transparent 70%)`, borderRadius:"50%", left:`${glowPos.x}%`, top:`${glowPos.y}%`, transform:"translate(-50%,-50%)", pointerEvents:"none", zIndex:1, transition:"left .1s,top .1s" }} />
          )}

          <div style={{ padding:"26px", position:"relative", zIndex:2 }}>

            {/* ── HEADER ── */}
            <div style={{ display:"flex", alignItems:"center", gap:"18px", marginBottom:"6px" }}>

              {/* Avatar — initials only, spinning ring */}
              <div style={{ position:"relative", flexShrink:0 }}>
                {/* Spinning conic ring */}
                <div style={{
                  position:"absolute", inset:"-3px", borderRadius:"50%",
                  background:`conic-gradient(from ${tick*1.5}deg, ${C.cyan}, ${C.purple}, ${C.cyan})`,
                  boxShadow:`0 0 16px ${C.cyan}40`,
                }} />
                {/* Avatar circle */}
                <div style={{
                  width:"78px", height:"78px", borderRadius:"50%",
                  background:`linear-gradient(135deg, ${C.cyan}22, ${C.bgDeep})`,
                  border:`3px solid ${C.bgCard}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  position:"relative",
                  fontFamily:"'Bebas Neue',sans-serif",
                  fontSize:"28px", letterSpacing:"2px",
                  color: C.cyan,
                  boxShadow:`inset 0 0 20px ${C.cyan}10`,
                }}>
                  {initials}
                </div>
                {/* Online dot */}
                <div style={{ position:"absolute", bottom:"4px", right:"4px", width:"13px", height:"13px", background:C.green, borderRadius:"50%", border:`2px solid ${C.bgCard}`, boxShadow:`0 0 6px ${C.green}` }} />
              </div>

              {/* Name info */}
              <div style={{ flex:1 }}>
                <div style={{ color:C.textMute, fontSize:"10px", letterSpacing:"3px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase", marginBottom:"3px" }}>◈ FITNESS PROFILE</div>
                <h2 style={{ color:C.text, fontFamily:"'Bebas Neue',sans-serif", fontSize:"28px", letterSpacing:"2px", margin:"0 0 2px", lineHeight:1 }}>
                  {user.name.toUpperCase()}
                </h2>
                <p style={{ color:C.textSub, fontSize:"12px", margin:"0 0 9px", fontFamily:"'Rajdhani',sans-serif" }}>{user.email}</p>
                {/* Level badge */}
                <div style={{ display:"inline-flex", alignItems:"center", gap:"5px", background:C.cyanDim, border:`1px solid ${C.cyanMid}`, borderRadius:"5px", padding:"3px 10px" }}>
                  <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:C.cyan, boxShadow:`0 0 5px ${C.cyan}`, animation:"pr-dot 2s infinite" }} />
                  <span style={{ color:C.cyan, fontSize:"10px", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"1.5px" }}>{user.level.toUpperCase()}</span>
                </div>
              </div>
            </div>

            <Divider label="Stats" />

            {/* ── STAT BADGES ── */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"9px" }}>
              <StatBadge label="Gender"        value={user.gender} icon="⚤"  accent={C.cyan}   />
              <StatBadge label="Weight"        value={user.weight} icon="⚖️" accent={C.gold}   />
              <StatBadge label="Height"        value={user.height} icon="📏" accent={C.green}  />
              <StatBadge label="Fitness Level" value={user.level}  icon="🏆" accent={C.purple} />
            </div>

            <Divider label="Daily Activity" />

            {/* ── ACTIVITY ── */}
            <div style={{
              background: C.bgDeep, border:`1px solid ${C.border}`,
              borderRadius:"11px", padding:"13px 14px",
              position:"relative", overflow:"hidden", marginBottom:"18px",
            }}>
              <div style={{ position:"absolute", top:0, left:"15%", right:"15%", height:"1px", background:`linear-gradient(90deg,transparent,${C.cyan}35,transparent)` }} />
              <p style={{ color:C.textSub, fontSize:"12px", lineHeight:1.75, margin:0, fontFamily:"'Rajdhani',sans-serif", letterSpacing:"0.3px" }}>
                {user.description}
              </p>
            </div>

            {/* ── EDIT BUTTON ── */}
            <button
              style={{ width:"100%", padding:"12px", background:"transparent", border:`1px solid ${C.cyan}40`, borderRadius:"9px", color:C.cyan, fontFamily:"'Bebas Neue',sans-serif", fontSize:"14px", letterSpacing:"3px", cursor:"pointer", transition:"all .25s", boxShadow:`0 0 10px ${C.cyan}08` }}
              onMouseEnter={e=>{ e.currentTarget.style.background=`linear-gradient(135deg,${C.cyan},#0090cc)`; e.currentTarget.style.color="#000"; e.currentTarget.style.boxShadow=`0 4px 18px ${C.cyan}50`; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.color=C.cyan; e.currentTarget.style.boxShadow=`0 0 10px ${C.cyan}08`; e.currentTarget.style.transform="translateY(0)"; }}>
              EDIT PROFILE
            </button>

          </div>

          {/* Bottom line */}
          <div style={{ height:"1px", background:`linear-gradient(90deg,transparent,${C.border},transparent)` }} />
        </div>
      </div>

      {/* Footer */}
      <div style={{ position:"fixed", bottom:"14px", color:C.textMute, fontSize:"10px", letterSpacing:"1.5px", fontFamily:"monospace", zIndex:5 }}>
        BEAST HOUSE © 2025
      </div>
    </div>
  );
}