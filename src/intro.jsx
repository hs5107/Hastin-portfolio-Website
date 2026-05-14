import React, { useState, useEffect } from "react";

const GOLD  = "#c9a84c";
const GOLD2 = "#e8c96d";
const NAV   = "#0a1628";

export default function Intro({ onComplete }) {
  const [phase, setPhase] = useState(0);
  // phase 0 = black screen
  // phase 1 = HS box draws border
  // phase 2 = HS letters appear + shimmer
  // phase 3 = name + subtitle fade up
  // phase 4 = tagline
  // phase 5 = curtain lifts out

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 1500),
      setTimeout(() => setPhase(4), 2200),
      setTimeout(() => setPhase(5), 3100),
      setTimeout(() => onComplete(), 3900),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: NAV,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column",
      transform: phase === 5 ? "translateY(-100%)" : "translateY(0)",
      transition: phase === 5 ? "transform 0.85s cubic-bezier(0.76,0,0.24,1)" : "none",
      pointerEvents: phase === 5 ? "none" : "all",
    }}>

      {/* Animated grid behind */}
      <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity: phase >= 1 ? 0.06 : 0, transition:"opacity 1s" }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="ig" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke={GOLD} strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ig)"/>
      </svg>

      {/* Gold horizontal lines — top & bottom */}
      <div style={{
        position:"absolute", top: 0, left:0, right:0, height:"2px",
        background:`linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? "scaleX(1)" : "scaleX(0)",
        transition: "transform 0.8s ease, opacity 0.4s",
        transformOrigin: "center",
      }}/>
      <div style={{
        position:"absolute", bottom:0, left:0, right:0, height:"2px",
        background:`linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? "scaleX(1)" : "scaleX(0)",
        transition: "transform 0.8s ease 0.1s, opacity 0.4s 0.1s",
        transformOrigin: "center",
      }}/>

      {/* Center content */}
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"1.6rem" }}>

        {/* HS Box */}
        <div style={{
          width: "80px", height: "80px",
          border: `1px solid ${phase >= 1 ? GOLD : "transparent"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
          transition: "border-color 0.6s ease, box-shadow 0.6s ease",
          boxShadow: phase >= 2 ? `0 0 32px rgba(201,168,76,0.35), 0 0 80px rgba(201,168,76,0.12)` : "none",
        }}>
          {/* Corner accents */}
          {[
            { top:0,    left:0,   borderTop:`2px solid ${GOLD}`,   borderLeft:`2px solid ${GOLD}` },
            { top:0,    right:0,  borderTop:`2px solid ${GOLD}`,   borderRight:`2px solid ${GOLD}` },
            { bottom:0, left:0,   borderBottom:`2px solid ${GOLD}`,borderLeft:`2px solid ${GOLD}` },
            { bottom:0, right:0,  borderBottom:`2px solid ${GOLD}`,borderRight:`2px solid ${GOLD}` },
          ].map((s, i) => (
            <div key={i} style={{
              position:"absolute", width:"12px", height:"12px",
              opacity: phase >= 1 ? 1 : 0,
              transition: `opacity 0.4s ease ${0.1 * i}s`,
              ...s,
            }}/>
          ))}

          {/* HS letters */}
          <span style={{
            fontFamily:"'Cormorant Garamond', serif", fontWeight:700,
            fontSize:"1.8rem", letterSpacing:"4px",
            opacity: phase >= 2 ? 1 : 0,
            transition: "opacity 0.5s ease",
            background: phase >= 2
              ? `linear-gradient(110deg, ${GOLD} 0%, ${GOLD} 30%, #fffde0 48%, #ffffff 52%, ${GOLD} 70%, ${GOLD} 100%)`
              : "none",
            backgroundSize: "300% auto",
            WebkitBackgroundClip: phase >= 2 ? "text" : "unset",
            WebkitTextFillColor: phase >= 2 ? "transparent" : GOLD,
            backgroundClip: phase >= 2 ? "text" : "unset",
            animation: phase >= 2 ? "introShimmer 2s linear infinite" : "none",
          }}>HS</span>

          {/* shimmer overlay */}
          {phase >= 2 && (
            <div style={{
              position:"absolute", inset:0,
              background:"linear-gradient(110deg, transparent 30%, rgba(255,253,220,0.18) 50%, transparent 70%)",
              backgroundSize:"300% auto",
              animation:"introShimmer 2s linear infinite",
              pointerEvents:"none",
            }}/>
          )}
        </div>

        {/* Name */}
        <div style={{ textAlign:"center" }}>
          <div style={{
            fontFamily:"'Cormorant Garamond', serif", fontWeight:700,
            fontSize:"clamp(1.6rem, 5vw, 2.6rem)", letterSpacing:"8px",
            color: "#f0f4ff",
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
            background: phase >= 3
              ? "linear-gradient(110deg, #c8d8f0 0%, #f0f4ff 30%, #ffffff 48%, #ffe97a 52%, #f0f4ff 70%, #c8d8f0 100%)"
              : "none",
            backgroundSize: "300% auto",
            WebkitBackgroundClip: phase >= 3 ? "text" : "unset",
            WebkitTextFillColor: phase >= 3 ? "transparent" : "#f0f4ff",
            backgroundClip: phase >= 3 ? "text" : "unset",
            animation: phase >= 3 ? "introShimmer 3s linear infinite" : "none",
          }}>HASTIN SUTHAR</div>

          {/* Divider line */}
          <div style={{
            height:"1px", margin:"0.9rem auto",
            background:`linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
            width: phase >= 3 ? "100%" : "0%",
            transition: "width 0.8s ease 0.2s",
          }}/>

          {/* Subtitle */}
          <div style={{
            fontFamily:"'Inter', sans-serif", fontSize:"clamp(0.6rem,1.5vw,0.72rem)",
            letterSpacing:"5px", textTransform:"uppercase",
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            background: phase >= 3
              ? `linear-gradient(110deg, ${GOLD} 0%, ${GOLD} 30%, #ffe97a 48%, #fff8dc 52%, ${GOLD} 70%, ${GOLD} 100%)`
              : "none",
            backgroundSize: "300% auto",
            WebkitBackgroundClip: phase >= 3 ? "text" : "unset",
            WebkitTextFillColor: phase >= 3 ? "transparent" : GOLD,
            backgroundClip: phase >= 3 ? "text" : "unset",
            animation: phase >= 3 ? "introShimmer 3s linear infinite 0.4s" : "none",
          }}>Integrated M.Sc. Mathematics · SVNIT</div>
        </div>

        {/* Tagline */}
        <div style={{
          fontFamily:"'Inter', sans-serif", fontSize:"clamp(0.6rem,1.2vw,0.68rem)",
          letterSpacing:"3px", color: `${GOLD}80`, textTransform:"uppercase",
          opacity: phase >= 4 ? 1 : 0,
          transform: phase >= 4 ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>Mathematics for Real world Applications</div>

        {/* Loading bar */}
        <div style={{ width:"clamp(120px,20vw,180px)", height:"1px", background:`${GOLD}20`, position:"relative", marginTop:"0.5rem" }}>
          <div style={{
            position:"absolute", top:0, left:0, height:"1px",
            background:`linear-gradient(90deg, ${GOLD}60, ${GOLD2})`,
            width: `${Math.min(phase * 25, 100)}%`,
            transition:"width 0.6s ease",
            boxShadow:`0 0 8px ${GOLD}`,
          }}/>
        </div>
      </div>

      <style>{`
        @keyframes introShimmer {
          0%   { background-position: -300% center; }
          100% { background-position:  300% center; }
        }
      `}</style>
    </div>
  );
}