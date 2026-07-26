// Site-wide content and configuration â€” single source of truth for everything
// that is not a project (see data/projects.json for projects).
// Every visible string is bilingual: { ar, en }.
// After editing, run: node scripts/build.mjs

export default {
  domain: 'https://wbstudio.xyz',
  brand: 'WB Studio',

  // â”€â”€ Contact (do not change without the owner's approval â€” used in JSON-LD claims) â”€â”€
  phoneDisplay: '+966 53 806 0383',
  phoneE164: '+966538060383',
  email: 'w.bousmael@wbstudio.xyz',
  gmailCompose: 'https://mail.google.com/mail/?view=cm&fs=1&to=w.bousmael@wbstudio.xyz',
  whatsappNumber: '966538060383',
  formAction: 'https://formsubmit.co/ajax/wael.bousmael@gmail.com',
  ogImage: 'https://wbstudio.xyz/assets/images/og.jpg',

  // Pre-filled WhatsApp message (preserved from the original site).
  waMessage: {
    ar: 'Ø§Ù„Ø³Ù„Ø§Ù… Ø¹Ù„ÙŠÙƒÙ…ØŒ Ø£Ø±ØºØ¨ ÙÙŠ Ø­Ø¬Ø² Ø§Ø³ØªØ´Ø§Ø±Ø© Ù„ØªØµÙ…ÙŠÙ… ÙÙŠÙ„Ø§. Ù‡Ø°Ù‡ ØªÙØ§ØµÙŠÙ„ Ø£Ø±Ø¶ÙŠ:\nâ€¢ Ø§Ù„Ø§Ø³Ù…:\nâ€¢ Ù…ÙˆÙ‚Ø¹ Ø§Ù„Ø£Ø±Ø¶:\nâ€¢ Ø§Ù„Ù…Ø³Ø§Ø­Ø©:\nâ€¢ Ø§Ù„Ù…ÙŠØ²Ø§Ù†ÙŠØ© Ø§Ù„ØªÙ‚Ø±ÙŠØ¨ÙŠØ©:',
    en: 'Hello, I would like to book a consultation for a villa design. Here are my land details:\nâ€¢ Name:\nâ€¢ Land location:\nâ€¢ Area:\nâ€¢ Estimated budget:'
  },

  fonts: {
    ar: 'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=IBM+Plex+Sans+Arabic:wght@300;400;500&display=swap',
    en: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@400;500&display=swap'
  },

  nav: {
    work: { ar: 'Ø§Ù„Ø£Ø¹Ù…Ø§Ù„', en: 'Work' },
    services: { ar: 'Ø§Ù„Ø®Ø¯Ù…Ø§Øª', en: 'Services' },
    approach: { ar: 'Ø§Ù„Ù†Ù‡Ø¬', en: 'Approach' },
    journal: { ar: 'Ø§Ù„Ù…Ø¯ÙˆÙ‘Ù†Ø©', en: 'Journal' },
    about: { ar: 'Ù…Ù† Ù†Ø­Ù†', en: 'About' },
    contact: { ar: 'ØªÙˆØ§ØµÙ„', en: 'Contact' },
    menuOpen: { ar: 'ÙØªØ­ Ø§Ù„Ù‚Ø§Ø¦Ù…Ø©', en: 'Open menu' },
    menuClose: { ar: 'Ø¥ØºÙ„Ø§Ù‚ Ø§Ù„Ù‚Ø§Ø¦Ù…Ø©', en: 'Close menu' },
    langLabel: { ar: 'EN', en: 'Ø¹Ø±Ø¨ÙŠ' },
    langAria: { ar: 'Switch to English', en: 'Ø§Ù„ØªØ¨Ø¯ÙŠÙ„ Ø¥Ù„Ù‰ Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©' },
    skip: { ar: 'ØªØ®Ø·ÙÙ‘ Ø¥Ù„Ù‰ Ø§Ù„Ù…Ø­ØªÙˆÙ‰', en: 'Skip to content' }
  },

  footer: {
    tagline: {
      ar: 'Ù…Ù…Ø§Ø±Ø³Ø© Ù…Ø¹Ù…Ø§Ø±ÙŠØ© Ø´Ø®ØµÙŠØ© Ù„ØªØµÙ…ÙŠÙ… Ø§Ù„ÙÙ„Ù„ ÙˆØ§Ù„Ù…Ù†Ø§Ø²Ù„ Ø§Ù„Ø®Ø§ØµØ© ÙÙŠ Ø¬Ø¯Ø© ÙˆØ§Ù„Ø³Ø¹ÙˆØ¯ÙŠØ© ÙˆØ§Ù„Ø®Ù„ÙŠØ¬ â€” Ø¨ÙˆØ¶ÙˆØ­ ÙˆØ§Ù‚ØªØ¶Ø§Ø¨ ÙˆÙ‚ÙŠÙ…Ø© Ø·ÙˆÙŠÙ„Ø© Ø§Ù„Ù…Ø¯Ù‰.',
      en: 'A personal architecture practice for private villas and homes across Jeddah, Saudi Arabia and the Gulf â€” shaped by clarity, restraint and long-term value.'
    },
    explore: { ar: 'ØªØµÙÙ‘Ø­', en: 'Explore' },
    contactTitle: { ar: 'ØªÙˆØ§ØµÙ„', en: 'Contact' },
    whatsappLabel: { ar: 'ÙˆØ§ØªØ³Ø§Ø¨', en: 'WhatsApp' },
    rights: { ar: 'Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø­Ù‚ÙˆÙ‚ Ù…Ø­ÙÙˆØ¸Ø©.', en: 'All rights reserved.' },
    credits: { ar: 'Ø§Ø¹ØªÙ…Ø§Ø¯Ø§Øª Ø§Ù„ØµÙˆØ±', en: 'Image credits' },
    locations: 'Jeddah Â· Berlin'
  },

  // â”€â”€ The core offer (preserved verbatim in spirit from the original site) â”€â”€
  offer: {
    ar: 'Ù†Ø¨Ø¯Ø£ Ø¨Ù…ÙƒØ§Ù„Ù…Ø© Ù…Ø¬Ø§Ù†ÙŠØ© ÙˆØªØµÙˆØ± Ù…Ø¨Ø¯Ø¦ÙŠ Ù…Ø¬Ø§Ù†ÙŠ â€” ÙˆÙ„Ø§ ÙŠØ¨Ø¯Ø£ Ø£ÙŠ Ø§ØªÙØ§Ù‚ Ù…Ø¯ÙÙˆØ¹ Ø¥Ù„Ø§ Ø¨Ø¹Ø¯ ÙˆØ¶ÙˆØ­ Ø§Ù„Ø±Ø¤ÙŠØ© ÙˆØ§Ù„ØªÙˆØ§ÙÙ‚.',
    en: 'We begin with a free call and a free preliminary concept â€” a paid agreement starts only once the direction is clear and aligned.'
  },

  home: {
    seoTitle: {
      ar: 'ØªØµÙ…ÙŠÙ… ÙÙ„Ù„ ÙˆÙ…Ù†Ø§Ø²Ù„ Ø®Ø§ØµØ© ÙÙŠ Ø¬Ø¯Ø© ÙˆØ§Ù„Ø®Ù„ÙŠØ¬ | WB Studio â€” ÙˆØ§Ø¦Ù„ Ø¨Ùˆ Ø³Ù…Ø§Ø¹ÙŠÙ„',
      en: 'Private Villa & Home Design in Jeddah & the Gulf | WB Studio â€” Wael Bousmael'
    },
    seoDesc: {
      ar: 'Ù…Ù‡Ù†Ø¯Ø³ Ù…Ø¹Ù…Ø§Ø±ÙŠ Ù„ØªØµÙ…ÙŠÙ… Ø§Ù„ÙÙ„Ù„ ÙˆØ§Ù„Ù…Ù†Ø§Ø²Ù„ Ø§Ù„Ø®Ø§ØµØ© ÙÙŠ Ø¬Ø¯Ø© ÙˆØ§Ù„Ø³Ø¹ÙˆØ¯ÙŠØ© ÙˆØ§Ù„Ø®Ù„ÙŠØ¬. Ù…ÙƒØ§Ù„Ù…Ø© Ù…Ø¬Ø§Ù†ÙŠØ©ØŒ ØªØµÙˆØ± Ù…Ø¨Ø¯Ø¦ÙŠ Ù…Ø¬Ø§Ù†ÙŠØŒ ÙˆØ§ØªÙØ§Ù‚ Ù…Ø¯ÙÙˆØ¹ ÙÙ‚Ø· Ø¨Ø¹Ø¯ ÙˆØ¶ÙˆØ­ Ø§Ù„Ø±Ø¤ÙŠØ© ÙˆØ§Ù„ØªÙˆØ§ÙÙ‚.',
      en: 'Architect for private villas and homes in Jeddah, Saudi Arabia and the Gulf. A free call, a free preliminary concept, and a paid agreement only after the vision is clear and aligned.'
    },
    eyebrow: { ar: 'Ø¹Ù…Ø§Ø±Ø© Ø§Ù„ÙÙ„Ù„ Ø§Ù„Ø®Ø§ØµØ© â€” Ø¬Ø¯Ø©', en: 'Private villa architecture â€” Jeddah' },
    h1: {
      ar: 'Ù†ØµÙ…Ù… ÙÙ„Ù„ ÙˆÙ…Ù†Ø§Ø²Ù„ Ø®Ø§ØµØ© ÙÙŠ Ø¬Ø¯Ø© ÙˆØ§Ù„Ø®Ù„ÙŠØ¬',
      en: 'We design private villas and homes in Jeddah and the Gulf'
    },
    positioning: {
      ar: 'Ø§Ø³ØªÙˆØ¯ÙŠÙˆ Ù…Ø¹Ù…Ø§Ø±ÙŠ Ø¨ÙˆØªÙŠÙƒÙŠ Ù„Ø¹Ù…Ù„Ø§Ø¡ Ø§Ù„ÙÙ„Ù„ Ø§Ù„Ø®Ø§ØµØ© ÙÙŠ Ø¬Ø¯Ø© â€” ØªØµÙ…ÙŠÙ… Ø­Ø¯ÙŠØ« Ù…Ø¯Ø±ÙˆØ³ØŒ ÙˆØ¹ÙŠÙ†ÙŒ Ø¯Ù‚ÙŠÙ‚Ø© Ø¹Ù„Ù‰ Ø§Ù„Ø­Ø¬Ø± ÙˆØ§Ù„Ø¶ÙˆØ¡ ÙˆØ§Ù„Ù†Ø³Ø¨ØŒ ÙˆÙÙ‡Ù…ÙŒ Ø¹Ù…ÙŠÙ‚ Ù„Ø·Ø±ÙŠÙ‚Ø© Ø¹ÙŠØ´ Ø§Ù„Ø¹Ø§Ø¦Ù„Ø§Øª ÙÙŠ Ø¬Ø¯Ø© ÙˆØ¹Ù…ÙˆÙ… Ø§Ù„Ø®Ù„ÙŠØ¬.',
      en: 'A boutique architecture studio for private villa clients in Jeddah â€” refined modern design, a careful eye for stone, light and proportion, and a close understanding of how families live in Jeddah and across the Gulf.'
    },
    ctaWhatsapp: { ar: 'Ø§Ø­Ø¬Ø² Ù…ÙƒØ§Ù„Ù…Ø© Ù…Ø¬Ø§Ù†ÙŠØ© Ø¹Ø¨Ø± ÙˆØ§ØªØ³Ø§Ø¨', en: 'Book a free call on WhatsApp' },
    ctaWork: { ar: 'Ø´Ø§Ù‡Ø¯ Ø§Ù„Ø£Ø¹Ù…Ø§Ù„', en: 'View the work' },
    trustItems: [
      { ar: 'Ø®Ø¨Ø±Ø© ØªØªØ¬Ø§ÙˆØ² 12 Ø¹Ø§Ù…Ø§Ù‹', en: '12+ years of experience' },
      { ar: 'Ù…Ø¹Ù…Ø§Ø±ÙŠ ÙˆÙ…Ù†Ø³Ù‚ BIM', en: 'Architect & BIM coordinator' },
      { ar: 'Ø¬Ø¯Ø© Â· Ø§Ù„Ø³Ø¹ÙˆØ¯ÙŠØ© Â· Ø§Ù„Ø®Ù„ÙŠØ¬', en: 'Jeddah Â· Saudi Arabia Â· GCC' },
      { ar: 'Ù…Ù† Ø§Ù„ÙÙƒØ±Ø© Ø¥Ù„Ù‰ Ù…Ø®Ø·Ø·Ø§Øª Ø§Ù„ØªÙ†ÙÙŠØ°', en: 'From concept to construction documentation' }
    ],
    serviceThemes: [
      {
        title: { ar: 'ØªØµÙ…ÙŠÙ… ÙÙŠÙ„Ø§ Ø®Ø§ØµØ© ÙÙŠ Ø¬Ø¯Ø©', en: 'Private villa design in Jeddah' },
        text: { ar: 'Ù…Ù† Ù‚Ø±Ø§Ø¡Ø© Ø§Ù„Ø£Ø±Ø¶ ÙˆØ§Ù„Ø§Ø­ØªÙŠØ§Ø¬Ø§Øª Ø¥Ù„Ù‰ ÙÙƒØ±Ø© Ù…Ø¹Ù…Ø§Ø±ÙŠØ© Ø¨Ù‡ÙˆÙŠØ© ÙˆØ§Ø¶Ø­Ø©.', en: 'From reading the plot and brief to an architectural idea with a clear identity.' },
        href: '/villa-design-jeddah/'
      },
      {
        title: { ar: 'Ø§Ù„Ø®ØµÙˆØµÙŠØ© ÙˆØ§Ù„Ø¶ÙŠØ§ÙØ© ÙˆØ§Ù„Ù…Ù†Ø§Ø®', en: 'Privacy, hospitality and climate' },
        text: { ar: 'ÙØ±Ø§ØºØ§Øª ØªÙˆØ§Ø²Ù† Ø­ÙŠØ§Ø© Ø§Ù„Ø¹Ø§Ø¦Ù„Ø© ÙˆØ§Ø³ØªÙ‚Ø¨Ø§Ù„ Ø§Ù„Ø¶ÙŠÙˆÙ ÙˆØ§Ù„Ø¶ÙˆØ¡ ÙˆØ§Ù„ØªØ¸Ù„ÙŠÙ„.', en: 'Spaces balancing family life, hospitality, daylight and shade.' },
        href: '/modern-villa-design-jeddah/'
      },
      {
        title: { ar: 'ØªØµÙ…ÙŠÙ… Ø¬Ø§Ù‡Ø² Ù„Ù„ØªÙ†ÙÙŠØ° ÙˆØªÙ†Ø³ÙŠÙ‚ BIM', en: 'Build-ready design & BIM coordination' },
        text: { ar: 'ÙˆØ¶ÙˆØ­ Ø¨ÙŠÙ† Ø§Ù„Ù…Ø¹Ù…Ø§Ø±ÙŠ ÙˆØ§Ù„Ø¥Ù†Ø´Ø§Ø¦ÙŠ ÙˆØ§Ù„Ù…ÙŠÙƒØ§Ù†ÙŠÙƒÙŠ Ù‚Ø¨Ù„ Ø§Ù„ÙˆØµÙˆÙ„ Ø¥Ù„Ù‰ Ø§Ù„Ù…ÙˆÙ‚Ø¹.', en: 'Clarity across architectural, structural and MEP disciplines before site work.' },
        href: '/approach/'
      },
      {
        title: { ar: 'ØªØ¬Ø¯ÙŠØ¯ Ø§Ù„ÙÙ„Ù„ ÙˆÙ…Ø®Ø·Ø·Ø§Øª Ø§Ù„ØªÙ†ÙÙŠØ°', en: 'Villa renovation & execution drawings' },
        text: { ar: 'Ù…Ù† ØªÙˆØ«ÙŠÙ‚ Ø§Ù„ÙˆØ¶Ø¹ Ø§Ù„Ù‚Ø§Ø¦Ù… Ø¥Ù„Ù‰ Ù…Ø®Ø·Ø·Ø§Øª Ø§Ù„Ù‡Ø¯Ù… ÙˆØ§Ù„Ø¥Ù†Ø´Ø§Ø¡ ÙˆØ­Ø²Ù…Ø© ÙˆØ§Ø¶Ø­Ø© Ù„Ù„Ù…Ù‚Ø§ÙˆÙ„.', en: 'From existing-condition records to demolition, construction and a clear contractor package.' },
        href: '/villa-renovation-design-jeddah/'
      }
    ],
    heroImage: {
      src: '/assets/images/home-hero.webp', w: 1448, h: 1086,
      alt: {
        ar: 'ÙÙŠÙ„Ø§ Ø­Ø¯ÙŠØ«Ø© Ø¨Ø³Ù‚Ù Ø®Ø´Ø¨ÙŠ Ø¯Ø§ÙØ¦ ÙˆÙØ±Ø§Øº Ù…Ø¹ÙŠØ´Ø© Ù…ÙØªÙˆØ­ Ø¹Ù„Ù‰ Ù…Ø³Ø¨Ø­ Ù‡Ø§Ø¯Ø¦',
        en: 'Modern villa with a warm timber soffit and living space opening to a still pool'
      }
    },
    selectedTitle: { ar: 'Ø£Ø¹Ù…Ø§Ù„ Ù…Ø®ØªØ§Ø±Ø©', en: 'Selected work' },
    allWork: { ar: 'Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø£Ø¹Ù…Ø§Ù„', en: 'All work' },
    approachTitle: { ar: 'Ø§Ù„Ù†Ù‡Ø¬', en: 'Approach' },
    approachLead: {
      ar: 'Ù…Ø³Ø§Ø± ÙˆØ§Ø¶Ø­ Ù…Ù† Ø«Ù„Ø§Ø« Ø®Ø·ÙˆØ§Øª ÙŠØ­Ø§ÙØ¸ Ø¹Ù„Ù‰ Ù‡Ø¯ÙˆØ¡ Ø§Ù„Ù‚Ø±Ø§Ø±Ø§Øª ÙˆØ§Ø³ØªÙ…Ø±Ø§Ø± Ø§Ù„ØªÙ‚Ø¯Ù… â€” Ù‚Ø¨Ù„ Ø£ÙŠ Ø§Ù„ØªØ²Ø§Ù… Ù…Ø¯ÙÙˆØ¹.',
      en: 'A clear three-step path that keeps decisions calm and progress steady â€” before any paid commitment.'
    },
    approachMore: { ar: 'Ø§Ù‚Ø±Ø£ Ø¹Ù† Ø§Ù„Ù†Ù‡Ø¬ ÙƒØ§Ù…Ù„Ø§Ù‹', en: 'Read the full approach' },
    aboutTitle: { ar: 'ÙˆØ§Ø¦Ù„ Ø¨Ùˆ Ø³Ù…Ø§Ø¹ÙŠÙ„', en: 'Wael Bousmael' },
    aboutText: {
      ar: 'Ù…Ø¹Ù…Ø§Ø±ÙŠ ÙˆÙ…Ù†Ø³Ù‚ BIM Ø¨Ø®Ø¨Ø±Ø© ØªØªØ¬Ø§ÙˆØ² 12 Ø¹Ø§Ù…Ø§Ù‹ ÙÙŠ ØªØµÙ…ÙŠÙ… Ø§Ù„ÙÙ„Ù„ Ø§Ù„Ø³ÙƒÙ†ÙŠØ© Ø§Ù„ÙØ§Ø®Ø±Ø©ØŒ Ø¹Ù…Ù„ Ø¹Ù„Ù‰ Ù…Ø´Ø§Ø±ÙŠØ¹ ÙÙŠ Ø£Ù„Ù…Ø§Ù†ÙŠØ§ ÙˆÙ„Ø¨Ù†Ø§Ù† ÙˆØ§Ù„Ø³Ø¹ÙˆØ¯ÙŠØ© â€” Ù…Ù† Ø§Ù„ÙÙƒØ±Ø© Ø§Ù„Ø£ÙˆÙ„Ù‰ Ø­ØªÙ‰ Ù…Ø®Ø·Ø·Ø§Øª Ø§Ù„ØªÙ†ÙÙŠØ°.',
      en: 'Architect and BIM coordinator with 12+ years of experience in luxury residential villas, with projects delivered in Germany, Lebanon and Saudi Arabia â€” from first concept to construction documentation.'
    },
    aboutMore: { ar: 'Ø§Ù„Ù…Ø²ÙŠØ¯ Ø¹Ù† Ø§Ù„Ø§Ø³ØªÙˆØ¯ÙŠÙˆ', en: 'More about the studio' }
  },

  work: {
    seoTitle: {
      ar: 'Ø§Ù„Ø£Ø¹Ù…Ø§Ù„ | ØªØµÙ…ÙŠÙ… ÙÙ„Ù„ ÙˆØªØµÙ…ÙŠÙ… Ø¯Ø§Ø®Ù„ÙŠ â€” WB Studio',
      en: 'Work | Villa Design & Interiors â€” WB Studio'
    },
    seoDesc: {
      ar: 'Ø£Ø¹Ù…Ø§Ù„ ÙˆØ¯Ø±Ø§Ø³Ø§Øª WB Studio ÙÙŠ Ø¹Ù…Ø§Ø±Ø© Ø§Ù„ÙÙ„Ù„ Ø§Ù„Ø®Ø§ØµØ© ÙˆØ§Ù„ØªØµÙ…ÙŠÙ… Ø§Ù„Ø¯Ø§Ø®Ù„ÙŠ ÙˆØ§Ù„Ù…ÙØ§Ù‡ÙŠÙ… Ø§Ù„ÙØ±Ø§ØºÙŠØ© ÙÙŠ Ø¬Ø¯Ø© ÙˆØ§Ù„Ø³Ø¹ÙˆØ¯ÙŠØ© ÙˆØ§Ù„Ø®Ù„ÙŠØ¬.',
      en: 'WB Studio work and studies in private villa architecture, interiors and spatial concepts across Jeddah, Saudi Arabia and the Gulf.'
    },
    h1: { ar: 'Ø§Ù„Ø£Ø¹Ù…Ø§Ù„', en: 'Work' },
    note: {
      ar: 'Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹ Ø§Ù„Ù…Ø¹Ø±ÙˆØ¶Ø© Ø­Ø§Ù„ÙŠØ§Ù‹ Ø¯Ø±Ø§Ø³Ø§Øª Ù…ÙØ§Ù‡ÙŠÙ…ÙŠØ© ÙˆÙ†Ù…Ø§Ø°Ø¬ Ø¹Ø±Ø¶ Ù…Ø¤Ù‚ØªØ© ØªÙˆØ¶Ø­ Ø§ØªØ¬Ø§Ù‡ Ø§Ù„Ø§Ø³ØªÙˆØ¯ÙŠÙˆ ÙˆØ£Ø³Ù„ÙˆØ¨Ù‡ØŒ ÙˆØ³ØªÙØ³ØªØ¨Ø¯Ù„ ØªØ¯Ø±ÙŠØ¬ÙŠØ§Ù‹ Ø¨Ø£Ø¹Ù…Ø§Ù„ Ø§Ù„Ø§Ø³ØªÙˆØ¯ÙŠÙˆ Ø§Ù„Ù…Ù†ÙØ°Ø©. Ø§Ù„ØµÙˆØ± Ù…Ø±Ø§Ø¬Ø¹ Ø£Ø¬ÙˆØ§Ø¡ Ù…Ù† Ù…ØµÙˆØ±ÙŠÙ† Ø¹Ø¨Ø± Unsplash â€”',
      en: 'The projects shown here are concept studies and temporary sample presentations that illustrate the studioâ€™s direction. They will be progressively replaced with the studioâ€™s own built work. Imagery consists of atmosphere references by Unsplash photographers â€”'
    },
    noteLink: { ar: 'Ø§Ù„Ø§Ø¹ØªÙ…Ø§Ø¯Ø§Øª', en: 'see credits' },
    viewProject: { ar: 'Ø¹Ø±Ø¶ Ø§Ù„Ù…Ø´Ø±ÙˆØ¹', en: 'View project' }
  },

  project: {
    backToWork: { ar: 'Ø§Ù„Ø£Ø¹Ù…Ø§Ù„', en: 'Work' },
    detailsTitle: { ar: 'ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ù…Ø´Ø±ÙˆØ¹', en: 'Project details' },
    location: { ar: 'Ø§Ù„Ù…ÙˆÙ‚Ø¹', en: 'Location' },
    year: { ar: 'Ø§Ù„Ø³Ù†Ø©', en: 'Year' },
    category: { ar: 'Ø§Ù„ØªØµÙ†ÙŠÙ', en: 'Category' },
    status: { ar: 'Ø§Ù„Ø­Ø§Ù„Ø©', en: 'Status' },
    services: { ar: 'Ø§Ù„Ø®Ø¯Ù…Ø§Øª', en: 'Services' },
    galleryNote: {
      ar: 'Ø§Ù„ØµÙˆØ± Ø£Ø¹Ù„Ø§Ù‡ Ù…Ø±Ø§Ø¬Ø¹ Ø£Ø¬ÙˆØ§Ø¡ ÙˆÙ…ÙˆØ§Ø¯ Ù…Ù† Ù…ØµÙˆØ±ÙŠÙ† Ø¹Ø¨Ø± UnsplashØŒ Ø¶Ù…Ù† Ù†Ù…ÙˆØ°Ø¬ Ø¹Ø±Ø¶ Ù…Ø¤Ù‚Øª.',
      en: 'The images above are atmosphere and material references by Unsplash photographers, part of a temporary sample presentation.'
    },
    galleryNoteLink: { ar: 'Ø§Ø¹ØªÙ…Ø§Ø¯Ø§Øª Ø§Ù„ØµÙˆØ±', en: 'Image credits' },
    nextProject: { ar: 'Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ Ø§Ù„ØªØ§Ù„ÙŠ', en: 'Next project' }
  },

  // â”€â”€ Approach page: services + process (copy preserved from the original site) â”€â”€
  approach: {
    seoTitle: {
      ar: 'Ø§Ù„Ù†Ù‡Ø¬ | Ù…Ø³Ø§Ø± ØªØµÙ…ÙŠÙ… Ø§Ù„ÙÙŠÙ„Ø§ Ù‚Ø¨Ù„ Ø§Ù„Ø§ØªÙØ§Ù‚ Ø§Ù„Ù…Ø¯ÙÙˆØ¹ â€” WB Studio',
      en: 'Approach | The Villa Design Path Before Any Paid Agreement â€” WB Studio'
    },
    seoDesc: {
      ar: 'ÙƒÙŠÙ ÙŠØ¹Ù…Ù„ WB Studio: Ù…ÙƒØ§Ù„Ù…Ø© Ù…Ø¬Ø§Ù†ÙŠØ©ØŒ ØªØµÙˆØ± Ù…Ø¨Ø¯Ø¦ÙŠ Ù…Ø¬Ø§Ù†ÙŠØŒ ÙˆØ§ØªÙØ§Ù‚ Ù…Ø¯ÙÙˆØ¹ ÙÙ‚Ø· Ø¨Ø¹Ø¯ Ø§Ù„ØªÙˆØ§ÙÙ‚ â€” Ù…Ø¹ Ø®Ø¯Ù…Ø§Øª ØªÙ…ØªØ¯ Ù…Ù† Ø§Ù„ÙÙƒØ±Ø© Ø§Ù„Ù…Ø¹Ù…Ø§Ø±ÙŠØ© Ø¥Ù„Ù‰ ØªØµÙ…ÙŠÙ… Ø¬Ø§Ù‡Ø² Ù„Ù„ØªÙ†ÙÙŠØ°.',
      en: 'How WB Studio works: a free call, a free preliminary concept, and a paid agreement only after alignment â€” with services from architectural concept to build-ready design.'
    },
    h1: { ar: 'Ø§Ù„Ù†Ù‡Ø¬', en: 'Approach' },
    intro: {
      ar: 'Ø¹Ù…Ù„ÙŠØ© Ù‡Ø§Ø¯Ø¦Ø© ÙˆØ´ÙØ§ÙØ© Ù…Ù† Ø£ÙˆÙ„ Ø±Ø³Ù… Ø­ØªÙ‰ Ø§Ù„ØªØµÙ…ÙŠÙ… Ø§Ù„Ù†Ù‡Ø§Ø¦ÙŠ. Ø¨ÙŠÙˆØª Ù…Ø¯Ø±ÙˆØ³Ø© Ø¨Ù‡ÙˆÙŠØ© ÙˆØ§Ø¶Ø­Ø© â€” Ø­Ø¶ÙˆØ±ÙŠØ§Ù‹ ÙÙŠ Ø¬Ø¯Ø© Ø£Ùˆ Ø¹Ù† Ø¨ÙØ¹Ø¯ ÙÙŠ Ø§Ù„Ø³Ø¹ÙˆØ¯ÙŠØ© ÙˆØ§Ù„Ø®Ù„ÙŠØ¬ â€” Ù…Ø¹ Ù…Ù…Ø§Ø±Ø³Ø§Øª ØµØ¯ÙŠÙ‚Ø© Ù„Ù„Ø¨ÙŠØ¦Ø© ÙÙŠ ØµÙ…ÙŠÙ… ÙƒÙ„ Ù‚Ø±Ø§Ø±.',
      en: 'A calm, transparent process from the first sketch to the final design. Considered houses with a clear identity â€” in person in Jeddah or remotely across Saudi Arabia and the Gulf â€” with eco-conscious practice at the core of every decision.'
    },
    servicesTitle: { ar: 'Ù…Ø§Ø°Ø§ Ù†Ù‚Ø¯Ù…', en: 'What we offer' },
    services: [
      {
        title: { ar: 'Ø§Ù„ÙÙƒØ±Ø© Ø§Ù„Ù…Ø¹Ù…Ø§Ø±ÙŠØ©', en: 'Architectural concept' },
        text: {
          ar: 'Ø¯Ø±Ø§Ø³Ø§Øª Ø§Ù„ÙƒØªÙ„ Ø§Ù„Ù…Ø¨ÙƒØ±Ø© ÙˆØ³ÙŠÙ†Ø§Ø±ÙŠÙˆÙ‡Ø§Øª Ø§Ù„ÙØ±Ø§Øº Ø§Ù„ØªÙŠ ØªØ´ÙƒÙ„ Ù‡ÙˆÙŠØ© Ø§Ù„Ù…Ù†Ø²Ù„ â€” Ù„ØºØ© Ù…Ø¹Ù…Ø§Ø±ÙŠØ© ÙˆØ§Ø¶Ø­Ø© ÙˆÙ†Ø³Ø¨ Ù…Ø¯Ø±ÙˆØ³Ø© ÙˆØ§Ø³ØªØ¬Ø§Ø¨Ø© Ø¯Ù‚ÙŠÙ‚Ø© Ù„Ù„Ù…ÙˆÙ‚Ø¹.',
          en: 'Early massing studies and spatial scenarios that shape the homeâ€™s identity â€” a clear architectural language, considered proportions and a precise response to the site.'
        }
      },
      {
        title: { ar: 'Ø§Ù„ØªÙˆØ¬Ù‡ Ø§Ù„Ø¯Ø§Ø®Ù„ÙŠ', en: 'Interior direction' },
        text: {
          ar: 'ØªØ³Ù„Ø³Ù„ Ø§Ù„ØºØ±Ù ÙˆØ£Ø¬ÙˆØ§Ø¡ Ø§Ù„Ù…ÙˆØ§Ø¯ ÙˆØªÙˆØ¸ÙŠÙ Ø§Ù„Ø¥Ø¶Ø§Ø¡Ø© Ø§Ù„Ø·Ø¨ÙŠØ¹ÙŠØ© â€” Ù‚Ø±Ø§Ø±Ø§Øª ØªØµÙ…ÙŠÙ…ÙŠØ© ØªØ­Ø§ÙØ¸ Ø¹Ù„Ù‰ ØªØ¬Ø±Ø¨Ø© Ù…ØªÙ†Ø§Ø³Ù‚Ø© ÙˆÙ…ØªÙƒØ§Ù…Ù„Ø©.',
          en: 'Room sequencing, material atmosphere and the use of natural light â€” design decisions that keep the experience coherent and integrated.'
        }
      },
      {
        title: { ar: 'ØªØµÙ…ÙŠÙ… Ø¬Ø§Ù‡Ø² Ù„Ù„ØªÙ†ÙÙŠØ°', en: 'Build-ready design' },
        text: {
          ar: 'Ù…Ø®Ø±Ø¬Ø§Øª ÙˆØ§Ø¶Ø­Ø© ØªÙˆØ­Ø¯ ÙÙ‡Ù… Ø§Ù„Ø§Ø³ØªØ´Ø§Ø±ÙŠÙŠÙ† ÙˆØ§Ù„Ù…Ù‚Ø§ÙˆÙ„ÙŠÙ†ØŒ ÙˆØªÙˆØ¬ÙŠÙ‡ ØªØµÙ…ÙŠÙ…ÙŠ ÙŠØ­Ø§ÙØ¸ Ø¹Ù„Ù‰ Ø§Ù„Ø±Ø¤ÙŠØ© Ø§Ù„Ø£ØµÙ„ÙŠØ© Ù„Ù„Ù…Ø´Ø±ÙˆØ¹.',
          en: 'Clear deliverables that align consultants and contractors, and design guidance that protects the projectâ€™s original vision.'
        }
      },
      {
        title: { ar: 'ØªÙˆØ¬Ù‡ ØµØ¯ÙŠÙ‚ Ù„Ù„Ø¨ÙŠØ¦Ø©', en: 'Eco-conscious direction' },
        text: {
          ar: 'Ø­Ù„ÙˆÙ„ ØªØµÙ…ÙŠÙ… Ø³Ù„Ø¨ÙŠØ© ØªÙ‚Ù„Ù„ Ø§Ù„Ø£Ø­Ù…Ø§Ù„ Ø§Ù„Ø·Ø§Ù‚ÙŠØ© Ù…Ù† Ø§Ù„Ù…Ø±Ø§Ø­Ù„ Ø§Ù„Ù…Ø¨ÙƒØ±Ø©ØŒ ÙˆØ¥Ø±Ø´Ø§Ø¯Ø§Øª Ù…ÙˆØ§Ø¯ Ù…ØªÙŠÙ†Ø© ÙˆÙ…Ù†Ø®ÙØ¶Ø© Ø§Ù„Ø£Ø«Ø± Ù„Ù‚ÙŠÙ…Ø© Ø·ÙˆÙŠÙ„Ø© Ø§Ù„Ù…Ø¯Ù‰.',
          en: 'Passive design solutions that reduce energy loads from the earliest stages, and guidance on durable, low-impact materials for long-term value.'
        }
      }
    ],
    processTitle: { ar: 'Ù…Ø³Ø§Ø± ØªØµÙ…ÙŠÙ… Ø§Ù„ÙÙŠÙ„Ø§ Ù‚Ø¨Ù„ Ø§Ù„Ø§ØªÙØ§Ù‚ Ø§Ù„Ù…Ø¯ÙÙˆØ¹', en: 'The villa design path before the paid agreement' },
    steps: [
      {
        title: { ar: 'Ù…ÙƒØ§Ù„Ù…Ø© Ù…×®:ŞÚ$z{-®éÜj×Vã¢tâ–çFW&æÂ6÷W'G–&B'&–æw2Æ–v‡BæB—"FVW–çFòF†R†öÖR–âgVÆÂ&—f7’ÂæBÆö6Â7FöæRF–W2F†Rf–ÆÆFò—G2w&÷VæBv†–ÆRFV×W&–ær—G26Æ–ÖFRâpĞ¢ĞĞ¢ĞĞ¢ÒÀĞ¢6W'f–6UG—S¢t†–¦¦’f–ÆÆFW6–vârÀĞ¢f¢°Ğ¢°Ğ¢¢²#¢}˜]ŠrŠ}˜M˜‹˜"Š˜­˜bŠ}˜MŠİŠÍŠ}‹-˜¢Š}˜MŠİŠı˜­Š²˜Š}˜MŠ­‹Š}Š½˜­‰òrÂVã¢uv†N(	—2F†RF–ffW&Væ6R&WGvVVâÖöFW&â†–¦¦’æBG&F—F–öæÃòrÒÀĞ¢¢²#¢}˜mŠ=Ší‹˜]ŠŠ}ŠıŠbŠ}˜MŠİŠÍŠ}‹-˜¢Š}˜MŠí‹]˜‹]˜­ŠˆÂŠ}˜MŠ­‹˜M˜­˜MˆÂŠ}˜M˜˜mŠ}Š’˜˜m‹Š™‹‹˜m˜}ŠrŠŠí‹}˜‹r˜˜]˜Š}ŠòŠİŠı˜­Š½ŠˆÂ˜MŠrŠ‹-Ší‹˜Š’˜]˜m‹=˜ŠíŠ’ârÂVã¢uvRF¶R†–¦¦’&–æ6—ÆW2‡&—f7’Â6†F–ærÂF†R6÷W'G–&B’æBW‡&W72F†VÒ–âÖöFW&âÆ–æW2æBÖFW&–Ç2Âæ÷B6÷–VB÷&æÖVçBârĞĞ¢ÒÀĞ¢°Ğ¢¢²#¢}˜}˜BŠ­‹]˜]˜]˜˜b˜Š}ŠÍ˜}Š}Š¢˜˜M˜BŠ‹}Š}Š‹’ŠİŠÍŠ}‹-˜¢ŠİŠı˜­Š½‰òrÂVã¢tFò–÷RFW6–vâf–ÆÆf:vFW2v—F‚ÖöFW&â†–¦¦’6†&7FW#òrÒÀĞ¢¢²#¢}˜m‹˜R(	BŠ}˜M˜Š}ŠÍ˜}Š’Š}˜MŠİŠÍŠ}‹-˜­Š’Š}˜MŠİŠı˜­Š½Š’˜]˜bŠ=˜=Š½‹˜]Šr˜­˜]˜­™‹"Š=‹˜]Š}˜M˜mŠs¢ŠİŠÍ‹ˆÂ‹˜‹MŠ}˜b˜]‹Š}‹]‹ˆÂ˜Š­Šı‹™ŠÂ˜M˜M‹˜BârÂVã¢u–W2(	BF†RÖöFW&â†–¦¦’f:vFR—2ÖöærF†RÖ÷7BF—7F–æ7F—fR'G2öb÷W"v÷&³¢7FöæRÂ6öçFV×÷&'’&w6†âæBÆ–W&VB6†FRârĞĞ¢ÒÀĞ¢°Ğ¢¢²#¢}˜}˜B˜­˜mŠ}‹=Š‚˜}‹ŠrŠ}˜M‹}Š}Š‹’Š}˜MŠ=Šİ˜­Š}ŠŠ}˜MŠİŠı˜­Š½Š’˜˜¢ŠÍŠıŠ‰òrÂVã¢tFöW2F†—26†&7FW"7V—B¦VFF(	—2ÖöFW&âF—7G&–7G3òrÒÀĞ¢¢²#¢}Š­˜]Š}˜]Š}˜²(	B˜­˜]˜mŠÒŠ}˜M˜˜­˜MŠrŠ­˜]˜­™‹-Š}˜²˜˜}˜˜­Š’Š˜­˜bŠ}˜M˜˜M˜BŠ}˜M˜]Š­‹MŠ}Š˜}ŠˆÂ˜]‹’Š=ŠıŠ}Š˜]˜mŠ}Ší˜¢Š=˜‹m˜BârÂVã¢uW&fV7FÇ’(	B—Bv—fW2F†Rf–ÆÆF—7F–æ7F–öâæB–FVçF—G’ÖöærÆöö²ÖÆ–¶R†÷W6W2Âv—F‚&WGFW"6Æ–ÖFRW&f÷&Öæ6RârĞĞ¢ĞĞ¢ÒÀĞ¢&VÆFVC¢²wf–ÆÆÖFW6–vâÖ¦VFF‚rÂvÇW‡W'’×f–ÆÆÖFW6–vâÖ¦VFF‚rÂvÖöFW&â×f–ÆÆÖFW6–vâÖ¦VFF‚rÂvö&‡W"×f–ÆÆÖFW6–vâuÒÀĞ¢&VÆFVE&ö¦V7G3¢²vÖöçF6†—&’×f–ÆÆrÂw7FöæRÖÖ¦Æ—2uÒÀĞ¢–ÖvS¢²7&3¢rö76WG2÷&ö¦V7G2öÖöçF6†—&’×f–ÆÆö6÷fW"çvV'rÂs¢S3bÂƒ¢“cÂÇC¢²#¢}˜Š}ŠÍ˜}Š’˜˜­˜MŠrŠİŠÍŠ}‹-˜­Š’ŠİŠı˜­Š½Š’ŠŠ}˜MŠİŠÍ‹˜˜¢ŠÍŠıŠ’rÂVã¢tÖöFW&â†–¦¦’f–ÆÆf:vFR–â7FöæRÂ¦VFF‚rÒĞĞ¢ĞĞ¢ÒÀĞ Ğ¢òò)H)H¦÷W&æÂ…4TòwV–FW2f÷"&RÖ†—&R6V&6†W2’)H)H Ğ¢¦÷W&æÄÖWF¢°Ğ¢6VõF—FÆS¢²#¢}Š}˜M˜]Šı˜™˜mŠ’ÂŠ=Šı˜MŠ’Š­‹]˜]˜­˜RŠ}˜M˜˜M˜B˜˜¢ŠÍŠıŠ’(	Bt"7GVF–òrÂVã¢t¦÷W&æÂÂf–ÆÆFW6–vâwV–FW2f÷"¦VFF‚(	Bt"7GVF–òrÒÀĞ¢6VôFW63¢°Ğ¢#¢}Š=Šı˜MŠ’‹˜]˜M˜­Š’˜MŠ=‹]ŠİŠ}Š‚Š}˜MŠ=‹Š}‹m˜¢˜-Š˜BŠ­‹]˜]˜­˜R˜˜­˜MŠr˜˜¢ŠÍŠıŠ“¢Š}˜MŠ­˜=˜M˜ŠˆÂŠ}˜MŠ}‹=Š­‹ŠıŠ}ŠıˆÂŠ}˜M˜‹˜"Š˜­˜bŠ}˜MŠ­‹]˜‹˜Š}˜MŠ­˜m˜˜­‹ˆÂ˜Š}‹Š­ŠŠ}‹Š}Š¢Š=ŠŠİ‹Š}˜M‹=Š}Šİ˜M˜­Š’ârÀĞ¢Vã¢u&7F–6ÂwV–FW2f÷"ÆæF÷væW'2&Vf÷&RFW6–væ–ærf–ÆÆ–â¦VFFƒ¢6÷7BÂ&W&F–öâÂ6öæ6WBg2âW†V7WF–öâG&v–æw2ÂæBö&‡W"6ö7FÂ6öç6–FW&F–öç2âpĞ¢ÒÀĞ¢ƒ¢²#¢}Š}˜M˜]Šı˜™˜mŠ’rÂVã¢t¦÷W&æÂrÒÀĞ¢–çG&ó¢°Ğ¢#¢}Š=Šı˜MŠ’˜-‹]˜­‹Š’˜‹]Š}Šı˜-Š’˜M˜]˜b˜­˜˜=™‹˜˜¢Š˜mŠ}Š˜˜­˜MŠrŠíŠ}‹]Š’˜˜¢ŠÍŠıŠ’(	B˜MŠ­Š­™Ší‹˜-‹Š}‹Š}Š¢Š=˜‹mŠÒ˜-Š˜BŠ=˜bŠ­ŠŠıŠ2ârÀĞ¢Vã¢u6†÷'BÂ†öæW7BwV–FW2f÷"ç–öæR6öç6–FW&–ær'V–ÆF–ær&—fFRf–ÆÆ–â¦VFF‚(	BFò†VÇ–÷RÖ¶R6ÆV&W"FV6—6–öç2&Vf÷&R–÷R7F'BâpĞ¢ÒÀĞ¢&VDÖ÷&S¢²#¢}Š}˜-‹Š2Š}˜MŠı˜M˜­˜BrÂVã¢u&VBF†RwV–FRrÒÀĞ¢&6µFô¦÷W&æÃ¢²#¢}Š}˜M˜]Šı˜™˜mŠ’rÂVã¢t¦÷W&æÂrÒÀĞ¢&VÆFVEF—FÆS¢²#¢}ŠíŠı˜]Š}Š¢‹Š}Š¢‹]˜MŠ’rÂVã¢u&VÆFVB6W'f–6W2rĞĞ¢ÒÀĞ Ğ¢¦÷W&æÃ¢°Ğ¢°Ğ¢6ÇVs¢wf–ÆÆÖFW6–vâÖ6÷7BÖ¦VFF‚rÀĞ¢FFS¢s##bÓRÓ#rÀĞ¢F—FÆS¢²#¢}˜=˜RŠ­˜=˜M˜Š’Š­‹]˜]˜­˜R˜˜­˜MŠr˜˜¢ŠÍŠıŠ‰òŠı˜M˜­˜B‹˜]˜M˜¢(	Bt"7GVF–òrÂVã¢t†÷r×V6‚FöW2f–ÆÆFW6–vâ6÷7B–â¦VFFƒò&7F–6ÂwV–FR(	Bt"7GVF–òrÒÀĞ¢FW63¢°Ğ¢#¢}˜]ŠrŠ}˜M‹˜¢˜­ŠİŠı™ŠòŠ­˜=˜M˜Š’Š­‹]˜]˜­˜R˜˜­˜MŠrŠíŠ}‹]Š’˜˜¢ŠÍŠıŠˆÂ˜˜=˜­˜Š­Ší‹}™‹r˜M˜]˜­‹-Š}˜m˜­Š’Š}˜MŠ­‹]˜]˜­˜RŠ˜‹m˜ŠÒ˜-Š˜BŠ=˜bŠ­ŠŠıŠ2ârÀĞ¢Vã¢uv†BFWFW&Ö–æW2F†R6÷7BöbFW6–væ–ær&—fFRf–ÆÆ–â¦VFF‚ÂæB†÷rFòÆâ–÷W"FW6–vâ'VFvWB6ÆV&Ç’&Vf÷&R–÷R7F'BâpĞ¢ÒÀĞ¢ƒ¢²#¢}˜=˜RŠ­˜=˜M˜Š’Š­‹]˜]˜­˜R˜˜­˜MŠr˜˜¢ŠÍŠıŠ‰òrÂVã¢t†÷r×V6‚FöW2f–ÆÆFW6–vâ6÷7B–â¦VFFƒòrÒÀĞ¢–çG&ó¢°Ğ¢#¢}‹=ŠMŠ}˜B˜­‹}‹Šİ˜r˜=˜B‹]Š}ŠİŠ‚Š=‹‹mˆÂ˜Š}˜MŠ]ŠÍŠ}ŠŠ’Š}˜M‹]Š}Šı˜-Š“¢*½Šİ‹=ŠŒ+²â˜M˜=˜b˜}˜mŠ}˜2‹˜Š}˜]˜B˜Š}‹mŠİŠ’Š­ŠİŠı™ŠòŠ}˜MŠ­˜=˜M˜ŠˆÂ˜˜˜}˜]˜}Šr˜­‹=Š}‹Šı˜2‹˜M˜’Š}˜MŠ­Ší‹}˜­‹rŠŠ½˜-Š’ârÀĞ¢Vã¢t—N(	—2F†Rf—'7BVW7F–öâWfW'’ÆæF÷væW"6·2ÂæBF†R†öæW7Bç7vW"—2(	Æ—BFWVæG2î(	Ò'WB6ÆV"f7F÷'2G&—fRF†R6÷7BÂæBVæFW'7FæF–ærF†VÒ†VÇ2–÷RÆâv—F‚6öæf–FVæ6RâpĞ¢ÒÀĞ¢6V7F–öç3¢°Ğ¢°Ğ¢†VF–æs¢²#¢}˜]ŠrŠ}˜M‹˜¢˜­ŠİŠı™ŠòŠ}˜MŠ­˜=˜M˜Š’rÂVã¢uv†BG&—fW2F†R6÷7BrÒÀĞ¢&öG“¢°Ğ¢#¢}˜]‹=Š}ŠİŠ’Š}˜MŠ=‹‹b˜Š}˜MŠ˜mŠ}ŠˆÂŠ­‹˜-˜­ŠòŠ}˜MŠ­‹]˜]˜­˜]ˆÂ˜m‹}Š}˜"Š}˜M˜]Ší‹ŠÍŠ}Š¢˜˜=‹Š’˜˜-‹rŠ=˜RŠİ‹-˜]Š’Š­˜m˜˜­‹˜=Š}˜]˜MŠ’ˆÂ˜˜]‹=Š­˜˜’Š}˜MŠ­˜m‹=˜­˜"Š}˜M˜}˜mŠı‹=˜¢â˜=˜M˜]Šr‹-Š}ŠòŠ}˜M˜m‹}Š}˜"˜Š}˜MŠ­˜‹]˜­˜MˆÂ‹-Š}ŠıŠ¢Š}˜M˜-˜­˜]Š’˜Š}˜MŠ­˜=˜M˜Š’ârÀĞ¢Vã¢uÆ÷BæB'V–ÇB×W&VÂFW6–vâ6ö×ÆW†—G’ÂF†R66÷RöbFVÆ—fW&&ÆW2†6öæ6WBöæÇ’g2âgVÆÂ6öç7G'V7F–öâ6¶vR’ÂæBF†RÆWfVÂöbVæv–æVW&–ær6ö÷&F–æF–öââF†Rw&VFW"F†R66÷RæBFWF–ÂÂF†Rw&VFW"F†RfÇVR(	BæBF†R6÷7BâpĞ¢ĞĞ¢ÒÀĞ¢°Ğ¢†VF–æs¢²#¢}‹‹=˜˜RŠ}˜MŠ­‹]˜]˜­˜R˜]˜-Š}Š˜BŠ­˜=˜M˜Š’Š}˜MŠ˜mŠ}ŠrÂVã¢tFW6–vâfVW2g2â6öç7G'V7F–öâ6÷7BrÒÀĞ¢&öG“¢°Ğ¢#¢}‹‹=˜˜RŠ}˜MŠ­‹]˜]˜­˜RŠÍ‹-Š‹]‹­˜­‹˜]˜b˜]˜­‹-Š}˜m˜­Š’Š}˜M˜]‹M‹˜‹’Š}˜M˜=˜M˜­ŠˆÂ˜M˜=˜m˜}ŠrŠ}˜MŠ=˜=Š½‹Š­Š=Š½˜­‹Š}˜²‹˜M˜’Š}˜M˜mŠ­˜­ŠÍŠ’âŠ­‹]˜]˜­˜RŠÍ˜­Šò˜­˜˜™‹Š=‹m‹Š}˜˜r˜˜¢Š}˜MŠ­˜m˜˜­‹ŠŠ­˜-˜M˜­˜BŠ}˜MŠ=Ší‹}Š}Š˜Š}˜M˜}Šı‹ârÀĞ¢Vã¢tFW6–vâfVW2&R6ÖÆÂ'BöbF†RF÷FÂ&ö¦V7B'VFvWBÂ'WBF†RÖ÷7B–æfÇVVçF–ÂöâF†R÷WF6öÖRâvööBFW6–vâ6fW2Öç’F–ÖW2—G26÷7B–â6öç7G'V7F–öâ'’&VGV6–ærW'&÷'2æBv7FRâpĞ¢ĞĞ¢ÒÀĞ¢°Ğ¢†VF–æs¢²#¢}˜=˜­˜˜m˜‹mŠÒŠ}˜MŠ­˜=˜M˜Š’rÂVã¢t†÷rvR6Æ&–g’6÷7BrÒÀĞ¢&öG“¢°Ğ¢#¢}˜mŠŠıŠ2Š˜]˜=Š}˜M˜]Š’˜]ŠÍŠ}˜m˜­Š’˜Š­‹]˜‹˜]ŠŠıŠm˜¢˜]ŠÍŠ}˜m˜­ˆÂŠ½˜R˜m˜‹mŠÒ˜m‹}Š}˜"Š}˜M‹˜]˜B˜Š}˜M‹‹=˜˜RŠŠ}˜M˜=Š}˜]˜B˜-Š˜BŠ=˜¢Š}Š­˜Š}˜"˜]Šı˜˜‹’(	BŠ˜MŠr˜]˜Š}ŠÍŠ-Š¢ârÀĞ¢Vã¢uvR7F'Bv—F‚g&VR6ÆÂæBg&VR&VÆ–Ö–æ'’6öæ6WBÂF†Vâ6Æ&–g’F†R66÷RæBfVW2gVÆÇ’&Vf÷&Rç’–Bw&VVÖVçB(	Bæò7W'&—6W2âpĞ¢ĞĞ¢ĞĞ¢ÒÀĞ¢&VÆFVC¢²wf–ÆÆÖFW6–vâÖ¦VFF‚rÂvÇW‡W'’×f–ÆÆÖFW6–vâÖ¦VFF‚uĞĞ¢ÒÀĞ¢°Ğ¢6ÇVs¢v&Vf÷&RÖFW6–væ–ær×&—fFR×f–ÆÆrÀĞ¢FFS¢s##bÓBÓ#‚rÀĞ¢F—FÆS¢²#¢}˜]ŠrŠ}˜M‹˜¢Š­ŠÍ˜}™‹-˜r˜-Š˜BŠ­‹]˜]˜­˜R˜˜­˜MŠ­˜2Š}˜MŠíŠ}‹]Š’(	Bt"7GVF–òrÂVã¢uv†BFò&W&R&Vf÷&RFW6–væ–ær–÷W"&—fFRf–ÆÆ(	Bt"7GVF–òrÒÀĞ¢FW63¢°Ğ¢#¢}˜-Š}Šm˜]Š’‹˜]˜M˜­Š’Š˜]ŠrŠ­ŠİŠ­Š}ŠÂŠ­ŠÍ˜}˜­‹-˜r(	B‹]˜2Š}˜MŠ=‹‹mˆÂŠ}˜MŠ}ŠİŠ­˜­Š}ŠÍŠ}Š­ˆÂŠ}˜M˜]˜­‹-Š}˜m˜­ŠˆÂ˜Š}˜M˜]‹Š}ŠÍ‹’(	B˜-Š˜BŠŠıŠŠ­‹]˜]˜­˜R˜˜­˜MŠ­˜2˜˜¢ŠÍŠıŠ’ârÀĞ¢Vã¢t&7F–6Â6†V6¶Æ—7Böbv†BFò&W&R(	B–÷W"FVVBÂæVVG2Â'VFvWBæB&VfW&Væ6W2(	B&Vf÷&R7F'F–ær–÷W"f–ÆÆFW6–vâ–â¦VFF‚âpĞ¢ÒÀĞ¢ƒ¢²#¢}˜]ŠrŠ}˜M‹˜¢Š­ŠÍ˜}™‹-˜r˜-Š˜BŠ­‹]˜]˜­˜R˜˜­˜MŠ­˜2rÂVã¢uv†BFò&W&R&Vf÷&RFW6–væ–ær–÷W"f–ÆÆrÒÀĞ¢–çG&ó¢°Ğ¢#¢}˜=˜M˜]Šr˜‹mŠİŠ¢‹ŠM˜­Š­˜2˜Š=˜‹Š}˜-˜2˜]˜bŠ}˜MŠŠıŠ}˜­ŠˆÂ˜=Š}˜bŠ}˜MŠ­‹]˜]˜­˜RŠ=‹=‹‹’˜Š=Šı˜"âŠ]˜M˜­˜2˜]Šr˜m‹}˜MŠ˜r‹Š}ŠıŠ˜²˜-Š˜BŠ}˜MŠí‹}˜Š’Š}˜MŠ=˜˜M˜’ârÀĞ¢Vã¢uF†R6ÆV&W"–÷W"f—6–öâæBW'v÷&²g&öÒF†R7F'BÂF†Rf7FW"æBÖ÷&R67W&FRF†RFW6–vââ†W&^(	—2v†BvRW7VÆÇ’6²f÷"&Vf÷&RF†Rf—'7B7FWâpĞ¢ÒÀĞ¢6V7F–öç3¢°Ğ¢°Ğ¢†VF–æs¢²#¢}Š=˜‹Š}˜"Š}˜MŠ=‹‹brÂVã¢uF†RÆ÷BFö7VÖVçG2rÒÀĞ¢&öG“¢°Ğ¢#¢}‹]˜2Š}˜MŠ=‹‹mˆÂŠ}˜M˜=‹˜˜=˜¢ıŠ}˜M˜]Ší‹}‹}ˆÂ˜˜]‹=Š}ŠİŠ’˜Š=Š‹Š}ŠòŠ}˜MŠ=‹‹b˜Š}Š­ŠÍŠ}˜}˜}Šr(	BŠ­ŠİŠı™Šò˜]Šr˜­˜]˜=˜bŠ˜mŠ}ŠM˜r˜˜=˜­˜Š­˜ŠÍ˜í™˜rŠ}˜M˜˜­˜MŠrârÀĞ¢Vã¢uF†RFVVBÂF†R6—FRÆâö7&÷V—2ÂæBF†RÆ÷N(	—2&VÂF–ÖVç6–öç2æB÷&–VçFF–öâ(	BF†W6RFVf–æRv†B6â&R'V–ÇBæB†÷rF†Rf–ÆÆ—2÷&–VçFVBâpĞ¢ĞĞ¢ÒÀĞ¢°Ğ¢†VF–æs¢²#¢}Š}ŠİŠ­˜­Š}ŠÍŠ}Š¢Š}˜M‹Š}Šm˜MŠ’rÂVã¢u–÷W"fÖ–Ç(	—2æVVG2rÒÀĞ¢&öG“¢°Ğ¢#¢}‹ŠıŠòŠ}˜M‹­‹˜ˆÂ˜‹Š}‹­Š}Š¢Š}˜M‹m˜­Š}˜ŠˆÂŠí‹]˜‹]˜­Š’Š}˜M˜m‹=Š}ŠˆÂŠ}ŠİŠ­˜­Š}ŠÍŠ}Š¢Š}˜M‹=Š}Šm˜"˜Š}˜MŠíŠı˜]ˆÂ˜Š}˜M˜]‹=Š­˜-Š˜BŠ­˜‹=™‹ˆÂŠ=‹}˜Š}˜B’â˜=˜M˜]Šr‹]Šı˜-Š¢Š}˜M˜-Š}Šm˜]ŠˆÂ˜mŠÍŠÒŠ}˜MŠ­‹]˜]˜­˜RârÀĞ¢Vã¢tçVÖ&W"öb&öö×2Â†÷7—FÆ—G’76W2ÂvöÖVî(	—2&—f7’ÂG&—fW"æB7FfbæVVG2ÂæBF†RgWGW&R†W‡ç6–öâÂ6†–ÆG&Vâ’âF†RÖ÷&R†öæW7BF†RÆ—7BÂF†R&WGFW"F†RFW6–vââpĞ¢ĞĞ¢ÒÀĞ¢°Ğ¢†VF–æs¢²#¢}Š}˜M˜]˜­‹-Š}˜m˜­Š’˜Š}˜M˜]‹Š}ŠÍ‹’rÂVã¢t'VFvWBæB&VfW&Væ6W2rÒÀĞ¢&öG“¢°Ğ¢#¢}˜m‹}Š}˜"˜]˜­‹-Š}˜m˜­Š’˜Š}˜-‹˜¢˜‹]˜‹˜M˜]‹MŠ}‹˜­‹’Š­‹ŠÍŠ˜2(	B˜MŠr˜M˜m˜m‹=Ší˜}Š}ˆÂŠ˜B˜M˜m˜˜}˜R‹˜˜-˜2ŠŠı˜-Š’ârÀĞ¢Vã¢t&VÆ—7F–2'VFvWB&ævRæB–ÖvW2öb&ö¦V7G2–÷RÆ–¶R(	Bæ÷BFò6÷’Â'WBFòVæFW'7FæB–÷W"F7FR&V6—6VÇ’âpĞ¢ĞĞ¢ĞĞ¢ÒÀĞ¢&VÆFVC¢²wf–ÆÆÖFW6–vâÖ¦VFF‚rÂvÖöFW&â×f–ÆÆÖFW6–vâÖ¦VFF‚uĞĞ¢ÒÀĞ¢°Ğ¢6ÇVs¢v6öæ6WBÖFW6–vâ×g2ÖW†V7WF–öâÖG&v–æw2rÀĞ¢FFS¢s##bÓBÓrÀĞ¢F—FÆS¢²#¢}Š}˜MŠ­‹]˜‹Š}˜M˜]ŠŠıŠm˜¢˜]˜-Š}Š˜B˜]Ší‹}‹}Š}Š¢Š}˜MŠ­˜m˜˜­‹¢Š}˜M˜‹˜"(	Bt"7GVF–òrÂVã¢t6öæ6WBFW6–vâg2âW†V7WF–öâG&v–æw3¢F†RF–ffW&Væ6R(	Bt"7GVF–òrÒÀĞ¢FW63¢°Ğ¢#¢}˜]ŠrŠ}˜M˜‹˜"Š˜­˜bŠ}˜MŠ­‹]˜‹Š}˜M˜]‹˜]Š}‹˜¢˜˜]Ší‹}‹}Š}Š¢Š}˜MŠ­˜m˜˜­‹„”d2ˆÂ˜˜M˜]Š}‹ŠrŠ­ŠİŠ­Š}ŠÂŠ}˜MŠ}Š½˜m˜­˜b˜MŠ˜mŠ}Š˜˜­˜MŠr˜mŠ}ŠÍŠİŠ’˜˜¢ŠÍŠıŠ’ârÀĞ¢Vã¢uF†RF–ffW&Væ6R&WGvVVâ&6†—FV7GW&Â6öæ6WBæBW†V7WF–öâ„”d2’G&v–æw2ÂæBv‡’–÷RæVVB&÷F‚Fò'V–ÆB7V66W76gVÂf–ÆÆ–â¦VFF‚âpĞ¢ÒÀĞ¢ƒ¢²#¢}Š}˜MŠ­‹]˜‹Š}˜M˜]ŠŠıŠm˜¢˜]˜-Š}Š˜B˜]Ší‹}‹}Š}Š¢Š}˜MŠ­˜m˜˜­‹rÂVã¢t6öæ6WBFW6–vâg2âW†V7WF–öâG&v–æw2rÒÀĞ¢–çG&ó¢°Ğ¢#¢}˜=Š½˜­‹˜]˜bŠ}˜M˜]‹MŠ}˜=˜B˜˜¢Š}˜M˜]˜˜-‹’Š­ŠŠıŠ2˜]˜bŠí˜M‹r˜}Š}Š­˜­˜bŠ}˜M˜]‹Šİ˜MŠ­˜­˜bâ˜˜}˜RŠ}˜M˜‹˜"˜­Šİ˜]˜­˜2˜]˜bŠ}˜MŠ­Š=Ší˜­‹˜Š}˜MŠ­˜=Š}˜M˜­˜Š}˜MŠ]‹mŠ}˜˜­Š’ârÀĞ¢Vã¢tÖç’&ö&ÆV×2öâ6—FR&Vv–âv—F‚6öægW6–ærF†W6RGvò7FvW2âVæFW'7FæF–ærF†RF–ffW&Væ6R&÷FV7G2–÷Rg&öÒFVÆ—2æBW‡G&6÷7G2âpĞ¢ÒÀĞ¢6V7F–öç3¢°Ğ¢°Ğ¢†VF–æs¢²#¢}Š}˜MŠ­‹]˜‹Š}˜M˜]‹˜]Š}‹˜¢rÂVã¢uF†R&6†—FV7GW&Â6öæ6WBrÒÀĞ¢&öG“¢°Ğ¢#¢}˜­ŠİŠı™ŠòŠ}˜M˜˜=‹Š’˜Š}˜M˜=Š­˜B˜Š}˜M˜‹Š}‹­Š}Š¢˜Š}˜MŠ=ŠÍ˜Š}Š(	BŠ}˜M‹ŠM˜­Š’â˜­ŠÍ˜­Š‚‹˜b*½˜=˜­˜‹=Š­ŠŠı˜‚Š}˜M˜˜­˜MŠr˜˜=˜­˜˜m‹˜­‹B˜˜­˜}Š|+²ârÀĞ¢Vã¢tFVf–æW2F†R–FVÂÖ76–ærÂ76W2æBFÖ÷7†W&R(	BF†Rf—6–öââ—Bç7vW'2(	Æ†÷rv–ÆÂF†Rf–ÆÆÆöö²æB†÷rv–ÆÂvRÆ—fR–â—Bî(	ÒpĞ¢ĞĞ¢ÒÀĞ¢°Ğ¢†VF–æs¢²#¢}˜]Ší‹}‹}Š}Š¢Š}˜MŠ­˜m˜˜­‹rÂVã¢tW†V7WF–öâG&v–æw2rÒÀĞ¢&öG“¢°Ğ¢#¢}Š­Š­‹ŠÍ˜RŠ}˜M‹ŠM˜­Š’Š]˜M˜’Š­˜Š}‹]˜­˜BŠı˜-˜­˜-Š’˜Š=Š‹Š}Šò˜˜]˜Š}‹]˜Š}Š¢˜˜]Ší‹}‹}Š}Š¢˜]˜m‹=™˜-Š’Š˜­˜bŠ}˜MŠ­Ší‹]‹]Š}Š¢(	B˜]Šr˜­Š˜m˜¢˜]˜m˜rŠ}˜M˜]˜-Š}˜˜B˜‹˜MŠ}˜²ârÀĞ¢Vã¢uG&ç6ÆFRF†Rf—6–öâ–çFò&V6—6RFWF–Ç2ÂF–ÖVç6–öç2Â7V6–f–6F–öç2æB6ö÷&F–æFVB×VÇF’ÖF—66—Æ–æRG&v–æw2(	Bv†BF†R6öçG&7F÷"7GVÆÇ’'V–ÆG2g&öÒâpĞ¢ĞĞ¢ÒÀĞ¢°Ğ¢†VF–æs¢²#¢}˜M˜]Š}‹ŠrŠ­ŠİŠ­Š}ŠÂŠ}˜MŠ}Š½˜m˜­˜brÂVã¢uv‡’–÷RæVVB&÷F‚rÒÀĞ¢&öG“¢°Ğ¢#¢}Š­‹]˜‹Š˜MŠrŠ­˜m˜˜­‹˜­Š˜-˜’Šİ˜M˜]Š}˜½ˆÂ˜Š­˜m˜˜­‹Š˜MŠrŠ­‹]˜‹˜-˜˜¢˜­Š˜m˜¢Š˜­Š­Š}˜²Š˜MŠr‹˜ŠÒâ˜m˜-˜ŠòŠ}˜M˜]‹M‹˜‹’‹Š‹Š}˜M˜]‹Šİ˜MŠ­˜­˜bŠŠ­˜m‹=˜­˜"$”Ò˜=Š}˜]˜BârÀĞ¢Vã¢t6öæ6WBv—F†÷WBW†V7WF–öâ7F—2G&VÓ²W†V7WF–öâv—F†÷WB7G&öær6öæ6WB'V–ÆG2†÷W6Rv—F†÷WB6÷VÂâvRÆVBF†R&ö¦V7BF‡&÷Vv‚&÷F‚Âv—F‚gVÆÂ$”Ò6ö÷&F–æF–öââpĞ¢ĞĞ¢ĞĞ¢ÒÀĞ¢&VÆFVC¢²wf–ÆÆÖFW6–vâÖ¦VFF‚rÂvÖöFW&â×f–ÆÆÖFW6–vâÖ¦VFF‚rÂwf–ÆÆ×&Væ÷fF–öâÖFW6–vâÖ¦VFF‚uĞĞ¢ÒÀĞ¢°Ğ¢6ÇVs¢vö&‡W"×f–ÆÆÖFW6–vâÖ6öç6–FW&F–öç2rÀĞ¢FFS¢s##bÓ2Ó#"rÀĞ¢F—FÆS¢²#¢}Š}‹Š­ŠŠ}‹Š}Š¢Š­‹]˜]˜­˜R˜˜M˜BŠ=ŠŠİ‹Š}˜M‹=Š}Šİ˜M˜­Š’(	Bt"7GVF–òrÂVã¢tö&‡W"6ö7FÂf–ÆÆFW6–vâ6öç6–FW&F–öç2(	Bt"7GVF–òrÒÀĞ¢FW63¢°Ğ¢#¢}˜]Šr˜­ŠÍŠ‚˜]‹Š}‹Š}Š­˜r‹˜mŠòŠ­‹]˜]˜­˜R˜˜­˜MŠr˜˜¢Š=ŠŠİ‹¢Š}˜MŠ]‹}˜MŠ}˜MŠˆÂŠ}˜MŠí‹]˜‹]˜­Š’Š}˜M‹=Š}Šİ˜M˜­ŠˆÂŠ}˜M˜]˜M˜ŠİŠ’˜Š}˜M‹˜­Š}ŠİˆÂ˜Š}˜MŠİ˜­Š}Š’Š}˜MŠíŠ}‹ŠÍ˜­Š’ârÀĞ¢Vã¢uv†BFò6öç6–FW"v†VâFW6–væ–ærf–ÆÆ–âö&‡W#¢F†Rf–WrÂ6ö7FÂ&—f7’Â6ÇBæBv–æBÂæB÷WFFö÷"Æ—f–ærâpĞ¢ÒÀĞ¢ƒ¢²#¢}Š}‹Š­ŠŠ}‹Š}Š¢Š­‹]˜]˜­˜R˜˜M˜BŠ=ŠŠİ‹rÂVã¢tö&‡W"6ö7FÂf–ÆÆFW6–vâ6öç6–FW&F–öç2rÒÀĞ¢–çG&ó¢°Ğ¢#¢}Š=‹‹bŠ=ŠŠİ‹˜‹‹]Š’Š½˜]˜­˜mŠ’˜Š­ŠİŠı˜İ™˜˜¢Š-˜m˜Òâ˜}‹˜rŠ=˜}˜RŠ}˜M˜m˜-Š}‹rŠ}˜MŠ­˜¢˜m‹Š}‹˜­˜}Šr˜M˜mŠİ˜™˜BŠ}˜MŠ]‹}˜MŠ}˜MŠ’Š]˜M˜’˜-˜­˜]Š’ŠıŠ}Šm˜]Š’ârÀĞ¢Vã¢tâö&‡W"Æ÷B—2&÷F‚&V6–÷W2÷÷'GVæ—G’æB6†ÆÆVævRâF†W6R&RF†R¶W’ö–çG2vR66÷VçBf÷"FòGW&âF†Rf–Wr–çFòÆ7F–ærfÇVRâpĞ¢ÒÀĞ¢6V7F–öç3¢°Ğ¢°Ğ¢†VF–æs¢²#¢}Š}˜MŠ]‹}˜MŠ}˜MŠ’˜]˜-Š}Š˜BŠ}˜MŠí‹]˜‹]˜­Š’rÂVã¢uf–Wrg2â&—f7’rÒÀĞ¢&öG“¢°Ğ¢#¢}Š}˜MŠ}˜m˜Š­Š}ŠÒ‹˜M˜’Š}˜MŠŠİ‹˜]‹}˜M˜ŠˆÂ˜M˜=˜bŠı˜˜b˜=‹M˜Š}˜M‹Š}Šm˜MŠ’˜M˜MŠÍ˜­‹Š}˜b˜Š}˜M‹}‹˜­˜"âŠ}˜MŠİ˜B˜˜¢Š}˜MŠ­˜ŠÍ˜­˜r˜Š­Šı‹™ŠÂŠ}˜M‹M‹˜Š}Š¢˜Š}˜M‹=Š­Š}Šm‹Š}˜M˜]‹˜]Š}‹˜­Š’ârÀĞ¢Vã¢t÷Væ–ærFòF†R6V—2FW6—&&ÆRÂ'WBv—F†÷WBW‡÷6–ærF†RfÖ–Ç’FòæV–v†&÷W'2æBF†R7G&VWBâF†Rç7vW"—2÷&–VçFF–öâÂÆ–W&VBFW'&6W2æB&6†—FV7GW&Â67&VVç2âpĞ¢ĞĞ¢ÒÀĞ¢°Ğ¢†VF–æs¢²#¢}Š}˜M˜]˜mŠ}ŠâŠ}˜M‹=Š}Šİ˜M˜¢rÂVã¢uF†R6ö7FÂ6Æ–ÖFRrÒÀĞ¢&öG“¢°Ğ¢#¢}Š}˜M˜]˜M˜ŠİŠ’˜Š}˜M‹‹}˜ŠŠ’˜Š}˜M‹˜­Š}ŠÒŠ­Š­‹}˜MŠ‚˜]˜Š}Šò˜Š­˜Š}‹]˜­˜B˜]˜-Š}˜˜]ŠˆÂ˜Š­‹˜M˜­˜MŠ}˜²˜­Šİ˜]˜¢˜]˜b‹M˜]‹2˜]˜m‹˜=‹=Š’‹˜M˜’Š}˜M˜]Š}ŠârÀĞ¢Vã¢u6ÇBÂ‡VÖ–F—G’æBv–æBFVÖæB&W6—7FçBÖFW&–Ç2æBFWF–Æ–ærÂæB6†F–ærF†B&÷FV7G2g&öÒ7Vâ&VfÆV7FVBöfbF†RvFW"âpĞ¢ĞĞ¢ÒÀĞ¢°Ğ¢†VF–æs¢²#¢}Š}˜MŠİ˜­Š}Š’Š}˜MŠíŠ}‹ŠÍ˜­Š’rÂVã¢t÷WFFö÷"Æ—f–ærrÒÀĞ¢&öG“¢°Ğ¢#¢}˜]‹=ŠŠÒŠŠ]‹}˜MŠ}˜MŠˆÂŠÍ˜M‹=Š}Š¢˜]‹˜M˜MŠˆÂ˜‹=‹}ŠÒ˜]‹˜­‹MŠ’(	B˜-˜­˜]Š’Š=‹‹bŠ=ŠŠİ‹˜˜¢ŠíŠ}‹ŠÍ˜}ŠrŠ˜-Šı‹ŠıŠ}Ší˜M˜}ŠrârÀĞ¢Vã¢tf–WrÖf6–ærööÂÂ6†FVB6VF–æræB&öögF÷(	BF†RfÇVRöbâö&‡W"Æ÷B—2–â—G2W‡FW&–÷"2×V6‚2—G2–çFW&–÷"âpĞ¢ĞĞ¢ĞĞ¢ÒÀĞ¢&VÆFVC¢²vö&‡W"×f–ÆÆÖFW6–vârÂvÇW‡W'’×f–ÆÆÖFW6–vâÖ¦VFF‚uĞĞ¢ĞĞ¢ĞĞ§Ó°Ğ