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

  // Used outside the homepage hero, which opens an empty conversation.
  waMessage: {
    ar: 'السلام عليكم، أرغب في مكالمة مجانية لمناقشة مشروعي.\n• الاسم:\n• نوع المشروع (بناء جديد أو تجديد):\n• المدينة أو الحي:\n• المساحة التقريبية:\n• الميزانية التقريبية:',
    en: 'Hello, I’d like to arrange a free call about my home.\n• Name:\n• Project (new home or renovation):\n• City or district:\n• Approximate area:\n• Estimated budget:'
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
    h1: {
      ar: 'نصمم فلل ومنازل خاصة في جدة والخليج',
      en: 'We design private villas and homes in Jeddah and the Gulf'
    },
    positioning: {
      ar: 'تصميم معماري يقوده وائل بو سماعيل، يراعي خصوصية عائلتك وضوء البيت وتفاصيل الحياة اليومية — من الفكرة إلى مخططات التنفيذ.',
      en: 'Architecture led by Wael Bousmael, shaped around your family’s privacy, daylight and daily life — from concept to construction drawings.'
    },
    ctaWhatsapp: { ar: 'احجز استشارة مجانية', en: 'Book free consultation' },
    ctaForm: { ar: 'أرسل تفاصيل مشروعك', en: 'Share your project details' },
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
        title: { ar: 'تصميم الفلل الفاخرة ومجالس الضيافة', en: 'Luxury villas and private entertaining spaces' },
        text: { ar: 'من جلسة الإفطار العائلية إلى مأدبة في التراس، نرسم البيت حول طريقة استقبالكم للضيوف.', en: 'Plan the house around how you host, from breakfast at the kitchen island to dinner on the terrace.' },
        href: '/luxury-villa-design-jeddah/'
      },
      {
        title: { ar: 'تجديد الفلل ومخططات التنفيذ', en: 'Villa renovation & execution drawings' },
        text: { ar: 'من توثيق الوضع القائم إلى مخططات الهدم والإنشاء وحزمة واضحة للمقاول.', en: 'From existing-condition records to demolition, construction and a clear contractor package.' },
        href: '/villa-renovation-design-jeddah/'
      }
    ],
    spotlightProject: 'khamis-mushait-villa',
    heroImage: {
      src: '/assets/projects/khamis-mushait-villa/gallery-02.webp', w: 1600, h: 900,
      alt: {
        ar: 'تصوّر ليلي لفيلا خميس مشيط من البوابة الخشبية، مع إنارة لحافة السقف والدرج المنحني أمام الشرفة',
        en: 'Night rendering of Khamis Mushait Villa through the timber gate, with a lit roof edge above the curved stair and terrace'
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
      ar: 'تواصل مع وائل بو سماعيل لتصميم فيلا أو تجديد منزلك في جدة أو السعودية أو الخليج. نبدأ بمكالمة مجانية وتصور مبدئي مجاني قبل الاتفاق على نطاق العمل وأتعابه.',
      en: 'Talk to Wael Bousmael about a new villa or home renovation in Jeddah, Saudi Arabia or the Gulf. Start with a free call and a free preliminary concept.'
    },
    h1: { ar: 'تواصل', en: 'Contact' },
    intro: {
      ar: 'هل تفكّر ببناء فيلا أو تجديد منزلك؟ نناقش ما تحتاجه في مكالمة مجانية، ثم نراجع معاً تصوراً مبدئياً مجانياً. يبدأ العمل المدفوع بعد اتفاقنا على التصميم ونطاق العمل والأتعاب.',
      en: 'Are you building a villa or renovating your home? We’ll discuss what you need on a free call, then review a free preliminary concept together. Paid work starts once we agree on the direction, scope and fee.'
    },
    whatsappCta: { ar: 'احجز مكالمة مجانية عبر واتساب', en: 'Book a free call on WhatsApp' },
    directTitle: { ar: 'تواصل مباشر', en: 'Direct contact' },
    faqTitle: { ar: 'أسئلة شائعة عن تصميم الفلل الخاصة', en: 'Frequently asked questions about private villa design' }
  },

  // ── Lead form ──
  form: {
    title: { ar: 'اطلب مكالمة مجانية لمناقشة مشروعك', en: 'Request a free call about your project' },
    subtitle: {
      ar: 'اترك بيانات التواصل. ويمكنك إضافة موقع المنزل أو الأرض والميزانية التقريبية إن توفّرت. سأردّ عليك خلال يومي عمل لترتيب المكالمة.',
      en: 'Leave your contact details. You can also share the location of your house or plot and your approximate budget. I’ll get back to you within two business days to arrange the call.'
    },
    contactGroupLabel: { ar: 'بيانات التواصل', en: 'Contact details' },
    plotGroupLabel: { ar: 'المنزل أو الأرض', en: 'House or plot' },
    budgetGroupLabel: { ar: 'نطاق الميزانية', en: 'Budget range' },
    name: { ar: 'الاسم', en: 'Name' },
    namePh: { ar: 'أدخل اسمك الكامل', en: 'Enter your full name' },
    phone: { ar: 'رقم الهاتف', en: 'Phone Number' },
    phonePh: { ar: 'مثال: +966 5X XXX XXXX', en: 'Example: +966 5X XXX XXXX' },
    email: { ar: 'البريد الإلكتروني', en: 'Email' },
    emailPh: { ar: 'example@email.com', en: 'name@example.com' },
    location: { ar: 'موقع المشروع', en: 'Project location' },
    locationPh: { ar: 'المدينة أو الحي أو العنوان', en: 'City, district, or address' },
    locationHelper: {
      ar: 'يكفي اسم المدينة أو الحي. ويمكنك أيضاً إضافة رابط الموقع على خرائط Google.',
      en: 'The city or district is enough. You can also include a Google Maps link.'
    },
    maps: { ar: 'رابط Google Maps', en: 'Google Maps Link' },
    mapsPh: { ar: 'https://maps.google.com/...', en: 'https://maps.google.com/...' },
    budget: { ar: 'الميزانية التقريبية', en: 'Estimated Budget' },
    budgetPh: { ar: 'اختياري', en: 'Optional' },
    budgetOptions: [
      { band: 'under_1m', ar: 'أقل من 1 مليون ريال', en: 'Below SAR 1M' },
      { band: '1m_2m', ar: '1 إلى 2 مليون ريال', en: 'SAR 1M to 2M' },
      { band: '2m_4m', ar: '2 إلى 4 مليون ريال', en: 'SAR 2M to 4M' },
      { band: 'over_4m', ar: 'أكثر من 4 مليون ريال', en: 'Above SAR 4M' }
    ],
    submit: { ar: 'أرسل طلب المكالمة', en: 'Request a free call' },
    sending: { ar: 'جارٍ إرسال طلبك…', en: 'Sending your request…', de: 'Ihre Anfrage wird gesendet…' },
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
    title: { ar: 'ما الذي تخطّط له في منزلك؟', en: 'What are you planning for your home?' },
    text: {
      ar: 'مكالمة مجانية، ثم تصور مبدئي مجاني — ولا نبدأ أي اتفاق مدفوع إلا بعد وضوح الرؤية والتوافق.',
      en: 'A free call, then a free preliminary concept — we only begin a paid agreement after the direction is clear and aligned.'
    },
    primary: { ar: 'أرسل تفاصيل مشروعك', en: 'Share your project details' },
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
      ar: 'خدمات تصميم الفلل وتجديدها في جدة | WB Studio',
      en: 'Villa Design & Renovation Services in Jeddah | WB Studio'
    },
    seoDesc: {
      ar: 'تخطط لبناء فيلا في جدة أو تجديد بيتك؟ تعرّف على خدمات التصميم من دراسة الأرض أو المبنى القائم إلى مخططات التنفيذ، وابدأ بمكالمة مجانية مع وائل بو سماعيل.',
      en: 'Planning a new villa or renovating a home in Jeddah? Explore design services from plot or building review to construction drawings. Start with a free call.'
    },
    h1: { ar: 'تصميم الفلل وتجديدها في جدة', en: 'Villa design and renovation in Jeddah' },
    intro: {
      ar: 'للبيت الجديد نبدأ من أرضك وطريقة عيش عائلتك. وللتجديد نبدأ من البيت نفسه وما تودّ الاحتفاظ به أو تغييره. في الحالتين نبدأ بمكالمة مجانية ثم نناقش تصوراً مبدئياً مجانياً قبل الاتفاق على العمل المدفوع.',
      en: 'For a new villa, we start with your plot and how your family lives. For a renovation, we look at the house you have and what you want to keep or change. Both begin with a free call and a free preliminary concept before we agree on paid work.'
    },
    explore: { ar: 'تعرّف أكثر', en: 'Learn more' }
  },

  // ── High-intent landing pages (root-level keyword slugs, bilingual) ──
  landings: [
    {
      slug: 'villa-design-jeddah',
      label: { ar: 'تصميم فيلا في جدة', en: 'Villa design in Jeddah' },
      summary: {
        ar: 'من دراسة أرضك وتحديد احتياجات العائلة والضيافة إلى توزيع الغرف ومخططات التنفيذ.',
        en: 'Plan a home around your plot, family routine and guests, from the first layout to construction drawings.'
      },
      seoTitle: { ar: 'تصميم الفلل في جدة من الداخل والخارج | WB Studio', en: 'Villa Design in Jeddah – Interiors and Facades | WB Studio' },
      seoDesc: {
        ar: 'تصميم معماري للفلل في جدة يربط توزيع الغرف والضيافة بالواجهة والفناء. شاهد كيف عالج تصميم فيلا المنتشري الضوء والخصوصية، وابدأ بمكالمة مجانية مع وائل بو سماعيل.',
        en: 'Plan your villa’s interiors, facade and outdoor spaces together. See how the Montashiri Villa design in Obhur balances daylight and privacy. Start with a free call.'
      },
      eyebrow: { ar: 'تصميم الفلل الخاصة — جدة', en: 'Private villa design — Jeddah' },
      h1: { ar: 'تصميم الفلل في جدة من الداخل والخارج', en: 'Villa design in Jeddah, inside and out' },
      intro: {
        ar: 'إذا كانت صالة العائلة تطلّ على الفناء، فأين يكون مكان الجلوس، وأي جزء من الغرفة ينكشف عند فتح الباب للضيوف؟ مع وائل بو سماعيل تراجع توزيع الغرف والفتحات والواجهة معاً. نبدأ من مخطط أرضك في جدة وما تحتاجه عائلتك يومياً.',
        en: 'If the family living room opens onto a courtyard, where will you sit, and what can visitors see from the entrance? Work directly with Wael Bousmael to plan the rooms, windows and facade together, starting with your plot in Jeddah and the way your family lives.'
      },
      sections: [
        {
          heading: { ar: 'مداخل العائلة والضيوف', en: 'Family and guest entrances' },
          body: {
            ar: 'نحدّد على المخطط كيف يصل الضيف إلى المجلس ودورة المياه، وأين تمرّ العائلة بين غرف المعيشة والمطبخ والفناء. عندها يسهل أن تقرر أين تحتاج إلى مدخل مستقل وأي الغرف تفضّل أن تتصل ببعضها.',
            en: 'On the plan, we trace a guest’s route to the majlis and bathroom alongside the family’s routes between the kitchen, living rooms and courtyard. You can then decide where a separate entrance matters and which rooms should open into each other.'
          }
        },
        {
          heading: { ar: 'كيف يرتبط التصميم الداخلي بواجهة الفيلا؟', en: 'How the interior plan shapes the facade' },
          example: {
            project: 'montashiri-villa',
            images: ['gallery-01.webp'],
            link: { ar: 'شاهد الواجهة والمطبخ في تصميم فيلا المنتشري', en: 'See the facade and kitchen at Montashiri Villa' }
          },
          body: {
            ar: 'نحدّد موضع النافذة من داخل الغرفة أولاً. ما الذي تراه العائلة من جلستها، ومن يستطيع أن يراها من الشارع؟ في تصميم فيلا المنتشري بأبحر، تطلّ غرفة المعيشة المزدوجة الارتفاع على فناء مزروع من خلال واجهة زجاجية واسعة. أمّا جهة الشارع، فتحدّد الجدران الحجرية والسواتر الخشبية ما ينكشف من البيت للمارة.',
            en: 'We start each window from inside the room. What will you see from the sofa, and what can someone see from the street? In the Montashiri Villa design in Obhur, the double-height living room looks through broad glazing into a planted courtyard. Facing the street, stone walls and timber screens limit views into the house.'
          }
        },
        {
          heading: { ar: 'ما الذي يوضّحه التصور الأول؟', en: 'What the first concept helps you decide' },
          body: {
            ar: 'نراجع معك موقع الغرف واتجاه الفتحات وعلاقة البيت بالفناء. في تصميم فيلا خميس مشيط مثلاً، يربط درج خارجي منحني بين الجلسة المظللة والشرفة، فتتنقل العائلة بين المستويين من دون المرور داخل البيت. بعد الاتفاق على الفكرة نحدّد نطاق مخططات التنفيذ وأتعابها.',
            en: 'We review room positions, window orientation and how you reach the courtyard. In the Khamis Mushait Villa design, for example, a curved outdoor stair connects the shaded terrace to the balcony so the family can move between floors from the courtyard. Once the concept feels right, we agree on the scope and fee for the drawings.'
          }
        }
      ],
      serviceType: 'Villa design',
      faq: [
        {
          q: { ar: 'كيف أبدأ تصميم فيلتي في جدة؟', en: 'How do I start designing my villa in Jeddah?' },
          a: { ar: 'ابدأ بموقع الأرض في نموذج التواصل، أو أرسله عبر واتساب. للمكالمة الأولى، حضّر مساحة الأرض إن عرفتها وأهم ما تريده في البيت. نبدأ بمكالمة مجانية يتبعها تصور مبدئي مجاني، ونتّفق على الأتعاب بعد أن يناسبك التوجّه.', en: 'Start with the plot location in the inquiry form or on WhatsApp. For the first call, have the plot size to hand if you know it, along with your priorities for the house. The call and preliminary concept are free. We agree fees once you are happy with the direction.' }
        },
        {
          q: { ar: 'هل يمكن أن نلتقي في الأرض؟', en: 'Can we meet on my plot in Jeddah?' },
          a: { ar: 'نعم، يمكن ترتيب زيارة للأرض بموعد مسبق لمعاينة المداخل والإطلالات والمباني المجاورة. اذكر الحي في طلبك، وفي المكالمة الأولى نقرّر معاً ما إذا كانت الزيارة مفيدة في هذه المرحلة.', en: 'Yes. We can arrange a visit to look at access, views and neighbouring buildings together. Include the district in your inquiry so we can discuss on the first call whether a visit would help at this stage.' }
        },
        {
          q: { ar: 'هل يمكن العمل إذا كنت خارج جدة؟', en: 'Can we work together if I’m outside Jeddah?' },
          a: { ar: 'بالتأكيد. نخدم عملاء السعودية والخليج عن بُعد عبر مكالمات الفيديو ومشاركة المخططات بنفس الوضوح.', en: 'Absolutely. We serve clients across Saudi Arabia and the Gulf remotely via video calls and shared drawings, with the same clarity.' }
        }
      ],
      related: ['luxury-villa-design-jeddah', 'modern-villa-design-jeddah', 'obhur-villa-design', 'modern-hijazi-villa-design'],
      relatedProjects: ['montashiri-villa', 'khamis-mushait-villa'],
      image: { src: '/assets/projects/montashiri-villa/cover.webp', w: 1536, h: 960, alt: { ar: 'فيلا حجرية حديثة في جدة بشرفات مزروعة', en: 'Modern stone villa in Jeddah with planted terraces' } }
    },
    {
      slug: 'villa-renovation-design-jeddah',
      label: { ar: 'تصميم وتجديد الفلل في جدة', en: 'Villa renovation design in Jeddah' },
      summary: {
        ar: 'لأصحاب الفلل القائمة في جدة: من توثيق الوضع الحالي وإعادة تنظيم البيت إلى مخططات هدم وإنشاء واضحة.',
        en: 'For owners of existing villas in Jeddah: from documenting the current building and reorganizing the home to clear demolition and construction drawings.'
      },
      seoTitle: { ar: 'تجديد الفلل في جدة من التصميم إلى مخططات التنفيذ | WB Studio', en: 'Villa Renovation Design in Jeddah | WB Studio' },
      seoDesc: {
        ar: 'تخطط لتجديد فيلتك في جدة؟ نراجع مخططات بيتك ونبحث في توزيع الغرف وما يمكن الاحتفاظ به. اطّلع على مثال لمخططات الهدم والإنشاء وابدأ بمكالمة مجانية.',
        en: 'Planning to renovate a villa in Jeddah? Review your existing layout, explore what to keep or change, and see an example set of demolition and construction drawings.'
      },
      eyebrow: { ar: 'تجديد الفلل — جدة والخليج', en: 'Villa renovation — Jeddah & GCC' },
      h1: { ar: 'التصميم المعماري لتجديد فيلتك في جدة', en: 'Renovation design for existing villas in Jeddah' },
      intro: {
        ar: 'ما الذي تحبّه في بيتك اليوم، وأين يضيق على احتياجات العائلة؟ في المكالمة المجانية الأولى نناقش معك ما تودّ تغييره. تساعدنا الصور والمخططات القديمة إن توفرت، ويمكن ترتيب زيارة للفيلا بموعد مسبق. نعرض عليك تصوراً مبدئياً مجانياً قبل أن نتفق على نطاق العمل المدفوع.',
        en: 'What already works in your home, and where does the layout get in the way? On the free first call we discuss the changes you have in mind. Photos and any old plans help, and a visit to the property can be arranged by appointment. You review a free preliminary concept before agreeing to paid work.'
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
          heading: { ar: 'أربعة مخططات للطابق نفسه', en: 'Four drawings of the same floor' },
          example: {
            project: 'private-villa-renovation-chouf',
            images: ['gallery-01.webp', 'gallery-04.webp'],
            link: { ar: 'شاهد مخططات الهدم والإنشاء لفيلا الشوف', en: 'See the demolition and construction plans for the Chouf villa' }
          },
          body: {
            ar: 'في فيلا الشوف بلبنان، كان المرآب يجاور مطبخاً مغلقاً. قارن موضعه في مخطط الوضع القائم بموضع طاولة الإفطار في المخطط المفروش المقترح. أمّا مخططا الهدم والإنشاء فيبيّنان أيّ جدار يُزال وأين تُفتح الممرات لتنفيذ هذا التغيير.',
            en: 'In the Chouf villa in Lebanon, a garage stood beside the enclosed kitchen. Find it on the existing plan, then look for the breakfast table in the same spot on the proposed furnished plan. The demolition and construction drawings show which walls and openings change to make that connection.'
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
        alt: { ar: 'تصور لتجديد فيلا الشوف الحجرية في لبنان مع شرفات وتراسات جديدة', en: 'Proposed new balconies and terraces on the stone villa in Chouf, Lebanon' }
      }
    },
    {
      slug: 'luxury-villa-design-jeddah',
      label: { ar: 'تصميم فلل فاخرة في جدة', en: 'Luxury villa design in Jeddah' },
      summary: {
        ar: 'تصميم المجلس والسفرة وتراس الضيافة حول عدد من تستقبلهم وما ترغب في إبقائه خاصاً بالعائلة.',
        en: 'Plan the majlis, dining room and terrace around the people you host and the rooms you keep for family.'
      },
      seoTitle: { ar: 'تصميم فلل فاخرة في جدة | مجالس وضيافة عائلية — WB Studio', en: 'Luxury Villa Architect in Jeddah | Private Residences — WB Studio' },
      seoDesc: {
        ar: 'خطّط لمجلس الضيوف وصالة العائلة وتراس فيلتك مع المعماري وائل بو سماعيل. شاهد تصاميم من أبحر وخميس مشيط وابدأ بمكالمة مجانية عن أرضك.',
        en: 'Design a private villa with Wael Bousmael. Explore family interiors in Obhur and a terrace lighting study in Khamis Mushait, then discuss your plot on a free call.'
      },
      eyebrow: { ar: 'وائل بو سماعيل · معماري', en: 'Wael Bousmael · Architect' },
      h1: { ar: 'تصميم فلل عائلية فاخرة في جدة', en: 'Luxury villa design for families in Jeddah' },
      intro: {
        ar: 'حين يجتمع الأهل على العشاء، هل تفتح السفرة على المجلس والتراس، أم تفضّل أن يبقى الفناء للعائلة؟ في مكالمتك الأولى مع وائل بو سماعيل، نرسم ملامح البيت من تفاصيل كهذه ومن طبيعة أرضك. نبدأ بمكالمة مجانية، ثم نراجع معك تصوراً مبدئياً مجانياً، ونتفق على المخططات والأتعاب عندما يناسبك التوجّه.',
        en: 'When the extended family comes for dinner, should the dining room open to the majlis and terrace, or should the courtyard stay private? Your first conversation with architect Wael Bousmael starts with your plot and the way you host. The call and preliminary concept are free. Once the direction suits you, we agree on the drawings and fee.'
      },
      sections: [
        {
          heading: { ar: 'مطبخ الإفطار ومائدة الضيوف', en: 'Breakfast in the kitchen, dinner with guests' },
          body: {
            ar: 'في تصميم فيلا المنتشري بأبحر، تصطفّ أربعة مقاعد على طول جزيرة المطبخ، ويطلّ الجالس على الزرع من خلال الباب الزجاجي. أمّا عند تخطيط مائدة أكبر للضيافة، فنرسمها بكامل مقاعدها ونتتبّع طريق الأطباق من المطبخ. بهذه الطريقة نحدّد معك أيّ باب يبقى مفتوحاً على السفرة وأين تحتاج مساحة التحضير إلى خصوصية.',
            en: 'In the Montashiri Villa design in Obhur, four stools run along the kitchen island. From a seat at breakfast you can see planting beyond the glazed door. To plan a larger dinner in your own home, we draw the table with every seat occupied and trace how the dishes reach it. That helps you decide which door to leave open to guests and where to keep preparation out of view.'
          },
          example: {
            project: 'montashiri-villa',
            images: ['gallery-02.webp'],
            link: { ar: 'شاهد المطبخ وصالة العائلة في فيلا المنتشري', en: 'Explore the kitchen and family living room at Montashiri Villa' }
          }
        },
        {
          heading: { ar: 'كيف يبدو الوصول إلى البيت مساءً؟', en: 'Arriving for an evening on the terrace' },
          body: {
            ar: 'في التصوّر المقترح لفيلا خميس مشيط، يقود الدرج المنحني من التراس إلى الشرفة تحت سقف مبطّن بالخشب. في الدراسة الليلية يظهر الضوء أسفل حوض الزرع وعلى حافة السقف. عند مراجعة مدخل فيلتك، ننظر إليه من البوابة ثم من مكان الجلوس لنختار ما يراه الضيف لدى وصوله وما تراه العائلة من الداخل.',
            en: 'In the Khamis Mushait Villa proposal, a curved stair leads from the terrace to a balcony beneath a timber-lined canopy. The night study picks out the planter and roof edge with light. For your own entrance, we consider the view from the gate and then from a seat indoors to decide what a guest sees on arrival and what the family sees from the house.'
          },
          example: {
            project: 'khamis-mushait-villa',
            images: ['gallery-01.webp', 'gallery-02.webp'],
            link: { ar: 'استكشف مدخل فيلا خميس مشيط كما يبدو نهاراً ومساءً', en: 'Explore the Khamis Mushait Villa entrance by day and at night' }
          }
        }
      ],
      serviceType: 'Luxury villa design',
      faq: [
        {
          q: { ar: 'هل يشمل تصميم الفيلا التفاصيل الداخلية؟', en: 'Can the villa commission include interior detailing?' },
          a: { ar: 'نعم. حدّد الغرف التي ترغب في تفصيلها، مثل المجلس أو المطبخ أو الجناح الرئيسي. قبل الاتفاق المدفوع نوضّح لك ما يشمله العرض من توزيع الأثاث والمواد والرسومات التفصيلية، وأيّ بنود تحتاج إلى تنسيق مع مختصين.', en: 'Yes. Tell us which rooms you want to develop in detail, such as the majlis, kitchen or principal suite. Before you commission the work, the proposal sets out which furniture layouts, material choices and detail drawings are included and where specialist coordination is needed.' }
        },
        {
          q: { ar: 'ماذا نجهّز إذا كانت أرضنا خارج جدة؟', en: 'What should we bring if our plot is elsewhere in Saudi Arabia?' },
          a: { ar: 'يكفي اسم المدينة ومساحة الأرض التقريبية إن عرفتَها. وإذا توفر لديك كروكي يوضح جهة الشارع أو صور للإطلالة التي تهمّك، يمكننا مراجعتها في مكالمة عن بُعد. نناقش معك بعدها الحاجة إلى زيارة الموقع وترتيباتها.', en: 'Start with the city and approximate plot area if you know it. A sketch showing the street edge or photos of a view you want to keep can be reviewed together on a video call. We can then discuss whether a site visit would help and how to arrange it.' }
        },
        {
          q: { ar: 'كيف نحدّد ميزانية التصميم والتشطيبات؟', en: 'How do we set a budget for design and finishes?' },
          a: { ar: 'في المكالمة الأولى نناقش ما خصّصته للبناء والتشطيبات، والغرف التي تودّ أن تعطيها الأولوية. بعد مراجعة التصوّر المجاني نبيّن أتعاب التصميم وما تشمله من مخططات حتى تتمكن من فصلها عن المبالغ المخصّصة للمقاول والمورّدين.', en: 'On the first call we discuss your allowance for construction and finishes and the rooms you want to prioritise. After you review the free concept, the proposal identifies the design fee and its drawings so you can budget separately for the contractor and suppliers.' }
        }
      ],
      related: ['villa-design-jeddah', 'modern-villa-design-jeddah', 'obhur-villa-design', 'modern-hijazi-villa-design'],
      relatedProjects: ['montashiri-villa', 'khamis-mushait-villa'],
      image: { src: '/assets/projects/montashiri-villa/gallery-01.webp', w: 1672, h: 941, alt: { ar: 'تصوّر لصالة عائلية بارتفاع طابقين تطلّ على فناء مزروع في فيلا المنتشري بأبحر', en: 'Proposed double-height family living room facing a planted courtyard at Montashiri Villa in Obhur, Jeddah' } }
    },
    {
      slug: 'modern-villa-design-jeddah',
      label: { ar: 'تصميم فيلا مودرن في جدة', en: 'Modern villa design in Jeddah' },
      summary: {
        ar: 'تصميم الواجهة والنوافذ والتراسات المظللة بحسب اتجاه الشمس وما ينكشف من البيت للشارع.',
        en: 'Shape the facade, windows and shaded terraces around the sun and the view from the street.'
      },
      seoTitle: { ar: 'تصميم فيلا مودرن في جدة | الواجهات والتظليل — WB Studio', en: 'Modern Villa Design in Jeddah – Facades & Shade | WB Studio' },
      seoDesc: {
        ar: 'تصميم واجهات فلل مودرن في جدة يراعي اتجاه الشمس وخصوصية العائلة. شاهد واجهة فيلا المنتشري في أبحر وتراساً مظللاً في تصميم فيلا خميس مشيط.',
        en: 'Plan a modern villa facade for your Jeddah plot. See how street screens work in an Obhur design and how a deep canopy shades a Khamis Mushait terrace.'
      },
      eyebrow: { ar: 'الفلل الحديثة — جدة', en: 'Modern villas — Jeddah' },
      h1: { ar: 'تصميم فيلا مودرن في جدة', en: 'Modern villa design in Jeddah' },
      intro: {
        ar: 'أي نافذة تحب أن تفتحها على ضوء الصباح؟ وأين تفضّل الجلوس بعد العصر؟ من اتجاه أرضك في جدة وإجاباتك نحدّد عرض الفتحات، وموضع الشرائح التي تحجب النظر، والمساحة التي تحتاج إلى ظلّ عند باب التراس.',
        en: 'Which room would you like to open to the morning light? Where would you sit in the late afternoon? Those choices and the orientation of your Jeddah plot guide the width of the windows, the position of privacy screens and the shade you need outside the terrace door.'
      },
      sections: [
        {
          heading: { ar: 'واجهة الشارع في فيلا المنتشري بأبحر', en: 'The street facade at Montashiri Villa in Obhur' },
          body: {
            ar: 'في تصور الواجهة أعلاه، تتخلّل سور فيلا المنتشري فتحات بشرائح أفقية. تحجب الشرائح جزءاً من الطابق الأرضي عن المارّة، ويظل النخيل في التراسات العليا ظاهراً من الشارع. خلف هذه الواجهة تستقبل صالة العائلة الضوء من فناء مزروع. عند تصميم واجهتك نراجع ما يظهر من خلف كل فتحة على مستوى الرصيف ومن نوافذ الجيران المقابلة.',
            en: 'In the proposed street view above, horizontal slats fill openings in the garden wall. They screen the ground floor from passers-by while palms on the upper terraces remain visible from the street. Behind this facade, the family living room draws daylight from a planted courtyard. On your plot, we check each opening from pavement level and from the windows opposite.'
          }
        },
        {
          heading: { ar: 'مظلة واحدة للتراس والشرفة', en: 'One canopy for the terrace and balcony' },
          example: {
            project: 'khamis-mushait-villa',
            images: ['gallery-01.webp', 'gallery-02.webp'],
            link: { ar: 'شاهد تصميم فيلا خميس مشيط من بوابة الفناء', en: 'See the Khamis Mushait Villa design from the courtyard gate' }
          },
          body: {
            ar: 'في تصميمنا المقترح لفيلا في خميس مشيط بعسير، يمتد سقف ببطانة خشبية فوق الشرفة والدرج المنحني، وتقع الجلسة السفلية تحت الشرفة. يبيّن المشهد القريب عمق المظلة، بينما يوضح المشهد الليلي كيف ترسم الإنارة حافتها. إذا أحببت هذه الجلسة لأرضك في جدة، نحدّد وقت استخدامها ونراجع موضع الظل على المقاعد حين تكون الشمس منخفضة.',
            en: 'In our proposed villa in Khamis Mushait, Asir, a timber-lined canopy extends over the balcony and curved stair. The balcony shelters the seating below. The close view shows the depth of the canopy and the night view traces its edge in light. For a terrace on your Jeddah plot, we start with the hour you’ll use it and check where the shade falls across the seats when the sun is low.'
          }
        }
      ],
      serviceType: 'Modern villa design',
      faq: [
        {
          q: { ar: 'كيف أظلّل نافذة تطل على الغرب؟', en: 'How can I shade a west-facing window?' },
          a: { ar: 'تصل شمس العصر إلى الزجاج بزاوية منخفضة، وقد تمر تحت المظلة العلوية. ندرس إرجاع النافذة إلى داخل الواجهة أو إضافة شرائح أمامها، ثم نراجع من داخل الغرفة ما يبقى ظاهراً من الإطلالة.', en: 'Low afternoon sun can reach the glass beneath a horizontal overhang. We can set the window deeper into the facade or angle an exterior screen, then check how much of the view stays open from inside the room.' }
        },
        {
          q: { ar: 'ما الذي أرسله لبدء تصميم الواجهة؟', en: 'What should I bring to the first facade discussion?' },
          a: { ar: 'أرسل موقع الأرض، والمخطط إن توفر، وصورة من جهة الشارع. أخبرنا بأي غرفة تريد أن تستفيد من ضوء الصباح أو ظل العصر. نبدأ بمكالمة مجانية ثم تصور مبدئي مجاني، ونتّفق على النطاق والأتعاب عندما يناسبك التوجّه.', en: 'Send the plot location, a plan if you have one, and a view from the street. Tell us which room matters most for morning light or afternoon shade. We start with a free call and a free preliminary concept. Once the direction works for you, we agree on scope and fees.' }
        },
        {
          q: { ar: 'كيف تحافظون على الخصوصية مع الفتحات الكبيرة؟', en: 'How do you keep privacy with large openings?' },
          a: { ar: 'عبر توجيه الفتحات نحو أفنية وحدائق داخلية، وستائر معمارية، وتدرّج المستويات.', en: 'By orienting openings toward internal courts and gardens, using architectural screens, and layering levels.' }
        }
      ],
      related: ['villa-design-jeddah', 'luxury-villa-design-jeddah', 'modern-hijazi-villa-design', 'obhur-villa-design'],
      relatedProjects: ['montashiri-villa', 'khamis-mushait-villa'],
      image: { src: '/assets/projects/montashiri-villa/cover.webp', w: 1536, h: 960, alt: { ar: 'تصوّر لفيلا المنتشري في أبحر بجدة، بشرائح أفقية على سور الحديقة وتراسات مزروعة فوق الواجهة الحجرية', en: 'Proposed street facade of Montashiri Villa in Obhur, Jeddah, with horizontal garden screens and planted terraces above the stone frontage' } }
    },
    {
      slug: 'obhur-villa-design',
      label: { ar: 'تصميم فلل أبحر', en: 'Obhur villa design' },
      summary: {
        ar: 'اختيار موقع الجلسات الخارجية وفتحات الواجهة بحسب إطلالة أرضك والبيوت المجاورة، مع مثال من أبحر.',
        en: 'Choose where to place windows and outdoor seating around the views and neighbours on your plot, with a villa design from Obhur.'
      },
      seoTitle: { ar: 'تصميم فلل أبحر | فلل شمال جدة الساحلية — WB Studio', en: 'Obhur Villa Design | North Jeddah Coastal Villas — WB Studio' },
      seoDesc: {
        ar: 'تصميم فلل في أبحر وشمال جدة. شاهد كيف تطلّ غرفة المعيشة على الفناء في فيلا المنتشري، وكيف تتعامل الواجهة مع الشارع. ناقش إطلالة أرضك وخصوصيتها في مكالمة مجانية.',
        en: 'Explore villa design in Obhur and North Jeddah. See Montashiri Villa’s street facade and courtyard-facing living room, then discuss the outlook and privacy of your plot.'
      },
      eyebrow: { ar: 'الساحل — أبحر وشمال جدة', en: 'The coast — Obhur & North Jeddah' },
      h1: { ar: 'تصميم فلل في أبحر وشمال جدة', en: 'Villa design in Obhur & North Jeddah' },
      intro: {
        ar: 'تختلف أولويات الأرض المطلة على البحر عن أرض تحيط بها بيوت الجيران. نبدأ بتحديد الإطلالة التي تهمّك، والجهات المكشوفة على الشارع، والوقت الذي تحبّ فيه الجلوس خارج البيت. هذه التفاصيل تساعدنا في اختيار موضع الشرفة أو الفناء.',
        en: 'A waterfront plot and a plot between neighbours call for different plans. We start with the view you want to keep, the sides exposed to the street and the time of day you like to sit outside. Those details help us place a terrace or courtyard where you will use it.'
      },
      sections: [
        {
          heading: { ar: 'أين نضع الجلسة الخارجية؟', en: 'Where should the terrace go?' },
          body: {
            ar: 'إذا كانت الإطلالة من الطابق العلوي، ندرس شرفة تتصل بغرفة تستخدمها يومياً. وإذا كانت الأنظار تأتي من فوق السور، نبحث عن موضع أكثر خصوصية للجلسة وندرس ارتفاع الحاجز وعمق الظل من مستوى الشخص الجالس.',
            en: 'If the view opens up on an upper floor, we look at placing a terrace beside a room you use every day. If neighbouring windows overlook the boundary wall, we study where the seating can go and how high a screen needs to be from a seated person’s point of view.'
          }
        },
        {
          heading: { ar: 'الشارع والفناء في فيلا المنتشري', en: 'Street and courtyard at Montashiri Villa' },
          body: {
            ar: 'في صفحة المشروع يمكنك أن ترى الفيلا من الشارع ثم من داخلها. تظهر من الخارج شرفات مزروعة فوق الواجهة الحجرية. ومن الداخل تطلّ جلسة المعيشة على الفناء عبر الزجاج، وفي المطبخ باب زجاجي يفتح على مساحة مزروعة.',
            en: 'The project page shows the villa first from the street, then from inside. Planted terraces rise above the stone street facade. In the living room, the seating faces broad courtyard windows. In the kitchen, a glazed door opens towards planting.'
          }
        }
      ],
      serviceType: 'Coastal villa design',
      faq: [
        {
          q: { ar: 'هل لديكم خبرة بأراضي أبحر تحديداً؟', en: 'Do you have experience with Obhur plots specifically?' },
          a: { ar: 'نعم. فيلا المنتشري من تصاميم الاستوديو في أبحر. تعرض صفحة المشروع تصوّرات الواجهة المطلة على الشارع وغرفة المعيشة والمطبخ.', en: 'Yes. Montashiri Villa is a studio design for Obhur. Its project page shows renderings of the street facade, living room and kitchen.' }
        },
        {
          q: { ar: 'كيف تحمون الخصوصية على واجهة بحرية مفتوحة؟', en: 'How do you protect privacy on an open waterfront?' },
          a: { ar: 'نحدّد أولاً الجهات التي تطلّ على الجلسة، ثم ندرس توجيهها وموضع الحواجز الجانبية بحيث تحتفظ بالإطلالة التي تهمّك.', en: 'We identify which directions overlook the seating area, then study its orientation and the position of side screens to preserve the view you value.' }
        },
        {
          q: { ar: 'هل تصممون فللاً في شمال جدة عموماً؟', en: 'Do you design villas in North Jeddah generally?' },
          a: { ar: 'نعم. اذكر الحي ومساحة الأرض التقريبية عند التواصل. وإذا توفرت لديك صور من حدود الأرض باتجاه الشارع والجيران، يمكننا مراجعتها في المكالمة الأولى.', en: 'Yes. Tell us the district and approximate plot size when you get in touch. If you have photos taken from the plot towards the street and neighbours, we can review them on the first call.' }
        }
      ],
      related: ['villa-design-jeddah', 'luxury-villa-design-jeddah', 'modern-villa-design-jeddah', 'modern-hijazi-villa-design'],
      relatedProjects: ['montashiri-villa'],
      image: { src: '/assets/projects/montashiri-villa/cover.webp', w: 1536, h: 960, alt: { ar: 'واجهة فيلا المنتشري الحجرية في أبحر مع شرفات مزروعة ونخيل عند الغروب', en: 'Montashiri Villa’s stone facade and planted terraces in Obhur at dusk' } }
    },
    {
      slug: 'modern-hijazi-villa-design',
      label: { ar: 'تصميم فلل حجازية حديثة', en: 'Modern Hijazi villa design' },
      summary: {
        ar: 'نصمّم واجهة تستلهم رواشين جدة، ونختار مواضع الفتحات والظل بحسب الغرف التي تطلّ على الشارع.',
        en: 'A facade inspired by Jeddah’s timber rawasheen, with shade and openings designed around the rooms facing the street.'
      },
      seoTitle: { ar: 'تصميم فلل حجازية حديثة في جدة | روشان وفناء — WB Studio', en: 'Modern Hijazi Villa Design in Jeddah | Rawasheen & Courtyards — WB Studio' },
      seoDesc: {
        ar: 'تصميم فلل حجازية حديثة في جدة: روشان ومشربيات وأفنية وحجر، بلغة معاصرة نظيفة تحترم الخصوصية والمناخ والهوية. مكالمة وتصور مبدئي مجاني.',
        en: 'Modern Hijazi villa design in Jeddah: rawasheen, mashrabiya, courtyards and stone in a clean contemporary language that respects privacy, climate and identity. Free call and preliminary concept.'
      },
      eyebrow: { ar: 'العمارة الحجازية الحديثة — جدة', en: 'Modern Hijazi architecture — Jeddah' },
      h1: { ar: 'تصميم فلل حجازية حديثة', en: 'Modern Hijazi villa design' },
      intro: {
        ar: 'إذا أعجبتك الرواشين الخشبية في بيوت جدة التاريخية، فأي غرفة في بيتك تودّ أن تطلّ على الشارع من خلف روشان؟ نبدأ من هذه الغرفة ومكان الجلسة فيها، ثم نرسم البروز والفتحات لنرى كيف تبدو الواجهة من الشارع والإطلالة من الداخل.',
        en: 'A timber rawshan gives a room a sheltered view of the street. If you like the wooden windows of historic Jeddah, we start by choosing the room where you would use one. A sketch from your seat inside and another from the street show how far the window projects and where the openings should be.'
      },
      sections: [
        {
          heading: { ar: 'الروشان والمشربية', en: 'Rawshan and mashrabiya' },
          body: {
            ar: 'قد يحتاج المجلس المطلّ على الرصيف إلى حجب الرؤية عند مستوى الجالسين، بينما يمكن ترك الفتحات العلوية أوسع لدخول الضوء. ندرس ارتفاع المشربية وتباعد شرائحها وعمقها مع اتجاه الشمس وموقع نوافذ الجيران.',
            en: 'A street-facing majlis may need screening at seated eye level, with wider openings above to admit daylight. We study the height, spacing and depth of the timber screen against the sun and the positions of neighbouring windows.'
          }
        },
        {
          heading: { ar: 'الفناء والحجر', en: 'Courtyard and stone' },
          body: {
            ar: 'في الفيلا المعاصرة يمكن أن تطلّ جلسة العائلة على فناء مزروع. في تصميم فيلا المنتشري بأبحر، يبيّن منظر الشارع تدرّج الشرفات فوق الواجهة الحجرية، بينما يوضّح المنظور الداخلي كيف تطلّ صالة المعيشة على الزرع عبر نوافذ بارتفاع طابقين.',
            en: 'In a contemporary villa, a planted courtyard can give the family living room its own outlook. The Montashiri Villa design in Obhur shows both sides of this decision. The street view shows planted terraces above a stone facade, while the interior rendering shows windows on two levels looking into the courtyard.'
          }
        }
      ],
      serviceType: 'Hijazi villa design',
      faq: [
        {
          q: { ar: 'ما الفرق بين الحجازي الحديث والتراثي؟', en: 'What’s the difference between modern Hijazi and traditional?' },
          a: { ar: 'في البيت المعاصر نختار من عناصر العمارة الحجازية ما يناسب الغرفة. مثلاً، يمكن أن تستلهم نافذة المجلس الروشان في بروزها وتظليلها، مع اختيار أبعادها وشكل شرائحها بحسب إطلالة المجلس اليوم.', en: 'We adapt individual elements to the room. A majlis window might borrow the projection and shade of a traditional rawshan, with dimensions and timber spacing chosen for the view from this particular room.' }
        },
        {
          q: { ar: 'هل تصممون واجهات فلل بطابع حجازي حديث؟', en: 'Do you design villa façades with a modern Hijazi character?' },
          a: { ar: 'نعم. تساعدنا صورة لروشان يعجبك ومخطط الطابق، إن توفّر، على اقتراح موضعه وحجمه وعلاقته بالغرفة خلفه.', en: 'Yes. A photo of a rawshan you like and a floor plan, if you have one, help us propose where it should sit, how large it should be and how it connects to the room behind it.' }
        },
        {
          q: { ar: 'هل يناسب هذا الطابع الأحياء الحديثة في جدة؟', en: 'Does this character suit Jeddah’s modern districts?' },
          a: { ar: 'نعم. يختلف تصميم الروشان باختلاف اتجاه الشارع والمسافة إلى الجيران. اذكر الحي في طلبك، ويمكننا مراجعة صور الموقع في المكالمة الأولى.', en: 'Yes. The direction of the street and the distance to neighbouring houses guide the design. Include the district in your inquiry and we can look at site photos together on the first call.' }
        }
      ],
      related: ['villa-design-jeddah', 'luxury-villa-design-jeddah', 'modern-villa-design-jeddah', 'obhur-villa-design'],
      relatedProjects: ['montashiri-villa', 'stone-majlis'],
      image: { src: '/assets/projects/montashiri-villa/cover.webp', w: 1536, h: 960, alt: { ar: 'واجهة فيلا المنتشري الحجرية وشرفاتها المزروعة في أبحر، جدة', en: 'Montashiri Villa design in Obhur, Jeddah, with a stone street facade and planted terraces' } }
    }
  ],

  // ── Journal (SEO guides for pre-hire searches) ──
  journalMeta: {
    seoTitle: { ar: 'المدوّنة | أدلة تصميم الفلل في جدة — WB Studio', en: 'Journal | Villa Design Guides for Jeddah — WB Studio' },
    seoDesc: {
      ar: 'أدلة لأصحاب الأراضي في جدة تساعدك على مراجعة توزيع الفيلا والمجلس، ومقارنة أتعاب التصميم، وفهم مخططات التنفيذ قبل البناء.',
      en: 'Villa design guides for Jeddah homeowners. Review a floor plan for family privacy, compare design fees and understand the drawings you need before building.'
    },
    h1: { ar: 'المدوّنة', en: 'Journal' },
    intro: {
      ar: 'إذا كنت تخطّط لفيلا في جدة، ابدأ بالسؤال الذي يشغلك اليوم. ماذا تجهّز للمكالمة الأولى؟ كيف تقارن عرضَي تصميم؟ وأين تضع المجلس عندما تراجع المخطط؟',
      en: 'If you’re planning a villa in Jeddah, start with the question in front of you. What should you bring to a first meeting? How do you compare two fee proposals? Where should the majlis go when you review a floor plan?'
    },
    readMore: { ar: 'اقرأ الدليل', en: 'Read the guide' },
    byline: { ar: 'بقلم', en: 'By' },
    publishedLabel: { ar: 'نُشر في', en: 'Published' },
    updatedLabel: { ar: 'آخر تحديث في', en: 'Updated' },
    guidesTitle: { ar: 'أدلة تساعدك على البدء', en: 'Guides to help you get started' },
    backToJournal: { ar: 'المدوّنة', en: 'Journal' },
    relatedTitle: { ar: 'خدمات ذات صلة', en: 'Related services' }
  },

  journal: [
    {
      slug: 'majlis-family-living-villa-floor-plan',
      imageProject: 'montashiri-villa',
      imageFile: 'gallery-01.webp',
      projectCaption: {
        ar: 'في تصميم فيلا المنتشري بأبحر، تطلّ جلسة العائلة على الفناء المزروع ويشرف عليها ممرّ الطابق العلوي. إذا أعجبتك هذه الفكرة، اطلب من المعماري أن يرسم ما سيراه الشخص الواقف في الممرّ العلوي في بيتك.',
        en: 'In the Montashiri Villa design in Obhur, the family seats face a planted courtyard. An upstairs gallery overlooks them. If you like this arrangement, ask your architect to sketch the view from the upstairs landing in your own home.'
      },
      date: '2026-11-28',
      title: { ar: 'توزيع المجلس والصالة العائلية في مخطط الفيلا | WB Studio', en: 'Planning the Majlis and Family Living Room in a Saudi Villa | WB Studio' },
      desc: {
        ar: 'كيف تستقبل ضيوفك ويبقى لأهل البيت مجال للحركة؟ راجع مداخل الفيلا، وموقع مغاسل الضيوف، ومسار تقديم العشاء على مخطط الدور الأرضي.',
        en: 'Review a Saudi villa floor plan before approving it. Trace guest and family routes, check the view from the front door and walk through serving dinner.'
      },
      h1: { ar: 'كيف توزّع المجلس والصالة العائلية في مخطط الفيلا؟', en: 'Where should the majlis and family living room go on a villa floor plan?' },
      intro: {
        ar: 'تخيّل مساءً تستقبل فيه ضيوفك في المجلس ويعود أحد أبنائك من التمرين. من أين يدخل كلّ منهم؟ افتح مخطط الدور الأرضي وجرّب عليه تفاصيل تلك الأمسية. ستعرف أيّ الغرف تحتاج إلى التقارب، وأين تحتاج العائلة إلى باب يمكن إغلاقه.',
        en: 'Picture an evening when guests arrive for dinner just as someone gets home from football. Which door does each person use? Put a copy of the ground-floor plan on the table and walk through that evening. It will tell you which rooms belong together and where you need a door you can close.'
      },
      sections: [
        {
          heading: { ar: 'مدخل مشترك أم مدخل مستقل للمجلس؟', en: 'Can the majlis share the family entrance?' },
          body: {
            ar: 'ارسم بلون مسار ضيف من البوابة إلى المجلس، وبلون آخر مسار أحد أفراد العائلة من السيارة إلى الدرج. إذا كان اللقاء عند الباب يناسبكم، فقد يكفي بهو مشترك يتفرع منه الطريق. أمّا إذا أردتم دخول البيت وقت الضيافة من دون المرور بالمجلس، فجرّبوا موضع باب مستقل، ثم راجعوا أين يلتقي المساران بعده.',
            en: 'Use one colour to trace a guest from the gate to a seat in the majlis, the room where you receive visitors. Use another to trace a family member from the car to the stairs. If you like greeting each other at the door, a shared hall with two onward routes may suit you. If the family wants to come and go independently, draw a separate entrance and check where the paths next meet.'
          }
        },
        {
          heading: { ar: 'ماذا يرى الضيف في طريقه إلى المغاسل؟', en: 'What can a guest see on the way to the washbasin?' },
          body: {
            ar: 'ضع علامة على باب المجلس وأخرى عند مغاسل الضيوف. تتبّع المسافة بينهما وتخيّل أبواب الصالة والمطبخ مفتوحة. إذا ظهرت جلسة العائلة مباشرة أمام الضيف، ارسم على نسخة من المخطط باب المجلس في موضع آخر أو جرّب مدخلاً ينعطف قبل الصالة. قارن ما يظهر من الجلسة في كل نسخة.',
            en: 'Mark the majlis doorway and the guest washbasin. Follow the route between them with the kitchen and living room doors drawn open. Does the family sofa come into full view? On a second copy, move the majlis doorway along the wall or give the entrance a turn before the living room. Compare the view from the guest route in each version.'
          }
        },
        {
          heading: { ar: 'جرّب تقديم العشاء على المخطط', en: 'Walk a dinner tray from the kitchen to the table' },
          body: {
            ar: 'ضع طاولة الطعام والكراسي في مكانها على المخطط، واسحب كرسياً كأنّ عليه ضيفاً. تتبّع الطريق بصينية من المطبخ إلى السفرة ثم عُد بالأطباق بعد العشاء. إذا مررت بين الكنبة والتلفزيون أو اضطررت إلى إزاحة الكرسي، جرّب تدوير الطاولة أو تغيير موضع باب السفرة قبل أن تطلب غرفة أكبر.',
            en: 'Draw the dining table and chairs, with one chair pulled out as if a guest were sitting in it. Trace a tray from the kitchen to the table, then take the empty plates back. If the route crosses between the sofa and the television or clips the occupied chair, try turning the table or moving the dining room door before asking for a bigger room.'
          }
        },
        {
          heading: { ar: 'اكتب ملاحظة محددة على الرسم', en: 'Give your architect one specific note on the drawing' },
          body: {
            ar: 'ضع دائرة حيث يتقاطع مساران يهمّك فصلهما، واكتب بجانبها ما يحدث في بيتك. مثلاً «نجتمع للعشاء كل جمعة، ونريد أن يصل الأطفال من الدرج إلى المطبخ فيما الضيوف في المجلس». يتيح هذا الوصف للمعماري أن يقترح توزيعاً آخر، ولك أن تختبره بالأمسية نفسها.',
            en: 'Circle a crossing you would like to avoid and write what happens there in your household. For example, “We host Friday dinner and want the children to reach the kitchen from the stairs while guests are in the majlis.” Your architect can draw another layout, and you can test it against the same evening.'
          }
        }
      ],
      related: ['villa-design-jeddah', 'luxury-villa-design-jeddah']
    },
    {
      slug: 'villa-design-cost-jeddah',
      imageProject: 'montashiri-villa',
      projectCaption: {
        ar: 'الواجهة الحجرية جزء من تصميم هذه الفيلا في أبحر. في صفحة المشروع ترى أيضاً المعيشة والمطبخ. عند طلب عرض أتعاب، حدّد الغرف التي تريد أن يشملها التصميم الداخلي.',
        en: 'The stone facade is one part of this villa design in Obhur. The project page also shows the living room and kitchen. When requesting a fee proposal, specify which rooms you want the interior design to cover.'
      },
      date: '2026-05-20',
      updated: '2026-11-21',
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
            ar: 'تغطّي أتعاب التصميم العمل والمخططات المذكورة في العرض. أمّا ميزانية البناء فتشمل البنود التي يسعّرها المقاول، مثل المواد والعمالة والتشطيبات. عند مقارنة عرضين للتصميم، راجع نطاق المخططات والتنسيق المشمول في كل منهما.',
            en: 'Design fees cover the work and drawings listed in the proposal. The construction budget covers items the contractor prices, including materials, labour and finishes. When comparing two design proposals, check which drawings and coordination work each fee includes.'
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
      projectCaption: {
        ar: 'تُظهر الواجهة المطلة على الشارع كيف تتوزع الفتحات بين الحجر والسواتر. قبل المكالمة، فكّر في الغرف التي تريد أن تطلّ على الشارع وتلك التي تفضّل أن تطلّ على فناء.',
        en: 'The street elevation shows where openings sit between walls and screens. Before the first call, think about which rooms you want to face the street and which you would prefer to face a courtyard.'
      },
      date: '2026-04-28',
      updated: '2026-11-28',
      title: { ar: 'قبل تصميم الفيلا في جدة، ماذا تحضّر للقاء المعماري؟ | WB Studio', en: 'Villa Design Checklist for Meeting an Architect | WB Studio' },
      desc: {
        ar: 'تخطّط لفيلا في جدة؟ جهّز ملاحظة قصيرة عن الأرض واحتياجات العائلة وما تشمله الميزانية. اعرف أيّ الصور والمخططات تفيد في المكالمة الأولى وما يمكن تأجيله.',
        en: 'Planning a villa in Jeddah? Bring a short brief on your plot, household and budget. See which sketches and photos help on the first call and what can wait.'
      },
      h1: { ar: 'ماذا تجهّز قبل لقاء المعماري لتصميم فيلتك؟', en: 'What to prepare before meeting your villa architect' },
      intro: {
        ar: 'للمكالمة المجانية الأولى، يكفي أن تصف أين تريد البناء وما الذي تحتاجه عائلتك من البيت. انسخ القائمة التالية في ملاحظات هاتفك واملأ ما تعرفه. اترك ما لم تحسمه كسؤال نناقشه معاً.',
        en: 'For the first free call, start with where you want to build and what your family needs from the house. Copy the checklist into a phone note and fill in what you know. Anything you haven’t settled yet can be a question for the call.'
      },
      sections: [
        {
          heading: { ar: 'قائمة تحضير المكالمة الأولى', en: 'Your first meeting checklist' },
          body: {
            ar: 'يكفي سطر لكل بند. هذه التفاصيل تساعدنا على طرح أسئلة تخصّ بيتك منذ بداية الحديث.',
            en: 'One line per item is enough. These details help us ask questions specific to your house from the start.'
          },
          items: [
            { ar: 'الأرض — المدينة أو الحي، المساحة التقريبية إن عرفتَها، وأيّ ضلع يطلّ على الشارع. إذا كنت ما زلت تفاضل بين أرضين، اذكر ما يعجبك في كلّ منهما.', en: 'Plot — city or district, approximate area if known, and which side faces the street. If you’re still choosing between two plots, note what appeals to you about each.' },
            { ar: 'أهل البيت — عدد من سيسكنون فيه وما يحتاجونه يومياً، مثل غرفة في الدور الأرضي لأحد الوالدين أو مكان هادئ للعمل من المنزل.', en: 'Household — how many people will live there and one daily need for each, such as a ground-floor bedroom for a parent or a quiet place to work.' },
            { ar: 'الأولويات — شيء أساسي وشيء يمكن تأجيله. مثلاً، إذا ضاقت المساحة، هل تفضّل غرفة ضيوف إضافية أم حديقة تتّسع للعب الأطفال؟', en: 'Priorities — one essential and one thing that could wait. If space gets tight, would an extra guest bedroom or a garden big enough for the children to play come first?' },
            { ar: 'الميزانية — نطاق تقريبي بالريال إن تكوّنت لديك فكرة عنه. اكتب ما حسبته ضمنه، مثل البناء والتشطيبات والأثاث والأتعاب، وما خصّصت له مبلغاً منفصلاً.', en: 'Budget — a range in Saudi riyals if you have one. Note whether it covers construction, finishes, furniture and fees, and which of those have their own allowance.' }
          ]
        },
        {
          heading: { ar: 'أيّ رسم أو صورة يفيد في شرح الأرض؟', en: 'Which plot sketch or photos would help?' },
          body: {
            ar: 'إن كان لديك كروكي، علّم عليه جهة الشارع والمدخل الذي تتخيّله. صورة من جهة المدخل باتجاه داخل الأرض وأخرى من مكان الصالة المقترح باتجاه الإطلالة تشرحان ما يصعب وصفه. إذا كانت الأبعاد تقريبية فاكتب ذلك على الرسم. يمكنك ترتيب المكالمة حتى لو لم يتوفّر رفع مساحي بعد، والاحتفاظ بصكّ الأرض وبيانات الهوية لديك في هذه المرحلة.',
            en: 'If you have a plot sketch, mark the street and where you imagine arriving. A photo looking into the plot from that entrance and another looking out from the proposed living room can explain a view better than a description. Mark estimated dimensions as approximate. You can book a call before you have a measured survey and keep your deed and personal ID details private at this stage.'
          }
        },
        {
          heading: { ar: 'اختر صورة تستطيع أن تشرح ما أعجبك فيها', en: 'Pick one reference you can explain' },
          body: {
            ar: 'إذا لفتتك صورة لفيلا، حدّد التفصيل الذي تتمنّاه في بيتك. قد يعجبك في صورة الشرفة اتساع الجلسة المظللة، بينما تفضّل أن تكون أقرب إلى المطبخ لتتناول الفطور فيها. بهذا التعليق نفهم كيف تريد استخدام الفراغ حتى لو اختلف شكل الواجهة.',
            en: 'If a villa image catches your eye, mark the detail you would actually use. You might like the deep shade over a terrace but want that terrace beside the kitchen so you can eat breakfast there. That note tells your architect what to carry into your design even if the facade looks quite different.'
          }
        },
        {
          heading: { ar: 'ما الذي يخرج به صاحب الفيلا من المكالمة؟', en: 'What happens after the first call?' },
          body: {
            ar: 'نراجع أولوياتك ونحدّد أيّ معلومة عن الأرض ستساعد في الخطوة التالية. بعدها نعرض عليك تصوّراً مبدئياً مجانياً لتناقش التوزيع المقترح مع عائلتك. عندما يناسبك التوجّه، نتفق على المخططات المطلوبة والأتعاب قبل بدء العمل المدفوع.',
            en: 'We review your priorities and identify any plot information needed for the next step. WB Studio then shares a free preliminary concept so you can discuss the proposed layout with your family. Once the direction suits you, we agree which drawings you need and what they will cost before paid work begins.'
          }
        }
      ],
      related: ['villa-design-jeddah', 'modern-villa-design-jeddah']
    },
    {
      slug: 'concept-design-vs-execution-drawings',
      imageProject: 'khamis-mushait-villa',
      projectCaption: {
        ar: 'يوضّح هذا التصوّر شكل الشرفة والمدخل المقترحين. أمّا أبعادهما وتفاصيل بنائهما فتحدّدها مخططات التنفيذ.',
        en: 'This rendering shows the proposed balcony and entrance. Execution drawings specify their dimensions and how to build them.'
      },
      date: '2026-04-10',
      updated: '2026-11-21',
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
      projectCaption: {
        ar: 'تظهر الشرفات المزروعة فوق واجهة هذه الفيلا في أبحر. وفي صفحة المشروع ترى الإطلالة من داخل غرفة المعيشة نحو الفناء.',
        en: 'Planted terraces sit above the street facade of this villa in Obhur. The project page also shows the view from the living room towards the courtyard.'
      },
      date: '2026-03-22',
      updated: '2026-11-21',
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
  'home.h1': 'Hausplanung und Umbau in Berlin.',
  'home.positioning': 'Persönliche Planung für Ihr neues Zuhause oder den Umbau Ihres Hauses — mit klaren Grundrissen und einem Blick für Ihren Alltag. Digital und vor Ort nach Vereinbarung.',
  'home.ctaWhatsapp': 'Kostenlose Beratung buchen',
  'home.ctaForm': 'Projekt vorstellen',
  'home.trustItems.0': 'Über 12 Jahre Erfahrung',
  'home.trustItems.1': 'Freier Planer und BIM-Koordinator',
  'home.trustItems.2': 'Berlin — digital und vor Ort nach Vereinbarung',
  'home.trustItems.3': 'Vom ersten Entwurf bis zur Ausführungsplanung',
  'home.heroImage.alt': 'Nachtansicht der geplanten Villa in Khamis Mushait durch das Holztor, mit beleuchteter Dachkante über der geschwungenen Treppe und der Terrasse',
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
      h1: { de: 'Hausplanung für Ihr Grundstück in Berlin' },
      intro: { de: 'Sie haben ein Grundstück in Berlin und möchten ein Haus planen, das zu Ihrem Leben passt? Als freier Planer entwickelt Wael Bousmael mit Ihnen Raumprogramm, Grundriss und gestalterische Richtung. Wir arbeiten digital und nach vorheriger Vereinbarung vor Ort — mit direktem Kontakt und einem verständlichen nächsten Schritt.' },
      sections: [
        {
          heading: { de: 'Das Grundstück verstehen' },
          body: { de: 'Wo liegt der Zugang, wie fällt das Gelände ab und von welchen Nachbarfenstern aus ist der Garten einsehbar? Ein Lageplan und Fotos helfen beim ersten Gespräch. Bei der Villa am Hang in Aley im Libanon zeigt der Gebäudeschnitt, wie die Wohnebenen dem Gelände folgen. Baustellenfotos und Entwurfsansichten ergänzen die Zeichnungen.' }
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
          a: { de: 'Ja. Wir können uns nach Vereinbarung auf Ihrem Grundstück treffen und gemeinsam Zufahrt, Ausblick und Nachbarbebauung ansehen. Das erste Gespräch ist auch per Video möglich. Dafür genügen zunächst der Standort und Ihre Fragen.' }
        }
      ],
      related: ['hausumbau-berlin'],
      relatedProjects: ['hillside-villa-aley', 'montashiri-villa'],
      image: { src: '/assets/projects/montashiri-villa/cover.webp', w: 1536, h: 960, alt: { de: 'Entwurf der Montashiri Villa in Obhur, Jeddah, mit Steinfassade und bepflanzten Terrassen' } }
    },
    {
      slug: 'hausumbau-berlin',
      label: { de: 'Hausumbau in Berlin' },
      summary: { de: 'Bestehende Häuser neu durchdenken: Bestandsanalyse, Grundrissvarianten und abgestimmte Umbauplanung.' },
      seoTitle: { de: 'Hausumbau Berlin | Grundriss & Umbauplanung — WB Studio' },
      seoDesc: { de: 'Hausumbau in Berlin mit durchdachten Grundrissen und klarer Bestandsplanung. Kostenloses Erstgespräch und erster Entwurf vor einer kostenpflichtigen Beauftragung.' },
      eyebrow: { de: 'Planen im Bestand — Berlin' },
      h1: { de: 'Umbauplanung für Ihr Haus in Berlin' },
      intro: { de: 'Ein Haus muss nicht vollständig neu sein, um besser zu Ihrem Leben zu passen. Wir untersuchen gemeinsam, wie sich Grundrisse öffnen, Wege verkürzen und Räume neu nutzen lassen. Am Anfang stehen Ihr Alltag und ein genauer Blick auf den Bestand — digital und vor Ort nach vorheriger Vereinbarung.' },
      sections: [
        {
          heading: { de: 'Mit dem Bestand beginnen' },
          body: { de: 'Vorhandene Pläne, Fotos und Ihre Beobachtungen zeigen erste Möglichkeiten und offene Fragen. Ein verlässliches Aufmaß und erforderliche Untersuchungen klären wir projektbezogen. Eingriffe in Tragwerk und technische Anlagen müssen von geeigneten Fachleuten geprüft werden.' }
        },
        {
          heading: { de: 'Grundrisse, die den Unterschied zeigen' },
          body: { de: 'Beim Umbau einer Villa in der libanesischen Region Chouf stand die Verbindung von Küche, Frühstücksplatz und Wohnräumen im Mittelpunkt. Vier Pläne zeigen dasselbe Erdgeschoss. Auf den Bestands- und den Abbruchplan folgt ein Grundriss mit den neuen Wänden und Öffnungen. Der möblierte Entwurf zeigt, wie die Familie die Räume nutzen kann.' }
        },
        {
          heading: { de: 'Schrittweise zu klaren Unterlagen' },
          body: { de: 'Bevor Sie die weitere Planung beauftragen, legen wir gemeinsam fest, welche Grundrisse, Schnitte und Details Sie benötigen. Dabei klären wir auch den Genehmigungsbedarf, die erforderlichen Fachnachweise und die Zuständigkeiten für Ihr Vorhaben.' }
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
      relatedProjects: ['private-villa-renovation-chouf'],
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
        { h: { de: 'Website und Schriftarten' }, p: { de: 'Die statischen Seiten werden über GitHub Pages bereitgestellt. Beim Abruf erhält der Hostinganbieter technisch erforderliche Verbindungsdaten. Die Website lädt Schriftarten von Google Fonts; dabei stellt der Browser Verbindungen zu Google her.' } },
        { h: { de: 'Optionale Reichweitenmessung' }, p: { de: 'Mit Ihrer Einwilligung zählt das Studio über Cloudflare Seitenaufrufe, Kontaktklicks und erfolgreich übermittelte Anfragen. Die Statistik gruppiert sie nach Sprache, Zugriffsquelle, Seitenkategorie und Zugriff aus Saudi-Arabien oder anderen Regionen. Kontaktdaten, eingegebene Adressen und das deutsche Budgetfreitextfeld werden nicht in die Statistik übertragen. Der Browser speichert Ihre Messauswahl sowie nach Zustimmung Quelle und Einstiegsseitenkategorie für den Tab. Über die Messeinstellungen in der Fußzeile können Sie weitere Messungen jederzeit beenden.' } },
        { h: { de: 'Kontaktformular' }, p: { de: 'Das Formular übermittelt Name, Telefonnummer, E-Mail-Adresse, Standort des Hauses oder Grundstücks, einen gegebenenfalls eingetragenen Google-Maps-Link und das gegebenenfalls eingetragene Budget über FormSubmit an wael.bousmael@gmail.com. Die Angaben dienen der Bearbeitung Ihrer Projektanfrage. Die Datenschutzhinweise und Verarbeitungsbedingungen von FormSubmit sowie die tatsächlichen Speicherfristen sind vor Freigabe zu prüfen und hier zu ergänzen.' } },
        { h: { de: 'WhatsApp und Karten' }, p: { de: 'Die Schaltfläche für das Erstgespräch auf der Startseite öffnet einen leeren WhatsApp-Chat. Andere WhatsApp-Links enthalten einen Nachrichtenvorschlag, den Sie ändern können. Für eine Nachricht wählen Sie diesen Kontaktweg selbst. Das Formular enthält ein Feld für einen Google-Maps-Link; allein das Eintragen eines Links bindet keine Karte ein. Eine technisch vorbereitete Google-Maps-Adressvervollständigung ist ohne API-Schlüssel inaktiv. Bei einer späteren Aktivierung müssen die Datenschutzhinweise vorab angepasst werden.' } },
        { h: { de: 'Gespeicherte Sprache und offene Angaben' }, p: { de: 'Die Website kann Ihre gewählte Sprache lokal im Browser speichern. Es werden dafür keine Analysecookies eingesetzt. Angaben zu Betroffenenrechten, zuständiger Aufsichtsbehörde, Rechtsgrundlagen und Aufbewahrungsdauer müssen anhand der bestätigten Verantwortlichen- und Anbieterangaben vervollständigt werden.' } }
      ]
    }
  ]
};

site.measurement = {
  endpoint: 'https://wbstudio-inquiries.wbstudio2025.workers.dev/event',
  settings: { ar: 'تفضيلات القياس', en: 'Measurement preferences', de: 'Messeinstellungen' },
  question: { ar: 'هل تسمح لنا بقياس استخدام الموقع؟', en: 'May we measure how this site is used?', de: 'Dürfen wir die Nutzung der Website messen?' },
  purpose: {
    ar: 'بموافقتك، نحصي زيارات الصفحات ونقرات التواصل وطلبات الاستشارة لمعرفة كيف يصل إلينا أصحاب المشاريع.',
    en: 'With your permission, we count page views, contact clicks and inquiries to understand how project owners find the studio.',
    de: 'Mit Ihrer Zustimmung zählen wir Seitenaufrufe, Kontaktklicks und Anfragen, um zu verstehen, wie Bauherren das Studio finden.'
  },
  details: { ar: 'ما الذي يُحتسب؟', en: 'What gets counted?', de: 'Welche Angaben werden gezählt?' },
  explanation: {
    ar: 'تجمع خدمة Cloudflare الأعداد اليومية بحسب مصدر الزيارة ونوع الصفحة واللغة، وما إذا كان الاتصال من السعودية. عند إرسال طلب نحصي أيضاً فئة الميزانية بالريال إذا اخترتها. وتبقى بيانات التواصل وموقع المشروع خارج الإحصاءات. يُحفظ اختيارك في هذا المتصفح، ويمكنك تغييره من تذييل الصفحة.',
    en: 'Cloudflare processes daily totals by source, page category, language and whether the connection is from Saudi Arabia. For a submitted inquiry we also count the optional SAR budget band. Contact details and plot locations stay out of these totals. This browser remembers your choice. You can change it in the footer.',
    de: 'Cloudflare verarbeitet Tageszahlen nach Zugriffsquelle, Seitenkategorie, Sprache und danach, ob der Zugriff aus Saudi-Arabien kommt. Kontaktdaten, Grundstücksadressen und freie Budgetangaben bleiben von der Statistik ausgeschlossen. Ihre Auswahl wird in diesem Browser gespeichert und lässt sich in der Fußzeile ändern.'
  },
  allow: { ar: 'أوافق', en: 'Allow', de: 'Erlauben' },
  decline: { ar: 'أرفض', en: 'Decline', de: 'Ablehnen' }
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
