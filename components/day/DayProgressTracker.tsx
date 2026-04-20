"use client";

import { useEffect } from "react";
import { markDayOpened } from "@/lib/progress";

type Props = {
  day: number;
};

/**
 * Records a visit to a day page. Rendered only inside the "day is unlocked"
 * branch of the server page, so we don't mark locked days as opened.
 */
export function DayProgressTracker({ day }: Props) {
  useEffect(() => {
    markDayOpened(day);
  }, [day]);

  return null;
}
