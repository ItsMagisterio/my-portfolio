import { useEffect, useRef, useState } from "react";

const CLICKABLE = 'a, button, input, textarea, select, label, [role="button"], [tabindex]';
const SPRING = 0.18;

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -200, y: -200 });
  const current = useRef({ x: -200, y: -200 });
  const raf = useRef<number>(0);
  const [state, setState] = useState<"default" | "hover" | "click">("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element)?.closest(CLICKABLE);
      setState((s) => (s === "click" ? "click" : el ? "hover" : "default"));
    };

    const onDown = () => setState("click");
    const onUp = (e: MouseEvent) => {
      const el = (e.target as Element)?.closest(CLICKABLE);
      setState(el ? "hover" : "default");
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const tick = () => {
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;
      current.current.x += dx * SPRING;
      current.current.y += dy * SPRING;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf.current);
    };
  }, [visible]);

  const scale = state === "click" ? 0.82 : state === "hover" ? 1.18 : 1;
  const svgW = 22;
  const svgH = 24;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99999,
        willChange: "transform",
        transformOrigin: "0 0",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}
    >
      <svg
        width={svgW}
        height={svgH}
        viewBox="0 0 22 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: "block",
          filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.5))",
          transform: `scale(${scale})`,
          transformOrigin: "1px 1px",
          transition:
            state === "click"
              ? "transform 0.08s cubic-bezier(0.34, 1.56, 0.64, 1)"
              : "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <path
          d="M2 2L2 19.5L6.5 14.5L10.2 21.5L13 20.2L9.3 13.2L16.5 13.2L2 2Z"
          fill="white"
          stroke="black"
          strokeWidth="1.4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default CustomCursor;
