import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createSale } from "../service/userservice";

// ── Light Warm Theme (same as dashboard) ─────────────────────────────────────
const L = {
  bg:       "#f5f0eb",
  bgCard:   "#ffffff",
  bgInput:  "#fdf8f4",
  border:   "#e8ddd5",
  borderHi: "#e85d00",
  orange:   "#e85d00",
  orangeDim:"#e85d0015",
  orangeMid:"#e85d0035",
  text:     "#1a0a00",
  textSub:  "#8a6a50",
  textMute: "#c4a882",
  error:    "#dc2626",
  green:    "#16a34a",
};

function FormField({ label, icon, error, children }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display:"flex", alignItems:"center", gap:"6px", color:L.textSub, fontSize:"11px", fontFamily:"'Rajdhani',sans-serif", letterSpacing:"2px", textTransform:"uppercase", marginBottom:"7px" }}>
        <span>{icon}</span>{label}
      </label>
      {children}
      {error && (
        <div style={{ display:"flex", alignItems:"center", gap:"5px", marginTop:"5px" }}>
          <span style={{ color:L.error, fontSize:"11px", fontFamily:"'Rajdhani',sans-serif" }}>⚠ {error}</span>
        </div>
      )}
    </div>
  );
}

function StyledInput({ hasError, ...props }) {
  const [foc, setFoc] = require("react").useState(false);
  return (
    <input
      onFocus={() => setFoc(true)}
      onBlur={() => setFoc(false)}
      style={{
        width: "100%",
        padding: "11px 14px",
        background: foc ? "#fff" : L.bgInput,
        border: `1px solid ${hasError ? L.error+"80" : foc ? L.orange+"60" : L.border}`,
        borderRadius: "10px",
        color: L.text,
        fontFamily: "'Rajdhani',sans-serif",
        fontSize: "14px",
        letterSpacing: "0.3px",
        outline: "none",
        transition: "all .22s ease",
        boxShadow: foc ? `0 0 0 3px ${hasError ? L.error+"15" : L.orange+"12"}` : "none",
      }}
      {...props}
    />
  );
}

export default function SaleProduct() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ mode: "onChange" });

  const onSubmit = async (values) => {
    try {
      await createSale(values);
      toast.success("Product sale added successfully 💰");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Sale creation failed");
      console.log(error);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: L.bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px",
      fontFamily: "'Rajdhani',sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;600;700&display=swap');
        @keyframes sp-up   { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes sp-dot  { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes sp-orb  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-15px)} }
        input::placeholder { color: ${L.textMute}; }
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance:none; margin:0; }
        input[type=number] { -moz-appearance:textfield; }
      `}</style>

      {/* BG dot grid */}
      <div style={{ position:"fixed", inset:0, zIndex:0, opacity:.5, backgroundImage:`radial-gradient(circle, #e0c8b0 1px, transparent 1px)`, backgroundSize:"28px 28px" }} />

      {/* BG orbs */}
      <div style={{ position:"fixed", top:"10%", right:"8%", width:"340px", height:"340px", background:`radial-gradient(circle,${L.orange}07 0%,transparent 70%)`, borderRadius:"50%", zIndex:0, animation:"sp-orb 12s ease-in-out infinite" }} />
      <div style={{ position:"fixed", bottom:"12%", left:"6%", width:"280px", height:"280px", background:"radial-gradient(circle,rgba(124,58,237,0.04) 0%,transparent 70%)", borderRadius:"50%", zIndex:0, animation:"sp-orb 16s ease-in-out infinite reverse" }} />

      {/* CARD */}
      <div style={{
        width: "min(440px, 96vw)",
        background: L.bgCard,
        border: `1px solid ${L.border}`,
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 8px 40px rgba(0,0,0,0.08), 0 2px 12px rgba(0,0,0,0.04)",
        animation: "sp-up .5s .05s both",
        position: "relative", zIndex: 1,
      }}>

        {/* Top orange line */}
        <div style={{ height:"3px", background:`linear-gradient(90deg,transparent,${L.orange},${L.orange}80,transparent)` }} />

        {/* HEADER */}
        <div style={{
          padding: "26px 28px 22px",
          borderBottom: `1px solid ${L.border}`,
          background: `linear-gradient(135deg,#fff,${L.orange}05)`,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position:"absolute", top:"-20px", right:"-20px", width:"120px", height:"120px", background:`radial-gradient(circle,${L.orange}08,transparent 70%)`, borderRadius:"50%", pointerEvents:"none" }} />
          <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"8px" }}>
            <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:L.orange, display:"inline-block", boxShadow:`0 0 5px ${L.orange}80`, animation:"sp-dot 2s infinite" }} />
            <span style={{ color:L.orange, fontSize:"10px", letterSpacing:"3px", fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase" }}>Beast House</span>
          </div>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"28px", letterSpacing:"3px", margin:"0 0 5px", color:L.text, lineHeight:1 }}>
            CREATE <span style={{ color:L.orange }}>SALE</span>
          </h2>
          <p style={{ color:L.textSub, fontSize:"12px", margin:0, letterSpacing:"0.4px" }}>
            Add product sale details and manage your inventory 📦
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} style={{ padding:"22px 28px 26px" }}>

          {/* Sale ID */}
          <FormField label="Sale ID" icon="🏷️" error={errors.saleId?.message}>
            <StyledInput
              placeholder="Enter sale ID"
              hasError={!!errors.saleId}
              {...register("saleId", { required: "Sale ID is required" })}
            />
          </FormField>

          {/* Quantity */}
          <FormField label="Quantity" icon="📦" error={errors.quantity?.message}>
            <StyledInput
              placeholder="Enter quantity"
              type="number"
              hasError={!!errors.quantity}
              {...register("quantity", { required: "Quantity is required", min: { value:1, message:"Min 1" } })}
            />
          </FormField>

          {/* Price */}
          <FormField label="Price (₹)" icon="💰" error={errors.price?.message}>
            <StyledInput
              placeholder="Enter price"
              type="number"
              hasError={!!errors.price}
              {...register("price", { required: "Price is required", min: { value:0, message:"Invalid price" } })}
            />
          </FormField>

          {/* Discount + Tax — side by side */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
            <FormField label="Discount %" icon="🏷️">
              <StyledInput
                placeholder="0"
                type="number"
                {...register("discount")}
              />
            </FormField>
            <FormField label="Tax %" icon="📋">
              <StyledInput
                placeholder="0"
                type="number"
                {...register("taxe")}
              />
            </FormField>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width:"100%", padding:"13px",
              background: isSubmitting
                ? L.border
                : `linear-gradient(135deg,${L.orange},#cc4400)`,
              border:"none", borderRadius:"11px",
              color: isSubmitting ? L.textMute : "#fff",
              fontFamily:"'Bebas Neue',sans-serif",
              fontSize:"16px", letterSpacing:"3px",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              boxShadow: isSubmitting ? "none" : `0 4px 18px ${L.orange}35`,
              transition:"all .25s", marginTop:"6px",
            }}
            onMouseEnter={e=>{ if(!isSubmitting){ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 8px 24px ${L.orange}50`; }}}
            onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=`0 4px 18px ${L.orange}35`; }}
          >
            {isSubmitting ? "CREATING..." : "CREATE SALE 💰"}
          </button>

          {/* Back link */}
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            style={{ width:"100%", marginTop:"10px", padding:"10px", background:"transparent", border:`1px solid ${L.border}`, borderRadius:"10px", color:L.textSub, fontFamily:"'Rajdhani',sans-serif", fontSize:"13px", letterSpacing:"1px", cursor:"pointer", transition:"all .2s" }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor=L.orange+"40"; e.currentTarget.style.color=L.text; }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor=L.border; e.currentTarget.style.color=L.textSub; }}
          >
            ← Back to Dashboard
          </button>

        </form>

        {/* Bottom line */}
        <div style={{ height:"1px", background:`linear-gradient(90deg,transparent,${L.border},transparent)` }} />
      </div>
    </div>
  );
}