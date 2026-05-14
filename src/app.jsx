import React, { useState, useEffect, useRef } from "react";
import Navbar from "./navbar.jsx";
import Intro from "./intro.jsx";

const NAV    = "#0a1628";
const NAVY   = "#0d1f3c";
const NAVY2  = "#112240";
const GOLD   = "#c9a84c";
const GOLD2  = "#e8c96d";
const SILVER = "#94a3b8";
const WHITE  = "#f0f4ff";
const BORDER = "rgba(201,168,76,0.18)";


/* ── Animated dual-layer moving grid ── */
function GridBg() {
  return (
    <>
      <style>{`
        @keyframes gridMove  { 0%{transform:translate(0,0)}    100%{transform:translate(80px,80px)} }
        @keyframes gridMove2 { 0%{transform:translate(0,0)}    100%{transform:translate(-120px,-120px)} }
        @keyframes gridPulse { 0%,100%{opacity:0.13} 50%{opacity:0.22} }
        .gbg1{position:absolute;inset:-80px;width:calc(100% + 160px);height:calc(100% + 160px);pointer-events:none;animation:gridMove 9s linear infinite,gridPulse 6s ease-in-out infinite;}
        .gbg2{position:absolute;inset:-120px;width:calc(100% + 240px);height:calc(100% + 240px);pointer-events:none;opacity:0.07;animation:gridMove2 15s linear infinite;}
      `}</style>
      <svg className="gbg1" xmlns="http://www.w3.org/2000/svg">
        <defs><pattern id="pg1" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M 80 0 L 0 0 0 80" fill="none" stroke={GOLD} strokeWidth="0.6"/></pattern></defs>
        <rect width="100%" height="100%" fill="url(#pg1)"/>
      </svg>
      <svg className="gbg2" xmlns="http://www.w3.org/2000/svg">
        <defs><pattern id="pg2" width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M 120 0 L 0 0 0 120" fill="none" stroke={GOLD} strokeWidth="0.4"/>
          <circle cx="0"   cy="0"   r="1.8" fill={GOLD} opacity="0.7"/>
          <circle cx="120" cy="0"   r="1.8" fill={GOLD} opacity="0.7"/>
          <circle cx="0"   cy="120" r="1.8" fill={GOLD} opacity="0.7"/>
          <circle cx="120" cy="120" r="1.8" fill={GOLD} opacity="0.7"/>
        </pattern></defs>
        <rect width="100%" height="100%" fill="url(#pg2)"/>
      </svg>
    </>
  );
}

/* ── Counter ── */
function Counter({ to, suffix="" }) {
  const [val, setVal] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let s = 0;
      const step = Math.ceil(to / 40);
      const t = setInterval(() => { s = Math.min(s + step, to); setVal(s); if (s >= to) clearInterval(t); }, 35);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Typewriter ── */
function TypeWriter({ texts }) {
  const [displayed, setDisplayed] = useState("");
  const [ti, setTi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = texts[ti];
    if (!del && ci < cur.length)         { const t = setTimeout(() => setCi(i=>i+1), 65);   return ()=>clearTimeout(t); }
    if (!del && ci === cur.length)       { const t = setTimeout(() => setDel(true), 2200);  return ()=>clearTimeout(t); }
    if (del  && ci > 0)                  { const t = setTimeout(() => setCi(i=>i-1), 38);   return ()=>clearTimeout(t); }
    if (del  && ci === 0)                { setDel(false); setTi(i=>(i+1)%texts.length); }
  }, [ci, del, ti, texts]);
  useEffect(() => { setDisplayed(texts[ti].slice(0, ci)); }, [ci, ti, texts]);
  return (
    <span style={{ color:GOLD2, fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontSize:"1.1em" }}>
      {displayed}<span style={{ animation:"blink 1s step-end infinite", color:GOLD }}>|</span>
    </span>
  );
}

/* ══ HERO ══ */
function Hero() {
  return (
    <section id="home" style={{
      minHeight:"100vh", position:"relative", overflow:"hidden",
      background:`linear-gradient(160deg, #06101f 0%, ${NAVY} 55%, #0f2847 100%)`,
      display:"flex", alignItems:"center",
    }}>
      <GridBg/>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:`linear-gradient(90deg,transparent,${GOLD},transparent)` }}/>
      <div style={{ position:"absolute", left:0, top:"15%", bottom:"15%", width:"3px", background:`linear-gradient(180deg,transparent,${GOLD},transparent)` }}/>

      <div style={{ position:"relative", zIndex:2, maxWidth:"1200px", margin:"0 auto", padding:"clamp(5rem,10vw,8rem) clamp(1.2rem,4vw,3rem) clamp(3rem,6vw,5rem)", width:"100%" }}>

        <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"1.5rem" }}>
          <div style={{ width:"28px", height:"1px", background:GOLD, flexShrink:0 }}/>
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"clamp(0.6rem,1.5vw,0.72rem)", letterSpacing:"4px", color:GOLD, textTransform:"uppercase", fontWeight:500 }}>
            Portfolio · SVNIT · Mathematics
          </span>
        </div>

        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:"clamp(3rem,11vw,7.5rem)", lineHeight:0.92, color:WHITE, margin:"0 0 0.1rem", letterSpacing:"-1px" }}>
          HASTIN
        </h1>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"clamp(3rem,11vw,7.5rem)", lineHeight:0.92, color:"transparent", WebkitTextStroke:`1.5px ${GOLD}`, margin:"0 0 2rem", letterSpacing:"-1px" }}>
          SUTHAR
        </h1>

        <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"clamp(0.9rem,2vw,1.1rem)", color:SILVER, marginBottom:"2.5rem", minHeight:"1.8rem" }}>
          <TypeWriter texts={["Signal Reconstruction and Sampling Researcher","ISRO Short Term Online Training Programme","Integrated M.Sc. Mathematics","interested in semiconductor chip optimization using reconstruction"]}/>
        </p>

        <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap", marginBottom:"4rem" }}>
          <a href="#projects" style={{ padding:"12px clamp(20px,4vw,36px)", background:`linear-gradient(135deg,${GOLD},#a07830)`, color:"#06101f", borderRadius:"2px", textDecoration:"none", fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:"clamp(0.7rem,1.5vw,0.82rem)", letterSpacing:"2px", textTransform:"uppercase" }}>View Projects</a>
          <a href="#contact"  style={{ padding:"12px clamp(20px,4vw,36px)", border:`1px solid ${GOLD}60`, color:GOLD, borderRadius:"2px", textDecoration:"none", fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:"clamp(0.7rem,1.5vw,0.82rem)", letterSpacing:"2px", textTransform:"uppercase", background:"transparent" }}>Contact Me</a>
          <a href="https://drive.google.com/file/d/1lqilixUJBf-Q7cq1dhSpem7hEOQUOccm/view?usp=drive_link"  style={{ padding:"12px clamp(20px,4vw,36px)", border:`1px solid ${GOLD}60`, color:GOLD, borderRadius:"2px", textDecoration:"none", fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:"clamp(0.7rem,1.5vw,0.82rem)", letterSpacing:"2px", textTransform:"uppercase", background:"transparent" }}>RESUME</a>
        </div>

        {/* Stats */}
        <div className="stats-row">
          {[
            { num:2, suffix:"nd Year",   label:"Currently Pursuing"  },
            
          ].map(({ num, suffix, label }, i) => (
            <div key={label} className="stat-item" style={{ borderLeft: i===0 ? "none" : `1px solid ${BORDER}` }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.6rem,4vw,2.4rem)", fontWeight:700, color:GOLD, lineHeight:1 }}>
                <Counter to={num} suffix={suffix}/>
              </div>
              <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"clamp(0.6rem,1.2vw,0.72rem)", color:SILVER, letterSpacing:"2px", textTransform:"uppercase", marginTop:"4px" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative HS */}
      <div style={{
        position:"absolute", right:"0rem", top:"50%", transform:"translateY(-50%)",
        fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(18vw,22vw,22vw)", fontWeight:700,
        color:"transparent", WebkitTextStroke:`2px rgba(201,168,76,0.28)`,
        lineHeight:1, userSelect:"none", pointerEvents:"none", letterSpacing:"-4px",
        animation:"hsFloat 7s ease-in-out infinite",
      }}>HS</div>

      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"1px", background:`linear-gradient(90deg,transparent,${GOLD}40,transparent)` }}/>
      <style>{`
        @keyframes blink   { 50%{opacity:0} }
        @keyframes hsFloat { 0%,100%{transform:translateY(-50%) translateX(0px)} 50%{transform:translateY(-52%) translateX(-12px)} }
        .stats-row  { display:flex; flex-wrap:wrap; gap:0; }
        .stat-item  { padding:1.2rem 2rem; }
        @media(max-width:480px){
          .stat-item { padding:1rem 1.2rem; border-left:none !important; border-top:1px solid ${BORDER}; width:100%; }
          .stats-row { flex-direction:column; }
        }
      `}</style>
    </section>
  );
}

/* ══ SECTION HEADING ══ */
function SectionHeading({ label, title }) {
  return (
    <div style={{ marginBottom:"3rem" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"1rem" }}>
        <div style={{ width:"28px", height:"1px", background:GOLD, flexShrink:0 }}/>
        <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.68rem", letterSpacing:"4px", color:GOLD, textTransform:"uppercase" }}>{label}</span>
      </div>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,5vw,3.2rem)", fontWeight:700, color:WHITE, margin:0, lineHeight:1.1 }}>{title}</h2>
      <div style={{ width:"48px", height:"2px", background:GOLD, marginTop:"1rem" }}/>
    </div>
  );
}

/* ══ ABOUT ══ */
function About() {
  const items = [
    { icon:"◈", title:"Integrated M.Sc. Mathematics", org:"SVNIT, Surat", detail:"Rigorous 5-year integrated programme in mathematics, probability theory, and signal reconstruction and sampling. Currently in 2nd year with a CGPA of 7.29." },
    { icon:"◈", title:"ISRO Online Training Programme",       org:"Online", detail:"prestigious Online ISRO training focusing on Archival and Access of theSpace Science Data." },
    { icon:"◈", title:"Signal reconstruction Research",    org:"traditional techniques transfer to reconstruction approach", detail:"using the mathematics reconstruction approach to address practical problems or real world applications.(Missing Data Recovery, Noise Reduction,Image Reconstruction etc.)" },
    { icon:"◈", title:"Aiming GATE DA",          org:"to reach Ph.D at prestigious institute(IITs/IISc) ", detail:"I am Aiming the GATE DA Exam to Achieve the Goal of pursuing a Ph.D also, the main thing to give this Exam that I want to Explore the Mathematics how to apply it in real-world scenarios with the Tech." },
  ];
  return (
    <section id="about" style={{ padding:"clamp(4rem,8vw,7rem) clamp(1.2rem,4vw,2rem)", background:NAV }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
        <SectionHeading label="01 · About" title="Who I Am"/>

        {/* ── Photo block — put your photo in public/photo.jpg ── */}
        <div style={{ display:"flex", alignItems:"center", gap:"2rem", marginBottom:"3rem", flexWrap:"wrap" }}>
          <div style={{ position:"relative", flexShrink:0 }}>
            <div style={{ width:"150px", height:"150px", borderRadius:"50%", border:`2px solid ${GOLD}`, padding:"4px", background:`linear-gradient(135deg,rgba(201,168,76,0.15),transparent)` }}>
              <img
                src="/hastin-photo.png"
                alt="Hastin Suthar"
                style={{ width:"100%", height:"100%", borderRadius:"50%", objectFit:"cover", objectPosition:"center top", display:"block" }}
              />
            </div>
            <div style={{ position:"absolute", bottom:"8px", right:"4px", width:"14px", height:"14px", borderRadius:"50%", background:GOLD, border:`2px solid ${NAV}` }}/>
          </div>
          <div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.4rem,4vw,2rem)", fontWeight:700, color:WHITE, lineHeight:1.1 }}>Hastin Suthar</div>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.72rem", color:GOLD, letterSpacing:"3px", textTransform:"uppercase", marginTop:"6px" }}>Integrated M.Sc. Mathematics · SVNIT</div>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.82rem", color:SILVER, marginTop:"10px", lineHeight:1.7, maxWidth:"360px" }}>Signal reconstruction researcher passionate about bridging mathematics with real-world  applications.</div>
          </div>
        </div>
        <div className="about-grid">
          {items.map((item, i) => (
            <div key={i} className="about-card"
              onMouseEnter={e=>e.currentTarget.style.background=NAVY2}
              onMouseLeave={e=>e.currentTarget.style.background=NAV}
            >
              <div style={{ color:GOLD, fontSize:"1.3rem", marginBottom:"1rem" }}>{item.icon}</div>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:"clamp(1rem,2vw,1.2rem)", color:WHITE, margin:"0 0 4px" }}>{item.title}</h3>
              <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.68rem", color:GOLD, letterSpacing:"2px", textTransform:"uppercase", marginBottom:"0.9rem" }}>{item.org}</div>
              <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.875rem", color:SILVER, lineHeight:1.75, margin:0 }}>{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .about-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:1px; background:${BORDER}; }
        .about-card { background:${NAV}; padding:2.2rem 1.8rem; transition:background 0.3s; cursor:default; }
        @media(max-width:600px){ .about-card{ padding:1.6rem 1.2rem; } }
      `}</style>
    </section>
  );
}

/* ══ PROJECTS ══
   HOW TO ADD YOUR FILES:
   - For each project, add a "files" array with objects: { label, url, type }
   - type: "pdf" or "ppt"
   - url: direct link to your file (Google Drive, Dropbox, your server, etc.)

   GOOGLE DRIVE LINK FORMAT:
   - Open file in Drive → Share → "Anyone with the link" → Copy link
   - Change the URL from:
       https://drive.google.com/file/d/FILE_ID/view?usp=sharing
   - To (for PDFs, opens in browser):
       https://drive.google.com/file/d/FILE_ID/preview   ← opens in tab

   EXAMPLE:
   files: [
     { label:"Research Paper", url:"https://drive.google.com/file/d/YOUR_ID/preview", type:"pdf" },
     { label:"Presentation",   url:"https://drive.google.com/file/d/YOUR_ID/preview", type:"ppt" },
   ]
*/
function Projects() {
  const [hov, setHov] = useState(null);
  const projects = [
    {
      num:"01",
      title:"Structural Health Monitoring Using the Reconstruction Approach and Sampling",
      type:"Research",
      desc:"The Research about the application of reconstruction approach in SHM. The bridge and building structures are monitored by the sensors, the sensors gives real-time data about their condition but in some time interval the data is missing or corrupted because of the environmental factors or technical issues so the reconstruction data recover from the available data. Which gives accurate information about the structural condition.",
      tags:["MATLAB","Python","NumPy","SciPy","Signal and System"],
      // ↓ ADD YOUR FILE LINKS HERE
      files:[
        // { label:"Research Paper", url:"https://drive.google.com/file/d/YOUR_FILE_ID/preview", type:"pdf" },
        // { label:"Presentation",   url:"https://drive.google.com/file/d/YOUR_FILE_ID/preview", type:"ppt" },
      ],
    },
    {
      num:"02",
      title:"Skill2Intern SIH-IDEATHON Prototype",
      type:"AI Driven Smart Automation",
      desc:"In SIH(Smart India Hackathon)-(IDEATHON-To get selection in SIH) we choose the problem statement for smart allocation of interns. We made a very unique and innovative approach to solve the problem.",
      tags:["React","Node.js","MongoDB","Flask","N8N","Python"],
      // ↓ ADD YOUR FILE LINKS HERE
      files:[
        { label:"Project Prototype ppt", url:"https://docs.google.com/presentation/d/1FoEf7kX2hP7sdmC3-j6lHnGkC5EBYDep/edit?usp=drive_link&ouid=108974205743018515903&rtpof=true&sd=true", type:"ppt" },
        { label:"selection mail",     url:"https://drive.google.com/file/d/1PQbkouZHh-mX_Im3kvMUTXtwh2UUxZFQ/view?usp=drive_link", type:"pdf" },
      ],
    },
    {
      num:"03",
      title:"Teaching Intern at CVM HSE SCI COMPLEX (11-12 std) — Semi-Government School",
      type:"Educational",
      desc:"I done the teaching internship in Physics. I am passionate about making learning engaging and accessible for students also I am very creative about the solving complex things to make it easy to understand.",
      tags:["Creativeness","Communication"],
      // ↓ ADD YOUR FILE LINKS HERE
      files:[
         { label:"Internship Certificate", url:"https://drive.google.com/file/d/1ghrOA3DVWa_jPbLTM64G8ZnSb3StnyN3/view?usp=sharing", type:"pdf" },
      ],
    }, 
    {
      num:"04",
      title:"ARCHIVAL AND ACCESS OF THE SPACE SCIENCE DATA — ISRO Short Term Online Training Programme",
      type:"Educational",
      desc:"In this programme I learned about the space science data and how to archive and access it. I also learned about the various tools and techniques used for data analysis and visualization. This programme helped me to understand the importance of data in space science and how to use it effectively.",
      tags:["access of data","Fundamentals of Remote Sensing and Mass spectometry","Data analysis and visualization"],
      // ↓ ADD YOUR FILE LINKS HERE
      files:[
        { label:"ISRO Training Certificate", url:"https://drive.google.com/file/d/1_Dw_w2hyP1s1vpB8pUSzadSfqA2FvXck/view?usp=drivesdk", type:"pdf" },
      ],
    },
  ];

  const fileIcon = (type) => type === "ppt"
    ? <span style={{ fontSize:"0.7rem" }}>📊</span>
    : <span style={{ fontSize:"0.7rem" }}>📄</span>;

  return (
    <section id="projects" style={{ padding:"clamp(4rem,8vw,7rem) clamp(1.2rem,4vw,2rem)", background:NAVY }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
        <SectionHeading label="02 · Projects" title="Selected Work"/>
        <div style={{ display:"flex", flexDirection:"column", gap:"1px", background:BORDER }}>
          {projects.map((p, i) => (
            <div key={i} className="project-row"
              style={{ background: hov===i ? NAV : NAVY, transition:"background 0.25s", cursor:"default" }}
              onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
            >
              <div className="proj-num" style={{ color: hov===i ? GOLD : "rgba(201,168,76,0.2)", transition:"color 0.25s" }}>{p.num}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.68rem", letterSpacing:"3px", color:GOLD, textTransform:"uppercase", marginBottom:"0.5rem" }}>{p.type}</div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.2rem,3vw,1.6rem)", fontWeight:700, color:WHITE, margin:"0 0 0.8rem" }}>{p.title}</h3>
                <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.875rem", color:SILVER, lineHeight:1.75, margin:"0 0 1rem" }}>{p.desc}</p>
                <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom: p.files && p.files.length > 0 ? "1.2rem" : "0" }}>
                  {p.tags.map(t=>(
                    <span key={t} style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.68rem", padding:"3px 10px", border:`1px solid ${BORDER}`, color:SILVER, letterSpacing:"1px", textTransform:"uppercase" }}>{t}</span>
                  ))}
                </div>

                {/* ── File Buttons ── */}
                {p.files && p.files.length > 0 && (
                  <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
                    {p.files.map((f, fi) => (
                      <a
                        key={fi}
                        href={f.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display:"inline-flex", alignItems:"center", gap:"6px",
                          padding:"7px 16px",
                          border:`1px solid ${GOLD}50`,
                          background:`${GOLD}10`,
                          color:GOLD,
                          fontFamily:"'Inter',sans-serif",
                          fontSize:"0.68rem",
                          letterSpacing:"1.5px",
                          textTransform:"uppercase",
                          textDecoration:"none",
                          borderRadius:"2px",
                          transition:"all 0.2s",
                          cursor:"pointer",
                        }}
                        onMouseEnter={e=>{ e.currentTarget.style.background=`${GOLD}25`; e.currentTarget.style.borderColor=GOLD; }}
                        onMouseLeave={e=>{ e.currentTarget.style.background=`${GOLD}10`; e.currentTarget.style.borderColor=`${GOLD}50`; }}
                      >
                        {fileIcon(f.type)} {f.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ color: hov===i ? GOLD : SILVER, fontSize:"1.2rem", transition:"all 0.25s", transform: hov===i ? "translate(4px,-4px)" : "none", flexShrink:0, alignSelf:"flex-start" }}>↗</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .project-row { display:flex; gap:1.5rem; padding:2rem; align-items:flex-start; }
        .proj-num    { fontFamily:'Cormorant Garamond',serif; font-size:clamp(2rem,6vw,3.5rem); font-weight:700; line-height:1; flex-shrink:0; width:56px; font-family:'Cormorant Garamond',serif; }
        @media(max-width:500px){
          .project-row { gap:1rem; padding:1.5rem 1rem; }
          .proj-num    { width:36px; font-size:1.8rem; }
        }
      `}</style>
    </section>
  );
}

/* ══ SKILLS ══ */
function SkillBar({ name, level }) {
  const [w, setW] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting){ setW(level); obs.disconnect(); } },{ threshold:0.5 });
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  }, [level]);
  return (
    <div ref={ref} style={{ marginBottom:"1.4rem" }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
        <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.82rem", color:WHITE, letterSpacing:"1px" }}>{name}</span>
        <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.72rem", color:GOLD }}>{level}%</span>
      </div>
      <div style={{ height:"1px", background:"rgba(255,255,255,0.08)", position:"relative" }}>
        <div style={{ position:"absolute", top:0, left:0, height:"1px", width:`${w}%`, background:`linear-gradient(90deg,${GOLD}60,${GOLD})`, transition:"width 1.4s cubic-bezier(0.4,0,0.2,1)" }}/>
      </div>
    </div>
  );
}

function Skills() {
  const groups = [
    { title:"Languages",          items:[{name:"Python",level:90},{name:"C/C++",level:85},{name:"JavaScript",level:75},{name:"MATLAB",level:70}] },
    { title:"Mathematics & Signal and Systems",  items:[{name:"Signal and Systems",level:92},{name:"Mathematical Modelling+optimization",level:88},{name:"Linear Algebra",level:85},{name:"Fourier Analysis",level:88}] },
    { title:"Frameworks & Tools", items:[{name:"NumPy / Matplotlib",level:88},{name:"React.js",level:60},{name:"DBMS",level:85},{name:"Git & GitHub",level:72}] },
  ];
  return (
    <section id="skills" style={{ padding:"clamp(4rem,8vw,7rem) clamp(1.2rem,4vw,2rem)", background:NAV }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
        <SectionHeading label="03 · Skills" title="Expertise"/>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"clamp(2rem,5vw,3rem)" }}>
          {groups.map(g=>(
            <div key={g.title}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.2rem", fontWeight:700, color:GOLD, marginBottom:"1.8rem", paddingBottom:"0.75rem", borderBottom:`1px solid ${BORDER}` }}>{g.title}</div>
              {g.items.map(s=><SkillBar key={s.name} {...s}/>)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ CONTACT ══
   FORMSPREE SETUP (2 minutes, no config needed):
   1. Go to https://formspree.io → sign up free
   2. Click "New Form" → name it "Portfolio Contact" → Create
   3. Copy your form endpoint, looks like: https://formspree.io/f/xxxxxxxz
   4. Replace YOUR_FORMSPREE_ID below with just the ID part (e.g. "xxxxxxxz")
*/
const FORMSPREE_ID = "mykovpeo"; 

function Contact() {
  const [form,   setForm]   = useState({ name:"", email:"", message:"" });
  const [status, setStatus] = useState("idle"); // "idle" | "sending" | "sent" | "error"
  const formRef = useRef();

  const inp = {
    width:"100%", padding:"14px 0", background:"transparent",
    border:"none", borderBottom:`1px solid ${BORDER}`,
    color:WHITE, fontSize:"0.9rem", fontFamily:"'Inter',sans-serif",
    outline:"none", transition:"border-color 0.3s", boxSizing:"border-box",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    form.name,
          email:   form.email,
          message: form.message,
        }),
      });
      if (res.ok) { setStatus("sent"); setForm({ name:"", email:"", message:"" }); }
      else          setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" style={{ padding:"clamp(4rem,8vw,7rem) clamp(1.2rem,4vw,2rem)", background:NAVY }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
        <div className="contact-grid">
          <div>
            <SectionHeading label="04 · Contact" title="Get In Touch"/>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.9rem", color:SILVER, lineHeight:1.85, marginBottom:"2.5rem" }}>
              Open to research collaborations, academic discussions, internships, and opportunities. Feel free to reach out.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:"1.2rem" }}>
              {[
                { label:"LinkedIn", val:"linkedin.com/in/hastinsuthar", href:"https://www.linkedin.com/in/hastin-suthar-b96528342" },
                { label:"mobile No.",   val:"+91 8799098542",      href:"tel:+91 8799098542"   },
                { label:"Email",    val:"hastinsuthar5@gmail.com",      href:"mailto:hastinsuthar5@gmail.com" },
              ].map(({ label, val, href })=>(
                <div key={label}>
                  <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.65rem", letterSpacing:"2px", color:GOLD, textTransform:"uppercase", marginBottom:"2px" }}>{label}</div>
                  <a href={href} style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.85rem", color:SILVER, textDecoration:"none" }}>{val}</a>
                </div>
              ))}
            </div>
          </div>

          <div>
            {/* ── Success state ── */}
            {status === "sent" ? (
              <div style={{ padding:"3rem", border:`1px solid ${GOLD}40`, textAlign:"center" }}>
                <div style={{ color:GOLD, fontSize:"2rem", marginBottom:"1rem" }}>✓</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.2rem", color:GOLD, marginBottom:"0.75rem" }}>
                  Message received.
                </div>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.8rem", color:SILVER }}>
                  I'll be in touch shortly.
                </div>
                <button
                  onClick={()=>setStatus("idle")}
                  style={{ marginTop:"1.5rem", background:"none", border:`1px solid ${GOLD}40`, color:GOLD, fontFamily:"'Inter',sans-serif", fontSize:"0.68rem", letterSpacing:"2px", textTransform:"uppercase", padding:"8px 20px", cursor:"pointer" }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"2rem" }}>
                {[["Name","name","text"],["Email","email","email"]].map(([ph,key,type])=>(
                  <input key={key} type={type} placeholder={ph} required value={form[key]} style={inp}
                    onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}
                    onFocus={e=>e.target.style.borderBottomColor=GOLD}
                    onBlur={e=>e.target.style.borderBottomColor=BORDER}
                  />
                ))}
                <textarea placeholder="Message" rows={4} required value={form.message} style={{...inp,resize:"none"}}
                  onChange={e=>setForm(f=>({...f,message:e.target.value}))}
                  onFocus={e=>e.target.style.borderBottomColor=GOLD}
                  onBlur={e=>e.target.style.borderBottomColor=BORDER}
                />

                {/* Error message */}
                {status === "error" && (
                  <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.78rem", color:"#e87070", letterSpacing:"0.5px" }}>
                    Something went wrong. Please try again in a moment.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{
                    padding:"13px 32px", background:"transparent", border:`1px solid ${status==="sending" ? GOLD+"60" : GOLD}`,
                    color: status==="sending" ? SILVER : GOLD,
                    fontFamily:"'Inter',sans-serif", fontWeight:600,
                    fontSize:"0.75rem", letterSpacing:"3px", textTransform:"uppercase",
                    cursor: status==="sending" ? "not-allowed" : "pointer",
                    transition:"all 0.3s", alignSelf:"flex-start",
                  }}
                  onMouseEnter={e=>{ if(status!=="sending"){ e.currentTarget.style.background=GOLD; e.currentTarget.style.color="#06101f"; } }}
                  onMouseLeave={e=>{ if(status!=="sending"){ e.currentTarget.style.background="transparent"; e.currentTarget.style.color=GOLD; } }}
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:6rem; align-items:start; }
        @media(max-width:768px){ .contact-grid{ grid-template-columns:1fr; gap:3rem; } }
        ::placeholder{ color:rgba(148,163,184,0.4); font-family:'Inter',sans-serif; }
      `}</style>
    </section>
  );
}

/* ══ FOOTER ══ */
function Footer() {
  return (
    <footer style={{ borderTop:`1px solid ${BORDER}`, padding:"1.5rem clamp(1.2rem,4vw,3rem)", background:NAV, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.75rem" }}>
      <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", color:GOLD, fontWeight:700, letterSpacing:"2px" }}>HASTIN SUTHAR</span>
      <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.68rem", color:SILVER, letterSpacing:"1px", textAlign:"right" }}>SVNIT · Integrated M.Sc. Mathematics · {new Date().getFullYear()}</span>
    </footer>
  );
}

/* ══ ROOT ══ */
export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  return (
    <div style={{ background:NAV, minHeight:"100vh", color:WHITE }}>
      <style>{`...`}</style>

      {!introComplete && <Intro onComplete={() => setIntroComplete(true)} />}

      <div style={{
        opacity: introComplete ? 1 : 0,
        transform: introComplete ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}>
        <Navbar/>
        <Hero/>
        <About/>
        <Projects/>
        <Skills/>
        <Contact/>
        <Footer/>
      </div>
    </div>
  );
}