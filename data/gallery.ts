export type GalleryItem = {
  id: string;
  /** Public path, e.g. "/photos/gallery/first-evening.jpg". */
  src: string;
  alt: string;
  /** Short caption shown under the card and inside the lightbox. */
  caption?: string;
  /** Free-form date string ("март 2024", "наше первое лето", ...). */
  date?: string;
  /** Optional location ("Петербург, набережная"). */
  location?: string;
  /** "portrait" renders taller in the masonry; "landscape" renders shorter. */
  orientation?: "portrait" | "landscape";
};

export const GALLERY: GalleryItem[] = [
  {
    id: "g-01",
    src: "/photos/p-1.svg",
    alt: "Тёплый вечер у окна",
    caption: "Вечер, который хотелось не заканчивать.",
    date: "наш первый вечер",
    orientation: "portrait",
  },
  {
    id: "g-02",
    src: "/photos/p-2.svg",
    alt: "Прогулка по набережной",
    caption: "Где-то между мостом и огнями.",
    date: "поздняя весна",
    location: "набережная",
    orientation: "landscape",
  },
  {
    id: "g-03",
    src: "/photos/p-3.svg",
    alt: "Утро на кухне",
    caption: "Запах кофе и никакой спешки.",
    date: "воскресенье",
    orientation: "portrait",
  },
  {
    id: "g-04",
    src: "/photos/p-4.svg",
    alt: "Закат с балкона",
    caption: "Свет, в котором ты особенно красивая.",
    date: "конец лета",
    orientation: "portrait",
  },
  {
    id: "g-05",
    src: "/photos/p-5.svg",
    alt: "Книжный магазин",
    caption: "Мы зашли на пять минут и пропали на два часа.",
    date: "ноябрь",
    orientation: "landscape",
  },
  {
    id: "g-06",
    src: "/photos/p-6.svg",
    alt: "Поезд и пейзаж за окном",
    caption: "Одно из наших маленьких путешествий.",
    date: "дорога",
    orientation: "portrait",
  },
  {
    id: "g-07",
    src: "/photos/p-1.svg",
    alt: "Руки с чашками чая",
    caption: "Тихое «всё хорошо» без слов.",
    date: "обычный вторник",
    orientation: "portrait",
  },
  {
    id: "g-08",
    src: "/photos/p-3.svg",
    alt: "Ночная улица",
    caption: "После кино, по дороге домой.",
    date: "зима",
    location: "домой пешком",
    orientation: "landscape",
  },
];
