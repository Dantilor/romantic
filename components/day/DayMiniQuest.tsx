"use client";

import { useMemo, useState } from "react";
import type { DayExtraQuizSection } from "@/data/days";
import { cn } from "@/lib/cn";

type Props = {
  section: DayExtraQuizSection;
};

export function DayMiniQuest({ section }: Props) {
  const { title, intro, questions, finalText } = section;

  const [picked, setPicked] = useState<Record<string, string>>({});

  const introParagraphs = useMemo(
    () =>
      intro
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter(Boolean),
    [intro],
  );

  const allAnswered = questions.length > 0 && questions.every((q) => picked[q.id]);

  return (
    <section
      aria-labelledby="day-mini-quest-title"
      className="mx-auto mt-16 max-w-2xl"
    >
      <h2
        id="day-mini-quest-title"
        className="text-center font-serif text-3xl leading-tight text-ink sm:text-[2rem]"
      >
        {title}
      </h2>

      <div className="mt-6 space-y-4 text-center">
        {introParagraphs.map((para, i) => (
          <p
            key={i}
            className="text-base leading-relaxed text-ink-soft sm:text-[17px] sm:leading-[1.65]"
          >
            {para}
          </p>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-10">
        {questions.map((q) => (
          <div key={q.id} className="flex flex-col gap-3">
            <p className="text-center font-serif text-lg leading-snug text-ink sm:text-xl">
              {q.question}
            </p>
            <div
              className="flex flex-col gap-2.5 sm:gap-3"
              role="group"
              aria-label={q.question}
            >
              {q.options.map((opt) => {
                const selected = picked[q.id] === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() =>
                      setPicked((prev) => ({ ...prev, [q.id]: opt }))
                    }
                    className={cn(
                      "w-full rounded-2xl border px-4 py-3.5 text-left text-sm leading-relaxed transition-all duration-300 sm:px-5 sm:py-4 sm:text-[15px]",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
                      selected
                        ? "border-gold-500/50 bg-blush-50/90 text-ink shadow-card"
                        : "border-ink/10 bg-cream-50/80 text-ink-soft hover:border-ink/20 hover:bg-cream-50",
                    )}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {allAnswered ? (
        <div
          className="mt-12 rounded-3xl border border-ink/5 bg-cream-50/90 px-7 py-8 shadow-card sm:px-10 sm:py-9"
          role="status"
        >
          <p className="whitespace-pre-line text-center font-serif text-lg leading-[1.65] text-ink sm:text-xl">
            {finalText}
          </p>
        </div>
      ) : null}
    </section>
  );
}
