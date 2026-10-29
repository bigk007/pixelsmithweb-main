// Minimal Telegram Bot API client: https://core.telegram.org/bots/api

export type InlineButton = { text: string; callback_data?: string; url?: string }
export type InlineKeyboard = InlineButton[][]

export interface TgUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
}

export interface TgMessage {
  message_id: number
  from?: TgUser
  chat: { id: number; type: string }
  text?: string
  caption?: string
  reply_to_message?: TgMessage
}

export interface TgCallbackQuery {
  id: string
  from: TgUser
  message?: TgMessage
  data?: string
}

export interface TgUpdate {
  update_id: number
  message?: TgMessage
  callback_query?: TgCallbackQuery
}

export async function tg<T = unknown>(method: string, params: Record<string, unknown>): Promise<T> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  if (!token) throw new Error("Missing TELEGRAM_BOT_TOKEN")

  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  })
  const data = await res.json()
  if (!data.ok) throw new Error(`Telegram ${method} failed: ${data.description}`)
  return data.result as T
}

export function sendMessage(
  chatId: number | string,
  text: string,
  opts: { html?: boolean; keyboard?: InlineKeyboard; forceReply?: boolean; replyTo?: number } = {},
) {
  return tg<TgMessage>("sendMessage", {
    chat_id: chatId,
    // Telegram caps messages at 4096 characters
    text: text.slice(0, 4096),
    parse_mode: opts.html ? "HTML" : undefined,
    link_preview_options: { is_disabled: true },
    reply_parameters: opts.replyTo ? { message_id: opts.replyTo } : undefined,
    reply_markup: opts.keyboard
      ? { inline_keyboard: opts.keyboard }
      : opts.forceReply
        ? { force_reply: true, input_field_placeholder: "Name, email and project details…" }
        : undefined,
  })
}

export function sendTyping(chatId: number) {
  return tg("sendChatAction", { chat_id: chatId, action: "typing" }).catch(() => {})
}

export function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

export function displayName(u?: TgUser): string {
  if (!u) return "Unknown"
  const name = [u.first_name, u.last_name].filter(Boolean).join(" ")
  return u.username ? `${name} (@${u.username})` : name
}
