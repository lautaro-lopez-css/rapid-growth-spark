import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Slider } from "@/components/ui/slider";
import { AnimatedCounter } from "./AnimatedCounter";

export function Calculator() {
  const [visitors, setVisitors] = useState(5000);
  const [ticket, setTicket] = useState(120);

  const current = useMemo(() => Math.round(visitors * 0.012 * ticket), [visitors, ticket]);
  const optimized = useMemo(() => Math.round(visitors * 0.038 * ticket), [visitors, ticket]);
  const delta = optimized - current;

  return (
    <div className="grid gap-10 rounded-3xl border border-border bg-card/50 p-8 backdrop-blur md:grid-cols-2 md:p-12">
      <div className="space-y-10">
        <div>
          <div className="mb-4 flex items-baseline justify-between">
            <label className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Visitas mensuales
            </label>
            <span className="text-2xl font-semibold tabular-nums text-foreground">
              {visitors.toLocaleString("es-ES")}
            </span>
          </div>
          <Slider
            value={[visitors]}
            onValueChange={(v) => setVisitors(v[0])}
            min={500}
            max={50000}
            step={500}
          />
        </div>
        <div>
          <div className="mb-4 flex items-baseline justify-between">
            <label className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Ticket promedio
            </label>
            <span className="text-2xl font-semibold tabular-nums text-foreground">
              ${ticket}
            </span>
          </div>
          <Slider
            value={[ticket]}
            onValueChange={(v) => setTicket(v[0])}
            min={20}
            max={1000}
            step={10}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Basado en una tasa de conversión promedio del 1.2% vs. 3.8% en sitios optimizados.
        </p>
      </div>

      <div className="flex flex-col justify-center gap-6 rounded-2xl border border-border bg-background/40 p-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Ingresos actuales</p>
          <p className="mt-1 text-3xl font-medium text-muted-foreground line-through decoration-destructive/60">
            ${current.toLocaleString("es-ES")}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--neon-cyan)]">
            Ingresos con landing optimizada
          </p>
          <motion.p
            key={optimized}
            initial={{ opacity: 0.6, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-5xl font-bold tracking-tight text-gradient-neon md:text-6xl"
          >
            ${optimized.toLocaleString("es-ES")}
          </motion.p>
        </div>
        <div className="rounded-xl border border-[var(--neon-cyan)]/30 bg-[var(--neon-cyan)]/5 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Ganancia adicional / mes</p>
          <p className="mt-1 text-2xl font-semibold text-[var(--neon-cyan)]">
            +${delta.toLocaleString("es-ES")}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          Proyección anual:{" "}
          <span className="font-semibold text-foreground">
            <AnimatedCounter prefix="$" to={delta * 12} duration={1} />
          </span>
        </p>
      </div>
    </div>
  );
}