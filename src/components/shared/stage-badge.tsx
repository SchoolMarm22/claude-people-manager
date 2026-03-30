import { cn } from "@/lib/utils";

const STAGE_CONFIG: Record<
  string,
  { label: string; bg: string; text: string; dot: string }
> = {
  applied: {
    label: "Applied",
    bg: "bg-muted",
    text: "text-muted-foreground",
    dot: "bg-muted-foreground/50",
  },
  screening: {
    label: "Screening",
    bg: "bg-amber-50",
    text: "text-amber-800",
    dot: "bg-amber-500",
  },
  interview: {
    label: "Interview",
    bg: "bg-blue-50",
    text: "text-blue-800",
    dot: "bg-blue-500",
  },
  offer: {
    label: "Offer",
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    dot: "bg-emerald-500",
  },
  hired: {
    label: "Hired",
    bg: "bg-emerald-100",
    text: "text-emerald-900",
    dot: "bg-emerald-600",
  },
  rejected: {
    label: "Rejected",
    bg: "bg-red-50",
    text: "text-red-700",
    dot: "bg-red-400",
  },
};

export function StageBadge({
  stage,
  size = "default",
}: {
  stage: string;
  size?: "sm" | "default";
}) {
  const config = STAGE_CONFIG[stage] || {
    label: stage,
    bg: "bg-muted",
    text: "text-muted-foreground",
    dot: "bg-muted-foreground/50",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        config.bg,
        config.text,
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"
      )}
    >
      <span className={cn("inline-block rounded-full", config.dot, size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2")} />
      {config.label}
    </span>
  );
}

export { STAGE_CONFIG };
