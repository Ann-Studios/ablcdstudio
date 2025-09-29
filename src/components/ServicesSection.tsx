import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Palette, Smartphone, Globe, Database, Zap } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Custom Development",
    description: "Full-stack web applications built with modern technologies and best practices.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces that users love and convert visitors to customers.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications for iOS and Android.",
  },
  {
    icon: Globe,
    title: "Web Solutions",
    description: "Responsive websites, e-commerce platforms, and progressive web apps.",
  },
  {
    icon: Database,
    title: "Backend Systems",
    description: "Scalable APIs, databases, and cloud infrastructure for your applications.",
  },
  {
    icon: Zap,
    title: "AI Integration",
    description: "Intelligent features powered by machine learning and artificial intelligence.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-24 bg-background/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From concept to deployment, we handle every aspect of your digital transformation
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