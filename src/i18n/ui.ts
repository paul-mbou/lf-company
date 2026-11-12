export type Lang = 'fr' | 'en';

export type PoleId = 'data' | 'mobile' | 'systems' | 'web' | 'training';

export type Copy = {
  meta: { title: string; description: string };
  skip: string;
  nav: {
    poles: string;
    solutions: string;
    news: string;
    contact: string;
    learning: string;
    learningNew: string;
    write: string;
    menu: string;
    close: string;
    primary: string;
    themeLight: string;
    themeDark: string;
    themeToDark: string;
    themeToLight: string;
    langLabel: string;
  };
  hero: {
    place: string;
    title: string;
    lede: string;
    primary: string;
    secondary: string;
    photoAlt: string;
    hudLabel: string;
    hudMeta: string;
  };
  poles: {
    label: string;
    title: string;
    intro: string;
    cta: string;
    items: { id: PoleId; short: string; title: string; summary: string; body: string }[];
  };
  solutions: {
    title: string;
    intro: string;
    write: string;
    items: { pole: PoleId; group: string; title: string; text: string }[];
  };
  approach: {
    title: string;
    lead: string;
    photoAlt: string;
    items: { title: string; text: string }[];
  };
  news: {
    title: string;
    items: { iso: string; when: string; kicker: string; title: string }[];
  };
  learn: { title: string; text: string; cta: string; photoAlt: string };
  stack: { title: string; intro: string };
  close: { title: string; text: string; cta: string };
  contact: {
    title: string;
    lede: string;
    phone: string;
    email: string;
    place: string;
    learning: string;
  };
  form: {
    name: string;
    company: string;
    email: string;
    phone: string;
    phoneHint: string;
    pole: string;
    polePlaceholder: string;
    message: string;
    submit: string;
    note: string;
    subjectPrefix: string;
    successTitle: string;
    successBody: string;
    errors: { summary: string; name: string; email: string; pole: string; message: string };
  };
  footer: { rights: string };
  notFound: { title: string; text: string; home: string; write: string; other: string };
};

const fr: Copy = {
  meta: {
    title: 'LF Company — La donnée au service du terrain',
    description:
      'LF Company, à Levallois-Perret : data, applications, systèmes, web et formation. Des solutions numériques proches du terrain.',
  },
  skip: 'Aller au contenu',
  nav: {
    poles: 'Pôles',
    solutions: 'Solutions',
    news: 'Actualités',
    contact: 'Contact',
    learning: 'E-learning',
    learningNew: 's’ouvre dans un nouvel onglet',
    write: 'Écrire',
    menu: 'Menu',
    close: 'Fermer',
    primary: 'Navigation principale',
    themeLight: 'Passer au thème sombre',
    themeDark: 'Passer au thème clair',
    themeToDark: 'Sombre',
    themeToLight: 'Clair',
    langLabel: 'English version',
  },
  hero: {
    place: 'Levallois-Perret',
    title: 'La donnée au service du terrain.',
    lede: 'LF Company accompagne les entreprises qui veulent y voir clair : reporting, applications, systèmes, présence web et formation. Le travail part de vos contraintes, pas d’un catalogue.',
    primary: 'Parler d’un projet',
    secondary: 'Voir les cinq pôles',
    photoAlt: 'Illustration 3D : sculpture de données holographique en verre et nœuds verts.',
    hudLabel: 'Signal terrain',
    hudMeta: 'Power BI · CRM · LMS',
  },
  stack: {
    title: 'Le socle technique.',
    intro: 'Les outils que nous branchons sur le terrain : data, ERP, cloud, apps et matériel.',
  },
  poles: {
    label: 'Pôles d’expertise',
    title: 'Cinq pôles.',
    intro: 'Un seul sujet à la fois. Choisissez celui qui correspond à votre besoin.',
    cta: 'En parler',
    items: [
      {
        id: 'data',
        short: 'Data',
        title: 'Business intelligence et data',
        summary: 'Des tableaux de bord pour décider, pas pour décorer.',
        body: 'Power BI et reportings reliés à l’activité réelle. Un indicateur a sa place s’il montre quoi surveiller, quoi corriger, et quoi laisser.',
      },
      {
        id: 'mobile',
        short: 'Mobile',
        title: 'Applications mobiles',
        summary: 'La force de vente et le reporting, dans la poche.',
        body: 'Des applications reliées au CRM et à l’ERP. Elles suivent l’activité commerciale, rassemblent les données client et remplacent les tableaux éparpillés.',
      },
      {
        id: 'systems',
        short: 'Systèmes',
        title: 'Systèmes, IT et sécurité',
        summary: 'Un poste de travail qui tient, et un œil sur le risque.',
        body: 'Ordinateurs Dell et HP, écrans IIYAMA, et une attention à la sécurité des systèmes. L’outil doit survivre à une journée de travail ordinaire.',
      },
      {
        id: 'web',
        short: 'Web',
        title: 'Communication digitale et web',
        summary: 'Une présence en ligne qui ressemble à l’offre.',
        body: 'Sites et communication alignés sur ce que vous faites vraiment. Le but est d’être compris vite, par les clients qui vous cherchent.',
      },
      {
        id: 'training',
        short: 'Formation',
        title: 'Formation et e-learning',
        summary: 'Faire monter les équipes, sans les sortir du métier.',
        body: 'Une plateforme LMS et des parcours interactifs. La formation suit le rythme du travail, sur un espace déjà en ligne.',
      },
    ],
  },
  solutions: {
    title: 'Ce que nous mettons en place',
    intro: 'Chaque ligne ouvre un message, avec le pôle déjà indiqué.',
    write: 'Écrire',
    items: [
      {
        pole: 'data',
        group: 'Data',
        title: 'Power BI et reporting',
        text: 'Des tableaux de bord dynamiques, branchés sur vos données.',
      },
      {
        pole: 'data',
        group: 'Data',
        title: 'ERP Odoo',
        text: 'Installation et réglage des modules métier, pour une gestion suivie.',
      },
      {
        pole: 'mobile',
        group: 'Mobile',
        title: 'Application mobile',
        text: 'Un outil relié au CRM et à l’ERP, pour la vente et le reporting.',
      },
      {
        pole: 'mobile',
        group: 'Mobile',
        title: 'Pilotage commercial',
        text: 'Voir l’activité de la force de vente sans attendre la fin du mois.',
      },
      {
        pole: 'training',
        group: 'Formation',
        title: 'Formation en ligne',
        text: 'Un LMS et des parcours pour les équipes.',
      },
      {
        pole: 'systems',
        group: 'Équipements',
        title: 'Matériel IT',
        text: 'Écrans tactiles IIYAMA, PC Dell et HP, accessoires.',
      },
    ],
  },
  approach: {
    title: 'Ce qui guide le travail',
    lead: 'Clarifier les données, structurer l’organisation ou renforcer la présence en ligne : on part de votre réalité.',
    photoAlt: 'Illustration 3D : tablette holographique et flux de données sur grille terrain.',
    items: [
      {
        title: 'Le terrain d’abord',
        text: 'Les solutions partent des métiers et des contraintes opérationnelles, pas d’une démonstration générique.',
      },
      {
        title: 'Une lecture de votre cas',
        text: 'Chaque entreprise est regardée pour elle-même. La proposition suit vos objectifs.',
      },
      {
        title: 'Une veille tenue',
        text: 'IA, cloud, cyberdéfense : nous les retenons quand ils donnent une avance concrète.',
      },
      {
        title: 'Un cadre tenu',
        text: 'Qualité, fiabilité, sécurité. Ce qui est livré doit pouvoir servir longtemps.',
      },
    ],
  },
  news: {
    title: 'Actualités',
    items: [
      {
        iso: '2026-01',
        when: 'Janvier 2026',
        kicker: 'Recrutement',
        title: 'Deux postes sont ouverts chez LF Company.',
      },
      {
        iso: '2025-12',
        when: 'Décembre 2025',
        kicker: 'Application',
        title: 'Une application mobile de reporting est en cours de création.',
      },
      {
        iso: '',
        when: 'Partenariat',
        kicker: 'Équipements',
        title: 'Dell, HP et IIYAMA fournissent le matériel.',
      },
    ],
  },
  learn: {
    title: 'La formation a déjà une adresse.',
    text: 'La plateforme e-learning accueille les parcours. Les équipes avancent sans quitter leur métier.',
    cta: 'Ouvrir l’e-learning',
    photoAlt: 'Illustration 3D : modules de formation holographiques autour d’un noyau data.',
  },
  close: {
    title: 'Parlez-nous de l’opérationnel.',
    text: 'Un message court suffit. Nous revenons vers vous depuis Levallois-Perret.',
    cta: 'Écrire',
  },
  contact: {
    title: 'Écrire à LF Company',
    lede: 'Décrivez le contexte. Si vous connaissez déjà le pôle, indiquez-le : la réponse sera plus directe.',
    phone: 'Téléphone',
    email: 'Email',
    place: 'Lieu',
    learning: 'E-learning',
  },
  form: {
    name: 'Nom',
    company: 'Société',
    email: 'Email',
    phone: 'Téléphone',
    phoneHint: 'facultatif',
    pole: 'Pôle',
    polePlaceholder: 'Choisir un pôle',
    message: 'Message',
    submit: 'Préparer le message',
    note: 'Le bouton ouvre votre messagerie avec le texte prêt. Rien n’est envoyé sans vous.',
    subjectPrefix: 'Projet',
    successTitle: 'Le message est prêt.',
    successBody: 'Votre messagerie devrait s’ouvrir. Si rien ne se passe, écrivez à contact@lf-company.com.',
    errors: {
      summary: 'Le message ne peut pas encore partir.',
      name: 'Indiquez votre nom.',
      email: 'Indiquez un email valide.',
      pole: 'Choisissez un pôle.',
      message: 'Décrivez le contexte en quelques lignes.',
    },
  },
  footer: { rights: 'Tous droits réservés.' },
  notFound: {
    title: 'Cette page n’existe pas.',
    text: 'Le lien est peut-être ancien.',
    home: 'Accueil',
    write: 'Écrire',
    other: 'English home',
  },
};

const en: Copy = {
  meta: {
    title: 'LF Company — Field work, made readable',
    description:
      'LF Company in Levallois-Perret: data, applications, systems, web, and training. Digital work that stays close to the field.',
  },
  skip: 'Skip to content',
  nav: {
    poles: 'Practices',
    solutions: 'Solutions',
    news: 'News',
    contact: 'Contact',
    learning: 'E-learning',
    learningNew: 'opens in a new tab',
    write: 'Write',
    menu: 'Menu',
    close: 'Close',
    primary: 'Primary',
    themeLight: 'Switch to dark theme',
    themeDark: 'Switch to light theme',
    themeToDark: 'Dark',
    themeToLight: 'Light',
    langLabel: 'Version française',
  },
  hero: {
    place: 'Levallois-Perret',
    title: 'Field work, made readable.',
    lede: 'LF Company helps companies see what is actually happening: reporting, applications, systems, web, and training. The work starts from your operations, not from a catalogue.',
    primary: 'Talk about a project',
    secondary: 'See the five practices',
    photoAlt: '3D illustration: holographic glass data sculpture with green nodes.',
    hudLabel: 'Field signal',
    hudMeta: 'Power BI · CRM · LMS',
  },
  stack: {
    title: 'The technical stack.',
    intro: 'The tools we wire into operations: data, ERP, cloud, apps, and hardware.',
  },
  poles: {
    label: 'Practices',
    title: 'Five practices.',
    intro: 'One subject at a time. Choose the one that matches the need.',
    cta: 'Talk about this',
    items: [
      {
        id: 'data',
        short: 'Data',
        title: 'Business intelligence and data',
        summary: 'Dashboards for decisions, not for decoration.',
        body: 'Power BI and reporting tied to the real activity. An indicator earns its place when it shows what to watch, what to fix, and what to leave alone.',
      },
      {
        id: 'mobile',
        short: 'Mobile',
        title: 'Mobile applications',
        summary: 'Sales teams and reporting, in a pocket.',
        body: 'Applications connected to the CRM and the ERP. They follow commercial activity, keep client data in one place, and replace scattered spreadsheets.',
      },
      {
        id: 'systems',
        short: 'Systems',
        title: 'IT systems and security',
        summary: 'A workstation that holds up, and a look at the risk.',
        body: 'Dell and HP computers, IIYAMA screens, and care for the security of the systems. The tool has to survive an ordinary workday.',
      },
      {
        id: 'web',
        short: 'Web',
        title: 'Digital communication and web',
        summary: 'An online presence that matches the offer.',
        body: 'Sites and communication aligned with what you actually do. The aim is to be understood quickly by the clients who are looking for you.',
      },
      {
        id: 'training',
        short: 'Training',
        title: 'Training and e-learning',
        summary: 'Raise the team’s skill without pulling them off the job.',
        body: 'An LMS and interactive paths. Training follows the pace of the work, on a platform that is already online.',
      },
    ],
  },
  solutions: {
    title: 'What we put in place',
    intro: 'Each line opens a message, with the practice already selected.',
    write: 'Write',
    items: [
      {
        pole: 'data',
        group: 'Data',
        title: 'Power BI and reporting',
        text: 'Dashboards connected to your data.',
      },
      {
        pole: 'data',
        group: 'Data',
        title: 'Odoo ERP',
        text: 'Setup and tuning of the business modules.',
      },
      {
        pole: 'mobile',
        group: 'Mobile',
        title: 'Mobile application',
        text: 'A tool linked to the CRM and the ERP, for sales and reporting.',
      },
      {
        pole: 'mobile',
        group: 'Mobile',
        title: 'Sales steering',
        text: 'See field activity without waiting for the end of the month.',
      },
      {
        pole: 'training',
        group: 'Training',
        title: 'Online training',
        text: 'An LMS and paths for the teams.',
      },
      {
        pole: 'systems',
        group: 'Equipment',
        title: 'IT hardware',
        text: 'IIYAMA touch screens, Dell and HP PCs, accessories.',
      },
    ],
  },
  approach: {
    title: 'What guides the work',
    lead: 'Clarify the data, structure the organisation, or strengthen the online presence: we start from your reality.',
    photoAlt: '3D illustration: holographic tablet and data streams over a terrain grid.',
    items: [
      {
        title: 'The field first',
        text: 'Solutions start from the job and the operational constraints, not from a generic demo.',
      },
      {
        title: 'A reading of your case',
        text: 'Each company is looked at on its own. The proposal follows your objectives.',
      },
      {
        title: 'A kept watch',
        text: 'AI, cloud, cyber defence: we keep them when they give a concrete advantage.',
      },
      {
        title: 'A held standard',
        text: 'Quality, reliability, security. What is delivered has to keep serving.',
      },
    ],
  },
  news: {
    title: 'News',
    items: [
      {
        iso: '2026-01',
        when: 'January 2026',
        kicker: 'Hiring',
        title: 'Two roles are open at LF Company.',
      },
      {
        iso: '2025-12',
        when: 'December 2025',
        kicker: 'Product',
        title: 'A mobile reporting application is being built.',
      },
      {
        iso: '',
        when: 'Partnership',
        kicker: 'Equipment',
        title: 'Dell, HP, and IIYAMA supply the hardware.',
      },
    ],
  },
  learn: {
    title: 'Training already has an address.',
    text: 'The e-learning platform hosts the paths. Teams move forward without leaving the job.',
    cta: 'Open e-learning',
    photoAlt: '3D illustration: holographic training modules orbiting a data core.',
  },
  close: {
    title: 'Tell us about the operation.',
    text: 'A short message is enough. We reply from Levallois-Perret.',
    cta: 'Write',
  },
  contact: {
    title: 'Write to LF Company',
    lede: 'Describe the context. If you already know the practice, select it: the reply will be more direct.',
    phone: 'Phone',
    email: 'Email',
    place: 'Place',
    learning: 'E-learning',
  },
  form: {
    name: 'Name',
    company: 'Company',
    email: 'Email',
    phone: 'Phone',
    phoneHint: 'optional',
    pole: 'Practice',
    polePlaceholder: 'Choose a practice',
    message: 'Message',
    submit: 'Prepare the message',
    note: 'The button opens your mail app with the text ready. Nothing is sent without you.',
    subjectPrefix: 'Project',
    successTitle: 'The message is ready.',
    successBody: 'Your mail app should open. If nothing happens, write to contact@lf-company.com.',
    errors: {
      summary: 'The message cannot be prepared yet.',
      name: 'Enter your name.',
      email: 'Enter a valid email.',
      pole: 'Choose a practice.',
      message: 'Describe the context in a few lines.',
    },
  },
  footer: { rights: 'All rights reserved.' },
  notFound: {
    title: 'This page does not exist.',
    text: 'The link may be out of date.',
    home: 'Home',
    write: 'Write',
    other: 'Accueil en français',
  },
};

export const copy: Record<Lang, Copy> = { fr, en };

export function getCopy(lang: Lang): Copy {
  return copy[lang];
}

export function otherLang(lang: Lang): Lang {
  return lang === 'fr' ? 'en' : 'fr';
}

export function homePath(lang: Lang): string {
  return lang === 'fr' ? '/' : '/en';
}

export function contactPath(lang: Lang): string {
  return lang === 'fr' ? '/contact' : '/en/contact';
}

export const LMS_URL = 'https://lms-web.lf-company.com';
export const PHONE = '+33767828386';
export const PHONE_LABEL = '+33 7 67 82 83 86';
export const EMAIL = 'contact@lf-company.com';
export const PLACE = 'Levallois-Perret, France';
