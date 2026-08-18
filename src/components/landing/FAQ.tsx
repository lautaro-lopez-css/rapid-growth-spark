import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "¿Cuáles son los tiempos de entrega?",
    answer: "Para la Landing High-Converting, entregamos un prototipo funcional en 48 horas. Para Chatbot de WhatsApp y Voicebot, el tiempo típico es de 5-7 días hábiles dependiendo de la complejidad de los flujos. El Agente IA Operativo puede variar entre 1-3 semanas según los procesos a automatizar.",
  },
  {
    question: "¿Los servicios son personalizables?",
    answer: "Absolutamente. Cada solución se adapta a tu industria, volumen de operaciones y herramientas existentes. Realizamos un diagnóstico inicial para entender tus necesidades específicas y configurar la automatización accordingly.",
  },
  {
    question: "¿Cómo protegen mis datos y los de mis clientes?",
    answer: "Implementamos medidas de seguridad enterprise: encriptación end-to-end, cumplimiento GDPR/CCPA, almacenamiento seguro en servidores certificados y contratos de confidencialidad. Tus datos nunca se comparten con terceros ni se usan para entrenar modelos públicos.",
  },
  {
    question: "¿Puedo contratar servicios sueltos o el sistema completo?",
    answer: "Podés contratar cada servicio de forma independiente según tus prioridades. También ofrecemos paquetes integrados con descuento: Landing + Chatbot, o el Sistema Completo (los 4 servicios) con implementación escalonada y soporte prioritario.",
  },
  {
    question: "¿Cómo miden los resultados?",
    answer: "Establecemos KPIs claros desde el kickoff: tasa de conversión para landings, leads calificados para chatbots, reservas confirmadas para voicebots, y horas ahorradas para agentes operativos. Entregás reportes semanales el primer mes y mensuales después.",
  },
  {
    question: "¿Qué pasa si necesito cambios después del lanzamiento?",
    answer: "Incluimos 2 semanas de ajustes post-lanzamiento sin costo adicional. Después, ofrecemos planes de mantenimiento mensual con actualizaciones, optimizaciones continuas y soporte técnico. Siempre podés solicitar cambios adicionales bajo demanda.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 max-w-2xl"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[var(--neon-cyan)]">
          FAQ
        </p>
        <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          Preguntas{" "}
          <span className="text-gradient-neon">frecuentes</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Respondemos las dudas más comunes sobre nuestros servicios y proceso de trabajo.
        </p>
      </motion.div>

      <div className="mx-auto max-w-3xl space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={faq.question}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="group flex w-full items-center justify-between rounded-2xl border border-border bg-card/30 px-6 py-5 text-left backdrop-blur transition-colors hover:border-[var(--neon-cyan)]/30 hover:bg-card/50"
            >
              <span className="pr-4 text-sm font-medium">{faq.question}</span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--neon-cyan)]/10 text-[var(--neon-cyan)]"
              >
                <ChevronDown size={18} />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="rounded-b-2xl border-x border-b border-border bg-card/20 px-6 pb-5 pt-2">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
