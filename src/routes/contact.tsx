import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — አቡቀለምሲስ" },
      {
        name: "description",
        content:
          "Get in touch with አቡቀለምሲስ. Have a question about a product or order? We are here to help.",
      },
      { property: "og:title", content: "Contact — አቡቀለምሲስ" },
      {
        property: "og:description",
        content: "Get in touch with አቡቀለምሲስ.",
      },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please share your name").max(100),
  email: z.string().trim().email("That email looks off").max(255),
  message: z.string().trim().min(5, "A few more words, please").max(1000),
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent) => {
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
    setErrors({});
    setForm({ name: "", email: "", message: "" });
    toast.success("Message received — we'll write back shortly.");
  };

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="font-display text-5xl font-bold text-foreground md:text-6xl">
          Get in <span className="text-accent">Touch</span>
        </h1>
        <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
          Have a question about a product or an order? We are here to help. Send us
          a message and we will get back to you within 24 hours.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Form card */}
          <form
            onSubmit={onSubmit}
            className="rounded-lg border border-border bg-card p-8 shadow-soft"
          >
            <Field label="Full Name" error={errors.name}>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="አቡቀለምሲስ"
                className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
              />
            </Field>
            <div className="h-5" />
            <Field label="Email Address" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="abukelemsis@gmail.com"
                className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
              />
            </Field>
            <div className="h-5" />
            <Field label="Message" error={errors.message}>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="How can we help you?"
                className="w-full resize-none rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
              />
            </Field>
            <button
              type="submit"
              className="mt-6 w-full rounded-md bg-accent py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-primary"
            >
              Send Message
            </button>
          </form>

          {/* Info column */}
          <div className="space-y-8">
            <InfoRow
              icon={<Mail className="h-5 w-5" />}
              title="Email Us"
              value="abukelemsis@gmail.com"
            />
            <InfoRow
              icon={<Phone className="h-5 w-5" />}
              title="Call Us"
              value="0963469973 · 0973133334"
            />
            <InfoRow
              icon={<MapPin className="h-5 w-5" />}
              title="Visit Us"
              value="ስታዲየም ቤተዛታ ሆስፒታል ጀርባ — Addis Ababa"
            />

            <div className="border-t border-border pt-6">
              <p className="text-xs uppercase tracking-[0.25em] text-accent">
                Follow our journey
              </p>
              <div className="mt-3 flex gap-6 text-sm text-foreground">
                <a href="#" className="hover:text-accent">Instagram</a>
                <a href="#" className="hover:text-accent">Telegram</a>
                <a href="#" className="hover:text-accent">Facebook</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
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
      <label className="mb-2 block text-xs font-medium text-foreground">
        {label}
      </label>
      {children}
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
