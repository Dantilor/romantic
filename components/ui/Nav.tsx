"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SITE } from "@/data/site";
import { cn } from "@/lib/cn";

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/login") return null;

  const LINKS = [
    { href: "/", label: SITE.nav.home },
    { href: "/month", label: SITE.nav.month },
    { href: "/gallery", label: SITE.nav.gallery },
    { href: "/final", label: SITE.nav.final },
  ] as const;

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-8">
        <Link
          href="/"
          className="font-serif text-lg tracking-wide text-ink transition hover:text-ink-soft"
        >
          {SITE.brand.title}
        </Link>
        <nav className="hidden items-center gap-8 sm:flex">
          {LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors",
                  active ? "text-ink" : "text-ink-muted hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={handleLogout}
          className="text-xs uppercase tracking-wider2 text-ink-muted transition-colors hover:text-ink"
          aria-label={SITE.nav.logout}
        >
          {SITE.nav.logout}
        </button>
      </div>
    </header>
  );
}
