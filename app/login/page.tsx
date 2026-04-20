import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "./LoginForm";
import { Divider } from "@/components/ui/Divider";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: `${SITE.login.title} · Вход`,
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="text-[11px] uppercase tracking-wider2 text-gold-600">
            {SITE.login.eyebrow}
          </span>
          <h1 className="font-serif text-5xl leading-tight text-ink">
            {SITE.login.title}
          </h1>
          <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
            {SITE.login.subtitle}
          </p>
          <Divider className="my-2" />
        </div>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
