(() => {
  const storageKey = 'wb_lang';
  const html = document.documentElement;
  const toggle = document.getElementById('langToggle');
  const whatsappCta = document.getElementById('whatsappCta');

  if (!toggle || !whatsappCta) return;

  const dictionary = {
    ar: {
      'lang.toggle': 'العربية | EN',
      'brand.studio': 'Studio',
      'contact.phone': '00966538060383',
      'hero.title': 'حوّل أرضك إلى فيلا أحلامك',
      'hero.subtitle': 'استشارة أولية مجانية وتصميم مبدئي قبل أي التزام.',
      'hero.whatsapp': 'احجز استشارة مجانية عبر واتساب',
      'hero.secondary': 'إرسال طلب تصميم',
      'projects.title': 'نماذج من أعمالي',
      'authority.name': 'وائل بو سماعيل — معماري',
      'authority.subtitle': 'خبرة طويلة في تصميم الفلل الفاخرة',
      'authority.email': 'Email: w.bousmael@wbstudio.xyz',
      'authority.phone': 'Phone: 00966538060383',
      'authority.bioRead': 'Read Full Bio',
      'authority.bioHide': 'Hide Bio',
      'authority.bioText': 'Wael Bousmael is an Architect and BIM & Design Coordinator with over 12 years of experience delivering premium private residential projects. He manages the full process from early concept development to IFC documentation, ensuring each phase is clear, coordinated, and construction-ready. His scope includes authority submissions, multidisciplinary BIM coordination across architecture, MEP, and structural teams, and preparation of contractor-ready packages backed by accurate as-built documentation. His international project experience spans Berlin and Hamburg in Germany, Beirut in Lebanon, and luxury villa developments in Jeddah, Saudi Arabia. Across these contexts, he combines design intent with technical discipline to maintain quality, schedule alignment, and execution clarity. He works closely with consultants, specialists, and site teams to reduce clashes early, protect design quality, and support efficient decision-making throughout delivery. He works fluently with Archicad, Revit, AutoCAD, Lumion, Twinmotion, and Bluebeam, selecting the right tools to support efficient workflows and reliable deliverables. Known for a strong execution and coordination mindset, he focuses on translating refined design visions into buildable outcomes that meet the expectations of premium residential clients and their construction teams, from first brief to final handover.',
      'close.title': 'مساحة تعيش فيها كما تحلم.',
      'close.cta': 'ابدأ الآن',
      'form.title': 'اطلب عرض تصميم',
      'form.name': 'الاسم',
      'form.phone': 'رقم الهاتف',
      'form.email': 'البريد الإلكتروني',
      'form.location': 'موقع الأرض',
      'form.maps': 'رابط Google Maps',
      'form.budget': 'الميزانية التقريبية',
      'form.budget.placeholder': 'اختياري',
      'form.budget.1': 'أقل من 1 مليون ريال',
      'form.budget.2': '1 إلى 2 مليون ريال',
      'form.budget.3': '2 إلى 4 مليون ريال',
      'form.budget.4': 'أكثر من 4 مليون ريال',
      'form.submit': 'إرسال الطلب',
      'form.note': 'بتعبئة النموذج، سيتم إرسال رسالة تأكيد تلقائية إلى بريدك الإلكتروني.',
      'form.success': 'تم استلام طلبك. شكراً لك.',
      'process.title': 'طريقة عملنا',
      'process.step1': 'استشارة مجانية (30 دقيقة عبر Zoom)',
      'process.step2': 'فكرة أولية',
      'process.step2Note': 'يتم عرض الفكرة عبر مكالمة فيديو فقط',
      'process.step3': 'توقيع العقد وبدء التصميم التفصيلي'
    },
    en: {
      'lang.toggle': 'AR | EN',
      'brand.studio': 'Studio',
      'contact.phone': '00966538060383',
      'hero.title': 'Turn your land into a dream villa.',
      'hero.subtitle': 'Free initial consultation and a concept preview before any commitment.',
      'hero.whatsapp': 'Book a free consultation on WhatsApp',
      'hero.secondary': 'Send design request',
      'projects.title': 'Selected Projects',
      'authority.name': 'Wael Bousmael — Architect',
      'authority.subtitle': 'Extensive experience in luxury villa design',
      'authority.email': 'Email: w.bousmael@wbstudio.xyz',
      'authority.phone': 'Phone: 00966538060383',
      'authority.bioRead': 'Read Full Bio',
      'authority.bioHide': 'Hide Bio',
      'authority.bioText': 'Wael Bousmael is an Architect and BIM & Design Coordinator with over 12 years of experience delivering premium private residential projects. He manages the full process from early concept development to IFC documentation, ensuring each phase is clear, coordinated, and construction-ready. His scope includes authority submissions, multidisciplinary BIM coordination across architecture, MEP, and structural teams, and preparation of contractor-ready packages backed by accurate as-built documentation. His international project experience spans Berlin and Hamburg in Germany, Beirut in Lebanon, and luxury villa developments in Jeddah, Saudi Arabia. Across these contexts, he combines design intent with technical discipline to maintain quality, schedule alignment, and execution clarity. He works closely with consultants, specialists, and site teams to reduce clashes early, protect design quality, and support efficient decision-making throughout delivery. He works fluently with Archicad, Revit, AutoCAD, Lumion, Twinmotion, and Bluebeam, selecting the right tools to support efficient workflows and reliable deliverables. Known for a strong execution and coordination mindset, he focuses on translating refined design visions into buildable outcomes that meet the expectations of premium residential clients and their construction teams, from first brief to final handover.',
      'close.title': 'A space to live exactly as you dream.',
      'close.cta': 'Start now',
      'form.title': 'Request a Design Proposal',
      'form.name': 'Name',
      'form.phone': 'Phone Number',
      'form.email': 'Email',
      'form.location': 'Land Location',
      'form.maps': 'Google Maps Link',
      'form.budget': 'Estimated Budget',
      'form.budget.placeholder': 'Optional',
      'form.budget.1': 'Below SAR 1M',
      'form.budget.2': 'SAR 1M to 2M',
      'form.budget.3': 'SAR 2M to 4M',
      'form.budget.4': 'Above SAR 4M',
      'form.submit': 'Submit Request',
      'form.note': 'After submission, an automatic confirmation email is sent to your inbox.',
      'form.success': 'Your request has been received. Thank you.',
      'process.title': 'Our Process',
      'process.step1': 'Free consultation (30 minutes via Zoom)',
      'process.step2': 'Initial concept',
      'process.step2Note': 'Concept is presented through a video call only',
      'process.step3': 'Contract signing and detailed design start'
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

    const bioToggle = document.getElementById('bioToggle');
    const isExpanded = bioToggle?.getAttribute('aria-expanded') === 'true';
    if (bioToggle) {
      bioToggle.textContent = isExpanded
        ? dictionary[activeLang]['authority.bioHide']
        : dictionary[activeLang]['authority.bioRead'];
    }

    const whatsappUrl = `https://wa.me/966538060383?text=${encodeURIComponent(waMessage[activeLang])}`;
    whatsappCta.setAttribute('href', whatsappUrl);

    localStorage.setItem(storageKey, activeLang);
  };

  toggle.addEventListener('click', () => {
    const nextLang = html.lang === 'ar' ? 'en' : 'ar';
    applyLanguage(nextLang);
  });

  applyLanguage(localStorage.getItem(storageKey) || 'ar');
})();
