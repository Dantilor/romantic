import "server-only";
import { cookies } from "next/headers";
import { parseStartCookie, START_COOKIE } from "./unlock";

/**
 * Read the per-user start timestamp out of the `rs_started_at` cookie.
 *
 * Returns `null` if the cookie is missing or malformed, which callers must
 * treat as "the journey hasn't started yet" (everything locked).
 *
 * Calling this in a server component opts the page into dynamic rendering,
 * which is intentional: unlock is personal and can't be prerendered.
 */
export function getUserStartDate(): Date | null {
  const raw = cookies().get(START_COOKIE)?.value;
  return parseStartCookie(raw);
}
