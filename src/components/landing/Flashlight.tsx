import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * A theme switcher styled as a flashlight tucked on the side of the viewport.
 * Hover flickers it. Click emits a radial sweep that "illuminates" the page
 * while the theme flips.
 */
export function Flashlight() {
  const [light, setLight] = useState(false);
  const [sweeping, setSweeping] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [origin, setOrigin] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Initial theme
  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const isLight = stored === "light";
    setLight(isLight);
    document.documentElement.classList.toggle("light", isLight);
  }, []);

  // Subtle initial hint bubble
  useEffect(() => {
    const t1 = window.setTimeout(() => setShowHint(true), 1200);
    const t2 = window.setTimeout(() => setShowHint(false), 6500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const trigger = () => {
    if (sweeping) return;
    const el = btnRef.current;
    if (el) {
      const r = el.getBoundingClientRect();
      setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    }
    setSweeping(true);
    // Flip theme at the moment the light reaches full coverage
    window.setTimeout(() => {
      const next = !light;
      setLight(next);
      document.documentElement.classList.toggle("light", next);
      localStorage.setItem("theme", next ? "light" : "dark");
    }, 380);
    window.setTimeout(() => setSweeping(false), 1100);
  };

  const label = light ? "Volver a modo oscuro" : "Cambiar a modo claro";

  const sweepColor = light
    ? "oklch(0.22 0.02 260 / 0.95)"
    : "oklch(0.98 0.02 90 / 0.95)";

  return (
    <>
      {/* Flashlight tucked on the right edge */}
      <div className="fixed right-3 top-1/2 z-40 -translate-y-1/2 md:right-5">
        <div className="relative flex items-center gap-3">
          <AnimatePresence>
            {(showHint || hovering) && (
              <motion.div
                key="hint"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full border border-border bg-card/85 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground shadow-lg backdrop-blur"
              >
                {label}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            ref={btnRef}
            onClick={trigger}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            aria-label={label}
            className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/70 text-foreground backdrop-blur transition-colors hover:border-[var(--neon-cyan)]/70"
            animate={
              hovering
                ? { rotate: [0, -8, 6, -4, 3, 0] }
                : { rotate: 0 }
            }
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Flicker glow behind the icon on hover */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full"
              animate={
                hovering
                  ? {
                      boxShadow: [
                        "0 0 0px oklch(0.9 0.19 90 / 0)",
                        "0 0 22px oklch(0.9 0.19 90 / 0.85)",
                        "0 0 4px oklch(0.9 0.19 90 / 0.15)",
                        "0 0 18px oklch(0.9 0.19 90 / 0.7)",
                        "0 0 2px oklch(0.9 0.19 90 / 0.1)",
                      ],
                    }
                  : { boxShadow: "0 0 0px oklch(0.9 0.19 90 / 0)" }
              }
              transition={{
                duration: 0.9,
                repeat: hovering ? Infinity : 0,
                ease: "easeInOut",
              }}
            />
            {/* Flashlight icon */}
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative"
              animate={
                hovering
                  ? { opacity: [1, 0.55, 1, 0.7, 1] }
                  : { opacity: 1 }
              }
              transition={{
                duration: 0.9,
                repeat: hovering ? Infinity : 0,
              }}
            >
              {/* body */}
              <path d="M9 3h6l-1 4H10L9 3z" />
              <path d="M10 7h4v11a2 2 0 0 1-2 2 2 2 0 0 1-2-2V7z" />
              {/* beam lines shown when on */}
              {light && (
                <>
                  <path d="M15 4.5l3-1.5" />
                  <path d="M16 7h3" />
                  <path d="M15 9.5l3 1.5" />
                </>
              )}
            </motion.svg>
          </motion.button>
        </div>
      </div>

      {/* Full-screen sweep overlay */}
      <AnimatePresence>
        {sweeping && (
          <motion.div
            key="sweep"
            className="pointer-events-none fixed inset-0 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{
                background: `radial-gradient(circle at ${origin.x}px ${origin.y}px, ${sweepColor} 0px, transparent 0px)`,
              }}
              animate={{
                background: [
                  `radial-gradient(circle at ${origin.x}px ${origin.y}px, ${sweepColor} 0px, transparent 40px)`,
                  `radial-gradient(circle at ${origin.x}px ${origin.y}px, ${sweepColor} 1400px, transparent 2200px)`,
                  `radial-gradient(circle at ${origin.x}px ${origin.y}px, ${sweepColor} 2600px, transparent 3400px)`,
                ],
              }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], times: [0, 0.55, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}