"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect } from "react";
import type { GalleryItem } from "@/data/gallery";
import { SITE } from "@/data/site";
import { cn } from "@/lib/cn";

type Props = {
  items: GalleryItem[];
  openIndex: number | null;
  onClose: () => void;
  onIndexChange: (next: number) => void;
};

/**
 * Minimal custom lightbox: overlay, image, caption + date/location.
 *   - Esc closes, arrows navigate.
 *   - Click on the dimmed backdrop closes.
 *   - Body scroll is locked while open.
 */
export function GalleryLightbox({
  items,
  openIndex,
  onClose,
  onIndexChange,
}: Props) {
  const isOpen = openIndex !== null;

  const go = useCallback(
    (delta: number) => {
      if (openIndex === null) return;
      const next = (openIndex + delta + items.length) % items.length;
      onIndexChange(next);
    },
    [openIndex, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, go, onClose]);

  const active = openIndex !== null ? items[openIndex] : null;

  return (
    <AnimatePresence>
      {isOpen && active ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <button
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
          />

          <motion.figure
            key={active.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-h-[90vh] w-[min(92vw,1100px)] flex-col overflow-hidden rounded-3xl bg-cream-50 shadow-soft"
          >
            <div className="relative aspect-[4/3] w-full bg-beige-100">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="(min-width: 1024px) 1100px, 92vw"
                className="object-contain"
                priority
              />
            </div>

            <figcaption className="flex flex-col gap-2 px-6 py-5 sm:px-8">
              {active.caption ? (
                <p className="font-serif text-xl italic leading-snug text-ink">
                  {active.caption}
                </p>
              ) : null}
              <p className="text-[11px] uppercase tracking-wider2 text-ink-muted">
                {[active.date ?? SITE.gallery.noDateLabel, active.location]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </figcaption>

            <NavButton side="left" onClick={() => go(-1)} />
            <NavButton side="right" onClick={() => go(1)} />

            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-cream-50/90 text-ink shadow-card transition hover:bg-cream"
            >
              <CloseIcon />
            </button>
          </motion.figure>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function NavButton({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Предыдущее фото" : "Следующее фото"}
      className={cn(
        "absolute top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-cream-50/90 text-ink shadow-card transition hover:bg-cream",
        side === "left" ? "left-3 sm:left-5" : "right-3 sm:right-5",
      )}
    >
      <Arrow direction={side} />
    </button>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {direction === "left" ? (
        <path d="M12.5 4 L6.5 10 L12.5 16" />
      ) : (
        <path d="M7.5 4 L13.5 10 L7.5 16" />
      )}
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M5 5 L15 15 M15 5 L5 15" />
    </svg>
  );
}
