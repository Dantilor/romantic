"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Quiz } from "@/data/quizzes";
import { useProgress } from "@/hooks/useProgress";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { PageTransition } from "@/components/ui/PageTransition";
import { SITE, formatSite } from "@/data/site";
import { cn } from "@/lib/cn";

type Props = {
  quiz: Quiz;
};

/**
 * Gate + selection UI for a weekly date idea.
 *
 * - If the week's quiz is not yet passed, shows a soft gate with a link
 *   back to the quiz (a tender message over a hard redirect).
 * - Once a choice is made the cards switch to a "selected" view; user can
 *   click "Изменить выбор" to re-enter picking mode.
 */
export function DateChoiceView({ quiz }: Props) {
  const { ready, isQuizPassed, getDateChoice, saveDateChoice } = useProgress();
  const [editing, setEditing] = useState(false);

  if (!ready) {
    return (
      <section className="py-32 text-center text-sm text-ink-muted">…</section>
    );
  }

  if (!isQuizPassed(quiz.week)) {
    return (
      <PageTransition>
        <section className="pb-20 pt-24">
          <Container size="sm">
            <div className="flex flex-col items-center gap-6 text-center">
              <span className="text-[11px] uppercase tracking-wider2 text-gold-600">
                {formatSite(SITE.dateChoice.gateEyebrow, { week: quiz.week })}
              </span>
              <h1 className="font-serif text-5xl leading-tight text-ink">
                {SITE.dateChoice.gateTitle}
              </h1>
              <Divider />
              <p className="max-w-md text-base leading-relaxed text-ink-soft">
                {SITE.dateChoice.gateBody}
              </p>
              <Link href={`/quiz/week-${quiz.week}`} className="mt-2">
                <Button>
                  {formatSite(SITE.dateChoice.gateCta, { week: quiz.week })}
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </PageTransition>
    );
  }

  const currentChoice = getDateChoice(quiz.week);
  const chosen = currentChoice
    ? quiz.dateIdeas.find((idea) => idea.id === currentChoice) ?? null
    : null;

  const picking = !chosen || editing;

  function choose(ideaId: string) {
    saveDateChoice(quiz.week, ideaId);
    setEditing(false);
  }

  return (
    <PageTransition>
      <section className="pb-24 pt-20">
        <Container size="md">
          <header className="flex flex-col items-center gap-4 text-center">
            <span className="text-[11px] uppercase tracking-wider2 text-gold-600">
              {formatSite(SITE.dateChoice.header, { week: quiz.week })}
            </span>
            <h1 className="font-serif text-5xl leading-tight text-ink sm:text-6xl">
              {picking
                ? SITE.dateChoice.pickTitle
                : SITE.dateChoice.chosenTitle}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-ink-soft">
              {picking
                ? SITE.dateChoice.pickSubtitle
                : SITE.dateChoice.chosenSubtitle}
            </p>
            <Divider />
          </header>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {quiz.dateIdeas.map((idea, i) => {
              const selected = idea.id === currentChoice;
              return (
                <motion.article
                  key={idea.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(i * 0.06, 0.3),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={cn(
                    "relative flex flex-col gap-4 rounded-3xl border p-7 shadow-card transition-all duration-300",
                    selected
                      ? "border-gold-500/60 bg-gradient-to-br from-cream-50 via-cream-100 to-blush-50"
                      : "border-ink/5 bg-cream-50/80 hover:-translate-y-0.5 hover:shadow-soft",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-2xl leading-snug text-ink">
                      {idea.title}
                    </h3>
                    {selected ? (
                      <span className="shrink-0 rounded-full border border-gold-500/50 bg-cream-50 px-2.5 py-0.5 text-[10px] uppercase tracking-wider2 text-gold-600">
                        {SITE.weeklyCard.chosenLabel}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    {idea.description}
                  </p>
                  <div className="mt-auto pt-2">
                    {picking ? (
                      <Button
                        variant={selected ? "outline" : "primary"}
                        onClick={() => choose(idea.id)}
                        full
                      >
                        {selected
                          ? SITE.buttons.keepThisDate
                          : SITE.buttons.pickThisDate}
                      </Button>
                    ) : selected ? (
                      <Button
                        variant="outline"
                        onClick={() => setEditing(true)}
                        full
                      >
                        {SITE.buttons.changeDate}
                      </Button>
                    ) : null}
                  </div>
                </motion.article>
              );
            })}
          </div>

          {editing ? (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="text-xs uppercase tracking-wider2 text-ink-muted transition-colors hover:text-ink"
              >
                {SITE.dateChoice.cancelEdit}
              </button>
            </div>
          ) : null}

          <div className="mt-14 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/month">
              <Button variant="ghost">{SITE.buttons.toMonthShort}</Button>
            </Link>
            <Link href={`/day/${quiz.unlocksAfterDay}`}>
              <Button variant="ghost">К дню {quiz.unlocksAfterDay}</Button>
            </Link>
          </div>
        </Container>
      </section>
    </PageTransition>
  );
}
