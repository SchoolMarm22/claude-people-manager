import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StageBadge } from "@/components/shared/stage-badge";
import { ScoreInline } from "@/components/shared/score-display";
import { RecommendationBadge } from "@/components/shared/recommendation-badge";

interface InterviewCardProps {
  interview: {
    id: string;
    interviewerName: string;
    interviewerRole: string;
    interviewType: string;
    scheduledAt: Date;
    completedAt: Date | null;
    status: string;
    feedback: {
      overallRating: number;
      technicalRating: number | null;
      communicationRating: number | null;
      strengths: string;
      concerns: string;
      rawNotes: string;
      recommendation: string;
    } | null;
  };
}

const OVERALL_LABELS = ["Strong No", "No Hire", "Hire", "Strong Hire"];

export function InterviewCard({ interview }: InterviewCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-[15px]">
              {interview.interviewType.charAt(0).toUpperCase() +
                interview.interviewType.slice(1)}{" "}
              Interview
            </CardTitle>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {interview.interviewerName}
              <span className="mx-1 text-muted-foreground/40">&middot;</span>
              {interview.interviewerRole.replace(/_/g, " ")}
              <span className="mx-1 text-muted-foreground/40">&middot;</span>
              {new Date(interview.scheduledAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          {interview.status === "scheduled" ? (
            <span className="rounded-full border px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              Scheduled
            </span>
          ) : interview.feedback ? (
            <RecommendationBadge recommendation={interview.feedback.recommendation} />
          ) : null}
        </div>
      </CardHeader>

      {interview.feedback && (
        <CardContent className="space-y-4 pt-0">
          {/* Scores */}
          <div className="flex gap-3">
            <ScoreInline
              label="Overall"
              value={interview.feedback.overallRating}
              max={4}
              sublabel={OVERALL_LABELS[interview.feedback.overallRating - 1]}
            />
            {interview.feedback.technicalRating && (
              <ScoreInline
                label="Technical"
                value={interview.feedback.technicalRating}
                max={5}
              />
            )}
            {interview.feedback.communicationRating && (
              <ScoreInline
                label="Communication"
                value={interview.feedback.communicationRating}
                max={5}
              />
            )}
          </div>

          {/* Strengths & Concerns inline */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <h4 className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                Strengths
              </h4>
              <p className="text-[13px] leading-relaxed">
                {interview.feedback.strengths}
              </p>
            </div>
            <div>
              <h4 className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-red-700">
                Concerns
              </h4>
              <p className="text-[13px] leading-relaxed">
                {interview.feedback.concerns}
              </p>
            </div>
          </div>

          {/* Expandable full notes */}
          <details className="group">
            <summary className="cursor-pointer text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
              Full interviewer notes
            </summary>
            <div className="mt-2 rounded-lg border bg-muted/30 p-3">
              <p className="text-[13px] leading-relaxed">
                {interview.feedback.rawNotes}
              </p>
            </div>
          </details>
        </CardContent>
      )}
    </Card>
  );
}
