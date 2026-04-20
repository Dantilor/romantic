"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  day: number;
  title: string;
  unlocked: boolean;
  index: number;
  /** Already opened by the user — adds a subtle "visited" styling. */
  opened?: boolean;
  /** Day that ends a week and has a quiz (7 / 14 / 21 / 28). */
  special?: boolean;
};

export function DayCard({
  day,
  title,
  unlocked,
  index,
  opened = false,
  special = false,
}: Props) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.02, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-3xl border p-5 transition-all duration-500",
        unlocked
          ? opened
            ? "border-gold-500/30 bg-gradient-to-br from-cream-50 via-blush-50 to-beige-200 hover:-translate-y-1 hover:shadow-soft"
            : "border-ink/5 bg-gradient-to-br from-cream-50 via-blush-50 to-beige-100 hover:-translate-y-1 hover:shadow-soft"
          : "border-ink/5 bg-beige-100/60 text-ink-muted",
        special && unlocked && "ring-1 ring-gold-500/20",
      )}
    >
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "font-serif text-3xl",
            unlocked ? "text-ink" : "text-ink-muted/70",
          )}
        >
          {String(day).padStart(2, "0")}
        </span>
        <div className="flex flex-col items-end gap-1">
          {!unlocked ? (
            <span
              aria-hidden
              className="text-[10px] uppercase tracking-wider2 text-ink-muted"
            >
              Скоро
            </span>
          ) : opened ? (
            <span
              aria-label="День открыт"
              className="grid h-5 w-5 place-items-center rounded-full border border-gold-500/50 bg-cream-50 text-gold-600"
            >
              <Checkmark />
            </span>
          ) : null}
          {special && unlocked ? (
            <span className="rounded-full border border-gold-500/40 bg-cream-50 px-2 py-0.5 text-[9px] uppercase tracking-wider2 text-gold-600">
              особенный
            </span>
          ) : null}
        </div>
      </div>

      <div>
        <p
          className={cn(
            "text-xs uppercase tracking-wider2",
            unlocked ? "text-gold-600" : "text-ink-muted/70",
          )}
        >
          День
        </p>
        <p
          className={cn(
            "mt-1 line-clamp-2 font-serif text-lg leading-snug",
            unlocked ? "text-ink" : "text-ink-muted/80",
          )}
        >
          {unlocked ? title : "Открывается позже"}
        </p>
      </div>

      {unlocked ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl ring-0 ring-gold-400/0 transition-all duration-500 group-hover:ring-1 group-hover:ring-gold-400/40"
        />
      ) : null}
    </motion.div>
  );

  if (!unlocked) {
    return <div aria-disabled="true">{content}</div>;
  }

  return (
    <Link
      href={`/day/${day}`}
      aria-label={`День ${day}: ${title}${opened ? " (открыт)" : ""}`}
      className="block rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
    >
      {content}
    </Link>
  );
}

function Checkmark() {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden
      className="h-2.5 w-2.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 6.5 L5 9 L9.5 3.5" />
    </svg>
  );
}
