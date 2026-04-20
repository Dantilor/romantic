import type { Metadata } from "next";
import { PageTransition } from "@/components/ui/PageTransition";
import { FinalProgressGate } from "@/components/final/FinalProgressGate";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: `${SITE.final.unlockedTitle} · ${SITE.brand.title}`,
};

export default function FinalPage() {
  return (
    <PageTransition>
      <FinalProgressGate />
    </PageTransition>
  );
}
