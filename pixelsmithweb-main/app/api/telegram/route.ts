import { type NextRequest, NextResponse } from "next/server"
import {
  displayName,
  escapeHtml,
  sendMessage,
  sendTyping,
  tg,
  type InlineKeyboard,
  type TgCallbackQuery,
  type TgMessage,
  type TgUpdate,
} from "@/lib/telegram/api"
import { aiEnabled, aiReply, keywordReply } from "@/lib/telegram/ai"
import { loadHistory, saveLead, saveMessages } from "@/lib/telegram/history"
import { CONTACT_EMAIL, SITE_URL, about, faqs, portfolio, services, socials } from "@/lib/telegram/knowledge"

export const dynamic = "force-dynamic"
export const maxDuration = 60

const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID
// Every customer message (and the bot's answer) is copied to the admin chat unless this is "false"
const LOG_ALL = process.env.TELEGRAM_ADMIN_LOG_ALL !== "false"
const QUOTE_PROMPT = "📝 Let's get you a free quote!"
// Admin notifications carry this tag so replying to them can be routed back to the customer
const CHAT_TAG = /#chat(-?\d+)/

const mainMenu: InlineKeyboard = [
  [
    { text: "🛠 Services", callback_data: "services" },
    { text: "💰 Pricing", callback_data: "pricing" },
  ],
  [
    { text: "❓ FAQ", callback_data: "faq" },
    { text: "🖼 Portfolio", callback_data: "portfolio" },
  ],
  [
    { text: "📝 Get a quote", callback_data: "quote" },
    { text: "🙋 Talk to a human", callback_data: "human" },
  ],
  ...(SITE_URL ? [[{ text: "🎯 Free website quiz", url: `${SITE_URL}/quiz` }]] : []),
]

const backButton: InlineKeyboard = [[{ text: "⬅️ Main menu", callback_data: "menu" }]]

const pages: Record<string, () => string> = {
  services: () =>
    `<b>Our Services</b>\n\n${services.map((s) => `<b>${s.title}</b>\n${s.description}`).join("\n\n")}`,
  pricing: () =>
    `<b>Pricing</b>\n\n${faqs[1].answer}\n\nTap “Get a quote” and tell us about your project; it's free and there's no obligation.`,
  faq: () => `<b>FAQ</b>\n\n${faqs.map((f) => `<b>${f.question}</b>\n${f.answer}`).join("\n\n")}`,
  portfolio: () =>
    `<b>Recent work</b>\n\n${portfolio.map((p) => `• <a href="${p.url}">${p.name}</a>`).join("\n")}${
      SITE_URL ? `\n\nSee more at <a href="${SITE_URL}/portfolio">our portfolio</a>.` : ""
    }`,
  contact: () =>
    `<b>Contact PixelSmith</b>\n\n📧 ${CONTACT_EMAIL}\n${SITE_URL ? `🌐 ${SITE_URL}/contact\n` : ""}${socials
      .map((s) => `• <a href="${s.url}">${s.name}</a>`)
      .join("\n")}\n\nOr just type your question here!`,
}

function welcome(firstName: string) {
  return `👋 Hi ${escapeHtml(firstName)}! Welcome to <b>PixelSmith</b>.\n\n${about}\n\nAsk me anything, or pick an option below.`
}

async function notifyAdmin(html: string) {
  if (!ADMIN_CHAT_ID) return
  await sendMessage(ADMIN_CHAT_ID, html, { html: true }).catch((e) => console.error("Admin notify failed:", e))
}

function customerHeader(msg: TgMessage) {
  return `${escapeHtml(displayName(msg.from))} · #chat${msg.chat.id}`
}

async function askForQuote(chatId: number) {
  await sendMessage(
    chatId,
    `${QUOTE_PROMPT}\n\nReply to this message with:\n• Your name\n• Your email\n• What you need (type of site, deadline, budget)`,
    { forceReply: true },
  )
}

async function requestHuman(msg: TgMessage, reason: string) {
  await notifyAdmin(
    `🚨 <b>Customer wants a human</b>\n${customerHeader(msg)}\n\n${escapeHtml(reason)}\n\n<i>Reply to this message to answer them.</i>`,
  )
}

async function handleCommand(msg: TgMessage, command: string) {
  const chatId = msg.chat.id
  switch (command) {
    case "/start":
    case "/menu":
    case "/help":
      return sendMessage(chatId, welcome(msg.from?.first_name || "there"), { html: true, keyboard: mainMenu })
    case "/services":
    case "/pricing":
    case "/faq":
    case "/portfolio":
    case "/contact":
      return sendMessage(chatId, pages[command.slice(1)](), { html: true, keyboard: backButton })
    case "/quote":
      return askForQuote(chatId)
    case "/human":
      await requestHuman(msg, "Used /human")
      return sendMessage(chatId, "🙋 Got it! A PixelSmith team member has been notified and will reply here soon.")
    default:
      return sendMessage(chatId, "I don't know that command. Tap /menu to see what I can do.")
  }
}

async function handleQuote(msg: TgMessage, text: string) {
  const email = text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/)?.[0]
  if (!email) {
    await sendMessage(msg.chat.id, "I couldn't find an email address in that. Could you include one so we can send your quote?")
    return askForQuote(msg.chat.id)
  }

  const saved = await saveLead({ name: displayName(msg.from), email, message: text })
  await notifyAdmin(
    `💼 <b>New quote request</b>${saved ? " (saved to Supabase)" : ""}\n${customerHeader(msg)}\n📧 ${escapeHtml(email)}\n\n${escapeHtml(text)}`,
  )
  await sendMessage(
    msg.chat.id,
    "✅ Thanks! Your request is in. We'll email you a quote within 24 hours, and you can keep chatting with me here anytime.",
    { keyboard: backButton },
  )
}

// The owner replies to a forwarded customer message in the admin chat; send it back to that customer.
async function handleAdminReply(msg: TgMessage, text: string) {
  const original = msg.reply_to_message?.text || ""
  const target = original.match(CHAT_TAG)?.[1]
  if (!target) {
    return sendMessage(msg.chat.id, "To answer a customer, reply (swipe left) to one of their forwarded messages.")
  }
  await sendMessage(target, `💬 PixelSmith team:\n\n${text}`)
  await saveMessages(Number(target), [{ role: "assistant", content: `(Human team member replied) ${text}` }])
  await sendMessage(msg.chat.id, "✅ Sent.", { replyTo: msg.message_id })
}

async function handleCustomerText(msg: TgMessage, text: string) {
  const chatId = msg.chat.id
  await sendTyping(chatId)

  const history = await loadHistory(chatId)
  let reply
  try {
    reply = aiEnabled() ? await aiReply(history, text) : keywordReply(text)
  } catch (e) {
    console.error("AI reply failed:", e)
    reply = keywordReply(text)
  }

  await sendMessage(chatId, reply.text)
  await saveMessages(chatId, [
    { role: "user", content: text },
    { role: "assistant", content: reply.text },
  ])

  if (reply.handoff) {
    await requestHuman(msg, text)
  } else if (LOG_ALL) {
    await notifyAdmin(
      `💬 ${customerHeader(msg)}\n<b>Customer:</b> ${escapeHtml(text)}\n<b>Bot:</b> ${escapeHtml(reply.text)}`,
    )
  }
}

async function handleMessage(msg: TgMessage) {
  const text = (msg.text || msg.caption || "").trim()
  const isAdminChat = ADMIN_CHAT_ID && String(msg.chat.id) === ADMIN_CHAT_ID

  if (isAdminChat) {
    if (text === "/start" || text === "/id") {
      return sendMessage(msg.chat.id, `This is the admin chat (ID ${msg.chat.id}). Customer messages will appear here.`)
    }
    if (text && msg.reply_to_message) return handleAdminReply(msg, text)
    return
  }

  // Only talk to customers in private chats; ignore groups the bot is added to.
  if (msg.chat.type !== "private") return

  if (!text) {
    return sendMessage(msg.chat.id, "I can only read text for now. Please type your question, or email us files at " + CONTACT_EMAIL)
  }
  if (text === "/id") return sendMessage(msg.chat.id, `Your chat ID is ${msg.chat.id}`)
  if (msg.reply_to_message?.text?.startsWith(QUOTE_PROMPT)) return handleQuote(msg, text)
  if (text.startsWith("/")) return handleCommand(msg, text.split(/[\s@]/)[0].toLowerCase())
  return handleCustomerText(msg, text)
}

async function handleCallback(cb: TgCallbackQuery) {
  await tg("answerCallbackQuery", { callback_query_id: cb.id }).catch(() => {})
  const msg = cb.message
  if (!msg || !cb.data) return
  // Callback messages are sent by the bot, so attribute them to the user who tapped
  const asUser: TgMessage = { ...msg, from: cb.from }

  if (cb.data === "menu") {
    return sendMessage(msg.chat.id, welcome(cb.from.first_name), { html: true, keyboard: mainMenu })
  }
  if (cb.data === "quote") return askForQuote(msg.chat.id)
  if (cb.data === "human") return handleCommand(asUser, "/human")
  if (pages[cb.data]) return sendMessage(msg.chat.id, pages[cb.data](), { html: true, keyboard: backButton })
}

export async function POST(request: NextRequest) {
  // Telegram echoes the secret we registered with setWebhook; reject anything else.
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET
  if (!secret || request.headers.get("x-telegram-bot-api-secret-token") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const update = (await request.json()) as TgUpdate
    if (update.message) await handleMessage(update.message)
    else if (update.callback_query) await handleCallback(update.callback_query)
  } catch (e) {
    // Always return 200 so Telegram doesn't retry the same update forever
    console.error("Telegram webhook error:", e)
  }
  return NextResponse.json({ ok: true })
}

export async function GET() {
  return NextResponse.json({ ok: true, bot: "PixelSmith Telegram support bot", ai: aiEnabled() })
}
