import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-store";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>) => ({
    redirect: typeof s.redirect === "string" ? s.redirect : "/",
  }),
  head: () => ({
    meta: [
      { title: "Sign in — አቡቀለምሲስ" },
      { name: "description", content: "Sign in or create an account at አቡቀለምሲስ." },
    ],
  }),
  component: AuthPage,
});

const credentials = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(6, "At least 6 characters").max(72),
});

function AuthPage() {
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/auth" });
  const user = useAuth((s) => s.user);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) navigate({ to: redirect as never });
  }, [user, redirect, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = credentials.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    try {
      if (mode === "signup") {
        const emailRedirectTo = `${window.location.origin}/`;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo },
        });
        if (error) throw error;
        toast.success("Account created");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Authentication failed";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-md px-6 py-24">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">
        {mode === "signin" ? "Welcome back" : "Join the house"}
      </p>
      <h1 className="mt-4 font-display text-5xl text-primary">
        {mode === "signin" ? "Sign in." : "Create account."}
      </h1>
      <form onSubmit={onSubmit} className="mt-12 space-y-6">
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Email
          </label>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Password
          </label>
          <input
            type="password"
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-primary"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-sm bg-primary py-4 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-accent disabled:opacity-60"
        >
          {submitting ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>
      <button
        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        className="mt-6 w-full text-center text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
      >
        {mode === "signin"
          ? "New here? Create an account →"
          : "Already have an account? Sign in →"}
      </button>
    </section>
  );
}
