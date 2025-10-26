import React, { createContext, useContext, useMemo, useState, useEffect } from "react";

export type Language = "en" | "fr";

type Dict = Record<string, string | Dict>;

const translations: Record<Language, Dict> = {
  en: {
    hero: {
      badge: "AI-Powered Development Consultation",
      title: "Build Your Vision with AI-Guided Development",
      description:
        "Tell our AI about your project ideas and we'll transform them into reality. Get instant consultation and personalized development solutions.",
      cta: {
        consult: "Start AI Consultation",
        ourwork: "View Our Work",
      },
    },
    services: {
      title: "Our Services",
      subtitle: "From concept to deployment, we handle every aspect of your digital transformation",
      items: {
        custom_dev: {
          title: "Custom Development",
          description: "Full-stack web applications built with modern technologies and best practices.",
        },
        uiux: {
          title: "UI/UX Design",
          description:
            "Beautiful, intuitive interfaces that users love and convert visitors to customers.",
        },
        mobile: {
          title: "Mobile Apps",
          description: "Native and cross-platform mobile applications for iOS and Android.",
        },
        web: {
          title: "Web Solutions",
          description: "Responsive websites, e-commerce platforms, and progressive web apps.",
        },
        backend: {
          title: "Backend Systems",
          description: "Scalable APIs, databases, and cloud infrastructure for your applications.",
        },
        ai_integration: {
          title: "AI Integration",
          description: "Intelligent features powered by machine learning and artificial intelligence.",
        },
      },
    },
    portfolio: {
      title: "Our Portfolio",
      subtitle: "A curated selection of projects and case studies showcasing our work.",
      back: "← Back to Home",
    },
    payments: {
      title: "Payments",
      subtitle:
        "This is a placeholder payments page. Integrate your preferred provider (Stripe, Paystack, Flutterwave, etc.).",
      coming: "Coming soon: secure checkout, invoices, and subscriptions.",
      back: "← Back to Home",
    },
    notFound: {
      subtitle: "Oops! Page not found",
      back: "Return to Home",
    },
  },
  fr: {
    hero: {
      badge: "Consultation de développement assistée par IA",
      title: "Concrétisez votre vision avec un développement guidé par l'IA",
      description:
        "Parlez à notre IA de vos idées de projet et nous les transformerons en réalité. Obtenez une consultation instantanée et des solutions personnalisées.",
      cta: {
        consult: "Commencer la consultation IA",
        ourwork: "Voir nos réalisations",
      },
    },
    services: {
      title: "Nos services",
      subtitle:
        "De l'idée au déploiement, nous gérons chaque aspect de votre transformation numérique",
      items: {
        custom_dev: {
          title: "Développement sur mesure",
          description:
            "Applications web full‑stack construites avec des technologies modernes et les meilleures pratiques.",
        },
        uiux: {
          title: "Conception UI/UX",
          description:
            "Interfaces belles et intuitives que les utilisateurs adorent et qui convertissent les visiteurs en clients.",
        },
        mobile: {
          title: "Applications mobiles",
          description:
            "Applications natives et multiplateformes pour iOS et Android.",
        },
        web: {
          title: "Solutions web",
          description:
            "Sites responsives, plateformes e‑commerce et applications web progressives.",
        },
        backend: {
          title: "Systèmes backend",
          description:
            "API, bases de données et infrastructures cloud évolutives pour vos applications.",
        },
        ai_integration: {
          title: "Intégration de l'IA",
          description:
            "Fonctionnalités intelligentes propulsées par le machine learning et l'intelligence artificielle.",
        },
      },
    },
    portfolio: {
      title: "Notre portfolio",
      subtitle:
        "Une sélection de projets et d'études de cas mettant en valeur notre travail.",
      back: "← Retour à l'accueil",
    },
    payments: {
      title: "Paiements",
      subtitle:
        "Ceci est une page de paiement temporaire. Intégrez votre prestataire préféré (Stripe, Paystack, Flutterwave, etc.).",
      coming: "Bientôt disponible : paiement sécurisé, factures et abonnements.",
      back: "← Retour à l'accueil",
    },
    notFound: {
      subtitle: "Oups ! Page non trouvée",
      back: "Retour à l'accueil",
    },
  },
};

function getNested(dict: Dict, path: string): string | undefined {
  const result = path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, dict);
  return typeof result === "string" ? result : undefined;
}

type I18nContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Language | null;
    if (stored) setLangState(stored);
    else if (navigator.language?.toLowerCase().startsWith("fr")) setLangState("fr");
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  const value = useMemo<I18nContextType>(() => ({
    lang,
    setLang,
    t: (key: string) => getNested(translations[lang], key) ?? key,
  }), [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
};
