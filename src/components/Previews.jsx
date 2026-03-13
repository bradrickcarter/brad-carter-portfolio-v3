import { T } from "../data/typography";

// ─── Home ────────────────────────────────────────────────────────────────────
export function HomePreview({ openFile }) {
  return (
    <div style={{ fontFamily: T.font, background: "#161616", minHeight: "100%", boxSizing: "border-box", color: "#e8e8e8", display: "flex", flexDirection: "column" }}>

      {/* Big stacked headline */}
      <div style={{ flex: 1, padding: "48px 52px 44px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        {[["Design </>" , false], ["that", false], ["ships.", true]].map(([word, accent]) => (
          <span key={word} style={{
            display: "block",
            fontSize: "clamp(64px, 10vw, 120px)",
            fontWeight: 800,
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            color: accent ? "#d4a96a" : "#e8e8e8",
          }}>{word}</span>
        ))}
      </div>

      {/* Bottom strip */}
      <div style={{ borderTop: "1px solid #242424", display: "grid", gridTemplateColumns: "2fr 1px 1fr" }}>

        {/* Bio */}
        <div style={{ padding: "32px 40px 36px 52px" }}>
          <span style={{ ...T.label, color: "#555", display: "block", marginBottom: 12 }}>About</span>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: "#777", maxWidth: "52ch" }}>
            I started as a <strong style={{ color: "#e8e8e8", fontWeight: 700 }}>software engineer</strong> and crossed over into design — which means I can read the code, prototype in it, and ship alongside engineers without a handoff. For 15+ years I've been digging into messy operational problems in healthcare, retail, and financial services. I work in Claude Code and Cursor daily.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button className="btn btn-primary" onClick={() => openFile?.("work")}>See the work →</button>
            <button className="btn btn-secondary">Download résumé</button>
          </div>
        </div>

        {/* Vertical divider */}
        <div style={{ background: "#242424" }} />

        {/* Daily tools */}
        <div style={{ padding: "32px 40px 36px" }}>
          <span style={{ ...T.label, color: "#555", display: "block", marginBottom: 12 }}>Daily tools</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {["Claude Code", "Cursor", "Figma & Figma Make", "React", "Shopify Polaris"].map(tool => (
              <div key={tool} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#777", lineHeight: 1.5 }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#d4a96a", flexShrink: 0, display: "inline-block" }} />
                {tool}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────
export function AboutPreview() {
  return (
    <div style={{ padding: T.pad, fontFamily: T.font, maxWidth: T.maxW }}>
      <div style={{ ...T.label, color: "#61afef", marginBottom: 24, fontFamily: T.mono }}>// about.js</div>
      <h1 style={{ fontSize: 36, fontWeight: 700, color: "#1a1a1a", lineHeight: 1.15, marginBottom: 6 }}>Brad Carter</h1>
      <p style={{ fontSize: 18, color: "#666", fontWeight: 400, marginBottom: 28 }}>Senior Product Designer — DFW, TX</p>
      <p style={{ ...T.body, color: "#444", marginBottom: 24 }}>
        Equally at home in Figma or writing the front-end code to bring it to life. Led teams, run C-suite workshops, shipped <strong>40+ products</strong>. Still curious about all of it.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 28 }}>
        {[["15+", "Years exp."], ["40+", "Shipped"], ["11", "At Slalom"]].map(([v, l]) => (
          <div key={l} style={{ border: "1px solid #e8e8e8", borderRadius: 6, padding: "14px 16px" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#1a1a1a", lineHeight: 1 }}>
              {v.includes("+") ? <>{v.slice(0, -1)}<span style={{ color: "#61afef" }}>+</span></> : v}
            </div>
            <div style={{ ...T.label, color: "#999", marginTop: 6 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {["Product Design", "Design Systems", "Figma", "UX Research", "HTML / CSS / JS"].map((s) => (
          <span key={s} style={{ fontSize: 13, padding: "5px 12px", background: "#f5f5f5", border: "1px solid #e8e8e8", borderRadius: 4, color: "#444", fontFamily: T.mono }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Work ────────────────────────────────────────────────────────────────────
export function WorkPreview() {
  return (
    <div style={{ padding: T.pad, fontFamily: T.font, background: "#161616", minHeight: "100%", boxSizing: "border-box" }}>
      <div style={{ ...T.label, color: "#555", marginBottom: 12 }}>Recent Work</div>
      <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, color: "#e8e8e8", marginBottom: 32 }}>Work that ships.</h1>
      {[
        { tag: "Healthcare · Inventory", tagColor: "#d4a96a", title: "AllyIQ", desc: "Real-time inventory platform for retina practices. Replaced disconnected tools, closed billing gaps, and flagged dispensing risks.", role: "Design Lead", image: "/ally-placeholder.png" },
        { tag: "Mobile · Patient UX", tagColor: "#d4a96a", title: "Health Insights", desc: "Lab results mobile app. Raw numbers became plain-language explanations with trend visualization and clear risk hierarchy.", role: "Lead Designer", video: "/health-insights.mov" },
        { tag: "Healthcare · Patient UX", tagColor: "#e5c07b", title: "Heart Failure Care", desc: "Enrolled patient companion inside MyBSWHealth for newly diagnosed heart failure patients. Daily weight and blood pressure tracking with clinical alert thresholds, symptom triage, and a plain-language education library.", role: "Lead Designer", image: "/heart-failure.png" },
      ].map((c) => (
        <div
          key={c.title}
          style={{ border: "1px solid #2a2a2a", borderRadius: 8, marginBottom: 24, cursor: "pointer", transition: "border-color 0.15s", overflow: "hidden", background: "#1e1e1e" }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#61afef")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2a2a2a")}
        >
          {c.image && (
            <img
              src={c.image}
              alt={c.title}
              style={{ width: "100%", display: "block", borderBottom: "1px solid #2a2a2a" }}
            />
          )}
          {c.video && (
            <video
              src={c.video}
              autoPlay
              loop
              muted
              playsInline
              style={{ width: "100%", display: "block", borderBottom: "1px solid #2a2a2a" }}
            />
          )}
          <div style={{ padding: "20px 24px" }}>
            <div style={{ ...T.label, color: c.tagColor, marginBottom: 8 }}>{c.tag}</div>
            <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.01em", color: "#e8e8e8", marginBottom: 8 }}>{c.title}</div>
            <p style={{ fontSize: 15, lineHeight: 1.45, color: "#aaa", maxWidth: "60ch", marginBottom: 14 }}>{c.desc}</p>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <span style={{ ...T.label, color: "#555" }}>Role: <span style={{ color: "#888", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>{c.role}</span></span>
              <span style={{ ...T.label, color: "#3a6b3a" }}>shipped ✓</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────
export function ContactPreview() {
  return (
    <div style={{ padding: T.pad, fontFamily: T.font, maxWidth: T.maxW }}>
      <div style={{ ...T.label, color: "#e06c75", marginBottom: 24, fontFamily: T.mono }}>// contact.ts</div>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1a1a1a", marginBottom: 8 }}>Let's talk.</h1>
      <p style={{ ...T.body, color: "#555", marginBottom: 32 }}>
        Seeking Senior Product Designer roles in DFW. Open to in-person, hybrid, or remote.
      </p>
      {[
        ["📮", "Email", "brad@bradcarter.design", "mailto:brad@bradcarter.design"],
        ["🌐", "Website", "bradcarter.design", "https://bradcarter.design"],
        ["🔗", "LinkedIn", "brad-carter-work", "https://linkedin.com/in/brad-carter-work"],
      ].map(([icon, label, val, href]) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", border: "1px solid #e8e8e8", borderRadius: 8, marginBottom: 10, textDecoration: "none", transition: "border-color 0.15s, box-shadow 0.15s" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#61afef"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(97,175,239,0.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e8e8e8"; e.currentTarget.style.boxShadow = "none"; }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 18 }}>{icon}</span>
            <div>
              <div style={{ ...T.label, color: "#999", fontFamily: T.mono, marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: 15, color: "#1a1a1a", fontWeight: 500 }}>{val}</div>
            </div>
          </div>
          <span style={{ color: "#ccc", fontSize: 16 }}>↗</span>
        </a>
      ))}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, fontSize: 15, fontWeight: 600, color: "#15803d", marginTop: 4 }}>
        <span style={{ width: 8, height: 8, background: "#22c55e", borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />
        Open to Work — DFW Area
      </div>
    </div>
  );
}

// ─── Resume ──────────────────────────────────────────────────────────────────
export function ResumePreview() {
  return (
    <div style={{ padding: T.pad, fontFamily: T.font, maxWidth: T.maxW }}>
      <div style={{ ...T.label, color: "#e06c75", marginBottom: 16, fontFamily: T.mono }}>// resume.pdf</div>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>Brad Carter</h1>
      <p style={{ fontSize: 16, color: "#666", marginBottom: 16 }}>Senior Product Designer · DFW, TX</p>
      <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
        {["brad@bradcarter.design", "bradcarter.design", "brad-carter-work"].map((t) => (
          <span key={t} style={{ fontSize: 13, color: "#61afef", fontFamily: T.mono }}>{t}</span>
        ))}
      </div>
      <div style={{ ...T.label, color: "#999", marginBottom: 16, fontFamily: T.mono, paddingBottom: 8, borderBottom: "1px solid #e8e8e8" }}>Experience</div>
      {[
        { role: "Principal Consultant", co: "Slalom", years: "2021 – Present", desc: "Lead product design across healthcare, fintech, and enterprise SaaS clients. Design systems, facilitation, front-end prototyping." },
        { role: "Solution Architect", co: "Slalom", years: "2018 – 2021", desc: "Bridged design and engineering. Defined technical direction for UX-heavy builds across multiple concurrent engagements." },
        { role: "Sr. Consultant", co: "Slalom", years: "2015 – 2018", desc: "Embedded designer on client teams. Led discovery, research synthesis, and interaction design for web and mobile products." },
        { role: "Mobile Application Architect", co: "Capgemini", years: "2011 – 2015", desc: "Designed and architected mobile applications across iOS and Android for enterprise clients." },
      ].map((item) => (
        <div key={item.role} style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a" }}>{item.role}</span>
            <span style={{ fontSize: 13, color: "#999", fontFamily: T.mono, flexShrink: 0, marginLeft: 12 }}>{item.years}</span>
          </div>
          <div style={{ fontSize: 14, color: "#61afef", marginBottom: 6, fontFamily: T.mono }}>{item.co}</div>
          <p style={{ ...T.small, color: "#555" }}>{item.desc}</p>
        </div>
      ))}
      <a
        href="/resume.pdf"
        style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#f5f5f5", border: "1px solid #e8e8e8", borderRadius: 6, fontSize: 14, color: "#444", textDecoration: "none", fontFamily: T.mono, marginTop: 8 }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#61afef"; e.currentTarget.style.color = "#61afef"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e8e8e8"; e.currentTarget.style.color = "#444"; }}
      >
        ↓ download resume.pdf
      </a>
    </div>
  );
}

// ─── Config ──────────────────────────────────────────────────────────────────
export function ConfigPreview() {
  return (
    <div style={{ padding: T.pad, background: "#fafafa", minHeight: "100%", fontFamily: T.font }}>
      <div style={{ ...T.label, color: "#e5c07b", marginBottom: 20, fontFamily: T.mono }}>// config.json — parsed</div>
      {[
        ["name", '"Brad Carter"', "#98c379"],
        ["role", '"Senior Product Designer"', "#98c379"],
        ["status", '"available"', "#98c379"],
        null,
        ["canCode", "true", "#d19a66"],
        ["shipsThings", "true", "#d19a66"],
        ["talksToUsers", "true", "#d19a66"],
        ["needsPermission", "false", "#e06c75"],
        ["designByCommittee", "false", "#e06c75"],
        null,
        ["optimizedFor", '"shipping good things"', "#98c379"],
        ["degradesIn", '"micromanagement"', "#e06c75"],
        null,
        ["version", '"11.2.0"', "#d19a66"],
        ["eol", '"not planned"', "#98c379"],
      ].map((row, i) =>
        row === null ? (
          <div key={i} style={{ height: 1, background: "#e8e8e8", margin: "8px 0" }} />
        ) : (
          <div
            key={i}
            style={{ display: "flex", gap: 12, alignItems: "baseline", padding: "7px 10px", borderRadius: 5, marginBottom: 2 }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f0f0")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <span style={{ fontSize: 13, color: "#e06c75", minWidth: 180, fontFamily: T.mono }}>"{row[0]}"</span>
            <span style={{ fontSize: 13, color: "#999" }}>→</span>
            <span style={{ fontSize: 13, color: row[2], fontFamily: T.mono }}>{row[1]}</span>
          </div>
        )
      )}
    </div>
  );
}

// ─── README ──────────────────────────────────────────────────────────────────
export function ReadmePreview() {
  return (
    <div style={{ padding: T.pad, maxWidth: T.maxW, fontFamily: T.font }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1a1a1a", borderBottom: "1px solid #e8e8e8", paddingBottom: 10, marginBottom: 16 }}>Brad Carter</h1>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 24 }}>
        {[["experience: 15yr", "#dbeafe", "#1d4ed8"], ["status: available", "#dcfce7", "#15803d"], ["location: DFW", "#fef9c3", "#a16207"], ["ships: yes", "#f3e8ff", "#7e22ce"]].map(([t, bg, c]) => (
          <span key={t} style={{ ...T.label, fontFamily: T.mono, padding: "4px 10px", borderRadius: 3, background: bg, color: c, fontWeight: 500 }}>{t}</span>
        ))}
      </div>
      <h2 style={{ fontSize: 17, fontWeight: 700, color: "#1a1a1a", marginBottom: 10 }}>About</h2>
      <p style={{ ...T.body, color: "#444", marginBottom: 24 }}>15+ years turning <strong>complex, messy problems</strong> into experiences that feel simple in hindsight. Equally comfortable in Figma or writing the front-end code to bring it to life.</p>
      <blockquote style={{ borderLeft: "3px solid #61afef", paddingLeft: 16, margin: "0 0 24px", color: "#555", fontStyle: "italic", fontSize: 16, lineHeight: 1.4 }}>"The best design work I ever did is invisible."</blockquote>
      <h2 style={{ fontSize: 17, fontWeight: 700, color: "#1a1a1a", marginBottom: 10 }}>Requirements</h2>
      <ul style={{ margin: "0 0 24px 20px" }}>
        {["Real problems worth solving", "A team that ships", "Autonomy to do the work right", "Users you actually talk to"].map((r) => (
          <li key={r} style={{ ...T.body, color: "#444", marginBottom: 6 }}>{r}</li>
        ))}
      </ul>
      <h2 style={{ fontSize: 17, fontWeight: 700, color: "#1a1a1a", marginBottom: 10 }}>License</h2>
      <p style={{ ...T.body, color: "#444" }}>Selectively available. Not open source. <strong>One of a kind.</strong></p>
    </div>
  );
}

// ─── .env ────────────────────────────────────────────────────────────────────
export function EnvPreview() {
  const mono = "'JetBrains Mono', 'Fira Code', monospace";
  return (
    <div style={{ padding: T.pad, background: "#0d1117", minHeight: "100%", fontFamily: mono }}>
      <div style={{ ...T.label, color: "#484f58", marginBottom: 16, fontFamily: mono }}>// .env — parsed</div>
      {[
        ["#", "Identity"],
        ["NAME", "=", '"Brad_Carter"', "#a5d6ff"],
        ["ROLE", "=", '"Senior_Product_Designer"', "#a5d6ff"],
        ["EMAIL", "=", '"brad@bradcarter.design"', "#a5d6ff"],
        null,
        ["#", "Status"],
        ["STATUS", "=", '"available"', "#56d364"],
        ["OPEN_TO_WORK", "=", "true", "#56d364"],
        null,
        ["#", "Capabilities"],
        ["CAN_CODE", "=", "true", "#56d364"],
        ["SHIPS_THINGS", "=", "true", "#56d364"],
        ["TALKS_TO_USERS", "=", "true", "#56d364"],
        null,
        ["#", "Constraints"],
        ["NEEDS_MICROMANAGEMENT", "=", "false", "#f85149"],
        ["DESIGN_BY_COMMITTEE", "=", "false", "#f85149"],
        ["ASKS_FOR_PERMISSION", "=", "false", "#f85149"],
        null,
        ["#", "Meta"],
        ["VERSION", "=", '"11.2.0"', "#a5d6ff"],
        ["MAINTAINED", "=", "true", "#56d364"],
      ].map((row, i) => {
        if (row === null) return <div key={i} style={{ height: 12 }} />;
        if (row[0] === "#")
          return <div key={i} style={{ fontSize: 12, color: "#484f58", marginBottom: 6, letterSpacing: "0.05em" }}>## {row[1]}</div>;
        return (
          <div key={i} style={{ display: "flex", gap: 4, marginBottom: 4, fontSize: 13 }}>
            <span style={{ color: "#79c0ff" }}>{row[0]}</span>
            <span style={{ color: "#8b949e" }}>{row[1]}</span>
            <span style={{ color: row[3] }}>{row[2]}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Map ─────────────────────────────────────────────────────────────────────
export const PREVIEW_MAP = {
  home: HomePreview,
  about: AboutPreview,
  work: WorkPreview,
  contact: ContactPreview,
  resume: ResumePreview,
  config: ConfigPreview,
  readme: ReadmePreview,
  env: EnvPreview,
};
