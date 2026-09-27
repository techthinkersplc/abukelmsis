export type TelegramSendResult = { ok: true } | { ok: false; message: string; detail: string };

const FRIENDLY_BY_STATUS: Record<number, string> = {
  400: "Telegram rejected the message format. Please contact us directly.",
  401: "Our Telegram bot credentials are invalid. Please contact us directly.",
  403: "The bot can no longer post to our chat. Please contact us directly.",
  404: "The Telegram chat was not found. Please contact us directly.",
  409: "Telegram is busy right now. Please try again in a moment.",
  429: "Too many attempts. Please wait a moment and try again.",
};

function getCredentials() {
  return {
    botToken: import.meta.env.VITE_TELEGRAM_BOT_TOKEN as string | undefined,
    chatId: import.meta.env.VITE_TELEGRAM_CHAT_ID as string | undefined,
  };
}

export async function sendTelegramMessage(
  text: string,
  fallbackMessage: string,
): Promise<TelegramSendResult> {
  const { botToken, chatId } = getCredentials();

  if (!botToken || !chatId) {
    return {
      ok: false,
      message: fallbackMessage,
      detail: import.meta.env.DEV
        ? "Missing VITE_TELEGRAM_BOT_TOKEN or VITE_TELEGRAM_CHAT_ID — check your .env file and restart the dev server."
        : "Missing VITE_TELEGRAM_BOT_TOKEN or VITE_TELEGRAM_CHAT_ID",
    };
  }

  let response: Response;

  try {
    response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });
  } catch (error) {
    return {
      ok: false,
      message: "No connection to Telegram. Please check your internet and try again.",
      detail: error instanceof Error ? `${error.name}: ${error.message}` : String(error),
    };
  }

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const description = payload?.description ?? "no description returned";
    const retryAfter = payload?.parameters?.retry_after;

    return {
      ok: false,
      message: FRIENDLY_BY_STATUS[response.status] ?? fallbackMessage,
      detail:
        `HTTP ${response.status} ${description}` +
        (retryAfter ? ` (retry after ${retryAfter}s)` : "") +
        ` | chat_id=${chatId}`,
    };
  }

  return { ok: true };
}

export function logTelegramFailure(scope: string, detail: string) {
  if (import.meta.env.DEV) {
    console.error(`[telegram:${scope}] ${detail}`);
    return;
  }
  console.error(`[telegram:${scope}] send failed`);
}

export async function verifyTelegramCredentials() {
  if (!import.meta.env.DEV) return;

  const { botToken, chatId } = getCredentials();

  if (!botToken || !chatId) {
    console.error(
      "[telegram] VITE_TELEGRAM_BOT_TOKEN / VITE_TELEGRAM_CHAT_ID are not set — orders and messages cannot be delivered.",
    );
    return;
  }

  const botId = botToken.split(":")[0];

  try {
    const [me, chat] = await Promise.all([
      fetch(`https://api.telegram.org/bot${botToken}/getMe`).then((r) => r.json()),
      fetch(`https://api.telegram.org/bot${botToken}/getChat?chat_id=${chatId}`).then((r) =>
        r.json(),
      ),
    ]);

    if (!me.ok) {
      console.error(
        `[telegram] Bot token is rejected (HTTP ${me.error_code}: ${me.description}). Get a new token from @BotFather and update VITE_TELEGRAM_BOT_TOKEN.`,
      );
    }

    if (!chat.ok) {
      console.error(
        `[telegram] Chat ${chatId} is not usable (HTTP ${chat.error_code}: ${chat.description}). Check VITE_TELEGRAM_CHAT_ID and make sure the bot is still a member.`,
      );
    }

    if (me.ok && chat.ok) {
      console.info(
        `[telegram] OK — @${me.result.username} (bot ${botId}) can post to ${chat.result.type} "${chat.result.title ?? chat.result.first_name ?? chatId}".`,
      );
    }
  } catch (error) {
    console.error("[telegram] Credential check failed:", error);
  }
}
