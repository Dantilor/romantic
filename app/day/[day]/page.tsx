import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { PageTransition } from "@/components/ui/PageTransition";
import { DayProgressTracker } from "@/components/day/DayProgressTracker";
import { DayMiniQuest } from "@/components/day/DayMiniQuest";
import { WeeklyMomentCard } from "@/components/day/WeeklyMomentCard";
import { MOOD } from "@/components/day/mood";
import { TOTAL_DAYS, getDay, type DayExtraSection } from "@/data/days";
import { SITE, formatSite } from "@/data/site";
import { isDayUnlockedFromUserStart } from "@/lib/unlock";
import { getUserStartDate } from "@/lib/unlock.server";
import { cn } from "@/lib/cn";

type Params = { day: string };

// Per-user unlock depends on the `rs_started_at` cookie, so each day page
// is rendered per request. We deliberately omit `generateStaticParams`
// (which would opt the segment into SSG) — invalid day slugs like
// `/day/99` still 404 cleanly via `notFound()` below.
export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: Params }): Metadata {
  const n = Number(params.day);
  const d = getDay(n);
  if (!d) return { title: "Не найдено" };
  return { title: `День ${d.day} · ${d.title}` };
}

export default function DayPage({ params }: { params: Params }) {
  const n = Number(params.day);
  const d = getDay(n);
  if (!d) notFound();

  const startedAt = getUserStartDate();
  const unlocked = isDayUnlockedFromUserStart(d.day, startedAt);
  const prev = d.day > 1 ? d.day - 1 : null;
  const next = d.day < TOTAL_DAYS ? d.day + 1 : null;

  if (!unlocked) {
    return (
      <PageTransition>
        <section className="pt-24 pb-24">
          <Container size="sm">
            <div className="flex flex-col items-center gap-6 text-center">
              <span className="text-[11px] uppercase tracking-wider2 text-gold-600">
                {formatSite(SITE.day.lockedEyebrow, { day: d.day })}
              </span>
              <h1 className="font-serif text-5xl leading-tight text-ink">
                {SITE.day.lockedTitle}
              </h1>
              <p className="max-w-md text-base leading-relaxed text-ink-soft">
                {SITE.day.lockedBody}
              </p>
              <Link href="/month" className="mt-4">
                <Button variant="outline">{SITE.day.lockedCta}</Button>
              </Link>
            </div>
          </Container>
        </section>
      </PageTransition>
    );
  }

  const mood = MOOD[d.mood];

  return (
    <PageTransition>
      <DayProgressTracker day={d.day} />

      {/* Subtle mood-tinted wash behind the header. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b opacity-80",
          mood.accentGradient,
        )}
      />

      <article className="pb-20 pt-16 sm:pt-24">
        <Container size="md">
          <header className="flex flex-col items-center gap-4 text-center">
            <span
              className={cn(
                "text-[11px] uppercase tracking-wider2",
                mood.eyebrow,
              )}
            >
              {formatSite(SITE.day.eyebrow, { day: d.day, total: TOTAL_DAYS })}
            </span>
            <h1 className="font-serif text-5xl leading-tight text-ink sm:text-6xl">
              {d.title}
            </h1>
          </header>

          {/* Photo — standalone visual block. Alt text stays for a11y. */}
          <figure className="mt-12 overflow-hidden rounded-3xl bg-beige-100 shadow-card">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={d.image}
                alt={d.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 900px, 100vw"
                className="object-cover"
              />
            </div>
          </figure>

          {/* Message — the main letter of the day. */}
          <div className="mx-auto mt-14 max-w-2xl">
            <p className="font-serif text-2xl leading-relaxed text-ink-soft sm:text-[28px] sm:leading-[1.5]">
              {d.message}
            </p>
          </div>

          {d.extraSection ? (
            <DayExtraLetter section={d.extraSection} />
          ) : null}

          {d.extraQuizSection ? (
            <DayMiniQuest section={d.extraQuizSection} />
          ) : null}

          {/* Optional pulled quote — quiet editorial aside. */}
          {d.optionalQuote ? (
            <blockquote
              className={cn(
                "mx-auto mt-12 max-w-xl border-l pl-6 py-1 sm:pl-8",
                mood.quoteBorder,
              )}
            >
              <span className="text-[10px] uppercase tracking-wider2 text-ink-muted">
                {SITE.day.quoteLabel}
              </span>
              <p className="mt-1 font-serif text-xl italic leading-relaxed text-ink">
                {d.optionalQuote}
              </p>
            </blockquote>
          ) : null}

          {/* Optional prompt — soft, open question at the very end of the text block. */}
          {d.optionalPrompt ? (
            <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-ink/5 bg-cream-50/80 px-6 py-5 text-center shadow-card">
              <span className="text-[10px] uppercase tracking-wider2 text-gold-600">
                {SITE.day.promptLabel}
              </span>
              <p className="mt-2 font-serif text-lg italic text-ink">
                {d.optionalPrompt}
              </p>
            </div>
          ) : null}

          <div className="mt-16">
            <Divider />
          </div>

          <WeeklyMomentCard day={d.day} />

          <nav className="mt-16 flex items-center justify-between">
            {prev ? (
              <Link href={`/day/${prev}`}>
                <Button variant="ghost">← День {prev}</Button>
              </Link>
            ) : (
              <span />
            )}
            <Link href="/month">
              <Button variant="outline">{SITE.buttons.toMonthShort}</Button>
            </Link>
            {next ? (
              <Link href={`/day/${next}`}>
                <Button variant="ghost">День {next} →</Button>
              </Link>
            ) : (
              <Link href="/final">
                <Button>{SITE.buttons.toSurprise}</Button>
              </Link>
            )}
          </nav>
        </Container>
      </article>
    </PageTransition>
  );
}

function DayExtraLetter({ section }: { section: DayExtraSection }) {
  const paragraphs = section.body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section
      aria-labelledby="day-extra-letter-title"
      className="mx-auto mt-16 max-w-2xl"
    >
      <h2
        id="day-extra-letter-title"
        className="text-center font-serif text-3xl leading-tight text-ink sm:text-[2rem]"
      >
        {section.title}
      </h2>
      <div className="mt-8 rounded-3xl border border-ink/5 bg-cream-50/70 px-7 py-8 shadow-card sm:px-10 sm:py-9">
        <div className="flex flex-col gap-6">
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className={cn(
                "font-serif leading-[1.65] text-ink-soft",
                i === 0
                  ? "text-lg text-ink sm:text-xl"
                  : "text-base sm:text-[17px]",
              )}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
