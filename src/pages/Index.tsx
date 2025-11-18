import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WorkProcessSection from "@/components/WorkProcessSection";
import AIConsultationSection from "@/components/AIConsultationSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import FAQSection from "@/components/FAQSection";

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
      <Navbar />
      <div className="flex-1 pt-16">
        <HeroSection />
        <ServicesSection />
        <WorkProcessSection />
        <AIConsultationSection />
        <FAQSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;