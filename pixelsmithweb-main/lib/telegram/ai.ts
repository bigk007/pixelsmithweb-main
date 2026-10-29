import Anthropic from "@anthropic-ai/sdk"
import { faqs, knowledgeText, CONTACT_EMAIL } from "./knowledge"

const MODEL = process.env.TELEGRAM_BOT_MODEL || "claude-opus-5-5"
const HANDOFF_MARKER = "[HANDOFF]"

const SYSTEM_PROMPT = `You are the customer support assistant for PixelSmith, a small web design and digital marketing studio, chatting with customers on Telegram.

Answer only from the business information below. If the answer isn't there (custom pricing, availability on specific dates, status of an existing project, refunds, anything you're unsure of), say a team member will follow up and end your reply with ${HANDOFF_MARKER} on its own line. Also add ${HANDOFF_MARKER} when the customer asks for a human, is upset, or is ready to start a project.

Style: friendly, concise (usually 1-4 short sentences), plain text with no markdown formatting since Telegram shows it literally. Encourage interested customers to tap /quote or email ${CONTACT_EMAIL}. Never invent prices, discounts, deadlines or promises beyond what is written below.

<business_info>
${knowledgeText()}
</business_info>`

export interface AiReply {
  text: string
  handoff: boolean
}

export function aiEnabled() {
  return Boolean(process.env.ANTHROPIC_API_KEY)
}

export async function aiReply(history: Anthropic.MessageParam[], userText: string): Promise<AiReply> {
  const client = new Anthropic({ timeout: 45_000, maxRetries: 1 })

  const response = await client.beta.messages.create({
    model: MODEL,
    max_tokens: 2000,
    output_config: { effort: "low" },
    // If the model declines for policy reasons, retry on the server-defined fallback model
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    cache_control: { type: "ephemeral" },
    system: SYSTEM_PROMPT,
    messages: [...history, { role: "user", content: userText }],
  })

  if (response.stop_reason === "refusal") {
    return { text: "Sorry, I can't help with that here. I've asked a team member to take a look.", handoff: true }
  }

  const raw = response.content
    .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text")
    .map((b) => b.text)
    .join("")
    .trim()

  return {
    text: raw.replace(HANDOFF_MARKER, "").trim() || "Thanks! A team member will get back to you shortly.",
    handoff: raw.includes(HANDOFF_MARKER),
  }
}

// Used when no ANTHROPIC_API_KEY is configured: match the question to an FAQ entry.
export function keywordReply(userText: string): AiReply {
  const text = userText.toLowerCase()
  let best: (typeof faqs)[number] | undefined
  let bestScore = 0
  for (const faq of faqs) {
    const score = faq.keywords.filter((k) => text.includes(k)).length
    if (score > bestScore) {
      best = faq
      bestScore = score
    }
  }
  if (best) return { text: best.answer, handoff: false }
  return {
    text: "Thanks for your message! I've passed it to the PixelSmith team and someone will reply here soon. Meanwhile, tap /menu to browse services, pricing and FAQs.",
    handoff: true,
  }
}
