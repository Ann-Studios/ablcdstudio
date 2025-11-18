import React, { createContext, useContext, useMemo, useState, useEffect } from "react";

export type Language = "en" | "fr";

type DictValue = string | { [key: string]: DictValue };
type Dict = Record<string, DictValue>;

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
      viewProject: "View Project",
      projects: {
        worldsmith: {
          title: "Worldsmith",
          description: "Creative writing and publishing platform.",
        },
        hundredDays: {
          title: "100 Days Challenges",
          description: "Track your 100-day journey with posts and progress.",
        },
        gestionLibrairie: {
          title: "Gestion Librairie",
          description: "Library management system for book inventory and lending.",
        },
        mobileShowcase: {
          title: "Mobile Showcase",
          description: "Portfolio of mobile applications.",
        },
      },
      back: "← Back to Home",
    },
    payments: {
      title: "Payments",
      subtitle:
        "Complete your payment securely using your preferred method.",
      pay: "Pay",
      back: "← Back to Home",
    },
    notFound: {
      subtitle: "Oops! Page not found",
      back: "Return to Home",
    },
    ai: {
      sectionTitle: "AI Project Consultation",
      sectionSubtitle: "Describe your project to our AI assistant and get instant feedback",
      chatTitle: "Development Consultation Chat",
      chatDescription: "Tell us about your project requirements, timeline, and goals",
      initialMessage:
        "Hello! I'm your AI development consultant. Tell me about your project idea - what do you want to build? I'll help gather all the details and connect you with our development team.",
      prompts: {
        afterProjectType:
          "That sounds like an interesting project! What's your timeline for this project? And do you have any specific technology preferences?",
        afterTimeline: "Great! What's your budget range for this project?",
        afterBudget: "Perfect! Can you describe the main goals or features you want in this project?",
        thanks: "Thanks! Please provide your contact information so our team can reach out with a proposal.",
        askMore: "Can you tell me more about your project?",
      },
      inputPlaceholder: "Describe your project idea...",
      contact: {
        heading: "Let's Get You Connected",
        name: "Name *",
        email: "Email *",
        company: "Company",
        submit: "Submit Consultation Request",
      },
      payment: {
        heading: "Deposit",
        note: "20% deposit based on your budget",
        amount: "Amount to pay",
        payCta: "Pay 20% deposit",
        paid: "Deposit paid",
        required: "Please pay the 20% deposit before submitting.",
      },
      toast: {
        missingInfoTitle: "Missing Information",
        missingInfoDesc: "Please provide your name and email address.",
        successTitle: "Thank You!",
        successDesc: "Your consultation has been submitted. We'll be in touch within 24 hours.",
        errorTitle: "Error",
        errorDesc: "Something went wrong. Please try again.",
      },
    },
    footer: {
      rights: "All rights reserved.",
      legal: "Legal Mention",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      faq: "FAQ",
      services: "Services",
      process: "Work Process",
    },
    servicesPage: {
      title: "Our Services",
      subtitle: "Comprehensive development solutions tailored to your needs",
      back: "← Back to Home",
    },
    processPage: {
      title: "Our Work Process",
      subtitle: "How we transform your ideas into reality",
      back: "← Back to Home",
      steps: {
        discovery: {
          title: "Discovery & Planning",
          description: "We start by understanding your vision, goals, and requirements through detailed consultation.",
        },
        design: {
          title: "Design & Prototyping",
          description: "Our designers create intuitive interfaces and interactive prototypes for your approval.",
        },
        development: {
          title: "Development",
          description: "Our developers build your solution using modern technologies and best practices.",
        },
        testing: {
          title: "Testing & QA",
          description: "Rigorous testing ensures quality, performance, and security standards are met.",
        },
        deployment: {
          title: "Deployment",
          description: "We launch your application and ensure everything runs smoothly in production.",
        },
        support: {
          title: "Support & Maintenance",
          description: "Ongoing support and updates to keep your application running optimally.",
        },
      },
    },
    faqPage: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions about our services",
      back: "← Back to Home",
      questions: {
        q1: {
          question: "How long does a typical project take?",
          answer: "Project timelines vary based on complexity. A simple website takes 2-4 weeks, while complex applications can take 3-6 months. We'll provide a detailed timeline during consultation.",
        },
        q2: {
          question: "What technologies do you use?",
          answer: "We use modern, industry-standard technologies including React, Node.js, TypeScript, and cloud platforms like AWS and Supabase. We choose the best stack for your specific needs.",
        },
        q3: {
          question: "Do you provide post-launch support?",
          answer: "Yes! We offer maintenance packages and ongoing support to ensure your application stays updated, secure, and performs optimally.",
        },
        q4: {
          question: "What is your pricing model?",
          answer: "We offer flexible pricing based on project scope. After understanding your requirements, we provide a detailed quote. We require a 20% deposit to begin work.",
        },
        q5: {
          question: "Can you work with existing codebases?",
          answer: "Absolutely! We can take over existing projects, add features, fix bugs, or modernize legacy applications.",
        },
        q6: {
          question: "Do you sign NDAs?",
          answer: "Yes, we're happy to sign non-disclosure agreements to protect your intellectual property and confidential information.",
        },
      },
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
      viewProject: "Voir le projet",
      projects: {
        worldsmith: {
          title: "Worldsmith",
          description: "Plateforme d'écriture créative et de publication.",
        },
        hundredDays: {
          title: "100 Days Challenges",
          description: "Suivez votre parcours de 100 jours avec des publications et des progrès.",
        },
        gestionLibrairie: {
          title: "Gestion Librairie",
          description: "Système de gestion de bibliothèque pour l'inventaire et le prêt de livres.",
        },
        mobileShowcase: {
          title: "Mobile Showcase",
          description: "Portfolio d'applications mobiles.",
        },
      },
      back: "← Retour à l'accueil",
    },
    payments: {
      title: "Paiements",
      subtitle:
        "Complétez votre paiement en toute sécurité avec votre méthode préférée.",
      pay: "Payer",
      back: "← Retour à l'accueil",
    },
    notFound: {
      subtitle: "Oups ! Page non trouvée",
      back: "Retour à l'accueil",
    },
    ai: {
      sectionTitle: "Consultation de projet avec IA",
      sectionSubtitle: "Décrivez votre projet à notre assistant IA et obtenez un retour instantané",
      chatTitle: "Discussion de consultation",
      chatDescription: "Parlez-nous de vos besoins, de votre calendrier et de vos objectifs",
      initialMessage:
        "Bonjour ! Je suis votre consultant en développement propulsé par l'IA. Parlez-moi de votre idée de projet — que souhaitez-vous construire ? Je vous aiderai à rassembler les détails et à vous connecter à notre équipe.",
      prompts: {
        afterProjectType:
          "Cela semble intéressant ! Quel est votre calendrier pour ce projet ? Avez-vous des préférences technologiques ?",
        afterTimeline: "Parfait ! Quel est votre budget pour ce projet ?",
        afterBudget: "Très bien ! Pouvez-vous décrire les objectifs ou fonctionnalités principaux ?",
        thanks: "Merci ! Veuillez fournir vos coordonnées pour que notre équipe vous envoie une proposition.",
        askMore: "Pouvez-vous m'en dire plus sur votre projet ?",
      },
      inputPlaceholder: "Décrivez votre idée de projet...",
      contact: {
        heading: "Mettons-vous en relation",
        name: "Nom *",
        email: "E-mail *",
        company: "Société",
        submit: "Envoyer la demande de consultation",
      },
      payment: {
        heading: "Acompte",
        note: "Acompte de 20% basé sur votre budget",
        amount: "Montant à payer",
        payCta: "Payer 20% d'acompte",
        paid: "Acompte payé",
        required: "Veuillez payer l'acompte de 20% avant de soumettre.",
      },
      toast: {
        missingInfoTitle: "Informations manquantes",
        missingInfoDesc: "Veuillez indiquer votre nom et votre adresse e-mail.",
        successTitle: "Merci !",
        successDesc: "Votre demande a été envoyée. Nous vous contacterons sous 24 heures.",
        errorTitle: "Erreur",
        errorDesc: "Un problème est survenu. Veuillez réessayer.",
      },
    },
    footer: {
      rights: "Tous droits réservés.",
      legal: "Mentions légales",
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation",
      faq: "FAQ",
      services: "Services",
      process: "Processus de travail",
    },
    servicesPage: {
      title: "Nos services",
      subtitle: "Solutions de développement complètes adaptées à vos besoins",
      back: "← Retour à l'accueil",
    },
    processPage: {
      title: "Notre processus de travail",
      subtitle: "Comment nous transformons vos idées en réalité",
      back: "← Retour à l'accueil",
      steps: {
        discovery: {
          title: "Découverte et planification",
          description: "Nous commençons par comprendre votre vision, vos objectifs et vos exigences grâce à une consultation détaillée.",
        },
        design: {
          title: "Conception et prototypage",
          description: "Nos designers créent des interfaces intuitives et des prototypes interactifs pour votre approbation.",
        },
        development: {
          title: "Développement",
          description: "Nos développeurs construisent votre solution en utilisant des technologies modernes et les meilleures pratiques.",
        },
        testing: {
          title: "Tests et assurance qualité",
          description: "Des tests rigoureux garantissent que les normes de qualité, de performance et de sécurité sont respectées.",
        },
        deployment: {
          title: "Déploiement",
          description: "Nous lançons votre application et nous assurons que tout fonctionne parfaitement en production.",
        },
        support: {
          title: "Support et maintenance",
          description: "Support continu et mises à jour pour maintenir votre application en fonctionnement optimal.",
        },
      },
    },
    faqPage: {
      title: "Questions fréquemment posées",
      subtitle: "Trouvez des réponses aux questions courantes sur nos services",
      back: "← Retour à l'accueil",
      questions: {
        q1: {
          question: "Combien de temps dure un projet typique ?",
          answer: "Les délais des projets varient selon la complexité. Un site web simple prend 2 à 4 semaines, tandis que les applications complexes peuvent prendre 3 à 6 mois. Nous fournirons un calendrier détaillé lors de la consultation.",
        },
        q2: {
          question: "Quelles technologies utilisez-vous ?",
          answer: "Nous utilisons des technologies modernes et standard de l'industrie, notamment React, Node.js, TypeScript et des plateformes cloud comme AWS et Supabase. Nous choisissons la meilleure stack pour vos besoins spécifiques.",
        },
        q3: {
          question: "Fournissez-vous un support après le lancement ?",
          answer: "Oui ! Nous proposons des forfaits de maintenance et un support continu pour garantir que votre application reste à jour, sécurisée et performante.",
        },
        q4: {
          question: "Quel est votre modèle de tarification ?",
          answer: "Nous offrons une tarification flexible basée sur la portée du projet. Après avoir compris vos besoins, nous fournissons un devis détaillé. Nous demandons un acompte de 20% pour commencer les travaux.",
        },
        q5: {
          question: "Pouvez-vous travailler avec des bases de code existantes ?",
          answer: "Absolument ! Nous pouvons reprendre des projets existants, ajouter des fonctionnalités, corriger des bugs ou moderniser des applications héritées.",
        },
        q6: {
          question: "Signez-vous des NDA ?",
          answer: "Oui, nous sommes heureux de signer des accords de non-divulgation pour protéger votre propriété intellectuelle et vos informations confidentielles.",
        },
      },
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
