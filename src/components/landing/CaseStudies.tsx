import { motion } from "motion/react";
import { TrendingUp, Utensils, Briefcase } from "lucide-react";

const cases = [
  {
    icon: Briefcase,
    industry: "Consultora B2B",
    problem: "Baja conversión de leads entrantes (2.1%) y alto volumen de consultas repetitivas por email que saturaban al equipo comercial.",
    solution: "Landing High-Converting con SEO técnico + Chatbot de WhatsApp IA para calificación automática de leads y agendamiento de reuniones.",
    metrics: [
      { label: "Conversión", value: "+218%" },
      { label: "Leads calificados/mes", value: "45 → 142" },
      { label: "Tiempo de respuesta", value: "< 30 seg" },
    ],
  },
  {
    icon: Utensils,
    industry: "Restaurante Premium",
    problem: "Pérdida de reservas por llamadas no contestadas en horas pico y 35% de no-shows en fines de semana.",
    solution: "Voicebot con voz IA ultra-realista integrado a Google Calendar + confirmaciones automáticas por WhatsApp 24hs antes.",
    metrics: [
      { label: "Reservas/mes", value: "+45" },
      { label: "No-shows", value: "-68%" },
      { label: "Llamadas contestadas", value: "100%" },
    ],
  },
  {
    icon: TrendingUp,
    industry: "Servicios Profesionales",
    problem: "Equipo administrativo sobrecargado con facturación manual, onboarding de clientes y reportes semanales (15hs/semana).",
    solution: "Agente IA Operativo conectado al sistema contable, CRM y herramientas de reporting. Automatización completa de procesos repetitivos.",
    metrics: [
      { label: "Tiempo operativo", value: "-60%" },
      { label: "Errores manuales", value: "-94%" },
      { label: "ROI mensual", value: "340%" },
    ],
  },
];

export function CaseStudies() {
  return (
    <section id="casos" className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 max-w-2xl"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[var(--neon-cyan)]">
          Casos de Éxito
        </p>
        <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          Resultados{" "}
          <span className="text-gradient-neon">reales en industrias reales</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Estos son algunos de los proyectos que transformamos con automatización e IA.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {cases.map((caseStudy, index) => (
          <motion.div
            key={caseStudy.industry}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card/30 p-6 backdrop-blur transition-colors hover:border-[var(--neon-cyan)]/30 hover:bg-card/50"
          >
            {/* Subtle gradient glow */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--neon-cyan)]/8 blur-2xl" />
            </div>

            <div className="relative">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--neon-cyan)]/15 to-[var(--neon-violet)]/15 text-[var(--neon-cyan)]">
                <caseStudy.icon size={24} />
              </div>

              <h3 className="text-lg font-semibold">{caseStudy.industry}</h3>

              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    Problema
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {caseStudy.problem}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-[var(--neon-cyan)]">
                    Solución
                  </p>
                  <p className="mt-1 text-sm text-foreground">
                    {caseStudy.solution}
                  </p>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="mb-3 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    Resultados
                  </p>
                  <div className="space-y-2">
                    {caseStudy.metrics.map((metric, i) => (
                      <div key={metric.label} className="flex items-baseline justify-between">
                        <span className="text-xs text-muted-foreground">
                          {metric.label}
                        </span>
                        <span className="text-sm font-semibold text-[var(--neon-cyan)]">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
