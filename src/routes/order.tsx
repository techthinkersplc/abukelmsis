import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Package, Truck, Home, Search } from "lucide-react";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Order status — አቡቀለምሲስ" },
      {
        name: "description",
        content:
          "Track your Abukelemsis order. Enter your order ID to see preparation, shipping, and delivery status.",
      },
      { property: "og:title", content: "Order status — አቡቀለምሲስ" },
      {
        property: "og:description",
        content: "Track your Abukelemsis order in real time.",
      },
    ],
  }),
  component: OrderPage,
});

type Stage = "received" | "preparing" | "shipped" | "delivered";

interface OrderState {
  id: string;
  placedAt: string;
  stage: Stage;
  estimatedDelivery: string;
}

const stages: { key: Stage; label: string; description: string; icon: typeof Check }[] = [
  { key: "received", label: "Order received", description: "We have your order in the atelier.", icon: Check },
  { key: "preparing", label: "Preparing", description: "Your pieces are being wrapped by hand.", icon: Package },
  { key: "shipped", label: "Shipped", description: "On its way through our courier partner.", icon: Truck },
  { key: "delivered", label: "Delivered", description: "Enjoy your order. Thank you.", icon: Home },
];

function mockLookup(id: string): OrderState {
  // Deterministic mock: derive stage from the id's last char
  const trimmed = id.trim().toUpperCase();
  const last = trimmed.charCodeAt(trimmed.length - 1) || 0;
  const stage = stages[last % stages.length].key;
  return {
    id: trimmed,
    placedAt: "April 26, 2026",
    stage,
    estimatedDelivery: "May 3, 2026",
  };
}

function OrderPage() {
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<OrderState | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitized = query.trim();
    if (sanitized.length < 4) {
      setOrder(null);
      setError("Please enter a valid order ID (at least 4 characters).");
      return;
    }
    setError(null);
    setOrder(mockLookup(sanitized));
  };

  const currentIndex = order ? stages.findIndex((s) => s.key === order.stage) : -1;

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">Track your order</p>
      <h1 className="mt-4 font-display text-5xl leading-tight text-primary md:text-6xl">
        Where is my order?
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
        Enter the order ID from your confirmation email and we will show you the
        current stage — from atelier to your door.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 flex flex-col gap-3 sm:flex-row"
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. ABK-10293"
            className="h-12 w-full rounded-sm border border-border bg-card pl-11 pr-4 text-sm text-foreground outline-none transition-colors focus:border-primary"
            aria-label="Order ID"
          />
        </div>
        <button
          type="submit"
          className="h-12 rounded-sm bg-primary px-8 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-accent"
        >
          Check status
        </button>
      </form>

      {error && (
        <p className="mt-4 text-sm text-destructive">{error}</p>
      )}

      {order && (
        <div className="mt-12 rounded-sm border border-border bg-card p-8 shadow-elegant">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-border pb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Order
              </p>
              <p className="mt-1 font-display text-2xl text-primary">{order.id}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Estimated delivery
              </p>
              <p className="mt-1 text-sm text-foreground">{order.estimatedDelivery}</p>
            </div>
          </div>

          <ol className="mt-8 space-y-6">
            {stages.map((stage, i) => {
              const Icon = stage.icon;
              const reached = i <= currentIndex;
              const current = i === currentIndex;
              return (
                <li key={stage.key} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                        reached
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    {i < stages.length - 1 && (
                      <div
                        className={`mt-1 h-10 w-px ${
                          i < currentIndex ? "bg-primary" : "bg-border"
                        }`}
                      />
                    )}
                  </div>
                  <div className="pb-2">
                    <p
                      className={`text-sm font-medium ${
                        reached ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {stage.label}
                      {current && (
                        <span className="ml-3 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-accent">
                          Current
                        </span>
                      )}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {stage.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          <p className="mt-8 border-t border-border pt-6 text-xs text-muted-foreground">
            Order placed on {order.placedAt}. Need help? Reach the atelier from our
            contact page.
          </p>
        </div>
      )}
    </section>
  );
}
