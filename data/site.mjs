// Site-wide content and configuration — single source of truth for everything
// that is not a project (see data/projects.json for projects).
// Shared visible strings use { ar, en, de }; market pages use published languages.
// After editing, run: node scripts/build.mjs

const site = {
  domain: 'https://wbstudio.xyz',
  brand: 'WB Studio',
  author: { name: { ar: 'وائل بو سماعيل', en: 'Wael Bousmael' } },

  // ── Contact (do not change without the owner's approval — used in JSON-LD claims) ──
  phoneDisplay: '+966 53 806 0383',
  phoneE164: '+966538060383',
  phones: [
    { e164: '+966538060383', display: '+966 53 806 0383', country: { ar: 'السعودية', en: 'Saudi Arabia', de: 'Saudi-Arabien' } },
    { e164: '+4917683223821', display: '+49 176 83223821', country: { ar: 'ألمانيا', en: 'Germany', de: 'Deutschland' } },
    { e164: '+9613038248', display: '+961 3 038 248', country: { ar: 'لبنان', en: 'Lebanon', de: 'Libanon' } }
  ],
  email: 'w.bousmael@wbstudio.xyz',
  whatsappNumber: '966538060383',
  formAction: 'https://formsubmit.co/ajax/wael.bousmael@gmail.com',
  ogImage: 'https://wbstudio.xyz/assets/images/og.jpg',
  ogImageMedia: {
    src: '/assets/images/og.jpg', w: 1536, h: 1024,
    alt: {
      ar: 'تصور فيلا المنتشري في جدة بواجهات حجرية وشرفات مزروعة',
      en: 'Montashiri Villa design in Jeddah with stone facades and planted terraces',
      de: 'Entwurf der Montashiri Villa in Jeddah mit Steinfassade und bepflanzten Terrassen'
    }
  },

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
    menuTitle: { ar: 'قائمة التنقل', en: 'Navigation menu' },
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
      ar: 'تصميم فلل ومنازل في جدة والخليج | WB Studio',
      en: 'Villa & Home Design in Jeddah | WB Studio'
    },
    seoDesc: {
      ar: 'مهندس معماري لتصميم الفلل والمنازل الخاصة في جدة والسعودية والخليج. مكالمة مجانية، تصور مبدئي مجاني، واتفاق مدفوع فقط بعد وضوح الرؤية والتوافق.',
      en: 'Private villa and home design in Jeddah and the Gulf, from concept to construction drawings. Free call and preliminary concept before any paid agreement.'
    },
    eyebrow: { ar: 'عمارة الفلل الخاصة — جدة', en: 'Private villa architecture — Jeddah' },
    h1: {
      ar: 'نصمم فلل ومنازل خاصة في جدة والخليج',
      en: 'We design private villas and homes in Jeddah and the Gulf'
    },
    positioning: {
      ar: 'تصميم معماري يقوده وائل بو سماعيل، يراعي خصوصية عائلتك وضوء البيت وتفاصيل الحياة اليومية — من الفكرة إلى مخططات التنفيذ.',
      en: 'Architecture led by Wael Bousmael, shaped around your family’s privacy, daylight and daily life — from concept to construction drawings.'
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
    spotlightProject: 'hillside-villa-aley',
    heroImage: {
      src: '/assets/projects/hillside-villa-aley/cover.webp', w: 1464, h: 915,
      alt: {
        ar: 'التصميم المقترح لفيلا قيد التنفيذ في قضاء عاليه بواجهات حجرية وتراسات وحديقة',
        en: 'Proposed stone-clad hillside villa under construction in Aley District, with terraces and garden'
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
      ar: 'أعمال تصميم الفلل والتجديد والتصميم الداخلي | WB Studio',
      en: 'Villa Design, Renovation & Interior Projects | WB Studio'
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
      ar: 'مراحل تصميم الفيلا في جدة | WB Studio',
      en: 'Villa Design Process in Jeddah | WB Studio'
    },
    seoDesc: {
      ar: 'كيف يعمل WB Studio: مكالمة مجانية، تصور مبدئي مجاني، واتفاق مدفوع فقط بعد التوافق — مع خدمات تمتد من الفكرة المعمارية إلى تصميم جاهز للتنفيذ.',
      en: 'Explore our villa design process in Jeddah: free call, free preliminary concept, then an agreed scope and fee. From architectural concept to construction drawings.'
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
          ar: 'مراجعة الأرض وأهداف نمط الحياة وتحديد واضح للمنزل الذي تريد العيش فيه.',
          en: 'A review of the plot and lifestyle goals, with a clear definition of the home you want to live in.'
        },
        image: {
          src: '/assets/images/workflow-1.webp', w: 600, h: 600,
          alt: { ar: 'مكالمة فيديو مع العميل لمراجعة الأرض والأهداف', en: 'A video call with the client to review the plot and goals' }
        }
      },
      {
        title: { ar: 'تصور مبدئي مجاني', en: 'Free preliminary concept' },
        text: {
          ar: 'نناقش الاتجاه الأولي عبر مكالمة فيديو قبل أي التزام — فكرة معمارية وأجواء داخلية منسجمة مع أولوياتك.',
          en: 'We discuss the initial direction on a video call before any commitment — an architectural concept and interior atmosphere aligned with your priorities.'
        },
        image: {
          src: '/assets/images/workflow-2.webp', w: 571, h: 571,
          alt: { ar: 'نموذج كتلي مبدئي للفيلا يوضح التصور المعماري الأول', en: 'An early massing model of the villa showing the first architectural concept' }
        }
      },
      {
        title: { ar: 'اتفاق مدفوع بعد التوافق فقط', en: 'Paid agreement only after alignment' },
        text: {
          ar: 'إذا كان الاتجاه مناسباً، ننتقل إلى الاتفاق وبدء التصميم التفصيلي — حزمة تصميم تقود الاستشاريين والمقاولين بوضوح.',
          en: 'If the direction is right, we move into the agreement and detailed design — a design package that leads consultants and contractors with clarity.'
        },
        image: {
          src: '/assets/images/workflow-3.webp', w: 600, h: 600,
          alt: { ar: 'منظور نهائي واقعي للفيلا بعد تطوير التصميم التفصيلي', en: 'A final photoreal render of the villa after the detailed design is developed' }
        }
      }
    ]
  },

  about: {
    seoTitle: {
      ar: 'وائل بو سماعيل | معماري فلل في جدة — WB Studio',
      en: 'Wael Bousmael | Villa Architect in Jeddah — WB Studio'
    },
    seoDesc: {
      ar: 'تعرف على WB Studio بقيادة وائل بو سماعيل: ممارسة معمارية شخصية لتصميم الفلل والمنازل الخاصة في جدة والسعودية والخليج عبر مسار واضح، حضورياً أو عن بُعد.',
      en: 'Meet WB Studio, led by Wael Bousmael: a personal architecture practice for private villas and homes in Jeddah, Saudi Arabia and the Gulf, with a clear process, in person or remotely.'
    },
    h1: { ar: 'من نحن', en: 'About' },
    intro: {
      ar: 'استوديو معماري بوتيكي يقوده مؤسسه، متخصص في الفلل والمنازل الخاصة في جدة وعموم الخليج. يجمع بين تصميم حديث مدروس وحسٍّ لبنانيّ في التعامل مع الحجر والضوء والنسب، وقراءةٍ دقيقة لطريقة عيش العائلات السعودية — بيوت مدروسة بهوية واضحة، حضورياً أو عن بُعد.',
      en: 'A boutique, founder-led architecture studio dedicated to private villas and homes in Jeddah and across the Gulf. It pairs refined modern design with a Lebanese sensibility for stone, light and proportion, and a close read of how Saudi families actually live — considered houses with a clear identity, delivered in person or remotely.'
    },
    name: { ar: 'وائل بو سماعيل — معماري', en: 'Wael Bousmael — Architect' },
    // Bio preserved verbatim from the original site.
    bio: {
      ar: 'وائل بو سماعيل معماري ومنسق BIM بخبرة تتجاوز 12 عامًا في تصميم الفلل السكنية الفاخرة. يقود المشروع من الفكرة الأولى حتى مخططات التنفيذ (IFC)، مع تنسيق كامل بين المعماري والإنشائي والميكانيكي لضمان جودة التنفيذ وتقليل التعارضات. عمل على مشاريع في ألمانيا ولبنان والسعودية، ويركّز على تحويل الرؤية التصميمية إلى نتائج قابلة للبناء بكفاءة ووضوح.',
      en: 'Wael Bousmael is an architect and BIM coordinator with 12+ years of experience in luxury residential villas. He leads projects from early concept to IFC documentation, coordinating architectural, structural, and MEP disciplines to ensure build quality and minimize clashes. He has delivered projects in Germany, Lebanon, and Saudi Arabia, with a clear focus on turning strong design ideas into efficient, buildable outcomes.'
    },
    practiceTitle: { ar: 'الممارسة', en: 'The practice' },
    practiceText: {
      ar: 'ممارسة معمارية مركزة تمنح كل مشروع اهتماماً مباشراً وقيادة تصميمية متسقة، مع شركاء موثوقين عند الحاجة. عملية هادئة وشفافة من أول رسم حتى التصميم النهائي.',
      en: 'A focused architectural practice that gives every project direct attention and consistent design leadership, with trusted partners brought in when needed. A calm, transparent process from the first sketch to the final design.'
    },
    facts: [
      { label: { ar: 'المقر', en: 'Based in' }, value: { ar: 'جدة · برلين', en: 'Jeddah · Berlin' } },
      { label: { ar: 'نطاق العمل', en: 'Working across' }, value: { ar: 'السعودية والخليج — حضورياً وعن بُعد', en: 'Saudi Arabia & the Gulf — in person and remotely' } },
      { label: { ar: 'اللغات', en: 'Languages' }, value: { ar: 'العربية · الإنجليزية · الألمانية', en: 'Arabic · English · German' } },
      { label: { ar: 'التخصص', en: 'Focus' }, value: { ar: 'فلل خاصة · تصميم داخلي · تنسيق BIM', en: 'Private villas · Interiors · BIM coordination' } }
    ],
    portrait: {
      src: '/assets/images/about-hero.jpg', w: 584, h: 800,
      alt: { ar: 'وائل بو سماعيل، معماري فلل ومنازل خاصة', en: 'Wael Bousmael, architect of private villas and homes' }
    }
  },

  contactPage: {
    seoTitle: {
      ar: 'تواصل مع WB Studio | تصميم فلل في جدة',
      en: 'Contact WB Studio | Villa Design in Jeddah'
    },
    seoDesc: {
      ar: 'أرسل تفاصيل الأرض لطلب مكالمة مجانية وتصور مبدئي مجاني لتصميم فيلتك في جدة والسعودية والخليج. لا يبدأ أي اتفاق مدفوع إلا بعد التوافق.',
      en: 'Send your plot details to request a free call and a free preliminary concept for your villa in Jeddah, Saudi Arabia or the Gulf. No paid agreement before alignment.'
    },
    h1: { ar: 'تواصل', en: 'Contact' },
    intro: {
      ar: 'جاهز لمراجعة أرضك؟ نبدأ بمكالمة مجانية وتصور مبدئي مجاني — ولا يبدأ أي اتفاق مدفوع إلا بعد وضوح الرؤية والتوافق.',
      en: 'Ready to review your plot? We begin with a free call and a free preliminary concept — a paid agreement starts only once the direction is clear and aligned.'
    },
    whatsappCta: { ar: 'احجز مكالمة مجانية عبر واتساب', en: 'Book a free call on WhatsApp' },
    directTitle: { ar: 'تواصل مباشر', en: 'Direct contact' },
    faqTitle: { ar: 'أسئلة شائعة عن تصميم الفلل الخاصة', en: 'Frequently asked questions about private villa design' }
  },

  // ── Lead form (labels, placeholders and options preserved verbatim) ──
  form: {
    title: { ar: 'أرسل تفاصيل الأرض لطلب مكالمة مجانية', en: 'Send plot details to request a free call' },
    subtitle: {
      ar: 'شارك موقع الأرض والميزانية التقريبية. سنراجع التفاصيل ونعود إليك خلال يومين عمل لتحديد الخطوة الأنسب.',
      en: 'Share the plot location and estimated budget. We will review the details and get back to you within two business days to define the right next step.'
    },
    contactGroupLabel: { ar: 'بيانات التواصل', en: 'Contact details' },
    plotGroupLabel: { ar: 'بيانات الأرض', en: 'Plot details' },
    budgetGroupLabel: { ar: 'نطاق الميزانية', en: 'Budget range' },
    name: { ar: 'الاسم', en: 'Name' },
    namePh: { ar: 'أدخل اسمك الكامل', en: 'Enter your full name' },
    phone: { ar: 'رقم الهاتف', en: 'Phone Number' },
    phonePh: { ar: 'مثال: +966 5X XXX XXXX', en: 'Example: +966 5X XXX XXXX' },
    email: { ar: 'البريد الإلكتروني', en: 'Email' },
    emailPh: { ar: 'example@email.com', en: 'name@example.com' },
    location: { ar: 'موقع الأرض', en: 'Land Location' },
    locationPh: { ar: 'المدينة أو الحي أو العنوان', en: 'City, district, or address' },
    locationHelper: {
      ar: 'اكتب المدينة أو الحي، أو أضف رابط موقع الأرض من Google Maps إن توفر.',
      en: 'Enter the city or district, or paste the plot’s Google Maps link if available.'
    },
    maps: { ar: 'رابط Google Maps', en: 'Google Maps Link' },
    mapsPh: { ar: 'https://maps.google.com/...', en: 'https://maps.google.com/...' },
    budget: { ar: 'الميزانية التقريبية', en: 'Estimated Budget' },
    budgetPh: { ar: 'اختياري', en: 'Optional' },
    budgetOptions: {
      ar: ['أقل من 1 مليون ريال', '1 إلى 2 مليون ريال', '2 إلى 4 مليون ريال', 'أكثر من 4 مليون ريال'],
      en: ['Below SAR 1M', 'SAR 1M to 2M', 'SAR 2M to 4M', 'Above SAR 4M']
    },
    submit: { ar: 'أرسل تفاصيل الأرض', en: 'Send plot details' },
    success: {
      ar: 'تم إرسال طلبك بنجاح. سنعاود التواصل معك خلال يومين عمل.',
      en: 'Your request was sent successfully. We will get back to you within two business days.'
    },
    error: {
      ar: 'تعذر إرسال الطلب حالياً. الرجاء المحاولة مرة أخرى.',
      en: 'We could not submit your request right now. Please try again.'
    }
  },

  // ── FAQ (preserved verbatim; rendered on the contact page + FAQPage schema) ──
  faq: [
    {
      q: { ar: 'كم تكلفة تصميم فيلا خاصة؟', en: 'How much does private villa design cost?' },
      a: {
        ar: 'تعتمد التكلفة على مساحة الأرض ونطاق العمل والمخرجات المطلوبة. نبدأ دائماً بمكالمة مجانية وتصور مبدئي مجاني، ونوضح التكلفة والمسار بالكامل قبل أي اتفاق مدفوع.',
        en: 'Cost depends on the plot size, scope of work, and required deliverables. We always start with a free call and a free preliminary concept, and clarify the full cost and path before any paid agreement.'
      }
    },
    {
      q: { ar: 'هل تقدمون تصميم الفلل عن بُعد خارج جدة؟', en: 'Do you design villas remotely outside Jeddah?' },
      a: {
        ar: 'نعم. نخدم عملاء جدة والسعودية ودول الخليج حضورياً أو عن بُعد عبر مكالمات الفيديو ومشاركة المخططات، مع الحفاظ على نفس الوضوح في كل خطوة.',
        en: 'Yes. We serve clients in Jeddah, Saudi Arabia, and the Gulf in person or remotely via video calls and shared drawings, keeping the same clarity at every step.'
      }
    },
    {
      q: { ar: 'ما المخرجات التي أحصل عليها؟', en: 'What deliverables do I get?' },
      a: {
        ar: 'من الفكرة المعمارية والتوجه الداخلي حتى تصميم جاهز للتنفيذ يوحد فهم الاستشاريين والمقاولين ويحافظ على الرؤية الأصلية للمشروع.',
        en: 'From the architectural concept and interior direction through to build-ready design that aligns consultants and contractors and protects the project’s original vision.'
      }
    },
    {
      q: { ar: 'كم تستغرق مدة تصميم الفيلا؟', en: 'How long does villa design take?' },
      a: {
        ar: 'تختلف المدة حسب حجم المشروع وتعقيده. نوضح الجدول الزمني المتوقع ضمن التصور المبدئي قبل بدء أي عمل مدفوع.',
        en: 'It varies with the size and complexity of the project. We outline the expected timeline within the preliminary concept before any paid work begins.'
      }
    },
    {
      q: { ar: 'متى يبدأ الدفع؟', en: 'When does payment start?' },
      a: {
        ar: 'المكالمة الأولى والتصور المبدئي مجانيان تماماً، ولا يبدأ أي اتفاق مدفوع إلا بعد وضوح الرؤية والتوافق على الاتجاه.',
        en: 'The first call and preliminary concept are completely free; a paid agreement only begins after the vision is clear and the direction is agreed.'
      }
    }
  ],

  contactBand: {
    title: { ar: 'جاهز لمراجعة أرضك؟', en: 'Ready to review your plot?' },
    text: {
      ar: 'مكالمة مجانية، ثم تصور مبدئي مجاني — ولا نبدأ أي اتفاق مدفوع إلا بعد وضوح الرؤية والتوافق.',
      en: 'A free call, then a free preliminary concept — we only begin a paid agreement after the direction is clear and aligned.'
    },
    primary: { ar: 'أرسل تفاصيل الأرض', en: 'Send plot details' },
    secondary: { ar: 'واتساب', en: 'WhatsApp' }
  },

  credits: {
    seoTitle: { ar: 'اعتمادات الصور | WB Studio', en: 'Image Credits | WB Studio' },
    seoDesc: {
      ar: 'اعتمادات صور مشاريع WB Studio والصور المرجعية المرخصة المستخدمة في الدراسات المفاهيمية.',
      en: 'Credits for WB Studio project imagery and licensed reference images used in concept studies.'
    },
    h1: { ar: 'اعتمادات الصور', en: 'Image credits' },
    intro: {
      ar: 'صور المشاريع وصورة الواجهة الرئيسية مقدمة من WB Studio. أما الصور المرجعية في الدراسات المفاهيمية المعلّمة بهذه الصفة فهي من مصورين عبر Unsplash، وترد مصادرها أدناه بموجب الرخصة التي تتيح الاستخدام التجاري مجاناً.',
      en: 'Project imagery and the homepage image are supplied by WB Studio. Reference images in the clearly labeled concept studies come from Unsplash photographers; their sources are listed below under its free commercial-use license.'
    },
    licenseNote: {
      ar: 'الرخصة: رخصة Unsplash (استخدام تجاري مجاني، لا تتطلب نسب العمل لصاحبه). روابط المصدر أدناه لكل صورة. القائمة الكاملة في ملف assets/licenses/LICENSES.md ضمن مستودع الموقع.',
      en: 'License: the Unsplash License (free commercial use, attribution not required). Source links for every image are listed below. The full register lives in assets/licenses/LICENSES.md in the site repository.'
    },
    sourceLabel: { ar: 'المصدر', en: 'Source' },
    heroLabel: { ar: 'صورة الواجهة الرئيسية', en: 'Homepage hero image' },
    ownedLabel: { ar: 'صورة مشروع مقدمة من WB Studio — جميع الحقوق محفوظة للاستوديو.', en: 'Project imagery supplied by WB Studio — all rights reserved.', de: 'Von WB Studio bereitgestelltes Projektbild — alle Rechte vorbehalten.' }
  },

  // ── Services hub (lists the high-intent landing pages) ──
  services: {
    seoTitle: {
      ar: 'خدمات تصميم الفلل في جدة | WB Studio',
      en: 'Villa Design Services in Jeddah | WB Studio'
    },
    seoDesc: {
      ar: 'خدمات تصميم الفلل الخاصة في جدة: فلل فاخرة، تصميم مودرن، فلل أبحر وشمال جدة، وعمارة حجازية حديثة — مكالمة مجانية وتصور مبدئي مجاني قبل أي اتفاق.',
      en: 'Villa design and renovation in Jeddah: modern homes, luxury villas, Obhur plots and Hijazi architecture. Start with a free call and preliminary concept.'
    },
    h1: { ar: 'خدمات تصميم الفلل في جدة', en: 'Villa design services in Jeddah' },
    intro: {
      ar: 'مسارات تصميم مركّزة لعملاء الفلل الخاصة في جدة وعموم الخليج. اختر ما يناسب أرضك ورؤيتك — وكلها تبدأ بمكالمة مجانية وتصور مبدئي مجاني.',
      en: 'Focused design paths for private villa clients in Jeddah and across the Gulf. Choose what fits your plot and vision — each begins with a free call and a free preliminary concept.'
    },
    explore: { ar: 'تعرّف أكثر', en: 'Learn more' }
  },

  // ── High-intent landing pages (root-level keyword slugs, bilingual) ──
  landings: [
    {
      slug: 'villa-design-jeddah',
      label: { ar: 'تصميم فيلا في جدة', en: 'Villa design in Jeddah' },
      summary: {
        ar: 'نقطة البداية لأصحاب الأراضي والعائلات: كيف نصمم فيلا خاصة في جدة من الفكرة حتى التنفيذ.',
        en: 'The starting point for landowners and families: how we design a private villa in Jeddah from concept to construction.'
      },
      seoTitle: { ar: 'تصميم فيلا في جدة | مصمم فلل خاصة — WB Studio', en: 'Villa Design in Jeddah | Private Villa Designer — WB Studio' },
      seoDesc: {
        ar: 'تصميم فلل خاصة في جدة لأصحاب الأراضي والعائلات والمستثمرين. استوديو بوتيكي يقود المشروع من الفكرة حتى مخططات التنفيذ. مكالمة مجانية وتصور مبدئي مجاني.',
        en: 'Private villa design in Jeddah for landowners, families and investors. A boutique studio that leads the project from concept to construction drawings. Free call and preliminary concept.'
      },
      eyebrow: { ar: 'تصميم الفلل الخاصة — جدة', en: 'Private villa design — Jeddah' },
      h1: { ar: 'تصميم فيلا خاصة في جدة', en: 'Private villa design in Jeddah' },
      intro: {
        ar: 'إذا كنت تملك أرضاً في جدة وتخطّط لبناء فيلتك، فأنت بحاجة إلى مصمم يفهم الأرض والخصوصية وطريقة عيش عائلتك. WB Studio استوديو بوتيكي يصمم الفلل الخاصة في جدة وعموم الخليج — من الفكرة الأولى حتى مخططات قابلة للتنفيذ.',
        en: 'If you own a plot in Jeddah and plan to build your villa, you need a designer who understands the land, privacy, and how your family lives. WB Studio is a boutique studio designing private villas in Jeddah and across the Gulf — from the first idea to build-ready drawings.'
      },
      sections: [
        {
          heading: { ar: 'لمن نصمم', en: 'Who we design for' },
          body: {
            ar: 'نعمل مع أصحاب الأراضي والعائلات والمستثمرين الخاصين الذين يريدون فيلا مدروسة لا نسخة مكرّرة. كل مشروع يحصل على اهتمام مباشر من المصمم، لا على خط إنتاج.',
            en: 'We work with landowners, families and private investors who want a considered villa, not a repeated template. Every project gets the designer’s direct attention, not a production line.'
          }
        },
        {
          heading: { ar: 'من الفكرة إلى التنفيذ', en: 'From concept to construction' },
          body: {
            ar: 'يبدأ المسار بدراسة الأرض والخصوصية والتوجيه الشمسي، ثم فكرة معمارية وأجواء داخلية، وصولاً إلى حزمة تصميم تقود الاستشاريين والمقاولين بوضوح وتقلّل التعارضات في الموقع.',
            en: 'The path starts with a study of the plot, privacy and solar orientation, then an architectural concept and interior atmosphere, through to a design package that leads consultants and contractors clearly and reduces clashes on site.'
          }
        }
      ],
      serviceType: 'Villa design',
      faq: [
        {
          q: { ar: 'كيف أبدأ تصميم فيلتي في جدة؟', en: 'How do I start designing my villa in Jeddah?' },
          a: { ar: 'أرسل موقع الأرض ومساحتها وفكرتك العامة عبر واتساب أو النموذج. نبدأ بمكالمة مجانية وتصور مبدئي مجاني قبل أي اتفاق مدفوع.', en: 'Send the plot location, area and your general idea via WhatsApp or the form. We start with a free call and a free preliminary concept before any paid agreement.' }
        },
        {
          q: { ar: 'هل تصممون لأراضٍ في كل أحياء جدة؟', en: 'Do you design for plots in any Jeddah district?' },
          a: { ar: 'نعم — شمال جدة وأبحر والأحياء الراقية وغيرها. نراعي أنظمة البناء والخصوصية وطبيعة كل حي.', en: 'Yes — North Jeddah, Obhur, premium districts and beyond. We account for building regulations, privacy and the character of each district.' }
        },
        {
          q: { ar: 'هل يمكن العمل إذا كنت خارج جدة؟', en: 'Can we work together if I’m outside Jeddah?' },
          a: { ar: 'بالتأكيد. نخدم عملاء السعودية والخليج عن بُعد عبر مكالمات الفيديو ومشاركة المخططات بنفس الوضوح.', en: 'Absolutely. We serve clients across Saudi Arabia and the Gulf remotely via video calls and shared drawings, with the same clarity.' }
        }
      ],
      related: ['luxury-villa-design-jeddah', 'modern-villa-design-jeddah', 'obhur-villa-design', 'modern-hijazi-villa-design'],
      relatedProjects: ['montashiri-villa', 'byblos-resort'],
      image: { src: '/assets/projects/montashiri-villa/cover.webp', w: 1536, h: 960, alt: { ar: 'فيلا حجرية حديثة في جدة بشرفات مزروعة', en: 'Modern stone villa in Jeddah with planted terraces' } }
    },
    {
      slug: 'villa-renovation-design-jeddah',
      label: { ar: 'تجديد الفلل ومخططات التنفيذ', en: 'Villa renovation & execution drawings' },
      summary: {
        ar: 'لأصحاب الفلل القائمة في جدة: من توثيق الوضع الحالي وإعادة تنظيم البيت إلى مخططات هدم وإنشاء واضحة.',
        en: 'For owners of existing villas in Jeddah: from documenting the current building and reorganizing the home to clear demolition and construction drawings.'
      },
      seoTitle: { ar: 'تجديد الفلل ومخططات التنفيذ في جدة — WB Studio', en: 'Villa Renovation & Execution Drawings Jeddah — WB Studio' },
      seoDesc: {
        ar: 'تصميم تجديد الفلل في جدة ومخططات التنفيذ المعمارية: توثيق الوضع القائم، إعادة تنظيم المساحات، ومخططات هدم وإنشاء واضحة. مكالمة وتصور مبدئي مجاني.',
        en: 'Villa renovation design and architectural execution drawings in Jeddah: existing-condition documentation, spatial redesign, and clear demolition and construction plans.'
      },
      eyebrow: { ar: 'تجديد الفلل — جدة والخليج', en: 'Villa renovation — Jeddah & GCC' },
      h1: { ar: 'تجديد فيلا قائمة بوضوح من أول قياس حتى مخططات التنفيذ', en: 'Renovate an existing villa with clarity from first survey to execution drawings' },
      intro: {
        ar: 'تجديد الفيلا ليس تغيير واجهة أو توزيع أثاث فقط؛ بل قراءة دقيقة لما يمكن الحفاظ عليه، وما يجب تعديله، وكيف تتحول القرارات إلى تعليمات واضحة للاستشاريين والمقاولين. نبدأ بمكالمة مجانية وتصور مبدئي مجاني، ولا يبدأ أي اتفاق مدفوع إلا بعد التوافق.',
        en: 'Villa renovation is more than changing a facade or rearranging furniture. It requires a precise reading of what can remain, what must change, and how each decision becomes clear information for consultants and contractors. We begin with a free call and a free preliminary concept, with no paid agreement until alignment.'
      },
      sections: [
        {
          heading: { ar: 'نفهم المبنى قبل أن نغيّره', en: 'Understand the building before changing it' },
          body: {
            ar: 'نراجع المخططات المتاحة ورفع الوضع القائم وحالة الفراغات والمناسيب والفتحات. جودة هذه البداية تمنع أن يُبنى التصميم على افتراضات خاطئة.',
            en: 'We review available records, the existing-condition survey, spatial relationships, levels and openings. A reliable starting point keeps the renovation from being designed around false assumptions.'
          }
        },
        {
          heading: { ar: 'نفصل القائم عن الهدم والإنشاء', en: 'Separate existing, demolition and construction work' },
          body: {
            ar: 'نحوّل إعادة التنظيم إلى سلسلة مقروءة من المخططات: ما يبقى، وما يُزال، وما يُبنى. يشمل ذلك الجدران والفتحات والسلالم والتراسات والعلاقات الجديدة بين الغرف بحسب نطاق المشروع.',
            en: 'We translate the redesign into a legible drawing sequence: what remains, what is removed and what is built. Depending on scope, this covers walls, openings, stairs, terraces and the new relationships between rooms.'
          }
        },
        {
          heading: { ar: 'حزمة معمارية واضحة للتنفيذ', en: 'A clear architectural execution package' },
          body: {
            ar: 'تجمع الحزمة المخططات والمقاطع والواجهات والتفاصيل المعمارية اللازمة لفهم التدخلات. ويُنسَّق عمل الإنشائي والميكانيكي والكهربائي مع المختصين عندما يكون ذلك ضمن النطاق المتفق عليه.',
            en: 'The package brings together the plans, sections, elevations and architectural details needed to understand the interventions. Structural and MEP input is coordinated with the relevant specialists when included in the agreed scope.'
          }
        }
      ],
      serviceType: 'Villa renovation design and architectural execution drawings',
      faq: [
        {
          q: { ar: 'هل يمكن تجديد الفيلا من دون هدمها بالكامل؟', en: 'Can a villa be renovated without demolishing it completely?' },
          a: { ar: 'غالباً نعم. نحدد ما يمكن الحفاظ عليه وما يحتاج إلى تعديل بعد مراجعة الوضع القائم ومتطلبات العائلة ورأي المختص الإنشائي عند الحاجة.', en: 'Often, yes. We identify what can remain and what needs intervention after reviewing the existing building, the family brief and structural specialist input where required.' }
        },
        {
          q: { ar: 'ما المخططات التي تشملها حزمة التجديد؟', en: 'Which drawings are included in a renovation package?' },
          a: { ar: 'يتحدد ذلك حسب النطاق، وقد يشمل مخططات الوضع القائم والهدم والإنشاء والتوزيع المفروش، إضافة إلى المقاطع والواجهات والتفاصيل المعمارية.', en: 'It depends on the agreed scope and may include existing, demolition, construction and furnished plans, together with sections, elevations and architectural details.' }
        },
        {
          q: { ar: 'هل تشمل الخدمة المخططات الإنشائية والميكانيكية والكهربائية؟', en: 'Does the service include structural and MEP drawings?' },
          a: { ar: 'ليست مشمولة تلقائياً. نحدد التخصصات المطلوبة في العرض، وننسق مع المختصين المعتمدين عندما تكون هذه الخدمات ضمن النطاق.', en: 'They are not automatically included. Required disciplines are defined in the proposal, and we coordinate with qualified specialists when those services form part of the scope.' }
        },
        {
          q: { ar: 'هل يمكن تنفيذ مشروع التجديد عن بُعد خارج جدة؟', en: 'Can you handle a renovation project remotely outside Jeddah?' },
          a: { ar: 'نعم، بشرط توفير رفع دقيق للمبنى وصور ومعلومات موثوقة عن الموقع. نخدم عملاء السعودية والخليج عن بُعد، مع ترتيب الزيارات عند الحاجة وباتفاق منفصل.', en: 'Yes, provided there is an accurate building survey and reliable site information. We serve clients across Saudi Arabia and the Gulf remotely, with site visits arranged separately when needed.' }
        }
      ],
      related: ['villa-design-jeddah', 'modern-villa-design-jeddah'],
      relatedProjects: ['private-villa-renovation-chouf'],
      image: {
        src: '/assets/projects/private-villa-renovation-chouf/cover.webp',
        w: 1601,
        h: 983,
        alt: { ar: 'تصور لتجديد فيلا حجرية بشرفات وتراسات جديدة', en: 'Visualization of a renovated stone villa with new balconies and terraces' }
      }
    },
    {
      slug: 'luxury-villa-design-jeddah',
      label: { ar: 'تصميم فلل فاخرة في جدة', en: 'Luxury villa design in Jeddah' },
      summary: {
        ar: 'للفلل الفاخرة التي توازن بين الخصوصية والضيافة والتفاصيل الراقية والقيمة طويلة المدى.',
        en: 'For luxury villas that balance privacy, hospitality, refined detail and long-term value.'
      },
      seoTitle: { ar: 'تصميم فلل فاخرة في جدة | عمارة راقية — WB Studio', en: 'Luxury Villa Design in Jeddah | Refined Architecture — WB Studio' },
      seoDesc: {
        ar: 'تصميم فلل فاخرة في جدة: خصوصية متدرّجة، فراغات ضيافة، مواد راقية، وتفاصيل مصمّمة لتدوم. استوديو بوتيكي — مكالمة وتصور مبدئي مجاني.',
        en: 'Luxury villa design in Jeddah: layered privacy, hospitality spaces, refined materials and detail built to last. A boutique studio — free call and preliminary concept.'
      },
      eyebrow: { ar: 'الفلل الفاخرة — جدة', en: 'Luxury villas — Jeddah' },
      h1: { ar: 'تصميم فلل فاخرة في جدة', en: 'Luxury villa design in Jeddah' },
      intro: {
        ar: 'الفخامة الحقيقية هدوء لا ضجيج: نِسب مدروسة، مواد صادقة، وخصوصية تُدار بعناية. نصمم فللاً فاخرة في جدة توازن بين استقبال الضيوف وراحة العائلة، وتحتفظ بقيمتها مع الزمن.',
        en: 'Real luxury is calm, not loud: considered proportions, honest materials, and privacy handled with care. We design luxury villas in Jeddah that balance receiving guests with family comfort — and hold their value over time.'
      },
      sections: [
        {
          heading: { ar: 'الخصوصية والضيافة', en: 'Privacy and hospitality' },
          body: {
            ar: 'مسار ضيوف مستقل، مجلس رجال ومجلس عائلي، وتدرّج واضح بين العام والخاص — جوهر الفيلا السعودية الفاخرة، مُعاد تصوّره بلغة حديثة.',
            en: 'An independent guest route, men’s and family majlis, and a clear gradient between public and private — the heart of the luxury Saudi villa, reimagined in a modern language.'
          }
        },
        {
          heading: { ar: 'مواد تدوم', en: 'Materials that last' },
          body: {
            ar: 'نختار مواد قليلة وراقية تتقادم بكرامة: حجر طبيعي، خشب دافئ، ومعادن مدروسة. الفخامة في الملمس والنسب، لا في الزخرفة الزائدة.',
            en: 'We choose a short, refined material palette that ages with dignity: natural stone, warm timber and considered metals. Luxury lives in texture and proportion, not excess ornament.'
          }
        }
      ],
      serviceType: 'Luxury villa design',
      faq: [
        {
          q: { ar: 'ما الذي يجعل تصميم الفيلا فاخراً فعلاً؟', en: 'What makes a villa design truly luxurious?' },
          a: { ar: 'ليست المساحة وحدها، بل النسب والضوء والخصوصية وجودة المواد والتفاصيل. هذه ما نركّز عليه.', en: 'Not size alone, but proportion, light, privacy, and the quality of materials and detail. That is what we focus on.' }
        },
        {
          q: { ar: 'هل تصممون المجالس وفراغات الضيافة؟', en: 'Do you design majlis and hospitality spaces?' },
          a: { ar: 'نعم، وهي محور تصميم الفيلا الفاخرة في جدة: استقبال كريم مع حماية كاملة لخصوصية العائلة.', en: 'Yes — they are central to luxury villa design in Jeddah: gracious reception with full protection of family privacy.' }
        },
        {
          q: { ar: 'هل تعملون ضمن ميزانية فاخرة محددة؟', en: 'Do you work to a defined luxury budget?' },
          a: { ar: 'نوضح نطاق الميزانية مبكراً ونصمم ضمنه بذكاء، فالقيمة طويلة المدى أهم من الإبهار اللحظي.', en: 'We clarify the budget range early and design within it intelligently — long-term value matters more than momentary impact.' }
        }
      ],
      related: ['villa-design-jeddah', 'modern-villa-design-jeddah', 'obhur-villa-design', 'modern-hijazi-villa-design'],
      relatedProjects: ['byblos-resort', 'montashiri-villa'],
      image: { src: '/assets/projects/byblos-resort/cover.webp', w: 1920, h: 1200, alt: { ar: 'وحدات سكنية بكساء حجري تحيط بمسبح وحدائق في منتجع جبيل', en: 'Stone-clad residences surrounding a pool and gardens at Byblos Resort' } }
    },
    {
      slug: 'modern-villa-design-jeddah',
      label: { ar: 'تصميم فيلا مودرن في جدة', en: 'Modern villa design in Jeddah' },
      summary: {
        ar: 'خطوط نظيفة وضوء طبيعي وعلاقة سلسة بين الداخل والخارج — لعملاء يفضّلون العمارة الحديثة.',
        en: 'Clean lines, natural light and a seamless indoor–outdoor relationship — for clients who prefer modern architecture.'
      },
      seoTitle: { ar: 'تصميم فيلا مودرن في جدة | معماري فلل حديثة — WB Studio', en: 'Modern Villa Design in Jeddah | Modern Villa Architect — WB Studio' },
      seoDesc: {
        ar: 'تصميم فيلا مودرن في جدة: خطوط نظيفة، ضوء متحكَّم فيه، وفراغات مفتوحة تحترم الخصوصية والمناخ. معماري فلل حديثة — مكالمة وتصور مبدئي مجاني.',
        en: 'Modern villa design in Jeddah: clean lines, controlled light, and open spaces that respect privacy and climate. A modern villa architect — free call and preliminary concept.'
      },
      eyebrow: { ar: 'الفلل الحديثة — جدة', en: 'Modern villas — Jeddah' },
      h1: { ar: 'تصميم فيلا مودرن في جدة', en: 'Modern villa design in Jeddah' },
      intro: {
        ar: 'العمارة الحديثة في جدة ليست واجهات زجاجية تحت الشمس، بل ضوء يُدار بذكاء وفراغات تتنفّس. نصمم فللاً مودرن بخطوط هادئة وعلاقة سلسة بين الداخل والخارج، مع احترام الخصوصية والمناخ الحار.',
        en: 'Modern architecture in Jeddah isn’t glass walls under the sun — it’s light handled intelligently and spaces that breathe. We design modern villas with calm lines and a seamless indoor–outdoor relationship, while respecting privacy and the hot climate.'
      },
      sections: [
        {
          heading: { ar: 'حداثة تناسب المناخ', en: 'Modernism that suits the climate' },
          body: {
            ar: 'شرفات عميقة، فتحات مدروسة، وتظليل معماري بدل الاعتماد على التكييف وحده — جمال حديث يعمل في حرّ جدة.',
            en: 'Deep terraces, considered openings and architectural shading instead of relying on cooling alone — modern beauty that works in Jeddah’s heat.'
          }
        },
        {
          heading: { ar: 'الداخل والخارج', en: 'Indoor and outdoor' },
          body: {
            ar: 'نربط المعيشة بالحديقة والمسبح والسطح بانسياب، فتتضاعف مساحة العيش وتبقى الخصوصية محفوظة.',
            en: 'We connect living spaces to the garden, pool and roof fluidly, so usable space multiplies while privacy stays protected.'
          }
        }
      ],
      serviceType: 'Modern villa design',
      faq: [
        {
          q: { ar: 'هل التصميم المودرن مناسب لمناخ جدة الحار؟', en: 'Is modern design suitable for Jeddah’s hot climate?' },
          a: { ar: 'نعم، إذا صُمّم بذكاء: تظليل وتوجيه وفتحات مدروسة تجعل الفيلا الحديثة مريحة وموفّرة للطاقة.', en: 'Yes, when designed intelligently: shading, orientation and considered openings make a modern villa comfortable and energy-efficient.' }
        },
        {
          q: { ar: 'هل يمكن دمج لمسات محلية في تصميم مودرن؟', en: 'Can local touches blend into a modern design?' },
          a: { ar: 'بالتأكيد — يمكن إعادة تأويل عناصر حجازية مثل المشربيات والأفنية بلغة حديثة نظيفة.', en: 'Absolutely — Hijazi elements like mashrabiya screens and courtyards can be reinterpreted in a clean modern language.' }
        },
        {
          q: { ar: 'كيف تحافظون على الخصوصية مع الفتحات الكبيرة؟', en: 'How do you keep privacy with large openings?' },
          a: { ar: 'عبر توجيه الفتحات نحو أفنية وحدائق داخلية، وستائر معمارية، وتدرّج المستويات.', en: 'By orienting openings toward internal courts and gardens, using architectural screens, and layering levels.' }
        }
      ],
      related: ['villa-design-jeddah', 'luxury-villa-design-jeddah', 'modern-hijazi-villa-design', 'obhur-villa-design'],
      relatedProjects: ['montashiri-villa', 'coastal-villa'],
      image: { src: '/assets/projects/montashiri-villa/cover.webp', w: 1536, h: 960, alt: { ar: 'فيلا مودرن بخطوط نظيفة وحجر في جدة', en: 'Modern villa with clean lines and stone in Jeddah' } }
    },
    {
      slug: 'obhur-villa-design',
      label: { ar: 'تصميم فلل أبحر', en: 'Obhur villa design' },
      summary: {
        ar: 'للأراضي الساحلية في أبحر وشمال جدة: ضوء البحر، الخصوصية على الواجهة البحرية، والحياة الخارجية.',
        en: 'For coastal plots in Obhur and North Jeddah: sea light, waterfront privacy and outdoor living.'
      },
      seoTitle: { ar: 'تصميم فلل أبحر | فلل شمال جدة الساحلية — WB Studio', en: 'Obhur Villa Design | North Jeddah Coastal Villas — WB Studio' },
      seoDesc: {
        ar: 'تصميم فلل في أبحر وشمال جدة: استثمار ضوء البحر مع خصوصية كاملة، شرفات مظللة، ومسابح بإطلالة. مكالمة وتصور مبدئي مجاني.',
        en: 'Villa design in Obhur and North Jeddah: capturing sea light with full privacy, shaded terraces and view-facing pools. Free call and preliminary concept.'
      },
      eyebrow: { ar: 'الساحل — أبحر وشمال جدة', en: 'The coast — Obhur & North Jeddah' },
      h1: { ar: 'تصميم فلل في أبحر وشمال جدة', en: 'Villa design in Obhur & North Jeddah' },
      intro: {
        ar: 'أبحر ساحل مختلف: ضوء قوي، نسيم بحري، وقيمة عالية للإطلالة. لكنها تتطلب توازناً دقيقاً بين الانفتاح على البحر والخصوصية تجاه الجيران والطريق. نصمم فللاً ساحلية تستثمر الإطلالة دون أن تفقد حميميتها.',
        en: 'Obhur is a different coast: strong light, sea breeze, and a high premium on the view. But it demands a careful balance between opening to the sea and privacy from neighbours and the street. We design coastal villas that capture the view without losing their intimacy.'
      },
      sections: [
        {
          heading: { ar: 'ضوء البحر والخصوصية', en: 'Sea light and privacy' },
          body: {
            ar: 'نوجّه فراغات المعيشة نحو البحر بشرفات عميقة تظلّل من شمس الظهيرة، ونحجب الجهات الأخرى بذكاء — فتطلّ على الماء دون أن يطلّ عليك أحد.',
            en: 'We orient living spaces toward the sea with deep terraces that shade the midday sun, and screen the other sides intelligently — so you face the water without anyone facing you.'
          }
        },
        {
          heading: { ar: 'الحياة الخارجية', en: 'Outdoor living' },
          body: {
            ar: 'مسابح بإطلالة، جلسات مظللة، وأسطح معيشة — لأن قيمة أرض أبحر في حياتها الخارجية بقدر داخلها.',
            en: 'View-facing pools, shaded seating and rooftop living — because the value of an Obhur plot is in its outdoor life as much as its interior.'
          }
        }
      ],
      serviceType: 'Coastal villa design',
      faq: [
        {
          q: { ar: 'هل لديكم خبرة بأراضي أبحر تحديداً؟', en: 'Do you have experience with Obhur plots specifically?' },
          a: { ar: 'نعم، من أعمالنا فلل في أبحر مثل فيلا المنتشري — نراعي الملوحة والرياح والإطلالة والخصوصية الساحلية.', en: 'Yes — our work includes Obhur villas such as Montashiri Villa. We account for salt, wind, the view and coastal privacy.' }
        },
        {
          q: { ar: 'كيف تحمون الخصوصية على واجهة بحرية مفتوحة؟', en: 'How do you protect privacy on an open waterfront?' },
          a: { ar: 'عبر تدرّج الشرفات، التوجيه، والستائر المعمارية — انفتاح كامل على البحر وحجب كامل عن الجيران.', en: 'Through layered terraces, orientation and architectural screens — full openness to the sea, full screening from neighbours.' }
        },
        {
          q: { ar: 'هل تصممون فللاً في شمال جدة عموماً؟', en: 'Do you design villas in North Jeddah generally?' },
          a: { ar: 'نعم، أبحر وشمال جدة من أكثر المناطق التي نعمل فيها.', en: 'Yes — Obhur and North Jeddah are among the areas we work in most.' }
        }
      ],
      related: ['villa-design-jeddah', 'luxury-villa-design-jeddah', 'modern-villa-design-jeddah', 'modern-hijazi-villa-design'],
      relatedProjects: ['montashiri-villa', 'coastal-villa', 'byblos-resort'],
      image: { src: '/assets/projects/montashiri-villa/cover.webp', w: 1536, h: 960, alt: { ar: 'فيلا ساحلية في أبحر بإطلالة وخصوصية', en: 'Coastal villa in Obhur with a view and privacy' } }
    },
    {
      slug: 'modern-hijazi-villa-design',
      label: { ar: 'تصميم فلل حجازية حديثة', en: 'Modern Hijazi villa design' },
      summary: {
        ar: 'إعادة تأويل العمارة الحجازية — الروشان والفناء والحجر — بلغة حديثة تناسب الحياة اليوم.',
        en: 'Reinterpreting Hijazi architecture — rawasheen, courtyards and stone — in a modern language for life today.'
      },
      seoTitle: { ar: 'تصميم فلل حجازية حديثة في جدة | روشان وفناء — WB Studio', en: 'Modern Hijazi Villa Design in Jeddah | Rawasheen & Courtyards — WB Studio' },
      seoDesc: {
        ar: 'تصميم فلل حجازية حديثة في جدة: روشان ومشربيات وأفنية وحجر، بلغة معاصرة نظيفة تحترم الخصوصية والمناخ والهوية. مكالمة وتصور مبدئي مجاني.',
        en: 'Modern Hijazi villa design in Jeddah: rawasheen, mashrabiya, courtyards and stone in a clean contemporary language that respects privacy, climate and identity. Free call and preliminary concept.'
      },
      eyebrow: { ar: 'العمارة الحجازية الحديثة — جدة', en: 'Modern Hijazi architecture — Jeddah' },
      h1: { ar: 'تصميم فلل حجازية حديثة', en: 'Modern Hijazi villa design' },
      intro: {
        ar: 'العمارة الحجازية حلّت مشكلات المناخ والخصوصية قبل قرون عبر الروشان والفناء والحجر. نعيد تأويل هذه الحكمة بلغة حديثة نظيفة — فيلا تنتمي إلى جدة بهوية واضحة، لا نسخة غربية ولا استنساخ تراثي.',
        en: 'Hijazi architecture solved climate and privacy centuries ago through the rawshan, the courtyard and stone. We reinterpret that wisdom in a clean modern language — a villa that belongs to Jeddah with a clear identity, neither a Western copy nor a heritage replica.'
      },
      sections: [
        {
          heading: { ar: 'الروشان والمشربية', en: 'Rawshan and mashrabiya' },
          body: {
            ar: 'الستائر الخشبية المثقّبة تظلّل وتهوّي وتمنح خصوصية — نعيد تصميمها بنِسب حديثة وتنفيذ معاصر بدل النسخ الحرفي.',
            en: 'Perforated timber screens shade, ventilate and give privacy — we redesign them in modern proportions and contemporary fabrication rather than literal copying.'
          }
        },
        {
          heading: { ar: 'الفناء والحجر', en: 'Courtyard and stone' },
          body: {
            ar: 'فناء داخلي يجلب الضوء والهواء إلى عمق البيت بخصوصية تامة، وحجر محلي يربط الفيلا بأرضها ويلطّف مناخها.',
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
    byline: { ar: 'بقلم', en: 'By' },
    guidesTitle: { ar: 'أدلة تساعدك على البدء', en: 'Guides to help you get started' },
    backToJournal: { ar: 'المدوّنة', en: 'Journal' },
    relatedTitle: { ar: 'خدمات ذات صلة', en: 'Related services' }
  },

  journal: [
    {
      slug: 'villa-design-cost-jeddah',
      imageProject: 'montashiri-villa',
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
      imageProject: 'montashiri-villa',
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
      imageProject: 'private-villa-renovation-chouf',
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
      imageProject: 'montashiri-villa',
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

// German copy is kept separate so the established Arabic and English voice stays intact.
// Keys address existing translated fields; arrays retain their original order.
const germanCopy = {
  'author.name': 'Wael Bousmael',
  waMessage: 'Guten Tag, ich möchte ein kostenloses Erstgespräch zu meinem Hausprojekt vereinbaren.\n• Name:\n• Standort des Grundstücks oder Hauses:\n• Fläche:\n• Geschätztes Budget in EUR:',
  fonts: site.fonts.en,
  'nav.work': 'Projekte',
  'nav.services': 'Leistungen',
  'nav.approach': 'Ablauf',
  'nav.journal': 'Journal',
  'nav.about': 'Über das Studio',
  'nav.contact': 'Kontakt',
  'nav.menuOpen': 'Menü öffnen',
  'nav.menuClose': 'Menü schließen',
  'nav.menuTitle': 'Navigation',
  'nav.langLabel': 'EN',
  'nav.langAria': 'Sprache wechseln',
  'nav.skip': 'Zum Inhalt springen',
  'footer.tagline': 'Persönliche Planung für private Häuser und Umbauten in Berlin — mit klaren Räumen, sorgfältigen Details und direktem Kontakt zum Planer.',
  'footer.explore': 'Entdecken',
  'footer.contactTitle': 'Kontakt',
  'footer.whatsappLabel': 'WhatsApp',
  'footer.rights': 'Alle Rechte vorbehalten.',
  'footer.credits': 'Bildnachweise',
  offer: 'Wir beginnen mit einem kostenlosen Erstgespräch und einem kostenlosen ersten Entwurf. Eine kostenpflichtige Beauftragung erfolgt erst, wenn die Richtung klar und gemeinsam abgestimmt ist.',
  'home.seoTitle': 'Hausplanung & Hausumbau Berlin | WB Studio',
  'home.seoDesc': 'Hausplanung und Umbau in Berlin mit freiem Planer: klare Grundrisse und persönliche Begleitung. Kostenloses Erstgespräch und erster Entwurf vor Beauftragung.',
  'home.eyebrow': 'Private Häuser und Umbauten — Berlin',
  'home.h1': 'Hausplanung und Umbau in Berlin.',
  'home.positioning': 'Persönliche Planung für Ihr neues Zuhause oder den Umbau Ihres Hauses — mit klaren Grundrissen und einem Blick für Ihren Alltag. Digital und vor Ort nach Vereinbarung.',
  'home.ctaWhatsapp': 'Kostenloses Erstgespräch über WhatsApp',
  'home.ctaWork': 'Projekte ansehen',
  'home.trustItems.0': 'Über 12 Jahre Erfahrung',
  'home.trustItems.1': 'Freier Planer und BIM-Koordinator',
  'home.trustItems.2': 'Berlin — digital und vor Ort nach Vereinbarung',
  'home.trustItems.3': 'Vom ersten Entwurf bis zur Ausführungsplanung',
  'home.heroImage.alt': 'Geplante Steinvilla im Bezirk Aley mit Terrassen und Garten — das Projekt befindet sich im Bau',
  'home.selectedTitle': 'Ausgewählte Projekte',
  'home.allWork': 'Alle Projekte',
  'home.approachTitle': 'Der Ablauf',
  'home.approachLead': 'Drei klare Schritte schaffen Raum für gute Entscheidungen — vor einer kostenpflichtigen Beauftragung.',
  'home.approachMore': 'Mehr über den Ablauf',
  'home.aboutTitle': 'Wael Bousmael',
  'home.aboutText': 'Freier Planer und BIM-Koordinator mit über 12 Jahren Erfahrung im privaten Wohnungsbau und Projekterfahrung in Deutschland, im Libanon und in Saudi-Arabien — vom ersten Entwurf bis zur Ausführungsplanung.',
  'home.aboutMore': 'Mehr über das Studio',
  'work.seoTitle': 'Wohnhäuser & Umbau: Projekte | WB Studio',
  'work.seoDesc': 'Ausgewählte Projekte von WB Studio: private Wohnhäuser, Umbau und räumliche Planung. Die Projektorte und der jeweilige Planungsstand sind transparent ausgewiesen.',
  'work.h1': 'Projekte',
  'work.note': 'Die als Konzeptstudien gekennzeichneten Projekte veranschaulichen die gestalterische Richtung des Studios. Ihre Referenzbilder stammen von Fotografen auf Unsplash —',
  'work.noteLink': 'zu den Bildnachweisen',
  'work.viewProject': 'Projekt ansehen',
  'project.backToWork': 'Projekte',
  'project.detailsTitle': 'Projektdetails',
  'project.location': 'Ort',
  'project.year': 'Jahr',
  'project.category': 'Kategorie',
  'project.status': 'Stand',
  'project.services': 'Leistungen',
  'project.galleryNote': 'Diese Bilder sind Raum- und Materialreferenzen von Fotografen auf Unsplash und gehören zu einer vorläufigen Konzeptstudie.',
  'project.galleryNoteLink': 'Bildnachweise',
  'project.nextProject': 'Nächstes Projekt',
  'approach.seoTitle': 'Hausplanung in Berlin: Ablauf | WB Studio',
  'approach.seoDesc': 'So beginnt Ihre Hausplanung: kostenloses Erstgespräch, kostenloser erster Entwurf und kostenpflichtige Beauftragung erst nach gemeinsamer Abstimmung.',
  'approach.h1': 'Der Ablauf',
  'approach.intro': 'Ein ruhiger, transparenter Weg vom ersten Gespräch zur abgestimmten Planung. Für private Häuser und Umbauten in Berlin arbeiten wir digital und nach vorheriger Vereinbarung vor Ort. Nutzung, Bestand und ein bewusster Umgang mit Ressourcen stehen am Anfang.',
  'approach.servicesTitle': 'Was wir planen',
  'approach.services.0.title': 'Entwurf und Raumkonzept',
  'approach.services.0.text': 'Erste Volumenstudien und Grundrissvarianten entwickeln die Identität Ihres Hauses — mit klaren Proportionen und sorgfältiger Einbindung in das Grundstück.',
  'approach.services.1.title': 'Innenraumkonzept',
  'approach.services.1.text': 'Raumfolgen, Materialien und natürliches Licht werden gemeinsam gedacht, damit Innenräume und Haus ein stimmiges Ganzes bilden.',
  'approach.services.2.title': 'Ausführungsplanung',
  'approach.services.2.text': 'Nach vereinbartem Leistungsumfang übersetzen wir den Entwurf in nachvollziehbare Zeichnungen und Details für die Abstimmung mit Fachplanern und ausführenden Unternehmen.',
  'approach.services.3.title': 'Ressourcenbewusste Planung',
  'approach.services.3.text': 'Wir berücksichtigen Tageslicht, Verschattung und langlebige Materialien früh im Entwurf. Erforderliche Energie- und Fachnachweise werden gesondert mit geeigneten Fachleuten abgestimmt.',
  'approach.processTitle': 'Drei Schritte vor der Beauftragung',
  'approach.steps.0.title': 'Kostenloses Erstgespräch',
  'approach.steps.0.text': 'Wir besprechen Ihr Grundstück oder bestehendes Haus, Ihre Wünsche und den Alltag, den die Räume künftig ermöglichen sollen.',
  'approach.steps.0.image.alt': 'Videogespräch mit dem Auftraggeber zur Besprechung von Grundstück und Projektzielen',
  'approach.steps.1.title': 'Kostenloser erster Entwurf',
  'approach.steps.1.text': 'Wir besprechen eine erste gestalterische Richtung im Videogespräch — mit einem Raumkonzept, das sich an Ihren Prioritäten orientiert, bevor Sie sich kostenpflichtig binden.',
  'approach.steps.1.image.alt': 'Frühes Volumenmodell einer Villa zur Darstellung der ersten Entwurfsidee',
  'approach.steps.2.title': 'Beauftragung nach gemeinsamer Abstimmung',
  'approach.steps.2.text': 'Wenn die Richtung passt, vereinbaren wir Leistungsumfang, Honorar und nächste Schritte. Erst danach beginnt die kostenpflichtige Planung. Erforderliche Fachplaner und Genehmigungsleistungen klären wir projektbezogen.',
  'approach.steps.2.image.alt': 'Fotorealistische Visualisierung einer Villa nach Ausarbeitung des Entwurfs',
  'about.seoTitle': 'Wael Bousmael | Freier Planer in Berlin — WB Studio',
  'about.seoDesc': 'Wael Bousmael: Freier Planer und BIM-Koordinator mit über 12 Jahren Erfahrung. Persönliche Planung für Hausprojekte in Berlin, digital und vor Ort nach Vereinbarung.',
  'about.h1': 'Über das Studio',
  'about.intro': 'WB Studio ist das persönlich geführte Planungsbüro von Wael Bousmael. Für private Hausprojekte in Berlin verbinden wir klare Grundrisse, sorgfältige Materialwahl und einen genauen Blick auf den Alltag der Bewohner. Die Zusammenarbeit erfolgt digital und nach vorheriger Vereinbarung vor Ort.',
  'about.name': 'Wael Bousmael — Freier Planer',
  'about.bio': 'Wael Bousmael ist in Deutschland als freiberuflicher Planer registriert und arbeitet als Planer und BIM-Koordinator mit über 12 Jahren Erfahrung im privaten Wohnungsbau. Seine Projekterfahrung umfasst Deutschland, den Libanon und Saudi-Arabien. Er begleitet Entwurf und Ausführungsplanung und koordiniert die Abstimmung zwischen Gebäudeplanung, Tragwerk und technischer Gebäudeausrüstung im vereinbarten Umfang.',
  'about.practiceTitle': 'Das Planungsbüro',
  'about.practiceText': 'Jedes Projekt erhält direkte Aufmerksamkeit und eine durchgängige gestalterische Begleitung. Leistungsumfang und Zuständigkeiten klären wir gemeinsam; erforderliche Fachleistungen und die Verantwortung für Genehmigungsunterlagen werden projektbezogen vereinbart.',
  'about.facts.0.label': 'Zusammenarbeit',
  'about.facts.0.value': 'Digital — vor Ort nach vorheriger Vereinbarung',
  'about.facts.1.label': 'Projektfokus',
  'about.facts.1.value': 'Private Hausprojekte in Berlin',
  'about.facts.2.label': 'Sprachen',
  'about.facts.2.value': 'Deutsch · Englisch · Arabisch',
  'about.facts.3.label': 'Schwerpunkte',
  'about.facts.3.value': 'Hausplanung · Umbau · BIM-Koordination',
  'about.portrait.alt': 'Wael Bousmael, freier Planer und BIM-Koordinator',
  'contactPage.seoTitle': 'Kontakt | Hausplanung & Umbau Berlin — WB Studio',
  'contactPage.seoDesc': 'Besprechen Sie Ihre Hausplanung oder Ihren Umbau in Berlin. Kostenloses Erstgespräch und erster Entwurf; kostenpflichtige Beauftragung erst nach gemeinsamer Abstimmung.',
  'contactPage.h1': 'Kontakt',
  'contactPage.intro': 'Was möchten Sie an Ihrem Haus verändern oder neu planen? Wir beginnen mit einem kostenlosen Erstgespräch und einem kostenlosen ersten Entwurf. Eine kostenpflichtige Beauftragung erfolgt erst, wenn die Richtung klar und gemeinsam abgestimmt ist.',
  'contactPage.whatsappCta': 'Kostenloses Erstgespräch über WhatsApp',
  'contactPage.directTitle': 'Direkter Kontakt',
  'contactPage.faqTitle': 'Fragen zu Ihrer Hausplanung',
  'form.title': 'Projektangaben für ein kostenloses Erstgespräch',
  'form.subtitle': 'Nennen Sie uns den Standort Ihres Hauses oder Grundstücks und, falls bekannt, Ihr Budget. Wir sehen uns Ihre Angaben an und melden uns innerhalb von zwei Werktagen für den nächsten Schritt.',
  'form.contactGroupLabel': 'Ihre Kontaktdaten',
  'form.plotGroupLabel': 'Haus oder Grundstück',
  'form.budgetGroupLabel': 'Budgetrahmen',
  'form.name': 'Name',
  'form.namePh': 'Ihr vollständiger Name',
  'form.phone': 'Telefonnummer',
  'form.phonePh': 'Mit Ländervorwahl, zum Beispiel +49 …',
  'form.email': 'E-Mail',
  'form.emailPh': 'name@beispiel.de',
  'form.location': 'Standort des Hauses oder Grundstücks',
  'form.locationPh': 'Stadt, Bezirk oder Adresse',
  'form.locationHelper': 'Geben Sie Stadt oder Bezirk an. Einen Google-Maps-Link zum Haus oder Grundstück können Sie bei Bedarf ergänzen.',
  'form.maps': 'Google-Maps-Link',
  'form.mapsPh': 'https://maps.google.com/…',
  'form.budget': 'Geschätztes Budget in EUR',
  'form.budgetPh': 'Optional — Ihr ungefährer Budgetrahmen in EUR',
  'form.budgetOptions': [],
  'form.submit': 'Projektangaben senden',
  'form.success': 'Ihre Anfrage wurde gesendet. Wir melden uns innerhalb von zwei Werktagen.',
  'form.error': 'Ihre Anfrage konnte gerade nicht gesendet werden. Bitte versuchen Sie es erneut.',
  'faq.0.q': 'Was kostet die Planung meines Hauses oder Umbaus?',
  'faq.0.a': 'Das Honorar hängt von Größe, Bestand, Aufgabenstellung und vereinbartem Leistungsumfang ab. Das Erstgespräch und der erste Entwurf sind kostenlos. Umfang und Honorar klären wir vollständig vor einer kostenpflichtigen Beauftragung.',
  'faq.1.q': 'Wie arbeiten wir bei einem Projekt in Berlin zusammen?',
  'faq.1.a': 'Wir arbeiten digital mit Videogesprächen und gemeinsam besprochenen Zeichnungen. Termine vor Ort sind nach vorheriger Vereinbarung möglich. Was für Ihr Projekt erforderlich ist, klären wir im Erstgespräch.',
  'faq.2.q': 'Welche Unterlagen erhalte ich?',
  'faq.2.a': 'Je nach vereinbartem Umfang erhalten Sie Entwürfe, Grundrissvarianten, Innenraumkonzepte und Ausführungszeichnungen. Erforderliche Fachnachweise, Genehmigungsunterlagen und die jeweiligen Zuständigkeiten werden gesondert geklärt.',
  'faq.3.q': 'Wie lange dauert die Planung?',
  'faq.3.a': 'Das hängt von Größe, Bestand und Komplexität ab. Im Rahmen des ersten Entwurfs besprechen wir einen voraussichtlichen Zeitrahmen, bevor kostenpflichtige Leistungen beginnen.',
  'faq.4.q': 'Ab wann entstehen Kosten?',
  'faq.4.a': 'Das Erstgespräch und der erste Entwurf sind vollständig kostenlos. Eine kostenpflichtige Beauftragung erfolgt erst, wenn die Richtung klar ist und Sie dem vereinbarten Leistungsumfang und Honorar zustimmen.',
  'contactBand.title': 'Was möchten Sie mit Ihrem Haus erreichen?',
  'contactBand.text': 'Ein kostenloses Erstgespräch, dann ein kostenloser erster Entwurf. Eine kostenpflichtige Beauftragung beginnt erst nach gemeinsamer Abstimmung.',
  'contactBand.primary': 'Projektangaben senden',
  'contactBand.secondary': 'WhatsApp',
  'credits.seoTitle': 'Bildnachweise | WB Studio',
  'credits.seoDesc': 'Bildnachweise zu den eigenen Projekten von WB Studio und den lizenzierten Referenzbildern der Konzeptstudien.',
  'credits.h1': 'Bildnachweise',
  'credits.intro': 'Die Projektbilder und das Titelbild der Startseite werden von WB Studio bereitgestellt. Die Referenzbilder der klar gekennzeichneten Konzeptstudien stammen von Unsplash. Ihre Quellen sind unten mit der Lizenz zur freien kommerziellen Nutzung aufgeführt.',
  'credits.licenseNote': 'Lizenz: Unsplash License mit kostenloser kommerzieller Nutzung; eine Namensnennung ist nicht vorgeschrieben. Die einzelnen Quellen sind unten verlinkt. Das vollständige Verzeichnis liegt unter assets/licenses/LICENSES.md im Website-Repository.',
  'credits.sourceLabel': 'Quelle',
  'credits.heroLabel': 'Titelbild der Startseite',
  'services.seoTitle': 'Hausplanung & Umbau in Berlin | Leistungen — WB Studio',
  'services.seoDesc': 'Planungsleistungen für private Häuser und Hausumbauten in Berlin: Entwurf, Grundriss, Innenraumkonzept und Ausführungsplanung nach vereinbartem Umfang.',
  'services.h1': 'Planung für Ihr Haus in Berlin',
  'services.intro': 'Ob neues Haus oder Umbau eines bestehenden Zuhauses: Wir beginnen mit Ihren Bedürfnissen. Ein kostenloses Erstgespräch und ein kostenloser erster Entwurf gehen jeder kostenpflichtigen Beauftragung voraus.',
  'services.explore': 'Mehr erfahren',
  'journalMeta.seoTitle': 'Journal | Planung und Entwurf — WB Studio',
  'journalMeta.seoDesc': 'Einblicke in Entwurf, Grundrisse und Ausführungsplanung bei WB Studio.',
  'journalMeta.h1': 'Journal',
  'journalMeta.intro': 'Gedanken zu klaren Räumen und nachvollziehbarer Planung.',
  'journalMeta.readMore': 'Beitrag lesen',
  'journalMeta.byline': 'Von',
  'journalMeta.guidesTitle': 'Wissen für den Projektstart',
  'journalMeta.backToJournal': 'Journal',
  'journalMeta.relatedTitle': 'Passende Leistungen'
};

for (const [path, text] of Object.entries(germanCopy)) {
  const target = path.split('.').reduce((value, key) => value[key], site);
  if (!target || typeof target !== 'object' || !('en' in target)) {
    throw new Error(`Unknown German translation field: ${path}`);
  }
  target.de = text;
}

site.berlin = {
  homeThemes: [
    {
      title: { de: 'Hausplanung in Berlin' },
      text: { de: 'Ein durchdachter Entwurf für Ihr Grundstück, Ihre Familie und Ihren Alltag — vom Raumprogramm zur klaren Planung.' },
      href: '/hausplanung-berlin/'
    },
    {
      title: { de: 'Hausumbau in Berlin' },
      text: { de: 'Bestehende Räume neu ordnen und den Charakter Ihres Hauses bewahren — mit klaren Grundrissen und sorgfältigen Details.' },
      href: '/hausumbau-berlin/'
    }
  ],
  landings: [
    {
      slug: 'hausplanung-berlin',
      label: { de: 'Hausplanung in Berlin' },
      summary: { de: 'Persönliche Entwurfs- und Grundrissplanung für private Bauherren mit einem Grundstück in Berlin.' },
      seoTitle: { de: 'Hausplanung Berlin | Freier Planer für private Häuser — WB Studio' },
      seoDesc: { de: 'Individuelle Hausplanung in Berlin: Grundriss, Licht und Räume für Ihren Alltag. Kostenloses Erstgespräch und erster Entwurf, Beauftragung erst nach Abstimmung.' },
      eyebrow: { de: 'Private Hausplanung — Berlin' },
      h1: { de: 'Ihr Haus in Berlin beginnt mit einem klaren Entwurf.' },
      intro: { de: 'Sie haben ein Grundstück in Berlin und möchten ein Haus planen, das zu Ihrem Leben passt? Als freier Planer entwickelt Wael Bousmael mit Ihnen Raumprogramm, Grundriss und gestalterische Richtung. Wir arbeiten digital und nach vorheriger Vereinbarung vor Ort — mit direktem Kontakt und einem verständlichen nächsten Schritt.' },
      sections: [
        {
          heading: { de: 'Das Grundstück verstehen' },
          body: { de: 'Ausrichtung, Zufahrt, Nachbarbebauung und Ihre Wünsche bilden den Ausgangspunkt. Wir prüfen die verfügbaren Unterlagen und entwickeln daraus erste räumliche Möglichkeiten. Baurechtliche Rahmenbedingungen und erforderliche Nachweise werden mit den zuständigen Fachleuten projektbezogen geklärt.' }
        },
        {
          heading: { de: 'Räume für Ihren Alltag' },
          body: { de: 'Wie kommen Sie nach Hause? Wo spielt sich das Familienleben ab? Welche Räume sollen später anders nutzbar sein? Grundrissvarianten machen solche Fragen anschaulich. Tageslicht, Rückzug, Stauraum und Übergänge zum Garten werden gemeinsam gedacht.' }
        },
        {
          heading: { de: 'Planung mit klaren Zuständigkeiten' },
          body: { de: 'Vom Entwurf bis zur Ausführungsplanung vereinbaren wir die benötigten Leistungen und die Abstimmung mit Fachplanern. Wer Genehmigungsunterlagen erstellt und einreicht sowie welche weiteren Fachleistungen notwendig sind, wird für Ihr Vorhaben gesondert festgelegt. Eine Bauvorlageberechtigung wird durch dieses Angebot nicht zugesagt.' }
        }
      ],
      serviceType: 'Hausplanung',
      faq: [
        {
          q: { de: 'Was brauche ich für das erste Gespräch?' },
          a: { de: 'Den Standort des Grundstücks, vorhandene Lagepläne und eine Vorstellung Ihrer Wünsche. Falls vorhanden, helfen Angaben zur Fläche und zu Ihrem Budget. Wir beginnen mit einem kostenlosen Erstgespräch und einem kostenlosen ersten Entwurf.' }
        },
        {
          q: { de: 'Übernimmt WB Studio auch den Bauantrag?' },
          a: { de: 'Genehmigungsleistungen und die Verantwortung für Bauvorlagen sind nicht automatisch Teil des Angebots. Im Erstgespräch klären wir den Bedarf und die Einbindung entsprechend berechtigter Fachleute. Umfang und Zuständigkeiten werden vor einer Beauftragung vereinbart.' }
        },
        {
          q: { de: 'Ist eine Zusammenarbeit vor Ort möglich?' },
          a: { de: 'Ja, nach vorheriger Vereinbarung. Viele Abstimmungen finden digital statt. Ob ein Termin vor Ort für Ihr Hausprojekt sinnvoll ist, besprechen wir gemeinsam. Eine kostenpflichtige Beauftragung beginnt erst nach Abstimmung von Richtung, Umfang und Honorar.' }
        }
      ],
      related: ['hausumbau-berlin'],
      relatedProjects: ['montashiri-villa', 'byblos-resort'],
      image: { src: '/assets/projects/montashiri-villa/cover.webp', w: 1536, h: 960, alt: { de: 'Entwurf der Montashiri Villa in Obhur, Jeddah, mit Steinfassade und bepflanzten Terrassen' } }
    },
    {
      slug: 'hausumbau-berlin',
      label: { de: 'Hausumbau in Berlin' },
      summary: { de: 'Bestehende Häuser neu durchdenken: Bestandsanalyse, Grundrissvarianten und abgestimmte Umbauplanung.' },
      seoTitle: { de: 'Hausumbau Berlin | Grundriss & Umbauplanung — WB Studio' },
      seoDesc: { de: 'Hausumbau in Berlin mit durchdachten Grundrissen und klarer Bestandsplanung. Kostenloses Erstgespräch und erster Entwurf vor einer kostenpflichtigen Beauftragung.' },
      eyebrow: { de: 'Planen im Bestand — Berlin' },
      h1: { de: 'Mehr aus Ihrem bestehenden Haus in Berlin machen.' },
      intro: { de: 'Ein Haus muss nicht vollständig neu sein, um besser zu Ihrem Leben zu passen. Wir untersuchen gemeinsam, wie sich Grundrisse öffnen, Wege verkürzen und Räume neu nutzen lassen. Am Anfang stehen Ihr Alltag und ein genauer Blick auf den Bestand — digital und vor Ort nach vorheriger Vereinbarung.' },
      sections: [
        {
          heading: { de: 'Mit dem Bestand beginnen' },
          body: { de: 'Vorhandene Pläne, Fotos und Ihre Beobachtungen zeigen erste Möglichkeiten und offene Fragen. Ein verlässliches Aufmaß und erforderliche Untersuchungen klären wir projektbezogen. Eingriffe in Tragwerk und technische Anlagen müssen von geeigneten Fachleuten geprüft werden.' }
        },
        {
          heading: { de: 'Grundrisse, die den Unterschied zeigen' },
          body: { de: 'Wir stellen Bestand und Entwurf gegenüber und machen Abbruch, neue Wände und Raumfolgen nachvollziehbar. So können Sie Varianten für Küche, Wohnbereiche, Rückzug und Gartenbezug vergleichen, bevor Sie sich auf eine Richtung festlegen.' }
        },
        {
          heading: { de: 'Schrittweise zu klaren Unterlagen' },
          body: { de: 'Nach gemeinsamer Abstimmung entsteht im vereinbarten Umfang eine Planung mit Grundrissen, Schnitten und Details. Genehmigungsbedarf, Fachnachweise und Zuständigkeiten werden vorab geklärt. Die gezeigte Villenrenovierung im Libanon veranschaulicht diese Arbeitsweise; sie ist kein Berliner Referenzprojekt.' }
        }
      ],
      serviceType: 'Hausumbau und Umbauplanung',
      faq: [
        {
          q: { de: 'Kann ich mit alten Plänen und Fotos starten?' },
          a: { de: 'Ja. Für das kostenlose Erstgespräch reichen vorhandene Unterlagen und eine Beschreibung Ihrer Wünsche. Welche Bestandsaufnahme oder zusätzlichen Untersuchungen anschließend nötig sind, klären wir gemeinsam.' }
        },
        {
          q: { de: 'Sind Wanddurchbrüche oder ein Anbau Teil der Planung?' },
          a: { de: 'Wir können solche Wünsche in den Entwurfsvarianten untersuchen. Ob und wie sie umgesetzt werden können, hängt vom Bestand, der Tragwerksprüfung und den baurechtlichen Rahmenbedingungen ab. Erforderliche Fachleute und Genehmigungsleistungen werden gesondert vereinbart.' }
        },
        {
          q: { de: 'Wann entscheide ich mich für eine Beauftragung?' },
          a: { de: 'Erst nach dem kostenlosen Erstgespräch und dem kostenlosen ersten Entwurf. Wenn die Richtung passt, vereinbaren wir Leistungsumfang, Honorar und nächste Schritte, bevor kostenpflichtige Arbeit beginnt.' }
        }
      ],
      related: ['hausplanung-berlin'],
      relatedProjects: ['private-villa-renovation-chouf', 'montashiri-villa'],
      image: { src: '/assets/projects/private-villa-renovation-chouf/cover.webp', w: 1601, h: 983, fit: 'contain', alt: { de: 'Visualisierung des Umbaus einer Steinvilla mit Balkonen und Terrassen im Chouf, Libanon' } }
    }
  ],
  legal: [
    {
      slug: 'impressum',
      title: { de: 'Impressum — Entwurf' },
      seoDesc: { de: 'Entwurf der Anbieterangaben von WB Studio zur Prüfung vor Veröffentlichung.' },
      draft: true,
      sections: [
        { h: { de: 'Entwurf — noch nicht zur Veröffentlichung freigegeben' }, p: { de: 'Diese Anbieterangaben sind ein Entwurf zur lokalen Prüfung. Die Aktualität der Geschäftsanschrift und weitere tatsächlich erforderliche Angaben sind vor Veröffentlichung zu bestätigen. Dieser Entwurf ist noch nicht zur Veröffentlichung freigegeben.' } },
        { h: { de: 'Anbieter und Kontakt' }, p: { de: 'WB Studio — Wael Bousmael, freier Planer. Geschäftsanschrift laut vorliegender Registrierung: Flughafenstraße 66, 12049 Berlin, Deutschland. E-Mail: w.bousmael@wbstudio.xyz. Telefon: +966 53 806 0383. Die Zusammenarbeit erfolgt digital und vor Ort nach vorheriger Vereinbarung.' } },
        { h: { de: 'Vor Veröffentlichung zu klären' }, p: { de: 'Die Aktualität der Anschrift, gegebenenfalls erforderliche Umsatzsteuerangaben sowie weitere tatsächlich einschlägige Anbieterangaben müssen bestätigt werden. Eine Eintragung in eine deutsche Architektenkammer und eine Bauvorlageberechtigung werden mit dieser Website nicht behauptet.' } }
      ]
    },
    {
      slug: 'datenschutz',
      title: { de: 'Datenschutz — Entwurf' },
      seoDesc: { de: 'Entwurf zu den Datenflüssen der WB-Studio-Website. Anbieterprüfung, Rechtsgrundlagen und weitere Angaben sind vor Veröffentlichung zu vervollständigen.' },
      draft: true,
      sections: [
        { h: { de: 'Entwurf — Angaben noch zu vervollständigen' }, p: { de: 'Dieser Text beschreibt die derzeit erkennbaren Funktionen der Website und ist keine vollständige Datenschutzerklärung. Die konkreten Anbieterbedingungen, Rechtsgrundlagen, Speicherfristen und gegebenenfalls Angaben zu Drittlandübermittlungen müssen vor Veröffentlichung geprüft und ergänzt werden. Verantwortlicher laut vorliegender Registrierung: Wael Bousmael, WB Studio, Flughafenstraße 66, 12049 Berlin, Deutschland. Kontakt für Rückfragen: w.bousmael@wbstudio.xyz. Die Aktualität dieser Anschrift ist vor Veröffentlichung zu bestätigen.' } },
        { h: { de: 'Website und Schriftarten' }, p: { de: 'Die statischen Seiten werden über GitHub Pages bereitgestellt. Beim Abruf erhält der Hostinganbieter technisch erforderliche Verbindungsdaten. Die Website lädt Schriftarten von Google Fonts; dabei stellt der Browser Verbindungen zu Google her. Die Website bindet keine Analysewerkzeuge ein.' } },
        { h: { de: 'Kontaktformular' }, p: { de: 'Das Formular übermittelt Name, Telefonnummer, E-Mail-Adresse, Standort des Hauses oder Grundstücks, einen gegebenenfalls eingetragenen Google-Maps-Link und das gegebenenfalls eingetragene Budget über FormSubmit an wael.bousmael@gmail.com. Die Angaben dienen der Bearbeitung Ihrer Projektanfrage. Die Datenschutzhinweise und Verarbeitungsbedingungen von FormSubmit sowie die tatsächlichen Speicherfristen sind vor Freigabe zu prüfen und hier zu ergänzen.' } },
        { h: { de: 'WhatsApp und Karten' }, p: { de: 'Die WhatsApp-Schaltflächen öffnen auf Ihre Auswahl einen externen WhatsApp-Link mit einem vorbereiteten Nachrichtentext. Für eine Nachricht wählen Sie diesen Kontaktweg selbst. Das Formular enthält ein Feld für einen Google-Maps-Link; allein das Eintragen eines Links bindet keine Karte ein. Eine technisch vorbereitete Google-Maps-Adressvervollständigung ist ohne API-Schlüssel inaktiv. Bei einer späteren Aktivierung müssen die Datenschutzhinweise vorab angepasst werden.' } },
        { h: { de: 'Gespeicherte Sprache und offene Angaben' }, p: { de: 'Die Website kann Ihre gewählte Sprache lokal im Browser speichern. Es werden dafür keine Analysecookies eingesetzt. Angaben zu Betroffenenrechten, zuständiger Aufsichtsbehörde, Rechtsgrundlagen und Aufbewahrungsdauer müssen anhand der bestätigten Verantwortlichen- und Anbieterangaben vervollständigt werden.' } }
      ]
    }
  ]
};

site.ui = {
  projectScope: { ar: 'نطاق العمل', en: 'Project scope', de: 'Planungsumfang' },
  languageNames: { ar: 'العربية', en: 'English', de: 'Deutsch' },
  breadcrumb: { ar: 'مسار التنقل', en: 'Breadcrumb', de: 'Seitenpfad' },
  homeLabel: { ar: 'الرئيسية', en: 'Home', de: 'Startseite' },
  primaryNav: { ar: 'التنقل الرئيسي', en: 'Main navigation', de: 'Hauptnavigation' },
  mobileNav: { ar: 'التنقل عبر الهاتف', en: 'Mobile navigation', de: 'Mobile Navigation' },
  languageLabel: { ar: 'اختر اللغة', en: 'Choose language', de: 'Sprache wählen' },
  languageFallback: { ar: 'الرئيسية', en: 'Homepage', de: 'Startseite' },
  credentialsLabel: { ar: 'الخبرة وطريقة العمل', en: 'Experience and practice', de: 'Erfahrung und Arbeitsweise' },
  fromWork: { ar: 'من أعمال الاستوديو', en: 'From the studio’s work', de: 'Aus den Projekten des Studios' },
  relatedServices: { ar: 'خدمات ذات صلة', en: 'Related services', de: 'Passende Leistungen' },
  projectAction: { ar: 'عرض المشروع', en: 'View project', de: 'Projekt ansehen' },
  callCta: { ar: 'اطلب مكالمة مجانية', en: 'Request a free call', de: 'Kostenloses Erstgespräch' },
  contactAlternative: { ar: 'أو تواصل معي مباشرة', en: 'Or contact me directly', de: 'Oder nehmen Sie direkt Kontakt auf' }
};

site.form.phoneError = {
  ar: 'يرجى إدخال رقم هاتف صحيح مع رمز الدولة.',
  en: 'Please enter a valid phone number with the country code.',
  de: 'Bitte geben Sie eine gültige Telefonnummer mit Ländervorwahl ein.'
};

export default site;
