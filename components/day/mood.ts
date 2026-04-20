import type { DayMood } from "@/data/days";

export type MoodTokens = {
  /** gradient used as a subtle backdrop at the top of the day page */
  accentGradient: string;
  /** tone for the small uppercase eyebrow */
  eyebrow: string;
  /** tone for italic accents (quote, prompt) */
  quoteBorder: string;
};

/**
 * Very restrained tonal system. Moods only shift a few values, never the
 * overall layout — the point is a whisper, not a different design.
 */
export const MOOD: Record<DayMood, MoodTokens> = {
  soft: {
    accentGradient: "from-cream-50 via-blush-50 to-beige-100",
    eyebrow: "text-gold-600",
    quoteBorder: "border-gold-500/30",
  },
  playful: {
    accentGradient: "from-blush-50 via-blush-100 to-beige-200",
    eyebrow: "text-gold-600",
    quoteBorder: "border-blush-300/60",
  },
  nostalgic: {
    accentGradient: "from-beige-100 via-cream-100 to-blush-50",
    eyebrow: "text-gold-700",
    quoteBorder: "border-gold-500/40",
  },
  intimate: {
    accentGradient: "from-blush-100 via-blush-50 to-cream-100",
    eyebrow: "text-gold-700",
    quoteBorder: "border-blush-300/60",
  },
};
