# PixelSmith Telegram Support Bot

A customer support bot that runs inside this Next.js site as the webhook route `app/api/telegram/route.ts`. It deploys with the site on Vercel, so there's no separate server to run.

## What it does

- **Menu buttons** for Services, Pricing, FAQ, Portfolio, Get a quote, Talk to a human, and the free website quiz
- **AI answers** (Claude) to free-form questions, using only the facts in `lib/telegram/knowledge.ts`. Without an `ANTHROPIC_API_KEY` it falls back to matching questions against the FAQ.
- **Quote requests** (`/quote`): collects name, email, and project details, saves them to the existing `contact_submissions` table, and alerts you
- **Human handoff**: when a customer asks for a person, gets upset, or asks something the bot can't answer, you get a 🚨 alert. **Reply to any customer message in your admin chat and the bot delivers your reply to that customer.**
- **Conversation memory** (optional): with the `telegram_messages` table in place, the bot remembers the last few messages in each chat

## Setup (about 10 minutes)

1. **Create the bot**: in Telegram, message [@BotFather](https://t.me/BotFather), send `/newbot`, and copy the token it gives you.
2. **Find your admin chat ID**: start a chat with your new bot, then open
   `https://api.telegram.org/bot<TOKEN>/getUpdates` in a browser and copy `message.chat.id`.
   (Or use a private group: add the bot to the group and use the group's negative ID.)
3. **Add environment variables** in Vercel → Project → Settings → Environment Variables:

   | Variable | Required | Value |
   |---|---|---|
   | `TELEGRAM_BOT_TOKEN` | yes | token from BotFather |
   | `TELEGRAM_WEBHOOK_SECRET` | yes | any long random string (letters, digits, `_`, `-`) |
   | `TELEGRAM_ADMIN_CHAT_ID` | recommended | your chat ID from step 2 |
   | `ANTHROPIC_API_KEY` | recommended | from [console.anthropic.com](https://console.anthropic.com), turns on AI answers |
   | `NEXT_PUBLIC_SITE_URL` | recommended | e.g. `https://pixelsmith.com` (used for quiz/contact links) |
   | `TELEGRAM_ADMIN_LOG_ALL` | optional | `false` to send only handoffs and quotes to you, not every chat |
   | `TELEGRAM_BOT_MODEL` | optional | Claude model ID (default `claude-opus-5-5`) |

   The existing `SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are used to save quote requests and chat history.
4. **(Optional) Turn on memory**: run `scripts/003-create-telegram-messages-table.sql` in the Supabase SQL editor.
5. **Deploy**, then register the webhook and the command menu:
   ```bash
   TELEGRAM_BOT_TOKEN=... TELEGRAM_WEBHOOK_SECRET=... node scripts/telegram-setup.mjs https://your-domain.com
   ```
6. Open your bot in Telegram and send `/start`.

## Customizing

- **Business facts, prices, FAQ, portfolio**: `lib/telegram/knowledge.ts`. The AI never goes beyond what's written there, so update it when your offer changes.
- **Bot personality and handoff rules**: `SYSTEM_PROMPT` in `lib/telegram/ai.ts`
- **Menus and messages**: `app/api/telegram/route.ts`

Check that the route is live: `GET https://your-domain.com/api/telegram` returns `{"ok":true,...,"ai":true}` once the API key is set.
