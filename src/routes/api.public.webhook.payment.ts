import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// Mocked Stripe/Chapa-style webhook. In production you would verify the
// gateway's HMAC signature here before trusting the payload.
const Schema = z.object({
  order_id: z.string().uuid(),
  signature: z.string().min(1),
});

export const Route = createFileRoute("/api/public/webhook/payment")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        const parsed = Schema.safeParse(body);
        if (!parsed.success) {
          return new Response("Invalid payload", { status: 400 });
        }

        // TODO: replace with real Stripe.webhooks.constructEvent / Chapa HMAC check.
        if (parsed.data.signature !== "demo") {
          return new Response("Invalid signature", { status: 401 });
        }

        const { error } = await supabaseAdmin
          .from("orders")
          .update({ status: "paid", paid_at: new Date().toISOString() })
          .eq("id", parsed.data.order_id)
          .eq("status", "pending");

        if (error) {
          return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        return Response.json({ received: true });
      },
    },
  },
});
