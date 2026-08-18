import { motion } from "motion/react";
import { Monitor, MessageCircle, Phone, Cpu, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Monitor,
    title: "Landing High-Converting",
    subtitle: "SEO + GEO + CRO · Prototipo en 48hs",
    description: "Diseñamos y desarrollamos landing pages optimizadas para conversión, con estrategia de posicionamiento SEO y GEO (optimización para motores de IA).",
    benefits: [
      "Copywriting persuasivo orientado a ventas",
      "Optimización Core Web Vitals (100/100)",
      "Estructura SEO técnica + schema markup",
      "GEO ready para ChatGPT, Gemini, Perplexity",
      "A/B testing post-lanzamiento incluido",
    ],
  },
  {
    icon: MessageCircle,
    title: "Chatbot de WhatsApp IA",
    subtitle: "Calificación de leads · Recolección de datos",
    description: "Automatizamos tu WhatsApp con IA que califica leads, recoge datos clave y deriva solo los prospectos calificados a tu equipo.",
    benefits: [
      "Respuestas 24/7 sin intervención humana",
      "Cualificación automática de leads",
      "Integración con CRM/Google Sheets",
      "Flujos personalizados por industria",
      "Handoff inteligente a agente humano",
    ],
  },
  {
    icon: Phone,
    title: "Voicebot para Reservas",
    subtitle: "Voz IA tipo ElevenLabs + Google Calendar",
    description: "Asistente de voz con IA ultra-realista que atiende llamadas, consulta disponibilidad en tiempo real y agenda reservas automáticamente.",
    benefits: [
      "Voz natural indistinguible de humana",
      "Integración directa con Google Calendar",
      "Manejo de objeciones básico",
      "Confirmaciones automáticas por SMS/WhatsApp",
      "Reducción de no-shows del 40%",
    ],
  },
  {
    icon: Cpu,
    title: "Agente IA Operativo",
    subtitle: "Tareas administrativas/operativas internas",
    description: "Automatizamos procesos internos repetitivos: facturación, onboarding de clientes, reportes, gestión de inventario y más.",
    benefits: [
      "Reducción de hasta 60% en tiempo operativo",
      "Integración con herramientas existentes",
      "Procesamiento de documentos automático",
      "Reportes y dashboards en tiempo real",
      "Escalable según demanda operativa",
    ],
  },
];

export function ServiceCards() {
  return (
    <section id="servicios" className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 max-w-2xl"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[var(--neon-cyan)]">
          Nuestros Servicios
        </p>
        <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          Automatizá{" "}
          <span className="text-gradient-neon">captación, reservas y operaciones</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Cuatro soluciones diseñadas para escalar tu negocio B2B sin aumentar costos operativos.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service, index) => (
          <motion.a
            key={service.title}
            href="#contacto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card/50 p-8 backdrop-blur transition-colors hover:border-[var(--neon-cyan)]/40"
          >
            {/* Glow effect on hover */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[var(--neon-cyan)]/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[var(--neon-violet)]/10 blur-3xl" />
            </div>

            <div className="relative">
              <div className="mb-6 flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--neon-cyan)]/15 to-[var(--neon-violet)]/15 text-[var(--neon-cyan)]">
                  <service.icon size={28} />
                </div>
                <ArrowRight
                  size={20}
                  className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--neon-cyan)]"
                />
              </div>

              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-1 text-sm uppercase tracking-[0.15em] text-[var(--neon-cyan)]">
                {service.subtitle}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>

              <ul className="mt-6 space-y-2.5">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--neon-cyan)] shadow-[0_0_8px_var(--neon-cyan)]" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center gap-2 text-sm font-medium text-[var(--neon-cyan)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Consultar por este servicio
                <ArrowRight size={14} />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
