import { useState, useEffect } from "react";

export function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const alreadyCounted = sessionStorage.getItem("visited");

    const method = alreadyCounted ? "GET" : "POST";

    fetch("/api/visits", { method })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.count === "number") {
          setCount(data.count);
          if (!alreadyCounted) {
            sessionStorage.setItem("visited", "1");
          }
        }
      })
      .catch(() => {
        const stored = localStorage.getItem("site_visit_count");
        const localCount = stored ? parseInt(stored, 10) : 0;
        if (!alreadyCounted) {
          const newCount = localCount + 1;
          localStorage.setItem("site_visit_count", String(newCount));
          sessionStorage.setItem("visited", "1");
          setCount(newCount);
        } else {
          setCount(localCount);
        }
      });
  }, []);

  return count;
}
