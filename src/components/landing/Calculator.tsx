import { useState, useMemo, useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "motion/react";
import { Slider } from "@/components/ui/slider";
import { AnimatedCounter } from "./AnimatedCounter";

function SpringNumber({
  value,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const mv = useMotionValue(value);
  const spring = useSpring(mv, { stiffness: 90, damping: 20, mass: 0.6 });
  const text = useTransform(spring, (v) => `${prefix}${Math.round(v).toLocaleString("es-ES")}${suffix}`);
  useEffect(() => {
    mv.set(value);
  }, [value, mv]);
  return <motion.span className={"tabular-nums " + className}>{text}</motion.span>;
}

const INDUSTRIES = [
  { id: "servicios", label: "Servicios / Consultoría", ticket: 850, currentCR: 1.4, optimizedCR: 3.6 },
  { id: "ecommerce", label: "E-commerce", ticket: 95, currentCR: 1.6, optimizedCR: 3.9 },
  { id: "saas", label: "SaaS B2B", ticket: 240, currentCR: 1.1, optimizedCR: 3.2 },
  { id: "local", label: "Negocio local", ticket: 180, currentCR: 2.0, optimizedCR: 4.5 },
] as const;

export function Calculator() {
  const [industryId, setIndustryId] = useState<(typeof INDUSTRIES)[number]["id"]>("servicios");
  const industry = INDUSTRIES.find((i) => i.id === industryId)!;
  const [visitors, setVisitors] = useState(5000);
  const [ticket, setTicket] = useState<number>(industry.ticket);

  const current = useMemo(
    () => Math.round(visitors * (industry.currentCR / 100) * ticket),
    [visitors, ticket, industry],
  );
  const optimized = useMemo(
    () => Math.round(visitors * (industry.optimizedCR / 100) * ticket),
    [visitors, ticket, industry],
  );
  const delta = optimized - current;
  const extraLeads = Math.round(visitors * ((industry.optimizedCR - industry.currentCR) / 100));
  const roi = current > 0 ? (optimized / current).toFixed(1) : "0";

  const selectIndustry = (id: (typeof INDUSTRIES)[number]["id"]) => {
    setIndustryId(id);
    const next = INDUSTRIES.find((i) => i.id === id)!;
    setTicket(next.ticket);
  };

  return (
    <div className="grid gap-10 rounded-3xl border border-border bg-card/50 p-8 backdrop-blur md:grid-cols-2 md:p-12">
      <div className="space-y-8">
        <div>
          <label className="mb-3 block text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Tu industria
          </label>
          <div className="grid grid-cols-2 gap-2">
            {INDUSTRIES.map((i) => {
              const active = i.id === industryId;
              return (
                <motion.button
                  key={i.id}
                  onClick={() => selectIndustry(i.id)}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className={
                    "relative overflow-hidden rounded-xl border px-3 py-3 text-left text-xs font-medium transition-colors " +
                    (active
                      ? "border-[var(--neon-cyan)] bg-[var(--neon-cyan)]/10 text-foreground shadow-[0_0_20px_-8px_var(--neon-cyan)]"
                      : "border-border bg-background/40 text-muted-foreground hover:border-[var(--neon-cyan)]/50 hover:text-foreground")
                  }
                >
                  {active && (
                    <motion.span
                      layoutId="industry-active"
                      className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-[var(--neon-cyan)]/20 to-[var(--neon-violet)]/20"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  {i.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-baseline justify-between">
            <label className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Visitas mensuales
            </label>
            <SpringNumber value={visitors} className="text-2xl font-semibold text-foreground" />
          </div>
          <Slider value={[visitors]} onValueChange={(v) => setVisitors(v[0])} min={500} max={50000} step={500} />
        </div>

        <div>
          <div className="mb-4 flex items-baseline justify-between">
            <div>
              <label className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                Ticket promedio
              </label>
              <p className="mt-1 text-[11px] text-muted-foreground/70">
                Valor promedio de una venta o cliente en tu industria
              </p>
            </div>
            <SpringNumber value={ticket} prefix="$" className="text-2xl font-semibold text-foreground" />
          </div>
          <Slider value={[ticket]} onValueChange={(v) => setTicket(v[0])} min={20} max={3000} step={10} />
        </div>

        <div className="space-y-2 rounded-xl border border-border bg-background/40 p-4 text-xs text-muted-foreground">
          <p className="flex items-center gap-2 font-semibold uppercase tracking-[0.15em] text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon-cyan)]" />
            Cómo se calcula
          </p>
          <p>
            Conversión actual del sector <span className="text-foreground">{industry.currentCR}%</span> vs.{" "}
            <span className="text-[var(--neon-cyan)]">{industry.optimizedCR}%</span> en landings optimizadas por
            nuestro equipo.
          </p>
          <p className="text-muted-foreground/70">
            Fuente: benchmarks WordStream, Unbounce Conversion Report 2024 y datos internos de +80 rediseños.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-5 rounded-2xl border border-border bg-background/40 p-8">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Ingresos actuales</p>
            <SpringNumber
              value={current}
              prefix="$"
              className="mt-1 block text-2xl font-medium text-muted-foreground line-through decoration-destructive/60"
            />
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Multiplicador</p>
            <p className="mt-1 text-2xl font-semibold text-[var(--neon-cyan)]">{roi}×</p>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--neon-cyan)]">
            Ingresos con landing optimizada
          </p>
          <SpringNumber
            value={optimized}
            prefix="$"
            className="mt-1 block text-5xl font-bold tracking-tight text-gradient-neon md:text-6xl"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-[var(--neon-cyan)]/30 bg-[var(--neon-cyan)]/5 p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Ganancia extra / mes</p>
            <SpringNumber
              value={delta}
              prefix="+$"
              className="mt-1 block text-xl font-semibold text-[var(--neon-cyan)]"
            />
          </div>
          <div className="rounded-xl border border-border bg-background/40 p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Clientes extra / mes</p>
            <SpringNumber
              value={extraLeads}
              prefix="+"
              className="mt-1 block text-xl font-semibold text-foreground"
            />
          </div>
        </div>

        <div className="border-t border-border pt-4 text-xs text-muted-foreground">
          Proyección anual adicional:{" "}
          <span className="font-semibold text-foreground">
            <AnimatedCounter prefix="$" to={delta * 12} duration={1} />
          </span>
        </div>
      </div>
    </div>
  );
}