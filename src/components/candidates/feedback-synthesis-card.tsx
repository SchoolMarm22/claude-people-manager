import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AiBadge } from "@/components/shared/ai-badge";
import { AlertTriangle, CheckCircle, GitCompareArrows } from "lucide-react";

interface FeedbackSynthesisProps {
  summary: {
    summary: string;
    consensusPoints: string;
    divergencePoints: string;
    riskFactors: string;
    recommendation: string;
    confidence: string;
    modelVersion: string;
    promptVersion: string;
  };
}

export function FeedbackSynthesisCard({ summary }: FeedbackSynthesisProps) {
  const consensus = JSON.parse(summary.consensusPoints) as string[];
  const divergence = JSON.parse(summary.divergencePoints) as string[];
  const risks = JSON.parse(summary.riskFactors) as string[];

  const confidenceStyle = {
    high: "bg-emerald-100 text-emerald-700",
    medium: "bg-amber-100 text-amber-700",
    low: "bg-red-100 text-red-700",
  }[summary.confidence] || "bg-muted text-muted-foreground";

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CardTitle className="text-[15px]">Feedback Synthesis</CardTitle>
            <AiBadge />
          </div>
          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${confidenceStyle}`}>
            {summary.confidence} confidence
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm leading-relaxed">{summary.summary}</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Consensus */}
          <div className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-4">
            <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700">
              <CheckCircle className="h-3.5 w-3.5" />
              Consensus
            </h4>
            <ul className="space-y-1.5">
              {consensus.map((c, i) => (
                <li key={i} className="text-[13px] leading-snug text-emerald-900/80">
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Divergence */}
          <div className="rounded-lg border border-amber-100 bg-amber-50/50 p-4">
            <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700">
              <GitCompareArrows className="h-3.5 w-3.5" />
              Divergence
            </h4>
            <ul className="space-y-1.5">
              {divergence.map((d, i) => (
                <li key={i} className="text-[13px] leading-snug text-amber-900/80">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Risk factors */}
        {risks.length > 0 && (
          <div className="rounded-lg border border-red-100 bg-red-50/30 p-4">
            <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-red-700">
              <AlertTriangle className="h-3.5 w-3.5" />
              Bias Risk Factors
            </h4>
            <ul className="space-y-1.5">
              {risks.map((r, i) => (
                <li key={i} className="text-[13px] leading-snug text-red-900/80">
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Separator />

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Recommendation
          </h4>
          <p className="mt-1 text-sm leading-relaxed">{summary.recommendation}</p>
        </div>
      </CardContent>
    </Card>
  );
}
