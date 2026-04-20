"use client";

import { useCallback, useEffect, useState } from "react";
import {
  PROGRESS_EVENT,
  STORAGE_KEY,
  defaultProgress,
  loadProgress,
  markDayOpened as _markDayOpened,
  markQuizPassed as _markQuizPassed,
  markVisitedFinal as _markVisitedFinal,
  saveDateChoice as _saveDateChoice,
  type ProgressState,
} from "@/lib/progress";

export type UseProgressReturn = {
  /** `false` during SSR and the first render, `true` after mount. */
  ready: boolean;
  state: ProgressState;
  markDayOpened: (day: number) => void;
  isDayOpened: (day: number) => boolean;
  markQuizPassed: (week: number) => void;
  isQuizPassed: (week: number) => boolean;
  saveDateChoice: (week: number, ideaId: string) => void;
  getDateChoice: (week: number) => string | null;
  markVisitedFinal: () => void;
};

/**
 * Reactive view over the localStorage progress store.
 *
 * Always returns a consistent default on the first render (important for SSR
 * and hydration) and swaps to the real value in an effect. Consumers should
 * use `ready` to avoid flashing stale-looking UI.
 */
export function useProgress(): UseProgressReturn {
  const [state, setState] = useState<ProgressState>(defaultProgress);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(loadProgress());
    setReady(true);

    const handleCustom = (event: Event) => {
      const detail = (event as CustomEvent<ProgressState>).detail;
      if (detail) setState(detail);
      else setState(loadProgress());
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === STORAGE_KEY) {
        setState(loadProgress());
      }
    };

    window.addEventListener(PROGRESS_EVENT, handleCustom);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, handleCustom);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const markDayOpened = useCallback((day: number) => _markDayOpened(day), []);
  const markQuizPassed = useCallback((week: number) => _markQuizPassed(week), []);
  const saveDateChoice = useCallback(
    (week: number, ideaId: string) => _saveDateChoice(week, ideaId),
    [],
  );
  const markVisitedFinal = useCallback(() => _markVisitedFinal(), []);

  const isDayOpened = useCallback(
    (day: number) => state.openedDays.includes(day),
    [state.openedDays],
  );
  const isQuizPassed = useCallback(
    (week: number) => state.passedQuizzes.includes(week),
    [state.passedQuizzes],
  );
  const getDateChoice = useCallback(
    (week: number): string | null => state.selectedDates[week] ?? null,
    [state.selectedDates],
  );

  return {
    ready,
    state,
    markDayOpened,
    isDayOpened,
    markQuizPassed,
    isQuizPassed,
    saveDateChoice,
    getDateChoice,
    markVisitedFinal,
  };
}
