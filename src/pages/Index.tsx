import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AIConsultationSection from "@/components/AIConsultationSection";
import { useEffect } from "react";

const Index = () => {

  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-17738011487',
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ServicesSection />
      <AIConsultationSection />
    </div>
  );
};

export default Index;
