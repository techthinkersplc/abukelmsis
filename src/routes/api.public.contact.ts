import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const Schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(5).max(2000),
});

export const Route = createFileRoute("/api/public/contact")({
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
          return Response.json(
            { error: "Invalid input", details: parsed.error.issues },
            { status: 400 },
          );
        }

        const { error } = await supabaseAdmin
          .from("contact_submissions")
          .insert(parsed.data);
        if (error) {
          return Response.json({ error: error.message }, { status: 500 });
        }

        // Email notification would be sent here (e.g. Lovable Email or Nodemailer SMTP).
        return Response.json({ ok: true });
      },
    },
  },
});
