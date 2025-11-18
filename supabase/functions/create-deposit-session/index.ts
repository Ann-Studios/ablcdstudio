// deno-lint-ignore-file no-explicit-any
// Supabase Edge Function: create-deposit-session
// Creates a Stripe Checkout Session and returns the URL

import Stripe from "https://esm.sh/stripe@16?target=deno";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { amount, currency = "usd", reason = "Consultation Deposit" } = await req.json();
    if (!amount || amount <= 0) throw new Error("Invalid amount");

    const secret = Deno.env.get("STRIPE_SECRET_KEY");
    const appUrl = Deno.env.get("APP_URL") ?? new URL(req.url).origin;
    if (!secret) throw new Error("Missing STRIPE_SECRET_KEY");

    const stripe = new Stripe(secret, { apiVersion: "2024-06-20" });

    const unit_amount = Math.round(Number(amount) * 100); // smallest currency unit

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency,
            product_data: { name: reason },
            unit_amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/payments/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/payments/cancel`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
      status: 200,
    });
  } catch (e) {
    console.error("Error creating deposit session:", e);
    const errorMessage = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
      status: 400,
    });
  }
});
