import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/LanguageProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const PrivacyPolicy = () => {
  const { lang } = useI18n();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex-1 pt-24">
        {/*<Link to="/" className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block">
          ← {lang === "fr" ? "Retour à l'accueil" : "Back to Home"}
        </Link>*/}

        <h1 className="text-4xl font-bold mb-8">
          {lang === "fr" ? "Politique de confidentialité" : "Privacy Policy"}
        </h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {lang === "fr" ? (
            <>
              <h2>Collecte des données</h2>
              <p>
                Nous collectons uniquement les données nécessaires au bon fonctionnement de nos services :
                nom, email, et informations sur votre projet.
              </p>

              <h2>Utilisation des données</h2>
              <p>
                Vos données sont utilisées uniquement pour vous contacter concernant votre demande de consultation
                et ne sont jamais partagées avec des tiers.
              </p>

              <h2>Protection des données</h2>
              <p>
                Nous utilisons des mesures de sécurité appropriées pour protéger vos données personnelles.
              </p>
            </>
          ) : (
            <>
              <h2>Data Collection</h2>
              <p>
                We only collect data necessary for the proper functioning of our services:
                name, email, and information about your project.
              </p>

              <h2>Data Usage</h2>
              <p>
                Your data is used only to contact you regarding your consultation request
                and is never shared with third parties.
              </p>

              <h2>Data Protection</h2>
              <p>
                We use appropriate security measures to protect your personal data.
              </p>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
