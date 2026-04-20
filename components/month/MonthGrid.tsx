"use client";

import { useProgress } from "@/hooks/useProgress";
import { DayCard } from "@/components/ui/DayCard";
import { isQuizDay } from "@/lib/progress";

type DayDescriptor = {
  day: number;
  title: string;
  unlocked: boolean;
};

type Props = {
  days: DayDescriptor[];
};

/**
 * Client wrapper around the 30-day grid. Adds the localStorage-based "opened"
 * state on top of the server-side date-based `unlocked` flag.
 */
export function MonthGrid({ days }: Props) {
  const { ready, state } = useProgress();

  return (
    <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
      {days.map((d, i) => (
        <DayCard
          key={d.day}
          day={d.day}
          title={d.title}
          unlocked={d.unlocked}
          index={i}
          opened={ready && state.openedDays.includes(d.day)}
          special={isQuizDay(d.day)}
        />
      ))}
    </div>
  );
}
