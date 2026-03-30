import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { AiBadge } from "@/components/shared/ai-badge";
import { Clock, TrendingUp, Sparkles } from "lucide-react";

export default function TimesheetPage() {
  return (
    <div className="px-8 py-6">
      <PageHeader
        title="Time & PTO"
        description="Unified time tracking with longitudinal insights"
        stub
      />

      <Card className="border-dashed">
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <CardTitle className="text-[15px]">
              EM Pain Narrative: Why This Matters
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 text-[13px] leading-relaxed">
          <p>
            <strong>The Problem (from my experience):</strong> At my company,
            timesheets are in Workday, PTO requests are in BambooHR, and sprint
            capacity planning is in Jira. None of these systems talk to each
            other. The result:
          </p>
          <ul className="ml-4 list-disc space-y-1.5 text-muted-foreground">
            <li>Sprint planning is guesswork — I don&apos;t know who&apos;s on PTO until I check a separate tool</li>
            <li>End-of-year PTO reconciliation is a nightmare of cross-referencing spreadsheets</li>
            <li>&ldquo;Do we have capacity for this project?&rdquo; requires checking 3 systems manually</li>
            <li>Burnout patterns are invisible — I can&apos;t see that an engineer hasn&apos;t taken a day off in 4 months</li>
          </ul>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              The Longitudinal Insight
            </h4>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Unifying timesheet + PTO data isn&apos;t just convenience — it
              creates data relationships that don&apos;t exist in silos:
              <strong className="text-foreground"> predictive capacity planning</strong>,{" "}
              <strong className="text-foreground">burnout detection</strong>, and{" "}
              <strong className="text-foreground">cross-team dependency coordination</strong>.
            </p>
          </div>

          <div className="rounded-lg border border-primary/20 bg-primary/[0.03] p-4">
            <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary/70">
              <Sparkles className="h-3 w-3" />
              Where Claude Adds Value
            </h4>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li>&ldquo;Based on Q1 PTO patterns, Sprint 14 will have ~60% capacity. Consider descoping.&rdquo;</li>
              <li>&ldquo;3 engineers haven&apos;t taken PTO in 3+ months. Above team historical norm.&rdquo;</li>
              <li>&ldquo;Kim and Jordan both have PTO during the API migration window. Consider rescheduling.&rdquo;</li>
            </ul>
          </div>

          <p className="text-[11px] text-muted-foreground/60 italic">
            See docs/vision/timesheet-pto.md for the full technical vision and
            ADR-005 for the longitudinal argument.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
