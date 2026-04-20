/**
 * Client-side progress store (localStorage).
 *
 * Safe to import from anywhere: every mutation / read is a no-op on the server,
 * so components that call these helpers unconditionally will not crash during
 * SSR. React components still need to gate rendering on a "ready" flag to
 * avoid hydration mismatches — use `useProgress()` for that.
 *
 * Listeners can subscribe via the `PROGRESS_EVENT` CustomEvent on `window` or
 * via the native "storage" event (cross-tab). `saveProgress` dispatches both
 * channels automatically.
 */

export type ProgressState = {
  version: 1;
  openedDays: number[];
  passedQuizzes: number[];
  /** keys are week numbers, values are DateIdea.id */
  selectedDates: Record<number, string>;
  visitedFinal: boolean;
};

export const STORAGE_KEY = "rs_progress";
export const STORAGE_VERSION = 1 as const;
export const PROGRESS_EVENT = "rs:progress-change";

/** Days that end a week and have a quiz attached. */
export const QUIZ_DAYS = [7, 14, 21, 28] as const;
export type QuizDay = (typeof QUIZ_DAYS)[number];
export const TOTAL_QUIZZES = QUIZ_DAYS.length;

export function defaultProgress(): ProgressState {
  return {
    version: STORAGE_VERSION,
    openedDays: [],
    passedQuizzes: [],
    selectedDates: {},
    visitedFinal: false,
  };
}

function isClient(): boolean {
  return typeof window !== "undefined";
}

function sanitizeNumberArray(input: unknown): number[] {
  if (!Array.isArray(input)) return [];
  const out = new Set<number>();
  for (const v of input) {
    if (typeof v === "number" && Number.isInteger(v) && v > 0) out.add(v);
  }
  return [...out].sort((a, b) => a - b);
}

function sanitizeSelectedDates(input: unknown): Record<number, string> {
  if (!input || typeof input !== "object") return {};
  const out: Record<number, string> = {};
  for (const [rawKey, rawVal] of Object.entries(input as Record<string, unknown>)) {
    const key = Number(rawKey);
    if (!Number.isInteger(key) || key <= 0) continue;
    if (typeof rawVal !== "string" || rawVal.length === 0) continue;
    out[key] = rawVal;
  }
  return out;
}

function parse(raw: string | null): ProgressState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    if (parsed.version !== STORAGE_VERSION) return null;
    return {
      version: STORAGE_VERSION,
      openedDays: sanitizeNumberArray(parsed.openedDays),
      passedQuizzes: sanitizeNumberArray(parsed.passedQuizzes),
      selectedDates: sanitizeSelectedDates(parsed.selectedDates),
      visitedFinal: Boolean(parsed.visitedFinal),
    };
  } catch {
    return null;
  }
}

export function loadProgress(): ProgressState {
  if (!isClient()) return defaultProgress();
  try {
    return parse(window.localStorage.getItem(STORAGE_KEY)) ?? defaultProgress();
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(next: ProgressState): void {
  if (!isClient()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(
      new CustomEvent<ProgressState>(PROGRESS_EVENT, { detail: next }),
    );
  } catch {
    // storage blocked / full — silently ignore, the UI still works in-memory
  }
}

export function markDayOpened(day: number): void {
  if (!Number.isInteger(day) || day < 1) return;
  const s = loadProgress();
  if (s.openedDays.includes(day)) return;
  saveProgress({
    ...s,
    openedDays: [...s.openedDays, day].sort((a, b) => a - b),
  });
}

export function isDayOpened(day: number): boolean {
  return loadProgress().openedDays.includes(day);
}

export function markQuizPassed(week: number): void {
  if (!Number.isInteger(week) || week < 1) return;
  const s = loadProgress();
  if (s.passedQuizzes.includes(week)) return;
  saveProgress({
    ...s,
    passedQuizzes: [...s.passedQuizzes, week].sort((a, b) => a - b),
  });
}

export function isQuizPassed(week: number): boolean {
  return loadProgress().passedQuizzes.includes(week);
}

export function saveDateChoice(week: number, ideaId: string): void {
  if (!Number.isInteger(week) || week < 1) return;
  if (typeof ideaId !== "string" || ideaId.length === 0) return;
  const s = loadProgress();
  saveProgress({
    ...s,
    selectedDates: { ...s.selectedDates, [week]: ideaId },
  });
}

export function getDateChoice(week: number): string | null {
  return loadProgress().selectedDates[week] ?? null;
}

export function markVisitedFinal(): void {
  const s = loadProgress();
  if (s.visitedFinal) return;
  saveProgress({ ...s, visitedFinal: true });
}

export type CompletionStats = {
  daysOpened: number;
  totalDays: number;
  quizzesPassed: number;
  totalQuizzes: number;
  datesChosen: number;
  totalDates: number;
  allDone: boolean;
};

export function getCompletionStats(totalDays = 30): CompletionStats {
  const s = loadProgress();
  const daysOpened = s.openedDays.length;
  const quizzesPassed = s.passedQuizzes.length;
  const datesChosen = Object.keys(s.selectedDates).length;
  return {
    daysOpened,
    totalDays,
    quizzesPassed,
    totalQuizzes: TOTAL_QUIZZES,
    datesChosen,
    totalDates: TOTAL_QUIZZES,
    allDone:
      daysOpened >= totalDays &&
      quizzesPassed >= TOTAL_QUIZZES &&
      datesChosen >= TOTAL_QUIZZES,
  };
}

export function isQuizDay(day: number): day is QuizDay {
  return (QUIZ_DAYS as readonly number[]).includes(day);
}

/** Which week a quiz-day belongs to (day 7 -> 1, 14 -> 2, 21 -> 3, 28 -> 4). */
export function weekForQuizDay(day: number): number | null {
  if (!isQuizDay(day)) return null;
  return Math.floor((day - 1) / 7) + 1;
}
