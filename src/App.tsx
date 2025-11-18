import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Portfolio from "./pages/Portfolio";
import Payments from "./pages/Payments";
import LegalMention from "./pages/LegalMention";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ConfidentialityPolicy from "./pages/ConfidentialityPolicy";
import TermsOfService from "./pages/TermsOfService";
import ServicesPage from "./pages/ServicesPage";
import WorkProcess from "./pages/WorkProcess";
import FAQ from "./pages/FAQ";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
        <div className="fixed top-4 right-4 z-50">
          <LanguageSwitcher />
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/work-process" element={<WorkProcess />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/legal-mention" element={<LegalMention />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/confidentiality-policy" element={<ConfidentialityPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
