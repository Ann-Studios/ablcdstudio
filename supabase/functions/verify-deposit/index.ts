// deno-lint-ignore-file no-explicit-any
// Supabase Edge Function: verify-deposit
// Verifies a Stripe Checkout Session by id and returns its paid status

import Stripe from "https://esm.sh/stripe@16?target=deno";
import { corsHeaders } from "../create-deposit-session/index.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { session_id } = await req.json();
    if (!session_id) throw new Error("Missing session_id");

    const secret = Deno.env.get("STRIPE_SECRET_KEY");
    if (!secret) throw new Error("Missing STRIPE_SECRET_KEY");

    const stripe = new Stripe(secret, { apiVersion: "2024-06-20" });
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const paid = session.payment_status === "paid" || session.status === "complete";

    return new Response(JSON.stringify({ paid, session }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
      status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e?.message ?? e) }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
      status: 400,
    });
  }
});
