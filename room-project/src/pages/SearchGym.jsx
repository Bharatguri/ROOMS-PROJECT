import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import DefaultImg  from "../assets/gym/empty-gym.webp";
import DefaultImg2 from "../assets/gym/2.webp";
import DefaultImg3 from "../assets/gym/3.webp";

const GYMS = [
  { id:1, name:"Gold Gym",           place:"Urban Estate, Hisar",      rating:4.5, reviews:240, price:"₹999/mo",  timing:"5AM–11PM", accent:"#e85d00", tag:"Best Rated",  badge:"🏆", img:DefaultImg,  amenities:["AC","Parking","Trainer"] },
  { id:2, name:"Fitness Arena",      place:"Red Square, Hisar",        rating:4.2, reviews:185, price:"₹799/mo",  timing:"6AM–10PM", accent:"#0099cc", tag:"Popular",     badge:"🔥", img:DefaultImg2, amenities:["AC","Steam","Pool"]      },
  { id:3, name:"Power House Gym",    place:"Rishi Nagar, Hisar",       rating:4.7, reviews:310, price:"₹1299/mo", timing:"24/7",     accent:"#7c3aed", tag:"Premium",     badge:"💪", img:DefaultImg3, amenities:["AC","Sauna","Diet"]      },
  { id:4, name:"Iron Body Fitness",  place:"Sector 14, Hisar",         rating:4.3, reviews:142, price:"₹699/mo",  timing:"5AM–10PM", accent:"#16a34a", tag:"Budget Pick", badge:"⚡", img:DefaultImg,  amenities:["Parking","Trainer","AC"] },
  { id:5, name:"Beast Mode Gym",     place:"Model Town, Hisar",        rating:4.6, reviews:198, price:"₹1099/mo", timing:"6AM–11PM", accent:"#d97706", tag:"New",         badge:"⭐", img:DefaultImg2, amenities:["AC","Trainer","Cafe"]    },
  { id:6, name:"Flex Zone",          place:"Kamla Nehru Colony, Hisar",rating:4.4, reviews:167, price:"₹849/mo",  timing:"5AM–10PM", accent:"#dc2626", tag:"Trending",    badge:"📈", img:DefaultImg3, amenities:["Steam","Parking","AC"]   },
  { id:7, name:"Alpha Fitness Club", place:"New Model Town, Hisar",    rating:4.8, reviews:276, price:"₹1499/mo", timing:"24/7",     accent:"#0099cc", tag:"Top Pick",    badge:"🥇", img:DefaultImg,  amenities:["AC","Pool","Sauna","Diet"]},
];

const CITIES = ["All Cities","Hisar","Delhi","Gurugram","Bihar"];

function StarRating({ rating }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"3px" }}>
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{ fontSize:"12px", color: s <= Math.floor(rating) ? "#d97706" : s-0.5<=rating ? "#d97706" : "#e8ddd5" }}>★</span>
      ))}
      <span style={{ color:"#c4a882", fontSize:"10px", fontFamily:"'Rajdhani',sans-serif", marginLeft:"3px" }}>{rating}</span>
    </div>
  );
}

function GymCard({ gym, delay }) {
  const navigate = useNavigate();
  const [tilt, setTilt] = useState({});
  const [hov,  setHov]  = useState(false);
  const [imgH, setImgH] = useState(false);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    setTilt({ transform:`perspective(700px) rotateY(${x*10}deg) rotateX(${-y*10}deg) scale(1.025) translateY(-5px)`, transition:"transform .08s ease" });
  };
  const onLeave = () => {
    setHov(false);
    setTilt({ transform:"perspective(700px) rotateY(0) rotateX(0) scale(1) translateY(0)", transition:"transform .5s ease" });
  };

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        background: hov ? `linear-gradient(160deg,#fff,${gym.accent}06)` : "#ffffff",
        border:`1px solid ${hov ? gym.accent+"45" : "#ede5dc"}`,
        borderRadius:"20px",
        boxShadow: hov
          ? `0 24px 56px ${gym.accent}15, 0 4px 16px rgba(0,0,0,0.07)`
          : "0 2px 14px rgba(0,0,0,0.05)",
        transition:"border .28s, box-shadow .28s, background .28s",
        transformStyle:"preserve-3d",
        position:"relative", overflow:"hidden",
        animation:`sg-up .55s ${delay}s both`,
        display:"flex", flexDirection:"column",
        ...tilt,
      }}>

      {/* Top accent line on hover */}
      {hov && <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:`linear-gradient(90deg,transparent,${gym.accent},transparent)`, zIndex:2, boxShadow:`0 0 10px ${gym.accent}60` }} />}

      {/* Tag badge */}
      <div style={{ position:"absolute", top:"12px", right:"12px", background:`${gym.accent}18`, border:`1px solid ${gym.accent}35`, color:gym.accent, fontSize:"9px", fontFamily:"'Rajdhani',sans-serif", letterSpacing:"1.5px", padding:"3px 9px", borderRadius:"5px", zIndex:3, textTransform:"uppercase" }}>
        {gym.badge} {gym.tag}
      </div>

      {/* 24/7 badge */}
      {gym.timing === "24/7" && (
        <div style={{ position:"absolute", top:"12px", left:"12px", background:"linear-gradient(135deg,#16a34a,#15803d)", color:"#fff", fontSize:"9px", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"1.5px", padding:"3px 9px", borderRadius:"5px", zIndex:3, boxShadow:"0 2px 8px rgba(22,163,74,0.4)" }}>24/7 OPEN</div>
      )}

      {/* Image */}
      <div
        onMouseEnter={() => setImgH(true)}
        onMouseLeave={() => setImgH(false)}
        style={{ position:"relative", overflow:"hidden", height:"160px", background:`linear-gradient(135deg,#fdf8f4,${gym.accent}08)`, borderBottom:"1px solid #ede5dc" }}>
        <div style={{ position:"absolute", inset:0, background:`radial-gradient(circle at 50% 60%,${gym.accent}10,transparent 70%)`, pointerEvents:"none", zIndex:1 }} />
        <img
          src={gym.img} alt={gym.name}
          style={{
            width:"100%", height:"100%", objectFit:"cover",
            transition:"transform .4s ease, filter .3s",
            transform: imgH ? "scale(1.07)" : "scale(1)",
            filter: imgH ? `brightness(1.05) drop-shadow(0 8px 16px ${gym.accent}30)` : "brightness(0.98)",
          }}
        />
        {/* Price pill overlay */}
        <div style={{ position:"absolute", bottom:"10px", left:"10px", background:"rgba(255,255,255,0.92)", border:`1px solid ${gym.accent}30`, borderRadius:"7px", padding:"4px 10px", zIndex:2, backdropFilter:"blur(4px)" }}>
          <span style={{ color:gym.accent, fontFamily:"'Bebas Neue',sans-serif", fontSize:"14px", letterSpacing:"1px" }}>{gym.price}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding:"16px 18px 18px", display:"flex", flexDirection:"column", flex:1 }}>

        {/* Name */}
        <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"20px", letterSpacing:"1.5px", margin:"0 0 3px", color:"#1a0a00", lineHeight:1 }}>{gym.name}</h3>

        {/* Location */}
        <div style={{ display:"flex", alignItems:"center", gap:"5px", marginBottom:"7px" }}>
          <span style={{ fontSize:"11px" }}>📍</span>
          <span style={{ color:"#8a6a50", fontSize:"12px", fontFamily:"'Rajdhani',sans-serif" }}>{gym.place}</span>
        </div>

        {/* Rating + reviews */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"10px" }}>
          <StarRating rating={gym.rating} />
          <span style={{ color:"#c4a882", fontSize:"10px", fontFamily:"'Rajdhani',sans-serif" }}>({gym.reviews} reviews)</span>
        </div>

        {/* Timing + amenities */}
        <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"11px", flexWrap:"wrap" }}>
          <div style={{ background:"#fdf8f4", border:"1px solid #ede5dc", borderRadius:"5px", padding:"3px 8px", display:"flex", alignItems:"center", gap:"4px" }}>
            <span style={{ fontSize:"10px" }}>🕐</span>
            <span style={{ color:"#8a6a50", fontSize:"10px", fontFamily:"'Rajdhani',sans-serif", fontWeight:"700" }}>{gym.timing}</span>
          </div>
          {gym.amenities.map((a,i) => (
            <div key={i} style={{ background:`${gym.accent}10`, border:`1px solid ${gym.accent}20`, borderRadius:"5px", padding:"3px 7px" }}>
              <span style={{ color:gym.accent, fontSize:"9px", fontFamily:"'Rajdhani',sans-serif", letterSpacing:"0.5px", textTransform:"uppercase", fontWeight:"700" }}>{a}</span>
            </div>
          ))}
        </div>

        {/* View Details button */}
        <button
          onClick={() => navigate(`/gym/${gym.id}`)}
          style={{
            width:"100%", padding:"11px",
            background:`linear-gradient(135deg,${gym.accent},${gym.accent}cc)`,
            border:"none", borderRadius:"11px",
            color:"#fff", fontFamily:"'Bebas Neue',sans-serif",
            fontSize:"14px", letterSpacing:"2.5px",
            cursor:"pointer",
            boxShadow:`0 4px 16px ${gym.accent}40`,
            transition:"all .25s ease", marginTop:"auto",
          }}
          onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 8px 24px ${gym.accent}55`; }}
          onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=`0 4px 16px ${gym.accent}40`; }}>
          VIEW DETAILS →
        </button>
      </div>
    </div>
  );
}

export default function SearchGym() {
  const [city,   setCity]   = useState("All Cities");
  const [search, setSearch] = useState("");
  const [sort,   setSort]   = useState("rating");

  const filtered = GYMS
    .filter(g => city === "All Cities" || g.place.includes(city))
    .filter(g => g.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b) => sort === "rating" ? b.rating - a.rating : a.price.localeCompare(b.price));

  return (
    <DashboardLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;600;700&display=swap');
        @keyframes sg-up  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes sg-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(1.3)} }
        input::placeholder { color:#c4a882; }
        select:focus, input:focus { outline:none; }
      `}</style>

      {/* PAGE HEADER */}
      <div style={{
        background:"#ffffff", border:"1px solid #ede5dc",
        borderRadius:"18px", padding:"22px 26px",
        marginBottom:"18px", position:"relative", overflow:"hidden",
        animation:"sg-up .45s 0s both",
        boxShadow:"0 2px 14px rgba(0,0,0,0.05)",
      }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:"linear-gradient(90deg,#e85d00,#ff9950,transparent)" }} />
        <div style={{ position:"absolute", top:"-30px", right:"-30px", width:"180px", height:"180px", background:"radial-gradient(circle,rgba(232,93,0,0.07),transparent 70%)", borderRadius:"50%", pointerEvents:"none" }} />

        <div style={{ position:"relative" }}>
          {/* Beast House label */}
          <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"6px" }}>
            <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#e85d00", display:"inline-block", boxShadow:"0 0 5px rgba(232,93,0,0.7)", animation:"sg-dot 2s infinite" }} />
            <span style={{ color:"#e85d00", fontSize:"10px", letterSpacing:"3px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase" }}>Beast House</span>
          </div>

          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(22px,4vw,36px)", letterSpacing:"3px", margin:"0 0 5px", color:"#1a0a00", lineHeight:1 }}>
            SEARCH <span style={{ color:"#e85d00" }}>GYM 🏋️</span>
          </h2>
          <p style={{ color:"#8a6a50", fontSize:"12px", margin:"0 0 16px", lineHeight:1.6 }}>
            Find verified gyms near you — compare ratings, prices, timings and facilities.
          </p>

          {/* Search + filter row */}
          <div style={{ display:"flex", gap:"9px", flexWrap:"wrap", alignItems:"center" }}>
            {/* Search input */}
            <div style={{ position:"relative", flex:"1", minWidth:"180px" }}>
              <span style={{ position:"absolute", left:"12px", top:"50%", transform:"translateY(-50%)", fontSize:"13px", pointerEvents:"none" }}>🔍</span>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search gym name..."
                style={{ width:"100%", padding:"9px 12px 9px 34px", background:"#fdf8f4", border:"1px solid #ede5dc", borderRadius:"10px", color:"#1a0a00", fontFamily:"'Rajdhani',sans-serif", fontSize:"13px", transition:"border .2s", boxSizing:"border-box" }}
                onFocus={e => e.target.style.borderColor="#e85d0060"}
                onBlur={e  => e.target.style.borderColor="#ede5dc"}
              />
            </div>

            {/* City select */}
            <select
              value={city} onChange={e => setCity(e.target.value)}
              style={{ padding:"9px 13px", background:"#fdf8f4", border:"1px solid #ede5dc", borderRadius:"10px", color:"#8a6a50", fontFamily:"'Rajdhani',sans-serif", fontSize:"13px", cursor:"pointer", minWidth:"140px" }}>
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>

            {/* Sort pills */}
            {["rating","price"].map(s => (
              <button key={s} onClick={() => setSort(s)}
                style={{
                  padding:"8px 14px",
                  background: sort===s ? "linear-gradient(135deg,#ff6b1a,#e85d00)" : "#fdf8f4",
                  border:`1px solid ${sort===s ? "#e85d00" : "#ede5dc"}`,
                  borderRadius:"10px", color: sort===s ? "#fff" : "#8a6a50",
                  fontFamily:"'Rajdhani',sans-serif", fontSize:"11px",
                  letterSpacing:"1px", cursor:"pointer",
                  boxShadow: sort===s ? "0 3px 10px rgba(232,93,0,0.35)" : "none",
                  transition:"all .2s", textTransform:"uppercase",
                }}>
                {s === "rating" ? "⭐ Top Rated" : "💰 By Price"}
              </button>
            ))}

            {/* Count pill */}
            <div style={{ background:"#fdf8f4", border:"1px solid #ede5dc", borderRadius:"8px", padding:"8px 12px", color:"#8a6a50", fontSize:"11px", fontFamily:"'Rajdhani',sans-serif", whiteSpace:"nowrap" }}>
              {filtered.length} Gyms Found
            </div>
          </div>
        </div>
      </div>

      {/* GYM GRID */}
      {filtered.length > 0 ? (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:"14px" }}>
          {filtered.map((gym, i) => (
            <GymCard key={gym.id} gym={gym} delay={0.06 + i * 0.07} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign:"center", padding:"60px 20px", background:"#ffffff", border:"1px solid #ede5dc", borderRadius:"18px" }}>
          <div style={{ fontSize:"40px", marginBottom:"12px" }}>🏋️</div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"22px", letterSpacing:"2px", color:"#1a0a00", marginBottom:"6px" }}>NO GYMS FOUND</div>
          <div style={{ color:"#c4a882", fontFamily:"'Rajdhani',sans-serif", fontSize:"13px" }}>Try a different city or search term</div>
        </div>
      )}

    </DashboardLayout>
  );
}