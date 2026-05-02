import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — አቡቀለምሲስ" },
      { name: "description", content: "Complete your order." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const [hydrated, setHydrated] = useState(false);
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const clear = useCart((s) => s.clear);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => setHydrated(true), []);

  if (!hydrated) return <div className="mx-auto max-w-3xl px-6 py-16" />;

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-primary">Nothing to checkout</h1>
        <Link to="/" className="mt-6 inline-block text-sm text-accent hover:underline">
          Continue shopping
        </Link>
      </section>
    );
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !address) {
      toast.error("Please fill in all fields");
      return;
    }
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 900));
    clear();
    toast.success("Order placed");
    navigate({ to: "/checkout/success" });
  };

  return (
    <section className="mx-auto max-w-3xl px-6 py-10">
      <Link
        to="/cart"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Cart
      </Link>
      <h1 className="mt-3 font-display text-4xl font-bold text-primary">Checkout</h1>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-semibold text-foreground">Shipping Details</h2>

          <div className="mt-4 space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Shipping Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St, City, Country"
                rows={3}
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-semibold text-foreground">Order Summary</h2>
          <ul className="mt-4 space-y-2">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium text-foreground">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-display text-xl font-bold text-foreground">
              {formatPrice(subtotal)}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={processing}
          className="w-full rounded-full bg-primary py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent disabled:opacity-60"
        >
          {processing ? "Processing…" : `Place Order — ${formatPrice(subtotal)}`}
        </button>
      </form>
    </section>
  );
}
