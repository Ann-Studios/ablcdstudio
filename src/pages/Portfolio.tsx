import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/LanguageProvider";

const Portfolio = () => {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('portfolio.title')}</h1>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            {t('portfolio.subtitle')}
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Replace these placeholders with real portfolio items */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-lg border border-border/30 bg-card p-6">
                <div className="h-40 w-full rounded-md bg-muted mb-4" />
                <h3 className="text-lg font-semibold mb-2">Project {i + 1}</h3>
                <p className="text-sm text-muted-foreground">
                  Brief description of the project and the value delivered.
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link to="/" className="text-primary underline-offset-4 hover:underline">
              {t('portfolio.back')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
