import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";

const L = {
  bg:       "#f5efe8",
  bgCard:   "#ffffff",
  bgDeep:   "#fdf8f4",
  border:   "#ede5dc",
  orange:   "#e85d00",
  text:     "#1a0a00",
  textSub:  "#8a6a50",
  textMute: "#c4a882",
  gold:     "#d97706",
  silver:   "#64748b",
  vip:      "#7c3aed",
};

const PLANS = [
  {
    id:"basic", name:"Silver", emoji:"⭐",
    price:"₹499", period:"/ month", tag:"Starter",
    accent:L.silver, accentDim:"#64748b12",
    desc:"Perfect for beginners starting their fitness journey.",
    perks:["Gym access (Morning)","Free 1 Diet Guide PDF","2% Supplements Discount"],
    offers:[
      { title:"Supplements", value:"2% OFF"      },
      { title:"Trainer",     value:"No Discount" },
      { title:"Bonus",       value:"Free Diet PDF"},
    ],
  },
  {
    id:"pro", name:"Gold", emoji:"💰",
    price:"₹999", period:"/ month", tag:"Most Popular",
    accent:L.gold, accentDim:"#d9770612",
    desc:"Most chosen plan — full access with great discounts.",
    perks:["Gym access (Full Day)","Weekly Diet Plan","10% Supplements Discount","15% Trainer Discount","Free 2 Trial PT Sessions"],
    offers:[
      { title:"Supplements", value:"10% OFF"          },
      { title:"Trainer",     value:"15% OFF"          },
      { title:"Bonus",       value:"2 Free PT Sessions"},
    ],
  },
  {
    id:"elite", name:"VIP", emoji:"🤴",
    price:"₹1999", period:"/ month", tag:"Premium",
    accent:L.vip, accentDim:"#7c3aed12",
    desc:"Ultimate access — for those who demand the best.",
    perks:["Gym access (24/7)","Personalized Daily Diet","20% Supplements Discount","30% Trainer Discount","Priority Trainer Booking","Monthly Body Checkup"],
    offers:[
      { title:"Supplements", value:"20% OFF"          },
      { title:"Trainer",     value:"30% OFF"          },
      { title:"Bonus",       value:"Free Body Checkup"},
    ],
  },
];

function Card3D({ children, style={}, accent=L.orange, delay=0, onClick, selected }) {
  const [tilt,setTilt] = useState({});
  const [hov,setHov]   = useState(false);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width-0.5;
    const y = (e.clientY-r.top)/r.height-0.5;
    setTilt({ transform:`perspective(800px) rotateY(${x*9}deg) rotateX(${-y*9}deg) scale(1.02) translateY(-4px)`, transition:"transform .08s ease" });
  };
  const onLeave = () => {
    setHov(false);
    setTilt({ transform:"perspective(800px) rotateY(0) rotateX(0) scale(1) translateY(0)", transition:"transform .5s ease" });
  };

  return (
    <div
      onMouseEnter={()=>setHov(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{
        background: selected ? `linear-gradient(160deg,#fff,${accent}08)` : hov ? `linear-gradient(160deg,#fff,${accent}05)` : L.bgCard,
        border:`1px solid ${selected ? accent+"55" : hov ? accent+"35" : L.border}`,
        borderRadius:"18px",
        boxShadow: selected
          ? `0 0 0 1px ${accent}20, 0 20px 50px ${accent}18, 0 4px 16px rgba(0,0,0,0.07)`
          : hov ? `0 16px 40px ${accent}12, 0 4px 14px rgba(0,0,0,0.06)` : "0 2px 14px rgba(0,0,0,0.05)",
        transition:"border .25s, box-shadow .25s, background .25s",
        animation:`mb-up .55s ${delay}s both`,
        transformStyle:"preserve-3d",
        position:"relative", overflow:"hidden",
        cursor: onClick ? "pointer" : "default",
        ...style, ...tilt,
      }}>
      {/* Top accent line */}
      {(hov||selected) && (
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:`linear-gradient(90deg,transparent,${accent},transparent)`, zIndex:1, boxShadow:`0 0 10px ${accent}50` }} />
      )}
      {children}
    </div>
  );
}

function PlanCard({ plan, selected, onSelect, delay }) {
  const isSel = selected === plan.id;

  return (
    <Card3D accent={plan.accent} delay={delay} selected={isSel}
      onClick={() => onSelect(plan.id)}
      style={{ display:"flex", flexDirection:"column" }}>

      {/* Most Popular badge */}
      {plan.id==="pro" && (
        <div style={{ position:"absolute", top:"13px", right:"13px", background:`linear-gradient(135deg,${plan.accent},${plan.accent}cc)`, color:"#fff", fontSize:"9px", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"2px", padding:"3px 10px", borderRadius:"5px", boxShadow:`0 2px 10px ${plan.accent}50`, zIndex:2 }}>MOST POPULAR</div>
      )}

      {/* ── HEADER ── */}
      <div style={{ padding:"22px 22px 18px", borderBottom:`1px solid ${L.border}` }}>
        <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"14px" }}>
          <div style={{ width:"42px", height:"42px", borderRadius:"11px", flexShrink:0, background:`${plan.accentDim}`, border:`1px solid ${plan.accent}28`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"19px" }}>{plan.emoji}</div>
          <div>
            <div style={{ color:L.textMute, fontSize:"10px", letterSpacing:"2.5px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase", marginBottom:"2px" }}>{plan.tag}</div>
            <div style={{ color:plan.accent, fontFamily:"'Bebas Neue',sans-serif", fontSize:"22px", letterSpacing:"2px", lineHeight:1 }}>{plan.name}</div>
          </div>
        </div>

        {/* Price */}
        <div style={{ display:"flex", alignItems:"baseline", gap:"4px", marginBottom:"6px" }}>
          <span style={{ color:L.text, fontFamily:"'Bebas Neue',sans-serif", fontSize:"38px", letterSpacing:"1px", lineHeight:1 }}>{plan.price}</span>
          <span style={{ color:L.textMute, fontSize:"12px", fontFamily:"'Rajdhani',sans-serif" }}>{plan.period}</span>
        </div>
        <p style={{ color:L.textSub, fontSize:"12px", margin:0, fontFamily:"'Rajdhani',sans-serif", lineHeight:1.5 }}>{plan.desc}</p>
      </div>

      {/* ── OFFERS ── */}
      <div style={{ padding:"16px 22px 0" }}>
        <div style={{ color:L.textMute, fontSize:"10px", letterSpacing:"2px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase", marginBottom:"8px" }}>Special Offers</div>
        <div style={{ display:"flex", flexDirection:"column", gap:"6px", marginBottom:"14px" }}>
          {plan.offers.map((o,i) => (
            <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 12px", background:L.bgDeep, border:`1px solid ${L.border}`, borderRadius:"9px" }}>
              <span style={{ color:L.textSub, fontSize:"12px", fontFamily:"'Rajdhani',sans-serif", fontWeight:"600" }}>{o.title}</span>
              <span style={{ color:plan.accent, fontSize:"12px", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"1px" }}>{o.value}</span>
            </div>
          ))}
        </div>

        {/* ── BENEFITS ── */}
        <div style={{ color:L.textMute, fontSize:"10px", letterSpacing:"2px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase", marginBottom:"8px" }}>Benefits</div>
        <div style={{ display:"flex", flexDirection:"column", gap:"8px", marginBottom:"20px" }}>
          {plan.perks.map((perk,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:"9px" }}>
              <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:plan.accent, flexShrink:0, boxShadow:`0 0 5px ${plan.accent}60` }} />
              <span style={{ color:L.text, fontSize:"12px", fontFamily:"'Rajdhani',sans-serif", lineHeight:1.4 }}>{perk}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ padding:"0 22px 22px", marginTop:"auto" }}>
        <button
          onClick={e => { e.stopPropagation(); onSelect(plan.id); }}
          style={{
            width:"100%", padding:"12px",
            background: isSel ? `linear-gradient(135deg,${plan.accent},${plan.accent}cc)` : "transparent",
            border:`1px solid ${isSel ? plan.accent : plan.accent+"40"}`,
            borderRadius:"10px",
            color: isSel ? "#fff" : plan.accent,
            fontFamily:"'Bebas Neue',sans-serif", fontSize:"14px", letterSpacing:"2px",
            cursor:"pointer",
            boxShadow: isSel ? `0 4px 16px ${plan.accent}40` : "none",
            transition:"all .25s", fontWeight:"700",
          }}
          onMouseEnter={e=>{ if(!isSel){ e.currentTarget.style.background=`${plan.accent}10`; }}}
          onMouseLeave={e=>{ if(!isSel){ e.currentTarget.style.background="transparent"; }}}>
          {isSel ? "✓  SELECTED" : "CHOOSE PLAN"}
        </button>
      </div>
    </Card3D>
  );
}

export default function Membership() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const activePlan = PLANS.find(p => p.id === selectedPlan);

  const handleBuy = () => {
    alert(`✅ Membership Selected: ${activePlan.name}\nPrice: ${activePlan.price}${activePlan.period}`);
  };

  return (
    <DashboardLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;600;700&display=swap');
        @keyframes mb-up   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes mb-scan { 0%{top:-10%} 100%{top:110%} }
        @keyframes mb-dot  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.3)} }
      `}</style>

      {/* ── PAGE HEADER ── */}
      <div style={{
        background:"#ffffff", border:"1px solid #ede5dc",
        borderRadius:"18px", padding:"24px 28px",
        marginBottom:"20px", position:"relative", overflow:"hidden",
        animation:"mb-up .5s 0s both",
        boxShadow:"0 2px 14px rgba(0,0,0,0.05)",
      }}>
        {/* Top orange shimmer line */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:"linear-gradient(90deg,#e85d00,#ff9950,transparent)" }} />
        {/* Scan line */}
        <div style={{ position:"absolute", left:0, right:0, height:"50px", background:"linear-gradient(180deg,transparent,rgba(232,93,0,0.03),transparent)", animation:"mb-scan 6s linear infinite", pointerEvents:"none" }} />
        {/* BG orb */}
        <div style={{ position:"absolute", top:"-30px", right:"-30px", width:"200px", height:"200px", background:"radial-gradient(circle,rgba(232,93,0,0.07),transparent 70%)", borderRadius:"50%", pointerEvents:"none" }} />

        <div style={{ position:"relative" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"7px" }}>
            <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:L.orange, display:"inline-block", boxShadow:`0 0 6px ${L.orange}80`, animation:"mb-dot 2s infinite" }} />
            <span style={{ color:L.orange, fontSize:"10px", letterSpacing:"3px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase" }}>Beast House</span>
          </div>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(24px,4vw,40px)", letterSpacing:"3px", margin:"0 0 7px", color:L.text, lineHeight:1 }}>
            MEMBERSHIP <span style={{ color:L.orange }}>PLANS 💀</span>
          </h2>
          <p style={{ color:L.textSub, fontSize:"12px", margin:0, maxWidth:"520px", letterSpacing:"0.4px", lineHeight:1.6 }}>
            Choose your plan and unlock exclusive discounts on supplements, trainer sessions, diet plans and priority bookings.
          </p>
        </div>
      </div>

      {/* ── PLAN CARDS ── */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"14px", marginBottom:"16px" }}>
        {PLANS.map((plan,i) => (
          <PlanCard key={plan.id} plan={plan} selected={selectedPlan} onSelect={setSelectedPlan} delay={0.08+i*0.1} />
        ))}
      </div>

      {/* ── BOTTOM CTA ── */}
      <Card3D accent={activePlan.accent} delay={0.4} style={{ padding:"20px 24px" }}>
        <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:"14px" }}>

          {/* Left — selected plan info */}
          <div style={{ display:"flex", alignItems:"center", gap:"13px" }}>
            <div style={{ width:"46px", height:"46px", borderRadius:"12px", flexShrink:0, background:`${activePlan.accentDim}`, border:`1px solid ${activePlan.accent}28`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"21px" }}>{activePlan.emoji}</div>
            <div>
              <div style={{ color:L.textMute, fontSize:"10px", letterSpacing:"2px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase", marginBottom:"2px" }}>Selected Plan</div>
              <div style={{ color:activePlan.accent, fontFamily:"'Bebas Neue',sans-serif", fontSize:"19px", letterSpacing:"2px", lineHeight:1 }}>
                {activePlan.name} — {activePlan.price}{activePlan.period}
              </div>
              <div style={{ color:L.textSub, fontSize:"11px", fontFamily:"'Rajdhani',sans-serif", marginTop:"3px" }}>Unlock premium offers now 💪</div>
            </div>
          </div>

          {/* Right — buttons */}
          <div style={{ display:"flex", gap:"9px", flexWrap:"wrap" }}>
            <button onClick={() => navigate("/SaleProduct")}
              style={{ padding:"10px 18px", background:"transparent", border:`1px solid ${L.border}`, borderRadius:"9px", color:L.textSub, fontFamily:"'Rajdhani',sans-serif", fontSize:"12px", letterSpacing:"1px", cursor:"pointer", transition:"all .2s" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=L.orange+"50"; e.currentTarget.style.color=L.orange;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=L.border; e.currentTarget.style.color=L.textSub;}}>
              View Supplements
            </button>
            <button onClick={handleBuy}
              style={{ padding:"10px 22px", background:`linear-gradient(135deg,${activePlan.accent},${activePlan.accent}cc)`, border:"none", borderRadius:"9px", color:"#fff", fontFamily:"'Bebas Neue',sans-serif", fontSize:"15px", letterSpacing:"2px", cursor:"pointer", boxShadow:`0 4px 16px ${activePlan.accent}40`, transition:"all .2s", fontWeight:"700" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 8px 22px ${activePlan.accent}55`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=`0 4px 16px ${activePlan.accent}40`;}}>
              BUY MEMBERSHIP →
            </button>
          </div>
        </div>
      </Card3D>

    </DashboardLayout>
  );
}