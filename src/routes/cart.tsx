import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart-store";


export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — አቡቀለምሲስ" },
      { name: "description", content: "Review your selection and proceed to checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const [hydrated, setHydrated] = useState(false);
  const items = useCart((s) => s.items);
  
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);

  useEffect(() => setHydrated(true), []);

  if (!hydrated) return <div className="mx-auto max-w-4xl px-6 py-16" />;

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-display text-4xl text-primary">Your Cart</h1>
        <p className="mt-6 text-muted-foreground">Your cart is empty.</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm transition-colors hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-display text-4xl font-bold text-primary">Your Cart</h1>

      <div className="mt-8 space-y-4">
        <div className="rounded-2xl border border-border bg-card p-6">
          <ul className="divide-y divide-border">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 flex-none rounded-md object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base text-foreground truncate">{item.name}</h3>
                  <div className="mt-2 inline-flex items-center rounded-full border border-border">
                    <button
                      onClick={() => setQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-muted-foreground hover:text-primary"
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
                      className="px-3 py-1 text-muted-foreground hover:text-primary"
                      aria-label="Increase"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <button
                    onClick={() => remove(item.id)}
                    aria-label="Remove"
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Shipping calculated at checkout</p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm transition-colors hover:bg-secondary"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
            <Link
              to="/checkout"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent"
            >
              Checkout
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
