import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageTransition } from "@/components/ui/PageTransition";
import { ProgressSummary } from "@/components/ui/ProgressSummary";
import { MonthGrid } from "@/components/month/MonthGrid";
import { DAYS, TOTAL_DAYS } from "@/data/days";
import { SITE, formatSite } from "@/data/site";
import { isDayUnlocked, unlockedCount } from "@/lib/unlock";

export const metadata: Metadata = {
  title: `${SITE.month.title} · ${SITE.brand.title}`,
};

export default function MonthPage() {
  const unlocked = unlockedCount();
  const days = DAYS.map((d) => ({
    day: d.day,
    title: d.title,
    unlocked: isDayUnlocked(d.day),
  }));

  return (
    <PageTransition>
      <section className="pb-24 pt-20 sm:pt-24">
        <Container size="lg">
          <SectionTitle
            eyebrow={formatSite(SITE.month.eyebrow, {
              opened: unlocked,
              total: TOTAL_DAYS,
            })}
            title={SITE.month.title}
            subtitle={SITE.month.subtitle}
          />

          <div className="mx-auto mt-12 max-w-3xl">
            <ProgressSummary />
          </div>

          <MonthGrid days={days} />
        </Container>
      </section>
    </PageTransition>
  );
}
