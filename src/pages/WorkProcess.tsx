import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/LanguageProvider";
import Footer from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";

const WorkProcess = () => {
  const { t } = useI18n();

  const steps = [
    { key: "discovery", icon: "1" },
    { key: "design", icon: "2" },
    { key: "development", icon: "3" },
    { key: "testing", icon: "4" },
    { key: "deployment", icon: "5" },
    { key: "support", icon: "6" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-16 flex-1">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block">
          {t("processPage.back")}
        </Link>
        
        <h1 className="text-4xl font-bold mb-4">
          {t("processPage.title")}
        </h1>
        <p className="text-muted-foreground mb-16 max-w-2xl">
          {t("processPage.subtitle")}
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={step.key} className="relative">
                {index !== steps.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-border" />
                )}
                
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                      {step.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1 pb-8">
                    <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                      {t(`processPage.steps.${step.key}.title`)}
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {t(`processPage.steps.${step.key}.description`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WorkProcess;
