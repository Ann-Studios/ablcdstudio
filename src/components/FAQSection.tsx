import { useI18n } from "@/i18n/LanguageProvider";
import { Accordion, AccordionTrigger, AccordionItem, AccordionContent } from "@/components/ui/accordion";

const FAQSection = () => {
    const { t } = useI18n();

    const questions = ["q1", "q2", "q3", "q4", "q5", "q6"];

                return (
        <section
            id="faq"
            className="py-24 bg-gradient-to-b from-background/50 to-background"
        >
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                        {t("faqPage.title")}
                    </h2>
                                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t("faqPage.subtitle")}
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="space-y-4">
                        {questions.map((q) => (
                            <AccordionItem key={q} value={q} className="border border-border rounded-lg px-6 bg-card">
                                <AccordionTrigger className="text-left hover:no-underline py-6">
                                    <span className="text-lg font-semibold">{t(`faqPage.questions.${q}.question`)}</span>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pb-6 pt-2">
                                    {t(`faqPage.questions.${q}.answer`)}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;