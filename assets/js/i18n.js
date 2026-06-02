(() => {
  const storageKey = 'wb_lang';
  const html = document.documentElement;
  const toggles = document.querySelectorAll('[data-lang-toggle]');
  const whatsappCta = document.getElementById('whatsappCta');
  const page = html.dataset.page || 'home';

  if (!toggles.length) return;

  const dictionary = {
    ar: {
      'lang.toggle': 'العربية | EN',
      'brand.studio': 'Studio',
      'contact.phone': '+966 53 806 0383',
      'nav.services': 'الخدمات',
      'nav.work': 'الأعمال',
      'nav.process': 'آلية العمل',
      'nav.about': 'من نحن',
      'nav.contact': 'تواصل',
      'nav.faq': 'الأسئلة الشائعة',
      'nav.cta': 'اجتماع فيديو مجاني',
      'hero.title': 'صمّم فيلتك الخاصة بثقة قبل أي التزام',
      'hero.subtitle': 'مكالمة مجانية، ثم تصور مبدئي مجاني، ولا نبدأ أي اتفاق مدفوع إلا بعد وضوح الرؤية والتوافق.',
      'hero.seo': 'خدمة معمارية للبيوت والفلل الخاصة في جدة والسعودية والخليج. نراجع الأرض واحتياجات العائلة والميزانية المتوقعة، ونوضح المخرجات ومسار العمل قبل أي قرار دفع.',
      'hero.whatsapp': 'احجز مكالمة مجانية عبر واتساب',
      'hero.secondary': 'أرسل تفاصيل الأرض',
      'projects.title': 'نماذج من تصميم فلل ومنازل خاصة',
      'authority.name': 'وائل بو سماعيل — معماري',
      'authority.subtitle': 'خبرة في الفلل السكنية الخاصة، مع وضوح في الخطوات والمخرجات قبل الاتفاق المدفوع.',
      'authority.email': 'w.bousmael@wbstudio.xyz',
      'authority.phone': '+966 53 806 0383',
      'authority.bioRead': 'قراءة النبذة',
      'authority.bioHide': 'إخفاء النبذة',
      'authority.bioText': 'وائل بو سماعيل معماري ومنسق BIM بخبرة تتجاوز 12 عامًا في تصميم الفلل السكنية الفاخرة. يقود المشروع من الفكرة الأولى حتى مخططات التنفيذ (IFC)، مع تنسيق كامل بين المعماري والإنشائي والميكانيكي لضمان جودة التنفيذ وتقليل التعارضات. عمل على مشاريع في ألمانيا ولبنان والسعودية، ويركّز على تحويل الرؤية التصميمية إلى نتائج قابلة للبناء بكفاءة ووضوح.',
      'close.title': 'جاهز لمراجعة أرضك؟',
      'close.cta': 'أرسل تفاصيل الأرض',
      'form.title': 'أرسل تفاصيل الأرض لطلب مكالمة مجانية',
      'form.subtitle': 'شارك موقع الأرض والميزانية التقريبية. سنراجع التفاصيل ونعود إليك خلال يومين عمل لتحديد الخطوة الأنسب.',
      'form.name': 'الاسم',
      'form.name.placeholder': 'أدخل اسمك الكامل',
      'form.phone': 'رقم الهاتف',
      'form.phone.placeholder': 'مثال: +966 5X XXX XXXX',
      'form.email': 'البريد الإلكتروني',
      'form.email.placeholder': 'example@email.com',
      'form.location': 'موقع الأرض',
      'form.location.placeholder': 'المدينة أو الحي أو العنوان',
      'form.location.helper': 'ابدأ بكتابة الموقع لاقتراحات أسرع عند تفعيل خدمة Google Maps.',
      'form.maps': 'رابط Google Maps',
      'form.maps.placeholder': 'https://maps.google.com/...',
      'form.budget': 'الميزانية التقريبية',
      'form.budget.placeholder': 'اختياري',
      'form.budget.1': 'أقل من 1 مليون ريال',
      'form.budget.2': '1 إلى 2 مليون ريال',
      'form.budget.3': '2 إلى 4 مليون ريال',
      'form.budget.4': 'أكثر من 4 مليون ريال',
      'form.submit': 'أرسل تفاصيل الأرض',
      'form.success': 'تم إرسال طلبك بنجاح. سنعاود التواصل معك خلال يومين عمل.',
      'form.error': 'تعذر إرسال الطلب حالياً. الرجاء المحاولة مرة أخرى.',
      'process.title': 'مسار تصميم الفيلا قبل الاتفاق المدفوع',
      'process.step1': 'مكالمة مجانية لمراجعة الأرض',
      'process.step2': 'تصور مبدئي مجاني',
      'process.step2Note': 'نناقش الاتجاه الأولي عبر مكالمة فيديو قبل أي التزام.',
      'process.step3': 'اتفاق مدفوع بعد التوافق فقط',
      'process.step3Note': 'إذا كان الاتجاه مناسباً، ننتقل إلى الاتفاق وبدء التصميم التفصيلي.',
      'about.eyebrow': 'من نحن',
      'about.title': 'WB Studio — تصميم فلل خاصة بمسار واضح',
      'about.intro1': 'استوديو معماري متخصص في الفلل والمنازل الخاصة في جدة والسعودية والخليج — بيوت مدروسة بهوية واضحة، حضورياً أو عن بُعد.',
      'about.intro2': 'عملية هادئة وشفافة من أول رسم حتى التصميم النهائي، مع ممارسات صديقة للبيئة في صميم كل قرار.',
      'about.ctaPrimary': 'اطلب اجتماع فيديو مجاني',
      'about.ctaSecondary': 'ابدأ طلب مشروعك',
      'about.offerTitle': 'ماذا نقدم',
      'about.offerLead': 'توجيه تصميمي متكامل من الفكرة إلى التصميم لمنازل خاصة فاخرة، بما يناسب أرضك وأسلوب حياتك ورؤيتك طويلة المدى.',
      'about.card1Title': 'الفكرة المعمارية',
      'about.card1a': 'دراسات الكتل المبكرة وسيناريوهات الفراغ التي تشكّل هوية المنزل.',
      'about.card1b': 'لغة معمارية واضحة ونِسب مدروسة واستجابة دقيقة للموقع.',
      'about.card2Title': 'التوجه الداخلي',
      'about.card2a': 'تسلسل الغرف وأجواء المواد وتوظيف الإضاءة الطبيعية.',
      'about.card2b': 'قرارات تصميمية تحافظ على تجربة متناسقة ومتكاملة.',
      'about.card3Title': 'تصميم جاهز للتنفيذ',
      'about.card3a': 'مخرجات واضحة توحّد فهم الاستشاريين والمقاولين.',
      'about.card3b': 'توجيه تصميمي يحافظ على الرؤية الأصلية للمشروع.',
      'about.card4Title': 'توجه صديق للبيئة',
      'about.card4a': 'حلول تصميم سلبية تقلّل الأحمال الطاقية من المراحل المبكرة.',
      'about.card4b': 'إرشادات مواد متينة ومنخفضة الأثر لقيمة طويلة المدى.',
      'about.howTitle': 'كيف نعمل',
      'about.howLead': 'مسار واضح من ثلاث خطوات يحافظ على هدوء القرارات واستمرار التقدم.',
      'about.step1Title': 'الاحتياج والرؤية',
      'about.step1Text': 'مراجعة الأرض وأهداف نمط الحياة وتحديد واضح للمنزل الذي تريد العيش فيه.',
      'about.step2Title': 'التوجه المفاهيمي',
      'about.step2Text': 'فكرة معمارية وأجواء داخلية منسجمة مع أولوياتك.',
      'about.step3Title': 'حزمة التصميم',
      'about.step3Text': 'توجيه تصميمي جاهز للتنفيذ يقود الاستشاريين والمقاولين بوضوح.',
      'about.teamTitle': 'النهج',
      'about.teamText': 'ممارسة معمارية مركّزة تمنح كل مشروع اهتماماً مباشراً وقيادة تصميمية متّسقة، مع شركاء موثوقين عند الحاجة.',
      'about.readyTitle': 'جاهز للبدء؟',
      'about.readyText': 'انتقل من الفكرة إلى توجه تصميمي واضح عبر عملية مركزة وخاصة.',
      'about.readyCta': 'ابدأ طلب مشروعك',
      'footer.tagline': 'تصميم فلل ومنازل خاصة في جدة والسعودية والخليج، بمسار واضح من المكالمة الأولى حتى التصميم التفصيلي.',
      'footer.explore': 'تصفّح',
      'footer.contactTitle': 'تواصل',
      'footer.whatsapp': 'واتساب',
      'footer.rights': 'جميع الحقوق محفوظة.',
      'faq.title': 'أسئلة شائعة عن تصميم الفلل الخاصة',
      'faq.q1': 'كم تكلفة تصميم فيلا خاصة؟',
      'faq.a1': 'تعتمد التكلفة على مساحة الأرض ونطاق العمل والمخرجات المطلوبة. نبدأ دائماً بمكالمة مجانية وتصور مبدئي مجاني، ونوضح التكلفة والمسار بالكامل قبل أي اتفاق مدفوع.',
      'faq.q2': 'هل تقدمون تصميم الفلل عن بُعد خارج جدة؟',
      'faq.a2': 'نعم. نخدم عملاء جدة والسعودية ودول الخليج حضورياً أو عن بُعد عبر مكالمات الفيديو ومشاركة المخططات، مع الحفاظ على نفس الوضوح في كل خطوة.',
      'faq.q3': 'ما المخرجات التي أحصل عليها؟',
      'faq.a3': 'من الفكرة المعمارية والتوجه الداخلي حتى تصميم جاهز للتنفيذ يوحّد فهم الاستشاريين والمقاولين ويحافظ على الرؤية الأصلية للمشروع.',
      'faq.q4': 'كم تستغرق مدة تصميم الفيلا؟',
      'faq.a4': 'تختلف المدة حسب حجم المشروع وتعقيده. نوضح الجدول الزمني المتوقع ضمن التصور المبدئي قبل بدء أي عمل مدفوع.',
      'faq.q5': 'متى يبدأ الدفع؟',
      'faq.a5': 'المكالمة الأولى والتصور المبدئي مجانيان تماماً، ولا يبدأ أي اتفاق مدفوع إلا بعد وضوح الرؤية والتوافق على الاتجاه.'
    },
    en: {
      'lang.toggle': 'AR | EN',
      'brand.studio': 'Studio',
      'contact.phone': '+966 53 806 0383',
      'nav.services': 'Services',
      'nav.work': 'Work',
      'nav.process': 'Process',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'nav.faq': 'FAQ',
      'nav.cta': 'Free video meeting',
      'hero.title': 'Design your private villa with confidence before any commitment',
      'hero.subtitle': 'A free call, then a free preliminary concept. We only begin a paid agreement after the direction is clear and aligned.',
      'hero.seo': 'Architectural service for private houses and villas in Jeddah, Saudi Arabia, and the GCC. We review the plot, family needs, and expected budget, then clarify the deliverables and workflow before any payment decision.',
      'hero.whatsapp': 'Book a free call on WhatsApp',
      'hero.secondary': 'Send plot details',
      'projects.title': 'Private villa and house design examples',
      'authority.name': 'Wael Bousmael — Architect',
      'authority.subtitle': 'Experience in private residential villas, with clear steps and deliverables before the paid agreement.',
      'authority.email': 'w.bousmael@wbstudio.xyz',
      'authority.phone': '+966 53 806 0383',
      'authority.bioRead': 'Read Full Bio',
      'authority.bioHide': 'Hide Bio',
      'authority.bioText': 'Wael Bousmael is an architect and BIM coordinator with 12+ years of experience in luxury residential villas. He leads projects from early concept to IFC documentation, coordinating architectural, structural, and MEP disciplines to ensure build quality and minimize clashes. He has delivered projects in Germany, Lebanon, and Saudi Arabia, with a clear focus on turning strong design ideas into efficient, buildable outcomes.',
      'close.title': 'Ready to review your plot?',
      'close.cta': 'Send plot details',
      'form.title': 'Send plot details to request a free call',
      'form.subtitle': 'Share the plot location and estimated budget. We will review the details and get back to you within two business days to define the right next step.',
      'form.name': 'Name',
      'form.name.placeholder': 'Enter your full name',
      'form.phone': 'Phone Number',
      'form.phone.placeholder': 'Example: +966 5X XXX XXXX',
      'form.email': 'Email',
      'form.email.placeholder': 'name@example.com',
      'form.location': 'Land Location',
      'form.location.placeholder': 'City, district, or address',
      'form.location.helper': 'Start typing to get faster suggestions when Google Maps is enabled.',
      'form.maps': 'Google Maps Link',
      'form.maps.placeholder': 'https://maps.google.com/...',
      'form.budget': 'Estimated Budget',
      'form.budget.placeholder': 'Optional',
      'form.budget.1': 'Below SAR 1M',
      'form.budget.2': 'SAR 1M to 2M',
      'form.budget.3': 'SAR 2M to 4M',
      'form.budget.4': 'Above SAR 4M',
      'form.submit': 'Send plot details',
      'form.success': 'Your request was sent successfully. We will get back to you within two business days.',
      'form.error': 'We could not submit your request right now. Please try again.',
      'process.title': 'Villa design path before the paid agreement',
      'process.step1': 'Free call to review the plot',
      'process.step2': 'Free preliminary concept',
      'process.step2Note': 'We discuss the initial direction on a video call before any commitment.',
      'process.step3': 'Paid agreement only after alignment',
      'process.step3Note': 'If the direction is right, we move into the agreement and detailed design.',
      'about.eyebrow': 'About',
      'about.title': 'WB Studio — private villa design with a clear path',
      'about.intro1': 'An architecture studio dedicated to private villas and homes across Jeddah, Saudi Arabia, and the Gulf — considered houses with a clear identity, in person or remotely.',
      'about.intro2': 'A calm, transparent process from the first sketch to the final design — with eco-conscious practice at the core of every decision.',
      'about.ctaPrimary': 'Request a free video meeting',
      'about.ctaSecondary': 'Start your project request',
      'about.offerTitle': 'What we offer',
      'about.offerLead': 'End-to-end design guidance, from concept to design, for luxury private homes — tailored to your plot, lifestyle, and long-term vision.',
      'about.card1Title': 'Architectural concept',
      'about.card1a': 'Early massing studies and spatial scenarios that shape the home’s identity.',
      'about.card1b': 'A clear architectural language, considered proportions, and a precise response to the site.',
      'about.card2Title': 'Interior direction',
      'about.card2a': 'Room sequencing, material atmosphere, and the use of natural light.',
      'about.card2b': 'Design decisions that keep the experience coherent and integrated.',
      'about.card3Title': 'Build-ready design',
      'about.card3a': 'Clear deliverables that align consultants and contractors.',
      'about.card3b': 'Design guidance that protects the project’s original vision.',
      'about.card4Title': 'Eco-friendly direction',
      'about.card4a': 'Passive design solutions that reduce energy loads from the earliest stages.',
      'about.card4b': 'Guidance on durable, low-impact materials for long-term value.',
      'about.howTitle': 'How we work',
      'about.howLead': 'A clear three-step path that keeps decisions calm and progress steady.',
      'about.step1Title': 'Needs and vision',
      'about.step1Text': 'A review of the plot and lifestyle goals, with a clear definition of the home you want to live in.',
      'about.step2Title': 'Conceptual direction',
      'about.step2Text': 'An architectural concept and interior atmosphere aligned with your priorities.',
      'about.step3Title': 'Design package',
      'about.step3Text': 'Build-ready design guidance that leads consultants and contractors with clarity.',
      'about.teamTitle': 'Our approach',
      'about.teamText': 'A focused architectural practice that gives every project direct attention and consistent design leadership, with trusted partners brought in when needed.',
      'about.readyTitle': 'Ready to start?',
      'about.readyText': 'Move from an idea to a clear design direction through a focused, private process.',
      'about.readyCta': 'Start your project request',
      'footer.tagline': 'Private villa and home design across Jeddah, Saudi Arabia, and the Gulf — a clear path from the first call to detailed design.',
      'footer.explore': 'Explore',
      'footer.contactTitle': 'Contact',
      'footer.whatsapp': 'WhatsApp',
      'footer.rights': 'All rights reserved.',
      'faq.title': 'Frequently asked questions about private villa design',
      'faq.q1': 'How much does private villa design cost?',
      'faq.a1': 'Cost depends on the plot size, scope of work, and required deliverables. We always start with a free call and a free preliminary concept, and clarify the full cost and path before any paid agreement.',
      'faq.q2': 'Do you design villas remotely outside Jeddah?',
      'faq.a2': 'Yes. We serve clients in Jeddah, Saudi Arabia, and the Gulf in person or remotely via video calls and shared drawings, keeping the same clarity at every step.',
      'faq.q3': 'What deliverables do I get?',
      'faq.a3': 'From the architectural concept and interior direction through to build-ready design that aligns consultants and contractors and protects the project’s original vision.',
      'faq.q4': 'How long does villa design take?',
      'faq.a4': 'It varies with the size and complexity of the project. We outline the expected timeline within the preliminary concept before any paid work begins.',
      'faq.q5': 'When does payment start?',
      'faq.a5': 'The first call and preliminary concept are completely free; a paid agreement only begins after the vision is clear and the direction is agreed.'
    }
  };

  const pageSeo = {
    home: {
      ar: {
        title: 'تصميم فلل ومنازل خاصة في جدة والخليج | Wael Bousmael',
        description: 'مهندس معماري لتصميم الفلل والمنازل الخاصة في جدة والسعودية والخليج. مكالمة مجانية، تصور مبدئي مجاني، واتفاق مدفوع فقط بعد وضوح الرؤية والتوافق.',
        locale: 'ar_SA'
      },
      en: {
        title: 'Private Villa & Home Design in Jeddah & the Gulf | Wael Bousmael',
        description: 'Architect for private villas and homes in Jeddah, Saudi Arabia, and the Gulf. A free call, a free preliminary concept, and a paid agreement only after the vision is clear and aligned.',
        locale: 'en_US'
      }
    },
    about: {
      ar: {
        title: 'عن WB Studio | تصميم فلل خاصة في جدة والسعودية والخليج',
        description: 'تعرّف على WB Studio بقيادة وائل بو سماعيل: خدمة معمارية لتصميم الفلل والمنازل الخاصة في جدة والسعودية والخليج عبر مسار واضح وعن بعد عند الحاجة.',
        locale: 'ar_SA'
      },
      en: {
        title: 'About WB Studio | Private Villa & Home Design in Jeddah & the Gulf',
        description: 'Meet WB Studio, led by Wael Bousmael: an architectural service for private villas and homes in Jeddah, Saudi Arabia, and the Gulf, with a clear process and remote collaboration when needed.',
        locale: 'en_US'
      }
    }
  };

  const waMessage = {
    ar: 'السلام عليكم، أرغب في حجز استشارة لتصميم فيلا. هذه تفاصيل أرضي:\n• الاسم:\n• موقع الأرض:\n• المساحة:\n• الميزانية التقريبية:',
    en: 'Hello, I would like to book a consultation for a villa design. Here are my land details:\n• Name:\n• Land location:\n• Area:\n• Estimated budget:'
  };

  const applyLanguage = (lang) => {
    const activeLang = dictionary[lang] ? lang : 'ar';
    html.lang = activeLang;
    html.dir = activeLang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const key = node.dataset.i18n;
      if (dictionary[activeLang][key]) {
        node.textContent = dictionary[activeLang][key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
      const key = node.dataset.i18nPlaceholder;
      if (dictionary[activeLang][key]) {
        node.setAttribute('placeholder', dictionary[activeLang][key]);
      }
    });

    const feedback = document.getElementById('formFeedback');
    if (feedback?.classList.contains('visible')) {
      const messageKey = feedback.dataset.state === 'error' ? 'form.error' : 'form.success';
      feedback.textContent = dictionary[activeLang][messageKey];
    }

    const bioToggle = document.getElementById('bioToggle');
    if (bioToggle) {
      const isExpanded = bioToggle.getAttribute('aria-expanded') === 'true';
      bioToggle.textContent = isExpanded
        ? dictionary[activeLang]['authority.bioHide']
        : dictionary[activeLang]['authority.bioRead'];
    }

    if (whatsappCta) {
      const whatsappUrl = `https://wa.me/966538060383?text=${encodeURIComponent(waMessage[activeLang])}`;
      whatsappCta.setAttribute('href', whatsappUrl);
    }

    const seoSet = pageSeo[page] || pageSeo.home;
    const activeSeo = seoSet[activeLang] || seoSet.ar;
    document.title = activeSeo.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');

    if (metaDescription) metaDescription.setAttribute('content', activeSeo.description);
    if (ogTitle) ogTitle.setAttribute('content', activeSeo.title);
    if (ogDescription) ogDescription.setAttribute('content', activeSeo.description);
    if (ogLocale) ogLocale.setAttribute('content', activeSeo.locale);
    if (twitterTitle) twitterTitle.setAttribute('content', activeSeo.title);
    if (twitterDescription) twitterDescription.setAttribute('content', activeSeo.description);

    localStorage.setItem(storageKey, activeLang);
  };

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const nextLang = html.lang === 'ar' ? 'en' : 'ar';
      applyLanguage(nextLang);
    });
  });

  applyLanguage(localStorage.getItem(storageKey) || 'ar');
})();
