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
      ar: 'عن WB Studio | وائل بو سماعيل — معماري فلل خاصة في جدة',
      en: 'About WB Studio | Wael Bousmael — Private Villa Architect in Jeddah'
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
  },

  // ── Services hub (lists the high-intent landing pages) ──
  services: {
    seoTitle: {
      ar: 'خدمات تصميم الفلل في جدة | WB Studio',
      en: 'Villa Design Services in Jeddah | WB Studio'
    },
    seoDesc: {
      ar: 'خدمات تصميم الفلل الخاصة في جدة: فلل فاخرة، تصميم مودرن، فلل أبحر وشمال جدة، وعمارة حجازية حديثة — مكالمة مجانية وتصور مبدئي مجاني قبل أي اتفاق.',
      en: 'Private villa design services in Jeddah: luxury villas, modern design, Obhur & North Jeddah villas, and modern Hijazi architecture — a free call and preliminary concept before any agreement.'
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
      image: { src: '/assets/projects/byblos-resort/cover.webp', w: 1536, h: 826, alt: { ar: 'فراغ معيشة فاخر مزدوج الارتفاع بإطلالة', en: 'Luxurious double-height living space with a view' } }
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
      related: ['villa-design-jeddah', 'modern-villa-design-jeddah']
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
