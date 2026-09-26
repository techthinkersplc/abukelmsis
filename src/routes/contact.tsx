import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Phone, MapPin, Instagram, Send, Facebook } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — አቡቀለምሲስ" },
      {
        name: "description",
        content: "Get in touch with አቡቀለምሲስ via our Telegram bot.",
      },
    ],
  }),
  component: Contact,
});

// Added phone to the schema
const schema = z.object({
  name: z.string().trim().min(1, "Please share your name").max(100),
  phone: z.string().trim().min(10, "Please enter a valid phone number"),
  message: z.string().trim().min(5, "A few more words, please").max(1000),
});

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSending, setIsSending] = useState(false);

  const BOT_TOKEN = "8586820552:AAHGOzry8APmtHoAFLy0SNdHOn8Wv3-naRM";
  const CHAT_ID = "1951892460";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fieldErrors[String(issue.path[0])] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setIsSending(true);
    setErrors({});

    // Updated template with Phone
    const telegramMessage = `
🔔 *New Contact Form Submission*
👤 *Name:* ${form.name}
📞 *Phone:* ${form.phone}
📝 *Message:* ${form.message}
    `;

    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: telegramMessage,
          parse_mode: "Markdown",
        }),
      });

      if (response.ok) {
        toast.success("Message sent to our Telegram!");
        setForm({ name: "", phone: "", message: "" });
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("Failed to send. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="font-display text-5xl font-bold text-foreground md:text-6xl">
          Get in <span className="text-accent">Touch</span>
        </h1>

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
          <form
            onSubmit={onSubmit}
            className="rounded-lg border border-border bg-card p-8 shadow-soft"
          >
            <Field label="Full Name" error={errors.name}>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Abukelemsis"
                className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
              />
            </Field>

            <div className="h-5" />

            {/* NEW: Phone Number Field */}
            <Field label="Phone Number" error={errors.phone}>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+2519..."
                className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
              />
            </Field>

            <div className="h-5" />

            <Field label="Message" error={errors.message}>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="How can we help you?"
                className="w-full resize-none rounded-md border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
              />
            </Field>

            <button
              type="submit"
              disabled={isSending}
              className="mt-6 w-full rounded-md bg-accent py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-primary disabled:opacity-50"
            >
              {isSending ? "Sending..." : "Send message"}
            </button>
          </form>

          <div className="space-y-8">
            <InfoRow
              icon={<Phone className="h-5 w-5" />}
              title="Call Us Directly"
              value="0963469973 · 0973133334"
            />
            <InfoRow
              icon={<MapPin className="h-5 w-5" />}
              title="Visit Us"
              value="ልደታ ፍርድ ቤት ፊት ለፊት ፖስት የገበያ ማዕከል 2ተኛ ፎቅ (ቁጥር 222)"
            />
            <div className="rounded-xl bg-accent/5 p-6 border border-accent/10">
              <p className="text-sm font-medium text-accent">Quick Tip</p>
              <p className="text-xs text-muted-foreground mt-1">
                We usually respond within 4-5 hours on Telegram during business hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper components (Field, InfoRow) remain as they were in your previous version.
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-foreground">{label}</label>
      {children}
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function InfoRow({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-border bg-card text-accent">
        {icon}
      </div>
      <div>
        <p className="font-medium text-foreground">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}
