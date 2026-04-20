import { cn } from "@/lib/cn";

type Props = {
  className?: string;
};

export function Divider({ className }: Props) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 text-gold-500/80",
        className,
      )}
      aria-hidden="true"
    >
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500/50" />
      <span className="text-xs tracking-wider2">◦</span>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500/50" />
    </div>
  );
}
