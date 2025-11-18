import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/LanguageProvider";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";

const ServicesPage = () => {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-16 flex-1">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block">
          {t("servicesPage.back")}
        </Link>
        
        <h1 className="text-4xl font-bold mb-4">
          {t("servicesPage.title")}
        </h1>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          {t("servicesPage.subtitle")}
        </p>

        <ServicesSection />
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
