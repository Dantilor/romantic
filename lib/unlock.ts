import { TOTAL_DAYS } from "@/data/days";

/**
 * Day N is considered unlocked once `N - 1` full days have passed since
 * `START_DATE` (interpreted as local midnight). If `START_DATE` is not set,
 * all days are considered unlocked — convenient for development and preview.
 */
export function isDayUnlocked(day: number, now: Date = new Date()): boolean {
  if (!Number.isInteger(day) || day < 1 || day > TOTAL_DAYS) return false;

  const startRaw = process.env.START_DATE;
  if (!startRaw) return true;

  const start = new Date(`${startRaw}T00:00:00`);
  if (Number.isNaN(start.getTime())) return true;

  const dayMs = 24 * 60 * 60 * 1000;
  const elapsedDays = Math.floor((now.getTime() - start.getTime()) / dayMs);
  return elapsedDays >= day - 1;
}

export function unlockedCount(now: Date = new Date()): number {
  let count = 0;
  for (let d = 1; d <= TOTAL_DAYS; d++) if (isDayUnlocked(d, now)) count++;
  return count;
}
