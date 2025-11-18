import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/LanguageProvider";
import Footer from "@/components/Footer";

const ConfidentialityPolicy = () => {
  const { lang } = useI18n();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-16 flex-1">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block">
          ← {lang === "fr" ? "Retour à l'accueil" : "Back to Home"}
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">
          {lang === "fr" ? "Politique de confidentialité" : "Confidentiality Policy"}
        </h1>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {lang === "fr" ? (
            <>
              <h2>Confidentialité des projets</h2>
              <p>
                Toutes les informations concernant vos projets sont strictement confidentielles.
                Nous nous engageons à ne jamais divulguer les détails de vos projets sans votre autorisation expresse.
              </p>
              
              <h2>Protection des informations sensibles</h2>
              <p>
                Les données techniques et stratégiques de vos projets sont stockées de manière sécurisée
                et ne sont accessibles qu'aux membres de notre équipe directement impliqués dans votre projet.
              </p>
            </>
          ) : (
            <>
              <h2>Project Confidentiality</h2>
              <p>
                All information regarding your projects is strictly confidential.
                We commit to never disclose details of your projects without your express authorization.
              </p>
              
              <h2>Protection of Sensitive Information</h2>
              <p>
                Technical and strategic data from your projects is stored securely
                and is only accessible to members of our team directly involved in your project.
              </p>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConfidentialityPolicy;
