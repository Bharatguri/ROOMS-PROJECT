import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";

const CITIES = [
  { name: "Delhi",       emoji: "🏛️", tag: "Capital",   accent: "#e85d00", pop: "3.2 Cr+", gyms: "240+" },
  { name: "Mumbai",      emoji: "🌊", tag: "Financial",  accent: "#0099cc", pop: "2.1 Cr+", gyms: "180+" },
  { name: "Jaipur",      emoji: "🏯", tag: "Pink City",  accent: "#d97706", pop: "35 Lakh", gyms: "85+"  },
  { name: "Pune",        emoji: "🎓", tag: "Education",  accent: "#7c3aed", pop: "42 Lakh", gyms: "110+" },
  { name: "Chandigarh",  emoji: "🌿", tag: "Planned",    accent: "#16a34a", pop: "12 Lakh", gyms: "60+"  },
  { name: "Ahmedabad",   emoji: "🏙️", tag: "Industrial", accent: "#dc2626", pop: "80 Lakh", gyms: "130+" },
  { name: "Hisar",       emoji: "📍", tag: "Your City",  accent: "#e85d00", pop: "3 Lakh",  gyms: "28+"  },
  { name: "Bangalore",   emoji: "💻", tag: "Tech Hub",   accent: "#0099cc", pop: "1.3 Cr+", gyms: "200+" },
  { name: "Hyderabad",   emoji: "💊", tag: "Pharma",     accent: "#16a34a", pop: "1.0 Cr+", gyms: "155+" },
];

function CityCard({ city, selected, onSelect, delay }) {
  const isSel = selected === city.name;
  const [tilt, setTilt] = useState({});
  const [hov,  setHov]  = useState(false);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    setTilt({ transform:`perspective(600px) rotateY(${x*14}deg) rotateX(${-y*14}deg) scale(1.04) translateY(-5px)`, transition:"transform .08s ease" });
  };
  const onLeave = () => {
    setHov(false);
    setTilt({ transform:"perspective(600px) rotateY(0) rotateX(0) scale(1) translateY(0)", transition:"transform .5s ease" });
  };

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={() => onSelect(city.name)}
      style={{
        background: isSel
          ? `linear-gradient(135deg,${city.accent}12,${city.accent}05)`
          : hov ? `linear-gradient(135deg,#fff,${city.accent}08)` : "#ffffff",
        border: `1px solid ${isSel ? city.accent+"60" : hov ? city.accent+"35" : "#ede5dc"}`,
        borderRadius: "18px", padding: "20px 18px",
        cursor: "pointer", position: "relative", overflow: "hidden",
        transition: "border .25s, box-shadow .25s, background .25s",
        boxShadow: isSel
          ? `0 0 0 1px ${city.accent}25, 0 16px 40px ${city.accent}20`
          : hov ? `0 16px 40px rgba(0,0,0,0.10)` : "0 2px 12px rgba(0,0,0,0.05)",
        transformStyle: "preserve-3d",
        animation: `ct-up .55s ${delay}s both`,
        ...tilt,
      }}>

      {/* Top accent line */}
      {(hov || isSel) && (
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:`linear-gradient(90deg,transparent,${city.accent},transparent)`, boxShadow:`0 0 10px ${city.accent}60` }} />
      )}

      {/* Selected checkmark */}
      {isSel && (
        <div style={{ position:"absolute", top:"12px", right:"12px", width:"22px", height:"22px", borderRadius:"50%", background:`linear-gradient(135deg,${city.accent},${city.accent}cc)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", boxShadow:`0 2px 8px ${city.accent}50` }}>✓</div>
      )}

      {/* Your City tag */}
      {city.tag === "Your City" && (
        <div style={{ position:"absolute", top:"12px", right: isSel ? "42px" : "12px", background:`${city.accent}18`, border:`1px solid ${city.accent}35`, borderRadius:"5px", padding:"2px 7px", fontSize:"9px", fontFamily:"'Rajdhani',sans-serif", letterSpacing:"1.5px", color:city.accent, textTransform:"uppercase" }}>Current</div>
      )}

      {/* Emoji */}
      <div style={{ fontSize:"30px", marginBottom:"10px", filter: hov||isSel ? `drop-shadow(0 4px 8px ${city.accent}40)` : "none", transition:"filter .3s" }}>{city.emoji}</div>

      {/* Tag */}
      <div style={{ display:"inline-block", background:`${city.accent}12`, border:`1px solid ${city.accent}25`, borderRadius:"4px", padding:"2px 8px", fontSize:"9px", fontFamily:"'Rajdhani',sans-serif", letterSpacing:"1.5px", color:city.accent, textTransform:"uppercase", marginBottom:"6px" }}>{city.tag}</div>

      {/* City name */}
      <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"22px", letterSpacing:"2px", margin:"0 0 10px", color:"#1a0a00", lineHeight:1 }}>{city.name}</h3>

      {/* Stats row */}
      <div style={{ display:"flex", gap:"8px" }}>
        <div style={{ flex:1, background:"#fdf8f4", border:"1px solid #ede5dc", borderRadius:"8px", padding:"6px 8px", textAlign:"center" }}>
          <div style={{ color:city.accent, fontFamily:"'Bebas Neue',sans-serif", fontSize:"13px", letterSpacing:"0.5px" }}>{city.gyms}</div>
          <div style={{ color:"#c4a882", fontSize:"9px", fontFamily:"'Rajdhani',sans-serif", letterSpacing:"1px", textTransform:"uppercase" }}>Gyms</div>
        </div>
        <div style={{ flex:1, background:"#fdf8f4", border:"1px solid #ede5dc", borderRadius:"8px", padding:"6px 8px", textAlign:"center" }}>
          <div style={{ color:"#8a6a50", fontFamily:"'Bebas Neue',sans-serif", fontSize:"13px", letterSpacing:"0.5px" }}>{city.pop}</div>
          <div style={{ color:"#c4a882", fontSize:"9px", fontFamily:"'Rajdhani',sans-serif", letterSpacing:"1px", textTransform:"uppercase" }}>Pop</div>
        </div>
      </div>
    </div>
  );
}

export default function City() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Hisar");

  const activeCity = CITIES.find(c => c.name === selected);

  const handleConfirm = () => {
    alert(`✅ City set to: ${selected}`);
    navigate("/dashboard");
  };

  return (
    <DashboardLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;600;700&display=swap');
        @keyframes ct-up  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ct-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(1.3)} }
      `}</style>

      {/* PAGE HEADER */}
      <div style={{
        background: "#ffffff", border: "1px solid #ede5dc",
        borderRadius: "18px", padding: "22px 26px",
        marginBottom: "20px", position: "relative", overflow: "hidden",
        animation: "ct-up .45s 0s both",
        boxShadow: "0 2px 14px rgba(0,0,0,0.05)",
      }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:"linear-gradient(90deg,#e85d00,#ff9950,transparent)" }} />
        <div style={{ position:"absolute", top:"-30px", right:"-30px", width:"160px", height:"160px", background:"radial-gradient(circle,rgba(232,93,0,0.07),transparent 70%)", borderRadius:"50%", pointerEvents:"none" }} />

        <div style={{ position:"relative" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"6px" }}>
            <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#e85d00", display:"inline-block", boxShadow:"0 0 5px rgba(232,93,0,0.7)", animation:"ct-dot 2s infinite" }} />
            <span style={{ color:"#e85d00", fontSize:"10px", letterSpacing:"3px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase" }}>Beast House</span>
          </div>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(22px,4vw,36px)", letterSpacing:"3px", margin:"0 0 5px", color:"#1a0a00", lineHeight:1 }}>
            SELECT YOUR <span style={{ color:"#e85d00" }}>CITY 📍</span>
          </h2>
          <p style={{ color:"#8a6a50", fontSize:"12px", margin:0, maxWidth:"480px", lineHeight:1.6 }}>
            Choose your city to find verified gyms, certified trainers and the best fitness plans near you.
          </p>
        </div>
      </div>

      {/* CITY GRID */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"13px", marginBottom:"18px" }}>
        {CITIES.map((city, i) => (
          <CityCard key={city.name} city={city} selected={selected} onSelect={setSelected} delay={0.06 + i * 0.07} />
        ))}
      </div>

      {/* BOTTOM CTA */}
      <div style={{
        background: "#ffffff", border: `1px solid ${activeCity.accent}35`,
        borderRadius: "16px", padding: "18px 22px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: "14px",
        animation: "ct-up .55s .65s both",
        boxShadow: `0 4px 20px ${activeCity.accent}12`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:`linear-gradient(90deg,${activeCity.accent}80,transparent)` }} />
        <div style={{ display:"flex", alignItems:"center", gap:"13px" }}>
          <div style={{ width:"42px", height:"42px", borderRadius:"12px", flexShrink:0, background:`${activeCity.accent}12`, border:`1px solid ${activeCity.accent}28`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px" }}>{activeCity.emoji}</div>
          <div>
            <div style={{ color:"#c4a882", fontSize:"10px", letterSpacing:"2px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase", marginBottom:"2px" }}>Selected City</div>
            <div style={{ color:activeCity.accent, fontFamily:"'Bebas Neue',sans-serif", fontSize:"20px", letterSpacing:"2px", lineHeight:1 }}>
              {activeCity.name} — {activeCity.gyms} Gyms
            </div>
            <div style={{ color:"#8a6a50", fontSize:"11px", fontFamily:"'Rajdhani',sans-serif", marginTop:"2px" }}>Find best gyms and trainers near you 💪</div>
          </div>
        </div>

        <div style={{ display:"flex", gap:"9px", flexWrap:"wrap" }}>
          <button
            onClick={() => navigate("/dashboard")}
            style={{ padding:"10px 18px", background:"transparent", border:"1px solid #ede5dc", borderRadius:"9px", color:"#8a6a50", fontFamily:"'Rajdhani',sans-serif", fontSize:"12px", letterSpacing:"1px", cursor:"pointer", transition:"all .2s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="#e85d0050"; e.currentTarget.style.color="#e85d00";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="#ede5dc"; e.currentTarget.style.color="#8a6a50";}}>
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            style={{ padding:"10px 24px", background:`linear-gradient(135deg,${activeCity.accent},${activeCity.accent}cc)`, border:"none", borderRadius:"9px", color:"#fff", fontFamily:"'Bebas Neue',sans-serif", fontSize:"15px", letterSpacing:"2px", cursor:"pointer", boxShadow:`0 4px 16px ${activeCity.accent}40`, transition:"all .2s", fontWeight:"700" }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 8px 22px ${activeCity.accent}55`;}}
            onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=`0 4px 16px ${activeCity.accent}40`;}}>
            CONFIRM CITY →
          </button>
        </div>
      </div>

    </DashboardLayout>
  );
}