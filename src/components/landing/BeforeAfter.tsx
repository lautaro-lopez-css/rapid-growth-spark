import { useState, useRef, type PointerEvent } from "react";
import { motion } from "motion/react";

interface Props {
  before: string;
  after: string;
  label: string;
}

export function BeforeAfter({ before, after, label }: Props) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    update(e.clientX);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) update(e.clientX);
  };
  const onUp = () => (dragging.current = false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
        <span className="text-xs text-muted-foreground">Arrastra para comparar →</span>
      </div>
      <div
        ref={ref}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-2xl border border-border bg-card touch-none"
      >
        <img src={after} alt="Después" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          <img
            src={before}
            alt="Antes"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ width: `${(100 / pos) * 100}%`, maxWidth: "none" }}
            draggable={false}
          />
        </div>
        <div
          className="absolute inset-y-0 w-px bg-[var(--neon-cyan)]"
          style={{ left: `${pos}%`, boxShadow: "0 0 20px var(--neon-cyan)" }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--neon-cyan)] text-primary-foreground shadow-[0_0_30px_var(--neon-cyan)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />
            </svg>
          </div>
        </div>
        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground backdrop-blur">
          Antes
        </span>
        <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-[var(--neon-cyan)]/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--neon-cyan)] backdrop-blur">
          Después
        </span>
      </div>
    </motion.div>
  );
}