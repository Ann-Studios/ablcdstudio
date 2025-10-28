import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/LanguageProvider";

const projects = [
  {
    title: "Worldsmith",
    description: "Creative writing and publishing platform.",
    image: "/worldsmith.png",
  },
  {
    title: "100 Days Challenges",
    description: "Track your 100‑day journey with posts and progress.",
    image: "/portfolio/project-2.png",
  },
];

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
            {projects.map((p) => (
              <div key={p.title} className="rounded-lg border border-border/30 bg-card overflow-hidden">
                <div className="aspect-[16/9] w-full bg-muted">
                  {/* Place image files at public/portfolio/project-1.png etc. */}
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                </div>
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
