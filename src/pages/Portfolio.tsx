import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/LanguageProvider";
import { useEffect } from "react";

const projectsData = [
  {
    key: "worldsmith",
    image: "/portfolio/worldsmith.png",
    url: "https://worldsmith-blueprint.vercel.app/",
  },
  {
    key: "hundredDays",
    image: "/portfolio/100days.png",
    url: "https://100dayschallenges.vercel.app/",
  },
  {
    key: "gestionLibrairie",
    image: "/portfolio/gestion-librairie.png",
    url: "https://gestionlibrairie-smoky.vercel.app/",
  },
  {
    key: "mobileShowcase",
    image: "/portfolio/mobile-showcase.png",
    url: "https://mobile-showcase.vercel.app/",
  },
];

const Portfolio = () => {
  const { t } = useI18n();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-17738011487',
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("portfolio.title")}
          </h1>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            {t("portfolio.subtitle")}
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projectsData.map((p) => (
              <div
                key={p.key}
                className="rounded-lg border border-border/30 bg-card overflow-hidden flex flex-col"
              >
                <div className="aspect-[16/9] w-full bg-muted">
                  <img
                    src={p.image}
                    alt={t(`portfolio.projects.${p.key}.title`)}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{t(`portfolio.projects.${p.key}.title`)}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t(`portfolio.projects.${p.key}.description`)}
                    </p>
                  </div>
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary hover:text-background transition-colors"
                    >
                      {t("portfolio.viewProject")}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              to="/"
              className="text-primary underline-offset-4 hover:underline"
            >
              {t("portfolio.back")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;