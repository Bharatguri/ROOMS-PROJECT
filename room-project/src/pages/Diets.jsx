import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

const L = {
  bg:       "#f5f0eb",
  bgCard:   "#ffffff",
  bgDeep:   "#fdf8f4",
  border:   "#e8ddd5",
  orange:   "#e85d00",
  orangeDim:"#e85d0012",
  orangeMid:"#e85d0035",
  text:     "#1a0a00",
  textSub:  "#8a6a50",
  textMute: "#c4a882",
  green:    "#16a34a",
  blue:     "#0284c7",
  purple:   "#7c3aed",
};

const DIETS = [
  {
    id: 1,
    emoji: "🔥",
    title: "Fat Loss Diet",
    tag: "Weight Loss",
    tagColor: L.orange,
    desc: "Low carb, high protein meals designed to burn fat while preserving lean muscle mass. Ideal for those targeting a calorie deficit.",
    macros: [
      { label: "Protein", val: "40%", color: L.orange },
      { label: "Carbs",   val: "25%", color: L.blue   },
      { label: "Fats",    val: "35%", color: L.green  },
    ],
    meals: ["Grilled Chicken + Salad", "Boiled Eggs + Oats", "Fish + Steamed Veggies"],
    duration: "8–12 Weeks",
    calories: "1600–1800 kcal",
  },
  {
    id: 2,
    emoji: "💪",
    title: "Muscle Gain Diet",
    tag: "Bulking",
    tagColor: L.green,
    desc: "High protein combined with balanced carbohydrates to fuel heavy workouts and maximize muscle protein synthesis.",
    macros: [
      { label: "Protein", val: "35%", color: L.orange },
      { label: "Carbs",   val: "45%", color: L.blue   },
      { label: "Fats",    val: "20%", color: L.green  },
    ],
    meals: ["Rice + Chicken + Dal", "Paneer + Roti", "Whey Shake + Banana"],
    duration: "12–16 Weeks",
    calories: "2800–3200 kcal",
  },
  {
    id: 3,
    emoji: "🥑",
    title: "Keto Diet",
    tag: "Ketogenic",
    tagColor: L.purple,
    desc: "Very low carbs with high healthy fats to push your body into ketosis — a metabolic state where fat becomes the primary fuel.",
    macros: [
      { label: "Protein", val: "25%", color: L.orange },
      { label: "Carbs",   val: "5%",  color: L.blue   },
      { label: "Fats",    val: "70%", color: L.green  },
    ],
    meals: ["Avocado + Eggs", "Almonds + Paneer", "Grilled Salmon + Butter"],
    duration: "6–10 Weeks",
    calories: "1800–2200 kcal",
  },
  {
    id: 4,
    emoji: "🌿",
    title: "Clean Eating",
    tag: "Maintenance",
    tagColor: L.blue,
    desc: "Whole foods, minimal processing. Focus on vegetables, fruits, lean proteins and complex carbs for long-term health.",
    macros: [
      { label: "Protein", val: "30%", color: L.orange },
      { label: "Carbs",   val: "40%", color: L.blue   },
      { label: "Fats",    val: "30%", color: L.green  },
    ],
    meals: ["Oats + Fruits", "Brown Rice + Veggies", "Sprouts + Curd"],
    duration: "Ongoing",
    calories: "2000–2400 kcal",
  },
];

function DietCard({ diet, delay }) {
  const [hov, setHov] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: L.bgCard,
        border: `1px solid ${hov ? diet.tagColor+"45" : L.border}`,
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: hov ? `0 12px 36px rgba(0,0,0,0.09), 0 0 0 1px ${diet.tagColor}15` : "0 2px 12px rgba(0,0,0,0.05)",
        transition: "all .28s ease",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        animation: `dt-up .5s ${delay}s both`,
        position: "relative",
      }}>

      {/* Top accent line */}
      <div style={{ height:"3px", background:`linear-gradient(90deg,${diet.tagColor},${diet.tagColor}50,transparent)` }} />

      <div style={{ padding:"20px 22px" }}>

        {/* Header row */}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"12px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
            <div style={{ width:"44px", height:"44px", borderRadius:"12px", background:`${diet.tagColor}12`, border:`1px solid ${diet.tagColor}25`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px", flexShrink:0 }}>
              {diet.emoji}
            </div>
            <div>
              <div style={{ display:"inline-block", background:`${diet.tagColor}15`, border:`1px solid ${diet.tagColor}30`, borderRadius:"4px", padding:"2px 8px", fontSize:"9px", fontFamily:"'Rajdhani',sans-serif", letterSpacing:"2px", textTransform:"uppercase", color:diet.tagColor, marginBottom:"4px" }}>{diet.tag}</div>
              <h3 style={{ color:L.text, fontFamily:"'Bebas Neue',sans-serif", fontSize:"20px", letterSpacing:"1.5px", margin:0, lineHeight:1 }}>{diet.title}</h3>
            </div>
          </div>

          {/* Duration pill */}
          <div style={{ flexShrink:0, textAlign:"right" }}>
            <div style={{ color:L.textMute, fontSize:"10px", letterSpacing:"1.5px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase" }}>Duration</div>
            <div style={{ color:L.text, fontSize:"12px", fontFamily:"'Rajdhani',sans-serif", fontWeight:"700" }}>{diet.duration}</div>
          </div>
        </div>

        {/* Desc */}
        <p style={{ color:L.textSub, fontSize:"12px", lineHeight:1.7, margin:"0 0 14px", fontFamily:"'Rajdhani',sans-serif" }}>{diet.desc}</p>

        {/* Macros */}
        <div style={{ display:"flex", gap:"8px", marginBottom:"14px" }}>
          {diet.macros.map((m,i) => (
            <div key={i} style={{ flex:1, background:L.bgDeep, border:`1px solid ${L.border}`, borderRadius:"8px", padding:"8px 6px", textAlign:"center" }}>
              <div style={{ color:m.color, fontFamily:"'Bebas Neue',sans-serif", fontSize:"16px", letterSpacing:"1px" }}>{m.val}</div>
              <div style={{ color:L.textMute, fontSize:"9px", letterSpacing:"1.5px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase", marginTop:"2px" }}>{m.label}</div>
            </div>
          ))}
          {/* Calories */}
          <div style={{ flex:1.4, background:`${diet.tagColor}08`, border:`1px solid ${diet.tagColor}20`, borderRadius:"8px", padding:"8px 6px", textAlign:"center" }}>
            <div style={{ color:diet.tagColor, fontFamily:"'Bebas Neue',sans-serif", fontSize:"13px", letterSpacing:"0.5px", lineHeight:1.2 }}>{diet.calories}</div>
            <div style={{ color:L.textMute, fontSize:"9px", letterSpacing:"1.5px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase", marginTop:"2px" }}>Daily Cal</div>
          </div>
        </div>

        {/* Expand meals */}
        <button
          onClick={() => setOpen(o => !o)}
          style={{ width:"100%", padding:"9px", background: open ? `${diet.tagColor}10` : "transparent", border:`1px solid ${open ? diet.tagColor+"40" : L.border}`, borderRadius:"9px", color: open ? diet.tagColor : L.textSub, fontFamily:"'Rajdhani',sans-serif", fontSize:"12px", letterSpacing:"1.5px", textTransform:"uppercase", cursor:"pointer", transition:"all .22s", display:"flex", alignItems:"center", justifyContent:"center", gap:"6px" }}>
          {open ? "▲ HIDE MEALS" : "▼ VIEW SAMPLE MEALS"}
        </button>

        {/* Meals list */}
        {open && (
          <div style={{ marginTop:"10px", display:"flex", flexDirection:"column", gap:"6px" }}>
            {diet.meals.map((meal,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:"9px", padding:"8px 11px", background:L.bgDeep, border:`1px solid ${L.border}`, borderRadius:"8px" }}>
                <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:diet.tagColor, flexShrink:0, boxShadow:`0 0 4px ${diet.tagColor}80` }} />
                <span style={{ color:L.text, fontSize:"12px", fontFamily:"'Rajdhani',sans-serif", fontWeight:"600" }}>{meal}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default function Diets() {
  return (
    <DashboardLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;600;700&display=swap');
        @keyframes dt-up { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes dt-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(1.3)} }
      `}</style>

      {/* PAGE HEADER */}
      <div style={{
        background: L.bgCard,
        border: `1px solid ${L.border}`,
        borderRadius: "16px",
        padding: "24px 28px",
        marginBottom: "20px",
        position: "relative", overflow: "hidden",
        animation: "dt-up .45s 0s both",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      }}>
        <div style={{ height:"2px", position:"absolute", top:0, left:0, right:0, background:`linear-gradient(90deg,${L.orange},${L.orange}50,transparent)` }} />
        <div style={{ position:"absolute", top:"-30px", right:"-30px", width:"160px", height:"160px", background:`radial-gradient(circle,${L.orange}07,transparent 70%)`, borderRadius:"50%", pointerEvents:"none" }} />

        <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"7px" }}>
          <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:L.orange, display:"inline-block", boxShadow:`0 0 5px ${L.orange}80`, animation:"dt-dot 2s infinite" }} />
          <span style={{ color:L.orange, fontSize:"10px", letterSpacing:"3px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase" }}>Beast House</span>
        </div>
        <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(22px,4vw,36px)", letterSpacing:"3px", margin:"0 0 6px", color:L.text, lineHeight:1 }}>
          DIET <span style={{ color:L.orange }}>PLANS 🥗</span>
        </h2>
        <p style={{ color:L.textSub, fontSize:"12px", margin:0, maxWidth:"480px", lineHeight:1.6, letterSpacing:"0.3px" }}>
          Personalized nutrition plans to match your fitness goal — fat loss, muscle gain, keto or clean eating.
        </p>
      </div>

      {/* DIET CARDS GRID */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"14px" }}>
        {DIETS.map((diet, i) => (
          <DietCard key={diet.id} diet={diet} delay={0.06 + i * 0.08} />
        ))}
      </div>

    </DashboardLayout>
  );
}