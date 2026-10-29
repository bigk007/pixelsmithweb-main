// Optional conversation memory backed by the Supabase `telegram_messages`
// table (scripts/003-create-telegram-messages-table.sql). If Supabase isn't
// configured or the table is missing, the bot still works, just without
// remembering earlier messages.

import type Anthropic from "@anthropic-ai/sdk"
import { createServerClient } from "@/lib/supabase/server"

const HISTORY_LIMIT = 12

export async function loadHistory(chatId: number): Promise<Anthropic.MessageParam[]> {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from("telegram_messages")
      .select("role, content")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: false })
      .limit(HISTORY_LIMIT)
    if (error || !data) return []

    const history = data.reverse().map((row) => ({ role: row.role, content: row.content }) as Anthropic.MessageParam)
    // The conversation sent to Claude must start with a user turn
    while (history.length && history[0].role !== "user") history.shift()
    return history
  } catch {
    return []
  }
}

export async function saveMessages(chatId: number, rows: { role: "user" | "assistant"; content: string }[]) {
  try {
    const supabase = createServerClient()
    await supabase.from("telegram_messages").insert(rows.map((r) => ({ chat_id: chatId, ...r })))
  } catch {
    // History is best-effort
  }
}

export async function saveLead(lead: { name: string; email: string; message: string }) {
  try {
    const supabase = createServerClient()
    const { error } = await supabase.from("contact_submissions").insert([
      { name: lead.name, email: lead.email, business_type: "Telegram lead", message: lead.message },
    ])
    return !error
  } catch {
    return false
  }
}
