import { useState } from "react";
import { motion } from "motion/react";

interface Props {
  before: string;
  after: string;
  label: string;
}

export function BeforeAfter({ before, after, label }: Props) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
        <button
          onClick={() => setFlipped((f) => !f)}
          className="text-xs uppercase tracking-wider text-[var(--neon-cyan)] transition-opacity hover:opacity-70"
        >
          {flipped ? "← Ver antes" : "Ver después →"}
        </button>
      </div>

      <div
        onClick={() => setFlipped((f) => !f)}
        className="relative aspect-[16/10] w-full cursor-pointer select-none [perspective:1600px]"
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-full w-full [transform-style:preserve-3d]"
        >
          {/* Front — Antes */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl border border-border bg-card [backface-visibility:hidden]">
            <img src={before} alt="Antes" className="absolute inset-0 h-full w-full object-cover opacity-90" draggable={false} />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
            <span className="absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground backdrop-blur">
              Antes
            </span>
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Toca para girar</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 backdrop-blur transition-colors group-hover:border-[var(--neon-cyan)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" />
                </svg>
              </div>
            </div>
          </div>

          {/* Back — Después */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl border border-[var(--neon-cyan)]/40 bg-card [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-[0_0_60px_-20px_var(--neon-cyan)]">
            <img src={after} alt="Después" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            <span className="absolute left-4 top-4 rounded-full bg-[var(--neon-cyan)]/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--neon-cyan)] backdrop-blur">
              Después
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}