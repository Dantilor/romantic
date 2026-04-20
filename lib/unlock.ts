import { TOTAL_DAYS } from "@/data/days";

/**
 * Unlock logic. Two independent strategies live here:
 *
 *   1. Legacy env-based unlock (`START_DATE`): kept only for backwards
 *      compatibility and dev previews. Treats day 1 as "open on START_DATE"
 *      and adds one calendar day per day number.
 *
 *   2. Per-user unlock from first login: this is the primary strategy used
 *      by the site. Day N becomes available `(N - 1) * 24h` after the
 *      user's first successful login — whose timestamp is persisted in an
 *      http-only cookie (see `START_COOKIE`). Each visitor gets their own
 *      clock; no database required.
 *
 * This module stays intentionally dependency-free so it can be imported
 * from both server and client code. The cookie itself is read from a
 * server-only helper in `lib/unlock.server.ts`.
 */

export const START_COOKIE = "rs_started_at";
export const START_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 1 year

const DAY_MS = 24 * 60 * 60 * 1000;

/** Parse a value previously stored in `rs_started_at` into a Date (or null). */
export function parseStartCookie(raw: string | undefined | null): Date | null {
  if (!raw) return null;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * Day N is unlocked once `(N - 1) * 24h` have elapsed since `startedAt`.
 * If the user hasn't started yet (no cookie), nothing is open.
 */
export function isDayUnlockedFromUserStart(
  day: number,
  startedAt: Date | null,
  now: Date = new Date(),
): boolean {
  if (!Number.isInteger(day) || day < 1 || day > TOTAL_DAYS) return false;
  if (!startedAt) return false;
  const elapsed = now.getTime() - startedAt.getTime();
  return elapsed >= (day - 1) * DAY_MS;
}

export function unlockedCountFromUserStart(
  startedAt: Date | null,
  now: Date = new Date(),
): number {
  if (!startedAt) return 0;
  let count = 0;
  for (let d = 1; d <= TOTAL_DAYS; d++) {
    if (isDayUnlockedFromUserStart(d, startedAt, now)) count++;
  }
  return count;
}

/**
 * Legacy: day N unlocks `N - 1` calendar days after `process.env.START_DATE`.
 * If `START_DATE` is unset, everything is open — convenient for dev. This is
 * not used by the current pages; kept only in case an operator wants a
 * global start date override.
 */
export function isDayUnlocked(day: number, now: Date = new Date()): boolean {
  if (!Number.isInteger(day) || day < 1 || day > TOTAL_DAYS) return false;

  const startRaw = process.env.START_DATE;
  if (!startRaw) return true;

  const start = new Date(`${startRaw}T00:00:00`);
  if (Number.isNaN(start.getTime())) return true;

  const elapsedDays = Math.floor((now.getTime() - start.getTime()) / DAY_MS);
  return elapsedDays >= day - 1;
}

export function unlockedCount(now: Date = new Date()): number {
  let count = 0;
  for (let d = 1; d <= TOTAL_DAYS; d++) if (isDayUnlocked(d, now)) count++;
  return count;
}
