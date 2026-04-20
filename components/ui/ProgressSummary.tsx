"use client";

import { useProgress } from "@/hooks/useProgress";
import { TOTAL_DAYS } from "@/data/days";
import { TOTAL_WEEKS } from "@/data/quizzes";
import { SITE } from "@/data/site";
import { cn } from "@/lib/cn";

type BarProps = {
  label: string;
  value: number;
  max: number;
};

function Bar({ label, value, max }: BarProps) {
  const pct = max === 0 ? 0 : Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[11px] uppercase tracking-wider2 text-ink-muted">
          {label}
        </span>
        <span className="font-serif text-lg text-ink">
          {value}
          <span className="text-ink-muted"> / {max}</span>
        </span>
      </div>
      <div className="h-[2px] w-full overflow-hidden rounded-full bg-ink/10">
        <div
          className="h-full bg-gradient-to-r from-blush-400 to-gold-500 transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

type Props = {
  className?: string;
};

/**
 * Compact overview of how far the journey has progressed:
 * days opened, quizzes passed, date choices made.
 */
export function ProgressSummary({ className }: Props) {
  const { ready, state } = useProgress();

  const days = ready ? state.openedDays.length : 0;
  const quizzes = ready ? state.passedQuizzes.length : 0;
  const dates = ready ? Object.keys(state.selectedDates).length : 0;

  return (
    <div
      className={cn(
        "grid w-full gap-6 rounded-3xl border border-ink/5 bg-cream-50/80 p-6 shadow-card sm:grid-cols-3 sm:p-8",
        className,
      )}
      aria-label="Сводка прогресса"
    >
      <Bar label={SITE.progress.days} value={days} max={TOTAL_DAYS} />
      <Bar label={SITE.progress.quizzes} value={quizzes} max={TOTAL_WEEKS} />
      <Bar label={SITE.progress.dates} value={dates} max={TOTAL_WEEKS} />
    </div>
  );
}
