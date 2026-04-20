import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="text-[11px] uppercase tracking-wider2 text-gold-600">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-ink-soft",
            align === "left" && "max-w-none",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
