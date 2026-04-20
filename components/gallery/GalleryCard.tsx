"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { GalleryItem } from "@/data/gallery";
import { cn } from "@/lib/cn";

type Props = {
  item: GalleryItem;
  index: number;
  onOpen: () => void;
};

/**
 * Single photo card in the masonry grid. Clicking opens the lightbox.
 * Captions and dates are rendered below the image in an editorial style.
 */
export function GalleryCard({ item, index, onOpen }: Props) {
  const isPortrait = item.orientation !== "landscape";
  const height = isPortrait ? 1200 : 800;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.04, 0.25),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-beige-100 shadow-card"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Открыть фото: ${item.alt}`}
        className={cn(
          "group relative block w-full overflow-hidden rounded-t-2xl",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60",
        )}
      >
        <Image
          src={item.src}
          alt={item.alt}
          width={900}
          height={height}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          priority={index < 2}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </button>
      {(item.caption || item.date || item.location) && (
        <figcaption className="flex flex-col gap-1 px-4 py-3">
          {item.caption ? (
            <p className="text-sm italic leading-snug text-ink-soft">
              {item.caption}
            </p>
          ) : null}
          {(item.date || item.location) && (
            <p className="text-[11px] uppercase tracking-wider2 text-ink-muted">
              {[item.date, item.location].filter(Boolean).join(" · ")}
            </p>
          )}
        </figcaption>
      )}
    </motion.figure>
  );
}
