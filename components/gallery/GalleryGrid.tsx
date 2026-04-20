"use client";

import { useState } from "react";
import { GALLERY } from "@/data/gallery";
import { GalleryCard } from "./GalleryCard";
import { GalleryLightbox } from "./GalleryLightbox";

export function GalleryGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="mt-16 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {GALLERY.map((item, i) => (
          <GalleryCard
            key={item.id}
            item={item}
            index={i}
            onOpen={() => setOpenIndex(i)}
          />
        ))}
      </div>

      <GalleryLightbox
        items={GALLERY}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </>
  );
}
