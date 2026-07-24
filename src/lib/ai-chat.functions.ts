import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

const InputSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(20),
});

const SYSTEM_PROMPT = `Eres el asistente virtual de Vertex Studio, una agencia que transforma webs obsoletas en máquinas de venta en 48 horas.

Datos clave que puedes usar para responder:
- Servicio: rediseño de landings orientadas a conversión (CRO), copywriting, diseño premium dark-mode, optimización de Core Web Vitals.
- Tiempo de entrega: 48 horas garantizadas para la primera versión.
- Aumento promedio de conversión que logramos: 2× a 3× (según industria).
- Industrias: Servicios/Consultoría, E-commerce, SaaS B2B, Negocios locales.
- Metodología: kickoff en menos de 24h, diseño en Figma, desarrollo en React + Tailwind, tests A/B post-lanzamiento.
- Diferencial: benchmarks reales (WordStream, Unbounce) + más de 80 rediseños entregados.
- Contacto: formulario en la sección "Hablemos" o WhatsApp directo.

Reglas: responde en español, tono profesional pero cercano, respuestas breves (máx 3 párrafos), invita siempre a agendar o completar el formulario cuando sea oportuno. Nunca inventes precios exactos: di que se cotiza según scope tras una llamada de 15 minutos.`;

export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "google/gemini-3.6-flash",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...data.messages],
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      if (res.status === 429) throw new Error("Demasiadas consultas. Probá en un momento.");
      if (res.status === 402) throw new Error("Créditos de IA agotados. Contactanos por WhatsApp.");
      throw new Error(`AI error ${res.status}: ${body.slice(0, 200)}`);
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply = json.choices?.[0]?.message?.content?.trim();
    if (!reply) throw new Error("Respuesta vacía del asistente.");
    return { reply };
  });