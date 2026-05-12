import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import logoDark from "@/assets/logo-dark.jpg";

const JAVA_LINES = [
  "import magister1o.portfolio.App;",
  "import magister1o.portfolio.Server;",
  "import magister1o.portfolio.Config;",
  "",
  "/**",
  " * Portfolio entry point",
  " * @author magister1o",
  " */",
  "public class PortfolioLauncher {",
  "",
  "    public static void main(String[] args) {",
  '        System.out.println("Initializing...");',
  "",
  "        Config config = new Config();",
  '        config.setHost("0.0.0.0");',
  "        config.setPort(3000);",
  '        config.setLang("ru", "en");',
  "",
  "        App app = new App(config);",
  "        app.loadSections(",
  '            "hero", "about",',
  '            "skills", "projects"',
  "        );",
  "",
  "        Server server = Server.create(app);",
  "        server.onReady(() -> {",
  '            System.out.println("Portfolio is live.");',
  "        });",
  "",
  "        server.start();",
  "    }",
  "}",
];

const Preloader = () => {
  const { isDark } = useTheme();
  const [phase, setPhase] = useState<"visible" | "fading" | "done">("visible");
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((n) => {
        if (n >= JAVA_LINES.length) { clearInterval(interval); return n; }
        return n + 1;
      });
    }, 38);

    document.body.classList.add("preloader-open");

    const fadeTimer = setTimeout(() => setPhase("fading"), 900);
    const doneTimer = setTimeout(() => {
      setPhase("done");
      document.body.classList.remove("preloader-open");
    }, 1550);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
      document.body.classList.remove("preloader-open");
    };
  }, []);

  if (phase === "done") return null;

  const fading   = phase === "fading";
  const track    = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";
  const fill     = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.40)";
  const codeFg   = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.20)";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isDark ? "#09090b" : "#f8f8f8",
        opacity: fading ? 0 : 1,
        transition: fading ? "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
        pointerEvents: fading ? "none" : "auto",
        overflow: "hidden",
      }}
    >
      {/* Java code background */}
      <pre
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          margin: 0,
          padding: 0,
          fontFamily: "'SF Mono', 'Fira Code', 'Cascadia Code', monospace",
          fontSize: 13,
          lineHeight: 1.65,
          color: codeFg,
          whiteSpace: "pre",
          userSelect: "none",
          pointerEvents: "none",
          textAlign: "left",
          width: "max-content",
        }}
      >
        {JAVA_LINES.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            style={{
              opacity: 1,
              animation: "code-line-in 0.12s ease forwards",
            }}
          >
            {line || "\u00A0"}
          </div>
        ))}
      </pre>

      {/* Logo + label + progress — sits on top */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          opacity: fading ? 0 : 1,
          transform: fading ? "scale(1.04)" : "scale(1)",
          transition: fading
            ? "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
            : "none",
        }}
      >
        <img
          src={logoDark}
          alt="logo"
          style={{ width: 72, height: 72, borderRadius: 18, objectFit: "cover" }}
        />
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.08em",
            color: isDark ? "rgba(244,244,245,0.35)" : "rgba(9,9,11,0.3)",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          }}
        >
          magister1o
        </span>

        {/* Progress bar */}
        <div
          style={{
            marginTop: -4,
            width: 200,
            height: 4,
            borderRadius: 9999,
            background: track,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: 9999,
              background: fill,
              animation: "mac-progress 0.85s cubic-bezier(0.4, 0, 0.6, 1) forwards",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes mac-progress {
          0%   { width: 0%; }
          60%  { width: 75%; }
          85%  { width: 90%; }
          100% { width: 100%; }
        }
        @keyframes code-line-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
