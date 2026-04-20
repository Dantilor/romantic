"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "outline";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  full?: boolean;
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-ink text-cream hover:bg-ink-soft shadow-card hover:shadow-soft",
  ghost:
    "bg-transparent text-ink hover:bg-blush-50",
  outline:
    "border border-ink/20 bg-transparent text-ink hover:border-ink/40 hover:bg-cream-50",
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = "primary", full, className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(BASE, VARIANTS[variant], full && "w-full", className)}
      {...rest}
    />
  );
});
