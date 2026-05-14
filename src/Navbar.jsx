import React, { useState, useEffect } from "react";

const NAV    = "#0a1628";
const GOLD   = "#c9a84c";
const SILVER = "#94a3b8";
const BORDER = "rgba(201,168,76,0.18)";
const LINKS  = [
  { label:"Home",     href:"#home"     },
  { label:"About",    href:"#about"    },
  { label:"Projects", href:"#projects" },
  { label:"Skills",   href:"#skills"   },
  { label:"Contact",  href:"#contact"  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("home");
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      let cur = "home";
      for (const id of ["home","about","projects","skills","contact"]) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:1000,
        height:"64px", display:"flex", alignItems:"center",
        justifyContent:"space-between",
        padding:"0 clamp(1.2rem,4vw,3rem)",
        background: scrolled ? `${NAV}f0` : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${BORDER}` : "1px solid transparent",
        transition:"all 0.4s ease",
      }}>
        {/* Logo */}
        <a href="#home" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:"10px" }}>
          <div className="hs-box">HS</div>
          <div className="logo-text">
            <div className="name-shimmer">HASTIN SUTHAR</div>
            <div className="sub-shimmer">Mathematics · SVNIT</div>
          </div>
        </a>

        {/* Desktop links */}
        <div className="desk-nav" style={{ display:"flex", alignItems:"center", gap:"2rem" }}>
          {LINKS.map(({ label, href }) => {
            const id = href.replace("#","");
            const isActive = active === id;
            return (
              <a key={label} href={href} style={{
                fontFamily:"'Inter',sans-serif", fontSize:"0.68rem", letterSpacing:"2px",
                textTransform:"uppercase", color: isActive ? GOLD : SILVER,
                textDecoration:"none", fontWeight: isActive ? 600 : 400,
                borderBottom: isActive ? `1px solid ${GOLD}` : "1px solid transparent",
                paddingBottom:"2px", transition:"all 0.2s",
              }}
                onMouseEnter={e=>{ if(!isActive) e.currentTarget.style.color="#f0f4ff"; }}
                onMouseLeave={e=>{ if(!isActive) e.currentTarget.style.color=SILVER; }}
              >{label}</a>
            );
          })}
        </div>

        {/* Hamburger */}
        <button onClick={()=>setOpen(o=>!o)} className="ham-btn" aria-label="Toggle menu"
          style={{ display:"none", background:"none", border:`1px solid ${GOLD}40`, padding:"6px 10px", cursor:"pointer", color:GOLD, fontSize:"1rem" }}
        >{open ? "✕" : "☰"}</button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          position:"fixed", top:"64px", left:0, right:0, zIndex:999,
          background:`${NAV}f8`, borderBottom:`1px solid ${BORDER}`,
          backdropFilter:"blur(12px)",
        }}>
          {LINKS.map(({ label, href }) => (
            <a key={label} href={href} onClick={()=>setOpen(false)} style={{
              display:"block", padding:"1rem clamp(1.2rem,4vw,3rem)",
              fontFamily:"'Inter',sans-serif", fontSize:"0.78rem",
              letterSpacing:"2.5px", textTransform:"uppercase",
              color:SILVER, textDecoration:"none",
              borderBottom:`1px solid ${BORDER}`,
            }}>{label}</a>
          ))}
        </div>
      )}

      <style>{`
        /* ── Shared shimmer sweep keyframe ── */
        @keyframes shimmerSweep {
          0%   { background-position: -300% center; }
          100% { background-position:  300% center; }
        }

        /* ── HS Box: shimmer only, no heartbeat ── */
        .hs-box {
          width: 38px;
          height: 38px;
          border: 1px solid ${GOLD};
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
          font-size: 0.95rem;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
          /* gold shimmer on the text */
          background: linear-gradient(
            110deg,
            ${GOLD}  0%,
            ${GOLD}  35%,
            #fffde0  48%,
            #ffffff  52%,
            ${GOLD}  65%,
            ${GOLD}  100%
          );
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerSweep 2.4s linear infinite;
        }
        /* sweep overlay on the box surface */
        .hs-box::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            110deg,
            transparent  30%,
            rgba(255,253,220,0.22) 50%,
            transparent  70%
          );
          background-size: 300% auto;
          animation: shimmerSweep 2.4s linear infinite;
          pointer-events: none;
        }

        /* ── Name shimmer: white → bright flash → white ── */
        .name-shimmer {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 2px;
          background: linear-gradient(
            110deg,
            #c8d8f0  0%,
            #f0f4ff  30%,
            #ffffff  48%,
            #ffe97a  52%,
            #f0f4ff  70%,
            #c8d8f0  100%
          );
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerSweep 3s linear infinite;
        }

        /* ── Subtitle shimmer: gold tones ── */
        .sub-shimmer {
          font-family: 'Inter', sans-serif;
          font-size: 0.58rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          background: linear-gradient(
            110deg,
            ${GOLD}   0%,
            ${GOLD}   30%,
            #ffe97a   48%,
            #fff8dc   52%,
            ${GOLD}   70%,
            ${GOLD}   100%
          );
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerSweep 3s linear infinite 0.4s;
        }

        @media(max-width:768px){
          .desk-nav  { display:none !important; }
          .ham-btn   { display:flex !important; }
          .logo-text div:last-child { display:none; }
        }
        @media(max-width:360px){
          .logo-text { display:none; }
        }
      `}</style>
    </>
  );
}