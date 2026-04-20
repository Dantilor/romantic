/**
 * Single source of truth for all human-readable copy on the site.
 *
 * Edit this file to personalize the gift. Placeholders are kept neutral so
 * the site still reads well even before you fill in real content.
 *
 * Tokens in strings look like `{opened}` / `{total}` and are resolved at
 * render time via `formatSite()` below.
 */

export type SitePreviewCard = {
  eyebrow: string;
  title: string;
  body: string;
};

export type SiteContent = {
  /** Name you address her with. Leave empty to use a neutral "ты". */
  her: { name: string; diminutive?: string };
  /** Your signature, used on the final page if `final-letter.ts` omits it. */
  author: { name: string; signature: string };
  brand: { title: string; eyebrow: string };
  nav: {
    home: string;
    month: string;
    gallery: string;
    final: string;
    logout: string;
  };
  footer: { line: string; note: string };
  login: {
    eyebrow: string;
    title: string;
    subtitle: string;
    placeholderLabel: string;
    placeholder: string;
    submit: string;
    submitting: string;
    wrongPassword: string;
    genericError: string;
    networkError: string;
  };
  home: {
    eyebrow: string;
    heroTitleTop: string;
    heroTitleBottom: string;
    heroLead: string;
    ctaMonth: string;
    ctaGallery: string;
    /** "{opened} из {total}" */
    openedLine: string;
    onlyForUs: {
      eyebrow: string;
      title: string;
      body: string;
    };
    previews: [SitePreviewCard, SitePreviewCard, SitePreviewCard];
  };
  month: {
    /** "{opened} из {total}" */
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    subtitle: string;
    /** Shown in the lightbox when an item has no date. */
    noDateLabel: string;
  };
  day: {
    /** "{day} · из {total}" */
    eyebrow: string;
    memoryLabel: string;
    quoteLabel: string;
    promptLabel: string;
    lockedEyebrow: string;
    lockedTitle: string;
    lockedBody: string;
    lockedCta: string;
  };
  final: {
    waitingEyebrow: string;
    waitingTitle: string;
    waitingBody: string;
    /** "{opened} из {total}" */
    waitingProgress: string;
    backCta: string;
    unlockedEyebrow: string;
    unlockedTitle: string;
    recapEyebrow: string;
    /** "{passed} квиза пройдено · {chosen} из {total} выбрано" */
    recapMeta: string;
    recapEmpty: string;
    afterNoteEyebrow: string;
    afterNoteTitle: string;
    afterNoteBody: string;
  };
  buttons: {
    openQuiz: string;
    chooseDate: string;
    changeDate: string;
    keepThisDate: string;
    pickThisDate: string;
    backToMonth: string;
    toMonthShort: string;
    toSurprise: string;
    retryQuiz: string;
    seeResult: string;
    finishedQuizCta: string;
  };
  progress: {
    days: string;
    quizzes: string;
    dates: string;
  };
  weeklyCard: {
    /** "Конец {week}-й недели" */
    eyebrow: string;
    chosenLabel: string;
    chosenLine: string;
    passedNoChoiceLine: string;
  };
  quiz: {
    /** "Квиз · неделя {week}" */
    header: string;
    /** "вопрос {n}" */
    questionLabel: string;
    passedEyebrow: string;
    passedTitle: string;
    /** "{correct} из {total}." */
    passedBodyTemplate: string;
    passedBodyTail: string;
    failedEyebrow: string;
    failedTitle: string;
    /** "{correct} из {total}." */
    failedBodyTemplate: string;
    failedBodyTail: string;
    alreadyEyebrow: string;
    alreadyTitle: string;
    alreadyBody: string;
  };
  dateChoice: {
    /** "Свидание · неделя {week}" */
    header: string;
    pickTitle: string;
    pickSubtitle: string;
    chosenTitle: string;
    chosenSubtitle: string;
    gateEyebrow: string;
    gateTitle: string;
    gateBody: string;
    gateCta: string;
    cancelEdit: string;
  };
};

export const SITE: SiteContent = {
  her: { name: "" /* напр. "Аня". Оставь пустым, если без имени. */ },
  author: { name: "", signature: "Только твой" },

  brand: {
    title: "Для тебя",
    eyebrow: "Тихое место · только для нас",
  },

  nav: {
    home: "Начало",
    month: "Месяц",
    gallery: "Галерея",
    final: "Сюрприз",
    logout: "Выход",
  },

  footer: {
    line: "Для тебя — и только для тебя.",
    note: "Сделано с теплом",
  },

  login: {
    eyebrow: "Личное пространство",
    title: "Для тебя",
    subtitle:
      "Это маленькое место я собрал только для одного человека. Если это ты — ты знаешь слово.",
    placeholderLabel: "Слово",
    placeholder: "••••••••",
    submit: "Войти",
    submitting: "Открываю…",
    wrongPassword: "Не то слово. Попробуй ещё раз.",
    genericError: "Что-то пошло не так. Попробуем снова?",
    networkError: "Не удалось отправить. Проверь соединение.",
  },

  home: {
    eyebrow: "Тридцать дней · одна история",
    heroTitleTop: "Для тебя,",
    heroTitleBottom: "искренне и тепло",
    heroLead:
      "Каждый день — маленький шаг. Короткое письмо, одна фотография, одно воспоминание. В конце каждой недели — игра и пара идей, куда пойти вдвоём. А в самом конце — сюрприз.",
    ctaMonth: "Открыть наш месяц",
    ctaGallery: "Посмотреть галерею",
    openedLine: "Открыто дней: {opened} из {total}",
    onlyForUs: {
      eyebrow: "Только для нас",
      title: "Это место сделано для одного человека",
      body: "Здесь нет ни счётчиков, ни лент, ни чужих глаз. Только я, ты и тридцать тихих дней. Можно открывать по одному, без спешки.",
    },
    previews: [
      {
        eyebrow: "День за днём",
        title: "Маленькие письма",
        body: "Короткие записки, написанные для тебя. Одна в день — ровно столько, чтобы не спешить.",
      },
      {
        eyebrow: "Наши моменты",
        title: "Фотографии и воспоминания",
        body: "Тихие кадры, которые я не хочу забывать — и хочу, чтобы ты тоже иногда их перелистывала.",
      },
      {
        eyebrow: "Маленькие сюрпризы",
        title: "Игры и свидания",
        body: "В конце каждой недели я оставил для тебя короткую игру и две-три идеи, как провести вечер вдвоём.",
      },
    ],
  },

  month: {
    eyebrow: "Открыто {opened} из {total}",
    title: "Тридцать дней воспоминаний",
    subtitle:
      "Нажми на день, чтобы открыть его. Некоторые пока ждут своего часа — они откроются сами, когда придёт их время.",
  },

  gallery: {
    eyebrow: "Наши кадры",
    title: "Галерея",
    subtitle:
      "Тихие моменты, которые я не хочу забывать — чтобы ты тоже могла иногда перелистывать их.",
    noDateLabel: "наш день",
  },

  day: {
    eyebrow: "День {day} · из {total}",
    memoryLabel: "воспоминание",
    quoteLabel: "и, если коротко",
    promptLabel: "подумать вдвоём",
    lockedEyebrow: "День {day}",
    lockedTitle: "Ещё рано",
    lockedBody:
      "Этот день откроется в своё время. Загляни чуть позже — я обещаю, оно того стоит.",
    lockedCta: "Вернуться к месяцу",
  },

  final: {
    waitingEyebrow: "Страница тридцать первая",
    waitingTitle: "Ещё немного",
    waitingBody:
      "Наш финальный сюрприз ещё впереди. Эта страница раскроется, когда все тридцать дней будут прожиты — шаг за шагом.",
    waitingProgress: "Пройдено {opened} из {total}",
    backCta: "Вернуться к месяцу",
    unlockedEyebrow: "Страница тридцать первая",
    unlockedTitle: "Ну наконец-то",
    recapEyebrow: "наш короткий список",
    recapMeta: "{passed} квиза пройдено · {chosen} из {total} выбрано",
    recapEmpty: "Ни одно свидание пока не выбрано — ещё не поздно.",
    afterNoteEyebrow: "и это ещё не конец",
    afterNoteTitle: "В реальности тебя ждёт ещё кое-что",
    afterNoteBody:
      "Всё, что здесь — только начало. Настоящее я оставил не в экране. Скоро узнаешь.",
  },

  buttons: {
    openQuiz: "К нашей маленькой игре",
    chooseDate: "Выбрать наше свидание",
    changeDate: "Изменить выбор",
    keepThisDate: "Оставить этот",
    pickThisDate: "Выбрать это",
    backToMonth: "Вернуться к месяцу",
    toMonthShort: "К месяцу",
    toSurprise: "К сюрпризу",
    retryQuiz: "Попробовать ещё раз",
    seeResult: "Узнать результат",
    finishedQuizCta: "Пройти заново",
  },

  progress: {
    days: "Открыто дней",
    quizzes: "Наших игр пройдено",
    dates: "Свиданий выбрано",
  },

  weeklyCard: {
    eyebrow: "Конец {week}-й недели",
    chosenLabel: "твой выбор",
    chosenLine: "Ты уже выбрала наше свидание на эту неделю.",
    passedNoChoiceLine:
      "Ты прошла нашу маленькую игру. Осталось одно — выбрать, куда мы пойдём.",
  },

  quiz: {
    header: "Наша игра · неделя {week}",
    questionLabel: "вопрос {n}",
    passedEyebrow: "ты помнишь",
    passedTitle: "И правильно — почти всё",
    passedBodyTemplate: "{correct} из {total}.",
    passedBodyTail:
      " Как будто это была не игра, а напоминание, что мы правда видим друг друга.",
    failedEyebrow: "и это ничего",
    failedTitle: "Память — странная штука",
    failedBodyTemplate: "{correct} из {total}.",
    failedBodyTail:
      " Неважно. Мы создадим ещё много моментов — и запомним их вместе.",
    alreadyEyebrow: "уже сыграно",
    alreadyTitle: "Ты уже играла в эту игру",
    alreadyBody:
      "Можно пройти её ещё раз ради удовольствия — или сразу выбрать свидание этой недели.",
  },

  dateChoice: {
    header: "Свидание · неделя {week}",
    pickTitle: "Выбери наше свидание",
    pickSubtitle: "Несколько тихих идей. Любая — моя.",
    chosenTitle: "Ты уже выбрала",
    chosenSubtitle: "И я уже думаю, как сделать его хорошо.",
    gateEyebrow: "Неделя {week}",
    gateTitle: "Сначала — наша маленькая игра",
    gateBody:
      "Этот выбор я оставил тебе после короткой игры. Пройди её — и я всё открою.",
    gateCta: "К игре недели {week}",
    cancelEdit: "отменить изменение",
  },
};

/**
 * Tiny `{token}` templating. Used everywhere we need numbers in copy.
 */
export function formatSite(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in vars ? String(vars[key]) : "",
  );
}
