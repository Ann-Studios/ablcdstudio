import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Palette, Smartphone, Globe, Database, Zap } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";

const ServicesSection = () => {
  const { t } = useI18n();

  const services = [
    { icon: Code, title: t('services.items.custom_dev.title'), description: t('services.items.custom_dev.description') },
    { icon: Palette, title: t('services.items.uiux.title'), description: t('services.items.uiux.description') },
    { icon: Smartphone, title: t('services.items.mobile.title'), description: t('services.items.mobile.description') },
    { icon: Globe, title: t('services.items.web.title'), description: t('services.items.web.description') },
    { icon: Database, title: t('services.items.backend.title'), description: t('services.items.backend.description') },
    { icon: Zap, title: t('services.items.ai_integration.title'), description: t('services.items.ai_integration.description') },
  ];

  return (
    <section id="services" className="py-24 bg-background/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            {t('services.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              className="bg-gradient-card border-border/20 hover:border-accent/30 transition-all duration-300 hover:shadow-glow-accent group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
