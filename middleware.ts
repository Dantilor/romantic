import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { START_COOKIE, START_COOKIE_MAX_AGE_SECONDS } from "@/lib/unlock";

/**
 * Two-layer gate:
 *
 *   layer 1 — SECRET_PATH: visitors must first arrive via `/${SECRET_PATH}/...`
 *             That URL sets an http-only access cookie and rewrites to the
 *             clean path (so the pretty URL stays in the browser). Without
 *             the cookie and without the secret prefix, the site returns 404
 *             — as if it doesn't exist.
 *
 *   layer 2 — password session: once past the secret gate, the normal
 *             `rs_session` cookie must be valid. `/login` is reachable from
 *             either the prefixed or bare path.
 *
 * On top of that, every authenticated request also ensures that the
 * `rs_started_at` cookie exists. Normally it is set by `/api/login` on the
 * first successful password check; this middleware branch only fires as a
 * safety net for sessions created before this feature existed, or for any
 * exotic flow that skipped the login route. It never overwrites an
 * existing value.
 */

const ACCESS_COOKIE = "rs_access";
const ACCESS_VALUE = "1";
const ACCESS_MAX_AGE_SECONDS = 60 * 60 * 24 * 90; // 90 days

function getSecretPath(): string | null {
  const raw = process.env.SECRET_PATH?.trim();
  if (!raw) return null;
  const cleaned = raw.replace(/^\/+|\/+$/g, "");
  return cleaned.length > 0 ? `/${cleaned}` : null;
}

function setAccessCookie(res: NextResponse): void {
  res.cookies.set({
    name: ACCESS_COOKIE,
    value: ACCESS_VALUE,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ACCESS_MAX_AGE_SECONDS,
  });
}

function setStartCookie(res: NextResponse, iso: string): void {
  res.cookies.set({
    name: START_COOKIE,
    value: iso,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: START_COOKIE_MAX_AGE_SECONDS,
  });
}

/**
 * Build a fresh `Headers` copy of the incoming request, optionally injecting
 * `rs_started_at=<iso>` into the `Cookie` header so downstream route
 * handlers see the seeded value on the current request (not just on the
 * next one, which is what the response `Set-Cookie` alone would guarantee).
 */
function buildForwardedHeaders(
  req: NextRequest,
  seededStart: string | null,
): Headers {
  const headers = new Headers(req.headers);
  if (!seededStart) return headers;
  const prev = headers.get("cookie") ?? "";
  const glue = prev.length > 0 ? "; " : "";
  headers.set(
    "cookie",
    `${prev}${glue}${START_COOKIE}=${encodeURIComponent(seededStart)}`,
  );
  return headers;
}

function notFound(): NextResponse {
  return new NextResponse(null, { status: 404 });
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const secretPrefix = getSecretPath();
  const hasAccess = req.cookies.get(ACCESS_COOKIE)?.value === ACCESS_VALUE;

  const isSecretEntry =
    secretPrefix !== null &&
    (pathname === secretPrefix || pathname.startsWith(`${secretPrefix}/`));

  // Compute the "effective" path for routing + auth logic.
  let effectivePath = pathname;
  let justGranted = false;

  if (isSecretEntry && secretPrefix) {
    effectivePath = pathname.slice(secretPrefix.length) || "/";
    justGranted = true;
  } else if (!hasAccess && secretPrefix !== null) {
    // Secret gate configured, but visitor hasn't shown the key.
    return notFound();
  }

  const sessionToken = req.cookies.get(SESSION_COOKIE)?.value;
  const authed = await verifySessionToken(sessionToken);

  // Only ever seed the start timestamp for an authenticated user who
  // somehow lacks it. `/api/login` is excluded from this middleware, so
  // the usual first-login path still owns primary seeding.
  const missingStart = authed && !req.cookies.get(START_COOKIE)?.value;
  const seededStart = missingStart ? new Date().toISOString() : null;

  // The login page: always reachable (once past the secret gate).
  if (effectivePath === "/login") {
    if (authed) {
      const url = req.nextUrl.clone();
      url.pathname = secretPrefix ? secretPrefix : "/";
      url.search = "";
      const res = NextResponse.redirect(url);
      if (justGranted) setAccessCookie(res);
      if (seededStart) setStartCookie(res, seededStart);
      return res;
    }

    if (isSecretEntry && secretPrefix) {
      const rewriteUrl = req.nextUrl.clone();
      rewriteUrl.pathname = "/login";
      const res = NextResponse.rewrite(rewriteUrl);
      if (justGranted) setAccessCookie(res);
      return res;
    }

    return NextResponse.next();
  }

  // Any other route: require a valid session.
  if (!authed) {
    const url = req.nextUrl.clone();
    // Redirect to login while preserving the pretty URL if we came via secret.
    url.pathname = secretPrefix ? `${secretPrefix}/login` : "/login";
    url.search = `?next=${encodeURIComponent(pathname + search)}`;
    const res = NextResponse.redirect(url);
    if (justGranted) setAccessCookie(res);
    return res;
  }

  // Authenticated. If the browser is on the secret URL, rewrite to the
  // clean path so Next can resolve the route file.
  if (isSecretEntry && secretPrefix) {
    const rewriteUrl = req.nextUrl.clone();
    rewriteUrl.pathname = effectivePath;
    const res = NextResponse.rewrite(rewriteUrl, {
      request: { headers: buildForwardedHeaders(req, seededStart) },
    });
    if (justGranted) setAccessCookie(res);
    if (seededStart) setStartCookie(res, seededStart);
    return res;
  }

  const res = NextResponse.next({
    request: { headers: buildForwardedHeaders(req, seededStart) },
  });
  if (seededStart) setStartCookie(res, seededStart);
  return res;
}

export const config = {
  matcher: [
    /*
     * Run for everything except:
     * - /api/login, /api/logout (API endpoints)
     * - /_next (build assets)
     * - /favicon.ico, /robots.txt, /images, /photos (public assets)
     */
    "/((?!api/login|api/logout|_next/static|_next/image|favicon.ico|robots.txt|images|photos).*)",
  ],
};
