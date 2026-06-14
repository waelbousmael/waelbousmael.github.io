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
    approach: { ar: 'النهج', en: 'Approach' },
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
    eyebrow: { ar: 'استوديو عمارة وتصميم داخلي — جدة', en: 'Architecture & interiors studio — Jeddah' },
    h1: {
      ar: 'نصمم فلل ومنازل خاصة في جدة والخليج',
      en: 'We design private villas and homes in Jeddah and the Gulf'
    },
    positioning: {
      ar: 'استوديو معماري متخصص في عمارة الفلل الفاخرة والمنازل الخاصة والتصميم الداخلي — تصميم يقوم على الوضوح والاقتضاب والقيمة طويلة المدى.',
      en: 'An architecture studio focused on luxury private villas, homes and interiors — design shaped by clarity, restraint and long-term value.'
    },
    ctaWhatsapp: { ar: 'احجز مكالمة مجانية عبر واتساب', en: 'Book a free call on WhatsApp' },
    ctaWork: { ar: 'شاهد الأعمال', en: 'View the work' },
    heroImage: {
      src: '/assets/images/home-hero.webp', w: 2000, h: 1125,
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
          ar: 'مراجعة الأرض وأهداف نمط الحياة وتحديد واضح للمنزل الذي تريد العيش فيه.',
          en: 'A review of the plot and lifestyle goals, with a clear definition of the home you want to live in.'
        }
      },
      {
        title: { ar: 'تصور مبدئي مجاني', en: 'Free preliminary concept' },
        text: {
          ar: 'نناقش الاتجاه الأولي عبر مكالمة فيديو قبل أي التزام — فكرة معمارية وأجواء داخلية منسجمة مع أولوياتك.',
          en: 'We discuss the initial direction on a video call before any commitment — an architectural concept and interior atmosphere aligned with your priorities.'
        }
      },
      {
        title: { ar: 'اتفاق مدفوع بعد التوافق فقط', en: 'Paid agreement only after alignment' },
        text: {
          ar: 'إذا كان الاتجاه مناسباً، ننتقل إلى الاتفاق وبدء التصميم التفصيلي — حزمة تصميم تقود الاستشاريين والمقاولين بوضوح.',
          en: 'If the direction is right, we move into the agreement and detailed design — a design package that leads consultants and contractors with clarity.'
        }
      }
    ]
  },

  about: {
    seoTitle: {
      ar: 'عن WB Studio | وائل بو سماعيل — معماري فلل خاصة في جدة',
      en: 'About WB Studio | Wael Bousmael — Private Villa Architect in Jeddah'
    },
    seoDesc: {
      ar: 'تعرف على WB Studio بقيادة وائل بو سماعيل: ممارسة معمارية شخصية لتصميم الفلل والمنازل الخاصة في جدة والسعودية والخليج عبر مسار واضح، حضورياً أو عن بُعد.',
      en: 'Meet WB Studio, led by Wael Bousmael: a personal architecture practice for private villas and homes in Jeddah, Saudi Arabia and the Gulf, with a clear process, in person or remotely.'
    },
    h1: { ar: 'من نحن', en: 'About' },
    intro: {
      ar: 'استوديو معماري شخصي متخصص في الفلل والمنازل الخاصة في جدة والسعودية والخليج — بيوت مدروسة بهوية واضحة، حضورياً أو عن بُعد.',
      en: 'A personal architecture studio dedicated to private villas and homes across Jeddah, Saudi Arabia and the Gulf — considered houses with a clear identity, in person or remotely.'
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
      ar: 'تواصل | احجز مكالمة مجانية لتصميم فيلتك — WB Studio',
      en: 'Contact | Book a Free Villa Design Call — WB Studio'
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
    name: { ar: 'الاسم', en: 'Name' },
    namePh: { ar: 'أدخل اسمك الكامل', en: 'Enter your full name' },
    phone: { ar: 'رقم الهاتف', en: 'Phone Number' },
    phonePh: { ar: 'مثال: +966 5X XXX XXXX', en: 'Example: +966 5X XXX XXXX' },
    email: { ar: 'البريد الإلكتروني', en: 'Email' },
    emailPh: { ar: 'example@email.com', en: 'name@example.com' },
    location: { ar: 'موقع الأرض', en: 'Land Location' },
    locationPh: { ar: 'المدينة أو الحي أو العنوان', en: 'City, district, or address' },
    locationHelper: {
      ar: 'ابدأ بكتابة الموقع لاقتراحات أسرع عند تفعيل خدمة Google Maps.',
      en: 'Start typing to get faster suggestions when Google Maps is enabled.'
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
      ar: 'مصادر وتراخيص الصور المؤقتة المستخدمة في نماذج العرض على موقع WB Studio.',
      en: 'Sources and licenses for the temporary placeholder imagery used in WB Studio’s sample presentations.'
    },
    h1: { ar: 'اعتمادات الصور', en: 'Image credits' },
    intro: {
      ar: 'المشاريع المعروضة في قسم الأعمال دراسات مفاهيمية ونماذج عرض مؤقتة. الصور المستخدمة فيها مراجع أجواء ومواد من مصورين عبر منصة Unsplash، مرخصة بموجب رخصة Unsplash التي تتيح الاستخدام التجاري مجاناً. ستُستبدل هذه الصور تدريجياً بصور أعمال الاستوديو المنفذة.',
      en: 'The projects shown in the Work section are concept studies and temporary sample presentations. Their imagery consists of atmosphere and material references by photographers on Unsplash, licensed under the Unsplash License, which permits free commercial use. These images will be progressively replaced with photography of the studio’s own built work.'
    },
    licenseNote: {
      ar: 'الرخصة: رخصة Unsplash (استخدام تجاري مجاني، لا تتطلب نسب العمل لصاحبه). روابط المصدر أدناه لكل صورة. القائمة الكاملة في ملف assets/licenses/LICENSES.md ضمن مستودع الموقع.',
      en: 'License: the Unsplash License (free commercial use, attribution not required). Source links for every image are listed below. The full register lives in assets/licenses/LICENSES.md in the site repository.'
    },
    sourceLabel: { ar: 'المصدر', en: 'Source' },
    heroLabel: { ar: 'صورة الواجهة الرئيسية', en: 'Homepage hero image' }
  }
};
