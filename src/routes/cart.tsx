import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your bag — Maison Cremisi" },
      { name: "description", content: "Review your selection and proceed to checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const navigate = useNavigate();
  const [hydrated, setHydrated] = useState(false);
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const [processing, setProcessing] = useState(false);

  useEffect(() => setHydrated(true), []);

  const onCheckout = async () => {
    setProcessing(true);
    // Simulated webhook-ready POST /checkout flow
    await new Promise((r) => setTimeout(r, 1100));
    clear();
    toast.success("Payment confirmed");
    navigate({ to: "/checkout/success" });
  };

  if (!hydrated) {
    return <div className="mx-auto max-w-5xl px-6 py-24" />;
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-32 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">Your bag</p>
        <h1 className="mt-4 font-display text-5xl text-primary">Empty for now.</h1>
        <p className="mt-4 text-muted-foreground">
          When you find something you love, it will rest here.
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex items-center rounded-sm bg-primary px-8 py-4 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-accent"
        >
          Browse the edition
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="font-display text-5xl text-primary">Your bag</h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-border">
          {items.map((item) => (
            <li key={item.id} className="flex gap-6 py-6">
              <img
                src={item.image}
                alt={item.name}
                width={120}
                height={120}
                className="h-28 w-28 flex-none rounded-sm object-cover"
              />
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl text-foreground">{item.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => remove(item.id)}
                    aria-label="Remove"
                    className="text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center rounded-sm border border-border">
                    <button
                      onClick={() => setQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-2 text-muted-foreground transition-colors hover:text-primary"
                      aria-label="Decrease"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => {
                        if (item.quantity >= item.stock) {
                          toast.error(`Only ${item.stock} in stock`);
                          return;
                        }
                        setQuantity(item.id, item.quantity + 1);
                      }}
                      className="px-3 py-2 text-muted-foreground transition-colors hover:text-primary"
                      aria-label="Increase"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="font-display text-lg text-primary">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-md border border-border bg-card p-8 shadow-soft">
          <h2 className="font-display text-2xl text-primary">Summary</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd>Complimentary</dd>
            </div>
          </dl>
          <div className="mt-6 flex items-baseline justify-between border-t border-border pt-6">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Total
            </span>
            <span className="font-display text-2xl text-primary">
              {formatPrice(subtotal)}
            </span>
          </div>
          <button
            onClick={onCheckout}
            disabled={processing}
            className="mt-8 w-full rounded-sm bg-primary py-4 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-accent disabled:opacity-60"
          >
            {processing ? "Processing…" : "Proceed to checkout"}
          </button>
          <p className="mt-4 text-center text-[11px] text-muted-foreground">
            Secure payment via gateway redirect.
          </p>
        </aside>
      </div>
    </section>
  );
}
