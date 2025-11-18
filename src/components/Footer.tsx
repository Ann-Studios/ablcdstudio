import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/LanguageProvider";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border bg-background">
      <section id="contact" className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-4 max-w-6xl mx-auto">
          {/* Left Column - Contact Section */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-muted-foreground mb-8">
              Have an inquiry? Contact us below.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a
                    href="mailto:contact@ablcdstudios.com"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    contact@ablcdstudios.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                {/* <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"> */}
                 {/* <Phone className="w-6 h-6 text-primary" /> */}
                {/* </div> */}
                <div>
                  {/* <h3 className="font-semibold mb-1">Phone</h3> */}
                  {/* <a
                    href="tel:+1234567890"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    +1 (234) 567-890
                  </a> */}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-sm text-muted-foreground">
                    Available Worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Footer Links */}
          <div className="flex flex-col justify-between">
            <nav className="flex flex-col gap-4">
              <Link
                to="/#services"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("footer.services")}
              </Link>
              <Link
                to="/#work-process"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("footer.process")}
              </Link>
              <Link
                to="/#faq"
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
                to="/terms-of-service"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("footer.terms")}
              </Link>
            </nav>
            
            <p className="text-sm text-muted-foreground mt-8">
              © {new Date().getFullYear()} ABLCD Studios. {t("footer.rights")}
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
