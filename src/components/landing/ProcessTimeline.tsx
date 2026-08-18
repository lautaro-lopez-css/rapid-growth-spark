import { motion } from "motion/react";
import { Search, Settings, Link2, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Diagnóstico",
    description: "Analizamos tu situación actual: funnel de ventas, procesos manuales, puntos de fuga de leads y oportunidades de automatización.",
  },
  {
    icon: Settings,
    number: "02",
    title: "Configuración",
    description: "Diseñamos la solución a medida: definimos flujos, integramos APIs, configuramos prompts de IA y establecemos KPIs de éxito.",
  },
  {
    icon: Link2,
    number: "03",
    title: "Integración",
    description: "Conectamos todo con tus herramientas actuales: CRM, Google Calendar, WhatsApp Business, hojas de cálculo y más.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Go Live 48hs",
    description: "Lanzamiento rápido en menos de 48 horas. Monitoreo continuo, ajustes en tiempo real y capacitación de tu equipo.",
  },
];

export function ProcessTimeline() {
  return (
    <section id="proceso" className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 max-w-2xl"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[var(--neon-cyan)]">
          Nuestro Proceso
        </p>
        <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          De cero a operativo{" "}
          <span className="text-gradient-neon">en 48 horas</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Un proceso probado que garantiza resultados rápidos sin sacrificar calidad.
        </p>
      </motion.div>

      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--neon-cyan)]/50 via-[var(--neon-violet)]/50 to-transparent md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-12 md:space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-start gap-6 md:grid md:grid-cols-2"
            >
              {/* Number badge on the line */}
              <div className="absolute left-8 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-violet)] shadow-[0_0_30px_-8px_var(--neon-cyan)] md:left-1/2">
                <span className="text-sm font-bold">{step.number}</span>
              </div>

              {/* Content - alternates sides on desktop */}
              <div
                className={`ml-20 flex-1 ${index % 2 === 1 ? "md:col-start-2" : ""}`}
              >
                <div className="group rounded-2xl border border-border bg-card/30 p-6 backdrop-blur transition-colors hover:border-[var(--neon-cyan)]/30 hover:bg-card/50">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--neon-cyan)]/15 text-[var(--neon-cyan)]">
                      <step.icon size={20} />
                    </div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Empty space for grid layout */}
              {index % 2 === 0 && <div className="hidden md:block md:col-start-2" />}
              {index % 2 === 1 && <div className="hidden md:block md:col-start-1" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
