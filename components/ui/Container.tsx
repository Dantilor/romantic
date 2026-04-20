import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const SIZE = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
} as const;

export function Container({ children, className, size = "md" }: Props) {
  return (
    <div className={cn("mx-auto w-full px-6 sm:px-8", SIZE[size], className)}>
      {children}
    </div>
  );
}
