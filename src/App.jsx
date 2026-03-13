import { useState, useEffect, useRef } from "react";
import { FILES, DEFAULT_TABS, DEFAULT_FILE } from "./data/files";
import CodeLine from "./components/CodeLine";
import { PREVIEW_MAP } from "./components/Previews";
import useTyping from "./hooks/useTyping";

const S = {
  bg: "#1e1e1e",
  tab: "#2d2d2d",
  border: "#111",
  dim: "#4b5563",
};

export default function App() {
  const [activeFile, setActiveFile] = useState(DEFAULT_FILE);
  const [openTabs, setOpenTabs] = useState(DEFAULT_TABS);
  const codeRef = useRef(null);

  const file = FILES[activeFile] || FILES.about;
  const lines = useTyping(file.lines, [activeFile]);
  const PreviewComp = PREVIEW_MAP[activeFile] || PREVIEW_MAP.about;

  useEffect(() => {
    if (codeRef.current) codeRef.current.scrollTop = codeRef.current.scrollHeight;
  }, [lines]);

  function openFile(key) {
    setActiveFile(key);
    setOpenTabs((prev) => (prev.includes(key) ? prev : [...prev, key]));
  }

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1E1E1E 0%, #2EC0C6 100%)",
        padding: "48px 0",
        boxSizing: "border-box",
      }}
    >
      {/* ── Editor Window ── */}
      <div
        style={{
          width: "100%",
          maxWidth: 1440,
          margin: "0 auto",
          height: "calc(100vh - 96px)",
          display: "flex",
          flexDirection: "column",
          background: S.bg,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          overflow: "hidden",
          borderRadius: "0.75rem",
          border: "1px solid #111",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)",
        }}
      >
        {/* ── Title Bar ── */}
        <div
          style={{
            height: 42,
            background: "#323233",
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            flexShrink: 0,
            borderBottom: `1px solid ${S.border}`,
            position: "relative",
            userSelect: "none",
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            {["#ff5f57", "#ffbd2e", "#28ca41"].map((c, i) => (
              <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
            ))}
          </div>
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: 11.5,
              color: "#9d9d9d",
              whiteSpace: "nowrap",
            }}
          >
            brad-carter — product designer
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* ── Main Panel ── */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

            {/* ── Tabs ── */}
            <div
              style={{
                height: 35,
                background: S.tab,
                display: "flex",
                alignItems: "stretch",
                borderBottom: `1px solid ${S.border}`,
                flexShrink: 0,
                overflowX: "auto",
                overflowY: "hidden",
              }}
            >
              {openTabs.map((key) => {
                const f = FILES[key];
                if (!f) return null;
                const active = key === activeFile;
                return (
                  <div
                    key={key}
                    onClick={() => openFile(key)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      padding: "0 14px",
                      fontSize: 12,
                      color: active ? "#d4d4d4" : "#969696",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      borderRight: `1px solid ${S.border}`,
                      borderTop: `1px solid ${active ? "#61afef" : "transparent"}`,
                      background: active ? S.bg : "transparent",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ color: f.extColor, fontSize: 11, fontWeight: 600 }}>{f.ext}</span>
                    {f.name}
                    <span style={{ fontSize: 12, color: "#555", opacity: 0.7 }}>×</span>
                  </div>
                );
              })}
            </div>

            {/* ── Split Pane ── */}
            <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

              {/* ── Code Editor ── */}
              <div style={{ flex: 1, display: "flex", overflow: "hidden", background: S.bg, minWidth: 500, maxWidth: 500 }}>
                {/* Line numbers */}
                <div
                  style={{
                    width: 48,
                    flexShrink: 0,
                    padding: "14px 14px 14px 0",
                    textAlign: "right",
                    fontSize: 12.5,
                    lineHeight: "21px",
                    color: S.dim,
                    background: S.bg,
                    userSelect: "none",
                  }}
                >
                  {lines.map((_, i) => <div key={i}>{i + 1}</div>)}
                </div>

                {/* Code */}
                <div
                  ref={codeRef}
                  className="code-editor"
                  style={{
                    flex: 1,
                    padding: "14px 0 14px 4px",
                    overflowY: "auto",
                    overflowX: "auto",
                    fontSize: 12.5,
                    background: S.bg,
                    minWidth: 0,
                  }}
                >
                  {lines.map((parts, i) => {
                    const lineText = parts.filter((_, idx) => idx % 2 !== 0).join("");
                    const homeLinks = activeFile === "home" && [
                      ["about.js",  "about"],
                      ["work.ts",   "work"],
                      ["contact.ts","contact"],
                      ["resume.pdf","resume"],
                    ].find(([needle]) => lineText.includes(needle));
                    return <CodeLine key={i} parts={parts} onClick={homeLinks ? () => openFile(homeLinks[1]) : undefined} />;
                  })}
                  <span
                    style={{
                      display: "inline-block",
                      width: 2,
                      height: 15,
                      background: "#aeafad",
                      verticalAlign: "middle",
                      animation: "blink 1.1s step-end infinite",
                    }}
                  />
                </div>

                {/* Minimap */}
                <div
                  style={{
                    width: 56,
                    background: S.bg,
                    borderLeft: "1px solid #2a2a2a",
                    opacity: 0.5,
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <div style={{ padding: "14px 4px", display: "flex", flexDirection: "column", gap: 2 }}>
                    {lines.map((parts, i) => (
                      <div
                        key={i}
                        style={{
                          height: 2,
                          borderRadius: 1,
                          background: parts.includes("kw")
                            ? "#6e3b8a"
                            : parts.includes("str")
                            ? "#4a6741"
                            : parts.includes("cmt")
                            ? "#333"
                            : "#3a3a3a",
                          width: `${parts.length === 0 ? 0 : 30 + (i * 17) % 40}%`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Divider ── */}
              <div
                style={{
                  width: 1,
                  background: S.border,
                  flexShrink: 0,
                  cursor: "col-resize",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "#3a3a3a", fontSize: 12 }}>⋮</span>
              </div>

              {/* ── Preview ── */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#161616", overflow: "hidden", margin: 24, borderRadius: "0.75rem", border: "1px solid #111111" }}>
                {/* Preview toolbar */}
                <div
                  style={{
                    height: 42,
                    background: "#f3f3f3",
                    borderBottom: "1px solid #ddd",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 12px",
                    gap: 8,
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: 11, color: "#888", fontFamily: "monospace" }}>PREVIEW</span>
                  <div
                    style={{
                      flex: 1,
                      background: "#e8e8e8",
                      border: "1px solid #ccc",
                      borderRadius: 4,
                      padding: "3px 10px",
                      fontSize: 11,
                      color: "#555",
                      fontFamily: "monospace",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {file.url}
                  </div>
                  <span style={{ fontSize: 14, color: "#888", cursor: "pointer" }}>↻</span>
                </div>

                {/* Preview content */}
                <div className="preview-content" style={{ flex: 1, overflowY: "auto" }}>
                  <PreviewComp key={activeFile} openFile={openFile} />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── Status Bar ── */}
        <div
          style={{
            height: 22,
            background: "#323233",
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
            flexShrink: 0,
            fontSize: 11,
            color: "rgba(255,255,255,0.9)",
            userSelect: "none",
          }}
        >
          {["⎇ main", "✓ 0 errors", "⚠ 0 warnings"].map((t) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 5, padding: "0 8px", cursor: "pointer", height: "100%", opacity: 0.85 }}>
              {t}
            </div>
          ))}
          <div style={{ marginLeft: "auto", display: "flex" }}>
            {[file.lang, "UTF-8", "Spaces: 2", "🔔 Open to Work"].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", padding: "0 8px", cursor: "pointer", opacity: 0.85, whiteSpace: "nowrap" }}>
                {t}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
