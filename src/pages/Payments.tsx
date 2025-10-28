import { Link, useSearchParams } from "react-router-dom";
import { useI18n } from "@/i18n/LanguageProvider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Payments = () => {
  const { t } = useI18n();
  const [params] = useSearchParams();
  const amount = parseFloat(params.get("amount") || "0");
  const reason = params.get("reason") || "Consultation Deposit";
  const currency = (params.get("currency") || "usd").toLowerCase();

  const startCheckout = async () => {
    if (amount <= 0) return;
    const { data, error } = await supabase.functions.invoke("create-deposit-session", {
      body: {
        amount,
        currency,
        reason,
      },
    });
    if (error) {
      console.error(error);
      return;
    }
    if (data?.url) {
      window.location.href = data.url as string;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('payments.title')}</h1>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            {t('payments.subtitle')}
          </p>

          <div className="rounded-lg border border-border/30 bg-card p-8 space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">{reason}</div>
              <div className="text-2xl font-semibold">{amount.toFixed(2)} {currency.toUpperCase()}</div>
            </div>
            <Button onClick={startCheckout} variant="hero" disabled={amount <= 0}>
              {amount > 0 ? `Pay ${amount.toFixed(2)} ${currency.toUpperCase()}` : t('ai.payment.payCta')}
            </Button>
          </div>

          <div className="mt-10">
            <Link to="/" className="text-primary underline-offset-4 hover:underline">
              {t('payments.back')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Payments;
