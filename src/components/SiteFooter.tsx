import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = z.string().trim().email().max(255).safeParse(email);
    if (!result.success) {
      toast.error("Please enter a valid email");
      return;
    }
    setEmail("");
    toast.success("Subscribed — thank you!");
  };

  return (
    <footer className="mt-32 bg-[oklch(0.18_0.02_18)] text-primary-foreground">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h3 className="font-display text-4xl font-bold text-accent md:text-5xl">
          Subscribe to Our Newsletter
        </h3>
        <p className="mx-auto mt-4 max-w-md text-sm opacity-80">
          Stay updated with our latest products and exclusive offers
        </p>

        <form
          onSubmit={onSubmit}
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 rounded-md border border-white/15 bg-transparent px-4 py-3 text-sm text-primary-foreground outline-none placeholder:text-white/50 focus:border-accent"
          />
          <button
            type="submit"
            className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:opacity-90"
          >
            Subscribe
          </button>
        </form>
      </div>
      <div className="border-t border-white/10 px-6 py-6 text-center text-xs opacity-70">
        © {new Date().getFullYear()} አቡቀለምሲስ · Abukelemsis. All rights reserved.
      </div>
    </footer>
  );
}
