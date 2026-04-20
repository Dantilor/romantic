import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { PageTransition } from "@/components/ui/PageTransition";
import { TOTAL_DAYS } from "@/data/days";
import { SITE, formatSite, type SitePreviewCard } from "@/data/site";
import { unlockedCount } from "@/lib/unlock";

export default function HomePage() {
  const unlocked = unlockedCount();

  return (
    <PageTransition>
      <section className="relative overflow-hidden pb-24 pt-20 sm:pt-32">
        <Container size="md" className="relative">
          <div className="flex flex-col items-center text-center">
            <span className="text-[11px] uppercase tracking-wider2 text-gold-600">
              {SITE.home.eyebrow}
            </span>
            <h1 className="mt-6 font-serif text-6xl leading-[1.05] text-ink sm:text-7xl">
              {SITE.home.heroTitleTop}
              <br />
              <em className="not-italic text-ink-soft">
                {SITE.home.heroTitleBottom}
              </em>
            </h1>
            <p className="mt-8 max-w-xl text-balance text-lg leading-relaxed text-ink-soft">
              {SITE.home.heroLead}
            </p>

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
              <Link href="/month">
                <Button>{SITE.home.ctaMonth}</Button>
              </Link>
              <Link href="/gallery">
                <Button variant="outline">{SITE.home.ctaGallery}</Button>
              </Link>
            </div>

            <p className="mt-8 text-xs uppercase tracking-wider2 text-ink-muted">
              {formatSite(SITE.home.openedLine, {
                opened: unlocked,
                total: TOTAL_DAYS,
              })}
            </p>
          </div>
        </Container>
      </section>

      <Container size="md">
        <Divider />
      </Container>

      {/* "This place is for us alone" block */}
      <section className="py-20">
        <Container size="sm">
          <div className="flex flex-col items-center gap-5 text-center">
            <span className="text-[11px] uppercase tracking-wider2 text-gold-600">
              {SITE.home.onlyForUs.eyebrow}
            </span>
            <h2 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">
              {SITE.home.onlyForUs.title}
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-ink-soft">
              {SITE.home.onlyForUs.body}
            </p>
          </div>
        </Container>
      </section>

      {/* 3 preview cards */}
      <section className="pb-24">
        <Container size="md">
          <div className="grid gap-8 sm:grid-cols-3">
            {SITE.home.previews.map((p) => (
              <Preview key={p.title} item={p} />
            ))}
          </div>
        </Container>
      </section>
    </PageTransition>
  );
}

function Preview({ item }: { item: SitePreviewCard }) {
  return (
    <article className="flex flex-col gap-3 rounded-3xl border border-ink/5 bg-cream-50/60 p-6 shadow-card transition hover:-translate-y-0.5 hover:bg-cream-50/90">
      <span className="text-[11px] uppercase tracking-wider2 text-gold-600">
        {item.eyebrow}
      </span>
      <h3 className="font-serif text-2xl leading-snug text-ink">{item.title}</h3>
      <p className="text-sm leading-relaxed text-ink-soft">{item.body}</p>
    </article>
  );
}
