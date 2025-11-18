import { useI18n } from "@/i18n/LanguageProvider";
import { CheckCircle2 } from "lucide-react";

const WorkProcessSection = () => {
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
    <section
      id="work-process"
      className="py-24 bg-gradient-to-b from-background/50 to-background"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            {t("processPage.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("processPage.subtitle")}
          </p>
        </div>

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
    </section>
  );
};

export default WorkProcessSection;

