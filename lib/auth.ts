/**
 * Lightweight cookie-session auth.
 *
 * A session cookie stores a signed token: `<payload>.<signature>`.
 * The payload is a base64url-encoded JSON blob with an issued-at timestamp.
 * The signature is an HMAC-SHA256 of the payload using AUTH_SECRET.
 *
 * Runs in both Node.js (route handlers) and the Edge runtime (middleware),
 * so we rely exclusively on Web Crypto.
 */

export const SESSION_COOKIE = "rs_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 60; // 60 days

type SessionPayload = {
  /** issued-at, seconds since epoch */
  iat: number;
};

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "AUTH_SECRET is missing or too short. Set it in your environment (>=16 chars).",
    );
  }
  return secret;
}

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (let i = 0; i < view.byteLength; i++) {
    binary += String.fromCharCode(view[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  const binary = atob(padded + pad);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
  return out;
}

async function getKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function sign(payload: string, secret: string): Promise<string> {
  const key = await getKey(secret);
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );
  return toBase64Url(sig);
}

async function verify(
  payload: string,
  signature: string,
  secret: string,
): Promise<boolean> {
  const key = await getKey(secret);
  try {
    return await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(signature),
      new TextEncoder().encode(payload),
    );
  } catch {
    return false;
  }
}

export async function createSessionToken(): Promise<string> {
  const secret = getSecret();
  const payload: SessionPayload = { iat: Math.floor(Date.now() / 1000) };
  const encoded = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const signature = await sign(encoded, secret);
  return `${encoded}.${signature}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return false;

  let secret: string;
  try {
    secret = getSecret();
  } catch {
    return false;
  }

  const ok = await verify(encoded, signature, secret);
  if (!ok) return false;

  try {
    const json = new TextDecoder().decode(fromBase64Url(encoded));
    const parsed = JSON.parse(json) as SessionPayload;
    if (typeof parsed.iat !== "number") return false;
    const ageSeconds = Math.floor(Date.now() / 1000) - parsed.iat;
    return ageSeconds >= 0 && ageSeconds <= SESSION_MAX_AGE_SECONDS;
  } catch {
    return false;
  }
}

/**
 * Timing-safe string comparison. Important when comparing user-supplied
 * passwords to the expected value.
 */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export function checkPassword(candidate: string): boolean {
  const expected = process.env.SITE_PASSWORD;
  if (!expected) return false;
  return safeEqual(candidate, expected);
}
