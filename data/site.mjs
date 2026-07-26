// Site-wide content and configuration — single source of truth for everything
// that is not a project (see data/projects.json for projects).
// Every visible string is bilingual: { ar, en }.
// After editing, run: node scripts/build.mjs

export default {
  domain: 'https://wbstudio.xyz',
  brand: 'WB Studio',

  // ── Contact (do not change without the owner's approval — used in JSON-LD claims) ──
  phoneDisplay: '+966 53 806 0383',
  phoneE164: '+966538060383',
  email: 'w.bousmael@wbstudio.xyz',
  gmailCompose: 'https://mail.google.com/mail/?view=cm&fs=1&to=w.bousmael@wbstudio.xyz',
  whatsappNumber: '966538060383',
  formAction: 'https://formsubmit.co/ajax/wael.bousmael@gmail.com',
  ogImage: 'https://wbstudio.xyz/assets/images/og.jpg',

  // Pre-filled WhatsApp message (preserved from the original site).
  waMessage: {
    ar: 'السلام عليكم، أرغب في حجز استشارة لتصميم فيلا. هذه تفاصيل أرضي:\n• الاسم:\n• موقع الأرض:\n• المساحة:\n• الميزانية التقريبية:',
    en: 'Hello, I would like to book a consultation for a villa design. Here are my land details:\n• Name:\n• Land location:\n• Area:\n• Estimated budget:'
  },

  fonts: {
    ar: 'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=IBM+Plex+Sans+Arabic:wght@300;400;500&display=swap',
    en: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@400;500&display=swap'
  },

  nav: {
    work: { ar: 'الأعمال', en: 'Work' },
    services: { ar: 'الخدمات', en: 'Services' },
    approach: { ar: 'النهج', en: 'Approach' },
    journal: { ar: 'المدوّنة', en: 'Journal' },
    about: { ar: 'من نحن', en: 'About' },
    contact: { ar: 'تواصل', en: 'Contact' },
    menuOpen: { ar: 'فتح القائمة', en: 'Open menu' },
    menuClose: { ar: 'إغلاق القائمة', en: 'Close menu' },
    langLabel: { ar: 'EN', en: 'عربي' },
    langAria: { ar: 'Switch to English', en: 'التبديل إلى العربية' },
    skip: { ar: 'تخطٍّ إلى المحتوى', en: 'Skip to content' }
  },

  footer: {
    tagline: {
      ar: 'ممارسة معمارية شخصية لتصميم الفلل والمنازل الخاصة في جدة والسعودية والخليج — بوضوح واقتضاب وقيمة طويلة المدى.',
      en: 'A personal architecture practice for private villas and homes across Jeddah, Saudi Arabia and the Gulf — shaped by clarity, restraint and long-term value.'
    },
    explore: { ar: 'تصفّح', en: 'Explore' },
    contactTitle: { ar: 'تواصل', en: 'Contact' },
    whatsappLabel: { ar: 'واتساب', en: 'WhatsApp' },
    rights: { ar: 'جميع الحقوق محفوظة.', en: 'All rights reserved.' },
    credits: { ar: 'اعتمادات الصور', en: 'Image credits' },
    locations: 'Jeddah · Berlin'
  },

  // ── The core offer (preserved verbatim in spirit from the original site) ──
  offer: {
    ar: 'نبدأ بمكالمة مجانية وتصور مبدئي مجاني — ولا يبدأ أي اتفاق مدفوع إلا بعد وضوح الرؤية والتوافق.',
    en: 'We begin with a free call and a free preliminary concept — a paid agreement starts only once the direction is clear and aligned.'
  },

  home: {
    seoTitle: {
      ar: 'تصميم فلل ومنازل خاصة في جدة والخليج | WB Studio — وائل بو سماعيل',
      en: 'Private Villa & Home Design in Jeddah & the Gulf | WB Studio — Wael Bousmael'
    },
    seoDesc: {
      ar: 'مهندس معماري لتصميم الفلل والمنازل الخاصة في جدة والسعودية والخليج. مكالمة مجانية، تصور مبدئي مجاني، واتفاق مدفوع فقط بعد وضوح الرؤية والتوافق.',
      en: 'Architect for private villas and homes in Jeddah, Saudi Arabia and the Gulf. A free call, a free preliminary concept, and a paid agreement only after the vision is clear and aligned.'
    },
    eyebrow: { ar: 'عمارة الفلل الخاصة — جدة', en: 'Private villa architecture — Jeddah' },
    h1: {
      ar: 'نصمم فلل ومنازل خاصة في جدة والخليج',
      en: 'We design private villas and homes in Jeddah and the Gulf'
    },
    positioning: {
      ar: 'استوديو معماري بوتيكي لعملاء الفلل الخاصة في جدة — تصميم حديث مدروس، وعينٌ دقيقة على الحجر والضوء والنسب، وفهمٌ عميق لطريقة عيش العائلات في جدة وعموم الخليج.',
      en: 'A boutique architecture studio for private villa clients in Jeddah — refined modern design, a careful eye for stone, light and proportion, and a close understanding of how families live in Jeddah and across the Gulf.'
    },
    ctaWhatsapp: { ar: 'احجز مكالمة مجانية عبر واتساب', en: 'Book a free call on WhatsApp' },
    ctaWork: { ar: 'شاهد الأعمال', en: 'View the work' },
    trustItems: [
      { ar: 'خبرة تتجاوز 12 عاماً', en: '12+ years of experience' },
      { ar: 'معماري ومنسق BIM', en: 'Architect & BIM coordinator' },
      { ar: 'جدة · السعودية · الخليج', en: 'Jeddah · Saudi Arabia · GCC' },
      { ar: 'من الفكرة إلى مخططات التنفيذ', en: 'From concept to construction documentation' }
    ],
    serviceThemes: [
      {
        title: { ar: 'تصميم فيلا خاصة في جدة', en: 'Private villa design in Jeddah' },
        text: { ar: 'من قراءة الأرض والاحتياجات إلى فكرة معمارية بهوية واضحة.', en: 'From reading the plot and brief to an architectural idea with a clear identity.' },
        href: '/villa-design-jeddah/'
      },
      {
        title: { ar: 'الخصوصية والضيافة والمناخ', en: 'Privacy, hospitality and climate' },
        text: { ar: 'فراغات توازن حياة العائلة واستقبال الضيوف والضوء والتظليل.', en: 'Spaces balancing family life, hospitality, daylight and shade.' },
        href: '/modern-villa-design-jeddah/'
      },
      {
        title: { ar: 'تصميم جاهز للتنفيذ وتنسيق BIM', en: 'Build-ready design & BIM coordination' },
        text: { ar: 'وضوح بين المعماري والإنشائي والميكانيكي قبل الوصول إلى الموقع.', en: 'Clarity across architectural, structural and MEP disciplines before site work.' },
        href: '/approach/'
      },
      {
        title: { ar: 'تجديد الفلل ومخططات التنفيذ', en: 'Villa renovation & execution drawings' },
        text: { ar: 'من توثيق الوضع القائم إلى مخططات الهدم والإنشاء وحزمة واضحة للمقاول.', en: 'From existing-condition records to demolition, construction and a clear contractor package.' },
        href: '/villa-renovation-design-jeddah/'
      }
    ],
    heroImage: {
      src: '/assets/images/home-hero.webp', w: 1448, h: 1086,
      alt: {
        ar: 'فيلا حديثة بسقف خشبي دافئ وفراغ معيشة مفتوح على مسبح هادئ',
        en: 'Modern villa with a warm timber soffit and living space opening to a still pool'
      }
    },
    selectedTitle: { ar: 'أعمال مختارة', en: 'Selected work' },
    allWork: { ar: 'جميع الأعمال', en: 'All work' },
    approachTitle: { ar: 'النهج', en: 'Approach' },
    approachLead: {
      ar: 'مسار واضح من ثلاث خطوات يحافظ على هدوء القرارات واستمرار التقدم — قبل أي التزام مدفوع.',
      en: 'A clear three-step path that keeps decisions calm and progress steady — before any paid commitment.'
    },
    approachMore: { ar: 'اقرأ عن النهج كاملاً', en: 'Read the full approach' },
    aboutTitle: { ar: 'وائل بو سماعيل', en: 'Wael Bousmael' },
    aboutText: {
      ar: 'معماري ومنسق BIM بخبرة تتجاوز 12 عاماً في تصميم الفلل السكنية الفاخرة، عمل على مشاريع في ألمانيا ولبنان والسعودية — من الفكرة الأولى حتى مخططات التنفيذ.',
      en: 'Architect and BIM coordinator with 12+ years of experience in luxury residential villas, with projects delivered in Germany, Lebanon and Saudi Arabia — from first concept to construction documentation.'
    },
    aboutMore: { ar: 'المزيد عن الاستوديو', en: 'More about the studio' }
  },

  work: {
    seoTitle: {
      ar: 'الأعمال | تصميم فلل وتصميم داخلي — WB Studio',
      en: 'Work | Villa Design & Interiors — WB Studio'
    },
    seoDesc: {
      ar: 'أعمال ودراسات WB Studio في عمارة الفلل الخاصة والتصميم الداخلي والمفاهيم الفراغية في جدة والسعودية والخليج.',
      en: 'WB Studio work and studies in private villa architecture, interiors and spatial concepts across Jeddah, Saudi Arabia and the Gulf.'
    },
    h1: { ar: 'الأعمال', en: 'Work' },
    note: {
      ar: 'المشاريع المعروضة حالياً دراسات مفاهيمية ونماذج عرض مؤقتة توضح اتجاه الاستوديو وأسلوبه، وستُستبدل تدريجياً بأعمال الاستوديو المنفذة. الصور مراجع أجواء من مصورين عبر Unsplash —',
      en: 'The projects shown here are concept studies and temporary sample presentations that illustrate the studio’s direction. They will be progressively replaced with the studio’s own built work. Imagery consists of atmosphere references by Unsplash photographers —'
    },
    noteLink: { ar: 'الاعتمادات', en: 'see credits' },
    viewProject: { ar: 'عرض المشروع', en: 'View project' }
  },

  project: {
    backToWork: { ar: 'الأعمال', en: 'Work' },
    detailsTitle: { ar: 'تفاصيل المشروع', en: 'Project details' },
    location: { ar: 'الموقع', en: 'Location' },
    year: { ar: 'السنة', en: 'Year' },
    category: { ar: 'التصنيف', en: 'Category' },
    status: { ar: 'الحالة', en: 'Status' },
    services: { ar: 'الخدمات', en: 'Services' },
    galleryNote: {
      ar: 'الصور أعلاه مراجع أجواء ومواد من مصورين عبر Unsplash، ضمن نموذج عرض مؤقت.',
      en: 'The images above are atmosphere and material references by Unsplash photographers, part of a temporary sample presentation.'
    },
    galleryNoteLink: { ar: 'اعتمادات الصور', en: 'Image credits' },
    nextProject: { ar: 'المشروع التالي', en: 'Next project' }
  },

  // ── Approach page: services + process (copy preserved from the original site) ──
  approach: {
    seoTitle: {
      ar: 'النهج | مسار تصميم الفيلا قبل الاتفاق المدفوع — WB Studio',
      en: 'Approach | The Villa Design Path Before Any Paid Agreement — WB Studio'
    },
    seoDesc: {
      ar: 'كيف يعمل WB Studio: مكالمة مجانية، تصور مبدئي مجاني، واتفاق مدفوع فقط بعد التوافق — مع خدمات تمتد من الفكرة المعمارية إلى تصميم جاهز للتنفيذ.',
      en: 'How WB Studio works: a free call, a free preliminary concept, and a paid agreement only after alignment — with services from architectural concept to build-ready design.'
    },
    h1: { ar: 'النهج', en: 'Approach' },
    intro: {
      ar: 'عملية هادئة وشفافة من أول رسم حتى التصميم النهائي. بيوت مدروسة بهوية واضحة — حضورياً في جدة أو عن بُعد في السعودية والخليج — مع ممارسات صديقة للبيئة في صميم كل قرار.',
      en: 'A calm, transparent process from the first sketch to the final design. Considered houses with a clear identity — in person in Jeddah or remotely across Saudi Arabia and the Gulf — with eco-conscious practice at the core of every decision.'
    },
    servicesTitle: { ar: 'ماذا نقدم', en: 'What we offer' },
    services: [
      {
        title: { ar: 'الفكرة المعمارية', en: 'Architectural concept' },
        text: {
          ar: 'دراسات الكتل المبكرة وسيناريوهات الفراغ التي تشكل هوية المنزل — لغة معمارية واضحة ونسب مدروسة واستجابة دقيقة للموقع.',
          en: 'Early massing studies and spatial scenarios that shape the home’s identity — a clear architectural language, considered proportions and a precise response to the site.'
        }
      },
      {
        title: { ar: 'التوجه الداخلي', en: 'Interior direction' },
        text: {
          ar: 'تسلسل الغرف وأجواء المواد وتوظيف الإضاءة الطبيعية — قرارات تصميمية تحافظ على تجربة متناسقة ومتكاملة.',
          en: 'Room sequencing, material atmosphere and the use of natural light — design decisions that keep the experience coherent and integrated.'
        }
      },
      {
        title: { ar: 'تصميم جاهز للتنفيذ', en: 'Build-ready design' },
        text: {
          ar: 'مخرجات واضحة توحد فهم الاستشاريين والمقاولين، وتوجيه تصميمي يحافظ على الرؤية الأصلية للمشروع.',
          en: 'Clear deliverables that align consultants and contractors, and design guidance that protects the project’s original vision.'
        }
      },
      {
        title: { ar: 'توجه صديق للبيئة', en: 'Eco-conscious direction' },
        text: {
          ar: 'حلول تصميم سلبية تقلل الأحمال الطاقية من المراحل المبكرة، وإرشادات مواد متينة ومنخفضة الأثر لقيمة طويلة المدى.',
          en: 'Passive design solutions that reduce energy loads from the earliest stages, and guidance on durable, low-impact materials for long-term value.'
        }
      }
    ],
    processTitle: { ar: 'مسار تصميم الفيلا قبل الاتفاق المدفوع', en: 'The villa design path before the paid agreement' },
    steps: [
      {
        title: { ar: 'مكالمة مجانية لمراجعة الأرض', en: 'Free call to review the plot' },
        text: {
          ar: 'مراجعة الأرض وأهداف نمط الحياة وتحديد واضح للمنزل الذي تري�׭x��$z{-���jם     ar: 'فناء داخلي يجلب الضوء والهواء إلى عمق البيت بخصوصية تامة، وحجر محلي يربط الفيلا بأرضها ويلطّف مناخها.',
            en: 'An internal courtyard brings light and air deep into the home in full privacy, and local stone ties the villa to its ground while tempering its climate.'
          }
        }
      ],
      serviceType: 'Hijazi villa design',
      faq: [
        {
          q: { ar: 'ما الفرق بين الحجازي الحديث والتراثي؟', en: 'What’s the difference between modern Hijazi and traditional?' },
          a: { ar: 'نأخذ مبادئ الحجازي (الخصوصية، التظليل، الفناء) ونعبّر عنها بخطوط ومواد حديثة، لا بزخرفة منسوخة.', en: 'We take Hijazi principles (privacy, shading, the courtyard) and express them in modern lines and materials, not copied ornament.' }
        },
        {
          q: { ar: 'هل تصممون واجهات فلل بطابع حجازي حديث؟', en: 'Do you design villa façades with a modern Hijazi character?' },
          a: { ar: 'نعم — الواجهة الحجازية الحديثة من أكثر ما يميّز أعمالنا: حجر، روشان معاصر، وتدرّج للظل.', en: 'Yes — the modern Hijazi façade is among the most distinctive parts of our work: stone, a contemporary rawshan and layered shade.' }
        },
        {
          q: { ar: 'هل يناسب هذا الطابع الأحياء الحديثة في جدة؟', en: 'Does this character suit Jeddah’s modern districts?' },
          a: { ar: 'تماماً — يمنح الفيلا تميّزاً وهوية بين الفلل المتشابهة، مع أداء مناخي أفضل.', en: 'Perfectly — it gives the villa distinction and identity among look-alike houses, with better climate performance.' }
        }
      ],
      related: ['villa-design-jeddah', 'luxury-villa-design-jeddah', 'modern-villa-design-jeddah', 'obhur-villa-design'],
      relatedProjects: ['montashiri-villa', 'stone-majlis'],
      image: { src: '/assets/projects/montashiri-villa/cover.webp', w: 1536, h: 960, alt: { ar: 'واجهة فيلا حجازية حديثة بالحجر في جدة', en: 'Modern Hijazi villa façade in stone, Jeddah' } }
    }
  ],

  // ── Journal (SEO guides for pre-hire searches) ──
  journalMeta: {
    seoTitle: { ar: 'المدوّنة | أدلة تصميم الفلل في جدة — WB Studio', en: 'Journal | Villa Design Guides for Jeddah — WB Studio' },
    seoDesc: {
      ar: 'أدلة عملية لأصحاب الأراضي قبل تصميم فيلا في جدة: التكلفة، الاستعداد، الفرق بين التصور والتنفيذ، واعتبارات أبحر الساحلية.',
      en: 'Practical guides for landowners before designing a villa in Jeddah: cost, preparation, concept vs. execution drawings, and Obhur coastal considerations.'
    },
    h1: { ar: 'المدوّنة', en: 'Journal' },
    intro: {
      ar: 'أدلة قصيرة وصادقة لمن يفكّر في بناء فيلا خاصة في جدة — لتتّخذ قرارات أوضح قبل أن تبدأ.',
      en: 'Short, honest guides for anyone considering building a private villa in Jeddah — to help you make clearer decisions before you start.'
    },
    readMore: { ar: 'اقرأ الدليل', en: 'Read the guide' },
    backToJournal: { ar: 'المدوّنة', en: 'Journal' },
    relatedTitle: { ar: 'خدمات ذات صلة', en: 'Related services' }
  },

  journal: [
    {
      slug: 'villa-design-cost-jeddah',
      date: '2026-05-20',
      title: { ar: 'كم تكلفة تصميم فيلا في جدة؟ دليل عملي — WB Studio', en: 'How Much Does Villa Design Cost in Jeddah? A Practical Guide — WB Studio' },
      desc: {
        ar: 'ما الذي يحدّد تكلفة تصميم فيلا خاصة في جدة، وكيف تخطّط لميزانية التصميم بوضوح قبل أن تبدأ.',
        en: 'What determines the cost of designing a private villa in Jeddah, and how to plan your design budget clearly before you start.'
      },
      h1: { ar: 'كم تكلفة تصميم فيلا في جدة؟', en: 'How much does villa design cost in Jeddah?' },
      intro: {
        ar: 'سؤال يطرحه كل صاحب أرض، والإجابة الصادقة: «حسب». لكن هناك عوامل واضحة تحدّد التكلفة، وفهمها يساعدك على التخطيط بثقة.',
        en: 'It’s the first question every landowner asks, and the honest answer is “it depends.” But clear factors drive the cost, and understanding them helps you plan with confidence.'
      },
      sections: [
        {
          heading: { ar: 'ما الذي يحدّد التكلفة', en: 'What drives the cost' },
          body: {
            ar: 'مساحة الأرض والبناء، تعقيد التصميم، نطاق المخرجات (فكرة فقط أم حزمة تنفيذ كاملة)، ومستوى التنسيق الهندسي. كلما زاد النطاق والتفصيل، زادت القيمة والتكلفة.',
            en: 'Plot and built-up area, design complexity, the scope of deliverables (concept only vs. a full construction package), and the level of engineering coordination. The greater the scope and detail, the greater the value — and the cost.'
          }
        },
        {
          heading: { ar: 'رسوم التصميم مقابل تكلفة البناء', en: 'Design fees vs. construction cost' },
          body: {
            ar: 'رسوم التصميم جزء صغير من ميزانية المشروع الكلية، لكنها الأكثر تأثيراً على النتيجة. تصميم جيد يوفّر أضعافه في التنفيذ بتقليل الأخطاء والهدر.',
            en: 'Design fees are a small part of the total project budget, but the most influential on the outcome. Good design saves many times its cost in construction by reducing errors and waste.'
          }
        },
        {
          heading: { ar: 'كيف نوضح التكلفة', en: 'How we clarify cost' },
          body: {
            ar: 'نبدأ بمكالمة مجانية وتصور مبدئي مجاني، ثم نوضح نطاق العمل والرسوم بالكامل قبل أي اتفاق مدفوع — بلا مفاجآت.',
            en: 'We start with a free call and a free preliminary concept, then clarify the scope and fees fully before any paid agreement — no surprises.'
          }
        }
      ],
      related: ['villa-design-jeddah', 'luxury-villa-design-jeddah']
    },
    {
      slug: 'before-designing-private-villa',
      date: '2026-04-28',
      title: { ar: 'ما الذي تجهّزه قبل تصميم فيلتك الخاصة — WB Studio', en: 'What to Prepare Before Designing Your Private Villa — WB Studio' },
      desc: {
        ar: 'قائمة عملية بما تحتاج تجهيزه — صك الأرض، الاحتياجات، الميزانية، والمراجع — قبل بدء تصميم فيلتك في جدة.',
        en: 'A practical checklist of what to prepare — your deed, needs, budget and references — before starting your villa design in Jeddah.'
      },
      h1: { ar: 'ما الذي تجهّزه قبل تصميم فيلتك', en: 'What to prepare before designing your villa' },
      intro: {
        ar: 'كلما وضحت رؤيتك وأوراقك من البداية، كان التصميم أسرع وأدق. إليك ما نطلبه عادةً قبل الخطوة الأولى.',
        en: 'The clearer your vision and paperwork from the start, the faster and more accurate the design. Here’s what we usually ask for before the first step.'
      },
      sections: [
        {
          heading: { ar: 'أوراق الأرض', en: 'The plot documents' },
          body: {
            ar: 'صك الأرض، الكروكي/المخطط، ومساحة وأبعاد الأرض واتجاهها — تحدّد ما يمكن بناؤه وكيف توجَّه الفيلا.',
            en: 'The deed, the site plan/croquis, and the plot’s area, dimensions and orientation — these define what can be built and how the villa is oriented.'
          }
        },
        {
          heading: { ar: 'احتياجات العائلة', en: 'Your family’s needs' },
          body: {
            ar: 'عدد الغرف، فراغات الضيافة، خصوصية النساء، احتياجات السائق والخدم، والمستقبل (توسّع، أطفال). كلما صدقت القائمة، نجح التصميم.',
            en: 'Number of rooms, hospitality spaces, women’s privacy, driver and staff needs, and the future (expansion, children). The more honest the list, the better the design.'
          }
        },
        {
          heading: { ar: 'الميزانية والمراجع', en: 'Budget and references' },
          body: {
            ar: 'نطاق ميزانية واقعي وصور لمشاريع تعجبك — لا لننسخها، بل لنفهم ذوقك بدقة.',
            en: 'A realistic budget range and images of projects you like — not to copy, but to understand your taste precisely.'
          }
        }
      ],
      related: ['villa-design-jeddah', 'modern-villa-design-jeddah']
    },
    {
      slug: 'concept-design-vs-execution-drawings',
      date: '2026-04-10',
      title: { ar: 'التصور المبدئي مقابل مخططات التنفيذ: الفرق — WB Studio', en: 'Concept Design vs. Execution Drawings: The Difference — WB Studio' },
      desc: {
        ar: 'ما الفرق بين التصور المعماري ومخططات التنفيذ (IFC)، ولماذا تحتاج الاثنين لبناء فيلا ناجحة في جدة.',
        en: 'The difference between architectural concept and execution (IFC) drawings, and why you need both to build a successful villa in Jeddah.'
      },
      h1: { ar: 'التصور المبدئي مقابل مخططات التنفيذ', en: 'Concept design vs. execution drawings' },
      intro: {
        ar: 'كثير من المشاكل في الموقع تبدأ من خلط هاتين المرحلتين. فهم الفرق يحميك من التأخير والتكاليف الإضافية.',
        en: 'Many problems on site begin with confusing these two stages. Understanding the difference protects you from delays and extra costs.'
      },
      sections: [
        {
          heading: { ar: 'التصور المعماري', en: 'The architectural concept' },
          body: {
            ar: 'يحدّد الفكرة والكتل والفراغات والأجواء — الرؤية. يجيب عن «كيف ستبدو الفيلا وكيف نعيش فيها».',
            en: 'Defines the idea, massing, spaces and atmosphere — the vision. It answers “how will the villa look and how will we live in it.”'
          }
        },
        {
          heading: { ar: 'مخططات التنفيذ', en: 'Execution drawings' },
          body: {
            ar: 'تترجم الرؤية إلى تفاصيل دقيقة وأبعاد ومواصفات ومخططات منسّقة بين التخصصات — ما يبني منه المقاول فعلاً.',
            en: 'Translate the vision into precise details, dimensions, specifications and coordinated multi-discipline drawings — what the contractor actually builds from.'
          }
        },
        {
          heading: { ar: 'لماذا تحتاج الاثنين', en: 'Why you need both' },
          body: {
            ar: 'تصور بلا تنفيذ يبقى حلماً، وتنفيذ بلا تصور قوي يبني بيتاً بلا روح. نقود المشروع عبر المرحلتين بتنسيق BIM كامل.',
            en: 'A concept without execution stays a dream; execution without a strong concept builds a house without soul. We lead the project through both, with full BIM coordination.'
          }
        }
      ],
      related: ['villa-design-jeddah', 'modern-villa-design-jeddah', 'villa-renovation-design-jeddah']
    },
    {
      slug: 'obhur-villa-design-considerations',
      date: '2026-03-22',
      title: { ar: 'اعتبارات تصميم فلل أبحر الساحلية — WB Studio', en: 'Obhur Coastal Villa Design Considerations — WB Studio' },
      desc: {
        ar: 'ما يجب مراعاته عند تصميم فيلا في أبحر: الإطلالة، الخصوصية الساحلية، الملوحة والرياح، والحياة الخارجية.',
        en: 'What to consider when designing a villa in Obhur: the view, coastal privacy, salt and wind, and outdoor living.'
      },
      h1: { ar: 'اعتبارات تصميم فلل أبحر', en: 'Obhur coastal villa design considerations' },
      intro: {
        ar: 'أرض أبحر فرصة ثمينة وتحدٍّ في آنٍ. هذه أهم النقاط التي نراعيها لنحوّل الإطلالة إلى قيمة دائمة.',
        en: 'An Obhur plot is both a precious opportunity and a challenge. These are the key points we account for to turn the view into lasting value.'
      },
      sections: [
        {
          heading: { ar: 'الإطلالة مقابل الخصوصية', en: 'View vs. privacy' },
          body: {
            ar: 'الانفتاح على البحر مطلوب، لكن دون كشف العائلة للجيران والطريق. الحل في التوجيه وتدرّج الشرفات والستائر المعمارية.',
            en: 'Opening to the sea is desirable, but without exposing the family to neighbours and the street. The answer is orientation, layered terraces and architectural screens.'
          }
        },
        {
          heading: { ar: 'المناخ الساحلي', en: 'The coastal climate' },
          body: {
            ar: 'الملوحة والرطوبة والرياح تتطلب مواد وتفاصيل مقاومة، وتظليلاً يحمي من شمس منعكسة على الماء.',
            en: 'Salt, humidity and wind demand resistant materials and detailing, and shading that protects from sun reflected off the water.'
          }
        },
        {
          heading: { ar: 'الحياة الخارجية', en: 'Outdoor living' },
          body: {
            ar: 'مسبح بإطلالة، جلسات مظللة، وسطح معيشة — قيمة أرض أبحر في خارجها بقدر داخلها.',
            en: 'A view-facing pool, shaded seating and a rooftop — the value of an Obhur plot is in its exterior as much as its interior.'
          }
        }
      ],
      related: ['obhur-villa-design', 'luxury-villa-design-jeddah']
    }
  ]
};
