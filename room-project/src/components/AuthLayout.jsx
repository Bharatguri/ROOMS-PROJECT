function AuthLayout({ title, subtitle, children }) {

  const QUOTES = [
    { text: "Push yourself because no one else is going to do it for you.", author: "— Beast House" },
    { text: "Success starts with self-discipline. Show up every single day.", author: "— Beast House" },
    { text: "Your body can stand almost anything. It's your mind you have to convince.", author: "— Beast House" },
    { text: "The pain you feel today will be the strength you feel tomorrow.", author: "— Beast House" },
    { text: "Wake up. Work out. Look hot. Kick ass. Repeat.", author: "— Beast House" },
  ];
  const quote = QUOTES[Math.floor(Date.now() / 86400000) % QUOTES.length];

  const STATS = [
    { icon:"🏋️", value:"200+", label:"Gyms"      },
    { icon:"🧑‍🏫", value:"50+",  label:"Trainers"  },
    { icon:"👥",  value:"5K+",  label:"Members"   },
    { icon:"🥗",  value:"20+",  label:"Diet Plans" },
  ];

  return (
    <div style={{
      height:"100vh", width:"100vw", overflow:"hidden",
      display:"grid", gridTemplateColumns:"1fr 1fr",
      fontFamily:"'Rajdhani',sans-serif",
      background:"#f5efe8",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;600;700&display=swap');
        @keyframes al-up     { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes al-float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes al-pulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.3)} }
        @keyframes al-orb    { 0%{transform:translate(0,0) scale(1)} 33%{transform:translate(22px,-15px) scale(1.06)} 66%{transform:translate(-10px,18px) scale(0.94)} 100%{transform:translate(0,0) scale(1)} }
        @keyframes al-shimmer{ 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes al-spin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @media(max-width:768px){
          .al-left{ display:none !important; }
          .al-wrap{ grid-template-columns:1fr !important; }
        }
        *{ box-sizing:border-box; margin:0; padding:0; }
        input::placeholder{ color:#c4a882; font-weight:400; }
        textarea::placeholder{ color:#c4a882; font-weight:400; }
      `}</style>

      {/* ══ LEFT ══ */}
      <div className="al-left" style={{
        height:"100vh", overflow:"hidden",
        position:"relative",
        background:"linear-gradient(150deg,#fff9f5 0%,#fdf1e6 45%,#f5ece0 100%)",
        borderRight:"1px solid #ede5dc",
        display:"flex", flexDirection:"column",
        justifyContent:"space-between",
      }}>
        {/* BG */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:"5%", right:"5%", width:"320px", height:"320px", background:"radial-gradient(circle,rgba(232,93,0,0.09),transparent 70%)", borderRadius:"50%", animation:"al-orb 13s ease-in-out infinite" }}/>
          <div style={{ position:"absolute", bottom:"8%", left:"5%", width:"240px", height:"240px", background:"radial-gradient(circle,rgba(124,58,237,0.06),transparent 70%)", borderRadius:"50%", animation:"al-orb 18s ease-in-out infinite reverse" }}/>
          <div style={{ position:"absolute", inset:0, opacity:.28, backgroundImage:"radial-gradient(circle,#d4b896 1px,transparent 1px)", backgroundSize:"26px 26px" }}/>
          <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:.03 }} xmlns="http://www.w3.org/2000/svg">
            {[...Array(16)].map((_,i)=>(
              <line key={i} x1={i*90-300} y1="0" x2={i*90+300} y2="900" stroke="#e85d00" strokeWidth="1.5"/>
            ))}
          </svg>
        </div>

        {/* Shimmer top */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:"linear-gradient(90deg,transparent,#e85d00,#ff9950,transparent)", backgroundSize:"200% 100%", animation:"al-shimmer 3s linear infinite", zIndex:2 }}/>

        {/* TOP: Logo */}
        <div style={{ padding:"clamp(20px,3vh,36px) clamp(24px,4vw,44px) 0", position:"relative", zIndex:1, animation:"al-up .6s both" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:"9px", background:"rgba(232,93,0,0.07)", border:"1px solid rgba(232,93,0,0.16)", borderRadius:"10px", padding:"6px 14px", marginBottom:"clamp(14px,2.5vh,24px)" }}>
            <span style={{ fontSize:"13px" }}>💀</span>
            <span style={{ color:"#e85d00", fontSize:"9px", letterSpacing:"3px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase", fontWeight:"700" }}>Beast House</span>
            <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:"#16a34a", boxShadow:"0 0 5px rgba(22,163,74,.7)", animation:"al-pulse 2s infinite", display:"inline-block" }}/>
          </div>

          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(34px,4.5vw,58px)", letterSpacing:"3.5px", color:"#1a0a00", lineHeight:.95 }}>
            TRAIN<br/>
            <span style={{ color:"#e85d00" }}>HARDER.</span><br/>
            LIVE<br/>
            <span style={{ WebkitTextStroke:"2px #1a0a00", color:"transparent" }}>STRONGER.</span>
          </h1>
          <div style={{ width:"70px", height:"3px", background:"linear-gradient(90deg,#e85d00,#ff9950)", borderRadius:"2px", margin:"clamp(10px,1.5vh,16px) 0 clamp(8px,1.2vh,14px)" }}/>
          <p style={{ color:"#8a6a50", fontSize:"clamp(11px,1.2vw,13px)", lineHeight:1.65, maxWidth:"280px", fontFamily:"'Rajdhani',sans-serif" }}>
            Your complete fitness ecosystem — gyms, trainers, diets and supplements.
          </p>
        </div>

        {/* MIDDLE: Stats */}
        <div style={{ padding:"0 clamp(24px,4vw,44px)", position:"relative", zIndex:1 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
            {STATS.map((s,i)=>(
              <div key={i} style={{ background:"rgba(255,255,255,0.65)", border:"1px solid #ede5dc", borderRadius:"12px", padding:"10px 14px", animation:`al-up .5s ${.1+i*.07}s both` }}>
                <div style={{ fontSize:"14px", marginBottom:"3px" }}>{s.icon}</div>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"20px", letterSpacing:"1px", color:"#1a0a00", lineHeight:1 }}>{s.value}</div>
                <div style={{ color:"#c4a882", fontSize:"9px", letterSpacing:"1.5px", textTransform:"uppercase", fontFamily:"'Rajdhani',sans-serif" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM: Quote */}
        <div style={{ padding:"0 clamp(24px,4vw,44px) clamp(20px,3vh,36px)", position:"relative", zIndex:1 }}>
          <div style={{ background:"linear-gradient(135deg,rgba(232,93,0,0.06),rgba(232,93,0,0.02))", border:"1px solid rgba(232,93,0,0.18)", borderLeft:"3px solid #e85d00", borderRadius:"0 12px 12px 0", padding:"12px 16px" }}>
            <div style={{ color:"#e85d00", fontSize:"22px", fontFamily:"'Bebas Neue',sans-serif", lineHeight:.8, marginBottom:"6px", opacity:.55 }}>"</div>
            <p style={{ color:"#3d1a00", fontSize:"12px", lineHeight:1.65, margin:"0 0 6px", fontFamily:"'Rajdhani',sans-serif", fontStyle:"italic", fontWeight:"600" }}>{quote.text}</p>
            <div style={{ color:"#c4a882", fontSize:"9px", letterSpacing:"1.5px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase" }}>{quote.author}</div>
          </div>
        </div>
      </div>

      {/* ══ RIGHT ══ */}
      <div style={{
        height:"100vh", overflow:"hidden",
        display:"flex", alignItems:"center", justifyContent:"center",
        background:"#f5efe8", padding:"clamp(16px,2vw,28px)",
        position:"relative",
      }}>
        <div style={{ position:"absolute", top:"-20px", right:"-20px", width:"240px", height:"240px", background:"radial-gradient(circle,rgba(232,93,0,0.06),transparent 70%)", borderRadius:"50%", pointerEvents:"none" }}/>

        {/* Card */}
        <div style={{
          background:"#ffffff", border:"1px solid #ede5dc",
          borderRadius:"20px",
          padding:"clamp(20px,2.5vw,32px)",
          width:"100%", maxWidth:"430px",
          boxShadow:"0 8px 40px rgba(232,93,0,0.08),0 2px 12px rgba(0,0,0,0.05)",
          position:"relative", overflow:"hidden",
          animation:"al-up .6s .1s both",
        }}>
          {/* Top accent */}
          <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:"linear-gradient(90deg,#e85d00,#ff9950,transparent)" }}/>

          {/* Header */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"clamp(12px,1.8vh,18px)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <div style={{ width:"26px", height:"26px", borderRadius:"8px", background:"linear-gradient(135deg,#ff6b1a,#e85d00)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px", boxShadow:"0 2px 8px rgba(232,93,0,0.4)" }}>💀</div>
              <span style={{ color:"#e85d00", fontSize:"9px", letterSpacing:"2.5px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase", fontWeight:"700" }}>Beast House</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"5px", background:"rgba(22,163,74,0.08)", border:"1px solid rgba(22,163,74,0.2)", borderRadius:"20px", padding:"3px 9px" }}>
              <span style={{ width:"4px", height:"4px", borderRadius:"50%", background:"#16a34a", animation:"al-pulse 2s infinite", display:"inline-block" }}/>
              <span style={{ color:"#16a34a", fontSize:"9px", letterSpacing:"1.5px", fontFamily:"'Rajdhani',sans-serif", fontWeight:"700" }}>LIVE</span>
            </div>
          </div>

          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(20px,2.5vw,28px)", letterSpacing:"2.5px", color:"#1a0a00", margin:"0 0 3px", lineHeight:1 }}>{title}</h2>
          <p style={{ color:"#8a6a50", fontSize:"12px", margin:"0 0 clamp(10px,1.5vh,16px)", fontFamily:"'Rajdhani',sans-serif", lineHeight:1.4 }}>{subtitle}</p>
          <div style={{ height:"1px", background:"linear-gradient(90deg,#e85d00,#ede5dc,transparent)", marginBottom:"clamp(10px,1.5vh,16px)" }}/>

          {children}

          <div style={{ marginTop:"clamp(8px,1.2vh,14px)", paddingTop:"clamp(8px,1.2vh,14px)", borderTop:"1px solid #f0e8e0", display:"flex", justifyContent:"center", gap:"14px" }}>
            {["✅ Verified","🔒 Secure","💪 Premium"].map(f=>(
              <span key={f} style={{ color:"#c4a882", fontSize:"9px", letterSpacing:"1px", fontFamily:"'Rajdhani',sans-serif" }}>{f}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;