import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n/LanguageProvider";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

// Kkiapay globals provided by the SDK script
declare global {
  interface Window {
    openKkiapayWidget?: (options: Record<string, any>) => void;
    addKkiapayListener?: (event: string, cb: (data: any) => void) => void;
  }
}

const SUPPORTED_CURRENCIES = ["xof", "usd", "eur", "gbp", "ngn", "ghs", "xaf", "cad"] as const;

const Payments = () => {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const amount = parseFloat(params.get("amount") || "0");
  const reason = params.get("reason") || "Consultation Deposit";
  const initialCurrency = (params.get("currency") || "xof").toLowerCase();

  const [currency, setCurrency] = useState<string>(
    SUPPORTED_CURRENCIES.includes(initialCurrency as any) ? initialCurrency : "xof"
  );

  const callbackUrl = useMemo(() => window.location.href, []);
  const publicKey = import.meta.env.VITE_KKIAPAY_PUBLIC_KEY as string | undefined;
  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID as string | undefined;

  // Map site language to PayPal locale codes
  const paypalLocale = lang === "fr" ? "fr_FR" : "en_US";

  // Attach success listener to mark the deposit as paid and redirect back
  useEffect(() => {
    if (window.addKkiapayListener) {
      window.addKkiapayListener("success", () => {
        try { localStorage.setItem("consultationDepositPaid", "true"); } catch { }
        navigate("/#ai-consultation", { replace: true });
      });
    }
  }, [navigate]);

  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: "AW-17738011487/",
      });
    }
  }, []);

  const openPayment = () => {
    if (!publicKey) {
      console.error("Missing VITE_KKIAPAY_PUBLIC_KEY");
      return;
    }
    if (!window.openKkiapayWidget) {
      console.error("Kkiapay SDK not loaded");
      return;
    }
    if (currency !== "xof") return; // guard: only XOF is supported by Kkiapay
    const xofAmountInt = Math.max(0, Math.round(amount));
    if (xofAmountInt <= 0) return;
    window.openKkiapayWidget({
      amount: xofAmountInt,
      key: publicKey,
      sandbox: true,
      callback: callbackUrl,
    });
  };

  const isXof = currency === "xof";
  const payDisabled = amount <= 0;
  const showPayPal = !isXof && paypalClientId && amount > 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <section className="py-20 flex-1 pt-24">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('payments.title')}</h1>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            {t('payments.subtitle')}
          </p>

          <div className="rounded-lg border border-border/30 bg-card p-8 space-y-6">
            <div>
              <div className="text-sm text-muted-foreground">{reason}</div>
              <div className="text-2xl font-semibold">{amount.toFixed(2)} {currency.toUpperCase()}</div>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm">Currency</label>
              <select
                className="bg-background border border-border rounded px-3 py-2"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                {SUPPORTED_CURRENCIES.map((c) => (
                  <option key={c} value={c}>{c.toUpperCase()}</option>
                ))}
              </select>
            </div>

            {isXof ? (
              <Button onClick={openPayment} variant="hero" disabled={payDisabled || !publicKey}>
                {amount > 0 ? `${t('payments.pay')} ${amount.toFixed(2)} ${currency.toUpperCase()}` : t('ai.payment.payCta')}
              </Button>
            ) : showPayPal ? (
              <PayPalScriptProvider options={{ clientId: paypalClientId, currency: currency.toUpperCase(), locale: paypalLocale }}>
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      intent: "CAPTURE",
                      purchase_units: [
                        {
                          description: reason,
                          amount: {
                            currency_code: currency.toUpperCase(),
                            value: amount.toFixed(2),
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order!.capture().then(() => {
                      try { localStorage.setItem("consultationDepositPaid", "true"); } catch { }
                      navigate("/#ai-consultation", { replace: true });
                    });
                  }}
                  onError={(err) => {
                    console.error("PayPal error:", err);
                  }}
                />
              </PayPalScriptProvider>
            ) : (
              <p className="text-sm text-amber-600 dark:text-amber-400">
                {!paypalClientId
                  ? "Payment configuration missing. Please contact support."
                  : "Please select a valid currency and amount."}
              </p>
            )}
          </div>

          <div className="mt-10">
            <Link to="/" className="text-primary underline-offset-4 hover:underline">
              {t('payments.back')}
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Payments;
