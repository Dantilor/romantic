"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useProgress } from "@/hooks/useProgress";
import { TOTAL_DAYS } from "@/data/days";
import { QUIZZES, TOTAL_WEEKS, getQuizForWeek } from "@/data/quizzes";
import { SITE, formatSite } from "@/data/site";
import { FINAL_LETTER } from "@/data/final-letter";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { ProgressSummary } from "@/components/ui/ProgressSummary";

/**
 * The /final experience, gated by real progress.
 *   - opened < 30 → soft waiting screen + live progress
 *   - opened >= 30 → the letter from `data/final-letter.ts`, chosen-dates
 *                    recap (quiet), optional "and there is more" note.
 */
export function FinalProgressGate() {
  const { ready, state, markVisitedFinal } = useProgress();

  useEffect(() => {
    if (!ready) return;
    if (state.openedDays.length >= TOTAL_DAYS) markVisitedFinal();
  }, [ready, state.openedDays.length, markVisitedFinal]);

  const opened = ready ? state.openedDays.length : 0;
  const unlocked = ready && opened >= TOTAL_DAYS;

  return (
    <section className="min-h-[70vh] pb-24 pt-24">
      <Container size="sm">
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="text-[11px] uppercase tracking-wider2 text-gold-600">
            {unlocked
              ? SITE.final.unlockedEyebrow
              : SITE.final.waitingEyebrow}
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-6xl leading-tight text-ink sm:text-7xl"
          >
            {!ready
              ? "\u00A0"
              : unlocked
                ? FINAL_LETTER.title
                : SITE.final.waitingTitle}
          </motion.h1>
          <Divider />

          {!ready ? (
            <div className="h-32" aria-hidden />
          ) : unlocked ? (
            <UnlockedBody
              selectedDates={state.selectedDates}
              quizzesPassed={state.passedQuizzes.length}
              datesChosen={Object.keys(state.selectedDates).length}
            />
          ) : (
            <WaitingBody opened={opened} />
          )}

          <div className="mt-12 w-full">
            <ProgressSummary />
          </div>
        </div>
      </Container>
    </section>
  );
}

function WaitingBody({ opened }: { opened: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="flex flex-col items-center gap-5"
    >
      <p className="max-w-lg text-lg leading-relaxed text-ink-soft">
        {SITE.final.waitingBody}
      </p>
      <p className="text-xs uppercase tracking-wider2 text-ink-muted">
        {formatSite(SITE.final.waitingProgress, {
          opened,
          total: TOTAL_DAYS,
        })}
      </p>
      <Link href="/month" className="mt-2">
        <Button variant="outline">{SITE.final.backCta}</Button>
      </Link>
    </motion.div>
  );
}

function UnlockedBody({
  selectedDates,
  quizzesPassed,
  datesChosen,
}: {
  selectedDates: Record<number, string>;
  quizzesPassed: number;
  datesChosen: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="flex flex-col items-center gap-8"
    >
      <p className="max-w-xl font-serif text-xl italic leading-relaxed text-ink-soft">
        {FINAL_LETTER.intro}
      </p>

      <div className="flex max-w-xl flex-col gap-5 text-left">
        {FINAL_LETTER.paragraphs.map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            className="text-base leading-relaxed text-ink sm:text-[17px] sm:leading-[1.75]"
          >
            {p}
          </motion.p>
        ))}
      </div>

      {FINAL_LETTER.dateline ? (
        <p className="text-[11px] uppercase tracking-wider2 text-ink-muted">
          {FINAL_LETTER.dateline}
        </p>
      ) : null}

      <p className="mt-2 font-serif text-2xl italic text-ink">
        — {FINAL_LETTER.signature}
      </p>

      {FINAL_LETTER.cta ? (
        <div className="mt-2">
          <Link href={FINAL_LETTER.cta.href}>
            <Button>{FINAL_LETTER.cta.label}</Button>
          </Link>
        </div>
      ) : null}

      <ChosenDatesRecap
        selectedDates={selectedDates}
        quizzesPassed={quizzesPassed}
        datesChosen={datesChosen}
      />

      {FINAL_LETTER.afterNote ? (
        <AfterNote note={FINAL_LETTER.afterNote} />
      ) : (
        <AfterNote
          note={{
            eyebrow: SITE.final.afterNoteEyebrow,
            title: SITE.final.afterNoteTitle,
            body: SITE.final.afterNoteBody,
          }}
        />
      )}
    </motion.div>
  );
}

function ChosenDatesRecap({
  selectedDates,
  quizzesPassed,
  datesChosen,
}: {
  selectedDates: Record<number, string>;
  quizzesPassed: number;
  datesChosen: number;
}) {
  const chosen = QUIZZES.map((q) => {
    const id = selectedDates[q.week];
    if (!id) return null;
    const quiz = getQuizForWeek(q.week);
    const idea = quiz?.dateIdeas.find((i) => i.id === id);
    if (!idea) return null;
    return { week: q.week, title: idea.title };
  }).filter((x): x is { week: number; title: string } => x !== null);

  return (
    <aside className="mt-8 w-full rounded-3xl border border-ink/5 bg-cream-50/60 p-6 text-left">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[11px] uppercase tracking-wider2 text-gold-600">
          {SITE.final.recapEyebrow}
        </span>
        <span className="text-[11px] uppercase tracking-wider2 text-ink-muted">
          {formatSite(SITE.final.recapMeta, {
            passed: quizzesPassed,
            chosen: datesChosen,
            total: TOTAL_WEEKS,
          })}
        </span>
      </div>

      {chosen.length === 0 ? (
        <p className="mt-3 text-sm italic text-ink-muted">
          {SITE.final.recapEmpty}
        </p>
      ) : (
        <ul className="mt-4 flex flex-col gap-2">
          {chosen.map((c) => (
            <li
              key={c.week}
              className="flex items-baseline justify-between gap-3 border-b border-ink/5 pb-2 last:border-b-0 last:pb-0"
            >
              <span className="text-[11px] uppercase tracking-wider2 text-ink-muted">
                неделя {c.week}
              </span>
              <span className="font-serif text-lg text-ink">{c.title}</span>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

function AfterNote({
  note,
}: {
  note: { eyebrow: string; title: string; body: string };
}) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="mt-10 w-full rounded-3xl border border-gold-500/20 bg-gradient-to-br from-cream-50 to-blush-50 p-7 text-center shadow-card"
    >
      <span className="text-[11px] uppercase tracking-wider2 text-gold-600">
        {note.eyebrow}
      </span>
      <h3 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">
        {note.title}
      </h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
        {note.body}
      </p>
    </motion.aside>
  );
}
