"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SITE } from "@/data/site";
import { cn } from "@/lib/cn";

type NavLink = { href: string; label: string };

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/login") return null;

  const LINKS: readonly NavLink[] = [
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
      {/* Top row — brand + desktop nav + logout. */}
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-8">
        <Link
          href="/"
          className="font-serif text-lg tracking-wide text-ink transition hover:text-ink-soft"
        >
          {SITE.brand.title}
        </Link>
        <nav className="hidden items-center gap-8 sm:flex">
          {LINKS.map((link) => (
            <DesktopLink
              key={link.href}
              link={link}
              active={isActive(link.href, pathname)}
            />
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="text-xs uppercase tracking-wider2 text-ink-muted transition-colors hover:text-ink"
          aria-label={SITE.nav.logout}
        >
          {SITE.nav.logout}
        </button>
      </div>

      {/* Bottom row — mobile nav. Visible only < sm. */}
      <MobileNav links={LINKS} pathname={pathname} />
    </header>
  );
}

function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function DesktopLink({
  link,
  active,
}: {
  link: NavLink;
  active: boolean;
}) {
  return (
    <Link
      href={link.href}
      className={cn(
        "text-sm transition-colors",
        active ? "text-ink" : "text-ink-muted hover:text-ink",
      )}
    >
      {link.label}
    </Link>
  );
}

/**
 * Compact second-row nav shown only on small screens. Horizontal scroll is
 * a safety net in case labels are ever extended — normally all four pills
 * fit on one row. Active link gets a soft cream pill so the eye has
 * something quiet to land on, without breaking the minimal palette.
 */
function MobileNav({
  links,
  pathname,
}: {
  links: readonly NavLink[];
  pathname: string;
}) {
  return (
    <div className="border-t border-ink/5 sm:hidden">
      <nav
        aria-label={SITE.brand.title}
        className="flex items-center gap-2 overflow-x-auto px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {links.map((link) => {
          const active = isActive(link.href, pathname);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-xs tracking-wide transition-colors",
                active
                  ? "border-ink/10 bg-cream-50 text-ink shadow-card"
                  : "border-transparent text-ink-muted hover:text-ink",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
