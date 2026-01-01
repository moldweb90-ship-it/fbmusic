import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Music, Zap, Heart, Mic, QrCode, Send, Smartphone, Disc, X, Phone, MessageCircle, Globe, Feather, Star, ChevronDown, ChevronUp, CheckCircle, ShieldCheck, Clock, Smile, ArrowRight } from 'lucide-react';

const FlowerBoxLanding = () => {
  const [lang, setLang] = useState('ru'); // 'ru' or 'ro'
  const [isPlaying, setIsPlaying] = useState(null);
  const [isMagicPlaying, setIsMagicPlaying] = useState(false); // State for the "Magic" section player
  const [isPushkinPlaying, setIsPushkinPlaying] = useState(false); // State for Pushkin player
  const [openFaq, setOpenFaq] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentReview, setCurrentReview] = useState(0); // For reviews carousel
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const pushkinAudioRef = useRef(null); // Audio ref for Pushkin section
  const magicAudioRef = useRef(null); // Audio ref for Magic section

  // Detect scroll for floating button appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize Pushkin audio
  useEffect(() => {
    pushkinAudioRef.current = new Audio('/music/classica/Я вас любил.mp3');
    pushkinAudioRef.current.preload = 'auto';
    
    const handleEnded = () => {
      setIsPushkinPlaying(false);
    };
    
    if (pushkinAudioRef.current) {
      pushkinAudioRef.current.addEventListener('ended', handleEnded);
    }
    
    return () => {
      if (pushkinAudioRef.current) {
        pushkinAudioRef.current.removeEventListener('ended', handleEnded);
        pushkinAudioRef.current.pause();
        pushkinAudioRef.current = null;
      }
    };
  }, []);

  // Control Pushkin audio playback
  useEffect(() => {
    if (pushkinAudioRef.current) {
      if (isPushkinPlaying) {
        pushkinAudioRef.current.play().catch(error => {
          console.error('Error playing Pushkin audio:', error);
        });
      } else {
        pushkinAudioRef.current.pause();
      }
    }
  }, [isPushkinPlaying]);

  // Initialize Magic audio
  useEffect(() => {
    magicAudioRef.current = new Audio('/music/magia/25 тебе Анюта.mp3');
    magicAudioRef.current.preload = 'auto';
    
    const handleEnded = () => {
      setIsMagicPlaying(false);
    };
    
    if (magicAudioRef.current) {
      magicAudioRef.current.addEventListener('ended', handleEnded);
    }
    
    return () => {
      if (magicAudioRef.current) {
        magicAudioRef.current.removeEventListener('ended', handleEnded);
        magicAudioRef.current.pause();
        magicAudioRef.current = null;
      }
    };
  }, []);

  // Control Magic audio playback
  useEffect(() => {
    if (magicAudioRef.current) {
      if (isMagicPlaying) {
        magicAudioRef.current.play().catch(error => {
          console.error('Error playing Magic audio:', error);
        });
      } else {
        magicAudioRef.current.pause();
      }
    }
  }, [isMagicPlaying]);

  
  const [formData, setFormData] = useState({
    type: 'song',
    name: '',
    phone: '',
    telegram: '',
    recipient: '',
    style: '',
    customStyle: '',
    mood: '',
    story: ''
  });

  // Data Lists
  const stylesList = [
    { id: 'Pop', ru: 'Поп-музыка', ro: 'Pop' },
    { id: 'HipHop', ru: 'Хип-хоп / Рэп', ro: 'Hip-Hop / Rap' },
    { id: 'Chanson', ru: 'Шансон', ro: 'Șanson' },
    { id: 'Rock', ru: 'Рок', ro: 'Rock' },
    { id: 'RnB', ru: 'R&B / Соул', ro: 'R&B / Soul' },
    { id: 'Jazz', ru: 'Джаз', ro: 'Jazz' },
    { id: 'Classic', ru: 'Классика', ro: 'Clasică' },
    { id: 'Custom', ru: 'Свой вариант...', ro: 'Alt stil...' }
  ];

  const moodsList = [
    { id: 'Romantic', ru: 'Романтичное ❤️', ro: 'Romantic ❤️' },
    { id: 'Touching', ru: 'Трогательное (до слез) 🥺', ro: 'Emoționant (lacrimi) 🥺' },
    { id: 'Fun', ru: 'Веселое / Драйв 🔥', ro: 'Vesel / Drive 🔥' },
    { id: 'Funny', ru: 'С приколом / Смешное 😂', ro: 'Amuzant / Funny 😂' },
    { id: 'Epic', ru: 'Эпичное / Торжественное 🌟', ro: 'Epic / Solemn 🌟' }
  ];

  // Translations
  const t = {
    ru: {
      brandSub: "Audio Production",
      btnOrder: "ХОЧУ ТРЕК",
      location: "Кишинев / Only Top Vibes",
      heroTitle1: "ЗАБЕЙ НА",
      heroTitle2: "ОТКРЫТКИ",
      heroDesc: <>Дари эмоции, а не картон. Персональный <span className="text-white font-bold">ТРЕК</span> или <span className="text-white font-bold">СТИХ</span> к букету. <br/> Цены от <span className="text-white font-bold bg-brand px-3 py-1 rounded-full neon-box">500 MDL</span>.</>,
      btnMain: "ЗАКАЗАТЬ ВАЙБ",
      readyTime: "Готовность 1-2 часа",
      marquee: "FLOWER BOX • МУЗЫКА И СТИХИ • ТЕКСТ ПИШЕМ МЫ • КИШИНЕВ • БУКЕТ + АУДИО = РАЗРЫВ СЕРДЕЧКА •",
      scanTitle: "SCAN & LISTEN",
      scanDesc: "Flower Box Production",
      whatTitle1: "ЧЕ ЗА",
      whatTitle2: "ДВИЖ?",
      whatText1: (brand) => <>Ты заказал цветы в <span className="text-white font-bold">{brand}</span>? Красавчик. Теперь добавь к ним душу.</>,
      whatText2: "ВАЖНО: Слова, смысл и рифму делаем МЫ. Ты просто выбираешь стиль музыки и накидываешь факты о человеке.",
      whatText3: "В букете будет открытка с QR-кодом. Один скан — и звучит профессиональный трек про ВАШИ моменты.",
      examplesTitle: "ЗАЦЕНИ",
      examplesTitle2: "ЗВУК",
      examplesDesc: "Песни и авторские стихи под музыку",
      pushkinTitle: "ВЕЧНАЯ",
      pushkinTitle2: "КЛАССИКА",
      pushkinDesc: "Мы можем озвучить великие строки или написать стих в стиле Золотого века специально для вас.",
      stepsTitle: "ЭТАПЫ",
      stepsTitle2: "СОЗДАНИЯ",
      step1: "Факты",
      step1Desc: "Пишешь: кому, стиль и пару фактов из жизни.",
      step2: "Продакшн",
      step2Desc: "Мы пишем текст, голос и сводим с музыкой.",
      step3: "Упаковка",
      step3Desc: "Печатаем QR-код на премиум открытке.",
      step4: "Вручение",
      step4Desc: "Курьер везет цветы + эмоции.",
      magicTitle: "МАГИЯ",
      magicTitle2: "ТЕКСТА",
      magicDesc: "Как мы превращаем ваши слова в искусство",
      beforeLabel: "ВЫ ПИШЕТЕ (ФАКТЫ):",
      beforeText: "«Зовут Аня, ей 25 лет. Любит собак корги. Мы познакомились, когда шел сильный дождь, в кофейне на Рышкановке. Хочу сказать, что люблю её улыбку.»",
      afterLabel: "МЫ ДЕЛАЕМ (ХИТ):",
      afterText: <>Двадцать пять тебе, Анюта,<br/>В этот день пускай салюты...<br/>Помнишь дождь и ту кофейню?<br/>Ты — мой луч, мое спасение...</>,
      listenResult: "Слушать результат",
      reviewsTitle: "ЭМОЦИИ",
      reviewsTitle2: "КЛИЕНТОВ",
      reviewsDesc: "Реакции людей, которые получили такой подарок",
      faqTitle: "ЧАСТЫЕ",
      faqTitle2: "ВОПРОСЫ",
      formTitle: "СОЗДАЙ",
      formTitle2: "ХИТ",
      formDesc: "Заполни анкету. Текст и музыку берем на себя.",
      labelType: "Что записываем?",
      typeSong: "Персональная Песня",
      typePoem: "Музыкальный Стих",
      labelName: "Твое Имя",
      labelPhone: "Телефон",
      labelContact: "Telegram / Почта",
      labelRecipient: "Для кого?",
      labelStyle: "Стиль Музыки",
      labelCustomStyle: "Напиши свой стиль:",
      labelMood: "Настроение / Вайб",
      labelStory: "О ком пишем? (Дай нам факты!)",
      placeholderStory: "Например: Мама Лена, любит орхидеи, 50 лет, готовит лучшие плацинды. Мы сами превратим это в красивые стихи/песню.",
      btnSubmit: "ОТПРАВИТЬ ЗАЯВКУ",
      agree: "Нажимая кнопку, ты соглашаешься на обработку данных.",
      modalTitle: "ЗАЯВКА УЛЕТЕЛА!",
      modalDesc: "Мы приняли твою заявку. Скоро Валерий Меладзе выйдет на связь в Telegram для уточнения деталей.",
      modalBtn: "ПОНЯЛ, ЖДУ",
      footerCity: "Кишинев, Молдова",
      footerDept: "Music & Poetry Dept.",
      contactBtn: "Связаться в Telegram",
      cardLookTitle: "КАК ЭТО",
      cardLookTitle2: "ВЫГЛЯДИТ?",
      cardLookDesc: "Персональная премиум открытка в каждом букете",
      cardFeature1: "QR-код с вашим треком",
      cardFeature2: "Плотный дизайнерский картон",
      cardFeature3: "Стильный черный конверт",
      guaranteeTitle: "ПОЧЕМУ МЫ?",
      g1: "Профи Дикторы",
      g2: "Бесплатные Правки",
      g3: "Срочный Заказ"
    },
    ro: {
      brandSub: "Producție Audio",
      btnOrder: "VREAU O PIESĂ",
      location: "Chișinău / Only Top Vibes",
      heroTitle1: "UITĂ DE",
      heroTitle2: "FELICITĂRI",
      heroDesc: <>Dăruiește emoții, nu carton. <span className="text-white font-bold">PIESĂ</span> sau <span className="text-white font-bold">POEZIE</span> personalizată la buchet. <br/> Prețuri de la <span className="text-white font-bold bg-brand px-3 py-1 rounded-full neon-box">500 MDL</span>.</>,
      btnMain: "COMANDĂ VIBE",
      readyTime: "Gata în 1-2 ore",
      marquee: "FLOWER BOX • MUZICĂ ȘI POEZIE • TEXTUL ÎL SCRIEM NOI • CHIȘINĂU • BUCHET + AUDIO = WOW EFFECT •",
      scanTitle: "SCAN & LISTEN",
      scanDesc: "Flower Box Production",
      whatTitle1: "DESPRE",
      whatTitle2: "NOI?",
      whatText1: (brand) => <>Ai comandat flori la <span className="text-white font-bold">{brand}</span>? Bravo. Acum adaugă suflet.</>,
      whatText2: "IMPORTANT: Cuvintele, sensul și rima le facem NOI. Tu doar alegi stilul și ne dai câteva fapte despre persoană.",
      whatText3: "În buchet va fi o felicitare cu cod QR. O scanare — și se aude o piesă profi despre momentele VOASTRE.",
      examplesTitle: "ASCULTĂ",
      examplesTitle2: "EXEMPLE",
      examplesDesc: "Piese și poezii de autor pe muzică",
      pushkinTitle: "CLASICA",
      pushkinTitle2: "ETERNĂ",
      pushkinDesc: "Putem sonoriza versuri celebre sau scrie o poezie în stilul Secolului de Aur special pentru tine.",
      stepsTitle: "ETAPELE",
      stepsTitle2: "CREĂRII",
      step1: "Fapte",
      step1Desc: "Scrii: cui, stilul și câteva fapte din viață.",
      step2: "Producție",
      step2Desc: "Noi scriem textul, vocea și mixăm.",
      step3: "Ambalare",
      step3Desc: "Printăm codul QR pe felicitare premium.",
      step4: "Livrare",
      step4Desc: "Curierul aduce flori + emoții.",
      magicTitle: "MAGIA",
      magicTitle2: "TEXTULUI",
      magicDesc: "Cum transformăm cuvintele tale în artă",
      beforeLabel: "TU SCRII (FAPTE):",
      beforeText: "«O cheamă Ana, are 25 ani. Iubește câinii Corgi. Ne-am cunoscut când ploua tare, la o cafenea în Rîșcani. Vreau să-i spun că iubesc zâmbetul ei.»",
      afterLabel: "NOI FACEM (HIT):",
      afterText: <>Douăzeci și cinci, Anșoara,<br/>Să se audă-n toată țara...<br/>Mai ții minte ploaia rece?<br/>Timpul lângă tine trece...</>,
      listenResult: "Ascultă rezultatul",
      reviewsTitle: "RECENZII",
      reviewsTitle2: "CLIENȚI",
      reviewsDesc: "Reacțiile oamenilor care au primit acest cadou",
      faqTitle: "ÎNTREBĂRI",
      faqTitle2: "FRECVENTE",
      formTitle: "CREEAZĂ",
      formTitle2: "HIT-UL",
      formDesc: "Completează ancheta. De text și muzică ne ocupăm noi.",
      labelType: "Ce înregistrăm?",
      typeSong: "Piesă Personalizată",
      typePoem: "Poezie Muzicală",
      labelName: "Numele Tău",
      labelPhone: "Telefon",
      labelContact: "Telegram / Email",
      labelRecipient: "Pentru cine?",
      labelStyle: "Stil Muzical",
      labelCustomStyle: "Scrie stilul tău:",
      labelMood: "Dispoziție / Vibe",
      labelStory: "Despre cine scriem? (Dă-ne fapte!)",
      placeholderStory: "De ex: Mama Elena, iubește orhideele, 50 ani, face cele mai bune plăcinte. Noi vom transforma asta în versuri/piesă frumoasă.",
      btnSubmit: "TRIMITE CEREREA",
      agree: "Prin apăsarea butonului, ești de acord cu prelucrarea datelor.",
      modalTitle: "CERERE TRIMISĂ!",
      modalDesc: "Am primit solicitarea ta. Revenim curând pe Telegram pentru detalii.",
      modalBtn: "AM ÎNȚELES",
      footerCity: "Chișinău, Moldova",
      footerDept: "Departamentul Muzică & Poezie",
      contactBtn: "Scrie-ne pe Telegram",
      cardLookTitle: "CUM ARATĂ",
      cardLookTitle2: "CARDUL?",
      cardLookDesc: "Felicitare premium personalizată în fiecare buchet",
      cardFeature1: "Cod QR cu piesa ta",
      cardFeature2: "Carton premium de design",
      cardFeature3: "Plic negru elegant",
      guaranteeTitle: "DE CE NOI?",
      g1: "Dictori Profi",
      g2: "Corecții Gratuite",
      g3: "Comandă Urgentă"
    }
  };

  const currentT = t[lang];

  // SEO Meta tags update when language changes
  useEffect(() => {
    const isRu = lang === 'ru';
    
    // Update document title
    document.title = isRu 
      ? 'Flower Box - Персональная музыка и стихи к букетам | Кишинев'
      : 'Flower Box - Muzică Personalizată și Poezii pentru Buchete | Chișinău';
    
    // Update html lang attribute
    document.documentElement.lang = isRu ? 'ru' : 'ro';
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', isRu
      ? 'Персональная музыка и стихи к букетам цветов в Кишиневе. Закажите уникальный трек или музыкальный стих за 1-2 часа. QR-код в каждой открытке. Цены от 500 MDL.'
      : 'Muzică personalizată și poezii pentru buchete de flori în Chișinău. Comandă piesa sau poezia muzicală unică în 1-2 ore. Cod QR în fiecare felicitare. Prețuri de la 500 MDL.');
    
    // Update or create meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', isRu
      ? 'персональная музыка, стихи к букетам, музыка к цветам, Кишинев, Молдова, QR код, заказ песни, персональный трек, музыкальный стих, цветы с музыкой, открытка с QR кодом, Flower Box'
      : 'muzică personalizată, poezii pentru buchete, muzică pentru flori, Chișinău, Moldova, cod QR, comandă piesă, piesă personalizată, poezie muzicală, flori cu muzică, felicitare cu cod QR, Flower Box');
    
    // Update or create Open Graph title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', isRu
      ? 'Flower Box - Персональная музыка и стихи к букетам | Кишинев'
      : 'Flower Box - Muzică Personalizată și Poezii pentru Buchete | Chișinău');
    
    // Update or create Open Graph description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', isRu
      ? 'Персональная музыка и стихи к букетам цветов в Кишиневе. Закажите уникальный трек или музыкальный стих за 1-2 часа.'
      : 'Muzică personalizată și poezii pentru buchete de flori în Chișinău. Comandă piesa sau poezia muzicală unică în 1-2 ore.');
  }, [lang]);

  // Logic
  const togglePlay = (id) => {
    if (isPlaying === id) {
      setIsPlaying(null);
    } else {
      // Stop all other audio when starting a track
      setIsMagicPlaying(false);
      setIsPushkinPlaying(false);
      setIsPlaying(id);
    }
  };

  const toggleMagicPlay = () => {
    // Stop all other audio when starting Magic
    if (!isMagicPlaying) {
      setIsPushkinPlaying(false);
      setIsPlaying(null); // Stop tracks section
    }
    setIsMagicPlaying(!isMagicPlaying);
  };

  const togglePushkinPlay = () => {
    // Stop all other audio when starting Pushkin
    if (!isPushkinPlaying) {
      setIsMagicPlaying(false);
      setIsPlaying(null); // Stop tracks section
    }
    setIsPushkinPlaying(!isPushkinPlaying);
  }

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  }

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send form data to API endpoint
      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          lang,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Reset form
      setFormData({
        type: 'song',
        name: '',
        phone: '',
        telegram: '',
        recipient: '',
        style: '',
        customStyle: '',
        mood: '',
        story: ''
      });

      // Show success modal
      setShowOrderModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Still show success modal to user (graceful degradation)
      setShowOrderModal(false);
      setShowSuccessModal(true);
    }
  };

  const tracks = [
    { id: 1, title: lang === 'ru' ? "Стих: Любовь на расстоянии" : "Poezie: Dragoste la distanță", tag: "POETRY / PIANO", duration: "1:15" },
    { id: 2, title: lang === 'ru' ? "Дерзкий бит на ДР Брату" : "Beat pentru Frate (La mulți ani)", tag: "TRAP/HIP-HOP", duration: "1:20" },
    { id: 3, title: lang === 'ru' ? "Стих: Прости меня" : "Poezie: Iartă-mă", tag: "POETRY / VIOLIN", duration: "2:00" },
    { id: 4, title: lang === 'ru' ? "Поздравление Боссу" : "Felicitare pentru Șef", tag: "JAZZ / LOUNGE", duration: "1:00" },
    { id: 5, title: lang === 'ru' ? "Гимн Любви (Свадьба)" : "Imnul Iubirii (Nuntă)", tag: "POP BALLAD", duration: "2:30" },
    { id: 6, title: lang === 'ru' ? "Стих: Маме с любовью" : "Poezie: Pentru Mama", tag: "POETRY / ACOUSTIC", duration: "1:45" },
    { id: 7, title: lang === 'ru' ? "Дисс на Бывшего" : "Diss pentru Ex", tag: "DRILL / PHONK", duration: "1:40" },
    { id: 8, title: lang === 'ru' ? "Утренний Вайб для Нее" : "Vibe de dimineață", tag: "LO-FI / CHILL", duration: "2:00" },
  ];

  const reviews = [
    { name: "Алина", text: lang === 'ru' ? "Мама плакала, когда слушала стих. Спасибо, что передали мои чувства так точно!" : "Mama a plâns când a ascultat poezia. Mulțumesc că ați transmis sentimentele mele atât de exact!", star: 5 },
    { name: "Максим", text: lang === 'ru' ? "Заказал рэп для девушки на годовщину. Она в шоке, трек теперь на репите." : "Am comandat rap pentru iubită. E în șoc, piesa e pe repeat acum.", star: 5 },
    { name: "Elena V.", text: lang === 'ru' ? "Очень быстро сделали, за 2 часа! Качество звука как в студии." : "Foarte rapid, în 2 ore! Calitatea sunetului ca în studio.", star: 5 },
  ];

  // Reviews carousel swipe handlers
  const minSwipeDistance = 50;
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe && currentReview < reviews.length - 1) {
      setCurrentReview(currentReview + 1);
    }
    if (isRightSwipe && currentReview > 0) {
      setCurrentReview(currentReview - 1);
    }
  };

  const faq = [
    { q: lang === 'ru' ? "Чей голос звучит в песне?" : "A cui este vocea?", a: lang === 'ru' ? "У нас база профессиональных дикторов и вокалистов. Мы подбираем голос под настроение вашего текста." : "Avem o bază de date cu dictori și vocaliști profesioniști. Alegem vocea potrivită pentru textul tău." },
    { q: lang === 'ru' ? "Я не умею писать стихи, что делать?" : "Nu pot scrie versuri, ce fac?", a: lang === 'ru' ? "Вам и не нужно! Просто напишите факты (имя, случаи из жизни, за что любите), а мы сами превратим это в рифму." : "Nici nu trebuie! Scrie doar fapte (nume, întâmplări, pentru ce iubești), iar noi le transformăm în rime." },
    { q: lang === 'ru' ? "Как прослушать трек?" : "Cum ascult piesa?", a: lang === 'ru' ? "Мы генерируем QR-код, который печатается на красивой открытке. Получатель просто наводит камеру телефона." : "Generăm un cod QR pe o felicitare frumoasă. Destinatarul doar îndreaptă camera telefonului." },
  ];


  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-[#D81B60] selection:text-white">
      {/* Custom Styles for Animations & Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Marck+Script&display=swap');
        
        body {
          font-family: 'Nunito', sans-serif;
        }
        
        .font-header {
          font-family: 'Nunito', sans-serif;
          font-weight: 900;
        }

        .font-handwriting {
          font-family: 'Marck Script', cursive;
        }

        :root {
          --brand-pink: #D81B60; 
          --brand-pink-hover: #ad1457;
        }

        .text-brand { color: var(--brand-pink); }
        .bg-brand { background-color: var(--brand-pink); }
        .bg-brand-hover:hover { background-color: var(--brand-pink-hover); }
        .border-brand { border-color: var(--brand-pink); }
        .border-brand-hover:hover { border-color: var(--brand-pink); }

        /* NEON FX */
        .neon-text {
          text-shadow: 0 0 15px rgba(216, 27, 96, 0.6);
        }
        
        .neon-box {
          box-shadow: 0 0 20px rgba(216, 27, 96, 0.25);
        }

        .neon-border:focus-within {
          box-shadow: 0 0 15px rgba(216, 27, 96, 0.4);
          border-color: var(--brand-pink);
        }
        
        .neon-btn:hover {
          box-shadow: 0 0 25px rgba(216, 27, 96, 0.6);
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          display: flex;
          white-space: nowrap;
          animation: marquee 15s linear infinite;
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(2); opacity: 0; }
        }
        
        .pulse-ring::before {
          content: '';
          position: absolute;
          left: 0; top: 0;
          width: 100%; height: 100%;
          background-color: #3b82f6;
          border-radius: 50%;
          z-index: -1;
          animation: pulse-ring 2s infinite;
        }

        /* Paper Texture for Pushkin Block */
        .paper-texture {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* HEADER */}
      <nav className="fixed top-0 w-full z-40 bg-black/95 border-b border-gray-800 backdrop-blur-md rounded-b-[2rem]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* LOGO */}
          <div className="flex flex-col">
            <div className="font-header text-2xl tracking-wider text-white leading-none">
              FLOWER <span className="text-brand neon-text">BOX</span>
            </div>
            <div className="flex items-center justify-between w-full mt-1">
               <span className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-bold">{currentT.brandSub}</span>
               <span className="w-2 h-2 bg-brand rounded-full animate-pulse shadow-[0_0_10px_#D81B60]"></span>
            </div>
          </div>

          <div className="flex items-center gap-4">
             {/* LANGUAGE SWITCHER */}
             <button 
                onClick={() => setLang(lang === 'ru' ? 'ro' : 'ru')}
                className="flex items-center gap-1 text-xs font-bold border border-gray-700 px-4 py-2 rounded-full hover:border-brand transition-colors"
             >
                <Globe size={14} /> {lang.toUpperCase()}
             </button>

            <button 
              onClick={() => setShowOrderModal(true)}
              className="hidden md:block bg-brand bg-brand-hover text-white font-bold py-3 px-8 rounded-full transition-all text-sm border border-brand neon-btn"
            >
              <span>{currentT.btnOrder}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* FLOATING ACTION BUTTON (TELEGRAM) - MOBILE & DESKTOP */}
      <a 
        href="https://t.me/flowerboxmd" 
        target="_blank" 
        rel="noreferrer"
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-[#0088cc] text-white rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 pulse-ring ${isScrolled ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} duration-500`}
      >
        <MessageCircle size={32} />
      </a>

      {/* HERO SECTION */}
      <header className="relative pt-20 md:pt-36 pb-0 md:pb-20 px-4 flex flex-col items-center justify-center text-center min-h-[70vh] md:min-h-[90vh] bg-[url('https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-no-repeat rounded-b-[3rem] overflow-hidden">
        <div className="absolute inset-0 bg-black/85"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-block px-6 py-2 border border-brand bg-black/80 backdrop-blur text-brand text-xs md:text-sm tracking-widest mb-6 md:mb-8 font-bold uppercase neon-box rounded-full">
            {currentT.location}
          </div>
          
          <h1 className="font-header text-[3.5rem] md:text-7xl lg:text-8xl leading-tight mb-6 md:mb-8">
            <span className="text-white">{currentT.heroTitle1}</span><br />
            <span className="text-brand neon-text">{currentT.heroTitle2}</span>
          </h1>
          
          <p className="text-gray-300 text-base md:text-2xl mb-8 md:mb-10 max-w-2xl mx-auto font-medium leading-relaxed px-4">
            {currentT.heroDesc}
          </p>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center px-4 w-full">
            <button 
              onClick={() => setShowOrderModal(true)}
              className="w-full md:w-auto bg-brand bg-brand-hover text-white font-bold py-4 md:py-5 px-12 transition-all flex items-center justify-center gap-2 border-2 border-brand neon-btn rounded-full text-base md:text-lg"
            >
              <span className="tracking-wide">{currentT.btnMain}</span>
              <Zap className="w-5 h-5" />
            </button>
            <div className="text-gray-400 text-xs md:text-sm text-center md:text-left flex items-center justify-center gap-2 bg-black/50 px-6 py-3 rounded-full border border-gray-800 w-full md:w-auto">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
              {currentT.readyTime}
            </div>
          </div>
        </div>
      </header>

      {/* MARQUEE */}
      <div className="bg-brand py-4 md:py-5 overflow-hidden relative z-20 shadow-[0_0_20px_rgba(216,27,96,0.4)] transform -rotate-1 rounded-3xl mx-[-5px] md:mx-[-10px] my-6 md:my-10 border-y-4 border-black">
        <div className="animate-marquee font-header text-lg md:text-2xl text-white font-black uppercase tracking-widest">
          {currentT.marquee} {currentT.marquee}
        </div>
      </div>

      {/* WHAT IS IT? SECTION */}
      <section className="py-12 md:py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="order-2 md:order-1 flex justify-center">
              <div className="relative bg-[#111] p-8 md:p-10 border border-gray-800 transition-transform duration-300 w-full max-w-sm neon-box group rounded-[2.5rem]">
                <div className="absolute -top-2 -left-2 w-full h-full border border-brand -z-10 opacity-50 group-hover:opacity-100 transition-opacity rounded-[2.5rem]"></div>
                <QrCode className="w-24 h-24 md:w-32 md:h-32 text-white mx-auto mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                <h3 className="font-header text-xl md:text-2xl text-center mb-2 text-brand neon-text">{currentT.scanTitle}</h3>
                <p className="text-center text-gray-400 text-xs uppercase tracking-wide">
                  {currentT.scanDesc}
                </p>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <h2 className="font-header text-3xl md:text-5xl mb-6 md:mb-8 text-center md:text-left">
                {currentT.whatTitle1} <span className="text-brand neon-text">{currentT.whatTitle2}</span>
              </h2>
              <div className="space-y-4 md:space-y-6 text-gray-300 text-base md:text-lg leading-relaxed">
                <p>{currentT.whatText1('FLOWER BOX')}</p>
                <p className="bg-gray-900 p-4 rounded-2xl border-l-4 border-brand">{currentT.whatText2}</p>
                <p>{currentT.whatText3}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GUARANTEES (TRUST BLOCK) - NEW */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
           {[
             {icon: Mic, text: currentT.g1},
             {icon: ShieldCheck, text: currentT.g2},
             {icon: Clock, text: currentT.g3},
           ].map((g, i) => (
             <div key={i} className="flex items-center gap-4 bg-[#111] p-4 rounded-2xl border border-gray-800">
                <div className="p-3 bg-brand/10 rounded-full text-brand">
                  <g.icon size={24} />
                </div>
                <span className="font-bold text-white text-sm">{g.text}</span>
             </div>
           ))}
        </div>
      </section>

      {/* HOW IT LOOKS (VISUALIZATION) - NEW */}
      <section className="py-12 md:py-24 px-4 bg-black border-y border-gray-900 rounded-[3rem] my-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
               <h2 className="font-header text-3xl md:text-5xl mb-6">
                {currentT.cardLookTitle} <span className="text-brand neon-text">{currentT.cardLookTitle2}</span>
              </h2>
              <p className="text-gray-400 mb-8">{currentT.cardLookDesc}</p>
              <ul className="space-y-4">
                 <li className="flex items-center gap-3 text-white"><CheckCircle className="text-brand" size={20}/> {currentT.cardFeature1}</li>
                 <li className="flex items-center gap-3 text-white"><CheckCircle className="text-brand" size={20}/> {currentT.cardFeature2}</li>
                 <li className="flex items-center gap-3 text-white"><CheckCircle className="text-brand" size={20}/> {currentT.cardFeature3}</li>
              </ul>
            </div>
            {/* Visual Representation of the Card */}
            <div className="relative h-64 md:h-80 bg-gradient-to-br from-gray-900 to-black rounded-[2.5rem] border border-gray-800 flex items-center justify-center shadow-2xl overflow-hidden">
               {/* Background Flowers Effect */}
               <div className="absolute top-0 right-0 w-40 h-40 bg-pink-600/20 blur-[50px] rounded-full"></div>
               
               {/* The Card */}
               <div className="relative bg-white text-black w-48 h-64 md:w-56 md:h-72 rounded-xl shadow-2xl p-6 flex flex-col items-center justify-between transform rotate-[-5deg] hover:rotate-0 transition-all duration-500">
                  <div className="text-xs font-bold uppercase tracking-widest">Flower Box</div>
                  <div className="text-center">
                    <h4 className="font-header text-xl mb-1">SCAN ME</h4>
                    <QrCode size={80} className="mx-auto" />
                  </div>
                  <div className="text-[10px] text-gray-500 text-center">Listen to your vibe</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXAMPLES SECTION */}
      <section className="py-12 md:py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-header text-3xl md:text-6xl mb-4">
              {currentT.examplesTitle} <span className="text-brand neon-text">{currentT.examplesTitle2}</span>
            </h2>
            <p className="text-gray-500 uppercase tracking-widest text-xs md:text-sm">{currentT.examplesDesc}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-6">
            {tracks.map((track) => (
              <div key={track.id} className="bg-[#111] p-3 md:p-6 flex items-center gap-2 md:gap-5 border border-gray-800 border-brand-hover transition-all group cursor-pointer hover:neon-box rounded-xl md:rounded-[2rem]" onClick={() => togglePlay(track.id)}>
                <button className="w-10 h-10 md:w-16 md:h-16 bg-brand flex items-center justify-center text-white flex-shrink-0 group-hover:bg-white group-hover:text-brand transition-colors shadow-[0_0_15px_rgba(216,27,96,0.4)] rounded-full">
                  {isPlaying === track.id ? <Pause size={18} className="md:hidden" /> : <Play size={18} className="ml-0.5 md:hidden" />}
                  {isPlaying === track.id ? <Pause size={24} className="hidden md:block" /> : <Play size={24} className="ml-1 hidden md:block" />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1 md:mb-2">
                    <h4 className="font-bold text-white truncate pr-1 md:pr-2 text-xs md:text-lg group-hover:text-brand transition-colors">{track.title}</h4>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] md:text-xs font-bold text-gray-500 bg-gray-900 px-1.5 md:px-3 py-0.5 md:py-1 uppercase rounded-full">{track.tag}</span>
                    <div className="h-3 md:h-4 flex items-end gap-[1px] md:gap-[3px]">
                      {[...Array(12)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-0.5 md:w-1.5 bg-brand transition-all duration-300 rounded-full ${isPlaying === track.id ? 'animate-pulse shadow-[0_0_5px_#D81B60]' : ''}`}
                          style={{ height: isPlaying === track.id ? `${Math.random() * 100}%` : '20%' }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PUSHKIN SECTION - NEW */}
      <section className="py-12 md:py-24 px-4 bg-[#050505] rounded-[3rem] border-y border-gray-800 my-4 relative overflow-hidden paper-texture">
        {/* Background Doodles */}
        <svg className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 opacity-10 pointer-events-none" viewBox="0 0 200 200">
           <path d="M20,150 Q50,100 80,150 T140,150" fill="none" stroke="white" strokeWidth="2" />
           <path d="M10,10 Q50,50 90,10 T150,50" fill="none" stroke="white" strokeWidth="1" />
           <path d="M150,150 C160,100 180,180 190,120" fill="none" stroke="white" strokeWidth="2" />
           {/* Abstract Quill Feather */}
           <path d="M100,50 Q120,20 150,40 Q160,60 140,80 Q120,100 100,50" fill="none" stroke="white" strokeWidth="1" />
        </svg>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
           <div className="inline-block mb-4 p-3 bg-white/5 rounded-full backdrop-blur-md border border-white/10">
              <Feather className="text-[#e2b56e] w-8 h-8" />
           </div>
           
           <h2 className="font-header text-3xl md:text-5xl mb-6 text-[#e2b56e]">
              {currentT.pushkinTitle} <span className="text-white">{currentT.pushkinTitle2}</span>
           </h2>
           <p className="text-gray-400 mb-12 max-w-lg mx-auto">{currentT.pushkinDesc}</p>

           <div className="bg-[#111] p-8 md:p-12 rounded-[2.5rem] border border-[#e2b56e]/30 shadow-[0_0_50px_rgba(226,181,110,0.1)] relative">
              {/* Poem */}
              <div className="font-handwriting text-2xl md:text-4xl text-white leading-relaxed mb-10">
                <p>Я вас любил: любовь еще, быть может,</p>
                <p>В душе моей угасла не совсем;</p>
                <p>Но пусть она вас больше не тревожит;</p>
                <p>Я не хочу печалить вас ничем.</p>
              </div>
              
              <div className="flex justify-center">
                 <button 
                    onClick={togglePushkinPlay}
                    className="flex items-center gap-4 bg-[#e2b56e] hover:bg-[#c99b50] text-black font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-lg"
                 >
                    {isPushkinPlaying ? <Pause size={24} /> : <Play size={24} />}
                    <span className="uppercase tracking-widest">{currentT.listenResult}</span>
                 </button>
              </div>
              
              {/* Fake Audio Wave for Pushkin */}
              {isPushkinPlaying && (
                 <div className="flex justify-center gap-1 mt-6 h-6 items-end">
                    {[...Array(20)].map((_, i) => (
                       <div key={i} className="w-1 bg-[#e2b56e] rounded-full animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDuration: `${0.5 + Math.random()}s` }}></div>
                    ))}
                 </div>
              )}
           </div>
        </div>
      </section>

      {/* MAGIC: BEFORE & AFTER SECTION */}
      <section className="py-12 md:py-24 px-4 bg-black rounded-[3rem] border-y border-gray-900 my-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-header text-3xl md:text-5xl mb-4">
              {currentT.magicTitle} <span className="text-brand neon-text">{currentT.magicTitle2}</span>
            </h2>
            <p className="text-gray-500">{currentT.magicDesc}</p>
          </div>

          {/* New Flex Container for Perfect Alignment */}
          <div className="flex flex-col md:flex-row gap-6 items-stretch justify-between relative">
            {/* Before Card */}
            <div className="flex-1 bg-[#111] p-8 rounded-[2.5rem] border border-gray-800 relative w-full">
               <div className="absolute -top-4 -left-4 bg-gray-800 text-white font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider">{currentT.beforeLabel}</div>
               <p className="text-gray-400 italic leading-relaxed">
                 {currentT.beforeText}
               </p>
               {/* Mobile Arrow inside */}
               <ArrowRight className="md:hidden mx-auto mt-4 text-gray-600 animate-bounce" />
            </div>

            {/* Desktop Arrow - Centered */}
            <div className="hidden md:flex items-center justify-center px-2">
               <ArrowRight size={40} className="text-brand/50 animate-pulse" />
            </div>

            {/* After Card (Result) */}
            <div className="flex-1 bg-gradient-to-br from-brand/20 to-black p-8 rounded-[2.5rem] border border-brand/50 relative shadow-[0_0_30px_rgba(216,27,96,0.2)] w-full">
               <div className="absolute -top-4 -right-4 bg-brand text-white font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider shadow-lg">{currentT.afterLabel}</div>
               <p className="text-white font-bold text-lg leading-relaxed mb-6 font-header">
                 {currentT.afterText}
               </p>
               
               {/* Player for Magic Section */}
               <div className="bg-black/40 p-4 rounded-2xl flex items-center gap-4 backdrop-blur-sm border border-white/10">
                  <button 
                    onClick={toggleMagicPlay}
                    className="w-12 h-12 bg-white text-brand rounded-full flex items-center justify-center hover:scale-105 transition-transform flex-shrink-0"
                  >
                    {isMagicPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1"/>}
                  </button>
                  <div className="flex-1 min-w-0">
                     <div className="text-xs text-gray-300 font-bold mb-1">{currentT.listenResult}</div>
                     <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className={`h-full bg-brand ${isMagicPlaying ? 'w-full transition-all duration-[10000ms] ease-linear' : 'w-0'}`}></div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

       {/* REVIEWS SECTION */}
       <section className="py-12 md:py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-header text-3xl md:text-5xl mb-4">
              {currentT.reviewsTitle} <span className="text-brand neon-text">{currentT.reviewsTitle2}</span>
            </h2>
            <p className="text-gray-500">{currentT.reviewsDesc}</p>
          </div>
          
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => (
              <div key={idx} className="bg-[#111] p-6 md:p-8 rounded-[2.5rem] border border-gray-800 relative">
                 <div className="flex gap-1 mb-4 text-yellow-500">
                    {[...Array(rev.star)].map((_, i) => <Star key={i} size={16} fill="#eab308" />)}
                 </div>
                 <p className="text-gray-300 italic mb-6 text-sm md:text-base">"{rev.text}"</p>
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center font-bold text-gray-500">
                        {rev.name[0]}
                    </div>
                    <span className="font-bold text-white">{rev.name}</span>
                 </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden relative overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentReview * 100}%)` }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {reviews.map((rev, idx) => (
                <div key={idx} className="min-w-full px-2">
                  <div className="bg-[#111] p-6 rounded-2xl border border-gray-800 relative">
                    <div className="flex gap-1 mb-4 text-yellow-500">
                      {[...Array(rev.star)].map((_, i) => <Star key={i} size={16} fill="#eab308" />)}
                    </div>
                    <p className="text-gray-300 italic mb-6 text-sm">"{rev.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center font-bold text-gray-500">
                        {rev.name[0]}
                      </div>
                      <span className="font-bold text-white">{rev.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentReview(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentReview === idx ? 'bg-brand w-6' : 'bg-gray-600'
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-12 md:py-24 px-4 bg-black rounded-[3rem]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-header text-3xl md:text-5xl text-center mb-10 md:mb-16">
            {currentT.stepsTitle} <span className="text-brand neon-text">{currentT.stepsTitle2}</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 relative">
            <div className="hidden md:block absolute top-10 left-0 w-full h-[2px] bg-gray-800 -z-0 rounded-full"></div>

            {[
              { icon: Smartphone, title: `1. ${currentT.step1}`, text: currentT.step1Desc },
              { icon: Mic, title: `2. ${currentT.step2}`, text: currentT.step2Desc },
              { icon: QrCode, title: `3. ${currentT.step3}`, text: currentT.step3Desc },
              { icon: Heart, title: `4. ${currentT.step4}`, text: currentT.step4Desc },
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group pt-4">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-[#111] border-2 border-gray-800 flex items-center justify-center mb-3 md:mb-6 group-hover:border-brand group-hover:shadow-[0_0_20px_rgba(216,27,96,0.3)] transition-all duration-300 rounded-full">
                  <step.icon size={28} className="md:hidden text-gray-400 group-hover:text-brand transition-colors" />
                  <step.icon size={36} className="hidden md:block text-gray-400 group-hover:text-brand transition-colors" />
                </div>
                <h3 className="font-header text-sm md:text-xl mb-2 md:mb-3 text-white">{step.title}</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed px-1 md:px-2">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATIC ORDER FORM */}
      <section id="order-form" className="py-12 md:py-24 px-4 bg-[#0a0a0a] relative rounded-[3rem] mt-[-2rem] md:mt-[-3rem]">
        <div className="absolute inset-0 bg-brand/5 blur-[100px] pointer-events-none"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="bg-[#111] border border-gray-800 p-6 md:p-12 neon-box rounded-[3rem]">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="font-header text-3xl md:text-5xl mb-4">
                {currentT.formTitle} <span className="text-brand neon-text">{currentT.formTitle2}</span>
              </h2>
              <p className="text-gray-400">{currentT.formDesc}</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4 md:space-y-6">
                {/* SERVICE TYPE SELECTOR + PRICES */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, type: 'poem' }))}
                    className={`relative p-4 md:p-5 rounded-3xl border flex flex-col items-center gap-2 transition-all group overflow-hidden ${formData.type === 'poem' ? 'bg-brand/20 border-brand text-white shadow-[0_0_15px_rgba(216,27,96,0.3)]' : 'bg-black border-gray-700 text-gray-500 hover:border-gray-500'}`}
                  >
                    <div className="absolute top-0 right-0 bg-brand text-white text-[10px] font-bold px-3 py-1 rounded-bl-2xl">500 MDL</div>
                    <Feather size={28} className={formData.type === 'poem' ? 'text-brand' : 'group-hover:text-white'} />
                    <span className="text-xs font-bold uppercase text-center mt-1">{currentT.typePoem}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, type: 'song' }))}
                    className={`relative p-4 md:p-5 rounded-3xl border flex flex-col items-center gap-2 transition-all group overflow-hidden ${formData.type === 'song' ? 'bg-brand/20 border-brand text-white shadow-[0_0_15px_rgba(216,27,96,0.3)]' : 'bg-black border-gray-700 text-gray-500 hover:border-gray-500'}`}
                  >
                    <div className="absolute top-0 right-0 bg-brand text-white text-[10px] font-bold px-3 py-1 rounded-bl-2xl">700 MDL</div>
                    <Music size={28} className={formData.type === 'song' ? 'text-brand' : 'group-hover:text-white'} />
                    <span className="text-xs font-bold uppercase text-center mt-1">{currentT.typeSong}</span>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block pl-2">{currentT.labelName}</label>
                    <input 
                      type="text" name="name" required
                      value={formData.name}
                      className="w-full bg-black border border-gray-700 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand transition-colors rounded-2xl"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block pl-2">{currentT.labelPhone}</label>
                    <input 
                      type="tel" name="phone" required
                      value={formData.phone}
                      placeholder="+373..."
                      className="w-full bg-black border border-gray-700 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand transition-colors rounded-2xl"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block pl-2">{currentT.labelContact}</label>
                    <input 
                      type="text" name="telegram" required
                      value={formData.telegram}
                      placeholder="@username"
                      className="w-full bg-black border border-gray-700 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand transition-colors rounded-2xl"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block pl-2">{currentT.labelRecipient}</label>
                    <input 
                      type="text" name="recipient" required
                      value={formData.recipient}
                      className="w-full bg-black border border-gray-700 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand transition-colors rounded-2xl"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                {/* MOOD SELECTION */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block pl-2 flex items-center gap-2">
                      <Smile size={14} className="text-brand"/> {currentT.labelMood}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {moodsList.map((mood) => (
                      <button
                        key={mood.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, mood: mood.id }))}
                        className={`px-4 py-2 text-xs font-bold border transition-all rounded-full ${formData.mood === mood.id ? 'bg-brand border-brand text-white shadow-[0_0_10px_rgba(216,27,96,0.4)]' : 'bg-transparent border-gray-800 text-gray-400 hover:border-gray-600 hover:text-white'}`}
                      >
                        {lang === 'ru' ? mood.ru : mood.ro}
                      </button>
                    ))}
                  </div>
                </div>

                {/* STYLE SELECTION */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block pl-2">{currentT.labelStyle}</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {stylesList.map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, style: style.id }))}
                        className={`p-3 text-xs font-bold border transition-all text-left truncate rounded-xl ${formData.style === style.id ? 'bg-white text-black border-white shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'bg-transparent border-gray-800 text-gray-400 hover:border-gray-600 hover:text-white'}`}
                      >
                        {lang === 'ru' ? style.ru : style.ro}
                      </button>
                    ))}
                  </div>
                  
                  {/* Custom Style Input */}
                  {formData.style === 'Custom' && (
                     <div className="mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                       <input 
                          type="text" 
                          name="customStyle"
                          value={formData.customStyle}
                          placeholder={currentT.labelCustomStyle}
                          className="w-full bg-gray-900 border border-brand p-3 text-white placeholder-gray-500 focus:outline-none rounded-xl text-sm"
                          onChange={handleInputChange}
                       />
                     </div>
                  )}
                </div>

                <div className="space-y-2 bg-gray-900/30 p-5 rounded-3xl border border-gray-800">
                  <label className="text-xs font-bold text-brand uppercase tracking-wider block pl-1 mb-2">{currentT.labelStory}</label>
                  <textarea 
                    name="story" rows="4" required
                    value={formData.story}
                    placeholder={currentT.placeholderStory}
                    className="w-full bg-black border border-gray-700 p-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand transition-colors resize-none rounded-2xl text-sm"
                    onChange={handleInputChange}
                  ></textarea>
                  <p className="text-[10px] text-gray-500 mt-2 text-right">* Мы сами придумаем рифму и текст, нужны только факты.</p>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-brand bg-brand-hover text-white font-header text-xl py-4 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 uppercase tracking-wide neon-btn border border-brand rounded-full shadow-[0_0_20px_rgba(216,27,96,0.3)]"
                >
                  {currentT.btnSubmit} <Send size={20} />
                </button>
                <p className="text-center text-gray-600 text-[10px]">{currentT.agree}</p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-12 md:py-24 px-4 bg-black rounded-t-[3rem] mt-[-3rem] relative z-20">
         <div className="max-w-3xl mx-auto">
            <h2 className="font-header text-3xl md:text-4xl text-center mb-8 md:mb-12">
              {currentT.faqTitle} <span className="text-brand neon-text">{currentT.faqTitle2}</span>
            </h2>
            <div className="space-y-4">
                {faq.map((item, idx) => (
                    <div key={idx} className="bg-[#111] border border-gray-800 rounded-3xl overflow-hidden transition-all">
                        <button 
                            onClick={() => toggleFaq(idx)}
                            className="w-full flex justify-between items-center p-5 md:p-6 text-left hover:bg-white/5 transition-colors"
                        >
                            <span className="font-bold text-base md:text-lg pr-4">{item.q}</span>
                            {openFaq === idx ? <ChevronUp className="text-brand flex-shrink-0"/> : <ChevronDown className="text-gray-500 flex-shrink-0"/>}
                        </button>
                        {openFaq === idx && (
                            <div className="p-5 md:p-6 pt-0 text-gray-400 leading-relaxed border-t border-gray-800/50 text-sm md:text-base">
                                {item.a}
                            </div>
                        )}
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* FOOTER - REDESIGNED */}
      <footer className="bg-[#050505] py-12 md:py-16 border-t border-gray-900 rounded-t-[3rem] mt-[-3rem] relative z-30 pb-24 md:pb-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h3 className="font-header text-3xl text-white mb-2">
              FLOWER <span className="text-brand neon-text">BOX</span>
            </h3>
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-6">{currentT.footerCity} • {currentT.footerDept}</p>
            
            <a href="tel:+37360810789" className="text-2xl font-bold text-white hover:text-brand transition-colors flex items-center justify-center md:justify-start gap-3">
               <Phone size={24} className="text-brand" /> +373 60 810 789
            </a>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
             {/* Beautiful Contact Button */}
            <a href="https://t.me/flowerboxmd" target="_blank" rel="noreferrer" className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-400 p-[2px] transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                <div className="relative flex items-center gap-3 rounded-full bg-black px-8 py-4 transition-all group-hover:bg-transparent">
                    <MessageCircle size={24} className="text-white" />
                    <span className="font-bold text-white">{currentT.contactBtn}</span>
                </div>
            </a>
            
            <div className="flex gap-6 mt-4">
              <a href="#" className="text-gray-500 hover:text-brand transition-colors text-sm font-bold">Instagram</a>
              <a href="#" className="text-gray-500 hover:text-brand transition-colors text-sm font-bold">Facebook</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ORDER POPUP MODAL */}
      {showOrderModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto py-4">
          <div className="bg-[#111] border border-gray-800 w-full max-w-2xl relative neon-box rounded-[3rem] my-auto">
            <div className="p-8 md:p-10">
              <button 
                onClick={() => setShowOrderModal(false)} 
                className="absolute top-6 right-6 text-gray-500 hover:text-white hover:rotate-90 transition-all bg-black/50 p-2 rounded-full"
              >
                <X size={28} />
              </button>
              
              <div className="text-center mb-8">
                <h3 className="font-header text-3xl text-white mb-2">
                    {lang === 'ru' ? 'БЫСТРЫЙ' : 'COMANDĂ'} <span className="text-brand neon-text">{lang === 'ru' ? 'ЗАКАЗ' : 'RAPIDĂ'}</span>
                </h3>
                <p className="text-gray-400 text-sm">{currentT.formDesc}</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4 md:space-y-6">
                  {/* SERVICE TYPE SELECTOR + PRICES */}
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, type: 'poem' }))}
                      className={`relative p-4 md:p-5 rounded-3xl border flex flex-col items-center gap-2 transition-all group overflow-hidden ${formData.type === 'poem' ? 'bg-brand/20 border-brand text-white shadow-[0_0_15px_rgba(216,27,96,0.3)]' : 'bg-black border-gray-700 text-gray-500 hover:border-gray-500'}`}
                    >
                      <div className="absolute top-0 right-0 bg-brand text-white text-[10px] font-bold px-3 py-1 rounded-bl-2xl">500 MDL</div>
                      <Feather size={28} className={formData.type === 'poem' ? 'text-brand' : 'group-hover:text-white'} />
                      <span className="text-xs font-bold uppercase text-center mt-1">{currentT.typePoem}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, type: 'song' }))}
                      className={`relative p-4 md:p-5 rounded-3xl border flex flex-col items-center gap-2 transition-all group overflow-hidden ${formData.type === 'song' ? 'bg-brand/20 border-brand text-white shadow-[0_0_15px_rgba(216,27,96,0.3)]' : 'bg-black border-gray-700 text-gray-500 hover:border-gray-500'}`}
                    >
                      <div className="absolute top-0 right-0 bg-brand text-white text-[10px] font-bold px-3 py-1 rounded-bl-2xl">700 MDL</div>
                      <Music size={28} className={formData.type === 'song' ? 'text-brand' : 'group-hover:text-white'} />
                      <span className="text-xs font-bold uppercase text-center mt-1">{currentT.typeSong}</span>
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block pl-2">{currentT.labelName}</label>
                      <input 
                        type="text" name="name" required
                        value={formData.name}
                        className="w-full bg-black border border-gray-700 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand transition-colors rounded-2xl"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block pl-2">{currentT.labelPhone}</label>
                      <input 
                        type="tel" name="phone" required
                        value={formData.phone}
                        placeholder="+373..."
                        className="w-full bg-black border border-gray-700 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand transition-colors rounded-2xl"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block pl-2">{currentT.labelContact}</label>
                      <input 
                        type="text" name="telegram" required
                        value={formData.telegram}
                        placeholder="@username"
                        className="w-full bg-black border border-gray-700 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand transition-colors rounded-2xl"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block pl-2">{currentT.labelRecipient}</label>
                      <input 
                        type="text" name="recipient" required
                        value={formData.recipient}
                        className="w-full bg-black border border-gray-700 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand transition-colors rounded-2xl"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  {/* MOOD SELECTION */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block pl-2 flex items-center gap-2">
                        <Smile size={14} className="text-brand"/> {currentT.labelMood}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {moodsList.map((mood) => (
                        <button
                          key={mood.id}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, mood: mood.id }))}
                          className={`px-4 py-2 text-xs font-bold border transition-all rounded-full ${formData.mood === mood.id ? 'bg-brand border-brand text-white shadow-[0_0_10px_rgba(216,27,96,0.4)]' : 'bg-transparent border-gray-800 text-gray-400 hover:border-gray-600 hover:text-white'}`}
                        >
                          {lang === 'ru' ? mood.ru : mood.ro}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* STYLE SELECTION */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block pl-2">{currentT.labelStyle}</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {stylesList.map((style) => (
                        <button
                          key={style.id}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, style: style.id }))}
                          className={`p-3 text-xs font-bold border transition-all text-left truncate rounded-xl ${formData.style === style.id ? 'bg-white text-black border-white shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'bg-transparent border-gray-800 text-gray-400 hover:border-gray-600 hover:text-white'}`}
                        >
                          {lang === 'ru' ? style.ru : style.ro}
                        </button>
                      ))}
                    </div>
                    
                    {/* Custom Style Input */}
                    {formData.style === 'Custom' && (
                       <div className="mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                         <input 
                            type="text" 
                            name="customStyle"
                            value={formData.customStyle}
                            placeholder={currentT.labelCustomStyle}
                            className="w-full bg-gray-900 border border-brand p-3 text-white placeholder-gray-500 focus:outline-none rounded-xl text-sm"
                            onChange={handleInputChange}
                         />
                       </div>
                    )}
                  </div>

                  <div className="space-y-2 bg-gray-900/30 p-5 rounded-3xl border border-gray-800">
                    <label className="text-xs font-bold text-brand uppercase tracking-wider block pl-1 mb-2">{currentT.labelStory}</label>
                    <textarea 
                      name="story" rows="4" required
                      value={formData.story}
                      placeholder={currentT.placeholderStory}
                      className="w-full bg-black border border-gray-700 p-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand transition-colors resize-none rounded-2xl text-sm"
                      onChange={handleInputChange}
                    ></textarea>
                    <p className="text-[10px] text-gray-500 mt-2 text-right">* Мы сами придумаем рифму и текст, нужны только факты.</p>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-brand bg-brand-hover text-white font-header text-xl py-4 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 uppercase tracking-wide neon-btn border border-brand rounded-full shadow-[0_0_20px_rgba(216,27,96,0.3)]"
                  >
                    {currentT.btnSubmit} <Send size={20} />
                  </button>
                  <p className="text-center text-gray-600 text-[10px]">{currentT.agree}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/95 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#111] border border-gray-800 p-10 max-w-md w-full text-center relative neon-box rounded-[3rem]">
            <button onClick={() => setShowSuccessModal(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors bg-black/50 p-2 rounded-full">
              <X size={24} />
            </button>
            <div className="w-24 h-24 bg-black border border-brand flex items-center justify-center mx-auto mb-8 rounded-full shadow-[0_0_20px_rgba(216,27,96,0.5)]">
              <Disc className="text-brand animate-spin-slow" size={48} />
            </div>
            <h3 className="font-header text-3xl mb-4 text-white">{currentT.modalTitle}</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              {currentT.modalDesc}
            </p>
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="bg-white text-black font-bold py-4 px-8 hover:bg-gray-200 transition-colors w-full uppercase tracking-wider rounded-full"
            >
              {currentT.modalBtn}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowerBoxLanding;

