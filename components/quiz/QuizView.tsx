"use client";

import { useMemo, useState } from "react";
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

/** Share of correct answers needed for the quiz to count as passed. */
const PASS_RATIO = 0.6;

export function QuizView({ quiz }: Props) {
  const { ready, isQuizPassed, markQuizPassed } = useProgress();

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [retrying, setRetrying] = useState(false);

  const total = quiz.questions.length;
  const correctCount = useMemo(
    () =>
      quiz.questions.reduce(
        (acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0),
        0,
      ),
    [quiz.questions, answers],
  );
  const ratio = total === 0 ? 0 : correctCount / total;
  const passedNow = submitted && ratio >= PASS_RATIO;
  const answeredAll = Object.keys(answers).length === total;

  const alreadyPassed =
    ready && isQuizPassed(quiz.week) && !retrying && !submitted;

  function choose(qid: string, optionIndex: number) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qid]: optionIndex }));
  }

  function submit() {
    if (!answeredAll || submitted) return;
    setSubmitted(true);
    if (ratio >= PASS_RATIO) markQuizPassed(quiz.week);
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <PageTransition>
      <section className="pb-20 pt-20">
        <Container size="md">
          <header className="flex flex-col items-center gap-4 text-center">
            <span className="text-[11px] uppercase tracking-wider2 text-gold-600">
              {formatSite(SITE.quiz.header, { week: quiz.week })}
            </span>
            <h1 className="font-serif text-5xl leading-tight text-ink sm:text-6xl">
              {quiz.title}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-ink-soft">
              {quiz.intro}
            </p>
            <Divider />
          </header>

          {alreadyPassed ? (
            <div className="mt-14 rounded-3xl border border-ink/5 bg-cream-50/80 p-10 text-center shadow-card">
              <span className="text-[11px] uppercase tracking-wider2 text-gold-600">
                {SITE.quiz.alreadyEyebrow}
              </span>
              <h2 className="mt-3 font-serif text-3xl text-ink">
                {SITE.quiz.alreadyTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-ink-soft">
                {SITE.quiz.alreadyBody}
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href={`/date-choice/week-${quiz.week}`}>
                  <Button>{SITE.buttons.chooseDate}</Button>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setRetrying(true);
                    reset();
                  }}
                  className="text-xs uppercase tracking-wider2 text-ink-muted transition-colors hover:text-ink"
                >
                  {SITE.buttons.finishedQuizCta}
                </button>
              </div>
            </div>
          ) : (
            <>
              <ol className="mt-12 flex flex-col gap-6">
                {quiz.questions.map((q, i) => (
                  <li key={q.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: Math.min(i * 0.05, 0.25),
                      }}
                      className="rounded-3xl border border-ink/5 bg-cream-50/80 p-6 shadow-card sm:p-8"
                    >
                      <p className="text-[11px] uppercase tracking-wider2 text-gold-600">
                        {formatSite(SITE.quiz.questionLabel, { n: i + 1 })}
                      </p>
                      <p className="mt-2 font-serif text-2xl leading-snug text-ink">
                        {q.question}
                      </p>
                      <div
                        role="radiogroup"
                        aria-label={q.question}
                        className="mt-5 flex flex-col gap-2"
                      >
                        {q.options.map((opt, oi) => {
                          const selected = answers[q.id] === oi;
                          const isCorrect = q.correct === oi;
                          const showAsCorrect = submitted && isCorrect;
                          const showAsWrong = submitted && selected && !isCorrect;

                          return (
                            <button
                              key={oi}
                              type="button"
                              role="radio"
                              aria-checked={selected}
                              onClick={() => choose(q.id, oi)}
                              disabled={submitted}
                              className={cn(
                                "flex items-center gap-3 rounded-2xl border px-5 py-3 text-left text-sm transition-all duration-200",
                                "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40",
                                !submitted && "hover:border-ink/30 hover:bg-cream",
                                !submitted &&
                                  selected &&
                                  "border-gold-500 bg-blush-50",
                                !submitted && !selected && "border-ink/10",
                                showAsCorrect &&
                                  "border-emerald-700/30 bg-emerald-50/60",
                                showAsWrong &&
                                  "border-rose-700/30 bg-rose-50/60",
                                submitted &&
                                  !selected &&
                                  !isCorrect &&
                                  "opacity-70",
                              )}
                            >
                              <span
                                className={cn(
                                  "grid h-5 w-5 shrink-0 place-items-center rounded-full border",
                                  selected
                                    ? "border-gold-500 bg-gold-500"
                                    : "border-ink/30",
                                )}
                                aria-hidden
                              >
                                {selected ? (
                                  <span className="h-1.5 w-1.5 rounded-full bg-cream" />
                                ) : null}
                              </span>
                              <span className="text-ink">{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  </li>
                ))}
              </ol>

              {!submitted ? (
                <div className="mt-10 flex items-center justify-center">
                  <Button onClick={submit} disabled={!answeredAll}>
                    {SITE.buttons.seeResult}
                  </Button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-14 rounded-3xl border border-ink/5 bg-cream-50/80 p-10 text-center shadow-card"
                >
                  {passedNow ? (
                    <>
                      <span className="text-[11px] uppercase tracking-wider2 text-gold-600">
                        {SITE.quiz.passedEyebrow}
                      </span>
                      <h2 className="mt-3 font-serif text-4xl text-ink">
                        {SITE.quiz.passedTitle}
                      </h2>
                      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
                        {formatSite(SITE.quiz.passedBodyTemplate, {
                          correct: correctCount,
                          total,
                        })}
                        {SITE.quiz.passedBodyTail}
                      </p>
                      <div className="mt-7">
                        <Link href={`/date-choice/week-${quiz.week}`}>
                          <Button>{SITE.buttons.chooseDate}</Button>
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="text-[11px] uppercase tracking-wider2 text-gold-600">
                        {SITE.quiz.failedEyebrow}
                      </span>
                      <h2 className="mt-3 font-serif text-4xl text-ink">
                        {SITE.quiz.failedTitle}
                      </h2>
                      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
                        {formatSite(SITE.quiz.failedBodyTemplate, {
                          correct: correctCount,
                          total,
                        })}
                        {SITE.quiz.failedBodyTail}
                      </p>
                      <div className="mt-7">
                        <Button onClick={reset}>{SITE.buttons.retryQuiz}</Button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </>
          )}
        </Container>
      </section>
    </PageTransition>
  );
}
