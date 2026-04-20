import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  checkPassword,
  createSessionToken,
} from "@/lib/auth";
import { START_COOKIE, START_COOKIE_MAX_AGE_SECONDS } from "@/lib/unlock";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let password = "";
  try {
    const body = (await request.json()) as { password?: unknown };
    if (typeof body.password === "string") password = body.password;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!checkPassword(password)) {
    return NextResponse.json({ ok: false, error: "Wrong password." }, { status: 401 });
  }

  const token = await createSessionToken();
  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  // Stamp the "journey started" timestamp on the very first successful
  // login. If it already exists (returning visitor), we never overwrite —
  // their personal clock must keep running from the original moment.
  const alreadyStarted = cookies().get(START_COOKIE)?.value;
  if (!alreadyStarted) {
    response.cookies.set({
      name: START_COOKIE,
      value: new Date().toISOString(),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: START_COOKIE_MAX_AGE_SECONDS,
    });
  }

  return response;
}
