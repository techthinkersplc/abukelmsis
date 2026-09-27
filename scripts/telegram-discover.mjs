#!/usr/bin/env node
import { readFileSync, writeFileSync, copyFileSync } from "node:fs";

const envPath = new URL("../.env", import.meta.url);
const waitMs = Number(process.argv[2] ?? 180) * 1000;

let raw = "";
try {
  raw = readFileSync(envPath, "utf8");
} catch {
  console.error("Could not read .env — run this from the project root.");
  process.exit(1);
}

const env = {};
for (const line of raw.split("\n")) {
  const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (match) env[match[1]] = match[2].replace(/^["']|["']$/g, "");
}

const botToken = process.env.VITE_TELEGRAM_BOT_TOKEN || env.VITE_TELEGRAM_BOT_TOKEN;
if (!botToken) {
  console.error("VITE_TELEGRAM_BOT_TOKEN is missing from .env");
  process.exit(1);
}
const me = await fetch(`https://api.telegram.org/bot${botToken}/getMe`).then((r) => r.json());
if (!me.ok) {
  console.error(`Token rejected: ${me.description}`);
  process.exit(1);
}

console.log(`\n  Bot: @${me.result.username} (${me.result.id})`);
console.log(`  Waiting up to ${waitMs / 1000}s for a chat.`);
console.log(
  `  Action needed: open Telegram, open @${me.result.username}, press START, then send any message.\n`,
);

const seen = new Map();
const deadline = Date.now() + waitMs;
let offset = -1;

while (Date.now() < deadline) {
  const query = offset >= 0 ? `?timeout=25&offset=${offset}` : "?timeout=25&limit=100";
  const res = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates${query}`).then((r) =>
    r.json(),
  );

  for (const u of res.result ?? []) {
    offset = u.update_id + 1;
    const c = u.message?.chat ?? u.my_chat_member?.chat ?? u.channel_post?.chat;
    if (c && !seen.has(c.id)) seen.set(c.id, c);
  }

  if (seen.size > 0) break;
}

if (seen.size === 0) {
  console.error("  ✗ No chat found. The bot still has not received anything from you.");
  console.error("    Press START inside the bot chat (not just open it), then re-run.\n");
  process.exit(1);
}

const pick = (type) => [...seen.values()].find((c) => (type ? c.type === type : true));
const chosen = pick("group") ?? pick("supergroup") ?? pick("private") ?? [...seen.values()][0];
const label = chosen.title ?? [chosen.first_name, chosen.last_name].filter(Boolean).join(" ");

console.log(`  Found ${seen.size} chat(s):`);
for (const c of seen.values()) {
  console.log(`    ${c.id}  ${c.type}  ${c.title ?? c.first_name ?? ""}`);
}
console.log(`\n  Using ${chosen.id} (${chosen.type} "${label}")`);

if (env.VITE_TELEGRAM_CHAT_ID === String(chosen.id)) {
  console.log("  VITE_TELEGRAM_CHAT_ID already matches — nothing to write.\n");
} else {
  copyFileSync(envPath, new URL("../.env.bak", import.meta.url));
  const line = `VITE_TELEGRAM_CHAT_ID="${chosen.id}"`;
  const updated = /^VITE_TELEGRAM_CHAT_ID\s*=/m.test(raw)
    ? raw.replace(/^VITE_TELEGRAM_CHAT_ID\s*=.*$/m, line)
    : `${raw.replace(/\s*$/, "")}\n${line}\n`;
  writeFileSync(envPath, updated);
  console.log(`  Updated .env → VITE_TELEGRAM_CHAT_ID="${chosen.id}" (backup: .env.bak)`);
}

const sent = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ chat_id: chosen.id, text: "✅ Connected — orders will arrive here." }),
});
const sentBody = await sent.json().catch(() => null);
if (!sentBody?.ok) {
  console.error(`  ✗ Test send failed: HTTP ${sent.status} ${sentBody?.description ?? ""}\n`);
  process.exit(1);
}

console.log(`  ✓ Test message delivered (message_id ${sentBody.result.message_id})`);
console.log("\n  Done. Restart the dev server so the new ID is picked up.\n");
