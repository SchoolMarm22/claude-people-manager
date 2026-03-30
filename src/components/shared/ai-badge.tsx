import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function AiBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary",
        className
      )}
    >
      <Sparkles className="h-2.5 w-2.5" />
      Claude
    </span>
  );
}
