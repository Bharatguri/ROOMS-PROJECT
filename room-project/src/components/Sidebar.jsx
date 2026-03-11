import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location  = useLocation();
  const navigate  = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [hovItem,   setHovItem]   = useState(null);
  const [hovLogout, setHovLogout] = useState(false);

  const initials = (user?.name || "BH").split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);

  const handleLogout = () => {
    if (logout) logout();
    else {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;600;700&display=swap');
        @keyframes sb-up   { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
        @keyframes sb-dot  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(1.4)} }
        @keyframes sb-scan { 0%{top:-10%} 100%{top:110%} }
        @keyframes sb-glow { 0%,100%{opacity:.4} 50%{opacity:.9} }
      `}</style>

      <div style={{
        position:"fixed", left:0, top:0,
        height:"100vh",
        width: collapsed ? "66px" : "230px",
        background:"linear-gradient(180deg,#ffffff 0%,#f8f4f0 100%)",
        borderRight:"1px solid #e8ddd5",
        display:"flex", flexDirection:"column",
        transition:"width .36s cubic-bezier(.23,1,.32,1)",
        zIndex:100, overflow:"hidden",
        boxShadow:"4px 0 24px rgba(232,93,0,0.08)",
      }}>

        {/* Top orange accent line */}
        <div style={{ height:"3px", background:"linear-gradient(90deg,#e85d00,#ff9950,transparent)", flexShrink:0 }} />

        {/* Subtle scan line */}
        <div style={{ position:"absolute", left:0, right:0, height:"50px", background:"linear-gradient(180deg,transparent,rgba(232,93,0,0.025),transparent)", animation:"sb-scan 7s linear infinite", pointerEvents:"none", zIndex:0 }} />

        {/* Right warm glow edge */}
        <div style={{ position:"absolute", top:0, right:0, width:"1px", height:"100%", background:"linear-gradient(180deg,transparent,rgba(232,93,0,0.3),transparent)", animation:"sb-glow 4s ease-in-out infinite" }} />

        {/* ── LOGO ── */}
        <div onClick={() => setCollapsed(c=>!c)} style={{
          padding: collapsed ? "18px 0" : "18px 18px",
          borderBottom:"1px solid #f0e8e0",
          cursor:"pointer", userSelect:"none",
          display:"flex", alignItems:"center", gap:"10px",
          justifyContent: collapsed ? "center" : "flex-start",
          position:"relative", zIndex:1,
          transition:"padding .3s",
        }}>
          <div style={{
            width:"36px", height:"36px", borderRadius:"11px", flexShrink:0,
            background:"linear-gradient(135deg,#ff6b1a,#e85d00)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:"18px", boxShadow:"0 4px 14px rgba(232,93,0,0.4)",
          }}>💀</div>
          {!collapsed && (
            <div style={{ animation:"sb-up .3s both" }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"16px", letterSpacing:"2.5px", color:"#1a0a00", lineHeight:1 }}>BEAST HOUSE</div>
              <div style={{ color:"#e85d00", fontSize:"9px", letterSpacing:"2px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase", marginTop:"2px" }}>Fitness Studio</div>
            </div>
          )}
        </div>

        {/* ── NAV ── */}
        <nav style={{ flex:1, padding:"10px 7px", display:"flex", flexDirection:"column", gap:"2px", position:"relative", zIndex:1, overflowY:"auto", overflowX:"hidden" }}>
          {NAV_ITEMS.map((item,i) => {
            const isActive = location.pathname === item.path;
            const isHov    = hovItem === item.path;
            return (
              <div key={item.path} style={{ position:"relative", animation:`sb-up .4s ${0.04+i*0.05}s both` }}>

                {/* Active left bar */}
                {isActive && (
                  <div style={{ position:"absolute", left:0, top:"5px", bottom:"5px", width:"3px", borderRadius:"0 3px 3px 0", background:item.accent, boxShadow:`0 0 8px ${item.accent}80`, zIndex:2 }} />
                )}

                {/* Tooltip when collapsed */}
                {collapsed && isHov && (
                  <div style={{
                    position:"absolute", left:"62px", top:"50%", transform:"translateY(-50%)",
                    background:"#ffffff", border:`1px solid ${item.accent}35`,
                    borderRadius:"9px", padding:"6px 13px",
                    color:item.accent, fontSize:"12px",
                    fontFamily:"'Rajdhani',sans-serif", fontWeight:"700",
                    letterSpacing:"1px", whiteSpace:"nowrap",
                    boxShadow:"0 8px 24px rgba(0,0,0,0.10)",
                    zIndex:200, pointerEvents:"none",
                  }}>
                    {item.label}
                  </div>
                )}

                <NavLink to={item.path}
                  onMouseEnter={() => setHovItem(item.path)}
                  onMouseLeave={() => setHovItem(null)}
                  style={{
                    display:"flex", alignItems:"center", gap:"11px",
                    padding: collapsed ? "10px 0" : "10px 12px 10px 15px",
                    justifyContent: collapsed ? "center" : "flex-start",
                    borderRadius:"12px",
                    background: isActive
                      ? `linear-gradient(135deg,${item.accent}18,${item.accent}08)`
                      : isHov ? "#fdf3ec" : "transparent",
                    border:`1px solid ${isActive ? item.accent+"40" : isHov ? item.accent+"25" : "transparent"}`,
                    textDecoration:"none",
                    transition:"all .22s ease",
                    transform: isHov && !isActive ? "translateX(3px)" : "translateX(0)",
                    boxShadow: isActive ? `0 2px 12px ${item.accent}18` : "none",
                  }}>
                  <span style={{
                    fontSize:"17px", flexShrink:0, minWidth:"20px", textAlign:"center",
                    filter: isActive ? `drop-shadow(0 0 4px ${item.accent}90)` : "none",
                    transition:"filter .2s",
                  }}>{item.icon}</span>
                  {!collapsed && (
                    <span style={{
                      color: isActive ? item.accent : isHov ? "#3d1a00" : "#8a6a50",
                      fontSize:"13px", fontFamily:"'Rajdhani',sans-serif",
                      fontWeight: isActive ? "700" : "600",
                      letterSpacing:"0.5px", transition:"color .22s", whiteSpace:"nowrap",
                    }}>{item.label}</span>
                  )}
                </NavLink>
              </div>
            );
          })}

          {/* Owner — My Properties */}
          {user?.role === "owner" && (() => {
            const isActive = location.pathname === "/owner/properties";
            const isHov    = hovItem === "/owner/properties";
            return (
              <div style={{ position:"relative", marginTop:"4px", animation:"sb-up .4s .5s both" }}>
                {isActive && <div style={{ position:"absolute", left:0, top:"5px", bottom:"5px", width:"3px", borderRadius:"0 3px 3px 0", background:"#d97706", boxShadow:"0 0 8px rgba(217,119,6,0.8)", zIndex:2 }} />}
                <NavLink to="/owner/properties"
                  onMouseEnter={()=>setHovItem("/owner/properties")}
                  onMouseLeave={()=>setHovItem(null)}
                  style={{
                    display:"flex", alignItems:"center", gap:"11px",
                    padding: collapsed ? "10px 0" : "10px 12px 10px 15px",
                    justifyContent: collapsed ? "center" : "flex-start",
                    borderRadius:"12px",
                    background: isActive ? "rgba(217,119,6,0.1)" : isHov ? "#fdf3ec" : "transparent",
                    border:`1px solid ${isActive ? "rgba(217,119,6,0.35)" : isHov ? "rgba(217,119,6,0.2)" : "transparent"}`,
                    textDecoration:"none", transition:"all .22s",
                    transform: isHov && !isActive ? "translateX(3px)" : "translateX(0)",
                  }}>
                  <span style={{ fontSize:"17px", flexShrink:0, minWidth:"20px", textAlign:"center" }}>🏢</span>
                  {!collapsed && <span style={{ color: isActive ? "#d97706" : isHov ? "#3d1a00" : "#8a6a50", fontSize:"13px", fontFamily:"'Rajdhani',sans-serif", fontWeight: isActive?"700":"600", letterSpacing:"0.5px", whiteSpace:"nowrap" }}>My Properties</span>}
                </NavLink>
              </div>
            );
          })()}
        </nav>

        {/* ── DIVIDER ── */}
        <div style={{ margin:"0 10px", height:"1px", background:"linear-gradient(90deg,transparent,#e8ddd5,transparent)", flexShrink:0, position:"relative", zIndex:1 }} />

        {/* ── LOGOUT BUTTON ── */}
        <div style={{ padding: collapsed ? "8px 7px" : "8px 7px", position:"relative", zIndex:1 }}>
          <div
            onClick={handleLogout}
            onMouseEnter={()=>setHovLogout(true)}
            onMouseLeave={()=>setHovLogout(false)}
            style={{
              display:"flex", alignItems:"center", gap:"11px",
              padding: collapsed ? "10px 0" : "10px 12px 10px 15px",
              justifyContent: collapsed ? "center" : "flex-start",
              borderRadius:"12px", cursor:"pointer",
              background: hovLogout ? "rgba(220,38,38,0.08)" : "transparent",
              border:`1px solid ${hovLogout ? "rgba(220,38,38,0.25)" : "transparent"}`,
              transition:"all .22s",
              transform: hovLogout ? "translateX(3px)" : "translateX(0)",
            }}>
            <span style={{ fontSize:"17px", flexShrink:0, minWidth:"20px", textAlign:"center" }}>🚪</span>
            {!collapsed && (
              <span style={{ color: hovLogout ? "#dc2626" : "#8a6a50", fontSize:"13px", fontFamily:"'Rajdhani',sans-serif", fontWeight:"600", letterSpacing:"0.5px", transition:"color .22s", whiteSpace:"nowrap" }}>Logout</span>
            )}
            {collapsed && hovLogout && (
              <div style={{ position:"absolute", left:"62px", top:"50%", transform:"translateY(-50%)", background:"#ffffff", border:"1px solid rgba(220,38,38,0.3)", borderRadius:"9px", padding:"6px 13px", color:"#dc2626", fontSize:"12px", fontFamily:"'Rajdhani',sans-serif", fontWeight:"700", letterSpacing:"1px", whiteSpace:"nowrap", boxShadow:"0 8px 24px rgba(0,0,0,0.10)", zIndex:200, pointerEvents:"none" }}>Logout</div>
            )}
          </div>
        </div>

        {/* ── USER BADGE ── */}
        <div style={{ margin:"0 8px 10px", position:"relative", zIndex:1 }}>
          <div style={{
            padding: collapsed ? "12px 0" : "12px 13px",
            background:"linear-gradient(135deg,#fff5ee,#ffffff)",
            border:"1px solid #f0e0d0",
            borderRadius:"13px",
            display:"flex", alignItems:"center", gap:"10px",
            justifyContent: collapsed ? "center" : "flex-start",
            boxShadow:"0 2px 10px rgba(232,93,0,0.07)",
          }}>
            {/* Avatar */}
            <div style={{
              width:"32px", height:"32px", borderRadius:"50%", flexShrink:0,
              background:"linear-gradient(135deg,#ff6b1a,#e85d00)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:"13px", fontFamily:"'Bebas Neue',sans-serif",
              color:"#fff", letterSpacing:"1px",
              boxShadow:"0 2px 8px rgba(232,93,0,0.4)",
            }}>{initials}</div>

            {!collapsed && (
              <div style={{ animation:"sb-up .3s both", overflow:"hidden" }}>
                <div style={{ color:"#1a0a00", fontSize:"13px", fontFamily:"'Rajdhani',sans-serif", fontWeight:"700", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:"130px" }}>
                  {user?.name || "Mynk"}
                </div>
                <div style={{ color:"#c4a882", fontSize:"10px", fontFamily:"'Rajdhani',sans-serif", letterSpacing:"1px", textTransform:"capitalize" }}>
                  {user?.role || "member"}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  );
}