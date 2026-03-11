import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { icon:"🏠", label:"Home",            path:"/dashboard",      accent:"#e85d00" },
  { icon:"🔎", label:"Search Gym",      path:"/searchgym",      accent:"#0099cc" },
  { icon:"🧑‍🏫", label:"Trainer Profile", path:"/Trainerprofile", accent:"#7c3aed" },
  { icon:"🎫", label:"Membership",      path:"/membership",     accent:"#d97706" },
  { icon:"🥗", label:"About Dietitian", path:"/diets",          accent:"#16a34a" },
  { icon:"🛒", label:"Buy Supplements", path:"/SaleProduct",    accent:"#dc2626" },
  { icon:"🏙️", label:"Change City",     path:"/city",           accent:"#0099cc" },
  { icon:"👤", label:"My Profile",      path:"/profile",        accent:"#7c3aed" },
];

function Counter({ end, suffix="" }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let n=0;
    const step=Math.ceil(end/40);
    const t=setInterval(()=>{ n+=step; if(n>=end){setCount(end);clearInterval(t);}else setCount(n); },30);
    return ()=>clearInterval(t);
  },[end]);
  return <>{count}{suffix}</>;
}

function Sidebar({ navigate, activePath, user, expanded, setExpanded }) {
  const { logout } = useAuth();
  const [hovItem,   setHovItem]   = useState(null);
  const [hovLogout, setHovLogout] = useState(false);
  const initials = (user?.name||"BH").split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);

  const handleLogout = () => {
    if (logout) logout();
    else { localStorage.removeItem("token"); navigate("/login"); }
  };

  return (
    <aside style={{
      width: expanded ? "230px" : "66px",
      minHeight:"100vh", height:"100vh",
      background:"linear-gradient(180deg,#ffffff 0%,#f8f4f0 100%)",
      borderRight:"1px solid #e8ddd5",
      display:"flex", flexDirection:"column",
      transition:"width 0.38s cubic-bezier(.23,1,.32,1)",
      flexShrink:0, position:"sticky", top:0,
      zIndex:50, overflow:"hidden",
      boxShadow:"4px 0 24px rgba(232,93,0,0.08)",
    }}>

      {/* Top orange accent line */}
      <div style={{ height:"3px", background:"linear-gradient(90deg,#e85d00,#ff9950,transparent)", flexShrink:0 }} />

      {/* Subtle scan line */}
      <div style={{ position:"absolute", left:0, right:0, height:"50px", background:"linear-gradient(180deg,transparent,rgba(232,93,0,0.025),transparent)", animation:"lw-scan 7s linear infinite", pointerEvents:"none", zIndex:0 }} />

      {/* Right warm glow edge */}
      <div style={{ position:"absolute", top:0, right:0, width:"1px", height:"100%", background:"linear-gradient(180deg,transparent,rgba(232,93,0,0.3),transparent)", animation:"lw-sbglow 4s ease-in-out infinite" }} />

      {/* ── LOGO ── */}
      <div onClick={()=>setExpanded(e=>!e)} style={{
        padding: expanded ? "18px 18px" : "18px 0",
        borderBottom:"1px solid #f0e8e0",
        display:"flex", alignItems:"center", gap:"10px",
        justifyContent: expanded ? "flex-start" : "center",
        cursor:"pointer", userSelect:"none",
        position:"relative", zIndex:1, transition:"padding .3s",
      }}>
        <div style={{ width:"36px", height:"36px", borderRadius:"11px", flexShrink:0, background:"linear-gradient(135deg,#ff6b1a,#e85d00)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px", boxShadow:"0 4px 14px rgba(232,93,0,0.4)" }}>💀</div>
        {expanded && (
          <div style={{ animation:"lw-sb .3s both" }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"16px", letterSpacing:"2.5px", color:"#1a0a00", lineHeight:1 }}>BEAST HOUSE</div>
            <div style={{ color:"#e85d00", fontSize:"9px", letterSpacing:"2px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase", marginTop:"2px" }}>Fitness Studio</div>
          </div>
        )}
      </div>

      {/* ── NAV ── */}
      <nav style={{ flex:1, padding:"10px 7px", overflowY:"auto", overflowX:"hidden", position:"relative", zIndex:1 }}>
        {NAV_ITEMS.map((item,i) => {
          const isActive = activePath===item.path;
          const isHov    = hovItem===i;
          return (
            <div key={item.path}
              onClick={()=>navigate(item.path)}
              onMouseEnter={()=>setHovItem(i)}
              onMouseLeave={()=>setHovItem(null)}
              style={{
                display:"flex", alignItems:"center", gap:"11px",
                padding: expanded ? "10px 12px 10px 15px" : "10px 0",
                justifyContent: expanded ? "flex-start" : "center",
                borderRadius:"12px", cursor:"pointer", marginBottom:"2px",
                background: isActive
                  ? `linear-gradient(135deg,${item.accent}18,${item.accent}08)`
                  : isHov ? "#fdf3ec" : "transparent",
                border:`1px solid ${isActive ? item.accent+"40" : isHov ? item.accent+"22" : "transparent"}`,
                transition:"all .22s ease", position:"relative",
                boxShadow: isActive ? `0 2px 12px ${item.accent}18` : "none",
                transform: isHov&&!isActive ? "translateX(3px)" : "translateX(0)",
              }}>

              {/* Active left bar */}
              {isActive && (
                <div style={{ position:"absolute", left:0, top:"5px", bottom:"5px", width:"3px", borderRadius:"0 3px 3px 0", background:item.accent, boxShadow:`0 0 8px ${item.accent}80` }} />
              )}

              <span style={{
                fontSize:"17px", flexShrink:0, minWidth:"20px", textAlign:"center",
                filter: isActive ? `drop-shadow(0 0 4px ${item.accent}90)` : "none",
                transition:"filter .2s",
              }}>{item.icon}</span>

              {expanded && (
                <span style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:"13px", fontWeight:"700", letterSpacing:"0.5px", color: isActive ? item.accent : isHov ? "#3d1a00" : "#8a6a50", transition:"color .22s", whiteSpace:"nowrap" }}>
                  {item.label}
                </span>
              )}

              {/* Tooltip when collapsed */}
              {!expanded && isHov && (
                <div style={{ position:"absolute", left:"62px", top:"50%", transform:"translateY(-50%)", background:"#ffffff", border:`1px solid ${item.accent}30`, color:item.accent, padding:"5px 13px", borderRadius:"9px", fontSize:"12px", fontFamily:"'Rajdhani',sans-serif", fontWeight:"700", letterSpacing:"1px", whiteSpace:"nowrap", zIndex:999, boxShadow:"0 8px 24px rgba(0,0,0,0.10)", pointerEvents:"none" }}>
                  {item.label}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* ── DIVIDER ── */}
      <div style={{ margin:"0 10px", height:"1px", background:"linear-gradient(90deg,transparent,#e8ddd5,transparent)", flexShrink:0, position:"relative", zIndex:1 }} />

      {/* ── LOGOUT ── */}
      <div style={{ padding:"6px 7px", position:"relative", zIndex:1 }}>
        <div
          onClick={handleLogout}
          onMouseEnter={()=>setHovLogout(true)}
          onMouseLeave={()=>setHovLogout(false)}
          style={{
            display:"flex", alignItems:"center", gap:"11px",
            padding: expanded ? "10px 12px 10px 15px" : "10px 0",
            justifyContent: expanded ? "flex-start" : "center",
            borderRadius:"12px", cursor:"pointer",
            background: hovLogout ? "rgba(220,38,38,0.07)" : "transparent",
            border:`1px solid ${hovLogout ? "rgba(220,38,38,0.22)" : "transparent"}`,
            transition:"all .22s",
            transform: hovLogout ? "translateX(3px)" : "translateX(0)",
            position:"relative",
          }}>
          <span style={{ fontSize:"17px", flexShrink:0, minWidth:"20px", textAlign:"center" }}>🚪</span>
          {expanded && (
            <span style={{ color: hovLogout ? "#dc2626" : "#8a6a50", fontSize:"13px", fontFamily:"'Rajdhani',sans-serif", fontWeight:"700", letterSpacing:"0.5px", transition:"color .22s", whiteSpace:"nowrap" }}>Logout</span>
          )}
          {!expanded && hovLogout && (
            <div style={{ position:"absolute", left:"62px", top:"50%", transform:"translateY(-50%)", background:"#ffffff", border:"1px solid rgba(220,38,38,0.28)", color:"#dc2626", padding:"5px 13px", borderRadius:"9px", fontSize:"12px", fontFamily:"'Rajdhani',sans-serif", fontWeight:"700", letterSpacing:"1px", whiteSpace:"nowrap", zIndex:999, boxShadow:"0 8px 24px rgba(0,0,0,0.10)", pointerEvents:"none" }}>Logout</div>
          )}
        </div>
      </div>

      {/* ── USER BADGE ── */}
      <div style={{ margin:"0 8px 10px", position:"relative", zIndex:1 }}>
        {expanded ? (
          <div style={{ padding:"12px 13px", background:"linear-gradient(135deg,#fff5ee,#ffffff)", border:"1px solid #f0e0d0", borderRadius:"13px", boxShadow:"0 2px 10px rgba(232,93,0,0.07)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
              <div style={{ width:"32px", height:"32px", borderRadius:"50%", background:"linear-gradient(135deg,#ff6b1a,#e85d00)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px", fontFamily:"'Bebas Neue',sans-serif", color:"#fff", flexShrink:0, boxShadow:"0 2px 8px rgba(232,93,0,0.4)" }}>{initials}</div>
              <div>
                <div style={{ color:"#1a0a00", fontSize:"13px", fontWeight:"700", fontFamily:"'Rajdhani',sans-serif", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:"130px" }}>{user?.name||"Mynk"}</div>
                <div style={{ color:"#c4a882", fontSize:"10px", textTransform:"capitalize", fontFamily:"'Rajdhani',sans-serif", letterSpacing:"1px" }}>{user?.role||"member"}</div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display:"flex", justifyContent:"center", padding:"8px 0" }}>
            <div style={{ width:"32px", height:"32px", borderRadius:"50%", background:"linear-gradient(135deg,#ff6b1a,#e85d00)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px", fontFamily:"'Bebas Neue',sans-serif", color:"#fff", boxShadow:"0 2px 8px rgba(232,93,0,0.4)" }}>{initials}</div>
          </div>
        )}
      </div>
    </aside>
  );
}

function StatCard({ icon, label, value, suffix, sub, accent, delay }) {
  const [hov,setHov]=useState(false);
  const [tilt,setTilt]=useState({});
  const onMove=(e)=>{ const r=e.currentTarget.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width-0.5,y=(e.clientY-r.top)/r.height-0.5; setTilt({transform:`perspective(600px) rotateY(${x*16}deg) rotateX(${-y*16}deg) scale(1.04) translateY(-4px)`,transition:"transform .08s ease"}); };
  const onLeave=()=>{ setHov(false); setTilt({transform:"perspective(600px) rotateY(0) rotateX(0) scale(1) translateY(0)",transition:"transform .5s ease"}); };
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ background:hov?`linear-gradient(135deg,#fff,${accent}10)`:"#ffffff", border:`1px solid ${hov?accent+"50":"#ede5dc"}`, borderRadius:"18px", padding:"22px", cursor:"default", transition:"border .3s,box-shadow .3s,background .3s", boxShadow:hov?`0 20px 50px ${accent}25,0 4px 16px rgba(0,0,0,0.08)`:"0 2px 16px rgba(0,0,0,0.06)", animation:`lw-up .6s ${delay}s both`, position:"relative", overflow:"hidden", transformStyle:"preserve-3d", ...tilt }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:hov?`linear-gradient(90deg,transparent,${accent},transparent)`:"transparent", transition:"all .4s", boxShadow:hov?`0 0 12px ${accent}80`:"none" }} />
      <div style={{ fontSize:"26px", marginBottom:"10px", filter:hov?"drop-shadow(0 4px 8px rgba(0,0,0,0.15))":"none", transition:"filter .3s" }}>{icon}</div>
      <div style={{ color:"#c4a882", fontSize:"10px", letterSpacing:"2px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase", marginBottom:"3px" }}>{label}</div>
      <div style={{ color:"#1a0a00", fontSize:"28px", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"2px" }}>
        {typeof value==="number"?<Counter end={value} suffix={suffix}/>:value}
      </div>
      <div style={{ color:"#c4a882", fontSize:"11px", marginTop:"4px", fontFamily:"'Rajdhani',sans-serif" }}>{sub}</div>
    </div>
  );
}

function ActionBtn({ icon, label, sub, accent, onClick, delay=0 }) {
  const [hov,setHov]=useState(false);
  const [tilt,setTilt]=useState({});
  const onMove=(e)=>{ const r=e.currentTarget.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width-0.5,y=(e.clientY-r.top)/r.height-0.5; setTilt({transform:`perspective(500px) rotateY(${x*14}deg) rotateX(${-y*14}deg) scale(1.03) translateY(-3px)`,transition:"transform .08s ease"}); };
  const onLeave=()=>{ setHov(false); setTilt({transform:"perspective(500px) rotateY(0) rotateX(0) scale(1) translateY(0)",transition:"transform .45s ease"}); };
  return (
    <button onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ background:hov?`linear-gradient(135deg,${accent}15,${accent}05)`:"#ffffff", border:`1px solid ${hov?accent+"45":"#ede5dc"}`, borderRadius:"14px", padding:"16px 13px", cursor:"pointer", textAlign:"left", width:"100%", transition:"border .25s,background .25s,box-shadow .25s", boxShadow:hov?`0 12px 32px ${accent}22`:"0 1px 8px rgba(0,0,0,0.04)", animation:`lw-up .6s ${delay}s both`, transformStyle:"preserve-3d", position:"relative", overflow:"hidden", ...tilt }}>
      {hov&&<div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:`linear-gradient(90deg,transparent,${accent}70,transparent)` }}/>}
      <div style={{ fontSize:"19px", marginBottom:"5px" }}>{icon}</div>
      <div style={{ color:hov?accent:"#3d1a00", fontSize:"13px", fontWeight:"700", fontFamily:"'Rajdhani',sans-serif", letterSpacing:"0.8px", transition:"color .25s" }}>{label}</div>
      {sub&&<div style={{ color:"#c4a882", fontSize:"11px", marginTop:"2px", fontFamily:"'Rajdhani',sans-serif" }}>{sub}</div>}
    </button>
  );
}

function ProgressBar({ label, value, color, delay }) {
  const [w,setW]=useState(0);
  useEffect(()=>{ const t=setTimeout(()=>setW(value),700+delay*200); return()=>clearTimeout(t); },[]);
  return (
    <div style={{ marginBottom:"15px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
        <span style={{ color:"#8a6a50", fontSize:"11px", fontFamily:"'Rajdhani',sans-serif", letterSpacing:"1.5px", textTransform:"uppercase" }}>{label}</span>
        <span style={{ color, fontSize:"12px", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"1px" }}>{value}%</span>
      </div>
      <div style={{ height:"4px", background:"#f0e8e0", borderRadius:"4px", overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${w}%`, borderRadius:"4px", background:`linear-gradient(90deg,${color}90,${color})`, boxShadow:`0 0 8px ${color}60`, transition:"width 1.3s cubic-bezier(.23,1,.32,1)" }}/>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const [searchVal,       setSearchVal]       = useState("");
  const [time,            setTime]            = useState(new Date());
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [heroBg,          setHeroBg]          = useState({ x:50, y:50 });

  useEffect(()=>{ const t=setInterval(()=>setTime(new Date()),1000); return()=>clearInterval(t); },[]);

  const hours    = time.getHours();
  const greeting = hours<12?"MORNING GRIND":hours<17?"AFTERNOON HUSTLE":"EVENING BURN";
  const activePath = location?.pathname||"/dashboard";

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#f5efe8", color:"#1a0a00", fontFamily:"'Rajdhani',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;600;700&display=swap');
        @keyframes lw-up      { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes lw-sb      { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
        @keyframes lw-scan    { 0%{top:-10%} 100%{top:110%} }
        @keyframes lw-pulse   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.2)} }
        @keyframes lw-float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes lw-shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes lw-orb     { 0%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.1)} 66%{transform:translate(-15px,25px) scale(0.9)} 100%{transform:translate(0,0) scale(1)} }
        @keyframes lw-sbglow  { 0%,100%{opacity:.4} 50%{opacity:.9} }
        * { box-sizing:border-box; }
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:#f5efe8} ::-webkit-scrollbar-thumb{background:#e0d0c0;border-radius:4px}
        input::placeholder{color:#c4a882}
      `}</style>

      {/* BG ORBS */}
      <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"10%", right:"15%", width:"500px", height:"500px", background:"radial-gradient(circle,rgba(232,93,0,0.07) 0%,transparent 70%)", borderRadius:"50%", animation:"lw-orb 12s ease-in-out infinite" }}/>
        <div style={{ position:"absolute", bottom:"15%", left:"10%", width:"400px", height:"400px", background:"radial-gradient(circle,rgba(124,58,237,0.05) 0%,transparent 70%)", borderRadius:"50%", animation:"lw-orb 16s ease-in-out infinite reverse" }}/>
        <div style={{ position:"absolute", top:"50%", left:"40%", width:"300px", height:"300px", background:"radial-gradient(circle,rgba(22,163,74,0.04) 0%,transparent 70%)", borderRadius:"50%", animation:"lw-orb 20s ease-in-out infinite" }}/>
        <div style={{ position:"absolute", inset:0, opacity:.4, backgroundImage:`radial-gradient(circle,#e0c8b0 1px,transparent 1px)`, backgroundSize:"32px 32px" }}/>
      </div>

      {/* SIDEBAR */}
      <Sidebar navigate={navigate} activePath={activePath} user={user} expanded={sidebarExpanded} setExpanded={setSidebarExpanded}/>

      {/* MAIN */}
      <main style={{ flex:1, overflowY:"auto", overflowX:"hidden", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:"1140px", margin:"0 auto", padding:"26px 22px 48px" }}>

          {/* TOP BAR */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"26px", animation:"lw-up .5s 0s both", flexWrap:"wrap", gap:"12px" }}>
            <div>
              <div style={{ color:"#e85d00", fontSize:"10px", letterSpacing:"4px", textTransform:"uppercase", marginBottom:"4px", fontFamily:"'Rajdhani',sans-serif" }}>◈ {greeting}</div>
              <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(26px,4vw,46px)", letterSpacing:"3px", margin:0, lineHeight:1, color:"#1a0a00" }}>
                WELCOME BACK,{" "}
                <span style={{ color:"#e85d00", textShadow:"0 2px 20px rgba(232,93,0,0.25)" }}>
                  {(user?.name||"WARRIOR").toUpperCase()}
                </span>{" "}💀
              </h1>
            </div>
            <div style={{ textAlign:"right", background:"#fff", border:"1px solid #ede5dc", borderRadius:"14px", padding:"12px 18px", boxShadow:"0 4px 20px rgba(232,93,0,0.08)", animation:"lw-float 4s ease-in-out infinite" }}>
              <div style={{ color:"#e85d00", fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(18px,2.5vw,24px)", letterSpacing:"2px" }}>
                {time.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}
              </div>
              <div style={{ color:"#c4a882", fontSize:"10px", letterSpacing:"2px" }}>
                {time.toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short"}).toUpperCase()}
              </div>
            </div>
          </div>

          {/* HERO BANNER */}
          <div
            onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect();setHeroBg({x:((e.clientX-r.left)/r.width)*100,y:((e.clientY-r.top)/r.height)*100});}}
            style={{ position:"relative", background:`radial-gradient(ellipse at ${heroBg.x}% ${heroBg.y}%,rgba(232,93,0,0.12) 0%,transparent 60%),linear-gradient(135deg,#ffffff,#fff8f3 50%,#ffffff)`, border:"1px solid #f0e0ce", borderRadius:"22px", padding:"clamp(22px,3vw,36px)", marginBottom:"20px", overflow:"hidden", animation:"lw-up .55s .08s both", boxShadow:"0 8px 40px rgba(232,93,0,0.1),0 2px 12px rgba(0,0,0,0.05)", transition:"background .15s" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:"linear-gradient(90deg,transparent,#e85d00,#ff9950,transparent)", backgroundSize:"200% 100%", animation:"lw-shimmer 3s linear infinite", boxShadow:"0 0 12px rgba(232,93,0,0.4)" }}/>
            <div style={{ position:"absolute", left:0, right:0, height:"60px", background:"linear-gradient(180deg,transparent,rgba(232,93,0,0.03),transparent)", animation:"lw-scan 5s linear infinite", pointerEvents:"none" }}/>
            <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"280px", height:"280px", background:"radial-gradient(circle,rgba(232,93,0,0.08),transparent 70%)", borderRadius:"50%", pointerEvents:"none" }}/>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"22px", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ flex:1, minWidth:"230px" }}>
                <div style={{ color:"#e85d00", fontSize:"10px", letterSpacing:"3px", marginBottom:"8px", display:"flex", alignItems:"center", gap:"7px", fontFamily:"'Rajdhani',sans-serif" }}>
                  <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#e85d00", display:"inline-block", boxShadow:"0 0 8px rgba(232,93,0,0.6)", animation:"lw-pulse 2s infinite" }}/>
                  LIVE DASHBOARD
                </div>
                <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(22px,3.5vw,42px)", letterSpacing:"3px", margin:"0 0 8px", lineHeight:1, color:"#1a0a00" }}>
                  BEAST HOUSE <span style={{ color:"#e85d00" }}>FITNESS</span>
                </h2>
                <p style={{ color:"#8a6a50", fontSize:"13px", margin:"0 0 14px", letterSpacing:"1px" }}>Track workouts · Diet plans · Supplements · Progress</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"7px" }}>
                  {["✅ Verified Trainers","🏋️ Gym Plans","🥗 Diet Guides"].map(tag=>(
                    <span key={tag} style={{ background:"rgba(232,93,0,0.08)", border:"1px solid rgba(232,93,0,0.2)", color:"#c45000", padding:"4px 12px", borderRadius:"20px", fontSize:"11px", fontFamily:"'Rajdhani',sans-serif" }}>{tag}</span>
                  ))}
                </div>
              </div>
              <div style={{ background:"#fff", border:"1px solid #ede5dc", borderRadius:"16px", padding:"18px", width:"100%", maxWidth:"320px", boxShadow:"0 4px 20px rgba(0,0,0,0.06)" }}>
                <div style={{ color:"#c4a882", fontSize:"10px", letterSpacing:"2px", marginBottom:"10px", textTransform:"uppercase", fontFamily:"'Rajdhani',sans-serif" }}>⚡ Quick Search</div>
                <div style={{ display:"flex", gap:"9px" }}>
                  <input value={searchVal} onChange={e=>setSearchVal(e.target.value)} placeholder="Gyms, trainers, plans..."
                    style={{ flex:1, padding:"9px 13px", background:"#fdf8f4", border:"1px solid #e8ddd5", borderRadius:"10px", color:"#1a0a00", fontFamily:"'Rajdhani',sans-serif", fontSize:"13px", outline:"none" }}/>
                  <button style={{ padding:"9px 16px", background:"linear-gradient(135deg,#ff6b1a,#e85d00)", border:"none", borderRadius:"10px", color:"#fff", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"2px", cursor:"pointer", fontSize:"14px", boxShadow:"0 4px 14px rgba(232,93,0,0.4)" }}>GO</button>
                </div>
              </div>
            </div>
          </div>

          {/* STAT CARDS */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))", gap:"13px", marginBottom:"18px" }}>
            <StatCard icon="📍" label="Active City"   value="Hisar"  sub="Current location"  accent="#0099cc" delay={0.18}/>
            <StatCard icon="🏢" label="Verified Gyms" value={12} suffix="+" sub="Safe partners"   accent="#e85d00" delay={0.26}/>
            <StatCard icon="⭐" label="Gym Rating"    value="★★★★★" sub="Based on feedback" accent="#d97706" delay={0.34}/>
            <StatCard icon="🔥" label="Streak"        value={7} suffix=" days" sub="Keep going!"  accent="#dc2626" delay={0.42}/>
          </div>

          {/* QUICK ACTIONS + PROGRESS */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 285px", gap:"15px", marginBottom:"18px" }}>
            <div style={{ background:"#ffffff", border:"1px solid #ede5dc", borderRadius:"20px", padding:"24px", animation:"lw-up .6s .35s both", boxShadow:"0 4px 24px rgba(0,0,0,0.05)" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"18px", flexWrap:"wrap", gap:"8px" }}>
                <div>
                  <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"20px", letterSpacing:"2px", margin:0, color:"#1a0a00" }}>QUICK ACTIONS ⚡</h3>
                  <p style={{ color:"#c4a882", fontSize:"11px", margin:"3px 0 0", letterSpacing:"1px" }}>Fast access to all features</p>
                </div>
                <button onClick={()=>navigate("/profile")} style={{ background:"transparent", border:"1px solid #ede5dc", color:"#8a6a50", padding:"6px 13px", borderRadius:"9px", fontFamily:"'Rajdhani',sans-serif", fontSize:"11px", letterSpacing:"1px", cursor:"pointer" }}>VIEW PROFILE →</button>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"10px", marginBottom:"12px" }}>
                <ActionBtn icon="🔎" label="Search Gym"  sub="Find near you"  accent="#0099cc" onClick={()=>navigate("/searchgym")}      delay={0.45}/>
                <ActionBtn icon="🧑‍🏫" label="Trainers"   sub="Book session"   accent="#7c3aed" onClick={()=>navigate("/Trainerprofile")} delay={0.50}/>
                <ActionBtn icon="🥗" label="Diets"       sub="Meal plans"     accent="#16a34a" onClick={()=>navigate("/diets")}          delay={0.55}/>
                <ActionBtn icon="🛒" label="Supplements" sub="Whey, Creatine" accent="#e85d00" onClick={()=>navigate("/SaleProduct")}    delay={0.60}/>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
                <button onClick={()=>navigate("/city")} style={{ background:"#fdf8f4", border:"1px solid #ede5dc", borderRadius:"11px", color:"#8a6a50", padding:"12px", fontFamily:"'Rajdhani',sans-serif", fontSize:"12px", letterSpacing:"1px", cursor:"pointer" }}>🌍 CHANGE CITY</button>
                <button onClick={()=>navigate("/searchgym")} style={{ background:"linear-gradient(135deg,#ff6b1a,#e85d00)", border:"none", borderRadius:"11px", color:"#fff", padding:"12px", fontFamily:"'Bebas Neue',sans-serif", fontSize:"14px", letterSpacing:"2px", cursor:"pointer", boxShadow:"0 4px 18px rgba(232,93,0,0.35)" }}>🚀 FIND GYM NEAR ME</button>
              </div>
            </div>

            <div style={{ background:"#ffffff", border:"1px solid #ede5dc", borderRadius:"20px", padding:"24px", animation:"lw-up .6s .43s both", boxShadow:"0 4px 24px rgba(0,0,0,0.05)" }}>
              <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"18px", letterSpacing:"2px", margin:"0 0 3px", color:"#1a0a00" }}>WEEKLY PROGRESS 📈</h3>
              <p style={{ color:"#c4a882", fontSize:"11px", margin:"0 0 18px", letterSpacing:"1px" }}>Activity summary</p>
              <ProgressBar label="Workouts"    value={70} color="#e85d00" delay={0}/>
              <ProgressBar label="Diet Follow" value={55} color="#d97706" delay={1}/>
              <ProgressBar label="Hydration"   value={80} color="#0099cc" delay={2}/>
              <ProgressBar label="Sleep"       value={65} color="#7c3aed" delay={3}/>
              <button onClick={()=>navigate("/diets")} style={{ marginTop:"16px", width:"100%", background:"linear-gradient(135deg,#ff6b1a,#e85d00)", border:"none", borderRadius:"11px", color:"#fff", padding:"12px", fontFamily:"'Bebas Neue',sans-serif", fontSize:"14px", letterSpacing:"2px", cursor:"pointer", boxShadow:"0 4px 18px rgba(232,93,0,0.35)" }}>IMPROVE YOUR PLAN 💪</button>
            </div>
          </div>

          {/* ROLE PANELS */}
          {user?.role==="member" && (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 265px", gap:"15px", marginBottom:"18px", animation:"lw-up .6s .5s both" }}>
              <div style={{ background:"#ffffff", border:"1px solid #ede5dc", borderRadius:"20px", padding:"24px", boxShadow:"0 4px 24px rgba(0,0,0,0.05)" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"16px" }}>
                  <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"18px", letterSpacing:"2px", margin:0, color:"#1a0a00" }}>🏋️ MEMBER CONTROL</h3>
                  <span style={{ background:"rgba(232,93,0,0.08)", border:"1px solid rgba(232,93,0,0.2)", color:"#c45000", padding:"3px 11px", borderRadius:"20px", fontSize:"10px", letterSpacing:"1px", fontFamily:"'Rajdhani',sans-serif" }}>MEMBER</span>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
                  <ActionBtn icon="🔎" label="Find Gyms"       sub="Nearby with ratings" accent="#0099cc" onClick={()=>navigate("/searchgym")}      delay={0.6}/>
                  <ActionBtn icon="🧑‍🏫" label="Book Trainer"   sub="Best for you"        accent="#7c3aed" onClick={()=>navigate("/Trainerprofile")} delay={0.65}/>
                  <ActionBtn icon="🛒" label="Buy Supplements" sub="Whey, Creatine, Vits" accent="#16a34a" onClick={()=>navigate("/SaleProduct")}    delay={0.70}/>
                  <ActionBtn icon="🥗" label="Diet Plans"      sub="Fat loss / Muscle"    accent="#d97706" onClick={()=>navigate("/diets")}          delay={0.75}/>
                </div>
              </div>
              <div style={{ background:"#ffffff", border:"1px solid #ede5dc", borderRadius:"20px", padding:"24px", boxShadow:"0 4px 24px rgba(0,0,0,0.05)" }}>
                <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"17px", letterSpacing:"2px", margin:"0 0 3px", color:"#1a0a00" }}>RECENT ACTIVITY 🕒</h3>
                <p style={{ color:"#c4a882", fontSize:"10px", margin:"0 0 16px", letterSpacing:"1px" }}>Your last actions</p>
                {[
                  { icon:"🏋️", title:"Viewed Gold Gym",     time:"2 hours ago", color:"#0099cc" },
                  { icon:"🛒", title:"Checked Whey Protein", time:"Yesterday",   color:"#16a34a" },
                  { icon:"🥗", title:"Opened Diet Plan",     time:"2 days ago",  color:"#d97706" },
                ].map((item,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:"11px", marginBottom:"13px" }}>
                    <div style={{ width:"36px", height:"36px", borderRadius:"10px", background:`${item.color}12`, border:`1px solid ${item.color}28`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"15px", flexShrink:0 }}>{item.icon}</div>
                    <div>
                      <div style={{ color:"#3d1a00", fontSize:"12px", fontWeight:"700", fontFamily:"'Rajdhani',sans-serif" }}>{item.title}</div>
                      <div style={{ color:"#c4a882", fontSize:"10px", marginTop:"2px" }}>{item.time}</div>
                    </div>
                  </div>
                ))}
                <button onClick={()=>navigate("/searchgym")} style={{ width:"100%", background:"#fdf8f4", border:"1px solid #ede5dc", color:"#8a6a50", padding:"10px", borderRadius:"10px", fontFamily:"'Rajdhani',sans-serif", fontSize:"11px", letterSpacing:"1px", cursor:"pointer" }}>EXPLORE MORE →</button>
              </div>
            </div>
          )}

          {user?.role==="trainer" && (
            <div style={{ background:"#ffffff", border:"1px solid #ede5dc", borderRadius:"20px", padding:"24px", marginBottom:"18px", animation:"lw-up .6s .5s both", boxShadow:"0 4px 24px rgba(0,0,0,0.05)" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"16px" }}>
                <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"18px", letterSpacing:"2px", margin:0, color:"#1a0a00" }}>🧑‍🏫 TRAINER PANEL</h3>
                <span style={{ background:"rgba(124,58,237,0.08)", border:"1px solid rgba(124,58,237,0.2)", color:"#7c3aed", padding:"3px 11px", borderRadius:"20px", fontSize:"10px", letterSpacing:"1px", fontFamily:"'Rajdhani',sans-serif" }}>TRAINER</span>
              </div>
              <p style={{ color:"#8a6a50", fontSize:"12px", margin:"0 0 16px" }}>Manage clients, assign workout plans and track progress.</p>
              <div style={{ display:"flex", gap:"12px" }}>
                <button onClick={()=>navigate("/trainer/clients")}  style={{ flex:1, background:"linear-gradient(135deg,#9333ea,#7c3aed)", border:"none", borderRadius:"11px", color:"#fff", padding:"13px", fontFamily:"'Bebas Neue',sans-serif", fontSize:"15px", letterSpacing:"2px", cursor:"pointer", boxShadow:"0 4px 16px rgba(124,58,237,0.3)" }}>MY CLIENTS</button>
                <button onClick={()=>navigate("/trainer/workouts")} style={{ flex:1, background:"transparent", border:"1px solid rgba(124,58,237,0.3)", borderRadius:"11px", color:"#7c3aed", padding:"13px", fontFamily:"'Bebas Neue',sans-serif", fontSize:"15px", letterSpacing:"2px", cursor:"pointer" }}>WORKOUT PLANS</button>
              </div>
            </div>
          )}

          {user?.role==="admin" && (
            <div style={{ background:"#ffffff", border:"1px solid #ede5dc", borderRadius:"20px", padding:"24px", marginBottom:"18px", animation:"lw-up .6s .5s both", boxShadow:"0 4px 24px rgba(0,0,0,0.05)" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"16px" }}>
                <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"18px", letterSpacing:"2px", margin:0, color:"#1a0a00" }}>🛠 ADMIN PANEL</h3>
                <span style={{ background:"rgba(0,0,0,0.04)", border:"1px solid #e0d0c0", color:"#8a6a50", padding:"3px 11px", borderRadius:"20px", fontSize:"10px", letterSpacing:"1px", fontFamily:"'Rajdhani',sans-serif" }}>ADMIN</span>
              </div>
              <p style={{ color:"#8a6a50", fontSize:"12px", margin:"0 0 16px" }}>Control system — manage members, trainers, packages, payments.</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"12px" }}>
                <button onClick={()=>navigate("/admin/members")}  style={{ background:"linear-gradient(135deg,#0ea5e9,#0099cc)", border:"none", borderRadius:"11px", color:"#fff", padding:"13px", fontFamily:"'Bebas Neue',sans-serif", fontSize:"15px", letterSpacing:"2px", cursor:"pointer", boxShadow:"0 4px 14px rgba(0,153,204,0.3)" }}>MEMBERS</button>
                <button onClick={()=>navigate("/admin/trainers")} style={{ background:"linear-gradient(135deg,#9333ea,#7c3aed)", border:"none", borderRadius:"11px", color:"#fff", padding:"13px", fontFamily:"'Bebas Neue',sans-serif", fontSize:"15px", letterSpacing:"2px", cursor:"pointer", boxShadow:"0 4px 14px rgba(124,58,237,0.3)" }}>TRAINERS</button>
                <button onClick={()=>navigate("/admin/packages")} style={{ background:"linear-gradient(135deg,#ff6b1a,#e85d00)", border:"none", borderRadius:"11px", color:"#fff", padding:"13px", fontFamily:"'Bebas Neue',sans-serif", fontSize:"15px", letterSpacing:"2px", cursor:"pointer", boxShadow:"0 4px 14px rgba(232,93,0,0.35)" }}>PACKAGES</button>
              </div>
            </div>
          )}

          <div style={{ textAlign:"center", marginTop:"36px", color:"#e0d0c0", fontSize:"10px", letterSpacing:"2px", fontFamily:"monospace" }}>
            BEAST HOUSE © 2025 · SYSTEM ACTIVE · {time.toLocaleTimeString()}
          </div>
        </div>
      </main>
    </div>
  );
}