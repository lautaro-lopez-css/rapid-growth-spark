import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, MessageSquare, Send, Check } from "lucide-react";

// Configura aquí tu correo destino y tu WhatsApp (formato internacional sin +).
const CONTACT_EMAIL = "hola@vertex.studio";
const WHATSAPP_NUMBER = "5491100000000";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Nueva consulta de ${form.name || "Landing"}`);
    const body = encodeURIComponent(
      `Nombre: ${form.name}\nEmail: ${form.email}\nEmpresa: ${form.company}\n\nMensaje:\n${form.message}`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hola! Vi su landing y quiero rediseñar mi web.",
  )}`;

  return (
    <div className="grid gap-8 md:grid-cols-5">
      {/* Formulario */}
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-5 rounded-3xl border border-border bg-card/50 p-8 backdrop-blur md:col-span-3 md:p-10"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--neon-cyan)]/15 text-[var(--neon-cyan)]">
            <Mail size={18} />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Contame de tu proyecto</h3>
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
            ¿Qué necesitás?
          </label>
          <textarea
            value={form.message}
            onChange={update("message")}
            required
            rows={4}
            placeholder="Ej: rediseño de landing para captar leads B2B…"
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

      {/* WhatsApp CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col justify-between gap-6 rounded-3xl border border-[#25D366]/30 bg-gradient-to-br from-[#25D366]/10 to-transparent p-8 md:col-span-2 md:p-10"
      >
        <div>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366]/20 text-[#25D366]">
            <MessageSquare size={22} />
          </div>
          <h3 className="text-2xl font-bold leading-tight">Preferís algo más rápido?</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Escribinos directo por WhatsApp y coordinamos una llamada de 15 minutos hoy mismo.
          </p>
        </div>

        <motion.a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_-8px_#25D366] transition-shadow hover:shadow-[0_0_40px_-4px_#25D366]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
          </svg>
          Chatear por WhatsApp
        </motion.a>
      </motion.div>
    </div>
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