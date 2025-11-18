import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/LanguageProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const LegalMention = () => {
  const { lang } = useI18n();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex-1 pt-24">
        {/*<Link to="/" className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block">
          ← {lang === "fr" ? "Retour à l'accueil" : "Back to Home"}
        </Link>*/}

        <h1 className="text-4xl font-bold mb-8">
          {lang === "fr" ? "Mentions légales" : "Legal Mention"}
        </h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {lang === "fr" ? (
            <>
              <h2>Éditeur du site</h2>
              <p>
                ABLCD Studios<br />
                [Adresse complète]<br />
                Email : contact@ablcdstudios.dev
              </p>

              <h2>Directeur de publication</h2>
              <p>[Nom du directeur de publication]</p>

              <h2>Hébergement</h2>
              <p>
                Ce site est hébergé par Lovable<br />
                [Adresse de l'hébergeur]
              </p>
            </>
          ) : (
            <>
              <h2>Site Editor</h2>
              <p>
                ABLCD Studios<br />
                [Full address]<br />
                Email: contact@ablcdstudios.dev
              </p>

              <h2>Publication Director</h2>
              <p>[Name of publication director]</p>

              <h2>Hosting</h2>
              <p>
                This site is hosted by Lovable<br />
                [Host address]
              </p>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LegalMention;
