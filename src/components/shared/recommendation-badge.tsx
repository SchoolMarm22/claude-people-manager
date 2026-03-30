import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, AlertTriangle, Minus } from "lucide-react";

const REC_CONFIG: Record<
  string,
  { icon: typeof CheckCircle; bg: string; text: string; label: string }
> = {
  advance: {
    icon: CheckCircle,
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    label: "Advance",
  },
  hold: {
    icon: Minus,
    bg: "bg-amber-50",
    text: "text-amber-700",
    label: "Hold",
  },
  reject: {
    icon: XCircle,
    bg: "bg-red-50",
    text: "text-red-700",
    label: "Reject",
  },
  strong_hire: {
    icon: CheckCircle,
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    label: "Strong Hire",
  },
  hire: {
    icon: CheckCircle,
    bg: "bg-emerald-50/70",
    text: "text-emerald-600",
    label: "Hire",
  },
  no_hire: {
    icon: XCircle,
    bg: "bg-red-50/70",
    text: "text-red-600",
    label: "No Hire",
  },
  strong_no_hire: {
    icon: XCircle,
    bg: "bg-red-50",
    text: "text-red-700",
    label: "Strong No Hire",
  },
};

export function RecommendationBadge({ recommendation }: { recommendation: string }) {
  const config = REC_CONFIG[recommendation] || {
    icon: AlertTriangle,
    bg: "bg-muted",
    text: "text-muted-foreground",
    label: recommendation.replace(/_/g, " "),
  };
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        config.bg,
        config.text
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  );
}
