import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Maison Cremisi" },
      {
        name: "description",
        content: "Write to the atelier — we read every message and reply within two days.",
      },
      { property: "og:title", content: "Contact — Maison Cremisi" },
      { property: "og:description", content: "Write to the Maison Cremisi atelier." },
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

  const [submitting, setSubmitting] = useState(false);

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
    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setForm({ name: "", email: "", message: "" });
      toast.success("Message received — we'll write back shortly.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-2xl px-6 py-24">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">Write to us</p>
      <h1 className="mt-4 font-display text-5xl text-primary">Say hello.</h1>
      <p className="mt-4 text-muted-foreground">
        Our atelier reads every message and replies within two working days.
      </p>

      <form onSubmit={onSubmit} className="mt-12 space-y-6">
        <Field label="Your name" error={errors.name}>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-primary"
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-primary"
          />
        </Field>
        <Field label="Message" error={errors.message}>
          <textarea
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full resize-none border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-primary"
          />
        </Field>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-sm bg-primary px-8 py-4 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-accent disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Send message"}
        </button>
      </form>
    </section>
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
      <label className="mb-1 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </label>
      {children}
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
