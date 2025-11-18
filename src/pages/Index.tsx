import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AIConsultationSection from "@/components/AIConsultationSection";
import Footer from "@/components/Footer";
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
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <HeroSection />
        <ServicesSection />
        <AIConsultationSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
