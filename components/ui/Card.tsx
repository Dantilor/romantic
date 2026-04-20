import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: Props) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-ink/5 bg-cream-50/80 p-8 shadow-card backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
