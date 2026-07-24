import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
}

export function MagneticButton({ children, className, onClick, variant = "primary" }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.25, y: y * 0.35 });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const base =
    "relative inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold tracking-tight transition-colors";
  const styles =
    variant === "primary"
      ? "bg-[var(--neon-cyan)] text-primary-foreground glow-cyan hover:bg-[var(--neon-cyan)]/90"
      : "border border-border bg-transparent text-foreground hover:border-[var(--neon-cyan)]";

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.4 }}
      className={cn(base, styles, className)}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}