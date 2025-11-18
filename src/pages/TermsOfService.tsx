import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/LanguageProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const TermsOfService = () => {
  const { lang } = useI18n();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex-1 pt-24">
        {/*<Link to="/" className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block">
          ← {lang === "fr" ? "Retour à l'accueil" : "Back to Home"}
        </Link>*/}  

        <h1 className="text-4xl font-bold mb-8">
          {lang === "fr" ? "Conditions d'utilisation" : "Terms of Service"}
        </h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {lang === "fr" ? (
            <>
              <h2>Acceptation des conditions</h2>
              <p>
                En utilisant nos services, vous acceptez d'être lié par ces conditions d'utilisation.
              </p>

              <h2>Services proposés</h2>
              <p>
                ABLCD Studios offre des services de développement web, mobile et de consultation en IA.
              </p>

              <h2>Responsabilités</h2>
              <p>
                Nous nous engageons à fournir des services de qualité professionnelle selon les standards de l'industrie.
              </p>
            </>
          ) : (
            <>
              <h2>Acceptance of Terms</h2>
              <p>
                By using our services, you agree to be bound by these terms of service.
              </p>

              <h2>Services Offered</h2>
              <p>
                ABLCD Studios offers web development, mobile development, and AI consultation services.
              </p>

              <h2>Responsibilities</h2>
              <p>
                We are committed to providing professional quality services according to industry standards.
              </p>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;
