// Import additional translations
import { mergeTranslations } from './add-translations.js';

// Complete translation system
let translations = {
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.process': 'Process',
        'nav.services': 'Services',
        'nav.requirements': 'Requirements',
        'nav.faq': 'FAQ',
        'nav.contact': 'Contact',
        'nav.joinWaitlist': 'Join Waitlist',
        
        // Hero
        'hero.title': 'Bridging Healthcare Talent to German Excellence',
        'hero.subtitle': 'Strategic workforce solutions connecting qualified African nursing professionals with leading German medical institutions through comprehensive integration support and career development pathways.',
        
        // About
        'about.title': 'About Us',
        'about.strategic.title': 'Strategic Healthcare Solutions',
        'about.strategic.text': 'Healthcare Careers Bridge addresses a critical challenge facing Europe\'s healthcare sector: the growing demand for qualified nursing professionals. With Germany experiencing a shortage of over 200,000 healthcare workers, we provide a systematic solution by connecting highly skilled African nurses with sustainable career opportunities in German medical institutions.',
        'about.approach.title': 'Our Approach',
        'about.approach.text1': 'We have developed a comprehensive pathway program that transforms international nursing talent into integrated members of Germany\'s healthcare workforce. Our evidence-based methodology encompasses linguistic preparation, credential harmonization, cultural integration, and long-term career development support.',
        'about.approach.text2': 'Through strategic partnerships with leading healthcare institutions across Germany, we ensure our candidates are placed in environments where they can thrive professionally while contributing to the delivery of exceptional patient care. Our success is measured not just by placements, but by the lasting careers we help build.',
        'about.mission.title': 'Mission & Vision',
        'about.mission.label': 'Mission:',
        'about.mission.text': 'To facilitate the professional advancement of African healthcare professionals through comprehensive support services while enabling German medical institutions to maintain optimal staffing levels with culturally diverse, highly qualified nursing professionals.',
        'about.vision.label': 'Vision:',
        'about.vision.text': 'To establish Healthcare Careers Bridge as the premier international healthcare recruitment partner, recognized for excellence in cross-cultural professional integration and sustainable workforce solutions.',
        'about.values.integrity': 'Integrity',
        'about.values.excellence': 'Excellence',
        'about.values.innovation': 'Innovation',
        'about.values.partnership': 'Partnership',
        
        // Process
        'process.title': 'Professional Integration Pathway',
        'process.subtitle': 'A systematic approach to international healthcare career development',
        'process.step1.title': 'Linguistic Certification',
        'process.step1.text': 'Structured language acquisition program targeting B1/B2 proficiency through recognized certification bodies including Goethe-Institut, telc, and TestDaF.',
        'process.step2.title': 'Professional Recognition',
        'process.step2.text': 'Comprehensive management of the Anerkennung procedure, ensuring full compliance with German healthcare regulatory standards and qualification equivalency requirements.',
        'process.step3.title': 'Career Placement',
        'process.step3.text': 'Strategic positioning with leading German healthcare institutions through our established network, matching professional competencies with institutional requirements.',
        'process.step4.title': 'Integration & Establishment',
        'process.step4.text': 'Professional onboarding support with cultural orientation, workplace integration guidance, and ongoing assistance to ensure successful long-term career establishment in Germany.',
        
        // Services
        'services.title': 'Professional Services',
        'services.subtitle': 'End-to-end workforce solutions for healthcare professionals and institutions',
        'services.linguistic.title': 'Linguistic Excellence Program',
        'services.linguistic.text': 'Structured German language acquisition through certified partner institutions, ensuring candidates achieve required B1/B2 proficiency levels for healthcare communication standards.',
        'services.credential.title': 'Credential Harmonization',
        'services.credential.text': 'Expert navigation of the Anerkennung process, including document preparation, translation services, and liaison with German regulatory authorities for qualification recognition.',
        'services.placement.title': 'Strategic Placement Services',
        'services.placement.text': 'Targeted matching with premier German healthcare facilities based on specialization, career objectives, and institutional requirements, ensuring optimal professional alignment.',
        'services.integration.title': 'Integration Support Services',
        'services.integration.text': 'Guidance on accommodation options, cultural orientation programs, workplace integration strategies, and community resources to ensure successful professional establishment in Germany.',
        
        // Requirements
        'requirements.title': 'Candidate Requirements',
        'requirements.subtitle': 'What you need to work as a nurse in Germany',
        
        // FAQ
        'faq.title': 'Frequently Asked Questions',
        
        // Waitlist
        'waitlist.title': 'Join Our Priority Waitlist',
        'waitlist.subtitle': 'Be among the first healthcare professionals to access our Germany placement program',
        'waitlist.why.title': 'Why Join Our Waitlist?',
        'waitlist.why.text': 'We\'re launching our comprehensive placement program for qualified African nurses seeking careers in Germany. Joining our waitlist ensures:',
        'waitlist.benefit1': '✓ Priority access to placement opportunities',
        'waitlist.benefit2': '✓ Early notification of program launch',
        'waitlist.benefit3': '✓ Exclusive preparation resources',
        'waitlist.benefit4': '✓ Direct matching with German healthcare institutions',
        'waitlist.benefit5': '✓ Personalized guidance throughout the process',
        'waitlist.limited.title': 'Limited Spots Available',
        'waitlist.limited.text': 'Our first cohort will be limited to ensure quality support for each candidate.',
        'waitlist.formTitle': 'Secure Your Spot',
        'waitlist.submit': 'Join Waitlist Now',
        
        // Form fields
        'form.fullName': 'Full Name *',
        'form.email': 'Email Address *',
        'form.phone': 'Phone Number *',
        'form.country': 'Country of Residence *',
        'form.qualification': 'Nursing Qualification *',
        'form.experience': 'Years of Experience *',
        'form.germanLevel': 'Current German Level *',
        'form.terms': 'By joining, you agree to receive updates about our program launch and opportunities.',
        'form.selectExperience': 'Select your experience',
        'form.exp.less1': 'Less than 1 year',
        'form.exp.1to2': '1-2 years',
        'form.exp.3to5': '3-5 years',
        'form.exp.more5': 'More than 5 years',
        'form.selectLevel': 'Select your level',
        'form.level.none': 'No German knowledge',
        'form.level.a1': 'A1 - Beginner',
        'form.level.a2': 'A2 - Elementary',
        'form.level.b1': 'B1 - Intermediate',
        'form.level.b2': 'B2 - Upper Intermediate',
        'form.level.c1': 'C1 - Advanced',
        
        // Requirements items
        'req.item1.title': 'Language Requirement:',
        'req.item1.text': 'Minimum B1 German proficiency. Accepted certificates: Goethe-Institut, telc, ÖSD, TestDaF.',
        'req.item2.title': 'Education:',
        'req.item2.text': 'Completed nursing diploma or degree from an accredited institution. Minimum of 3 years of nursing education (recognized in home country).',
        'req.item3.title': 'Professional Requirements:',
        'req.item3.text': 'Registered as a nurse in your home country. Proof of work experience (recommended: at least 1–2 years).',
        'req.item4.title': 'Recognition in Germany (Anerkennung):',
        'req.item4.text': 'Apply for recognition of foreign qualifications. May require adaptation training or a knowledge test.',
        'req.item5.title': 'Other Documents:',
        'req.item5.text': 'Valid passport, Police clearance certificate, Medical fitness certificate.',
        
        // FAQ items
        'faq.q1.question': 'How long does the entire process take?',
        'faq.q1.answer': 'The complete process typically takes between 9–18 months, depending on your current German language level, the recognition process, and visa processing times.',
        'faq.q2.question': 'Who pays for language training?',
        'faq.q2.answer': 'Candidates are responsible for their language training costs. However, we provide guidance on finding affordable and accredited language programs.',
        'faq.q3.question': 'Can I bring my family to Germany?',
        'faq.q3.answer': 'Yes, once you have a valid work contract and visa, you can apply for family reunification to bring your spouse and children to Germany.',
        'faq.q4.question': 'What support do you provide to employers?',
        'faq.q4.answer': 'We offer candidate screening & qualification checks, support with documentation & recognition process, and full relocation assistance for healthcare institutions.',
        
        // Contact Section
        'contact.title': 'Contact Us',
        'contact.subtitle': 'Get in touch with our team for personalized assistance',
        'contact.office.title': 'Head Office',
        'contact.office.address': 'Address:',
        'contact.office.hours': 'Office Hours:',
        'contact.office.weekdays': 'Monday - Friday: 9:00 AM - 6:00 PM CET',
        'contact.office.weekend': 'Saturday: 10:00 AM - 2:00 PM CET',
        'contact.direct.title': 'Direct Contact',
        'contact.direct.phone': 'Phone:',
        'contact.direct.email': 'Email:',
        'contact.regional.title': 'Regional Offices',
        'contact.regional.nigeria': 'Nigeria Office:',
        'contact.regional.kenya': 'Kenya Office:',
        'contact.regional.ghana': 'Ghana Office:',
        'contact.social.title': 'Follow Us',
        
        // Employer CTA
        'employer.title': 'Healthcare Institution Partnership',
        'employer.text': 'Address critical staffing challenges with pre-qualified, culturally competent nursing professionals ready for immediate integration into your healthcare teams.',
        
        // Buttons
        'button.applyNow': 'Apply Now',
        'button.partnerWithUs': 'Partner With Us',
        
        // Modal titles
        'modal.apply.title': 'Apply for Placement',
        'modal.partner.title': 'Partner With Us',
        
        // Footer
        'footer.brand': 'Healthcare Careers Bridge',
        'footer.tagline': 'Connecting African healthcare professionals with opportunities in Germany.',
        'footer.quickLinks': 'Quick Links',
        'footer.forCandidates': 'For Candidates',
        'footer.forEmployers': 'For Employers',
        'footer.aboutUs': 'About Us',
        'footer.services': 'Services',
        'footer.requirements': 'Requirements',
        'footer.process': 'Application Process',
        'footer.ourServices': 'Our Services',
        'footer.contactUs': 'Contact Us',
        'footer.copyright': '© 2024 Healthcare Careers Bridge. All rights reserved.'
    },
    de: {
        // Navigation
        'nav.home': 'Startseite',
        'nav.about': 'Über uns',
        'nav.process': 'Prozess',
        'nav.services': 'Dienstleistungen',
        'nav.requirements': 'Anforderungen',
        'nav.faq': 'FAQ',
        'nav.contact': 'Kontakt',
        'nav.joinWaitlist': 'Warteliste',
        
        // Hero
        'hero.title': 'Brücke zwischen Gesundheitstalenten und deutscher Exzellenz',
        'hero.subtitle': 'Strategische Personalvermittlung, die qualifizierte afrikanische Pflegekräfte mit führenden deutschen medizinischen Einrichtungen durch umfassende Integrationsunterstützung verbindet.',
        
        // About
        'about.title': 'Über uns',
        'about.strategic.title': 'Strategische Gesundheitslösungen',
        'about.strategic.text': 'Healthcare Careers Bridge adressiert eine kritische Herausforderung des europäischen Gesundheitssektors: die wachsende Nachfrage nach qualifizierten Pflegefachkräften. Mit einem Mangel von über 200.000 Gesundheitsfachkräften in Deutschland bieten wir eine systematische Lösung.',
        'about.approach.title': 'Unser Ansatz',
        'about.approach.text1': 'Wir haben ein umfassendes Wegprogramm entwickelt, das internationale Pflegetalente in integrierte Mitglieder der deutschen Gesundheitsversorgung verwandelt.',
        'about.approach.text2': 'Durch strategische Partnerschaften mit führenden Gesundheitseinrichtungen in ganz Deutschland stellen wir sicher, dass unsere Kandidaten in Umgebungen platziert werden, in denen sie beruflich gedeihen können.',
        'about.mission.title': 'Mission & Vision',
        'about.mission.label': 'Mission:',
        'about.mission.text': 'Die berufliche Förderung afrikanischer Gesundheitsfachkräfte durch umfassende Unterstützungsdienste zu ermöglichen und gleichzeitig deutschen medizinischen Einrichtungen zu helfen, optimale Personalstärken mit kulturell vielfältigen, hochqualifizierten Pflegefachkräften zu erhalten.',
        'about.vision.label': 'Vision:',
        'about.vision.text': 'Healthcare Careers Bridge als führenden internationalen Partner für Gesundheitsrekrutierung zu etablieren, anerkannt für Exzellenz in interkultureller beruflicher Integration und nachhaltigen Personallösungen.',
        'about.values.integrity': 'Integrität',
        'about.values.excellence': 'Exzellenz',
        'about.values.innovation': 'Innovation',
        'about.values.partnership': 'Partnerschaft',
        
        // Buttons
        'button.applyNow': 'Jetzt bewerben',
        'button.partnerWithUs': 'Partner werden',
        
        // Modal titles
        'modal.apply.title': 'Für Vermittlung bewerben',
        'modal.partner.title': 'Partner werden',
        
        // Process
        'process.title': 'Professioneller Integrationsweg',
        'process.subtitle': 'Ein systematischer Ansatz zur internationalen Karriereentwicklung im Gesundheitswesen',
        'process.step1.title': 'Sprachzertifizierung',
        'process.step1.text': 'Strukturiertes Spracherwerbsprogramm mit Ziel B1/B2-Niveau durch anerkannte Zertifizierungsstellen wie Goethe-Institut, telc und TestDaF.',
        'process.step2.title': 'Berufsanerkennung',
        'process.step2.text': 'Umfassendes Management des Anerkennungsverfahrens unter Einhaltung deutscher Gesundheitsvorschriften und Qualifikationsäquivalenz-Anforderungen.',
        'process.step3.title': 'Karriereplatzierung',
        'process.step3.text': 'Strategische Positionierung bei führenden deutschen Gesundheitseinrichtungen durch unser etabliertes Netzwerk.',
        'process.step4.title': 'Integration & Etablierung',
        'process.step4.text': 'Professionelle Einarbeitungsunterstützung mit kultureller Orientierung und fortlaufender Hilfe für erfolgreiche Karriereetablierung.',
        
        // Services
        'services.title': 'Professionelle Dienstleistungen',
        'services.subtitle': 'End-to-End-Personallösungen für Gesundheitsfachkräfte und Institutionen',
        'services.linguistic.title': 'Sprachexzellenz-Programm',
        'services.linguistic.text': 'Strukturierter Deutschspracherwerb durch zertifizierte Partnerinstitutionen, um das erforderliche B1/B2-Niveau zu erreichen.',
        'services.credential.title': 'Qualifikationsanerkennung',
        'services.credential.text': 'Expertennavigation durch den Anerkennungsprozess, einschließlich Dokumentenvorbereitung, Übersetzungsdienste und Verbindung mit deutschen Behörden.',
        'services.placement.title': 'Strategische Vermittlung',
        'services.placement.text': 'Gezielte Vermittlung an führende deutsche Gesundheitseinrichtungen basierend auf Spezialisierung und Karrierezielen.',
        'services.integration.title': 'Integrationsunterstützung',
        'services.integration.text': 'Beratung zu Unterkunftsmöglichkeiten, kulturelle Orientierungsprogramme und Gemeinschaftsressourcen für erfolgreiche berufliche Etablierung.',
        
        // Requirements
        'requirements.title': 'Kandidatenanforderungen',
        'requirements.subtitle': 'Was Sie brauchen, um als Krankenpfleger in Deutschland zu arbeiten',
        
        // FAQ
        'faq.title': 'Häufig gestellte Fragen',
        
        // Waitlist
        'waitlist.title': 'Treten Sie unserer Prioritäts-Warteliste bei',
        'waitlist.subtitle': 'Seien Sie unter den ersten Gesundheitsfachkräften mit Zugang zu unserem Deutschland-Programm',
        'waitlist.why.title': 'Warum unserer Warteliste beitreten?',
        'waitlist.why.text': 'Wir starten unser umfassendes Vermittlungsprogramm für qualifizierte afrikanische Pflegekräfte. Der Beitritt sichert:',
        'waitlist.benefit1': '✓ Prioritätszugang zu Vermittlungsmöglichkeiten',
        'waitlist.benefit2': '✓ Frühzeitige Benachrichtigung beim Programmstart',
        'waitlist.benefit3': '✓ Exklusive Vorbereitungsressourcen',
        'waitlist.benefit4': '✓ Direkte Vermittlung an deutsche Gesundheitseinrichtungen',
        'waitlist.benefit5': '✓ Persönliche Begleitung während des gesamten Prozesses',
        'waitlist.limited.title': 'Begrenzte Plätze verfügbar',
        'waitlist.limited.text': 'Unsere erste Kohorte ist begrenzt, um qualitative Unterstützung für jeden Kandidaten zu gewährleisten.',
        'waitlist.formTitle': 'Sichern Sie sich Ihren Platz',
        'waitlist.submit': 'Jetzt Warteliste beitreten',
        
        // Form fields
        'form.fullName': 'Vollständiger Name *',
        'form.email': 'E-Mail-Adresse *',
        'form.phone': 'Telefonnummer *',
        'form.country': 'Wohnsitzland *',
        'form.qualification': 'Pflegequalifikation *',
        'form.experience': 'Jahre der Erfahrung *',
        'form.germanLevel': 'Aktuelles Deutschniveau *',
        'form.terms': 'Mit dem Beitritt stimmen Sie zu, Updates über unseren Programmstart zu erhalten.',
        
        // Employer CTA
        'employer.title': 'Partnerschaft mit Gesundheitseinrichtungen',
        'employer.text': 'Lösen Sie kritische Personalengpässe mit vorqualifizierten, kulturell kompetenten Pflegefachkräften.',
        
        // Footer
        'footer.brand': 'Healthcare Careers Bridge',
        'footer.tagline': 'Verbindung afrikanischer Gesundheitsfachkräfte mit Möglichkeiten in Deutschland.',
        'footer.quickLinks': 'Schnelllinks',
        'footer.forCandidates': 'Für Kandidaten',
        'footer.forEmployers': 'Für Arbeitgeber',
        'footer.aboutUs': 'Über uns',
        'footer.services': 'Dienstleistungen',
        'footer.requirements': 'Anforderungen',
        'footer.process': 'Bewerbungsprozess',
        'footer.ourServices': 'Unsere Dienstleistungen',
        'footer.contactUs': 'Kontakt',
        'footer.copyright': '© 2024 Healthcare Careers Bridge. Alle Rechte vorbehalten.'
    },
    fr: {
        // Navigation
        'nav.home': 'Accueil',
        'nav.about': 'À propos',
        'nav.process': 'Processus',
        'nav.services': 'Services',
        'nav.requirements': 'Exigences',
        'nav.faq': 'FAQ',
        'nav.contact': 'Contact',
        'nav.joinWaitlist': 'Liste d\'attente',
        
        // Hero
        'hero.title': 'Relier les talents de santé à l\'excellence allemande',
        'hero.subtitle': 'Solutions stratégiques de main-d\'œuvre connectant des professionnels infirmiers africains qualifiés avec des institutions médicales allemandes de premier plan.',
        
        // About
        'about.title': 'À propos de nous',
        'about.strategic.title': 'Solutions de santé stratégiques',
        'about.strategic.text': 'Healthcare Careers Bridge répond à un défi critique du secteur de la santé européen: la demande croissante de professionnels infirmiers qualifiés.',
        'about.approach.title': 'Notre approche',
        'about.approach.text1': 'Nous avons développé un programme complet qui transforme les talents infirmiers internationaux en membres intégrés de la main-d\'œuvre sanitaire allemande.',
        'about.approach.text2': 'Grâce à des partenariats stratégiques avec des institutions de santé de premier plan en Allemagne, nous garantissons que nos candidats sont placés dans des environnements où ils peuvent s\'épanouir professionnellement.',
        'about.mission.title': 'Mission et Vision',
        'about.mission.label': 'Mission:',
        'about.mission.text': 'Faciliter l\'avancement professionnel des professionnels de santé africains grâce à des services de soutien complets tout en permettant aux institutions médicales allemandes de maintenir des niveaux de dotation optimaux avec des professionnels infirmiers culturellement diversifiés et hautement qualifiés.',
        'about.vision.label': 'Vision:',
        'about.vision.text': 'Établir Healthcare Careers Bridge comme le principal partenaire international de recrutement dans le domaine de la santé, reconnu pour l\'excellence dans l\'intégration professionnelle interculturelle et les solutions durables de main-d\'œuvre.',
        'about.values.integrity': 'Intégrité',
        'about.values.excellence': 'Excellence',
        'about.values.innovation': 'Innovation',
        'about.values.partnership': 'Partenariat',
        
        // Buttons
        'button.applyNow': 'Postuler maintenant',
        'button.partnerWithUs': 'Devenir partenaire',
        
        // Modal titles
        'modal.apply.title': 'Postuler pour un placement',
        'modal.partner.title': 'Devenir partenaire',
        
        // Process
        'process.title': 'Parcours d\'intégration professionnelle',
        'process.subtitle': 'Une approche systématique du développement de carrière internationale en santé',
        'process.step1.title': 'Certification linguistique',
        'process.step1.text': 'Programme structuré d\'acquisition de la langue allemande visant le niveau B1/B2 à travers des organismes reconnus.',
        'process.step2.title': 'Reconnaissance professionnelle',
        'process.step2.text': 'Gestion complète de la procédure Anerkennung, assurant la conformité aux normes réglementaires allemandes.',
        'process.step3.title': 'Placement professionnel',
        'process.step3.text': 'Positionnement stratégique auprès d\'institutions de santé allemandes de premier plan grâce à notre réseau établi.',
        'process.step4.title': 'Intégration et établissement',
        'process.step4.text': 'Support professionnel à l\'intégration avec orientation culturelle et assistance continue pour un établissement réussi.',
        
        // Services
        'services.title': 'Services professionnels',
        'services.subtitle': 'Solutions complètes pour les professionnels de santé et les institutions',
        'services.linguistic.title': 'Programme d\'excellence linguistique',
        'services.linguistic.text': 'Acquisition structurée de la langue allemande pour atteindre le niveau B1/B2 requis.',
        'services.credential.title': 'Harmonisation des qualifications',
        'services.credential.text': 'Navigation experte du processus Anerkennung, incluant préparation des documents et services de traduction.',
        'services.placement.title': 'Services de placement stratégique',
        'services.placement.text': 'Mise en relation ciblée avec des établissements de santé allemands de premier plan basée sur la spécialisation.',
        'services.integration.title': 'Services de soutien à l\'intégration',
        'services.integration.text': 'Conseils sur les options d\'hébergement, programmes d\'orientation culturelle et ressources communautaires.',
        
        // Requirements
        'requirements.title': 'Exigences pour les candidats',
        'requirements.subtitle': 'Ce dont vous avez besoin pour travailler comme infirmier en Allemagne',
        
        // FAQ
        'faq.title': 'Questions fréquemment posées',
        
        // Waitlist
        'waitlist.title': 'Rejoignez notre liste d\'attente prioritaire',
        'waitlist.subtitle': 'Soyez parmi les premiers professionnels de santé à accéder à notre programme',
        'waitlist.why.title': 'Pourquoi rejoindre notre liste d\'attente?',
        'waitlist.why.text': 'Nous lançons notre programme complet pour les infirmiers africains qualifiés. L\'inscription garantit:',
        'waitlist.benefit1': '✓ Accès prioritaire aux opportunités de placement',
        'waitlist.benefit2': '✓ Notification précoce du lancement du programme',
        'waitlist.benefit3': '✓ Ressources de préparation exclusives',
        'waitlist.benefit4': '✓ Mise en relation directe avec des institutions allemandes',
        'waitlist.benefit5': '✓ Accompagnement personnalisé tout au long du processus',
        'waitlist.limited.title': 'Places limitées disponibles',
        'waitlist.limited.text': 'Notre première cohorte sera limitée pour garantir un soutien de qualité à chaque candidat.',
        'waitlist.formTitle': 'Réservez votre place',
        'waitlist.submit': 'Rejoindre la liste maintenant',
        
        // Form fields
        'form.fullName': 'Nom complet *',
        'form.email': 'Adresse e-mail *',
        'form.phone': 'Numéro de téléphone *',
        'form.country': 'Pays de résidence *',
        'form.qualification': 'Qualification infirmière *',
        'form.experience': 'Années d\'expérience *',
        'form.germanLevel': 'Niveau d\'allemand actuel *',
        'form.terms': 'En vous inscrivant, vous acceptez de recevoir des mises à jour sur le lancement de notre programme.',
        
        // Employer CTA
        'employer.title': 'Partenariat avec les institutions de santé',
        'employer.text': 'Résolvez les défis critiques de dotation avec des professionnels infirmiers préqualifiés et culturellement compétents.',
        
        // Footer
        'footer.brand': 'Healthcare Careers Bridge',
        'footer.tagline': 'Connecter les professionnels de santé africains avec des opportunités en Allemagne.',
        'footer.quickLinks': 'Liens rapides',
        'footer.forCandidates': 'Pour les candidats',
        'footer.forEmployers': 'Pour les employeurs',
        'footer.aboutUs': 'À propos',
        'footer.services': 'Services',
        'footer.requirements': 'Exigences',
        'footer.process': 'Processus de candidature',
        'footer.ourServices': 'Nos services',
        'footer.contactUs': 'Contactez-nous',
        'footer.copyright': '© 2024 Healthcare Careers Bridge. Tous droits réservés.'
    }
};

// Merge additional translations
translations = mergeTranslations(translations);

// Current language (default to English)
let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

// Translation function
function translate(key) {
    return translations[currentLanguage]?.[key] || translations['en'][key] || key;
}

// Set language
function setLanguage(lang) {
    if (translations[lang]) {
        currentLanguage = lang;
        localStorage.setItem('selectedLanguage', lang);
        updatePageTranslations();
    }
}

// Update all translations on the page
function updatePageTranslations() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = translate(key);
        
        // Only update if we have a translation (even if it's the same as the key)
        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        } else {
            console.warn(`Missing translation for key: ${key} in language: ${currentLanguage}`);
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
    
    // Dispatch event for any custom handling
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: currentLanguage }));
}

// Get current language
function getCurrentLanguage() {
    return currentLanguage;
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updatePageTranslations);
} else {
    // Small delay to ensure DOM is fully ready
    setTimeout(updatePageTranslations, 100);
}

// Export for use in other modules
export { translate, setLanguage, getCurrentLanguage, updatePageTranslations, translations };