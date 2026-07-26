import { useEffect, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
}

export function MagneticButton({ children, className, onClick, variant = "primary" }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  // Inertial spring — soft, gravity-like return
  const x = useSpring(mx, { stiffness: 150, damping: 12, mass: 0.6 });
  const y = useSpring(my, { stiffness: 150, damping: 12, mass: 0.6 });
  // Subtle rotation follows the pull for a more organic feel
  const rotate = useTransform([x, y], ([xv, yv]) => (xv as number) * 0.05 + (yv as number) * 0.02);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Attract from a radius larger than the button itself
    const RADIUS = 120;
    const STRENGTH = 0.4;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const reach = Math.max(r.width, r.height) / 2 + RADIUS;
      if (dist < reach) {
        const falloff = 1 - dist / reach;
        mx.set(dx * STRENGTH * falloff);
        my.set(dy * STRENGTH * falloff);
      } else {
        mx.set(0);
        my.set(0);
      }
    };
    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [mx, my]);

  const base =
    "relative inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold tracking-tight transition-colors";
  const styles =
    variant === "primary"
      ? "bg-[var(--neon-cyan)] text-primary-foreground glow-cyan hover:bg-[var(--neon-cyan)]/90"
      : "border border-border bg-transparent text-foreground hover:border-[var(--neon-cyan)]";

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      style={{ x, y, rotate }}
      whileTap={{ scale: 0.94 }}
      className={cn(base, styles, className)}
    >
      <motion.span
        style={{ x: useTransform(x, (v) => v * 0.35), y: useTransform(y, (v) => v * 0.35) }}
        className="relative z-10 flex items-center gap-2"
      >
        {children}
      </motion.span>
    </motion.button>
  );
}