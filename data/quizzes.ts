/**
 * Еженедельные квизы и идеи свиданий.
 *
 *  ┌─────────────────────────────────────────────────────────────────┐
 *  │ TODO (тебе): в квизах вопросы — это личные «я-утверждения».    │
 *  │ У них нет объективно правильного ответа. Я поставил            │
 *  │ `correct: 0` (т.е. «Да») для всех — это безопасный placeholder,│
 *  │ который держит compile и пропускает квиз при честных ответах.  │
 *  │ Если захочешь, поменяй `correct` на 1 («Нет») для тех утверж-  │
 *  │ дений, где ты хочешь дать ей «неожиданный» ответ, или вообще    │
 *  │ поменяй формулировку под собственную логику.                   │
 *  └─────────────────────────────────────────────────────────────────┘
 */

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  /** index of the correct option in `options` */
  correct: number;
};

export type DateIdea = {
  id: string;
  title: string;
  description: string;
};

export type Quiz = {
  week: number;
  /** The day after which this quiz unlocks (7, 14, 21, 28). */
  unlocksAfterDay: number;
  title: string;
  intro: string;
  questions: QuizQuestion[];
  dateIdeas: DateIdea[];
};

/** Стандартные варианты ответа для «я-утверждений». */
const YES_NO = ["Да", "Нет"] as const;
const asOptions = (): string[] => [...YES_NO];

export const QUIZZES: Quiz[] = [
  {
    week: 1,
    unlocksAfterDay: 7,
    title: "Как всё начиналось",
    intro: "Память иногда шалит, но это всё равно часть наших историй.",
    questions: [
      {
        id: "w1q1",
        question:
          "На первой встрече я волновался сильнее, чем показывал.",
        options: asOptions(),
        correct: 0, // TODO
      },
      {
        id: "w1q2",
        question:
          "Наше первое свидание длилось дольше, чем мы планировали.",
        options: asOptions(),
        correct: 0, // TODO
      },
      {
        id: "w1q3",
        question:
          "Мы сразу нашли тему, о которой могли говорить бесконечно.",
        options: asOptions(),
        correct: 0, // TODO
      },
      {
        id: "w1q4",
        question:
          "После одной из первых встреч я ещё долго думал о тебе.",
        options: asOptions(),
        correct: 0, // TODO
      },
      {
        id: "w1q5",
        question:
          "Уже в самом начале я понял, что ты не «просто человек».",
        options: asOptions(),
        correct: 0, // TODO
      },
    ],
    dateIdeas: [
      {
        id: "week1-botanical-coffee",
        title: "Аптекарский огород + кофе после прогулки",
        description:
          "Мягкий формат первого маленького приза: прогулка среди зелени, а потом уютный кофе вдвоём.",
      },
      {
        id: "week1-home-cinema",
        title: "Домашний киновечер только для нас",
        description:
          "Купить десерт, сделать плейлист и выбрать фильм, который хочется посмотреть именно вместе.",
      },
      {
        id: "week1-walk-gift",
        title: "Прогулка по красивому району + маленький подарок",
        description:
          "Патрики, Хамовники, Чистые пруды — или просто красивый вечерний маршрут с чем-то маленьким и личным в конце.",
      },
    ],
  },

  {
    week: 2,
    unlocksAfterDay: 14,
    title: "Наши привычки и мелочи",
    intro: "Самые важные вещи часто живут именно в мелочах.",
    questions: [
      {
        id: "w2q1",
        question:
          "Я знаю, какой твой взгляд означает «ну всё, я обиделась».",
        options: asOptions(),
        correct: 0, // TODO
      },
      {
        id: "w2q2",
        question:
          "У нас уже есть свои маленькие слова / шутки / фразы.",
        options: asOptions(),
        correct: 0, // TODO
      },
      {
        id: "w2q3",
        question: "Мы умеем молчать рядом без неловкости.",
        options: asOptions(),
        correct: 0, // TODO
      },
      {
        id: "w2q4",
        question:
          "У нас есть место или формат, который уже ощущается «нашим».",
        options: asOptions(),
        correct: 0, // TODO
      },
      {
        id: "w2q5",
        question: "Ты знаешь, чем меня можно быстро порадовать.",
        options: asOptions(),
        correct: 0, // TODO
      },
    ],
    dateIdeas: [
      {
        id: "week2-tretyakov-dinner",
        title: "Новая Третьяковка + поздний ужин",
        description:
          "Красивое взрослое свидание: сначала впечатления, потом спокойный вечер вдвоём.",
      },
      {
        id: "week2-creative-class",
        title: "Творческий мастер-класс",
        description:
          "Гончарный, рисование или что-то, что можно сделать вместе и потом сохранить как память.",
      },
      {
        id: "week2-book-date",
        title: "Книжное свидание",
        description:
          "Зайти в книжный, выбрать друг другу по книге и оставить внутри маленькую записку.",
      },
    ],
  },

  {
    week: 3,
    unlocksAfterDay: 21,
    title: "Что между нами сейчас",
    intro: "Некоторые ответы живут не в словах, а в ощущении рядом.",
    questions: [
      {
        id: "w3q1",
        question:
          "В наших отношениях есть не только чувства, но и доверие.",
        options: asOptions(),
        correct: 0, // TODO
      },
      {
        id: "w3q2",
        question: "Я чувствую, что рядом с тобой могу быть собой.",
        options: asOptions(),
        correct: 0, // TODO
      },
      {
        id: "w3q3",
        question:
          "Мне хочется строить с тобой планы, а не только жить моментом.",
        options: asOptions(),
        correct: 0, // TODO
      },
      {
        id: "w3q4",
        question: "Ты уже стала важной частью моей жизни.",
        options: asOptions(),
        correct: 0, // TODO
      },
      {
        id: "w3q5",
        question:
          "Я умею замечать, когда тебе особенно нужна нежность.",
        options: asOptions(),
        correct: 0, // TODO
      },
    ],
    dateIdeas: [
      {
        id: "week3-planetarium",
        title: "Московский планетарий",
        description:
          "Красивое и чуть волшебное свидание, которое ощущается как маленькое событие.",
      },
      {
        id: "week3-river-cruise",
        title: "Вечерний круиз по Москве-реке",
        description:
          "Вода, огни города и ощущение, что вечер идёт чуть медленнее, чем обычно.",
      },
      {
        id: "week3-outside-city",
        title: "Мини-поездка за город",
        description:
          "Уехать на полдня, взять кофе, плейлист и просто сменить картинку вместе.",
      },
    ],
  },

  {
    week: 4,
    unlocksAfterDay: 28,
    title: "Про нас дальше",
    intro: "Всё самое важное иногда только начинается.",
    questions: [
      {
        id: "w4q1",
        question:
          "Я хочу, чтобы у нас было ещё больше совместных воспоминаний.",
        options: asOptions(),
        correct: 0, // TODO
      },
      {
        id: "w4q2",
        question: "Мне нравится мечтать вместе с тобой.",
        options: asOptions(),
        correct: 0, // TODO
      },
      {
        id: "w4q3",
        question: "Я хочу продолжать удивлять и радовать тебя.",
        options: asOptions(),
        correct: 0, // TODO
      },
      {
        id: "w4q4",
        question:
          "Ты — человек, с которым мне хочется проживать красивую жизнь.",
        options: asOptions(),
        correct: 0, // TODO
      },
      {
        id: "w4q5",
        question:
          "Всё самое важное между нами ещё только набирает силу.",
        options: asOptions(),
        correct: 0, // TODO
      },
    ],
    dateIdeas: [
      {
        id: "week4-open-air-cinema",
        title: "Кино под открытым небом",
        description:
          "Неспешный красивый вечер, где важнее не сам фильм, а то, что мы там вместе.",
      },
      {
        id: "week4-special-dinner",
        title: "Особенный ужин-сюрприз",
        description:
          "Неважно где — дома, в ресторане или в красивом месте. Важно, что это будет наш вечер.",
      },
      {
        id: "week4-weekend-away",
        title: "Уикенд вне города",
        description:
          "Маленькая поездка, чтобы запомнить не только день, но и целый кусочек времени вдвоём.",
      },
    ],
  },
];

export function getQuizForDay(day: number): Quiz | null {
  return QUIZZES.find((q) => q.unlocksAfterDay === day) ?? null;
}

export function getQuizForWeek(week: number): Quiz | null {
  return QUIZZES.find((q) => q.week === week) ?? null;
}

export const TOTAL_WEEKS = QUIZZES.length;
