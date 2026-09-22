"use client";

import { useEffect, useState } from "react";

/**
 * Visa-prototype-style reading progress bar: 2px coral line fixed to the
 * top of the viewport, width = scroll progress.
 */
export function ReadingProgress({ color = "#ef6e7d" }: { color?: string }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const update = () => {
      const root = document.documentElement;
      const distance = root.scrollHeight - root.clientHeight;
      setWidth(distance > 0 ? (root.scrollTop / distance) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 2,
        width: `${width}%`,
        background: color,
        zIndex: 70,
      }}
    />
  );
}

export default ReadingProgress;
