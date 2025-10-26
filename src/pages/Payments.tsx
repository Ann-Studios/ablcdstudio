import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/LanguageProvider";

const Payments = () => {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('payments.title')}</h1>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            {t('payments.subtitle')}
          </p>

          <div className="rounded-lg border border-border/30 bg-card p-8">
            <p className="text-sm text-muted-foreground">
              {t('payments.coming')}
            </p>
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
