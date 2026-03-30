import { cn } from "@/lib/utils";

function scoreColor(score: number, max: number): string {
  const ratio = score / max;
  if (ratio >= 0.8) return "text-emerald-700";
  if (ratio >= 0.6) return "text-foreground";
  if (ratio >= 0.4) return "text-amber-700";
  return "text-red-700";
}

function scoreBg(score: number, max: number): string {
  const ratio = score / max;
  if (ratio >= 0.8) return "bg-emerald-50";
  if (ratio >= 0.6) return "bg-muted/50";
  if (ratio >= 0.4) return "bg-amber-50";
  return "bg-red-50";
}

export function ScoreCard({ label, score, max = 5 }: { label: string; score: number; max?: number }) {
  return (
    <div className={cn("rounded-lg border p-3", scoreBg(score, max))}>
      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className={cn("mt-1 font-mono text-2xl font-semibold tabular-nums", scoreColor(score, max))}>
        {score}
        <span className="text-sm text-muted-foreground">/{max}</span>
      </p>
    </div>
  );
}

export function ScoreInline({
  label,
  value,
  max,
  sublabel,
}: {
  label: string;
  value: number;
  max: number;
  sublabel?: string;
}) {
  return (
    <div className={cn("rounded-lg border px-3 py-2 text-center", scoreBg(value, max))}>
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className={cn("font-mono text-lg font-semibold tabular-nums", scoreColor(value, max))}>
        {value}
        <span className="text-xs text-muted-foreground">/{max}</span>
      </p>
      {sublabel && (
        <p className="text-[10px] text-muted-foreground">{sublabel}</p>
      )}
    </div>
  );
}
