import { T } from "../data/typography";
import { useState, useEffect } from "react";
import useIsMobile from "../hooks/useIsMobile";

// ─── MediaGallery ─────────────────────────────────────────────────────────────
function MediaGallery({ media }) {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const isMobile = useIsMobile();
  const isNarrow = useIsMobile(1024);
  if (!media || media.length === 0) return null;

  const mediaH = isMobile ? 240 : isNarrow ? 420 : 690;
  const thumbW = isMobile ? 80 : 120;
  const thumbH = isMobile ? 56 : 80;

  function switchTo(i) {
    if (i === active) return;
    setAnimating(true);
    setActive(i);
    setTimeout(() => setAnimating(false), 400);
  }

  const current = media[active];
  return (
    <div style={{ borderBottom: "1px solid #2a2a2a" }}>
      {/* Main display */}
      <div style={{ position: "relative", overflow: "hidden", background: "#0e0e0e" }}>
        {current.type === "video" ? (
          <video
            key={current.src}
            src={current.src}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{ width: "100%", height: mediaH, objectFit: "cover", display: "block", animation: animating ? "media-pop 400ms cubic-bezier(0.34,1.56,0.64,1) forwards" : "none" }}
          />
        ) : (
          <img
            src={current.src}
            alt={current.alt || ""}
            style={{ width: "100%", height: current.fit === "contain" ? "auto" : mediaH, objectFit: current.fit || "cover", objectPosition: current.position || "center", display: "block", animation: animating ? "media-pop 400ms cubic-bezier(0.34,1.56,0.64,1) forwards" : "none" }}
          />
        )}
        {current.label && (
          <div style={{
            position: "absolute",
            bottom: 16,
            left: 16,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(6px)",
            color: "#e8e8e8",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            padding: "5px 10px",
            borderRadius: 4,
            pointerEvents: "none",
          }}>
            {current.label}
          </div>
        )}
      </div>

      {/* Thumbnails — only show if more than one item */}
      {media.length > 1 && (
        <div style={{ display: "flex", gap: 8, padding: "10px 12px", background: "#161616", justifyContent: "center" }}>
          {media.map((item, i) => (
            <div
              key={i}
              onClick={() => switchTo(i)}
              style={{
                width: thumbW,
                height: thumbH,
                borderRadius: 4,
                overflow: "hidden",
                cursor: "pointer",
                border: i === active ? "2px solid #d4a96a" : "2px solid transparent",
                flexShrink: 0,
                background: "#2a2a2a",
                transition: "border-color 120ms ease",
              }}
            >
              {item.type === "video" ? (
                <video
                  src={item.src}
                  muted
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}
                />
              ) : (
                <img
                  src={item.src}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Home ────────────────────────────────────────────────────────────────────
export function HomePreviewV1({ openFile }) {
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
          <p style={{ fontSize: 15, lineHeight: 1.4, color: "#777", maxWidth: "52ch" }}>
            I started as a <strong style={{ color: "#e8e8e8", fontWeight: 700 }}>software engineer</strong> and crossed over into design — which means I can read the code, prototype in it, and ship alongside engineers without a handoff. For 15+ years I've been digging into messy operational problems in healthcare, retail, and financial services. I work in Claude Code and Cursor daily.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button className="btn btn-primary" style={{ fontFamily: T.mono }} onClick={() => openFile?.("work")}>See the work →</button>
            <a href="/Brad-Carter-Resume.pdf" download className="btn btn-secondary" style={{ fontFamily: T.mono }}>Download resume ↓</a>
          </div>
        </div>

        {/* Vertical divider */}
        <div style={{ background: "#242424" }} />

        {/* Daily tools */}
        <div style={{ padding: "32px 40px 36px" }}>
          <span style={{ ...T.label, color: "#555", display: "block", marginBottom: 12 }}>Daily tools</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {["Claude Code", "Cursor", "Figma & Figma Make", "React", "GitHub"].map(tool => (
              <div key={tool} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#777", lineHeight: 1.4 }}>
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

let _homeLoaded = false;

export function HomePreview({ openFile }) {
  const [phase, setPhase] = useState(_homeLoaded ? 2 : 0);
  const [dots, setDots] = useState(1);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (_homeLoaded) return;
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => { setPhase(2); _homeLoaded = true; }, 6000 + Math.random() * 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (phase !== 1) return;
    const iv = setInterval(() => setDots(d => d === 3 ? 1 : d + 1), 300);
    return () => clearInterval(iv);
  }, [phase]);

  return (
    <div style={{ fontFamily: T.mono, background: "#161616", minHeight: "100%", boxSizing: "border-box", color: "#e8e8e8", display: "flex", flexDirection: "column", position: "relative" }}>

      {/* Loading state — robot + thinking */}
      {phase < 2 && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {phase === 1 && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 220" width="32" height="59" style={{ marginLeft: 21 }}>
                <style>{`
                  .rb { fill:#cf5f38; stroke:#7a2e0c; stroke-width:1.5; }
                  .rs { fill:#1e1e1e; stroke:#7a2e0c; stroke-width:1.5; }
                  .rd { fill:#1a1a1a; stroke:none; }
                  @keyframes rb-bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
                  @keyframes rb-blink { 0%,82%,100%{transform:scaleY(1)} 88%{transform:scaleY(0.08)} }
                  @keyframes rb-wave-l { 0%,100%{transform:rotate(0deg)} 45%{transform:rotate(34deg)} }
                  @keyframes rb-wave-r { 0%,100%{transform:rotate(0deg)} 55%{transform:rotate(-34deg)} }
                  @keyframes rb-pulse { 0%,100%{opacity:1} 50%{opacity:0.1} }
                  @keyframes rb-feet { 0%,100%{transform:translateX(0)} 25%{transform:translateX(3px)} 75%{transform:translateX(-3px)} }
                  #rb-body  { animation: rb-bob 1.2s ease-in-out infinite; }
                  #rb-eye-l { animation: rb-blink 3.5s ease-in-out infinite; transform-box:fill-box; transform-origin:center; }
                  #rb-eye-r { animation: rb-blink 3.5s ease-in-out infinite 0.07s; transform-box:fill-box; transform-origin:center; }
                  #rb-arm-l { animation: rb-wave-l 1.8s ease-in-out infinite; transform-box:fill-box; transform-origin:100% 0%; }
                  #rb-arm-r { animation: rb-wave-r 1.8s ease-in-out infinite 0.4s; transform-box:fill-box; transform-origin:0% 0%; }
                  #rb-dot   { animation: rb-pulse 0.8s ease-in-out infinite; }
                  #rb-feet  { animation: rb-feet 1.2s ease-in-out infinite; }
                `}</style>
                <g id="rb-body">
                  <rect className="rs" x="63" y="12" width="5" height="14"/>
                  <rect className="rb" x="61" y="10" width="5" height="14"/>
                  <rect className="rs" x="63" y="5" width="7" height="7"/>
                  <g id="rb-dot"><rect className="rb" x="61" y="3" width="7" height="7"/></g>
                  <rect className="rs" x="42" y="32" width="44" height="44"/>
                  <rect className="rs" x="48" y="72" width="32" height="6"/>
                  <rect className="rb" x="38" y="26" width="44" height="44"/>
                  <rect className="rb" x="44" y="66" width="32" height="6"/>
                  <g id="rb-eye-l"><rect className="rd" x="44" y="38" width="10" height="10"/></g>
                  <g id="rb-eye-r"><rect className="rd" x="66" y="38" width="10" height="10"/></g>
                  <rect className="rd" x="46" y="58" width="28" height="5"/>
                  <rect className="rs" x="42" y="86" width="8" height="44"/>
                  <rect className="rs" x="74" y="86" width="8" height="44"/>
                  <rect className="rs" x="50" y="124" width="24" height="8"/>
                  <rect className="rb" x="36" y="78" width="48" height="52"/>
                  <rect className="rb" x="44" y="122" width="32" height="6"/>
                  <g id="rb-arm-l">
                    <rect className="rs" x="26" y="92" width="8" height="30"/>
                    <rect className="rs" x="20" y="114" width="14" height="8"/>
                    <rect className="rb" x="20" y="80" width="16" height="8"/>
                    <rect className="rb" x="22" y="88" width="8" height="30"/>
                    <rect className="rb" x="14" y="110" width="14" height="8"/>
                  </g>
                  <g id="rb-arm-r">
                    <rect className="rs" x="86" y="92" width="8" height="30"/>
                    <rect className="rs" x="86" y="114" width="14" height="8"/>
                    <rect className="rb" x="84" y="80" width="16" height="8"/>
                    <rect className="rb" x="90" y="88" width="8" height="30"/>
                    <rect className="rb" x="92" y="110" width="14" height="8"/>
                  </g>
                  <rect className="rs" x="46" y="136" width="8" height="34"/>
                  <rect className="rs" x="66" y="136" width="8" height="34"/>
                  <rect className="rb" x="40" y="128" width="8" height="34"/>
                  <rect className="rb" x="72" y="128" width="8" height="34"/>
                  <g id="rb-feet">
                    <rect className="rs" x="36" y="168" width="20" height="8"/>
                    <rect className="rs" x="66" y="168" width="20" height="8"/>
                    <rect className="rb" x="30" y="162" width="20" height="8"/>
                    <rect className="rb" x="70" y="162" width="20" height="8"/>
                  </g>
                </g>
              </svg>
              <span style={{ fontFamily: T.mono, fontSize: 12.5, color: "#abb2bf" }}>Thinking<span style={{ display: "inline-block", width: "1.8ch" }}>{".".repeat(dots)}</span></span>
            </div>
          )}
        </div>
      )}

      {/* Hero area */}
      <div style={{ flex: 1, padding: "48px 52px 44px", display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
        {phase === 2 && (
        <svg width="560" height="410" style={{ animation: "fadeSlideIn 600ms ease forwards" }} viewBox="0 0 560 410" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: "100%", height: "auto" }}>
          <style>{`.b{fill:#cf5f38;stroke:#7a2e0c;stroke-width:1.5}.s{fill:#1e1e1e;stroke:#7a2e0c;stroke-width:2}`}</style>
          {/* D */}
          <rect className="s" x="26" y="26" width="18" height="18"/><rect className="s" x="26" y="46" width="18" height="18"/><rect className="s" x="26" y="66" width="18" height="18"/><rect className="s" x="26" y="86" width="18" height="18"/><rect className="s" x="26" y="106" width="18" height="18"/>
          <rect className="s" x="46" y="26" width="18" height="18"/><rect className="s" x="66" y="26" width="18" height="18"/>
          <rect className="s" x="86" y="46" width="18" height="18"/><rect className="s" x="86" y="66" width="18" height="18"/><rect className="s" x="86" y="86" width="18" height="18"/>
          <rect className="s" x="46" y="106" width="18" height="18"/><rect className="s" x="66" y="106" width="18" height="18"/>
          <rect className="b" x="20" y="20" width="18" height="18"/><rect className="b" x="20" y="40" width="18" height="18"/><rect className="b" x="20" y="60" width="18" height="18"/><rect className="b" x="20" y="80" width="18" height="18"/><rect className="b" x="20" y="100" width="18" height="18"/>
          <rect className="b" x="40" y="20" width="18" height="18"/><rect className="b" x="60" y="20" width="18" height="18"/>
          <rect className="b" x="80" y="40" width="18" height="18"/><rect className="b" x="80" y="60" width="18" height="18"/><rect className="b" x="80" y="80" width="18" height="18"/>
          <rect className="b" x="40" y="100" width="18" height="18"/><rect className="b" x="60" y="100" width="18" height="18"/>
          {/* E */}
          <rect className="s" x="114" y="26" width="18" height="18"/><rect className="s" x="114" y="46" width="18" height="18"/><rect className="s" x="114" y="66" width="18" height="18"/><rect className="s" x="114" y="86" width="18" height="18"/><rect className="s" x="114" y="106" width="18" height="18"/>
          <rect className="s" x="134" y="26" width="18" height="18"/><rect className="s" x="154" y="26" width="18" height="18"/><rect className="s" x="174" y="26" width="18" height="18"/>
          <rect className="s" x="134" y="66" width="18" height="18"/><rect className="s" x="154" y="66" width="18" height="18"/>
          <rect className="s" x="134" y="106" width="18" height="18"/><rect className="s" x="154" y="106" width="18" height="18"/><rect className="s" x="174" y="106" width="18" height="18"/>
          <rect className="b" x="108" y="20" width="18" height="18"/><rect className="b" x="108" y="40" width="18" height="18"/><rect className="b" x="108" y="60" width="18" height="18"/><rect className="b" x="108" y="80" width="18" height="18"/><rect className="b" x="108" y="100" width="18" height="18"/>
          <rect className="b" x="128" y="20" width="18" height="18"/><rect className="b" x="148" y="20" width="18" height="18"/><rect className="b" x="168" y="20" width="18" height="18"/>
          <rect className="b" x="128" y="60" width="18" height="18"/><rect className="b" x="148" y="60" width="18" height="18"/>
          <rect className="b" x="128" y="100" width="18" height="18"/><rect className="b" x="148" y="100" width="18" height="18"/><rect className="b" x="168" y="100" width="18" height="18"/>
          {/* S */}
          <rect className="s" x="206" y="26" width="18" height="18"/><rect className="s" x="226" y="26" width="18" height="18"/><rect className="s" x="246" y="26" width="18" height="18"/><rect className="s" x="266" y="26" width="18" height="18"/>
          <rect className="s" x="206" y="46" width="18" height="18"/>
          <rect className="s" x="206" y="66" width="18" height="18"/><rect className="s" x="226" y="66" width="18" height="18"/><rect className="s" x="246" y="66" width="18" height="18"/>
          <rect className="s" x="266" y="86" width="18" height="18"/>
          <rect className="s" x="206" y="106" width="18" height="18"/><rect className="s" x="226" y="106" width="18" height="18"/><rect className="s" x="246" y="106" width="18" height="18"/><rect className="s" x="266" y="106" width="18" height="18"/>
          <rect className="b" x="200" y="20" width="18" height="18"/><rect className="b" x="220" y="20" width="18" height="18"/><rect className="b" x="240" y="20" width="18" height="18"/><rect className="b" x="260" y="20" width="18" height="18"/>
          <rect className="b" x="200" y="40" width="18" height="18"/>
          <rect className="b" x="200" y="60" width="18" height="18"/><rect className="b" x="220" y="60" width="18" height="18"/><rect className="b" x="240" y="60" width="18" height="18"/>
          <rect className="b" x="260" y="80" width="18" height="18"/>
          <rect className="b" x="200" y="100" width="18" height="18"/><rect className="b" x="220" y="100" width="18" height="18"/><rect className="b" x="240" y="100" width="18" height="18"/><rect className="b" x="260" y="100" width="18" height="18"/>
          {/* I */}
          <rect className="s" x="294" y="26" width="18" height="18"/><rect className="s" x="314" y="26" width="18" height="18"/><rect className="s" x="334" y="26" width="18" height="18"/>
          <rect className="s" x="314" y="46" width="18" height="18"/><rect className="s" x="314" y="66" width="18" height="18"/><rect className="s" x="314" y="86" width="18" height="18"/>
          <rect className="s" x="294" y="106" width="18" height="18"/><rect className="s" x="314" y="106" width="18" height="18"/><rect className="s" x="334" y="106" width="18" height="18"/>
          <rect className="b" x="288" y="20" width="18" height="18"/><rect className="b" x="308" y="20" width="18" height="18"/><rect className="b" x="328" y="20" width="18" height="18"/>
          <rect className="b" x="308" y="40" width="18" height="18"/><rect className="b" x="308" y="60" width="18" height="18"/><rect className="b" x="308" y="80" width="18" height="18"/>
          <rect className="b" x="288" y="100" width="18" height="18"/><rect className="b" x="308" y="100" width="18" height="18"/><rect className="b" x="328" y="100" width="18" height="18"/>
          {/* G */}
          <rect className="s" x="366" y="26" width="18" height="18"/><rect className="s" x="386" y="26" width="18" height="18"/><rect className="s" x="406" y="26" width="18" height="18"/><rect className="s" x="426" y="26" width="18" height="18"/>
          <rect className="s" x="366" y="46" width="18" height="18"/>
          <rect className="s" x="366" y="66" width="18" height="18"/><rect className="s" x="406" y="66" width="18" height="18"/><rect className="s" x="426" y="66" width="18" height="18"/>
          <rect className="s" x="366" y="86" width="18" height="18"/><rect className="s" x="426" y="86" width="18" height="18"/>
          <rect className="s" x="366" y="106" width="18" height="18"/><rect className="s" x="386" y="106" width="18" height="18"/><rect className="s" x="406" y="106" width="18" height="18"/><rect className="s" x="426" y="106" width="18" height="18"/>
          <rect className="b" x="360" y="20" width="18" height="18"/><rect className="b" x="380" y="20" width="18" height="18"/><rect className="b" x="400" y="20" width="18" height="18"/><rect className="b" x="420" y="20" width="18" height="18"/>
          <rect className="b" x="360" y="40" width="18" height="18"/>
          <rect className="b" x="360" y="60" width="18" height="18"/><rect className="b" x="400" y="60" width="18" height="18"/><rect className="b" x="420" y="60" width="18" height="18"/>
          <rect className="b" x="360" y="80" width="18" height="18"/><rect className="b" x="420" y="80" width="18" height="18"/>
          <rect className="b" x="360" y="100" width="18" height="18"/><rect className="b" x="380" y="100" width="18" height="18"/><rect className="b" x="400" y="100" width="18" height="18"/><rect className="b" x="420" y="100" width="18" height="18"/>
          {/* N */}
          <rect className="s" x="458" y="26" width="18" height="18"/><rect className="s" x="458" y="46" width="18" height="18"/><rect className="s" x="458" y="66" width="18" height="18"/><rect className="s" x="458" y="86" width="18" height="18"/><rect className="s" x="458" y="106" width="18" height="18"/>
          <rect className="s" x="478" y="46" width="18" height="18"/><rect className="s" x="498" y="66" width="18" height="18"/>
          <rect className="s" x="518" y="26" width="18" height="18"/><rect className="s" x="518" y="46" width="18" height="18"/><rect className="s" x="518" y="66" width="18" height="18"/><rect className="s" x="518" y="86" width="18" height="18"/><rect className="s" x="518" y="106" width="18" height="18"/>
          <rect className="b" x="452" y="20" width="18" height="18"/><rect className="b" x="452" y="40" width="18" height="18"/><rect className="b" x="452" y="60" width="18" height="18"/><rect className="b" x="452" y="80" width="18" height="18"/><rect className="b" x="452" y="100" width="18" height="18"/>
          <rect className="b" x="472" y="40" width="18" height="18"/><rect className="b" x="492" y="60" width="18" height="18"/>
          <rect className="b" x="512" y="20" width="18" height="18"/><rect className="b" x="512" y="40" width="18" height="18"/><rect className="b" x="512" y="60" width="18" height="18"/><rect className="b" x="512" y="80" width="18" height="18"/><rect className="b" x="512" y="100" width="18" height="18"/>
          {/* T */}
          <rect className="s" x="26" y="156" width="18" height="18"/><rect className="s" x="46" y="156" width="18" height="18"/><rect className="s" x="66" y="156" width="18" height="18"/><rect className="s" x="86" y="156" width="18" height="18"/><rect className="s" x="106" y="156" width="18" height="18"/>
          <rect className="s" x="66" y="176" width="18" height="18"/><rect className="s" x="66" y="196" width="18" height="18"/><rect className="s" x="66" y="216" width="18" height="18"/><rect className="s" x="66" y="236" width="18" height="18"/>
          <rect className="b" x="20" y="150" width="18" height="18"/><rect className="b" x="40" y="150" width="18" height="18"/><rect className="b" x="60" y="150" width="18" height="18"/><rect className="b" x="80" y="150" width="18" height="18"/><rect className="b" x="100" y="150" width="18" height="18"/>
          <rect className="b" x="60" y="170" width="18" height="18"/><rect className="b" x="60" y="190" width="18" height="18"/><rect className="b" x="60" y="210" width="18" height="18"/><rect className="b" x="60" y="230" width="18" height="18"/>
          {/* H */}
          <rect className="s" x="138" y="156" width="18" height="18"/><rect className="s" x="138" y="176" width="18" height="18"/><rect className="s" x="138" y="196" width="18" height="18"/><rect className="s" x="138" y="216" width="18" height="18"/><rect className="s" x="138" y="236" width="18" height="18"/>
          <rect className="s" x="158" y="196" width="18" height="18"/><rect className="s" x="178" y="196" width="18" height="18"/>
          <rect className="s" x="198" y="156" width="18" height="18"/><rect className="s" x="198" y="176" width="18" height="18"/><rect className="s" x="198" y="196" width="18" height="18"/><rect className="s" x="198" y="216" width="18" height="18"/><rect className="s" x="198" y="236" width="18" height="18"/>
          <rect className="b" x="132" y="150" width="18" height="18"/><rect className="b" x="132" y="170" width="18" height="18"/><rect className="b" x="132" y="190" width="18" height="18"/><rect className="b" x="132" y="210" width="18" height="18"/><rect className="b" x="132" y="230" width="18" height="18"/>
          <rect className="b" x="152" y="190" width="18" height="18"/><rect className="b" x="172" y="190" width="18" height="18"/>
          <rect className="b" x="192" y="150" width="18" height="18"/><rect className="b" x="192" y="170" width="18" height="18"/><rect className="b" x="192" y="190" width="18" height="18"/><rect className="b" x="192" y="210" width="18" height="18"/><rect className="b" x="192" y="230" width="18" height="18"/>
          {/* A */}
          <rect className="s" x="226" y="156" width="18" height="18"/><rect className="s" x="246" y="156" width="18" height="18"/>
          <rect className="s" x="226" y="176" width="18" height="18"/><rect className="s" x="266" y="176" width="18" height="18"/>
          <rect className="s" x="226" y="196" width="18" height="18"/><rect className="s" x="246" y="196" width="18" height="18"/><rect className="s" x="266" y="196" width="18" height="18"/>
          <rect className="s" x="226" y="216" width="18" height="18"/><rect className="s" x="266" y="216" width="18" height="18"/>
          <rect className="s" x="226" y="236" width="18" height="18"/><rect className="s" x="266" y="236" width="18" height="18"/>
          <rect className="b" x="220" y="150" width="18" height="18"/><rect className="b" x="240" y="150" width="18" height="18"/>
          <rect className="b" x="220" y="170" width="18" height="18"/><rect className="b" x="260" y="170" width="18" height="18"/>
          <rect className="b" x="220" y="190" width="18" height="18"/><rect className="b" x="240" y="190" width="18" height="18"/><rect className="b" x="260" y="190" width="18" height="18"/>
          <rect className="b" x="220" y="210" width="18" height="18"/><rect className="b" x="260" y="210" width="18" height="18"/>
          <rect className="b" x="220" y="230" width="18" height="18"/><rect className="b" x="260" y="230" width="18" height="18"/>
          {/* T (second) */}
          <rect className="s" x="298" y="156" width="18" height="18"/><rect className="s" x="318" y="156" width="18" height="18"/><rect className="s" x="338" y="156" width="18" height="18"/><rect className="s" x="358" y="156" width="18" height="18"/><rect className="s" x="378" y="156" width="18" height="18"/>
          <rect className="s" x="338" y="176" width="18" height="18"/><rect className="s" x="338" y="196" width="18" height="18"/><rect className="s" x="338" y="216" width="18" height="18"/><rect className="s" x="338" y="236" width="18" height="18"/>
          <rect className="b" x="292" y="150" width="18" height="18"/><rect className="b" x="312" y="150" width="18" height="18"/><rect className="b" x="332" y="150" width="18" height="18"/><rect className="b" x="352" y="150" width="18" height="18"/><rect className="b" x="372" y="150" width="18" height="18"/>
          <rect className="b" x="332" y="170" width="18" height="18"/><rect className="b" x="332" y="190" width="18" height="18"/><rect className="b" x="332" y="210" width="18" height="18"/><rect className="b" x="332" y="230" width="18" height="18"/>
          {/* S (ships) */}
          <rect className="s" x="26" y="286" width="18" height="18"/><rect className="s" x="46" y="286" width="18" height="18"/><rect className="s" x="66" y="286" width="18" height="18"/><rect className="s" x="86" y="286" width="18" height="18"/>
          <rect className="s" x="26" y="306" width="18" height="18"/>
          <rect className="s" x="26" y="326" width="18" height="18"/><rect className="s" x="46" y="326" width="18" height="18"/><rect className="s" x="66" y="326" width="18" height="18"/>
          <rect className="s" x="86" y="346" width="18" height="18"/>
          <rect className="s" x="26" y="366" width="18" height="18"/><rect className="s" x="46" y="366" width="18" height="18"/><rect className="s" x="66" y="366" width="18" height="18"/><rect className="s" x="86" y="366" width="18" height="18"/>
          <rect className="b" x="20" y="280" width="18" height="18"/><rect className="b" x="40" y="280" width="18" height="18"/><rect className="b" x="60" y="280" width="18" height="18"/><rect className="b" x="80" y="280" width="18" height="18"/>
          <rect className="b" x="20" y="300" width="18" height="18"/>
          <rect className="b" x="20" y="320" width="18" height="18"/><rect className="b" x="40" y="320" width="18" height="18"/><rect className="b" x="60" y="320" width="18" height="18"/>
          <rect className="b" x="80" y="340" width="18" height="18"/>
          <rect className="b" x="20" y="360" width="18" height="18"/><rect className="b" x="40" y="360" width="18" height="18"/><rect className="b" x="60" y="360" width="18" height="18"/><rect className="b" x="80" y="360" width="18" height="18"/>
          {/* H (ships) */}
          <rect className="s" x="114" y="286" width="18" height="18"/><rect className="s" x="114" y="306" width="18" height="18"/><rect className="s" x="114" y="326" width="18" height="18"/><rect className="s" x="114" y="346" width="18" height="18"/><rect className="s" x="114" y="366" width="18" height="18"/>
          <rect className="s" x="134" y="326" width="18" height="18"/><rect className="s" x="154" y="326" width="18" height="18"/>
          <rect className="s" x="174" y="286" width="18" height="18"/><rect className="s" x="174" y="306" width="18" height="18"/><rect className="s" x="174" y="326" width="18" height="18"/><rect className="s" x="174" y="346" width="18" height="18"/><rect className="s" x="174" y="366" width="18" height="18"/>
          <rect className="b" x="108" y="280" width="18" height="18"/><rect className="b" x="108" y="300" width="18" height="18"/><rect className="b" x="108" y="320" width="18" height="18"/><rect className="b" x="108" y="340" width="18" height="18"/><rect className="b" x="108" y="360" width="18" height="18"/>
          <rect className="b" x="128" y="320" width="18" height="18"/><rect className="b" x="148" y="320" width="18" height="18"/>
          <rect className="b" x="168" y="280" width="18" height="18"/><rect className="b" x="168" y="300" width="18" height="18"/><rect className="b" x="168" y="320" width="18" height="18"/><rect className="b" x="168" y="340" width="18" height="18"/><rect className="b" x="168" y="360" width="18" height="18"/>
          {/* I (ships) */}
          <rect className="s" x="206" y="286" width="18" height="18"/><rect className="s" x="226" y="286" width="18" height="18"/><rect className="s" x="246" y="286" width="18" height="18"/>
          <rect className="s" x="226" y="306" width="18" height="18"/><rect className="s" x="226" y="326" width="18" height="18"/><rect className="s" x="226" y="346" width="18" height="18"/>
          <rect className="s" x="206" y="366" width="18" height="18"/><rect className="s" x="226" y="366" width="18" height="18"/><rect className="s" x="246" y="366" width="18" height="18"/>
          <rect className="b" x="200" y="280" width="18" height="18"/><rect className="b" x="220" y="280" width="18" height="18"/><rect className="b" x="240" y="280" width="18" height="18"/>
          <rect className="b" x="220" y="300" width="18" height="18"/><rect className="b" x="220" y="320" width="18" height="18"/><rect className="b" x="220" y="340" width="18" height="18"/>
          <rect className="b" x="200" y="360" width="18" height="18"/><rect className="b" x="220" y="360" width="18" height="18"/><rect className="b" x="240" y="360" width="18" height="18"/>
          {/* P (ships) */}
          <rect className="s" x="278" y="286" width="18" height="18"/><rect className="s" x="278" y="306" width="18" height="18"/><rect className="s" x="278" y="326" width="18" height="18"/><rect className="s" x="278" y="346" width="18" height="18"/><rect className="s" x="278" y="366" width="18" height="18"/>
          <rect className="s" x="298" y="286" width="18" height="18"/><rect className="s" x="318" y="286" width="18" height="18"/>
          <rect className="s" x="338" y="286" width="18" height="18"/><rect className="s" x="338" y="306" width="18" height="18"/>
          <rect className="s" x="298" y="326" width="18" height="18"/><rect className="s" x="318" y="326" width="18" height="18"/>
          <rect className="b" x="272" y="280" width="18" height="18"/><rect className="b" x="272" y="300" width="18" height="18"/><rect className="b" x="272" y="320" width="18" height="18"/><rect className="b" x="272" y="340" width="18" height="18"/><rect className="b" x="272" y="360" width="18" height="18"/>
          <rect className="b" x="292" y="280" width="18" height="18"/><rect className="b" x="312" y="280" width="18" height="18"/>
          <rect className="b" x="332" y="280" width="18" height="18"/><rect className="b" x="332" y="300" width="18" height="18"/>
          <rect className="b" x="292" y="320" width="18" height="18"/><rect className="b" x="312" y="320" width="18" height="18"/>
          {/* S (ships, last) */}
          <rect className="s" x="370" y="286" width="18" height="18"/><rect className="s" x="390" y="286" width="18" height="18"/><rect className="s" x="410" y="286" width="18" height="18"/><rect className="s" x="430" y="286" width="18" height="18"/>
          <rect className="s" x="370" y="306" width="18" height="18"/>
          <rect className="s" x="370" y="326" width="18" height="18"/><rect className="s" x="390" y="326" width="18" height="18"/><rect className="s" x="410" y="326" width="18" height="18"/>
          <rect className="s" x="430" y="346" width="18" height="18"/>
          <rect className="s" x="370" y="366" width="18" height="18"/><rect className="s" x="390" y="366" width="18" height="18"/><rect className="s" x="410" y="366" width="18" height="18"/><rect className="s" x="430" y="366" width="18" height="18"/>
          <rect className="b" x="364" y="280" width="18" height="18"/><rect className="b" x="384" y="280" width="18" height="18"/><rect className="b" x="404" y="280" width="18" height="18"/><rect className="b" x="424" y="280" width="18" height="18"/>
          <rect className="b" x="364" y="300" width="18" height="18"/>
          <rect className="b" x="364" y="320" width="18" height="18"/><rect className="b" x="384" y="320" width="18" height="18"/><rect className="b" x="404" y="320" width="18" height="18"/>
          <rect className="b" x="424" y="340" width="18" height="18"/>
          <rect className="b" x="364" y="360" width="18" height="18"/><rect className="b" x="384" y="360" width="18" height="18"/><rect className="b" x="404" y="360" width="18" height="18"/><rect className="b" x="424" y="360" width="18" height="18"/>
        </svg>
        )}
      </div>

      {/* Bottom strip */}
      <div style={{ borderTop: "1px solid #242424", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1px 1fr", opacity: phase === 2 ? 1 : 0, transform: phase === 2 ? "translateY(0)" : "translateY(12px)", transition: "opacity 600ms ease, transform 600ms ease" }}>

        {/* Bio */}
        <div style={{ padding: isMobile ? "24px 20px" : "32px 40px 36px 52px" }}>
          <span style={{ ...T.label, color: "#555", display: "block", marginBottom: 12 }}>About</span>
          <p style={{ fontSize: 15, lineHeight: 1.4, color: "#777", maxWidth: "52ch" }}>
            I started as a <strong style={{ color: "#e8e8e8", fontWeight: 700 }}>software engineer</strong> and crossed over into design — which means I can read the code, prototype in it, and ship alongside engineers without a handoff. For 15+ years I've been digging into messy operational problems in healthcare, retail, and financial services. I work in Claude Code and Cursor daily.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
            <button className="btn btn-primary" style={{ fontFamily: T.mono }} onClick={() => openFile?.("work")}>See the work →</button>
            <a href="/Brad-Carter-Resume.pdf" download className="btn btn-secondary" style={{ fontFamily: T.mono }}>Download resume ↓</a>
          </div>
        </div>

        {/* Vertical divider — hidden on mobile */}
        {!isMobile && <div style={{ background: "#242424" }} />}

        {/* Daily tools */}
        <div style={{ padding: isMobile ? "0 20px 24px" : "32px 40px 36px" }}>
          <span style={{ ...T.label, color: "#555", display: "block", marginBottom: 12 }}>Daily tools</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {["Claude Code", "Cursor", "Figma & Figma Make", "React", "GitHub"].map(tool => (
              <div key={tool} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#777", lineHeight: 1.4 }}>
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
  const isMobile = useIsMobile();
  const paras = [
    "I've always been drawn to technology — something about having the entire world at your fingertips, the idea that a screen and a little curiosity could take you anywhere. From my early days building HTML websites just for the fun of it to designing product experiences that genuinely make people's lives better, that pull has never gone away.",
    "My path to product design wasn't the typical road most designers take. I studied political science and somehow landed in the tech world selling software training solutions. Then I took an HTML and CSS class and something clicked. Shortly after, the iPhone showed up and that little device completely supercharged my interest in building things. I spent the next five years developing iPhone apps — and somewhere along the way, I realized I was more interested in how people experienced the app than in the code behind it. I wanted to obsess over the thing people actually touched.",
    "The transition to product design felt natural, and having a development background made me a better designer from day one. I knew how the sausage was made — which meant I could have real conversations with engineers, push back when something was technically unnecessary, and find solutions that were both elegant and buildable. I wasn't designing in a vacuum.",
    "That technical instinct never left. Even when it's out of scope, I've always brought a level of fit and finish to my work that goes beyond static files. I test my designs in code because that's where you find out what's actually true — interactions that look great in Figma can feel completely wrong in the browser, and I'd rather find that out before engineering does. It's also where the fun is. Interaction design is hard to feel in a static mockup. Motion, timing, the way something responds when you tap it — you have to build it to know if it works. And exploring design solutions in code lets me move fast and go places a design tool won't take you.",
    "These days I've leaned hard into AI tools to accelerate that process even further. I can generate and test multiple design directions in the time it used to take to build one — low risk, high speed, and a much shorter path from idea to something you can actually react to. It's changed how I work, and honestly, it's made the work more fun.",
    "Eleven years in, I'm still just trying to build things I'm proud of.",
  ];
  return (
    <div style={{ padding: isMobile ? "24px 20px" : T.pad, fontFamily: T.mono, maxWidth: "68ch" }}>
      <div style={{ ...T.label, color: "#61afef", marginBottom: 24, fontFamily: T.mono }}>// about.js</div>
      <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 32 }}>
        <img src="/brad-profile-2.jpg" alt="Brad Carter" style={{ width: isMobile ? 72 : 104, height: isMobile ? 72 : 104, borderRadius: 6, objectFit: "cover", flexShrink: 0 }} />
        <div>
          <h1 style={{ fontSize: isMobile ? 24 : 36, fontWeight: 700, color: "#f1f1f1", lineHeight: 1.15, marginBottom: 4 }}>Brad Carter</h1>
          <p style={{ fontSize: 18, color: "#f1f1f1", fontWeight: 400, lineHeight: 1.2 }}>Senior Product Designer — DFW, TX</p>
        </div>
      </div>
      {paras.map((p, i) => (
        <p key={i} style={{ ...T.small, color: "#d4d4d4", marginBottom: 20 }}>{p}</p>
      ))}
    </div>
  );
}

// ─── Work ────────────────────────────────────────────────────────────────────
export function WorkPreview() {
  const isMobile = useIsMobile();
  const cards = [
    { tag: "Healthcare · Patient UX", tagColor: "#e5c07b", title: "Heart Failure Care", desc: "Enrolled patient companion inside MyBSWHealth for newly diagnosed heart failure patients. Daily weight and blood pressure tracking with clinical alert thresholds, symptom triage, and a plain-language education library.", role: "Lead Designer", media: [
      { type: "video", src: "/hf-track-weight.mp4", label: "Track Weight" },
      { type: "image", src: "/track-weight-figma.png", label: "Track Weight — Figma", fit: "contain" },
    ]},
    { tag: "Mobile · Patient UX", tagColor: "#d4a96a", title: "Lab Insights", desc: "Lab results mobile app. Raw numbers became plain-language explanations with trend visualization and clear risk hierarchy.", role: "Lead Designer", media: [
      { type: "video", src: "/health-insights.mp4", label: "Lab Insights — Test Detail" },
      { type: "image", src: "/health-insights-figma.png", label: "Health Insights — Figma", position: "top" },
    ]},
    { tag: "Healthcare · Inventory", tagColor: "#d4a96a", title: "AllyIQ", desc: "Real-time inventory platform for retina practices. Replaced disconnected tools, closed billing gaps, and flagged dispensing risks.", role: "Design Lead", media: [
      { type: "image", src: "/ally-placeholder.png" },
    ]},
  ];

  return (
    <div style={{ padding: isMobile ? "16px 20px" : "24px 48px", fontFamily: T.mono, background: "#161616", minHeight: "100%", boxSizing: "border-box" }}>
      {cards.map((c) => (
        <div
          key={c.title}
          style={{ border: "1px solid #2a2a2a", borderRadius: 8, marginBottom: 24, overflow: "hidden", background: "#1e1e1e" }}
        >
          <MediaGallery media={c.media} />
          <div style={{ padding: "20px 24px" }}>
            <div style={{ ...T.label, color: c.tagColor, marginBottom: 8 }}>{c.tag}</div>
            <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.01em", color: "#e8e8e8", marginBottom: 8, fontFamily: T.mono }}>{c.title}</div>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.45, color: "#d1d5dc", maxWidth: "60ch", marginBottom: 14, fontFamily: T.mono }}>{c.desc}</p>
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
  const isMobile = useIsMobile();
  return (
    <div style={{ padding: isMobile ? "24px 20px" : T.pad, fontFamily: T.mono, maxWidth: T.maxW, background: "#161616", minHeight: "100%" }}>
      <div style={{ ...T.label, color: "#e06c75", marginBottom: 16, fontFamily: T.mono }}>// resume.pdf</div>
      <h1 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, color: "#e8e8e8", marginBottom: 4 }}>Brad Carter</h1>
      <p style={{ fontSize: 16, color: "#aaa", marginBottom: 16, lineHeight: 1.4 }}>Senior Product Designer · DFW, TX</p>
      <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
        {["brad@bradcarter.design", "bradcarter.design", "brad-carter-work"].map((t) => (
          <span key={t} style={{ fontSize: 13, color: "#61afef", fontFamily: T.mono }}>{t}</span>
        ))}
      </div>
      <div style={{ ...T.label, color: "#555", marginBottom: 16, fontFamily: T.mono, paddingBottom: 8, borderBottom: "1px solid #2a2a2a" }}>Experience</div>
      {[
        { role: "Senior Product Designer", co: "Slalom Consulting", years: "2015 – 2026", bullets: [
          "Delivered end-to-end product design across 20+ client engagements in healthcare, retail, financial services, and ecommerce — owning design from discovery through production launch on each.",
          "Co-created Fast Forward, an AI-accelerated design methodology that compressed multi-week discovery cycles into 2–3 days — output was coded prototypes handed directly to engineering; adopted across 8 client programs in its first year.",
          "Prototyped in Figma, Figma Make, and Claude Code daily — moving ideas into testable interfaces within hours, not weeks.",
          "Mentored two junior designers; both were promoted within 18 months.",
        ]},
        { role: "Mobile Application Architect", co: "Capgemini Consulting", years: "2011 – 2015", bullets: [
          "Designed and built mobile applications as a developer before moving into product design — gave me the technical grounding that shapes how I work with engineers today.",
          "Led architecture and front-end development on client-facing mobile products, bridging the gap between business requirements and engineering execution.",
        ]},
      ].map((item) => (
        <div key={item.role} style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#e8e8e8" }}>{item.role}</span>
            <span style={{ fontSize: 13, color: "#666", fontFamily: T.mono, flexShrink: 0, marginLeft: 12 }}>{item.years}</span>
          </div>
          <div style={{ fontSize: 14, color: "#61afef", marginBottom: 20, fontFamily: T.mono }}>{item.co}</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {item.bullets.map((b, i) => (
              <li key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                <span style={{ color: "#555", flexShrink: 0, lineHeight: T.small.lineHeight }}>·</span>
                <span style={{ ...T.small, color: "#e8e8e8", fontFamily: T.mono }}>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <a
        href="/Brad-Carter-Resume.pdf"
        download
        className="btn btn-secondary"
        style={{ fontFamily: T.mono, marginTop: 8 }}
      >
        Download resume ↓
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
