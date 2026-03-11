import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import DefaultImg  from "../assets/gym/empty-gym.webp";
import DefaultImg2 from "../assets/gym/2.webp";
import DefaultImg3 from "../assets/gym/3.webp";

const GYMS = [
  {
    id:"1", name:"Gold Gym", place:"Urban Estate, Hisar",
    rating:4.5, reviews:240, price:"₹999/mo", timing:"5AM–11PM",
    accent:"#e85d00", tag:"Best Rated", badge:"🏆", img:DefaultImg,
    about:"Premium gym with world-class cardio equipment, strength training zones, certified trainers and modern facilities. Ideal for all fitness levels from beginner to professional.",
    facilities:["AC","Parking","Trainer","Cardio Zone","Weights","Crossfit","Locker","Shower"],
    trainers:[
      { name:"Amit Sharma",  spec:"Strength Training", exp:"2.5 Yrs", rating:4.6 },
      { name:"Neha Verma",   spec:"Muscle Gain",       exp:"3 Yrs",   rating:4.8 },
      { name:"Rahul Singh",  spec:"Strength Training", exp:"7 Yrs",   rating:4.9 },
    ],
    plans:[
      { label:"Monthly",   price:"₹999",   color:"#e85d00" },
      { label:"Quarterly", price:"₹2,499", color:"#d97706" },
      { label:"Annual",    price:"₹7,999", color:"#16a34a" },
    ],
  },
  {
    id:"2", name:"Fitness Arena", place:"Red Square, Hisar",
    rating:4.2, reviews:185, price:"₹799/mo", timing:"6AM–10PM",
    accent:"#0099cc", tag:"Popular", badge:"🔥", img:DefaultImg2,
    about:"Affordable gym with great atmosphere, personal training and group workouts. Perfect for those who want quality fitness without breaking the bank.",
    facilities:["AC","Steam","Pool","Cardio","Strength","Zumba","Locker"],
    trainers:[
      { name:"Kunal Arora",  spec:"Fat Loss",    exp:"4 Yrs", rating:4.3 },
      { name:"Pooja Mehra",  spec:"Zumba/Dance", exp:"3 Yrs", rating:4.5 },
    ],
    plans:[
      { label:"Monthly",   price:"₹799",   color:"#0099cc" },
      { label:"Quarterly", price:"₹1,999", color:"#d97706" },
      { label:"Annual",    price:"₹5,999", color:"#16a34a" },
    ],
  },
  {
    id:"3", name:"Power House Gym", place:"Rishi Nagar, Hisar",
    rating:4.7, reviews:310, price:"₹1299/mo", timing:"24/7",
    accent:"#7c3aed", tag:"Premium", badge:"💪", img:DefaultImg3,
    about:"High-end fitness center specializing in strength training, bodybuilding and weight loss programs. Features state-of-the-art equipment and expert trainers.",
    facilities:["AC","Sauna","Diet","Bodybuilding","Supplements Bar","Steam","Yoga","Parking"],
    trainers:[
      { name:"Ravi Kumar",   spec:"Bodybuilding",      exp:"6 Yrs", rating:4.7 },
      { name:"Sandeep Negi", spec:"Strength Training", exp:"5 Yrs", rating:4.8 },
      { name:"Kriti Sharma", spec:"Yoga & Wellness",   exp:"4 Yrs", rating:4.6 },
    ],
    plans:[
      { label:"Monthly",   price:"₹1,299", color:"#7c3aed" },
      { label:"Quarterly", price:"₹3,499", color:"#d97706" },
      { label:"Annual",    price:"₹9,999", color:"#16a34a" },
    ],
  },
  {
    id:"4", name:"Iron Body Fitness", place:"Sector 14, Hisar",
    rating:4.3, reviews:142, price:"₹699/mo", timing:"5AM–10PM",
    accent:"#16a34a", tag:"Budget Pick", badge:"⚡", img:DefaultImg,
    about:"Best value gym in Hisar — packed with essential equipment, experienced trainers and a motivating environment. Great for beginners and budget-conscious fitness enthusiasts.",
    facilities:["Parking","Trainer","AC","Cardio","Weights","Locker"],
    trainers:[
      { name:"Vikram Singh", spec:"Weight Training", exp:"3 Yrs", rating:4.4 },
      { name:"Deepa Rani",   spec:"Fat Loss",        exp:"2 Yrs", rating:4.2 },
    ],
    plans:[
      { label:"Monthly",   price:"₹699",   color:"#16a34a" },
      { label:"Quarterly", price:"₹1,799", color:"#d97706" },
      { label:"Annual",    price:"₹4,999", color:"#e85d00" },
    ],
  },
  {
    id:"5", name:"Beast Mode Gym", place:"Model Town, Hisar",
    rating:4.6, reviews:198, price:"₹1099/mo", timing:"6AM–11PM",
    accent:"#d97706", tag:"New", badge:"⭐", img:DefaultImg2,
    about:"Newly opened modern gym with latest equipment, dedicated zones for cardio, strength and HIIT training. Premium experience at competitive pricing.",
    facilities:["AC","Trainer","Cafe","HIIT Zone","Crossfit","Locker","Parking"],
    trainers:[
      { name:"Arjun Bhatia",  spec:"HIIT Training",     exp:"4 Yrs", rating:4.7 },
      { name:"Priya Kapoor",  spec:"Nutrition & Diet",  exp:"3 Yrs", rating:4.5 },
      { name:"Mohit Verma",   spec:"Crossfit",          exp:"5 Yrs", rating:4.6 },
    ],
    plans:[
      { label:"Monthly",   price:"₹1,099", color:"#d97706" },
      { label:"Quarterly", price:"₹2,799", color:"#e85d00" },
      { label:"Annual",    price:"₹8,499", color:"#16a34a" },
    ],
  },
  {
    id:"6", name:"Flex Zone", place:"Kamla Nehru Colony, Hisar",
    rating:4.4, reviews:167, price:"₹849/mo", timing:"5AM–10PM",
    accent:"#dc2626", tag:"Trending", badge:"📈", img:DefaultImg3,
    about:"Trending fitness hub known for its energetic atmosphere and diverse workout programs. Offers specialized training for athletes, beginners and weight loss goals.",
    facilities:["Steam","Parking","AC","Cardio","Strength","Yoga","Locker"],
    trainers:[
      { name:"Suresh Kumar",  spec:"Athletic Training", exp:"5 Yrs", rating:4.5 },
      { name:"Anjali Rawat",  spec:"Yoga & Pilates",    exp:"3 Yrs", rating:4.4 },
    ],
    plans:[
      { label:"Monthly",   price:"₹849",   color:"#dc2626" },
      { label:"Quarterly", price:"₹2,199", color:"#d97706" },
      { label:"Annual",    price:"₹6,499", color:"#16a34a" },
    ],
  },
  {
    id:"7", name:"Alpha Fitness Club", place:"New Model Town, Hisar",
    rating:4.8, reviews:276, price:"₹1499/mo", timing:"24/7",
    accent:"#0099cc", tag:"Top Pick", badge:"🥇", img:DefaultImg,
    about:"The most complete fitness facility in Hisar — Olympic swimming pool, sauna, premium diet consultation and 24/7 access. The ultimate destination for serious fitness enthusiasts.",
    facilities:["AC","Pool","Sauna","Diet","Parking","Trainer","Steam","Supplements Bar","Yoga"],
    trainers:[
      { name:"Rohit Malhotra", spec:"Swimming & Cardio",   exp:"8 Yrs", rating:4.9 },
      { name:"Simran Kaur",    spec:"Diet & Nutrition",    exp:"6 Yrs", rating:4.8 },
      { name:"Aakash Tyagi",   spec:"Powerlifting",        exp:"7 Yrs", rating:4.9 },
    ],
    plans:[
      { label:"Monthly",   price:"₹1,499", color:"#0099cc" },
      { label:"Quarterly", price:"₹3,999", color:"#d97706" },
      { label:"Annual",    price:"₹11,999",color:"#16a34a" },
    ],
  },
];

function StarRating({ rating, size=12 }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"3px" }}>
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{ fontSize:size, color: s<=Math.floor(rating) ? "#d97706" : "#e8ddd5" }}>★</span>
      ))}
      <span style={{ color:"#c4a882", fontSize:size-1, fontFamily:"'Rajdhani',sans-serif", marginLeft:"3px" }}>{rating}</span>
    </div>
  );
}

function Card3D({ children, style={}, accent="#e85d00" }) {
  const [tilt,setTilt] = useState({});
  const [hov,setHov]   = useState(false);
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width-0.5, y = (e.clientY-r.top)/r.height-0.5;
    setTilt({ transform:`perspective(700px) rotateY(${x*8}deg) rotateX(${-y*8}deg) scale(1.015) translateY(-3px)`, transition:"transform .08s ease" });
  };
  const onLeave = () => {
    setHov(false);
    setTilt({ transform:"perspective(700px) rotateY(0) rotateX(0) scale(1) translateY(0)", transition:"transform .5s ease" });
  };
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ background:"#ffffff", border:`1px solid ${hov?accent+"45":"#ede5dc"}`, borderRadius:"16px", boxShadow: hov?`0 16px 40px ${accent}15,0 4px 14px rgba(0,0,0,0.06)`:"0 2px 12px rgba(0,0,0,0.05)", transition:"border .25s,box-shadow .25s", transformStyle:"preserve-3d", position:"relative", overflow:"hidden", ...style, ...tilt }}>
      {hov && <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:`linear-gradient(90deg,transparent,${accent}70,transparent)`, zIndex:1 }} />}
      {children}
    </div>
  );
}

export default function GymDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selPlan, setSelPlan] = useState(0);

  const gym = GYMS.find(g => g.id === id);

  if (!gym) return (
    <DashboardLayout>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;600;700&display=swap');`}</style>
      <div style={{ background:"#ffffff", border:"1px solid #ede5dc", borderRadius:"18px", padding:"48px", textAlign:"center", boxShadow:"0 2px 14px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize:"48px", marginBottom:"12px" }}>🏋️</div>
        <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"28px", letterSpacing:"2px", color:"#1a0a00", margin:"0 0 8px" }}>GYM NOT FOUND</h2>
        <p style={{ color:"#8a6a50", fontFamily:"'Rajdhani',sans-serif", marginBottom:"20px" }}>This gym doesn't exist or was removed.</p>
        <button onClick={() => navigate("/searchgym")} style={{ padding:"11px 24px", background:"linear-gradient(135deg,#ff6b1a,#e85d00)", border:"none", borderRadius:"10px", color:"#fff", fontFamily:"'Bebas Neue',sans-serif", fontSize:"15px", letterSpacing:"2px", cursor:"pointer" }}>← BACK TO SEARCH</button>
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;600;700&display=swap');
        @keyframes gd-up  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes gd-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(1.3)} }
      `}</style>

      {/* ── BACK BUTTON ── */}
      <button onClick={() => navigate(-1)}
        style={{ display:"inline-flex", alignItems:"center", gap:"6px", marginBottom:"16px", padding:"7px 14px", background:"#ffffff", border:"1px solid #ede5dc", borderRadius:"9px", color:"#8a6a50", fontFamily:"'Rajdhani',sans-serif", fontSize:"12px", letterSpacing:"1px", cursor:"pointer", transition:"all .2s", animation:"gd-up .4s both", boxShadow:"0 1px 6px rgba(0,0,0,0.04)" }}
        onMouseEnter={e=>{e.currentTarget.style.borderColor=gym.accent+"50"; e.currentTarget.style.color=gym.accent;}}
        onMouseLeave={e=>{e.currentTarget.style.borderColor="#ede5dc"; e.currentTarget.style.color="#8a6a50";}}>
        ← BACK
      </button>

      {/* ── HERO CARD ── */}
      <div style={{ background:"#ffffff", border:"1px solid #ede5dc", borderRadius:"20px", overflow:"hidden", marginBottom:"16px", boxShadow:"0 4px 24px rgba(0,0,0,0.07)", animation:"gd-up .5s .05s both", position:"relative" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:`linear-gradient(90deg,${gym.accent},${gym.accent}80,transparent)`, zIndex:2 }} />

        {/* Gym image banner */}
        <div style={{ height:"220px", position:"relative", overflow:"hidden", background:`linear-gradient(135deg,#fdf8f4,${gym.accent}10)` }}>
          <img src={gym.img} alt={gym.name} style={{ width:"100%", height:"100%", objectFit:"cover", opacity:.85 }} />
          <div style={{ position:"absolute", inset:0, background:`linear-gradient(to bottom,transparent 40%,rgba(26,10,0,0.65))` }} />
          {/* Tag badge */}
          <div style={{ position:"absolute", top:"16px", right:"16px", background:`${gym.accent}`, color:"#fff", fontSize:"10px", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"1.5px", padding:"4px 12px", borderRadius:"6px", boxShadow:`0 2px 10px ${gym.accent}60` }}>{gym.badge} {gym.tag}</div>
          {gym.timing==="24/7" && <div style={{ position:"absolute", top:"16px", left:"16px", background:"linear-gradient(135deg,#16a34a,#15803d)", color:"#fff", fontSize:"10px", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"1.5px", padding:"4px 12px", borderRadius:"6px", boxShadow:"0 2px 10px rgba(22,163,74,0.5)" }}>24/7 OPEN</div>}
          {/* Name overlay */}
          <div style={{ position:"absolute", bottom:"16px", left:"20px" }}>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(24px,4vw,38px)", letterSpacing:"3px", margin:"0 0 4px", color:"#fff", lineHeight:1, textShadow:"0 2px 12px rgba(0,0,0,0.4)" }}>{gym.name}</h2>
            <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
              <span style={{ fontSize:"12px" }}>📍</span>
              <span style={{ color:"rgba(255,255,255,0.85)", fontFamily:"'Rajdhani',sans-serif", fontSize:"13px" }}>{gym.place}</span>
            </div>
          </div>
        </div>

        <div style={{ padding:"22px 24px" }}>
          {/* Stats row */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:"12px", marginBottom:"18px", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", gap:"16px", flexWrap:"wrap" }}>
              <div>
                <StarRating rating={gym.rating} size={14} />
                <div style={{ color:"#c4a882", fontSize:"10px", fontFamily:"'Rajdhani',sans-serif", marginTop:"2px" }}>{gym.reviews} reviews</div>
              </div>
              <div style={{ width:"1px", background:"#ede5dc" }} />
              <div>
                <div style={{ color:"#1a0a00", fontFamily:"'Bebas Neue',sans-serif", fontSize:"16px", letterSpacing:"1px" }}>{gym.timing}</div>
                <div style={{ color:"#c4a882", fontSize:"10px", fontFamily:"'Rajdhani',sans-serif" }}>Timings</div>
              </div>
              <div style={{ width:"1px", background:"#ede5dc" }} />
              <div>
                <div style={{ color:gym.accent, fontFamily:"'Bebas Neue',sans-serif", fontSize:"16px", letterSpacing:"1px" }}>{gym.price}</div>
                <div style={{ color:"#c4a882", fontSize:"10px", fontFamily:"'Rajdhani',sans-serif" }}>Starting price</div>
              </div>
            </div>
          </div>

          {/* About */}
          <div style={{ marginBottom:"0" }}>
            <div style={{ color:"#c4a882", fontSize:"10px", letterSpacing:"2px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase", marginBottom:"6px" }}>About</div>
            <p style={{ color:"#8a6a50", fontSize:"13px", lineHeight:1.7, margin:0, fontFamily:"'Rajdhani',sans-serif" }}>{gym.about}</p>
          </div>
        </div>
      </div>

      {/* ── GRID: FACILITIES + MEMBERSHIP ── */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px", marginBottom:"16px" }}>

        {/* Facilities */}
        <Card3D accent={gym.accent} style={{ padding:"20px", animation:"gd-up .5s .12s both" }}>
          <div style={{ color:"#c4a882", fontSize:"10px", letterSpacing:"2px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase", marginBottom:"12px" }}>✅ Facilities</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"7px" }}>
            {gym.facilities.map((f,i) => (
              <div key={i} style={{ background:`${gym.accent}10`, border:`1px solid ${gym.accent}25`, borderRadius:"6px", padding:"5px 11px", display:"flex", alignItems:"center", gap:"5px" }}>
                <span style={{ width:"4px", height:"4px", borderRadius:"50%", background:gym.accent, boxShadow:`0 0 4px ${gym.accent}` }} />
                <span style={{ color:gym.accent, fontSize:"11px", fontFamily:"'Rajdhani',sans-serif", fontWeight:"700", letterSpacing:"0.5px" }}>{f}</span>
              </div>
            ))}
          </div>
        </Card3D>

        {/* Membership Plans */}
        <Card3D accent={gym.accent} style={{ padding:"20px", animation:"gd-up .5s .18s both" }}>
          <div style={{ color:"#c4a882", fontSize:"10px", letterSpacing:"2px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase", marginBottom:"12px" }}>💳 Membership Plans</div>
          <div style={{ display:"flex", flexDirection:"column", gap:"8px", marginBottom:"14px" }}>
            {gym.plans.map((plan,i) => (
              <div key={i} onClick={() => setSelPlan(i)}
                style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 13px", background: selPlan===i ? `${plan.color}12` : "#fdf8f4", border:`1px solid ${selPlan===i ? plan.color+"50" : "#ede5dc"}`, borderRadius:"9px", cursor:"pointer", transition:"all .2s" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                  {selPlan===i && <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:plan.color, boxShadow:`0 0 5px ${plan.color}` }} />}
                  <span style={{ color: selPlan===i ? "#1a0a00" : "#8a6a50", fontFamily:"'Rajdhani',sans-serif", fontSize:"12px", fontWeight:"700", letterSpacing:"0.5px" }}>{plan.label}</span>
                </div>
                <span style={{ color:plan.color, fontFamily:"'Bebas Neue',sans-serif", fontSize:"16px", letterSpacing:"1px" }}>{plan.price}</span>
              </div>
            ))}
          </div>
          <button style={{ width:"100%", padding:"11px", background:`linear-gradient(135deg,${gym.accent},${gym.accent}cc)`, border:"none", borderRadius:"10px", color:"#fff", fontFamily:"'Bebas Neue',sans-serif", fontSize:"14px", letterSpacing:"2px", cursor:"pointer", boxShadow:`0 4px 16px ${gym.accent}40`, transition:"all .25s" }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 8px 22px ${gym.accent}55`;}}
            onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=`0 4px 16px ${gym.accent}40`;}}>
            JOIN NOW — {gym.plans[selPlan].price} →
          </button>
        </Card3D>
      </div>

      {/* ── TRAINERS ── */}
      <Card3D accent={gym.accent} style={{ padding:"22px 24px", marginBottom:"16px", animation:"gd-up .5s .24s both" }}>
        <div style={{ color:"#c4a882", fontSize:"10px", letterSpacing:"2px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase", marginBottom:"14px" }}>🏋️ Top Trainers</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:"10px" }}>
          {gym.trainers.map((t,i) => {
            const [th,setTh] = useState(false);
            return (
              <div key={i}
                onMouseEnter={()=>setTh(true)} onMouseLeave={()=>setTh(false)}
                style={{ background: th?`${gym.accent}08`:"#fdf8f4", border:`1px solid ${th?gym.accent+"40":"#ede5dc"}`, borderRadius:"12px", padding:"14px", transition:"all .22s", transform: th?"translateY(-2px)":"translateY(0)", boxShadow: th?`0 8px 20px ${gym.accent}14`:"none" }}>
                {/* Avatar */}
                <div style={{ display:"flex", alignItems:"center", gap:"11px", marginBottom:"10px" }}>
                  <div style={{ width:"38px", height:"38px", borderRadius:"50%", flexShrink:0, background:`linear-gradient(135deg,${gym.accent}25,${gym.accent}08)`, border:`2px solid ${gym.accent}30`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Bebas Neue',sans-serif", fontSize:"14px", color:gym.accent }}>
                    {t.name.split(" ").map(w=>w[0]).join("").slice(0,2)}
                  </div>
                  <div>
                    <div style={{ color:"#1a0a00", fontFamily:"'Bebas Neue',sans-serif", fontSize:"15px", letterSpacing:"1px", lineHeight:1 }}>{t.name}</div>
                    <div style={{ color:"#c4a882", fontSize:"10px", fontFamily:"'Rajdhani',sans-serif", marginTop:"2px" }}>Certified Trainer</div>
                  </div>
                </div>
                {/* Spec + exp */}
                <div style={{ display:"flex", gap:"6px", marginBottom:"10px", flexWrap:"wrap" }}>
                  <div style={{ background:`${gym.accent}10`, border:`1px solid ${gym.accent}20`, borderRadius:"4px", padding:"2px 8px" }}>
                    <span style={{ color:gym.accent, fontSize:"9px", fontFamily:"'Rajdhani',sans-serif", fontWeight:"700", letterSpacing:"1px", textTransform:"uppercase" }}>{t.spec}</span>
                  </div>
                  <div style={{ background:"#fdf8f4", border:"1px solid #ede5dc", borderRadius:"4px", padding:"2px 8px" }}>
                    <span style={{ color:"#8a6a50", fontSize:"9px", fontFamily:"'Rajdhani',sans-serif", fontWeight:"700" }}>{t.exp}</span>
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <StarRating rating={t.rating} size={11} />
                  <button
                    onClick={() => navigate(`/book-trainer/${encodeURIComponent(t.name)}`)}
                    style={{ padding:"5px 13px", background:`linear-gradient(135deg,${gym.accent},${gym.accent}cc)`, border:"none", borderRadius:"7px", color:"#fff", fontFamily:"'Bebas Neue',sans-serif", fontSize:"11px", letterSpacing:"1.5px", cursor:"pointer", boxShadow:`0 2px 8px ${gym.accent}40`, transition:"all .2s" }}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow=`0 4px 12px ${gym.accent}50`;}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=`0 2px 8px ${gym.accent}40`;}}>
                    BOOK
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Card3D>

      {/* ── BOTTOM ACTIONS ── */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", animation:"gd-up .5s .3s both" }}>
        <button onClick={() => navigate("/Trainerprofile")}
          style={{ padding:"13px", background:"#ffffff", border:"1px solid #ede5dc", borderRadius:"12px", color:"#8a6a50", fontFamily:"'Bebas Neue',sans-serif", fontSize:"14px", letterSpacing:"2px", cursor:"pointer", transition:"all .22s", boxShadow:"0 2px 10px rgba(0,0,0,0.04)" }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=gym.accent+"50"; e.currentTarget.style.color=gym.accent; e.currentTarget.style.transform="translateY(-2px)";}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor="#ede5dc"; e.currentTarget.style.color="#8a6a50"; e.currentTarget.style.transform="translateY(0)";}}>
          VIEW ALL TRAINERS 🏋️
        </button>
        <button onClick={() => navigate("/SaleProduct")}
          style={{ padding:"13px", background:"linear-gradient(135deg,#ff6b1a,#e85d00)", border:"none", borderRadius:"12px", color:"#fff", fontFamily:"'Bebas Neue',sans-serif", fontSize:"14px", letterSpacing:"2px", cursor:"pointer", boxShadow:"0 4px 18px rgba(232,93,0,0.35)", transition:"all .22s" }}
          onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(232,93,0,0.45)";}}
          onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 18px rgba(232,93,0,0.35)";}}>
          BUY SUPPLEMENTS 🛒
        </button>
      </div>

    </DashboardLayout>
  );
}