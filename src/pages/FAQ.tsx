import { useI18n } from "@/i18n/LanguageProvider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2 } from "lucide-react";

const FAQ = () => {
  const { t } = useI18n();

  const questions = ["q1", "q2", "q3", "q4", "q5", "q6"];

  return (
      <div className="container mx-auto px-4 py-16 flex-1 pt-24">

        <h1 className="text-4xl font-bold mb-4">
          {t("faqPage.title")}
        </h1>
        <p className="text-muted-foreground mb-16 max-w-2xl">
          {t("faqPage.subtitle")}
        </p>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {questions.map((q) => (
              <AccordionItem
                key={q}
                value={q}
                className="border border-border rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="text-lg font-semibold">
                    {t(`faqPage.questions.${q}.question`)}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 pt-2">
                  {t(`faqPage.questions.${q}.answer`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
      </div>
  );
};

export default FAQ;
