"use client";

import { usePathname } from "next/navigation";
import { SITE } from "@/data/site";
import { Divider } from "./Divider";

export function Footer() {
  const pathname = usePathname();
  if (pathname === "/login") return null;

  return (
    <footer className="mt-24 pb-12 pt-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center sm:px-8">
        <Divider />
        <p className="font-serif text-lg italic text-ink-soft">
          {SITE.footer.line}
        </p>
        <p className="text-[11px] uppercase tracking-wider2 text-ink-muted">
          {SITE.footer.note}
        </p>
      </div>
    </footer>
  );
}
