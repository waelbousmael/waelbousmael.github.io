(() => {
  const storageKey = 'wb_lang';
  const html = document.documentElement;
  const toggle = document.getElementById('langToggle');
  const whatsappCta = document.getElementById('whatsappCta');

  if (!toggle || !whatsappCta) return;

  const dictionary = {
    ar: {
      'lang.toggle': 'EN / العربية',
      'hero.title': 'حوّل أرضك إلى فيلا أحلامك — تصميم ذكي وفخم في السعودية.',
      'hero.subtitle': 'استشارة أولية مجانية وتصميم مبدئي قبل أي التزام.',
      'hero.whatsapp': 'احجز استشارة مجانية عبر واتساب',
      'hero.secondary': 'إرسال طلب تصميم',
      'projects.title': 'نماذج من أعمالي',
      'authority.name': 'وائل بو سماعيل — معماري',
      'authority.subtitle': 'خبرة طويلة في تصميم الفلل الفاخرة',
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
      'form.success': 'تم استلام طلبك. سيتم التواصل معك قريباً.',
      'process.title': 'طريقة عملنا',
      'process.step1': 'استشارة مجانية (30 دقيقة عبر Zoom)',
      'process.step2': 'فكرة أولية',
      'process.step2Note': 'يتم عرض الفكرة عبر مكالمة فيديو فقط',
      'process.step3': 'توقيع العقد وبدء التصميم التفصيلي'
    },
    en: {
      'lang.toggle': 'EN / العربية',
      'hero.title': 'Turn your land into a dream villa — smart, luxurious design in Saudi Arabia.',
      'hero.subtitle': 'Free initial consultation and a concept preview before any commitment.',
      'hero.whatsapp': 'Book a free consultation on WhatsApp',
      'hero.secondary': 'Send design request',
      'projects.title': 'Selected Projects',
      'authority.name': 'Wael Bou Smaeil — Architect',
      'authority.subtitle': 'Extensive experience in luxury villa design',
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
      'form.success': 'Your request has been received. We will contact you soon.',
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
