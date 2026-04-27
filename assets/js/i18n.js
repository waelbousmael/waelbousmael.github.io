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
      'hero.title': 'صمّم فيلتك الخاصة بثقة قبل أي التزام',
      'hero.subtitle': 'مكالمة مجانية، ثم تصور مبدئي مجاني، ولا نبدأ أي اتفاق مدفوع إلا بعد وضوح الرؤية والتوافق.',
      'hero.seo': 'خدمة معمارية للبيوت والفلل الخاصة في جدة والسعودية والخليج. نراجع الأرض واحتياجات العائلة والميزانية المتوقعة، ونوضح المخرجات ومسار العمل قبل أي قرار دفع.',
      'hero.whatsapp': 'احجز مكالمة مجانية عبر واتساب',
      'hero.secondary': 'أرسل تفاصيل الأرض',
      'projects.title': 'نماذج من تصميم فلل ومنازل خاصة',
      'authority.name': 'وائل بو سماعيل — معماري',
      'authority.subtitle': 'خبرة في الفلل السكنية الخاصة، مع وضوح في الخطوات والمخرجات قبل الاتفاق المدفوع.',
      'authority.email': 'w.bousmael@wbstudio.xyz',
      'authority.phone': '00966538060383',
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
      'process.step3Note': 'إذا كان الاتجاه مناسباً، ننتقل إلى الاتفاق وبدء التصميم التفصيلي.'
    },
    en: {
      'lang.toggle': 'AR | EN',
      'brand.studio': 'Studio',
      'contact.phone': '00966538060383',
      'hero.title': 'Design your private villa with confidence before any commitment',
      'hero.subtitle': 'A free call, then a free preliminary concept. We only begin a paid agreement after the direction is clear and aligned.',
      'hero.seo': 'Architectural service for private houses and villas in Jeddah, Saudi Arabia, and the GCC. We review the plot, family needs, and expected budget, then clarify the deliverables and workflow before any payment decision.',
      'hero.whatsapp': 'Book a free call on WhatsApp',
      'hero.secondary': 'Send plot details',
      'projects.title': 'Private villa and house design examples',
      'authority.name': 'Wael Bousmael — Architect',
      'authority.subtitle': 'Experience in private residential villas, with clear steps and deliverables before the paid agreement.',
      'authority.email': 'w.bousmael@wbstudio.xyz',
      'authority.phone': '00966538060383',
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
      'process.step3Note': 'If the direction is right, we move into the agreement and detailed design.'
    }
  };

  const seoMeta = {
    ar: {
      title: 'تصميم فلل خاصة في جدة | مهندس معماري | Wael Bousmael',
      description: 'مهندس معماري في جدة السعودية لتقديم تصميم فلل خاصة بتصميم معماري حديث، إشراف دقيق واستشارة مجانية لبدء مشروعك بثقة.',
      locale: 'ar_SA'
    },
    en: {
      title: 'Private Villa Design in Jeddah | Architect | Wael Bousmael',
      description: 'Architect in Jeddah, Saudi Arabia for private villa design, modern architecture, BIM coordination, and a free consultation to start your project.',
      locale: 'en_US'
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
    const isExpanded = bioToggle?.getAttribute('aria-expanded') === 'true';
    if (bioToggle) {
      bioToggle.textContent = isExpanded
        ? dictionary[activeLang]['authority.bioHide']
        : dictionary[activeLang]['authority.bioRead'];
    }

    const whatsappUrl = `https://wa.me/966538060383?text=${encodeURIComponent(waMessage[activeLang])}`;
    whatsappCta.setAttribute('href', whatsappUrl);

    const activeSeo = seoMeta[activeLang] || seoMeta.ar;
    document.title = activeSeo.title;

    const htmlEl = document.documentElement;
    htmlEl.setAttribute('lang', activeLang);
    htmlEl.setAttribute('dir', activeLang === 'ar' ? 'rtl' : 'ltr');

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

  toggle.addEventListener('click', () => {
    const nextLang = html.lang === 'ar' ? 'en' : 'ar';
    applyLanguage(nextLang);
  });

  applyLanguage(localStorage.getItem(storageKey) || 'ar');
})();
