import { useEffect, useRef } from "react";

/**
 * Subtle Matrix-style code rain painted on a canvas. Adapts colors to the
 * active theme by reading CSS custom properties.
 */
export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let columns: number[] = [];
    const fontSize = 14;
    const chars =
      "01{}[]<>()/*+-=;:$#@!?abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const colCount = Math.ceil(width / fontSize);
      columns = new Array(colCount)
        .fill(0)
        .map(() => Math.random() * (height / fontSize));
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let last = 0;
    const step = (t: number) => {
      if (t - last > 60) {
        last = t;
        const isLight = document.documentElement.classList.contains("light");
        // Fade previous frame
        ctx.fillStyle = isLight
          ? "rgba(238, 235, 228, 0.10)"
          : "rgba(10, 12, 22, 0.10)";
        ctx.fillRect(0, 0, width, height);

        ctx.font = `${fontSize}px "JetBrains Mono", ui-monospace, monospace`;
        for (let i = 0; i < columns.length; i++) {
          const ch = chars.charAt(Math.floor(Math.random() * chars.length));
          const x = i * fontSize;
          const y = columns[i] * fontSize;
          // Head glyph — brighter
          ctx.fillStyle = isLight
            ? "rgba(60, 90, 140, 0.55)"
            : "rgba(120, 240, 235, 0.55)";
          ctx.fillText(ch, x, y);
          // Trailing dimmer glyph
          ctx.fillStyle = isLight
            ? "rgba(80, 60, 140, 0.18)"
            : "rgba(160, 120, 240, 0.22)";
          ctx.fillText(ch, x, y - fontSize);

          if (y > height && Math.random() > 0.975) {
            columns[i] = 0;
          }
          columns[i] += 1;
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="matrix-rain pointer-events-none fixed inset-0 -z-10"
    />
  );
}