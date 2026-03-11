import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import DefaultImg  from "../assets/supliment/weyprotin.webp";
import DefaultImg2 from "../assets/supliment/Cratin.webp";
import DefaultImg3 from "../assets/supliment/multi.webp";
import DefaultImg4 from "../assets/supliment/Fish.webp";
import DefaultImg5 from "../assets/supliment/protin.webp";
import DefaultImg6 from "../assets/supliment/gainner.webp";
import DefaultImg7 from "../assets/supliment/PreWorkout.webp";

const PRODUCTS = [
  { id:1, name:"Whey Protein",   price:"₹1,999", originalPrice:"₹2,499", img:DefaultImg,  accent:"#e85d00", tag:"Best Seller", badge:"🔥", desc:"Fast absorbing whey for muscle recovery & growth.",       rating:4.8, reviews:240 },
  { id:2, name:"Creatine",       price:"₹899",   originalPrice:"₹1,199", img:DefaultImg2, accent:"#0099cc", tag:"Top Rated",   badge:"⭐", desc:"Pure micronized creatine for strength & endurance.",     rating:4.7, reviews:185 },
  { id:3, name:"Multivitamin",   price:"₹499",   originalPrice:"₹699",   img:DefaultImg3, accent:"#16a34a", tag:"Essential",   badge:"💊", desc:"Daily vitamins & minerals for overall wellness.",        rating:4.5, reviews:320 },
  { id:4, name:"Fish Oil",       price:"₹2,199", originalPrice:"₹2,799", img:DefaultImg4, accent:"#0099cc", tag:"Omega-3",     badge:"🐟", desc:"High-potency omega-3 for heart & joint health.",        rating:4.6, reviews:142 },
  { id:5, name:"Protein Bar",    price:"₹2,499", originalPrice:"₹2,999", img:DefaultImg5, accent:"#d97706", tag:"Premium",     badge:"💪", desc:"High protein bars for on-the-go fuel & muscle gains.",  rating:4.9, reviews:198 },
  { id:6, name:"Weight Gainer",  price:"₹1,499", originalPrice:"₹1,999", img:DefaultImg6, accent:"#7c3aed", tag:"Bulk Up",     badge:"📦", desc:"Mass gainer with carbs, protein & healthy calories.",   rating:4.4, reviews:167 },
  { id:7, name:"Pre Workout",    price:"₹699",   originalPrice:"₹999",   img:DefaultImg7, accent:"#dc2626", tag:"Energy",      badge:"⚡", desc:"Explosive energy & focus boost for intense sessions.",  rating:4.7, reviews:211 },
];

function StarRating({ rating }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"3px" }}>
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{ fontSize:"10px", color: s <= Math.floor(rating) ? "#d97706" : s - 0.5 <= rating ? "#d97706" : "#e8ddd5" }}>★</span>
      ))}
      <span style={{ color:"#c4a882", fontSize:"10px", fontFamily:"'Rajdhani',sans-serif", marginLeft:"3px" }}>{rating}</span>
    </div>
  );
}

function ProductCard({ product, delay }) {
  const [tilt, setTilt]     = useState({});
  const [hov,  setHov]      = useState(false);
  const [added, setAdded]   = useState(false);
  const [imgHov, setImgHov] = useState(false);

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

  const handleBuy = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = Math.round((1 - parseInt(product.price.replace(/[₹,]/g,"")) / parseInt(product.originalPrice.replace(/[₹,]/g,""))) * 100);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        background: hov ? `linear-gradient(160deg,#fff,${product.accent}06)` : "#ffffff",
        border:`1px solid ${hov ? product.accent+"45" : "#ede5dc"}`,
        borderRadius:"20px",
        boxShadow: hov
          ? `0 24px 56px ${product.accent}18, 0 4px 16px rgba(0,0,0,0.08)`
          : "0 2px 14px rgba(0,0,0,0.06)",
        transition:"border .28s, box-shadow .28s, background .28s",
        transformStyle:"preserve-3d",
        position:"relative", overflow:"hidden",
        animation:`sp-up .55s ${delay}s both`,
        display:"flex", flexDirection:"column",
        ...tilt,
      }}>

      {/* Top accent line */}
      {hov && <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:`linear-gradient(90deg,transparent,${product.accent},transparent)`, zIndex:2, boxShadow:`0 0 10px ${product.accent}60` }} />}

      {/* Discount badge */}
      <div style={{ position:"absolute", top:"12px", left:"12px", background:`linear-gradient(135deg,${product.accent},${product.accent}cc)`, color:"#fff", fontSize:"10px", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"1px", padding:"3px 9px", borderRadius:"5px", zIndex:3, boxShadow:`0 2px 8px ${product.accent}50` }}>
        -{discount}% OFF
      </div>

      {/* Tag badge */}
      <div style={{ position:"absolute", top:"12px", right:"12px", background:"#fdf8f4", border:`1px solid ${product.accent}30`, color:product.accent, fontSize:"9px", fontFamily:"'Rajdhani',sans-serif", letterSpacing:"1.5px", padding:"3px 8px", borderRadius:"5px", zIndex:3, textTransform:"uppercase" }}>
        {product.badge} {product.tag}
      </div>

      {/* Image area */}
      <div
        onMouseEnter={() => setImgHov(true)}
        onMouseLeave={() => setImgHov(false)}
        style={{
          background:`linear-gradient(135deg,#fdf8f4,${product.accent}08)`,
          borderBottom:"1px solid #ede5dc",
          padding:"24px 20px 18px",
          display:"flex", alignItems:"center", justifyContent:"center",
          overflow:"hidden", position:"relative", minHeight:"190px",
        }}>
        {/* BG glow */}
        <div style={{ position:"absolute", inset:0, background:`radial-gradient(circle at 50% 60%,${product.accent}08,transparent 70%)`, pointerEvents:"none" }} />
        <img
          src={product.img}
          alt={product.name}
          style={{
            maxHeight:"150px", maxWidth:"100%", objectFit:"contain",
            transition:"transform .4s ease, filter .3s",
            transform: imgHov ? "scale(1.1) translateY(-4px)" : "scale(1)",
            filter: imgHov ? `drop-shadow(0 12px 20px ${product.accent}40)` : "drop-shadow(0 4px 8px rgba(0,0,0,0.10))",
            position:"relative", zIndex:1,
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding:"16px 18px 18px", display:"flex", flexDirection:"column", flex:1 }}>

        {/* Name + rating */}
        <div style={{ marginBottom:"8px" }}>
          <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"19px", letterSpacing:"1.5px", margin:"0 0 4px", color:"#1a0a00", lineHeight:1 }}>{product.name}</h3>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <StarRating rating={product.rating} />
            <span style={{ color:"#c4a882", fontSize:"10px", fontFamily:"'Rajdhani',sans-serif" }}>({product.reviews})</span>
          </div>
        </div>

        {/* Desc */}
        <p style={{ color:"#8a6a50", fontSize:"11.5px", lineHeight:1.6, margin:"0 0 12px", fontFamily:"'Rajdhani',sans-serif", flex:1 }}>{product.desc}</p>

        {/* Price row */}
        <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"14px" }}>
          <span style={{ color:product.accent, fontFamily:"'Bebas Neue',sans-serif", fontSize:"24px", letterSpacing:"1px", lineHeight:1 }}>{product.price}</span>
          <span style={{ color:"#c4a882", fontSize:"12px", fontFamily:"'Rajdhani',sans-serif", textDecoration:"line-through" }}>{product.originalPrice}</span>
          <span style={{ marginLeft:"auto", background:`${product.accent}12`, border:`1px solid ${product.accent}25`, color:product.accent, fontSize:"10px", fontFamily:"'Rajdhani',sans-serif", padding:"2px 7px", borderRadius:"4px", letterSpacing:"0.5px" }}>Save {discount}%</span>
        </div>

        {/* Buy button */}
        <button
          onClick={handleBuy}
          style={{
            width:"100%", padding:"12px",
            background: added
              ? "linear-gradient(135deg,#16a34a,#15803d)"
              : `linear-gradient(135deg,${product.accent},${product.accent}cc)`,
            border:"none", borderRadius:"11px",
            color:"#fff", fontFamily:"'Bebas Neue',sans-serif",
            fontSize:"15px", letterSpacing:"2.5px",
            cursor:"pointer",
            boxShadow: added ? "0 4px 16px rgba(22,163,74,0.4)" : `0 4px 16px ${product.accent}40`,
            transition:"all .3s ease",
            transform: added ? "scale(0.98)" : "scale(1)",
          }}
          onMouseEnter={e=>{ if(!added){ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 8px 24px ${product.accent}55`; }}}
          onMouseLeave={e=>{ if(!added){ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=`0 4px 16px ${product.accent}40`; }}}>
          {added ? "✓ ADDED TO CART" : "BUY NOW →"}
        </button>
      </div>
    </div>
  );
}

export default function Supplements() {
  const [filter, setFilter] = useState("All");
  const FILTERS = ["All", "Best Seller", "Top Rated", "Premium", "Energy", "Bulk Up"];

  const filtered = filter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.tag === filter);

  return (
    <DashboardLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;600;700&display=swap');
        @keyframes sp-up  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes sp-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(1.3)} }
      `}</style>

      {/* PAGE HEADER */}
      <div style={{
        background:"#ffffff", border:"1px solid #ede5dc",
        borderRadius:"18px", padding:"22px 26px",
        marginBottom:"18px", position:"relative", overflow:"hidden",
        animation:"sp-up .45s 0s both",
        boxShadow:"0 2px 14px rgba(0,0,0,0.05)",
      }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:"linear-gradient(90deg,#e85d00,#ff9950,transparent)" }} />
        <div style={{ position:"absolute", top:"-30px", right:"-30px", width:"180px", height:"180px", background:"radial-gradient(circle,rgba(232,93,0,0.07),transparent 70%)", borderRadius:"50%", pointerEvents:"none" }} />

        <div style={{ position:"relative" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"6px" }}>
            <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#e85d00", display:"inline-block", boxShadow:"0 0 5px rgba(232,93,0,0.7)", animation:"sp-dot 2s infinite" }} />
            <span style={{ color:"#e85d00", fontSize:"10px", letterSpacing:"3px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase" }}>Beast House</span>
          </div>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(22px,4vw,36px)", letterSpacing:"3px", margin:"0 0 5px", color:"#1a0a00", lineHeight:1 }}>
            BUY <span style={{ color:"#e85d00" }}>SUPPLEMENTS 💪</span>
          </h2>
          <p style={{ color:"#8a6a50", fontSize:"12px", margin:"0 0 14px", lineHeight:1.6 }}>
            Premium quality supplements — Whey, Creatine, Vitamins, Pre-Workout and more.
          </p>

          {/* Filter pills */}
          <div style={{ display:"flex", gap:"7px", flexWrap:"wrap" }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{
                  padding:"5px 13px",
                  background: filter===f ? "linear-gradient(135deg,#ff6b1a,#e85d00)" : "#fdf8f4",
                  border:`1px solid ${filter===f ? "#e85d00" : "#ede5dc"}`,
                  borderRadius:"20px", color: filter===f ? "#fff" : "#8a6a50",
                  fontFamily:"'Rajdhani',sans-serif", fontSize:"11px",
                  letterSpacing:"0.5px", cursor:"pointer",
                  boxShadow: filter===f ? "0 3px 10px rgba(232,93,0,0.35)" : "none",
                  transition:"all .2s",
                }}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:"14px" }}>
        {filtered.map((product, i) => (
          <ProductCard key={product.id} product={product} delay={0.06 + i * 0.07} />
        ))}
      </div>

    </DashboardLayout>
  );
}