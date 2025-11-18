import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/LanguageProvider";

const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ABLCD Studios. {t("footer.rights")}
          </p>
          
          <nav className="flex flex-wrap gap-6 justify-center">
            <Link
              to="/services"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.services")}
            </Link>
            <Link
              to="/work-process"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.process")}
            </Link>
            <Link
              to="/faq"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.faq")}
            </Link>
            <Link
              to="/legal-mention"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.legal")}
            </Link>
            <Link
              to="/privacy-policy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              to="/confidentiality-policy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.confidentiality")}
            </Link>
            <Link
              to="/terms-of-service"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.terms")}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
