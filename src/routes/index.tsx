import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useRef, type MouseEvent } from "react";
import { MagneticButton } from "@/components/landing/MagneticButton";
import { AnimatedCounter } from "@/components/landing/AnimatedCounter";
import { BeforeAfter } from "@/components/landing/BeforeAfter";
import { Calculator } from "@/components/landing/Calculator";
import { Flashlight } from "@/components/landing/Flashlight";
import { MatrixRain } from "@/components/landing/MatrixRain";
import { AiChat } from "@/components/landing/AiChat";
import { ContactSection } from "@/components/landing/ContactSection";
import { ParticleSphere } from "@/components/landing/ParticleSphere";
import before1 from "@/assets/before-1.jpg";
import after1 from "@/assets/after-1.jpg";
import before2 from "@/assets/before-2.jpg";
import after2 from "@/assets/after-2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Landings que convierten en 48 horas | Vertex Studio" },
      {
        name: "description",
        content:
          "Transformamos webs obsoletas en máquinas de venta. Estrategia CRO, velocidad extrema y diseño premium entregado en 48 horas.",
      },
      { property: "og:title", content: "Landings que convierten en 48 horas" },
      {
        property: "og:description",
        content: "Rediseño web premium orientado a conversión, entregado en 48 horas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const revealBlur = {
  initial: { opacity: 0, y: 40, filter: "blur(14px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

const revealClip = {
  initial: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  whileInView: { opacity: 1, clipPath: "inset(0 0 0% 0)" },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
};

function MetricCard({
  value,
  suffix,
  label,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [12, -12]), { stiffness: 120, damping: 14, mass: 0.8 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-12, 12]), { stiffness: 120, damping: 14, mass: 0.8 });
  const lift = useSpring(useTransform(mx, (v) => Math.abs(v) * 4), { stiffness: 120, damping: 14, mass: 0.8 });
  const sx = useMotionValue(50);
  const sy = useMotionValue(50);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    mx.set(x * 2 - 1);
    my.set(y * 2 - 1);
    sx.set(x * 100);
    sy.set(y * 100);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 60, damping: 14, mass: 1, delay: index * 0.12 }}
      style={{ rotateX: rx, rotateY: ry, z: lift, transformStyle: "preserve-3d" }}
      className="group relative overflow-hidden bg-background p-10 md:p-12"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [sx, sy],
            ([x, y]) =>
              `radial-gradient(400px circle at ${x}% ${y}%, oklch(0.85 0.19 195 / 0.18), transparent 60%)`,
          ),
        }}
      />
      <div className="relative text-5xl font-bold tracking-tight text-gradient-neon md:text-6xl">
        +<AnimatedCounter to={value} suffix={suffix} />
      </div>
      <p className="relative mt-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
    </motion.div>
  );
}

function Index() {
  const scrollTo = (id: string) => () => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const { scrollY } = useScroll();
  const bgY1 = useTransform(scrollY, [0, 2000], [0, -300]);
  const bgY2 = useTransform(scrollY, [0, 2000], [0, 200]);
  const gridY = useTransform(scrollY, [0, 2000], [0, -150]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <MatrixRain />
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <motion.div
          style={{ y: gridY }}
          className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
        />
        <motion.div
          style={{ y: bgY1 }}
          className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[var(--neon-cyan)]/10 blur-[140px]"
        />
        <motion.div
          style={{ y: bgY2 }}
          className="absolute top-[40%] right-0 h-[500px] w-[500px] rounded-full bg-[var(--neon-violet)]/15 blur-[140px]"
        />
      </div>

      {/* Nav */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[var(--neon-cyan)] shadow-[0_0_12px_var(--neon-cyan)]" />
          <span className="text-sm font-semibold tracking-tight">Vertex</span>
          <span className="text-sm text-muted-foreground">/ studio</span>
        </div>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <a href="#metricas" className="transition-colors hover:text-foreground">Resultados</a>
          <a href="#trabajos" className="transition-colors hover:text-foreground">Trabajos</a>
          <a href="#calculadora" className="transition-colors hover:text-foreground">Calculadora</a>
          <a href="#contacto" className="transition-colors hover:text-foreground">Contacto</a>
        </nav>
        <div className="flex items-center gap-3">
          <MagneticButton variant="ghost" onClick={scrollTo("contacto")} className="px-5 py-2 text-sm">
            Empezar
          </MagneticButton>
        </div>
      </header>

      {/* HERO — asymmetric */}
      <section className="relative mx-auto max-w-7xl px-6 pt-20 pb-48 md:pt-32 md:pb-64">
        {/* 3D particle sphere background — interactive, sits behind text */}
        <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
          <div className="pointer-events-auto absolute inset-0">
            <ParticleSphere />
          </div>
          {/* Legibility scrim: darker on the left where the headline sits */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,hsl(var(--background)/0.85)_0%,hsl(var(--background)/0.55)_35%,transparent_70%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
        </div>
        <div className="relative z-10 grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-6">
          {/* Left: text block, pushed against the left rail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 lg:col-span-7 lg:pr-6"
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--neon-cyan)]" />
              Agencia de conversión · Cupos limitados
            </div>
            <h1 className="text-balance text-left text-5xl font-bold leading-[0.98] tracking-tight md:text-7xl lg:text-[6rem]">
              Transformamos tu presencia digital en{" "}
              <span className="text-gradient-neon">48 horas</span>
            </h1>
            <p className="mt-8 max-w-xl text-left text-lg text-muted-foreground md:text-xl">
              Estrategia de conversión, velocidad extrema y tecnología de vanguardia.
              Convertimos webs obsoletas en máquinas de venta.
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <MagneticButton onClick={scrollTo("cta-final")}>
                Quiero mi Landing en 48hs
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </MagneticButton>
              <MagneticButton variant="ghost" onClick={scrollTo("trabajos")}>
                Ver trabajos
              </MagneticButton>
            </div>

            {/* Vertical index label — asymmetric detail */}
            <div className="mt-16 hidden items-center gap-4 lg:flex">
              <span className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                001 / Hero
              </span>
              <span className="h-px w-24 bg-border" />
              <span className="text-xs uppercase tracking-[0.35em] text-[var(--neon-cyan)]">
                Scroll ↓
              </span>
            </div>
          </motion.div>

          {/* Right: overlapping visual stack that breaks the margin */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative lg:col-span-5 lg:-ml-24 lg:mr-[-8vw] xl:mr-[-12vw]"
          >
            {/* Ambient glow behind visual */}
            <div className="pointer-events-none absolute -inset-10 rounded-[3rem] bg-[var(--neon-cyan)]/10 blur-3xl" />

            {/* Main mock browser card, tilted */}
            <motion.div
              whileHover={{ rotate: -2, y: -6 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              style={{ transform: "rotate(3deg)" }}
              className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-center gap-1.5 border-b border-border bg-background/60 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--neon-violet)]/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--neon-cyan)]/60" />
                <span className="ml-3 truncate text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  vertex.studio / preview
                </span>
              </div>
              <img
                src={after1}
                alt="Vista previa de landing rediseñada"
                loading="eager"
                className="block w-full"
              />
            </motion.div>

            {/* Floating metric chip — overlaps the mock */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              style={{ transform: "rotate(-4deg)" }}
              className="absolute -left-10 top-10 z-20 hidden rounded-2xl border border-border bg-card/95 px-5 py-4 shadow-2xl backdrop-blur md:block"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Conversión
              </p>
              <p className="mt-1 text-3xl font-bold text-gradient-neon">+218%</p>
              <div className="mt-2 flex h-1 w-24 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[82%] bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-violet)]" />
              </div>
            </motion.div>

            {/* Floating code chip — overlaps bottom */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              style={{ transform: "rotate(2deg)" }}
              className="absolute -bottom-10 -right-6 z-20 hidden rounded-xl border border-border bg-background/95 px-4 py-3 font-mono text-[11px] leading-relaxed shadow-2xl backdrop-blur md:block"
            >
              <span className="text-muted-foreground">// Lighthouse</span>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[var(--neon-cyan)]">performance</span>
                <span className="text-foreground">=</span>
                <span className="text-[var(--neon-violet)]">100</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* METRICS */}
      <section id="metricas" className="mx-auto max-w-7xl px-6 pb-48 md:pb-56">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3 [perspective:1200px]">
          {[
            { value: 200, suffix: "%", label: "Aumento en conversión promedio" },
            { value: 48, suffix: "hs", label: "Tiempo de entrega garantizado" },
            { value: 100, suffix: "%", label: "Optimizado para Core Web Vitals" },
          ].map((m, i) => (
            <MetricCard key={m.label} index={i} value={m.value} suffix={m.suffix} label={m.label} />
          ))}
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section id="trabajos" className="mx-auto max-w-7xl px-6 pb-48 md:pb-56">
        <motion.div {...revealClip} className="mb-14 max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[var(--neon-cyan)]">
            Antes / Después
          </p>
          <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            De web aburrida a{" "}
            <span className="text-gradient-neon">activo digital</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Cada rediseño es una operación quirúrgica: retiramos lo obsoleto, inyectamos estrategia
            y devolvemos un producto que vende.
          </p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-2">
          <BeforeAfter before={before1} after={after1} label="Consultora B2B" />
          <BeforeAfter before={before2} after={after2} label="Restaurante premium" />
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculadora" className="mx-auto max-w-7xl px-6 pb-48 md:pb-56">
        <motion.div {...revealClip} className="mb-14 max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[var(--neon-cyan)]">
            Impacto real
          </p>
          <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Calcula cuánto estás{" "}
            <span className="text-gradient-neon">dejando sobre la mesa</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Mueve los sliders y observa el ingreso que podrías capturar con una landing optimizada.
          </p>
        </motion.div>
        <motion.div {...revealBlur}>
          <Calculator />
        </motion.div>
      </section>

      {/* FINAL CTA */}
      <section id="cta-final" className="relative mx-auto max-w-7xl px-6 pb-48 md:pb-56">
        <motion.div
          {...revealBlur}
          className="relative overflow-hidden rounded-[2rem] border border-border bg-card px-8 py-24 text-center md:px-16 md:py-32"
        >
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
          <div className="pointer-events-none absolute -top-32 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[var(--neon-cyan)]/20 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-[var(--neon-violet)]/25 blur-[120px]" />

          <div className="relative">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[var(--neon-cyan)]">
              Tu próximo lanzamiento
            </p>
            <h2 className="mx-auto max-w-3xl text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Tu competencia ya rediseñó.{" "}
              <span className="text-gradient-neon">Ahora te toca a ti.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              48 horas. Un equipo. Cero excusas. Empieza hoy y estrena tu landing este fin de
              semana.
            </p>
            <div className="mt-12 flex justify-center">
              <MagneticButton onClick={scrollTo("contacto")} className="px-10 py-5 text-lg">
                Quiero mi Landing en 48hs
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </MagneticButton>
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Reunión de kickoff en menos de 24 horas · Garantía de entrega
            </p>
          </div>
        </motion.div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="mx-auto max-w-7xl px-6 pb-48 md:pb-56">
        <motion.div {...revealClip} className="mb-14 max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[var(--neon-cyan)]">
            Hablemos
          </p>
          <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Dos formas de{" "}
            <span className="text-gradient-neon">empezar hoy</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Contanos qué necesitás por email o pasá directo al WhatsApp para coordinar una llamada rápida.
          </p>
        </motion.div>
        <ContactSection />
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-border px-6 py-10 text-sm text-muted-foreground md:flex-row">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[var(--neon-cyan)] shadow-[0_0_10px_var(--neon-cyan)]" />
          <span>Vertex Studio · Landings que convierten</span>
        </div>
        <span>© {new Date().getFullYear()} · Hecho con obsesión por la conversión</span>
      </footer>

      <AiChat />
      <Flashlight />
    </main>
  );
}
