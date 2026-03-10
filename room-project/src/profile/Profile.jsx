import { useState, useRef, useEffect, useCallback } from "react";
 
const PARTICLES = Array.from({ length: 60 }, (_, i) => ({

  id: i,

  x: Math.random() * 100,

  y: Math.random() * 100,

  size: Math.random() * 3 + 1,

  speed: Math.random() * 0.5 + 0.2,

  opacity: Math.random() * 0.7 + 0.3,

  color: ["#00f5ff", "#ff00ff", "#7b2ff7", "#00ff88"][Math.floor(Math.random() * 4)],

}));
 
const StatBadge = ({ label, value, icon, color }) => (
<div style={{

    background: `linear-gradient(135deg, ${color}15, ${color}05)`,

    border: `1px solid ${color}40`,

    borderRadius: "12px",

    padding: "14px 16px",

    position: "relative",

    overflow: "hidden",

    transition: "all 0.3s ease",

    cursor: "default",

  }}

    onMouseEnter={e => {

      e.currentTarget.style.transform = "translateY(-4px) scale(1.03)";

      e.currentTarget.style.boxShadow = `0 8px 25px ${color}30`;

      e.currentTarget.style.borderColor = `${color}80`;

    }}

    onMouseLeave={e => {

      e.currentTarget.style.transform = "translateY(0) scale(1)";

      e.currentTarget.style.boxShadow = "none";

      e.currentTarget.style.borderColor = `${color}40`;

    }}
>
<div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
<div style={{ fontSize: "20px", marginBottom: "4px" }}>{icon}</div>
<div style={{ color: "#888", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", fontFamily: "monospace" }}>{label}</div>
<div style={{ color: color, fontSize: "16px", fontWeight: "700", marginTop: "4px", fontFamily: "'Courier New', monospace" }}>{value}</div>
</div>

);
 
export default function Profile3D() {

  const cardRef = useRef(null);

  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const [isHovering, setIsHovering] = useState(false);

  const [bgImage, setBgImage] = useState(null);

  const [profileImage, setProfileImage] = useState("");

  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const [particles, setParticles] = useState(PARTICLES);

  const animRef = useRef(null);

  const [tick, setTick] = useState(0);
 
  const [user] = useState({

    name: "Bharat Guri ",

    email: "mrGuri@gmail.com",

    gender: "Male ♂",

    weight: "72 kg",

    height: "175 cm",

    level: "Intermediate",

    description: "I start my day with morning jogging and yoga. After breakfast I go to the gym for strength training and cardio. In the evening I do cycling or light workout to stay active.",

  });
 
  useEffect(() => {

    let frame;

    const animate = () => {

      setTick(t => t + 1);

      frame = requestAnimationFrame(animate);

    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);

  }, []);
 
  const handleMouseMove = useCallback((e) => {

    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const cx = rect.left + rect.width / 2;

    const cy = rect.top + rect.height / 2;

    const dx = (e.clientX - cx) / (rect.width / 2);

    const dy = (e.clientY - cy) / (rect.height / 2);

    setRotation({ x: -dy * 18, y: dx * 18 });

    setGlowPos({

      x: ((e.clientX - rect.left) / rect.width) * 100,

      y: ((e.clientY - rect.top) / rect.height) * 100,

    });

  }, []);
 
  const handleMouseLeave = () => {

    setIsHovering(false);

    setRotation({ x: 0, y: 0 });

  };
 
  const handleBgUpload = (e) => {

    const file = e.target.files[0];

    if (file) {

      const url = URL.createObjectURL(file);

      setBgImage(url);

    }

  };
 
  const handleProfileUpload = (e) => {

    const file = e.target.files[0];

    if (file) {

      const url = URL.createObjectURL(file);

      setProfileImage(url);

    }

  };
 
  const floatY = Math.sin(tick * 0.03) * 8;

  const floatX = Math.cos(tick * 0.02) * 4;
 
  return (
<div style={{

      minHeight: "100vh",

      display: "flex",

      flexDirection: "column",

      alignItems: "center",

      justifyContent: "center",

      background: bgImage

        ? `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${bgImage}) center/cover`

        : "radial-gradient(ellipse at 20% 20%, #0d0221 0%, #0a0a1a 40%, #000510 100%)",

      fontFamily: "'Segoe UI', sans-serif",

      overflow: "hidden",

      position: "relative",

      padding: "20px",

    }}>

      {/* Animated Grid Background */}
<div style={{

        position: "fixed", inset: 0, zIndex: 0,

        backgroundImage: `linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px)`,

        backgroundSize: "50px 50px",

        animation: "none",

      }} />
 
      {/* Floating Particles */}
<svg style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>

        {particles.map(p => (
<circle

            key={p.id}

            cx={`${(p.x + tick * p.speed * 0.05) % 100}%`}

            cy={`${(p.y + tick * p.speed * 0.02) % 100}%`}

            r={p.size}

            fill={p.color}

            opacity={p.opacity * (0.5 + 0.5 * Math.sin(tick * 0.05 + p.id))}

          />

        ))}
</svg>
 
      {/* Neon Orbs */}
<div style={{ position: "fixed", top: "10%", left: "10%", width: "300px", height: "300px", background: "radial-gradient(circle, #7b2ff740 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)", zIndex: 0, animation: "none", transform: `translate(${Math.sin(tick * 0.02) * 20}px, ${Math.cos(tick * 0.015) * 20}px)` }} />
<div style={{ position: "fixed", bottom: "10%", right: "10%", width: "250px", height: "250px", background: "radial-gradient(circle, #00f5ff30 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)", zIndex: 0, transform: `translate(${Math.cos(tick * 0.02) * 20}px, ${Math.sin(tick * 0.015) * 20}px)` }} />
<div style={{ position: "fixed", top: "50%", left: "5%", width: "200px", height: "200px", background: "radial-gradient(circle, #ff00ff20 0%, transparent 70%)", borderRadius: "50%", filter: "blur(30px)", zIndex: 0 }} />
 
      {/* Upload Buttons */}
<div style={{ display: "flex", gap: "12px", marginBottom: "20px", zIndex: 10, flexWrap: "wrap", justifyContent: "center" }}>
<label style={{

          background: "linear-gradient(135deg, #7b2ff720, #0d0221)",

          border: "1px solid #7b2ff780",

          color: "#c084fc",

          padding: "8px 18px",

          borderRadius: "20px",

          cursor: "pointer",

          fontSize: "13px",

          fontFamily: "monospace",

          letterSpacing: "1px",

          transition: "all 0.3s",

          backdropFilter: "blur(10px)",

        }}>

          🖼️ BACKGROUND IMAGE
<input type="file" accept="image/*" onChange={handleBgUpload} style={{ display: "none" }} />
</label>
<label style={{

          background: "linear-gradient(135deg, #00f5ff20, #0d0221)",

          border: "1px solid #00f5ff80",

          color: "#67e8f9",

          padding: "8px 18px",

          borderRadius: "20px",

          cursor: "pointer",

          fontSize: "13px",

          fontFamily: "monospace",

          letterSpacing: "1px",

          transition: "all 0.3s",

          backdropFilter: "blur(10px)",

        }}>

          👤 PROFILE PHOTO
<input type="file" accept="image/*" onChange={handleProfileUpload} style={{ display: "none" }} />
</label>
</div>
 
      {/* 3D Card */}
<div

        ref={cardRef}

        onMouseMove={handleMouseMove}

        onMouseEnter={() => setIsHovering(true)}

        onMouseLeave={handleMouseLeave}

        style={{

          perspective: "1200px",

          zIndex: 10,

          transform: `translateY(${floatY}px) translateX(${floatX * 0.3}px)`,

          transition: isHovering ? "none" : "transform 0.8s ease",

        }}
>
<div style={{

          width: "min(520px, 92vw)",

          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,

          transition: isHovering ? "transform 0.1s ease" : "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)",

          transformStyle: "preserve-3d",

          borderRadius: "24px",

          background: `linear-gradient(135deg, rgba(13,2,33,0.95) 0%, rgba(10,10,26,0.98) 100%)`,

          border: "1px solid rgba(0,245,255,0.2)",

          boxShadow: isHovering

            ? `0 40px 80px rgba(0,0,0,0.8), 0 0 40px rgba(123,47,247,0.4), 0 0 80px rgba(0,245,255,0.15), inset 0 1px 0 rgba(255,255,255,0.1)`

            : `0 25px 50px rgba(0,0,0,0.7), 0 0 30px rgba(123,47,247,0.2)`,

          overflow: "hidden",

          position: "relative",

        }}>
 
          {/* Dynamic Glow Follower */}

          {isHovering && (
<div style={{

              position: "absolute",

              width: "200px", height: "200px",

              background: "radial-gradient(circle, rgba(0,245,255,0.15) 0%, transparent 70%)",

              borderRadius: "50%",

              left: `${glowPos.x}%`, top: `${glowPos.y}%`,

              transform: "translate(-50%, -50%)",

              pointerEvents: "none",

              zIndex: 1,

              transition: "left 0.1s, top 0.1s",

            }} />

          )}
 
          {/* Top Neon Line */}
<div style={{

            height: "3px",

            background: "linear-gradient(90deg, transparent 0%, #00f5ff 30%, #7b2ff7 70%, transparent 100%)",

            boxShadow: "0 0 15px #00f5ff80",

          }} />
 
          {/* Scan Line Animation */}
<div style={{

            position: "absolute", left: 0, right: 0, height: "2px",

            background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.6), transparent)",

            top: `${(tick % 200) / 200 * 100}%`,

            zIndex: 2, pointerEvents: "none",

            boxShadow: "0 0 10px #00f5ff",

            opacity: 0.4,

          }} />
 
          <div style={{ padding: "30px", position: "relative", zIndex: 3 }}>
 
            {/* Header */}
<div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px" }}>

              {/* Profile Image with 3D Ring */}
<div style={{ position: "relative", flexShrink: 0 }}>
<div style={{

                  position: "absolute", inset: "-4px",

                  borderRadius: "50%",

                  background: `conic-gradient(from ${tick * 2}deg, #00f5ff, #7b2ff7, #ff00ff, #00ff88, #00f5ff)`,

                  padding: "3px",

                  boxShadow: "0 0 20px rgba(0,245,255,0.5)",

                }} />
<img

                  src={profileImage}

                  alt="profile"

                  style={{

                    width: "90px", height: "90px",

                    borderRadius: "50%",

                    border: "3px solid #0d0221",

                    objectFit: "cover",

                    position: "relative",

                    display: "block",

                    transform: "translateZ(20px)",

                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",

                  }}

                />
<div style={{

                  position: "absolute", bottom: "2px", right: "2px",

                  width: "16px", height: "16px",

                  background: "#00ff88",

                  borderRadius: "50%",

                  border: "2px solid #0d0221",

                  boxShadow: "0 0 8px #00ff88",

                }} />
</div>
 
              {/* Name & Email */}
<div style={{ flex: 1 }}>
<div style={{

                  color: "rgba(0,245,255,0.7)",

                  fontSize: "11px",

                  fontFamily: "monospace",

                  letterSpacing: "3px",

                  marginBottom: "4px",

                  textTransform: "uppercase",

                }}>

                  ◈ FITNESS PROFILE
</div>
<h2 style={{

                  color: "#fff",

                  fontSize: "24px",

                  fontWeight: "800",

                  margin: "0 0 4px",

                  textShadow: "0 0 20px rgba(0,245,255,0.5)",

                  letterSpacing: "0.5px",

                }}>

                  {user.name}
</h2>
<p style={{

                  color: "#666",

                  fontSize: "13px",

                  margin: 0,

                  fontFamily: "monospace",

                }}>

                  {user.email}
</p>

                {/* Level Badge */}
<div style={{

                  display: "inline-block",

                  marginTop: "8px",

                  background: "linear-gradient(135deg, #7b2ff730, #00f5ff10)",

                  border: "1px solid #7b2ff760",

                  borderRadius: "20px",

                  padding: "3px 12px",

                  fontSize: "11px",

                  color: "#c084fc",

                  fontFamily: "monospace",

                  letterSpacing: "1px",

                }}>

                  ⚡ {user.level.toUpperCase()}
</div>
</div>
</div>
 
            {/* Stats Grid */}
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
<StatBadge label="Gender" value={user.gender} icon="⚤" color="#00f5ff" />
<StatBadge label="Weight" value={user.weight} icon="⚖️" color="#ff00ff" />
<StatBadge label="Height" value={user.height} icon="📏" color="#00ff88" />
<StatBadge label="Fitness Level" value={user.level} icon="🏆" color="#ffd700" />
</div>
 
            {/* Activity Section */}
<div style={{

              background: "linear-gradient(135deg, rgba(0,245,255,0.05), rgba(123,47,247,0.05))",

              border: "1px solid rgba(0,245,255,0.15)",

              borderRadius: "14px",

              padding: "16px",

              marginBottom: "22px",

              position: "relative",

              overflow: "hidden",

            }}>
<div style={{

                position: "absolute", top: 0, left: "20%", right: "20%", height: "1px",

                background: "linear-gradient(90deg, transparent, #00f5ff60, transparent)",

              }} />
<div style={{

                color: "#00f5ff",

                fontSize: "12px",

                fontFamily: "monospace",

                letterSpacing: "2px",

                marginBottom: "10px",

                display: "flex", alignItems: "center", gap: "8px",

              }}>
<span style={{ animation: "none", display: "inline-block", transform: `scale(${1 + Math.sin(tick * 0.1) * 0.1})` }}>◉</span>

                DAILY ACTIVITY LOG
</div>
<p style={{

                color: "rgba(255,255,255,0.65)",

                fontSize: "13.5px",

                lineHeight: "1.7",

                margin: 0,

                fontStyle: "italic",

              }}>

                {user.description}
</p>
</div>
 
            {/* Edit Button */}
<button

              onMouseEnter={e => {

                e.currentTarget.style.background = "linear-gradient(135deg, #00f5ff, #7b2ff7)";

                e.currentTarget.style.color = "#000";

                e.currentTarget.style.boxShadow = "0 0 30px rgba(0,245,255,0.6)";

                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";

              }}

              onMouseLeave={e => {

                e.currentTarget.style.background = "transparent";

                e.currentTarget.style.color = "#00f5ff";

                e.currentTarget.style.boxShadow = "0 0 15px rgba(0,245,255,0.2)";

                e.currentTarget.style.transform = "translateY(0) scale(1)";

              }}

              style={{

                width: "100%",

                background: "transparent",

                border: "1px solid #00f5ff60",

                color: "#00f5ff",

                padding: "14px",

                borderRadius: "14px",

                fontSize: "14px",

                fontWeight: "700",

                fontFamily: "monospace",

                letterSpacing: "3px",

                cursor: "pointer",

                transition: "all 0.3s ease",

                boxShadow: "0 0 15px rgba(0,245,255,0.2)",

              }}
>

              ✦ EDIT PROFILE ✦
</button>
</div>
 
          {/* Bottom Neon Line */}
<div style={{

            height: "2px",

            background: "linear-gradient(90deg, transparent 0%, #7b2ff7 50%, transparent 100%)",

            boxShadow: "0 0 10px #7b2ff780",

          }} />
</div>
</div>
 
      {/* Corner HUD Elements */}
<div style={{ position: "fixed", top: "15px", left: "15px", color: "rgba(0,245,255,0.3)", fontFamily: "monospace", fontSize: "11px", zIndex: 5 }}>

        SYS://PROFILE_V2.0
</div>
<div style={{ position: "fixed", top: "15px", right: "15px", color: "rgba(0,245,255,0.3)", fontFamily: "monospace", fontSize: "11px", zIndex: 5 }}>

        {new Date().toLocaleTimeString()}
</div>
<div style={{ position: "fixed", bottom: "15px", left: "15px", color: "rgba(0,245,255,0.2)", fontFamily: "monospace", fontSize: "10px", zIndex: 5 }}>

        ◈ MOVE MOUSE OVER CARD FOR 3D EFFECT
</div>
</div>

  );

}
 