"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useProgress } from "@/hooks/useProgress";
import { getQuizForDay } from "@/data/quizzes";
import { SITE, formatSite } from "@/data/site";
import { Button } from "@/components/ui/Button";

type Props = {
  day: number;
};

/**
 * Appears at the bottom of every "quiz day" (7 / 14 / 21 / 28).
 * Renders one of three states: quiz-not-passed, passed-no-choice, choice-made.
 */
export function WeeklyMomentCard({ day }: Props) {
  const quiz = getQuizForDay(day);
  const { ready, isQuizPassed, getDateChoice } = useProgress();

  if (!quiz) return null;

  const week = quiz.week;

  if (!ready) {
    return (
      <div
        aria-hidden
        className="mt-12 h-48 animate-pulse rounded-3xl border border-gold-500/20 bg-gradient-to-br from-cream-50 to-blush-50"
      />
    );
  }

  const passed = isQuizPassed(week);
  const choiceId = getDateChoice(week);
  const chosen = choiceId
    ? quiz.dateIdeas.find((idea) => idea.id === choiceId) ?? null
    : null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mt-12 rounded-3xl border border-gold-500/20 bg-gradient-to-br from-cream-50 via-cream-100 to-blush-50 p-8 text-center shadow-card sm:p-10"
    >
      <span className="text-[11px] uppercase tracking-wider2 text-gold-600">
        {formatSite(SITE.weeklyCard.eyebrow, { week })}
      </span>
      <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
        {quiz.title}
      </h2>

      {!passed ? (
        <>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
            {quiz.intro}
          </p>
          <div className="mt-7">
            <Link href={`/quiz/week-${week}`}>
              <Button>{SITE.buttons.openQuiz}</Button>
            </Link>
          </div>
        </>
      ) : chosen ? (
        <>
          <p className="mx-auto mt-3 max-w-md text-sm italic text-ink-soft">
            {SITE.weeklyCard.chosenLine}
          </p>
          <div className="mx-auto mt-6 inline-flex flex-col gap-1 rounded-2xl border border-ink/10 bg-cream-50 px-7 py-4">
            <span className="text-[10px] uppercase tracking-wider2 text-gold-600">
              {SITE.weeklyCard.chosenLabel}
            </span>
            <span className="font-serif text-xl text-ink">{chosen.title}</span>
          </div>
          <div className="mt-5">
            <Link
              href={`/date-choice/week-${week}`}
              className="text-xs uppercase tracking-wider2 text-ink-muted transition-colors hover:text-ink"
            >
              {SITE.buttons.changeDate}
            </Link>
          </div>
        </>
      ) : (
        <>
          <p className="mx-auto mt-3 max-w-md text-sm italic text-ink-soft">
            {SITE.weeklyCard.passedNoChoiceLine}
          </p>
          <div className="mt-7">
            <Link href={`/date-choice/week-${week}`}>
              <Button>{SITE.buttons.chooseDate}</Button>
            </Link>
          </div>
        </>
      )}
    </motion.section>
  );
}
