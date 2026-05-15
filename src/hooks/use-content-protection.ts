import { useEffect } from "react";

export function useContentProtection() {
  useEffect(() => {
    const block = (e: Event) => e.preventDefault();

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const ctrl = e.ctrlKey || e.metaKey;
      const shift = e.shiftKey;

      if (["f12", "printscreen"].includes(e.key.toLowerCase())) return e.preventDefault();
      if (ctrl && shift && ["i", "j", "c", "k", "s"].includes(key)) return e.preventDefault();
      if (ctrl && ["u", "s", "a", "c", "p", "x"].includes(key)) return e.preventDefault();
    };

    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleDragStart = (e: DragEvent) => e.preventDefault();
    const handleBeforePrint = () => {
      document.body.style.display = "none";
      setTimeout(() => { document.body.style.display = ""; }, 100);
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("selectstart", block);
    document.addEventListener("copy", block);
    document.addEventListener("cut", block);
    window.addEventListener("beforeprint", handleBeforePrint);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("selectstart", block);
      document.removeEventListener("copy", block);
      document.removeEventListener("cut", block);
      window.removeEventListener("beforeprint", handleBeforePrint);
    };
  }, []);
}
