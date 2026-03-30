import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AiBadge } from "@/components/shared/ai-badge";
import { ScoreCard } from "@/components/shared/score-display";
import { RecommendationBadge } from "@/components/shared/recommendation-badge";
import { CheckCircle, AlertTriangle } from "lucide-react";

interface ScreeningResultProps {
  result: {
    overallScore: number;
    relevanceScore: number;
    skillsScore: number;
    experienceScore: number;
    summary: string;
    strengths: string;
    concerns: string;
    reasoning: string;
    recommendation: string;
    modelVersion: string;
    promptVersion: string;
    createdAt: Date;
  };
}

export function ScreeningResultCard({ result }: ScreeningResultProps) {
  const strengths = JSON.parse(result.strengths) as string[];
  const concerns = JSON.parse(result.concerns) as string[];

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CardTitle className="text-[15px]">Screening Result</CardTitle>
            <AiBadge />
          </div>
          <p className="font-mono text-[10px] text-muted-foreground/60">
            {result.modelVersion} &middot; {result.promptVersion}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Scores grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <ScoreCard label="Overall" score={result.overallScore} />
          <ScoreCard label="Relevance" score={result.relevanceScore} />
          <ScoreCard label="Skills" score={result.skillsScore} />
          <ScoreCard label="Experience" score={result.experienceScore} />
        </div>

        {/* Summary */}
        <p className="text-sm leading-relaxed">{result.summary}</p>

        {/* Strengths & Concerns */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-4">
            <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700">
              <CheckCircle className="h-3.5 w-3.5" />
              Strengths
            </h4>
            <ul className="space-y-1.5">
              {strengths.map((s, i) => (
                <li key={i} className="text-[13px] leading-snug text-emerald-900/80">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-red-100 bg-red-50/50 p-4">
            <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-red-700">
              <AlertTriangle className="h-3.5 w-3.5" />
              Concerns
            </h4>
            <ul className="space-y-1.5">
              {concerns.map((c, i) => (
                <li key={i} className="text-[13px] leading-snug text-red-900/80">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator />

        {/* Recommendation */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Recommendation
          </span>
          <RecommendationBadge recommendation={result.recommendation} />
        </div>

        {/* Reasoning (collapsible) */}
        <details className="group">
          <summary className="cursor-pointer text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground">
            View Claude&apos;s reasoning chain
            <span className="ml-1 text-xs opacity-50">
              (transparency &amp; audit trail)
            </span>
          </summary>
          <div className="mt-3 rounded-lg border bg-muted/30 p-4">
            <p className="text-[13px] leading-relaxed">{result.reasoning}</p>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground/60">
            This reasoning chain is stored for audit. In production, it would be
            correlated with bias eval results. See ADR-002.
          </p>
        </details>
      </CardContent>
    </Card>
  );
}
