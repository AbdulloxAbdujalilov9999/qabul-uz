// Original seed content for the demo. Case studies and mentors are explicitly
// fictional placeholders (isPlaceholder: true) -- swap for real local students
// before launch. Scholarship/program names are real public programs; dates and
// amounts are indicative only and must be verified against the official source
// each cycle (see the disclaimer rendered next to them in the UI).

import type {
  Archetype,
  CaseStudy,
  Institution,
  JournalPrompt,
  Lesson,
  Mentor,
  QuizDef,
  School,
  Scholarship,
} from "./types";

export const archetypes: Archetype[] = [
  {
    id: "arc_tadqiqotchi",
    slug: "tadqiqotchi",
    name: "Tadqiqotchi",
    tagline: "Savol topasan, javobni o'zing qazib chiqarasan.",
    description:
      "Loyihalarga chuqur kirib ketasan, raqamlar va dalillar bilan ishlashni yoqtirasan. Ilmiy maqolalar, olimpiadalar va mustaqil tadqiqotlar sening maydoning.",
  },
  {
    id: "arc_yetakchi",
    slug: "yetakchi",
    name: "Yetakchi",
    tagline: "Jamoani birlashtirasan va natijaga olib borasan.",
    description:
      "Klub, jamoa yoki loyihani boshqarish senga tabiiy keladi. Odamlarni ishontirish va rejani amalga oshirish - kuchli tomoning.",
  },
  {
    id: "arc_ijodkor",
    slug: "ijodkor",
    name: "Ijodkor",
    tagline: "Dunyoni boshqacha ko'rasan va buni ko'rsata olasan.",
    description:
      "San'at, yozish, dizayn yoki musiqa orqali o'zingni ifoda etasan. Insholaring ham, loyihalaring ham o'ziga xos ovozga ega.",
  },
  {
    id: "arc_faol_fuqaro",
    slug: "faol-fuqaro",
    name: "Faol fuqaro",
    tagline: "Atrofingdagi muammoni ko'rib, jim turolmaysan.",
    description:
      "Jamoat ishlari, volontyorlik va ijtimoiy muammolarni hal qilish senga ma'no beradi. Harakatlaring mahallangdan boshlanib, kattaroq ta'sirga aylanadi.",
  },
  {
    id: "arc_sportchi",
    slug: "sportchi",
    name: "Sportchi",
    tagline: "Intizom va musobaqa ruhida o'sasan.",
    description:
      "Yillab davom etgan mashg'ulot, jamoa a'zoligi va g'alaba-mag'lubiyatlar seni shakllantirgan. Bu tajriba sinfdan tashqarida ham ishlaydi.",
  },
  {
    id: "arc_tashkilotchi",
    slug: "tashkilotchi",
    name: "Tashkilotchi",
    tagline: "Noldan biror narsa qurishni yaxshi ko'rasan.",
    description:
      "Klub, startap yoki tashabbusni noldan ishga tushirgansan. Resurs yo'qligi seni to'xtatmaydi, aksincha ijodiy yechim topishga majburlaydi.",
  },
  {
    id: "arc_hikoyachi",
    slug: "hikoyachi",
    name: "Hikoyachi",
    tagline: "Tajribangni unutilmas hikoyaga aylantira olasan.",
    description:
      "Oddiy voqeani chuqur ma'noli hikoyaga aylantirish - sening super kuching. Insho yozishda bu eng katta afzalliging bo'ladi.",
  },
  {
    id: "arc_texnolog",
    slug: "texnolog",
    name: "Texnolog",
    tagline: "Narsalarni qanday ishlashini bilishni va qurishni yoqtirasan.",
    description:
      "Kod yozish, robototexnika yoki muhandislik loyihalari bilan band bo'lasan. Qo'l bilan qurib ko'rish - sening o'rganish usuling.",
  },
  {
    id: "arc_mukammalchi",
    slug: "mukammalchi",
    name: "Mukammalchi",
    tagline: "Yuqori natija uchun tinimsiz ishlaysan.",
    description:
      "DTM, IELTS, SAT kabi testlarda eng yuqori ballga erishish uchun tizimli tayyorgarlik ko'rasan. Intizom va rejalashtirish - kuchli tomoning.",
  },
  {
    id: "arc_koprirrali",
    slug: "kop-qirrali",
    name: "Ko'p qirrali",
    tagline: "Bir nechta qiziqishni bir vaqtda olib yurasan.",
    description:
      "Fan olimpiadasidan sport musobaqasigacha, musiqadan volontyorlikgacha - doiraing keng. Ariza uchun bu qirralarni bitta chiziqqa bog'lash kerak bo'ladi.",
  },
  {
    id: "arc_kashfiyotchi",
    slug: "kashfiyotchi",
    name: "Kashfiyotchi",
    tagline: "Hech kim kutmagan yo'lni tanlaysan.",
    description:
      "An'anaviy yo'ldan ko'ra o'zingga xos tajriba - sayohat, hunarmandchilik, g'ayrioddiy loyiha - sening hikoyangni alohida qiladi.",
  },
  {
    id: "arc_homiy",
    slug: "homiy",
    name: "Homiy",
    tagline: "Odamlarni bog'lab, imkoniyat yaratasan.",
    description:
      "Mentorlik, ustozlik yoki jamoani bir-biriga bog'lash orqali ta'sir qilasan. Boshqalarning yutug'i seni ham ilhomlantiradi.",
  },
];

export const journalPrompts: JournalPrompt[] = [
  { id: "jp1", theme: "boshlanish", prompt: "Hayotingda kichik bir voqea bor, u sening qarashingni butunlay o'zgartirgan. Nima bo'lgan edi?" },
  { id: "jp2", theme: "qiyinchilik", prompt: "Eng qiyin bo'lgan paytda nima seni davom etishga majburlagan?" },
  { id: "jp3", theme: "qiziqish", prompt: "Hech kim sendan so'ramagan savolni o'zing uchun hal qilganmisan? Qaysi savol edi?" },
  { id: "jp4", theme: "jamoa", prompt: "Jamoada ishlaganingda, odatda qanday rol o'ynaysan va nega aynan shu rol?" },
  { id: "jp5", theme: "qadriyat", prompt: "Oilangdan olgan qaysi qadriyat bugungi qarorlaringga ta'sir qiladi?" },
  { id: "jp6", theme: "xato", prompt: "Katta xato qilib, undan nimani o'rgangansan?" },
  { id: "jp7", theme: "kelajak", prompt: "10 yildan keyin qanday muammoni hal qilgan bo'lishni xohlaysan?" },
  { id: "jp8", theme: "muhit", prompt: "Shahring/mahallang seni qanday shakllantirgan - buni kam odam payqaydi?" },
];

export const quizzes: QuizDef[] = [
  {
    slug: "arketip",
    title: "Abituriyent arketipi testi",
    description:
      "12 savol orqali sening ariza beruvchi sifatida kuchli tomoningni aniqlaymiz - bu insho mavzusini va qaysi mentordan maslahat olishni tanlashga yordam beradi.",
    questions: [
      {
        id: "a1",
        order: 1,
        prompt: "Bo'sh vaqtingda ko'pincha nima qilasan?",
        type: "single",
        options: [
          { value: "research", label: "Qiziqtirgan mavzuni chuqur o'rganaman", weights: { tadqiqotchi: 3 } },
          { value: "organize", label: "Klub yoki tadbir tashkil qilaman", weights: { tashkilotchi: 3, yetakchi: 2 } },
          { value: "make", label: "Qo'lim bilan biror narsa quraman yoki kod yozaman", weights: { texnolog: 3 } },
          { value: "create", label: "Rasm chizaman, yozaman yoki musiqa bilan shug'ullanaman", weights: { ijodkor: 3 } },
        ],
      },
      {
        id: "a2",
        order: 2,
        prompt: "Guruh loyihasida senga qaysi rol tabiiy keladi?",
        type: "single",
        options: [
          { value: "lead", label: "Rejani tuzib, hammani yo'naltiraman", weights: { yetakchi: 3 } },
          { value: "connect", label: "Odamlarni bir-biriga bog'layman", weights: { homiy: 3 } },
          { value: "detail", label: "Tafsilotlarni puxta qilib bajaraman", weights: { mukammalchi: 2 } },
          { value: "idea", label: "G'ayrioddiy g'oyalar taklif qilaman", weights: { kashfiyotchi: 3 } },
        ],
      },
      {
        id: "a3",
        order: 3,
        prompt: "Qaysi yutuq seni ko'proq quvontiradi?",
        type: "single",
        options: [
          { value: "medal", label: "Olimpiada yoki musobaqada medal", weights: { mukammalchi: 2, sportchi: 2 } },
          { value: "built", label: "Noldan ishga tushirgan loyiham o'sib ketishi", weights: { tashkilotchi: 3 } },
          { value: "helped", label: "Birovga haqiqatan yordam berganim", weights: { "faol-fuqaro": 3, homiy: 2 } },
          { value: "made", label: "Yaratgan narsam (kod, san'at, matn)", weights: { texnolog: 2, ijodkor: 2 } },
        ],
      },
      {
        id: "a4",
        order: 4,
        prompt: "Insho yozishda qaysi qism senga oson keladi?",
        type: "single",
        options: [
          { value: "narrative", label: "Voqeani hikoya qilib berish", weights: { hikoyachi: 3 } },
          { value: "argument", label: "Dalil va mantiq bilan isbotlash", weights: { tadqiqotchi: 2, mukammalchi: 1 } },
          { value: "voice", label: "O'z ovozim va uslubim bilan yozish", weights: { ijodkor: 3 } },
          { value: "struggle", label: "Hammasi qiyin, lekin his-tuyg'uni yetkazaman", weights: { "faol-fuqaro": 1, hikoyachi: 2 } },
        ],
      },
      {
        id: "a5",
        order: 5,
        prompt: "Maktabdan tashqari eng ko'p vaqt sarflagan faoliyating qaysi turga yaqin?",
        type: "single",
        options: [
          { value: "sport", label: "Sport yoki jismoniy mashg'ulot", weights: { sportchi: 3 } },
          { value: "volunteer", label: "Volontyorlik / jamoat ishlari", weights: { "faol-fuqaro": 3 } },
          { value: "club", label: "Fan to'garagi / olimpiada tayyorgarligi", weights: { tadqiqotchi: 2, mukammalchi: 2 } },
          { value: "mixed", label: "Bir nechtasi aralash - birini tanlay olmayman", weights: { "kop-qirrali": 3 } },
        ],
      },
      {
        id: "a6",
        order: 6,
        prompt: "Tanlovlarni qanday qabul qilasan?",
        type: "single",
        options: [
          { value: "data", label: "Ma'lumot va dalillarga tayanib", weights: { tadqiqotchi: 2, mukammalchi: 1 } },
          { value: "gut", label: "Ichki hissiyot va qiziqish asosida", weights: { kashfiyotchi: 2, ijodkor: 1 } },
          { value: "team", label: "Boshqalarga qanday ta'sir qilishini o'ylab", weights: { homiy: 2, "faol-fuqaro": 1 } },
          { value: "plan", label: "Aniq reja va bosqichlar bo'yicha", weights: { tashkilotchi: 2, mukammalchi: 1 } },
        ],
      },
    ],
  },
  {
    slug: "moslik",
    title: "Dasturga moslik testi",
    description:
      "14 savol asosida senga mos universitet/dastur turi, davlat va muhitni aniqlaymiz - reach/target/safety bo'yicha tartiblangan.",
    questions: [
      {
        id: "m1",
        order: 1,
        prompt: "Qanday o'quv muhitida yaxshi ishlaysan?",
        type: "single",
        options: [
          { value: "structured", label: "Aniq dastur va talablar bo'lgan", weights: { structure: 3 } },
          { value: "flexible", label: "O'zim fan tanlab, erkin o'quvchi", weights: { structure: -2 } },
        ],
      },
      {
        id: "m2",
        order: 2,
        prompt: "Qaysi shahar/kampus hayoti senga yoqadi?",
        type: "single",
        options: [
          { value: "big_city", label: "Katta, jonli metropolis", weights: { urban: 3 } },
          { value: "campus_town", label: "Kichik, yashil kampus shahar", weights: { urban: -2 } },
        ],
      },
      {
        id: "m3",
        order: 3,
        prompt: "Narx-sifat masalasida qaysi gap senga yaqin?",
        type: "single",
        options: [
          { value: "full_funding", label: "Faqat to'liq grant/moliyalashtirish variantlari qiziqtiradi", weights: { fundingSensitive: 3 } },
          { value: "some_cost", label: "Qisman xarajatni ko'tarishga tayyorman", weights: { fundingSensitive: -1 } },
        ],
      },
      {
        id: "m4",
        order: 4,
        prompt: "Qaysi yo'nalish senga yaqinroq?",
        type: "single",
        options: [
          { value: "stem", label: "Muhandislik / IT / tabiiy fanlar", weights: { stem: 3 } },
          { value: "social", label: "Ijtimoiy fanlar / biznes / gumanitar", weights: { stem: -2 } },
        ],
      },
      {
        id: "m5",
        order: 5,
        prompt: "Tilga munosabating qanday?",
        type: "single",
        options: [
          { value: "english_ready", label: "Ingliz tilida bemalol o'qiy olaman", weights: { englishReady: 3 } },
          { value: "need_prep", label: "Hali tilni mustahkamlashim kerak", weights: { englishReady: -2 } },
        ],
      },
      {
        id: "m6",
        order: 6,
        prompt: "Qo'llab-quvvatlash borasida nima muhim?",
        type: "single",
        options: [
          { value: "high_support", label: "Kuchli mentor/maslahatchi tizimi", weights: { supportNeed: 3 } },
          { value: "independent", label: "Mustaqil harakat qilishni afzal ko'raman", weights: { supportNeed: -2 } },
        ],
      },
    ],
  },
  {
    slug: "grant",
    title: "Grant va stipendiya testi",
    description:
      "10 savol orqali qaysi milliy, davlat, mintaqaviy yoki yo'nalish bo'yicha grantlarga mos kelishingni aniqlaymiz - muddatlari bo'yicha tartiblanadi.",
    questions: [
      {
        id: "g1",
        order: 1,
        prompt: "Qaysi davlatda o'qishni ko'proq ko'zlaysan?",
        type: "single",
        options: [
          { value: "usa", label: "AQSh", weights: { usa: 3 } },
          { value: "uk", label: "Buyuk Britaniya", weights: { uk: 3 } },
          { value: "eu", label: "Yevropa (DAAD, Erasmus+)", weights: { eu: 3 } },
          { value: "korea", label: "Janubiy Koreya", weights: { korea: 3 } },
          { value: "local", label: "O'zbekistonda, lekin xalqaro dastur orqali", weights: { local: 3 } },
        ],
      },
      {
        id: "g2",
        order: 2,
        prompt: "Oilaviy moliyaviy ahvolni qanday baholaysan?",
        type: "single",
        sensitive: true,
        options: [
          { value: "low", label: "Ehtiyoj yuqori - to'liq grant zarur", weights: { needBased: 3 } },
          { value: "medium", label: "O'rtacha - qisman yordam kifoya", weights: { needBased: 1 } },
          { value: "high", label: "Xarajatni asosan o'zim ko'tara olaman", weights: { needBased: -2 } },
        ],
      },
      {
        id: "g3",
        order: 3,
        prompt: "Akademik ko'rsatkichlaring qanday?",
        type: "single",
        options: [
          { value: "top", label: "Yuqori GPA / olimpiada g'olibi", weights: { meritBased: 3 } },
          { value: "good", label: "Yaxshi, lekin alohida ajralib turmaydi", weights: { meritBased: 1 } },
        ],
      },
      {
        id: "g4",
        order: 4,
        prompt: "Qaysi faoliyat senga yaqin?",
        type: "single",
        options: [
          { value: "stem", label: "STEM / texnologiya", weights: { stemInterest: 3 } },
          { value: "social", label: "Ijtimoiy soha / jamoat ishlari", weights: { socialInterest: 3 } },
          { value: "arts", label: "San'at / ijod", weights: { artsInterest: 3 } },
        ],
      },
      {
        id: "g5",
        order: 5,
        prompt: "Hozir qaysi bosqichdasan?",
        type: "single",
        options: [
          { value: "school", label: "Maktab/litsey o'quvchisiman", weights: { stageEarly: 3 } },
          { value: "applicant", label: "Shu yil ariza topshiraman", weights: { stageLate: 3 } },
          { value: "student", label: "Allaqachon talabaman, almashinuv izlayman", weights: { stageExchange: 3 } },
        ],
      },
    ],
  },
];

export const schools: School[] = [
  {
    id: "sch_elyurt",
    slug: "el-yurt-umidi",
    name: "El-Yurt Umidi jamg'armasi",
    kind: "scholarship_program",
    country: "Xalqaro",
    description:
      "O'zbekiston fuqarolari uchun xorijning yetakchi universitetlarida magistratura/doktorantura bosqichida o'qishni to'liq moliyalashtiruvchi davlat jamg'armasi.",
    tags: ["davlat granti", "magistratura", "doktorantura"],
    deadlines: [{ round: "regular", label: "Yillik qabul", date: "2027-02-15" }],
    featured: true,
  },
  {
    id: "sch_fulbright",
    slug: "fulbright",
    name: "Fulbright dasturi",
    kind: "scholarship_program",
    country: "AQSh",
    description:
      "AQSh hukumati tomonidan moliyalashtiriladigan, dunyo bo'yicha eng nufuzli akademik almashinuv dasturlaridan biri - magistratura va tadqiqot dasturlari uchun.",
    tags: ["AQSh", "to'liq grant", "magistratura"],
    deadlines: [{ round: "regular", label: "Asosiy muddat", date: "2027-05-01" }],
    featured: true,
  },
  {
    id: "sch_chevening",
    slug: "chevening",
    name: "Chevening stipendiyasi",
    kind: "scholarship_program",
    country: "Buyuk Britaniya",
    description:
      "Britaniya Tashqi ishlar vazirligi dasturi - kelajakdagi liderlar uchun Buyuk Britaniyada bir yillik magistratura ta'limini to'liq qamrab oladi.",
    tags: ["UK", "to'liq grant", "liderlik"],
    deadlines: [{ round: "regular", label: "Asosiy muddat", date: "2026-11-05" }],
  },
  {
    id: "sch_daad",
    slug: "daad",
    name: "DAAD stipendiyasi",
    kind: "scholarship_program",
    country: "Germaniya",
    description:
      "Germaniya akademik almashinuv xizmati - muhandislik, tabiiy fanlar va ijtimoiy fanlar bo'yicha magistratura/doktorantura grantlari.",
    tags: ["Germaniya", "STEM", "magistratura"],
    deadlines: [{ round: "regular", label: "Yo'nalishga qarab", date: "2027-01-15" }],
  },
  {
    id: "sch_gks",
    slug: "gks-korea",
    name: "Global Korea Scholarship (GKS)",
    kind: "scholarship_program",
    country: "Janubiy Koreya",
    description:
      "Koreya ta'lim vazirligi dasturi - bakalavr va magistratura darajasida til tayyorgarligi bilan birga to'liq grant taqdim etadi.",
    tags: ["Koreya", "bakalavr", "magistratura"],
    deadlines: [{ round: "regular", label: "Elchixona bosqichi", date: "2027-03-01" }],
  },
  {
    id: "sch_erasmus",
    slug: "erasmus-plus",
    name: "Erasmus+ Mundus",
    kind: "scholarship_program",
    country: "Yevropa Ittifoqi",
    description:
      "Bir nechta Yevropa universitetida birgalikda o'qitiladigan qo'shma magistratura dasturlari uchun EI granti.",
    tags: ["EU", "qo'shma dastur", "magistratura"],
    deadlines: [{ round: "regular", label: "Konsorsiumga qarab", date: "2027-01-10" }],
  },
  {
    id: "sch_mit",
    slug: "mit",
    name: "MIT",
    kind: "university",
    country: "AQSh",
    city: "Cambridge, MA",
    description: "Texnologiya va muhandislik bo'yicha dunyodagi yetakchi universitetlardan biri.",
    tags: ["STEM", "tadqiqot"],
    deadlines: [
      { round: "early", label: "Erta qabul (EA)", date: "2026-11-01" },
      { round: "regular", label: "Umumiy qabul", date: "2027-01-01" },
    ],
    featured: true,
  },
  {
    id: "sch_oxford",
    slug: "oxford",
    name: "Oxford universiteti",
    kind: "university",
    country: "Buyuk Britaniya",
    city: "Oxford",
    description: "Dunyodagi eng qadimgi va nufuzli universitetlardan biri, keng tutorial tizimi bilan.",
    tags: ["tutorial tizim", "gumanitar", "STEM"],
    deadlines: [{ round: "early", label: "UCAS muddati", date: "2026-10-15" }],
  },
  {
    id: "sch_ethz",
    slug: "eth-zurich",
    name: "ETH Zurich",
    kind: "university",
    country: "Shveytsariya",
    city: "Zurich",
    description: "Yevropada muhandislik va tabiiy fanlar bo'yicha eng yuqori reytingli universitet.",
    tags: ["STEM", "muhandislik"],
    deadlines: [{ round: "regular", label: "Bakalavr qabul", date: "2027-04-30" }],
  },
  {
    id: "sch_snu",
    slug: "snu",
    name: "Seoul National University",
    kind: "university",
    country: "Janubiy Koreya",
    city: "Seul",
    description: "Koreyaning yetakchi davlat universiteti, xalqaro talabalar uchun kuchli dasturlar bilan.",
    tags: ["STEM", "biznes"],
    deadlines: [{ round: "regular", label: "Xalqaro talabalar qabuli", date: "2026-12-10" }],
  },
  {
    id: "sch_nu",
    slug: "nazarbayev-university",
    name: "Nazarbayev University",
    kind: "university",
    country: "Qozog'iston",
    city: "Astana",
    description: "Mintaqadagi yetakchi tadqiqot universiteti, ko'plab yo'nalishlarda grant imkoniyatlari bilan.",
    tags: ["mintaqaviy", "STEM", "biznes"],
    deadlines: [{ round: "regular", label: "Umumiy qabul", date: "2027-03-01" }],
  },
  {
    id: "sch_wiut",
    slug: "wiut",
    name: "Westminster International University in Tashkent",
    kind: "university",
    country: "O'zbekiston",
    city: "Toshkent",
    description: "Britaniya diplomi beradigan, Toshkentdagi xalqaro universitet.",
    tags: ["biznes", "IT", "mahalliy"],
    deadlines: [{ round: "rolling", label: "Davomiy qabul", date: "2027-08-01" }],
  },
  {
    id: "sch_inha",
    slug: "inha-tashkent",
    name: "INHA University in Tashkent",
    kind: "university",
    country: "O'zbekiston",
    city: "Toshkent",
    description: "Koreya INHA universitetining Toshkentdagi filiali, IT va muhandislik yo'nalishlari bilan.",
    tags: ["IT", "muhandislik", "mahalliy"],
    deadlines: [{ round: "rolling", label: "Davomiy qabul", date: "2027-07-15" }],
  },
];

export const scholarships: Scholarship[] = [
  {
    id: "grant_elyurt",
    slug: "el-yurt-umidi",
    name: "El-Yurt Umidi",
    type: "national",
    amountText: "To'liq (o'qish + yashash)",
    deadline: "2027-02-15",
    eligibility: ["O'zbekiston fuqaroligi", "Qabul qilingan dastur bo'lishi", "Vatanga qaytish majburiyati"],
    description: "Xorijda magistratura/doktoranturada o'qish uchun davlat granti.",
  },
  {
    id: "grant_fulbright",
    slug: "fulbright",
    name: "Fulbright",
    type: "national",
    amountText: "To'liq",
    deadline: "2027-05-01",
    eligibility: ["Bakalavr diplomi", "Ingliz tili (IELTS/TOEFL)", "Kamida 2 yillik ish/akademik tajriba"],
    description: "AQShda magistratura yoki tadqiqot dasturi uchun to'liq grant.",
  },
  {
    id: "grant_chevening",
    slug: "chevening",
    name: "Chevening",
    type: "national",
    amountText: "To'liq",
    deadline: "2026-11-05",
    eligibility: ["Kamida 2 yillik ish tajribasi", "Liderlik salohiyati"],
    description: "Buyuk Britaniyada bir yillik magistratura uchun to'liq grant.",
  },
  {
    id: "grant_need_based",
    slug: "ehtiyojga-asoslangan-fond",
    name: "Ehtiyojga asoslangan yordam fondi (namuna)",
    type: "need_based",
    amountText: "Yillik $3,000-$8,000",
    deadline: "2027-03-01",
    eligibility: ["Oilaviy daromad past", "Akademik ko'rsatkich qoniqarli"],
    description: "Moliyaviy ehtiyoji yuqori talabalar uchun qisman yordam (namunaviy yozuv, haqiqiy fondlarga almashtiring).",
  },
  {
    id: "grant_stem_women",
    slug: "stem-qizlar-granti",
    name: "STEMda qizlar uchun grant (namuna)",
    type: "interest_based",
    amountText: "$1,500 bir martalik",
    deadline: "2027-04-10",
    eligibility: ["Ayol abituriyent", "STEM yo'nalishi"],
    description: "Muhandislik/IT yo'naliishini tanlagan qizlar uchun kichik grant (namunaviy yozuv).",
  },
  {
    id: "grant_regional_samarqand",
    slug: "mintaqaviy-grant",
    name: "Mintaqaviy iste'dodlar granti (namuna)",
    type: "regional",
    amountText: "$1,000 bir martalik",
    deadline: "2027-02-20",
    eligibility: ["Viloyat maktablarida o'qigan", "Yuqori akademik ko'rsatkich"],
    description: "Poytaxtdan tashqari hududlardagi iste'dodli o'quvchilarni qo'llab-quvvatlash (namunaviy yozuv).",
  },
  {
    id: "grant_wiut_merit",
    slug: "wiut-merit",
    name: "WIUT akademik chegirmasi",
    type: "school_specific",
    amountText: "O'qish to'lovidan 25-100% chegirma",
    deadline: "2027-08-01",
    eligibility: ["WIUTga qabul qilingan", "Kirish test natijasi yuqori"],
    description: "WIUT tomonidan eng yuqori ball to'plagan abituriyentlarga beriladigan chegirma.",
  },
];

export const lessons: Lesson[] = [
  { id: "l1", slug: "nega-xorijda-oqish", order: 1, zone: 1, category: "discovery", title: "Nega xorijda o'qish?", summary: "Maqsadingni aniqlash bilan boshlaymiz.", body: "Bu darsda nima uchun xorijda yoki grant orqali o'qishni xohlashingni yozib chiqasan - bu keyingi barcha tanlovlarga asos bo'ladi.", isFree: true },
  { id: "l2", slug: "arketipni-aniqlash", order: 2, zone: 1, category: "discovery", title: "O'z arketipingni top", summary: "Arketip testini yakunlash.", body: "Arketip testi natijasi bo'yicha qaysi hikoyalar senga ko'proq mos kelishini ko'rib chiqamiz.", isFree: true },
  { id: "l3", slug: "royxat-tuzish", order: 3, zone: 1, category: "list_building", title: "Dastlabki ro'yxatni tuz", summary: "3-6 dastur/universitetni tanla.", body: "Reach, target va safety toifalariga kamida bittadan dastur qo'shamiz.", isFree: true },
  { id: "l4", slug: "muddatlar-xaritasi", order: 4, zone: 1, category: "list_building", title: "Muddatlar xaritasini chiq", summary: "Har bir dastur muddatini belgilash.", body: "Ro'yxatingdagi har bir dastur uchun muddatni ko'rib, taqvimga tushuramiz.", isFree: true },
  { id: "l5", slug: "faoliyatlar-royxati", order: 5, zone: 2, category: "activities", title: "Faoliyatlar ro'yxatini boshla", summary: "Birinchi 3 faoliyatni qo'sh.", body: "Eng muhim 3 faoliyatingni yoz - rol, davomiylik va natijani aniq ko'rsat.", isFree: true },
  { id: "l6", slug: "faoliyat-kuchaytirish", order: 6, zone: 2, category: "activities", title: "Faoliyatni qanday kuchaytirish", summary: "Har bir yozuvni yaxshilash.", body: "Raqamlar va natija bilan har bir faoliyat yozuvini kuchaytiramiz.", isFree: true },
  { id: "l7", slug: "kundalik-boshlash", order: 7, zone: 2, category: "essays", title: "Kundalik yozishni boshla", summary: "Birinchi kundalik yozuvi.", body: "Hikoyalar topish uchun kundalik savollariga javob yoza boshlaymiz.", isFree: true },
  { id: "l8", slug: "mavzu-topish", order: 8, zone: 2, category: "essays", title: "Insho mavzusini top", summary: "Kundaliklardan mavzu ajratish.", body: "Yozganlaring orasidan qaysi hikoya eng kuchli ekanini aniqlaymiz.", isFree: true },
  { id: "l9", slug: "birinchi-qoralama", order: 9, zone: 3, category: "essays", title: "Birinchi qoralamani yoz", summary: "To'liq birinchi versiya.", body: "Mukammal bo'lishi shart emas - birinchi marta boshdan oxirigacha yozib chiqamiz.", isFree: true },
  { id: "l10", slug: "qoralama-tahlili", order: 10, zone: 3, category: "essays", title: "Qoralamani tahlil qil", summary: "AI/mentor fikrini oling.", body: "Yozganing bo'yicha grammatika, mantiq va hikoya kuchini baholaymiz.", isFree: true },
  { id: "l11", slug: "tavsiyanoma-royxati", order: 11, zone: 3, category: "recs", title: "Tavsiyanoma beradiganlar ro'yxati", summary: "2-3 o'qituvchini tanla.", body: "Kimdan tavsiyanoma so'rashni va qanday so'rashni rejalashtiramiz.", isFree: false },
  { id: "l12", slug: "brag-sheet", order: 12, zone: 3, category: "recs", title: "Brag sheet tayyorlash", summary: "O'qituvchiga yordam varaqasi.", body: "O'qituvchi tezroq va kuchliroq tavsiyanoma yoza olishi uchun qisqa ma'lumot varaqasini tuzamiz.", isFree: false },
  { id: "l13", slug: "grant-mosligi", order: 13, zone: 4, category: "list_building", title: "Grantlarga mosligingni tekshir", summary: "Grant testini yakunlash.", body: "Grant testi natijalari bo'yicha senga mos stipendiyalarni muddatlari bilan ko'rib chiqamiz.", isFree: false },
  { id: "l14", slug: "ikkinchi-qoralama", order: 14, zone: 4, category: "essays", title: "Ikkinchi qoralama", summary: "Fikr-mulohaza asosida qayta yoz.", body: "Olingan fikrlar asosida inshoni qayta ishlaymiz - tarkib va ohangga e'tibor bilan.", isFree: false },
  { id: "l15", slug: "topshirishga-tayyorgarlik", order: 15, zone: 4, category: "submission", title: "Topshirishga tayyorgarlik", summary: "Yakuniy tekshiruv ro'yxati.", body: "Barcha hujjatlar, insholar va formalarni yakuniy marta tekshirib chiqamiz.", isFree: false },
];

export const institutionDemo: Institution = {
  id: "inst_demo",
  name: "Namuna akademik litsey",
  rosterCode: "DEMO-2027",
  plan: "pilot",
  seats: 120,
};

// --- Explicitly fictional placeholder content below. ---

export const caseStudies: CaseStudy[] = [
  {
    id: "cs1",
    slug: "dildora-inha",
    schoolId: "sch_inha",
    displayName: "Dildora (namuna)",
    title: "Robototexnika to'garagidan INHA Tashkentgacha",
    summary:
      "Maktab robototexnika to'garagini tashkil etgan Dildora, bu tajribasini IT yo'nalishidagi ariza uchun asosiy hikoyaga aylantirdi.",
    body: "Bu to'liq namunaviy keys-stadi matni - haqiqiy abituriyentlar qo'shilgandan so'ng shu formatda to'liq esse, statistika va strategiya joylashtiriladi.",
    tags: ["IT", "robototexnika", "tashkilotchilik"],
    acceptanceCount: 2,
    rating: 5,
    readCount: 0,
    isPlaceholder: true,
  },
  {
    id: "cs2",
    slug: "sardor-gks",
    schoolId: "sch_gks",
    displayName: "Sardor (namuna)",
    title: "GKS orqali Koreyada kompyuter fanlari",
    summary:
      "Viloyatdan bo'lgan Sardor til tayyorgarligi bosqichidan qanday o'tgani va nega aynan GKSni tanlagani haqida.",
    body: "Namunaviy keys-stadi matni.",
    tags: ["STEM", "til tayyorgarligi", "mintaqa"],
    acceptanceCount: 1,
    rating: 5,
    readCount: 0,
    isPlaceholder: true,
  },
  {
    id: "cs3",
    slug: "madina-chevening",
    schoolId: "sch_chevening",
    displayName: "Madina (namuna)",
    title: "Jurnalistikadan Cheveninggacha",
    summary: "Mahalliy gazetada ishlagan Madina qanday qilib liderlik tajribasini kuchli ariza qilib ko'rsatgani.",
    body: "Namunaviy keys-stadi matni.",
    tags: ["jurnalistika", "liderlik"],
    acceptanceCount: 1,
    rating: 5,
    readCount: 0,
    isPlaceholder: true,
  },
];

export const mentors: Mentor[] = [
  {
    id: "mn1",
    displayName: "Dildora (namuna)",
    schoolId: "sch_inha",
    classYear: 2026,
    archetypeSlug: "texnolog",
    tagline: "Robototexnika va IT arizalar bo'yicha so'rang",
    bio: "Namunaviy mentor profili - haqiqiy bitiruvchilar qo'shilgach shu formatda to'liq profil bo'ladi.",
    tags: ["IT", "robototexnika"],
    acceptanceCount: 2,
    rating: "new",
    priceRubies: 8,
    isPlaceholder: true,
  },
  {
    id: "mn2",
    displayName: "Sardor (namuna)",
    schoolId: "sch_gks",
    classYear: 2025,
    archetypeSlug: "mukammalchi",
    tagline: "GKS va til tayyorgarligi bo'yicha so'rang",
    bio: "Namunaviy mentor profili.",
    tags: ["Koreya", "til tayyorgarligi"],
    acceptanceCount: 1,
    rating: 5,
    priceRubies: 10,
    isPlaceholder: true,
  },
  {
    id: "mn3",
    displayName: "Madina (namuna)",
    schoolId: "sch_chevening",
    classYear: 2024,
    archetypeSlug: "yetakchi",
    tagline: "Chevening va liderlik insholari bo'yicha so'rang",
    bio: "Namunaviy mentor profili.",
    tags: ["liderlik", "jurnalistika"],
    acceptanceCount: 1,
    rating: 5,
    priceRubies: 10,
    isPlaceholder: true,
  },
];
