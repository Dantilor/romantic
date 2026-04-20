import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageTransition } from "@/components/ui/PageTransition";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: `${SITE.gallery.title} · ${SITE.brand.title}`,
};

export default function GalleryPage() {
  return (
    <PageTransition>
      <section className="pb-24 pt-20 sm:pt-24">
        <Container size="lg">
          <SectionTitle
            eyebrow={SITE.gallery.eyebrow}
            title={SITE.gallery.title}
            subtitle={SITE.gallery.subtitle}
          />
          <GalleryGrid />
        </Container>
      </section>
    </PageTransition>
  );
}
