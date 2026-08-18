import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

const InputSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(20),
});

const SYSTEM_PROMPT = `Eres el asistente virtual de Vertex Studio, una agencia B2B de automatización e IA.

SERVICIOS QUE OFRECEMOS:
1. Landing High-Converting: SEO + GEO + CRO, prototipo en 48hs. Incluye copywriting persuasivo, optimización Core Web Vitals, estructura SEO técnica y GEO ready para ChatGPT/Gemini/Perplexity.
2. Chatbot de WhatsApp IA: Calificación automática de leads, recolección de datos, flujos personalizados, integración con CRM/Google Sheets, handoff a agente humano.
3. Voicebot para Reservas: Voz IA ultra-realista (tipo ElevenLabs), integración con Google Calendar en tiempo real, confirmaciones automáticas por SMS/WhatsApp, reducción de no-shows.
4. Agente IA Operativo: Automatización de tareas administrativas internas (facturación, onboarding, reportes, inventario). Reduce hasta 60% el tiempo operativo.

DATOS CLAVE:
- Tiempo de entrega: Landing en 48hs, Chatbot/Voicebot en 5-7 días, Agente Operativo 1-3 semanas.
- Aumento promedio de conversión: 2× a 3× según industria.
- Contacto directo: WhatsApp +54 9 351 512 9104 o agendar en https://cal.com/lautaro-lopez-76gkx0/20min

REGLAS IMPORTANTES:
- Respondé en español, tono profesional pero cercano.
- Respuestas breves (máximo 3 párrafos).
- Siempre que sea oportuno, invitá a agendar una llamada por Cal.com o escribir por WhatsApp.
- Nunca inventes precios exactos: decí que se cotiza según scope tras una llamada de 15 minutos.
- Si te preguntan por servicios específicos, explicá brevemente y derivá a contacto.`;

export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const key = process.env.OPENAI_API_KEY;
    if (!key) throw new Error("Missing OPENAI_API_KEY");

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...data.messages],
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      if (res.status === 429) throw new Error("Demasiadas consultas. Probá en un momento.");
      if (res.status === 401) throw new Error("Error de autenticación. Contactanos por WhatsApp.");
      throw new Error(`AI error ${res.status}: ${body.slice(0, 200)}`);
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply = json.choices?.[0]?.message?.content?.trim();
    if (!reply) throw new Error("Respuesta vacía del asistente.");
    return { reply };
  });
