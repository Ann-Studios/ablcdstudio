import { Link, useLocation } from "react-router-dom";
import { useI18n } from "@/i18n/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Navbar = () => {
  const { t } = useI18n();
  const location = useLocation();

  const scrollToServices = () => {
    if (location.pathname !== "/") {
      // If not on home page, navigate to home and then scroll
      window.location.href = "/#services";
    } else {
      // If on home page, just scroll
      const servicesSection = document.getElementById("services");
      servicesSection?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    if (location.pathname !== "/") {
      // If not on home page, navigate to home and then scroll
      window.location.href = "/#contact";
    } else {
      // If on home page, just scroll
      const contactSection = document.getElementById("contact");
      contactSection?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToWorkProcess = () => {
    if (location.pathname !== "/") {
      // If not on home page, navigate to home and then scroll
      window.location.href = "/#work-process";
    } else {
      // If on home page, just scroll
      const workProcessSection = document.getElementById("work-process");
      workProcessSection?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            ABLCD Studios
          </Link>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToServices}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.services")}
            </button>
            <button
              onClick={scrollToWorkProcess}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.process")}
            </button>
            <button
              onClick={scrollToContact}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </button>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

