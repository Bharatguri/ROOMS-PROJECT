import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import DefaultImg  from "../assets/trainers/2.webp";
import DefaultImg2 from "../assets/trainers/sonu.jpg";
import DefaultImg3 from "../assets/trainers/3.webp";
import DefaultImg4 from "../assets/trainers/4.webp";
import DefaultImg5 from "../assets/trainers/5.webp";
import DefaultImg6 from "../assets/trainers/6.webp";
import DefaultImg7 from "../assets/trainers/8.webp";

const TRAINERS = [
  { id:1, name:"Neha Verma",    exp:"3 Years",   spec:"Muscle Gain",        img:DefaultImg4, accent:"#e85d00", badge:"🔥", tag:"Top Rated",   rating:4.8, sessions:120, clients:34 },
  { id:2, name:"Rahul Singh",   exp:"7 Years",   spec:"Strength Training",  img:DefaultImg5, accent:"#0099cc", badge:"💪", tag:"Most Exp.",    rating:4.9, sessions:340, clients:87 },
  { id:3, name:"Khushi Verma",  exp:"2 Years",   spec:"Fat Loss",           img:DefaultImg3, accent:"#16a34a", badge:"⚡", tag:"Fat Loss Pro", rating:4.6, sessions:89,  clients:28 },
  { id:4, name:"Sanjana Rawat", exp:"1 Year",    spec:"Athlete Training",   img:DefaultImg7, accent:"#d97706", badge:"🏆", tag:"Athlete",      rating:4.5, sessions:65,  clients:19 },
  { id:5, name:"Sonu Sharma",   exp:"3 Years",   spec:"Running Training",   img:DefaultImg6, accent:"#7c3aed", badge:"🏃", tag:"Cardio Exp.",  rating:4.7, sessions:145, clients:42 },
  { id:6, name:"Amit Sharma",   exp:"2.5 Years", spec:"Strength Training",  img:DefaultImg,  accent:"#dc2626", badge:"🎯", tag:"Power Coach",  rating:4.6, sessions:110, clients:31 },
];

const SPECS = ["All", "Muscle Gain", "Strength Training", "Fat Loss", "Athlete Training", "Running Training"];

function StarRating({ rating }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"3px" }}>
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{ fontSize:"11px", color: s <= Math.floor(rating) ? "#d97706" : "#e8ddd5" }}>★</span>
      ))}
      <span style={{ color:"#c4a882", fontSize:"10px", fontFamily:"'Rajdhani',sans-serif", marginLeft:"3px" }}>{rating}</span>
    </div>
  );
}

function TrainerCard({ trainer, delay }) {
  const navigate = useNavigate();
  const [tilt, setTilt]   = useState({});
  const [hov,  setHov]    = useState(false);
  const [imgH, setImgH]   = useState(false);
  const [booked, setBooked] = useState(false);

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

  const handleBook = () => {
    setBooked(true);
    setTimeout(() => {
      navigate(`/book-trainer/${encodeURIComponent(trainer.name)}`);
    }, 600);
  };

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        background: hov ? `linear-gradient(160deg,#fff,${trainer.accent}06)` : "#ffffff",
        border:`1px solid ${hov ? trainer.accent+"45" : "#ede5dc"}`,
        borderRadius:"20px",
        boxShadow: hov
          ? `0 24px 56px ${trainer.accent}15, 0 4px 16px rgba(0,0,0,0.07)`
          : "0 2px 14px rgba(0,0,0,0.05)",
        transition:"border .28s, box-shadow .28s, background .28s",
        transformStyle:"preserve-3d",
        position:"relative", overflow:"hidden",
        animation:`tr-up .55s ${delay}s both`,
        display:"flex", flexDirection:"column",
        ...tilt,
      }}>

      {/* Top accent line */}
      {hov && <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:`linear-gradient(90deg,transparent,${trainer.accent},transparent)`, zIndex:2, boxShadow:`0 0 10px ${trainer.accent}60` }} />}

      {/* Tag badge */}
      <div style={{ position:"absolute", top:"12px", right:"12px", background:`${trainer.accent}15`, border:`1px solid ${trainer.accent}30`, color:trainer.accent, fontSize:"9px", fontFamily:"'Rajdhani',sans-serif", letterSpacing:"1.5px", padding:"3px 8px", borderRadius:"5px", zIndex:3, textTransform:"uppercase" }}>
        {trainer.badge} {trainer.tag}
      </div>

      {/* Image area */}
      <div
        onMouseEnter={() => setImgH(true)}
        onMouseLeave={() => setImgH(false)}
        style={{
          background:`linear-gradient(135deg,#fdf8f4,${trainer.accent}08)`,
          borderBottom:"1px solid #ede5dc",
          padding:"22px 20px 16px",
          display:"flex", alignItems:"center", justifyContent:"center",
          overflow:"hidden", position:"relative", minHeight:"200px",
        }}>
        <div style={{ position:"absolute", inset:0, background:`radial-gradient(circle at 50% 60%,${trainer.accent}08,transparent 70%)`, pointerEvents:"none" }} />
        <img
          src={trainer.img}
          alt={trainer.name}
          style={{
            width:"130px", height:"130px",
            borderRadius:"50%",
            objectFit:"cover",
            border:`3px solid ${trainer.accent}35`,
            boxShadow: imgH
              ? `0 0 0 5px ${trainer.accent}20, 0 12px 28px ${trainer.accent}30`
              : `0 0 0 3px ${trainer.accent}15, 0 6px 16px rgba(0,0,0,0.12)`,
            transition:"all .4s ease",
            transform: imgH ? "scale(1.07)" : "scale(1)",
            position:"relative", zIndex:1,
          }}
        />
        {/* Online dot */}
        <div style={{ position:"absolute", bottom:"22px", left:"calc(50% + 42px)", width:"14px", height:"14px", background:"#16a34a", borderRadius:"50%", border:"2px solid #fff", boxShadow:"0 0 6px rgba(22,163,74,0.6)", zIndex:2 }} />
      </div>

      {/* Content */}
      <div style={{ padding:"16px 18px 18px", display:"flex", flexDirection:"column", flex:1 }}>

        {/* Name + rating */}
        <div style={{ marginBottom:"10px" }}>
          <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"20px", letterSpacing:"1.5px", margin:"0 0 3px", color:"#1a0a00", lineHeight:1 }}>{trainer.name}</h3>
          <StarRating rating={trainer.rating} />
        </div>

        {/* Spec tag */}
        <div style={{ display:"inline-flex", alignItems:"center", gap:"5px", background:`${trainer.accent}10`, border:`1px solid ${trainer.accent}25`, borderRadius:"5px", padding:"3px 10px", marginBottom:"11px", alignSelf:"flex-start" }}>
          <span style={{ width:"4px", height:"4px", borderRadius:"50%", background:trainer.accent, boxShadow:`0 0 4px ${trainer.accent}` }} />
          <span style={{ color:trainer.accent, fontSize:"10px", fontFamily:"'Rajdhani',sans-serif", fontWeight:"700", letterSpacing:"1px", textTransform:"uppercase" }}>{trainer.spec}</span>
        </div>

        {/* Stats row */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"7px", marginBottom:"14px" }}>
          {[
            { label:"Experience", value:trainer.exp },
            { label:"Sessions",   value:trainer.sessions+"+" },
            { label:"Clients",    value:trainer.clients+"+" },
          ].map((s,i) => (
            <div key={i} style={{ background:"#fdf8f4", border:"1px solid #ede5dc", borderRadius:"9px", padding:"8px 6px", textAlign:"center" }}>
              <div style={{ color:"#1a0a00", fontFamily:"'Bebas Neue',sans-serif", fontSize:"14px", letterSpacing:"0.8px", lineHeight:1 }}>{s.value}</div>
              <div style={{ color:"#c4a882", fontSize:"9px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase", letterSpacing:"1px", marginTop:"2px" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Book button */}
        <button
          onClick={handleBook}
          style={{
            width:"100%", padding:"12px",
            background: booked
              ? "linear-gradient(135deg,#16a34a,#15803d)"
              : `linear-gradient(135deg,${trainer.accent},${trainer.accent}cc)`,
            border:"none", borderRadius:"11px",
            color:"#fff", fontFamily:"'Bebas Neue',sans-serif",
            fontSize:"15px", letterSpacing:"2.5px",
            cursor:"pointer",
            boxShadow: booked ? "0 4px 16px rgba(22,163,74,0.4)" : `0 4px 16px ${trainer.accent}40`,
            transition:"all .3s ease",
          }}
          onMouseEnter={e=>{ if(!booked){ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 8px 24px ${trainer.accent}55`; }}}
          onMouseLeave={e=>{ if(!booked){ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=`0 4px 16px ${trainer.accent}40`; }}}>
          {booked ? "✓ BOOKING..." : "BOOK TRAINER →"}
        </button>
      </div>
    </div>
  );
}

export default function TrainerProfile() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All"
    ? TRAINERS
    : TRAINERS.filter(t => t.spec === filter);

  return (
    <DashboardLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;600;700&display=swap');
        @keyframes tr-up  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes tr-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(1.3)} }
      `}</style>

      {/* PAGE HEADER */}
      <div style={{
        background:"#ffffff", border:"1px solid #ede5dc",
        borderRadius:"18px", padding:"22px 26px",
        marginBottom:"18px", position:"relative", overflow:"hidden",
        animation:"tr-up .45s 0s both",
        boxShadow:"0 2px 14px rgba(0,0,0,0.05)",
      }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:"linear-gradient(90deg,#e85d00,#ff9950,transparent)" }} />
        <div style={{ position:"absolute", top:"-30px", right:"-30px", width:"180px", height:"180px", background:"radial-gradient(circle,rgba(232,93,0,0.07),transparent 70%)", borderRadius:"50%", pointerEvents:"none" }} />

        <div style={{ position:"relative" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"6px" }}>
            <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#e85d00", display:"inline-block", boxShadow:"0 0 5px rgba(232,93,0,0.7)", animation:"tr-dot 2s infinite" }} />
            <span style={{ color:"#e85d00", fontSize:"10px", letterSpacing:"3px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase" }}>Beast House</span>
          </div>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(22px,4vw,36px)", letterSpacing:"3px", margin:"0 0 5px", color:"#1a0a00", lineHeight:1 }}>
            TRAINER <span style={{ color:"#e85d00" }}>PROFILES 🏋️</span>
          </h2>
          <p style={{ color:"#8a6a50", fontSize:"12px", margin:"0 0 14px", lineHeight:1.6 }}>
            Certified trainers for muscle gain, fat loss, strength training, athletics and more.
          </p>

          {/* Filter pills */}
          <div style={{ display:"flex", gap:"7px", flexWrap:"wrap" }}>
            {SPECS.map(s => (
              <button key={s} onClick={() => setFilter(s)}
                style={{
                  padding:"5px 13px",
                  background: filter===s ? "linear-gradient(135deg,#ff6b1a,#e85d00)" : "#fdf8f4",
                  border:`1px solid ${filter===s ? "#e85d00" : "#ede5dc"}`,
                  borderRadius:"20px", color: filter===s ? "#fff" : "#8a6a50",
                  fontFamily:"'Rajdhani',sans-serif", fontSize:"11px",
                  letterSpacing:"0.5px", cursor:"pointer",
                  boxShadow: filter===s ? "0 3px 10px rgba(232,93,0,0.35)" : "none",
                  transition:"all .2s",
                }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TRAINER GRID */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))", gap:"14px" }}>
        {filtered.map((trainer, i) => (
          <TrainerCard key={trainer.id} trainer={trainer} delay={0.06 + i * 0.08} />
        ))}
      </div>

    </DashboardLayout>
  );
}