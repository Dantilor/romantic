/**
 * Content model for the 30 day cards.
 *
 * Все тексты и пути к фото лежат здесь. См. раздел README
 * "Куда вставлять личный контент" для пошагового гайда.
 *
 * ВАЖНО:
 * - Места в квадратных скобках `[...]` — это заглушки, которые ты
 *   заменяешь сам. Специально оставлены как есть, чтобы легко найти.
 * - `image` и `imageAlt` пока указывают на плейсхолдерные SVG
 *   в `/public/photos/p-1.svg ... p-6.svg`. Когда положишь свои
 *   фото, просто замени путь (см. README).
 */

export type DayMood = "soft" | "playful" | "nostalgic" | "intimate";
export type DayType = "message" | "memory" | "special";

/** Optional second letter on a day page. Paragraphs in `body` are separated by blank lines (`\n\n`). */
export type DayExtraSection = {
  title: string;
  body: string;
};

/** Warm mini-quest on a day page — local state only, no progress integration. */
export type DayExtraQuizQuestion = {
  id: string;
  question: string;
  options: string[];
};

export type DayExtraQuizSection = {
  title: string;
  /** Intro copy; use `\n\n` between paragraphs. */
  intro: string;
  questions: DayExtraQuizQuestion[];
  /** Shown after all questions are answered; use `\n` for soft line breaks. */
  finalText: string;
};

export type Day = {
  day: number;
  /** Short headline of the day (appears as <h1> on the day page). */
  title: string;
  /** The main body of the day — two or three sentences is perfect. */
  message: string;
  /** A single sentence shown under the photo as its caption. */
  memory: string;
  /** Public path, e.g. "/photos/days/01.jpg". */
  image: string;
  /** Accessibility description of the photo. */
  imageAlt: string;
  /** Subtle visual tone for the day page (see `components/day/mood.ts`). */
  mood: DayMood;
  /** Editorial kind — affects small affordances (eyebrow text, etc.). */
  type: DayType;
  /** Optional pulled quote, rendered as a quieter editorial aside. */
  optionalQuote?: string;
  /** Optional open question for her to sit with — shown last, very softly. */
  optionalPrompt?: string;
  /** Optional extra block (title + letter) after the main `message`. Rare; day 3 uses it. */
  extraSection?: DayExtraSection;
  /** Optional interactive mini-quest after `message` / `extraSection`. Day 4 uses it. */
  extraQuizSection?: DayExtraQuizSection;
};

/** Плейсхолдеры из репозитория. Заменяй в `image` у нужных дней. */
const PHOTOS = [
  "/photos/p-1.svg",
  "/photos/p-2.svg",
  "/photos/p-3.svg",
  "/photos/p-4.svg",
  "/photos/p-5.svg",
  "/photos/p-6.svg",
] as const;

/** Helper — циклически подставляет один из плейсхолдеров. */
const ph = (i: number) => PHOTOS[(i - 1) % PHOTOS.length];
/** Нейтральный alt — заменишь, когда положишь свои фото. */
const ALT = "Наш момент";

const AUTHORED: Day[] = [
  // ── НЕДЕЛЯ 1 — ТЁПЛОЕ НАЧАЛО ────────────────────────────────────────
  {
    day: 1,
    type: "message",
    mood: "soft",
    title: "Это место создано специально для тебя",
    message:
      "Я сделал это место, чтобы у нас было ещё одно «наше».",
    memory:
      "Сюда хорошо поставить фото, где вы просто рядом и никуда не спешите.",
    optionalPrompt:
      "Что ты вспоминаешь о нас первым — смех, голос, взгляд или ощущение?",
    image: "/photos/days/01.jpg",
    imageAlt: ALT,
  },
  {
    day: 2,
    type: "memory",
    mood: "soft",
    title: "Мне спокойно рядом с тобой",
    message:
      "В тебе есть что-то такое, что рядом с тобой не хочется играть роли, надевать маски — хочется просто быть собой.",
    memory: "[момент, где было легко и спокойно]",
    optionalQuote: "Иногда любовь — это не фейерверк, а чувство дома.",
    image: "/photos/days/02.jpg",
    imageAlt: ALT,
  },
  {
    day: 3,
    type: "message",
    mood: "playful",
    title: "Твоя улыбка умеет менять день",
    message:
      "Даже если день обычный, твоя улыбка делает его особенным. И, честно, я до сих пор на это ведусь.",
    memory: "Фото со смехом или чем-то неловко-милым.",
    optionalPrompt:
      "Какой наш момент тебе хочется пересматривать чаще всего?",
    image: "/photos/days/03.jpg",
    imageAlt: ALT,
    extraSection: {
      title: "Письмо для тебя",
      body: `Моя любимая

Я просто хочу сказать, как много ты для меня значишь. Каждый день с тобой это подарок, и я не могу представить свою жизнь без тебя. Ты наполняешь мои дни светом и радостью, и я так благодарен за твою любовь и поддержку.

Ты моя сладкая булочка, и я надеюсь, что смогу сделать тебя такой же счастливой, как ты делаешь меня.`,
    },
  },
  {
    day: 4,
    type: "memory",
    mood: "soft",
    title: "Мне нравится, какая ты в мелочах",
    message:
      "Не только в больших вещах. Мне нравится, как ты смотришь, как говоришь, как задумываешься, как смеёшься в неожиданный момент и как вредничаешь.",
    memory: "[какая-то маленькая привычка, которую ты в ней любишь]",
    image: "/photos/days/04.jpg",
    imageAlt: ALT,
    extraQuizSection: {
      title: "Маленький квест для тебя",
      intro:
        "Хочу сегодня не просто оставить тебе сообщение, а предложить маленькую игру.\n\nНичего сложного — всего несколько вопросов про нас, про тебя и про те мелочи, которые я особенно люблю.",
      questions: [
        {
          id: "q1",
          question: "Что я замечаю в тебе чаще всего?",
          options: [
            "Твой взгляд",
            "Твой смех",
            "То, как ты вредничаешь",
            "Всё сразу",
          ],
        },
        {
          id: "q2",
          question: "Какой наш формат счастья мне особенно нравится?",
          options: [
            "Когда мы просто рядом и никуда не спешим",
            "Спонтанные поездки",
            "Красивые выходы куда-то",
            "Любой, если ты рядом",
          ],
        },
        {
          id: "q3",
          question: "Что в тебе для меня самое особенное?",
          options: [
            "Твоя нежность",
            "Твоя искренность",
            "Твои мелочи",
            "Всё вместе",
          ],
        },
        {
          id: "q4",
          question: "Какой момент между нами я люблю особенно?",
          options: [
            "Когда мы смеёмся до слёз",
            "Когда просто молчим рядом",
            "Когда ты смотришь на меня по-особенному",
            "Все эти моменты",
          ],
        },
        {
          id: "q5",
          question: "Что делает тебя именно тобой для меня?",
          options: [
            "Твоя энергия",
            "Твои привычки и мелочи",
            "Твоя теплота",
            "Всё сразу",
          ],
        },
        {
          id: "q6",
          question: "Что мне хочется делать для тебя чаще?",
          options: [
            "Радовать тебя",
            "Обнимать тебя",
            "Удивлять тебя",
            "Всё вместе",
          ],
        },
        {
          id: "q7",
          question: "Какой ответ у этого квеста на самом деле правильный?",
          options: [
            "Первый",
            "Второй",
            "Третий",
            "Только один: мне нравится в тебе всё",
          ],
        },
      ],
      finalText:
        "Если честно, правильный ответ у меня только один:\nмне в тебе нравится всё.\n\nНо особенно — те маленькие детали, из которых складываешься именно ты.",
    },
  },
  {
    day: 5,
    type: "memory",
    mood: "nostalgic",
    title: "Один из моих любимых дней",
    message:
      "Я часто возвращаюсь мыслями к [день / встреча / прогулка]. Не потому что он был идеальным, а потому что в нём было настоящее «мы».",
    memory: "[краткое описание этого дня]",
    image: "/photos/days/05.jpg",
    imageAlt: ALT,
  },
  {
    day: 6,
    type: "message",
    mood: "soft",
    title: "Спасибо тебе за нежность",
    message:
      "Иногда мне кажется, что самые важные вещи в отношениях — это не громкие слова, а то, как человек умеет быть бережным. Спасибо тебе за это.",
    memory: "[добавь здесь короткую подпись к фото]",
    optionalQuote: "Бережность — тоже форма любви.",
    image: "/photos/days/06.jpg",
    imageAlt: ALT,
  },
  {
    day: 7,
    type: "special",
    mood: "nostalgic",
    title: "Наша первая маленькая неделя",
    message:
      "Первая неделя здесь — как первая маленькая глава. Хочу, чтобы она закончилась чем-то тёплым и только нашим.",
    memory: "Фото, где вы очень «парные».",
    optionalPrompt: "Готова к маленькому квизу про нас?",
    image: "/photos/days/07.jpg",
    imageAlt: ALT,
  },

  // ── НЕДЕЛЯ 2 — ВОСПОМИНАНИЯ И ПРИВЫЧКИ ──────────────────────────────
  {
    day: 8,
    type: "message",
    mood: "soft",
    title: "Ты стала частью моей повседневности",
    message:
      "Есть люди, которые просто появляются. А есть те, без которых день уже ощущается иначе. Ты для меня — именно такая.",
    memory:
      "Мне нравится, что даже самые обычные моменты рядом с тобой становятся для меня особенными.",
    image: "/photos/days/08.png",
    imageAlt: "Мы вместе зимой у машины в снегу",
    extraSection: {
      title: "Ещё немного для тебя",
      body: `Мне очень нравится это фото.

Оно какое-то настоящее — про нас, про наши моменты и про то, как мне хорошо рядом с тобой.

Я просто хочу, чтобы ты знала: даже самые обычные дни с тобой для меня важны.`,
    },
  },
  {
    day: 9,
    type: "message",
    mood: "intimate",
    title: "Мне нравится, как мы разговариваем",
    message:
      "Мне дорого, что с тобой можно и смеяться до слёз, и говорить серьёзно, и просто молчать без неловкости.",
    memory: "[добавь здесь короткую подпись к фото]",
    optionalQuote: "Свои люди узнаются по тишине тоже.",
    image: ph(9),
    imageAlt: ALT,
  },
  {
    day: 10,
    type: "memory",
    mood: "playful",
    title: "Про твой взгляд на мир",
    message:
      "Мне нравится, как ты замечаешь детали. Иногда кажется, что рядом с тобой мир становится красивее просто потому, что ты его так видишь. Ну, или смешно падаешь на ровном месте.",
    memory: "[её фраза / привычка / реакция, которая тебе запомнилась]",
    image: ph(10),
    imageAlt: ALT,
  },
  {
    day: 11,
    type: "memory",
    mood: "soft",
    title: "Про наш уют",
    message:
      "У меня есть любимый формат счастья: когда мы рядом, никуда не спешим, и даже обычный вечер становится важным — когда просто пялим в телек и объедаемся.",
    memory: "Фото из дома / машины / кафе.",
    image: ph(11),
    imageAlt: ALT,
  },
  {
    day: 12,
    type: "message",
    mood: "intimate",
    title: "Ты очень красивая для меня",
    message:
      "И не только «внешне». Но больше всего — в том, как в тебе сочетаются мягкость, сила и твоя особенная энергия.",
    memory: "[добавь здесь короткую подпись к фото]",
    optionalQuote:
      "Красота — это не только то, как человек выглядит. Это то, как рядом с ним чувствуется жизнь.",
    image: ph(12),
    imageAlt: ALT,
  },
  {
    day: 13,
    type: "memory",
    mood: "nostalgic",
    title: "Один вопрос к тебе",
    message:
      "Если бы можно было на один вечер снова прожить любой наш момент — какой бы ты выбрала?",
    memory: "[подводка к вашему квизу]",
    image: ph(13),
    imageAlt: ALT,
  },
  {
    day: 14,
    type: "special",
    mood: "nostalgic",
    title: "Вторая глава",
    message:
      "Уже две недели здесь, и мне нравится мысль, что это пространство понемногу наполняется нами.",
    memory: "[добавь здесь короткую подпись к фото]",
    optionalPrompt:
      "Давай проверим, как хорошо мы помним наши маленькие истории.",
    image: ph(14),
    imageAlt: ALT,
  },

  // ── НЕДЕЛЯ 3 — ГЛУБЖЕ И БЛИЖЕ ───────────────────────────────────────
  {
    day: 15,
    type: "message",
    mood: "intimate",
    title: "Мне нравится, как ты влияешь на меня",
    message:
      "С тобой я стал замечать в себе больше тепла, больше желания стараться, больше смысла в простых вещах.",
    memory: "[что-то, что изменилось в тебе благодаря отношениям]",
    image: ph(15),
    imageAlt: ALT,
  },
  {
    day: 16,
    type: "memory",
    mood: "playful",
    title: "Я люблю твои реакции",
    message:
      "То, как ты удивляешься, радуешься, обижаешься — ну это моментами, — смеёшься, стесняешься — всё это делает тебя для меня живой, настоящей и очень любимой.",
    memory: "Фото с искренней эмоцией.",
    image: ph(16),
    imageAlt: ALT,
  },
  {
    day: 17,
    type: "message",
    mood: "intimate",
    title: "Про доверие",
    message:
      "Для меня очень ценно, что между нами есть не только чувства, но и доверие. Это редкая, взрослая и очень красивая часть любви.",
    memory: "[добавь здесь короткую подпись к фото]",
    optionalQuote: "Доверие — это когда сердце не держит оборону.",
    image: ph(17),
    imageAlt: ALT,
  },
  {
    day: 18,
    type: "message",
    mood: "nostalgic",
    title: "Я бы хотел сохранить это надолго",
    message:
      "Некоторые вещи хочется просто прожить. А некоторые — сохранить, беречь и возвращаться к ним снова. То, что между нами, у меня именно в этой категории.",
    memory: "[добавь здесь короткую подпись к фото]",
    optionalPrompt: "Что в наших отношениях для тебя самое ценное?",
    image: ph(18),
    imageAlt: ALT,
  },
  {
    day: 19,
    type: "memory",
    mood: "intimate",
    title: "Про твою поддержку",
    message:
      "Спасибо тебе за моменты, когда ты рядом не потому, что всё идеально, а потому что ты просто остаёшься рядом.",
    memory: "[конкретный трудный момент, если хочешь добавить глубины]",
    image: ph(19),
    imageAlt: ALT,
  },
  {
    day: 20,
    type: "message",
    mood: "nostalgic",
    title: "Мне нравится мечтать с тобой",
    message:
      "В тебе есть что-то, с чем хочется строить планы — не потому что «надо», а потому что это ощущается правильно.",
    memory: "[ваша совместная мечта / поездка / идея]",
    image: ph(20),
    imageAlt: ALT,
  },
  {
    day: 21,
    type: "special",
    mood: "intimate",
    title: "Наша третья неделя",
    message:
      "Мне кажется, сейчас здесь уже не просто милые сообщения, а маленькая карта того, что я чувствую к тебе.",
    memory: "[добавь здесь короткую подпись к фото]",
    optionalPrompt: "Идём к следующему маленькому этапу?",
    image: ph(21),
    imageAlt: ALT,
  },

  // ── НЕДЕЛЯ 4 — ПРО НАСТОЯЩЕЕ И БУДУЩЕЕ ──────────────────────────────
  {
    day: 22,
    type: "message",
    mood: "intimate",
    title: "Ты — не случайность для меня",
    message:
      "Иногда в жизни появляются люди, с которыми сразу понимаешь: это не просто так. Это важно. У меня это ощущение про тебя.",
    memory: "[момент, когда ты понял, что всё серьёзно]",
    image: ph(22),
    imageAlt: ALT,
  },
  {
    day: 23,
    type: "memory",
    mood: "soft",
    title: "Мне нравится заботиться о тебе",
    message:
      "В любви мне очень нравится не только чувствовать, но и делать. Заботиться, придумывать, радовать, замечать.",
    memory: "Фото с маленьким сюрпризом / поездкой / подарком.",
    image: ph(23),
    imageAlt: ALT,
  },
  {
    day: 24,
    type: "message",
    mood: "soft",
    title: "В тебе есть сила",
    message:
      "Я хочу, чтобы ты всегда помнила: в тебе очень много света, красоты и силы, даже когда ты сама это недооцениваешь.",
    memory: "[добавь здесь короткую подпись к фото]",
    optionalQuote:
      "Иногда человеку просто нужен тот, кто напомнит ему, какой он на самом деле.",
    image: ph(24),
    imageAlt: ALT,
  },
  {
    day: 25,
    type: "message",
    mood: "intimate",
    title: "Если бы я описал тебя одним ощущением",
    message:
      "Ты для меня — про тепло, глубину и желание быть рядом чуть дольше, чем позволяет время.",
    memory: "[добавь здесь короткую подпись к фото]",
    optionalPrompt: "Каким одним словом ты бы описала нас?",
    image: ph(25),
    imageAlt: ALT,
  },
  {
    day: 26,
    type: "memory",
    mood: "nostalgic",
    title: "Про будущие воспоминания",
    message:
      "Мне нравится думать не только о том, что уже было, но и о том, сколько красивых моментов у нас ещё впереди.",
    memory: "[место, куда вы хотите поехать / что хотите сделать вместе]",
    image: ph(26),
    imageAlt: ALT,
  },
  {
    day: 27,
    type: "message",
    mood: "soft",
    title: "Спасибо, что ты есть",
    message:
      "Без пафоса. Просто спасибо тебе. За твоё присутствие, твою нежность, твою силу, твою искренность и за то, что ты есть в моей жизни.",
    memory: "Самое спокойное и красивое фото.",
    image: ph(27),
    imageAlt: ALT,
  },
  {
    day: 28,
    type: "special",
    mood: "nostalgic",
    title: "Последний маленький квиз",
    message:
      "Почти финал. Но перед ним хочу ещё раз остановиться и вспомнить, сколько всего у нас уже было.",
    memory: "[добавь здесь короткую подпись к фото]",
    optionalPrompt:
      "Готова к последней маленькой главе перед сюрпризом?",
    image: ph(28),
    imageAlt: ALT,
  },
  {
    day: 29,
    type: "message",
    mood: "nostalgic",
    title: "Почти у самой двери",
    message:
      "Мне нравится сама мысль, что ты дошла почти до конца этого месяца. Значит, ты прожила его вместе со мной — день за днём.",
    memory: "[добавь здесь короткую подпись к фото]",
    optionalQuote: "Самые красивые вещи не открываются сразу.",
    image: ph(29),
    imageAlt: ALT,
  },
  {
    day: 30,
    type: "special",
    mood: "intimate",
    title: "Для тебя — самое важное",
    message:
      "Всё, что было до этого, было дорогой сюда. И то, что я хочу сказать тебе сейчас, для меня правда важно.",
    memory: "Сюда лучше поставить одну из самых сильных ваших фотографий.",
    optionalPrompt: "Открой финальное письмо.",
    image: ph(30),
    imageAlt: ALT,
  },
];

export const TOTAL_DAYS = 30;

export const DAYS: Day[] = AUTHORED;

export function getDay(day: number): Day | null {
  if (!Number.isInteger(day) || day < 1 || day > TOTAL_DAYS) return null;
  return DAYS[day - 1] ?? null;
}
