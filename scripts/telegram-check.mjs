#!/usr/bin/env node
import { readFileSync } from "node:fs";

const envPath = new URL("../.env", import.meta.url);
const env = {};

try {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    env[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
} catch {
  console.error("Could not read .env — run this from the project root.");
  process.exit(1);
}

const token = env.VITE_TELEGRAM_BOT_TOKEN;
const chatId = env.VITE_TELEGRAM_CHAT_ID;

const api = async (method, query = "") => {
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}${query}`);
  return { status: res.status, body: await res.json().catch(() => null) };
};

const fail = (msg) => {
  console.error(`\n  ${msg}\n`);
  process.exit(1);
};

if (!token) fail("VITE_TELEGRAM_BOT_TOKEN is missing from .env");
if (!chatId) fail("VITE_TELEGRAM_CHAT_ID is missing from .env");

console.log(`\n  Checking bot ${token.split(":")[0]}...\n`);

const me = await api("getMe");
if (!me.body.ok) {
  console.error(`  ✗ Token rejected — HTTP ${me.status}: ${me.body.description}\n`);
  console.error("  This token is invalid or revoked. Nothing in the code can fix it.\n");
  console.error("  To get a working one:");
  console.error("    1. Open Telegram and talk to @BotFather");
  console.error("    2. Send /newbot (or /token to reissue an existing bot)");
  console.error("    3. Copy the token it gives you");
  console.error('    4. Put it in .env as VITE_TELEGRAM_BOT_TOKEN="..."');
  console.error("    5. Re-run: node scripts/telegram-check.mjs\n");
  process.exit(1);
}
console.log(`  ✓ Token valid — @${me.body.result.username} (${me.body.result.first_name})`);

const chat = await api("getChat", `?chat_id=${encodeURIComponent(chatId)}`);
if (!chat.body.ok) {
  console.error(`  ✗ Chat ${chatId} unusable — HTTP ${chat.status}: ${chat.body.description}\n`);
  console.error("  Recent chats this bot can see (send the bot a message first if empty):\n");
  const updates = await api("getUpdates", "?limit=100");
  const seen = new Map();
  for (const u of updates.body?.result ?? []) {
    const c = u.message?.chat ?? u.my_chat_member?.chat;
    if (c) seen.set(c.id, c);
  }
  if (seen.size === 0) console.error("    (none — the bot has received no messages yet)");
  for (const c of seen.values()) {
    console.error(
      `    ${c.id}  ${c.type}  ${c.title ?? [c.first_name, c.last_name].filter(Boolean).join(" ")}`,
    );
  }
  console.error("\n  Set one of the IDs above as VITE_TELEGRAM_CHAT_ID, then re-run.\n");
  process.exit(1);
}
const c = chat.body.result;
console.log(`  ✓ Chat ${chatId} reachable — ${c.type} "${c.title ?? c.first_name}"`);

if (c.type === "group" || c.type === "supergroup" || c.type === "channel") {
  const member = await api(
    "getChatMember",
    `?chat_id=${encodeURIComponent(chatId)}&user_id=${me.body.result.id}`,
  );
  if (!member.body.ok) {
    console.error("  ! Could not confirm bot membership in this chat");
  } else if (["left", "kicked"].includes(member.body.result.status)) {
    console.error(
      `  ! Bot is ${member.body.result.status.toUpperCase()} — it cannot post. Re-add it.`,
    );
  } else {
    console.log(`  ✓ Bot is in the chat (${member.body.result.status})`);
  }
}

const sent = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ chat_id: chatId, text: "✅ Test message — telegram-check.mjs works." }),
});
const sentBody = await sent.json().catch(() => null);
if (!sentBody?.ok) {
  fail(`Test send failed — HTTP ${sent.status}: ${sentBody?.description ?? "unknown"}`);
}

console.log(`  ✓ Test message delivered (message_id ${sentBody.result.message_id})`);
console.log("\n  All checks passed. Restart your dev server and orders will work.\n");
