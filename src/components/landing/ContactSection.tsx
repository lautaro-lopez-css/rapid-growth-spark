import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MessageSquare, Send, Check, Calendar, Clock, Shield, Zap } from "lucide-react";

const WHATSAPP_NUMBER = "5493515129104";
const CAL_URL = "https://cal.com/lautaro-lopez-76gkx0/20min";

const SERVICES_OPTIONS = [
  "Landing High-Converting",
  "Chatbot de WhatsApp IA",
  "Voicebot para Reservas",
  "Agente IA Operativo",
  "Sistema Completo (los 4 servicios)",
];

type TabType = "agendar" | "formulario" | "whatsapp";

export function ContactSection() {
  const [activeTab, setActiveTab] = useState<TabType>("agendar");
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Nueva consulta de ${form.name || "Landing"}`);
    const body = encodeURIComponent(
      `Nombre: ${form.name}\nEmail: ${form.email}\nEmpresa: ${form.company}\nServicio de interés: ${form.service}\n\nMensaje:\n${form.message}`,
    );
    window.location.href = `mailto:hola@vertex.studio?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hola! Vi su landing y quiero automatizar mi negocio con IA.",
  )}`;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Main content with tabs */}
      <div className="lg:col-span-3">
        {/* Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto rounded-2xl border border-border bg-card/30 p-1.5 backdrop-blur">
          {[
            { id: "agendar", label: "Agendar", icon: Calendar },
            { id: "formulario", label: "Formulario", icon: Mail },
            { id: "whatsapp", label: "WhatsApp", icon: MessageSquare },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex flex-1 min-w-[100px] items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-violet)] text-background shadow-[0_0_20px_-4px_var(--neon-cyan)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === "agendar" && (
            <motion.div
              key="agendar"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden rounded-3xl border border-border bg-card/30 backdrop-blur"
            >
              <iframe
                src={CAL_URL}
                title="Agendar reunión"
                className="h-[600px] w-full"
                style={{ border: "none" }}
              />
            </motion.div>
          )}

          {activeTab === "formulario" && (
            <motion.form
              key="formulario"
              onSubmit={onSubmit}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              className="space-y-5 rounded-3xl border border-border bg-card/50 p-8 backdrop-blur md:p-10"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--neon-cyan)]/15 text-[var(--neon-cyan)]">
                  <Mail size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Contanos de tu proyecto</h3>
                  <p className="text-xs text-muted-foreground">Te respondemos en menos de 24hs por email.</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nombre" value={form.name} onChange={update("name")} required />
                <Field label="Email" type="email" value={form.email} onChange={update("email")} required />
              </div>
              <Field label="Empresa / Sitio actual" value={form.company} onChange={update("company")} />
              
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Servicio de interés
                </label>
                <select
                  value={form.service}
                  onChange={update("service")}
                  required
                  className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-[var(--neon-cyan)]/60"
                >
                  <option value="">Seleccioná un servicio...</option>
                  {SERVICES_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Mensaje
                </label>
                <textarea
                  value={form.message}
                  onChange={update("message")}
                  required
                  rows={4}
                  placeholder="Contanos brevemente sobre tu proyecto..."
                  className="w-full resize-none rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-[var(--neon-cyan)]/60"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-violet)] px-6 py-3.5 text-sm font-semibold text-background shadow-[0_0_30px_-8px_var(--neon-cyan)] transition-shadow hover:shadow-[0_0_40px_-4px_var(--neon-cyan)]"
              >
                {sent ? (
                  <>
                    <Check size={16} /> ¡Correo abierto! Enviá el mensaje
                  </>
                ) : (
                  <>
                    <Send size={16} /> Enviar por email
                  </>
                )}
              </motion.button>
            </motion.form>
          )}

          {activeTab === "whatsapp" && (
            <motion.div
              key="whatsapp"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center justify-center gap-8 rounded-3xl border border-[#25D366]/30 bg-gradient-to-br from-[#25D366]/10 to-transparent p-12 text-center backdrop-blur"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#25D366]/20 text-[#25D366]">
                <MessageSquare size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Hablemos por WhatsApp</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Respuesta en menos de 2 horas. Coordinemos una llamada rápida hoy mismo.
                </p>
              </div>
              <motion.a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 py-4 text-base font-semibold text-white shadow-[0_0_30px_-8px_#25D366] transition-shadow hover:shadow-[0_0_40px_-4px_#25D366]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
                </svg>
                Chatear ahora
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sidebar */}
      <div className="space-y-4 lg:col-span-2">
        <SidebarCard
          icon={Clock}
          title="Respuesta en &lt;2h"
          description="Durante horario hábil respondemos en menos de 2 horas. Fuera de horario, a primera hora del día siguiente."
        />
        <SidebarCard
          icon={Zap}
          title="Diagnóstico gratuito"
          description="Analizamos tu situación actual sin costo y te proponemos la mejor solución para tus objetivos."
        />
        <SidebarCard
          icon={Calendar}
          title="Implementación 48hs"
          description="Para la Landing High-Converting, tenés tu prototipo funcional en menos de 48 horas."
        />
        <SidebarCard
          icon={Shield}
          title="Datos protegidos"
          description="Encriptación end-to-end, GDPR/CCPA compliant. Tus datos nunca se comparten con terceros."
        />
      </div>
    </div>
  );
}

function SidebarCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-4 rounded-2xl border border-border bg-card/30 p-5 backdrop-blur"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--neon-cyan)]/15 text-[var(--neon-cyan)]">
        <Icon size={18} />
      </div>
      <div>
        <h4 className="text-sm font-semibold">{title}</h4>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </label>
      <input
        {...props}
        className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-[var(--neon-cyan)]/60"
      />
    </div>
  );
}