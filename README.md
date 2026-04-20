# Для тебя — романтический сайт-сюрприз

Закрытый личный сайт на Next.js: **секретная ссылка + пароль**, календарь
на 30 дней, еженедельные квизы, галерея с lightbox и финальное письмо.
Тёплая палитра (cream / blush / warm beige / soft gold), без базы данных —
весь контент и все тексты лежат в `data/*`.

## Стек

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Web Crypto (HMAC-подписанный cookie-сессионный токен)

## Запуск

```bash
# 1. Зависимости
npm install

# 2. Окружение
cp .env.example .env.local
# Windows PowerShell:
# Copy-Item .env.example .env.local

# 3. В .env.local:
#    SITE_PASSWORD=<пароль>
#    AUTH_SECRET=<длинная случайная строка>
#    SECRET_PATH=<секретный slug, например our-little-month>
#    START_DATE=YYYY-MM-DD  (опционально; без него все 30 дней открыты сразу)

# 4. Запуск
npm run dev
```

Сайт живёт по адресу вида `http://localhost:3000/${SECRET_PATH}` — напрямую
`http://localhost:3000/` отдаёт `404`, как будто никакого сайта нет. Это
нормально.

### Прод

```bash
npm run build
npm run start
```

## Как это защищено (два слоя)

1. **Секретный путь.** `middleware.ts` принимает запрос, только если он
   приходит по `/${SECRET_PATH}/...`. В этот момент ставится http-only
   cookie `rs_access`, и URL внутренне переписывается на чистый путь.
   После этого внутренняя навигация работает по коротким ссылкам
   (`/month`, `/day/3`, …). Без секретного пути и без cookie — сайт
   возвращает `404`.
2. **Пароль.** `POST /api/login` тайминг-безопасно сравнивает пароль с
   `SITE_PASSWORD`. При успехе ставит http-only cookie `rs_session` со
   значением `payload.signature`, где подпись — HMAC-SHA256 от payload
   секретом `AUTH_SECRET`. `middleware.ts` на Edge-runtime проверяет
   подпись и время жизни токена (60 дней). Без валидной куки — редирект
   на `/login?next=...`.

Поделиться сайтом = поделиться **секретной ссылкой** + **паролем**.

## Структура

```
app/
  layout.tsx              корневой layout, шрифты, Nav/Footer
  globals.css             Tailwind + фон
  page.tsx                / — главная: hero + "только для нас" + 3 превью
  login/                  страница входа (использует SITE.login из data/site.ts)
  month/page.tsx          /month — сетка 30 дней + ProgressSummary
  day/[day]/page.tsx      /day/N — страница дня (editorial, mood-акценты)
  quiz/week-N/page.tsx    /quiz/week-1..4 — квизы
  date-choice/week-N/     /date-choice/week-1..4 — выбор свидания
  gallery/page.tsx        /gallery — masonry + lightbox
  final/page.tsx          /final — живая страница, раскрывается после 30 дней
  api/login/route.ts      POST /api/login
  api/logout/route.ts     POST /api/logout
components/
  ui/                     базовые (Button, Container, Nav, Footer, ProgressSummary…)
  day/
    DayProgressTracker    client, отмечает день как просмотренный
    WeeklyMomentCard      CTA-блок в конце 7/14/21/28 дня
    mood.ts               токены mood→tone (soft/playful/nostalgic/intimate)
  quiz/QuizView.tsx       клиент квиза
  date-choice/            клиент выбора свидания
  gallery/
    GalleryGrid           клиент, masonry + управляет lightbox
    GalleryCard           карточка фото
    GalleryLightbox       модалка (Esc/←/→, клик по фону)
  month/MonthGrid.tsx     client-обёртка над серверной сеткой
  final/FinalProgressGate.tsx  ожидание → письмо
data/
  site.ts                 ВСЕ тексты интерфейса (nav, home, final, buttons…)
  final-letter.ts         финальное письмо: title, intro, 3–6 абзацев, signature
  days.ts                 30 дней: title/message/memory/image/mood/type/optionalQuote/optionalPrompt
  gallery.ts              элементы галереи (caption, date, location, orientation)
  quizzes.ts              квизы и идеи свиданий по неделям
hooks/useProgress.ts      реактивный hook поверх localStorage
lib/
  auth.ts                 HMAC-сессия, тайминг-безопасная проверка пароля
  cn.ts                   утилита склейки классов
  progress.ts             localStorage-слой прогресса
  unlock.ts               "открыт ли день N" по START_DATE
middleware.ts             секретный путь + проверка сессии
public/photos/            SVG-плейсхолдеры p-1…p-6 — заменяй на свои фото
tailwind.config.ts        палитра и шрифты
```

## Куда вставлять личный контент

Все тексты и фото собраны в четырёх местах. Никакой код трогать не нужно.

### 1. Имя, тексты навигации, главная — `data/site.ts`

- `SITE.her.name` — имя девушки (или оставь пустым).
- `SITE.author.name`, `SITE.author.signature` — твоя подпись (если хочешь).
- `SITE.home.heroTitleTop` / `…Bottom` / `heroLead` — главный экран.
- `SITE.home.onlyForUs.*` — блок «только для нас».
- `SITE.home.previews[0..2]` — три мини-карточки под hero (eyebrow/title/body).
- `SITE.nav.*`, `SITE.footer.*` — навигация и футер.
- `SITE.buttons.*`, `SITE.quiz.*`, `SITE.dateChoice.*` — кнопки и служебный
  текст, если захочешь сделать мягче. Можно трогать, можно не трогать.

### 2. Финальное письмо — `data/final-letter.ts`

- `FINAL_LETTER.title` — заголовок письма на финальной странице.
- `FINAL_LETTER.intro` — короткий курсивный лид.
- `FINAL_LETTER.paragraphs` — массив из 3–6 абзацев.
- `FINAL_LETTER.signature` — твоя подпись.
- `FINAL_LETTER.afterNote` — опциональный блок «и это ещё не конец».
- `FINAL_LETTER.cta` — опциональная кнопка под письмом.

### 3. Тридцать дней — `data/days.ts`

В массиве `AUTHORED` лежат заготовки для дней 1–6. Чтобы добавить
больше — дописывай элементы того же формата. Всё, чего в `AUTHORED`
нет, автоматически превращается в тихий нейтральный плейсхолдер.

Для одного дня:

```ts
{
  day: 10,
  title: "Заголовок дня",
  type: "memory",          // "message" | "memory" | "special"
  mood: "nostalgic",       // "soft" | "playful" | "nostalgic" | "intimate"
  message: "Основной текст на 2–3 предложения.",
  memory: "Короткая подпись под фото.",
  optionalQuote: "и, если коротко — вот так",    // опционально
  optionalPrompt: "над чем подумать вдвоём?",    // опционально
  image: "/photos/days/10.jpg",
  imageAlt: "Описание фото для доступности",
}
```

`mood` очень деликатно подкрашивает страницу дня — соответствующий
градиент за заголовком и цвет акцентов. Без цирка.

**Дни 7, 14, 21, 28** — особенные: это концы недель, к ним прикручены
квизы. Для них `type: "special"` и `WeeklyMomentCard` сам подставит CTA.

### 4. Квизы и свидания — `data/quizzes.ts`

- `QUIZZES[n].title` / `intro` — шапка недели.
- `QUIZZES[n].questions[]` — вопрос + варианты + индекс правильного (`correct`).
- `QUIZZES[n].dateIdeas[]` — 2–3 идеи свидания. У каждой есть стабильный
  `id` — его используют при сохранении выбора, не меняй его без
  необходимости.

### 5. Фото — `public/photos/`

Сейчас в репозитории лежат шесть SVG-заглушек `p-1.svg … p-6.svg`.
Когда будешь вставлять настоящие фотографии, рекомендую такую схему:

```
public/photos/
  days/01.jpg      # день 1 — landscape 4:3, ~1600×1200
  days/02.jpg
  ...
  days/30.jpg
  gallery/first-evening.jpg  # любой файл, имя — это slug
  gallery/walk-home.jpg
  ...
```

Форматы и размеры:

- **День** — `image: "/photos/days/01.jpg"`; рекомендую пропорции 4:3,
  ширина 1400–1800 px. `.webp` лучше по весу, `.jpg` — надёжнее.
- **Галерея** — `src: "/photos/gallery/slug.jpg"`; пропорции свободные.
  Для вертикальных фото ставь `orientation: "portrait"`, для
  горизонтальных — `"landscape"` (влияет на высоту плитки в masonry).
- **alt** — всегда заполняй: это и доступность, и подпись на случай
  ошибки загрузки.

Когда положил файл — просто обнови поле `image` / `src` в нужном
`data/*.ts`. Больше ничего не нужно.

### 6. Секретный путь — `.env.local`

```env
SITE_PASSWORD=Булочкин
AUTH_SECRET=<длинная случайная строка>
SECRET_PATH=our-little-month
```

После изменения `SECRET_PATH` ссылка сразу меняется — старую надо
перечитать. Держи `.env.local` вне git (уже в `.gitignore`).

## Прогресс и состояние

Клиентский прогресс хранится в `localStorage` через `lib/progress.ts`
и реактивный хук `hooks/useProgress`. Полноценная синхронизация между
вкладками через `storage`-событие + кастомный `PROGRESS_EVENT`.

Отслеживаются:

- `openedDays` — какие дни она открыла (ставится автоматически при заходе
  на `/day/N`, если день разблокирован по `START_DATE`).
- `passedQuizzes` — квизы, пройденные на ≥60%.
- `selectedDates` — выбранная идея свидания по неделям.
- `visitedFinal` — открывала ли она финал полностью.

## Следующие шаги (v3+)

- Гейт ответов квиза по `isDayUnlocked` соответствующей недели
  (сейчас любой прошедший логин может открыть `/quiz/week-4` напрямую).
- Серверный бэкап прогресса (например, через подписанный cookie).
- Экспорт/сброс прогресса из настроек.
- Анимация разблокировки очередного дня.
- A11y-полировка (focus-trap в lightbox, ARIA-метки).
