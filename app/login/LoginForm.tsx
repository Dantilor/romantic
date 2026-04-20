"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/data/site";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/";

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(
          data.error === "Wrong password."
            ? SITE.login.wrongPassword
            : SITE.login.genericError,
        );
        setLoading(false);
        return;
      }
      router.push(next.startsWith("/") ? next : "/");
      router.refresh();
    } catch {
      setError(SITE.login.networkError);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="text-[11px] uppercase tracking-wider2 text-ink-muted">
          {SITE.login.placeholderLabel}
        </span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          autoComplete="current-password"
          className="w-full rounded-2xl border border-ink/10 bg-cream-50 px-5 py-4 text-base text-ink placeholder:text-ink-muted/60 shadow-sm transition focus:border-gold-500/60 focus:outline-none focus:ring-2 focus:ring-gold-400/30"
          placeholder={SITE.login.placeholder}
          aria-invalid={error ? true : undefined}
        />
      </label>

      {error ? (
        <p role="alert" className="text-sm text-rose-700/90">
          {error}
        </p>
      ) : null}

      <Button type="submit" full disabled={loading || password.length === 0}>
        {loading ? SITE.login.submitting : SITE.login.submit}
      </Button>
    </form>
  );
}
