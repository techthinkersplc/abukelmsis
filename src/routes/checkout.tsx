import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/products"; // Import the formatter

// Configuration
const BOT_TOKEN = "8586820552:AAHGOzry8APmtHoAFLy0SNdHOn8Wv3-naRM";
const CHAT_ID = "1951892460";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — አቡቀለምሲስ" },
      { name: "description", content: "Complete your order via Telegram." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const [hydrated, setHydrated] = useState(false);
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [processing, setProcessing] = useState(false);

  // Calculate total price
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
    if (!name || !phone || !address) {
      toast.error("Please fill in all fields");
      return;
    }

    setProcessing(true);

    // Added price per line item in Telegram
    const itemList = items
      .map(
        (item) =>
          `▪️ ${item.name} (x${item.quantity}) - ${formatPrice(item.price * item.quantity)}`,
      )
      .join("\n");

    const telegramMessage = `
🚀 **New Order: Abuqelemsis Gifts**
----------------------------
👤 **Customer:** ${name}
📞 **Phone:** ${phone}
📍 **Address:** ${address}

📦 **Items:**
${itemList}

💰 **Total Amount:** ${formatPrice(totalAmount)}
----------------------------
    `;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: telegramMessage,
            parse_mode: "Markdown",
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.description || "Failed to send");
      }

      clear();
      toast.success("Order sent to @AbuqelemsisGifts_bot!");
      navigate({ to: "/checkout/success" });
    } catch (error: any) {
      console.error("Telegram Error:", error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setProcessing(false);
    }
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
          <h2 className="font-display text-lg font-semibold text-foreground">Delivery Details</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+2519..."
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Delivery Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Addis Ababa, Ethiopia..."
                rows={3}
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-semibold text-foreground">Order Summary</h2>
          <ul className="mt-4 space-y-2 border-b border-border pb-4">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between text-sm text-muted-foreground">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span className="text-foreground font-medium">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          {/* Total display in UI */}
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm font-semibold text-foreground">Total</span>
            <span className="text-lg font-bold text-accent">{formatPrice(totalAmount)}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={processing}
          className="w-full rounded-full bg-primary py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent disabled:opacity-60"
        >
          {processing ? "Sending Order..." : `Send Order — ${formatPrice(totalAmount)}`}
        </button>
      </form>
    </section>
  );
}