// Registers the webhook, command menu and profile text for the Telegram bot.
//
// Usage:
//   TELEGRAM_BOT_TOKEN=... TELEGRAM_WEBHOOK_SECRET=... node scripts/telegram-setup.mjs https://your-domain.com
//
// Run it again whenever your domain changes.

const token = process.env.TELEGRAM_BOT_TOKEN
const secret = process.env.TELEGRAM_WEBHOOK_SECRET
const siteUrl = process.argv[2]?.replace(/\/$/, "")

if (!token || !secret || !siteUrl) {
  console.error("Usage: TELEGRAM_BOT_TOKEN=... TELEGRAM_WEBHOOK_SECRET=... node scripts/telegram-setup.mjs https://your-domain.com")
  process.exit(1)
}

async function call(method, params) {
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  })
  const data = await res.json()
  console.log(`${data.ok ? "✅" : "❌"} ${method}${data.ok ? "" : `: ${data.description}`}`)
  if (!data.ok) process.exitCode = 1
  return data.result
}

await call("setWebhook", {
  url: `${siteUrl}/api/telegram`,
  secret_token: secret,
  allowed_updates: ["message", "callback_query"],
  drop_pending_updates: true,
})

await call("setMyCommands", {
  commands: [
    { command: "menu", description: "Main menu" },
    { command: "services", description: "What we offer" },
    { command: "pricing", description: "How much it costs" },
    { command: "faq", description: "Common questions" },
    { command: "portfolio", description: "See our work" },
    { command: "quote", description: "Get a free quote" },
    { command: "human", description: "Talk to a real person" },
    { command: "contact", description: "Email and socials" },
  ],
})

await call("setMyShortDescription", {
  short_description: "PixelSmith support: websites in 24–48 hours, redesigns and digital marketing.",
})

await call("setMyDescription", {
  description:
    "Hi! I'm the PixelSmith assistant. Ask about our websites, redesigns and marketing services, see pricing and our portfolio, get a free quote, or chat with a real person.",
})

const info = await call("getWebhookInfo", {})
if (info) console.log(`Webhook: ${info.url} (pending updates: ${info.pending_update_count})`)
