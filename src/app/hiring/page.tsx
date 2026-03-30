import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { StageBadge, STAGE_CONFIG } from "@/components/shared/stage-badge";
import Link from "next/link";

export const dynamic = "force-dynamic";

const PIPELINE_STAGES = [
  { key: "applied", label: "Applied" },
  { key: "screening", label: "Screening" },
  { key: "interview", label: "Interview" },
  { key: "offer", label: "Offer" },
  { key: "hired", label: "Hired" },
  { key: "rejected", label: "Rejected" },
];

export default async function HiringPipelinePage() {
  const candidates = await prisma.candidate.findMany({
    include: {
      jobReq: true,
      screeningResult: true,
      tags: true,
      previousApplication: true,
    },
    orderBy: { appliedAt: "desc" },
  });

  const byStage = PIPELINE_STAGES.map((stage) => ({
    ...stage,
    candidates: candidates.filter((c) => c.stage === stage.key),
  }));

  return (
    <div className="px-8 py-6">
      <PageHeader
        title="Hiring Pipeline"
        description="Kanban view of all candidates across pipeline stages"
      />

      <div className="flex gap-4 overflow-x-auto pb-4">
        {byStage.map((stage) => {
          const stageStyle = STAGE_CONFIG[stage.key];
          return (
            <div key={stage.key} className="min-w-[260px] max-w-[280px] flex-shrink-0">
              {/* Column header */}
              <div className="mb-2.5 flex items-center justify-between px-1">
                <StageBadge stage={stage.key} size="sm" />
                <span className="font-mono text-xs text-muted-foreground">
                  {stage.candidates.length}
                </span>
              </div>

              {/* Column body */}
              <div className="min-h-[200px] space-y-2 rounded-lg border border-dashed bg-muted/30 p-2">
                {stage.candidates.length === 0 ? (
                  <p className="py-12 text-center text-xs text-muted-foreground/60">
                    Empty
                  </p>
                ) : (
                  stage.candidates.map((c) => (
                    <Link
                      key={c.id}
                      href={`/candidates/${c.id}`}
                      className="block"
                    >
                      <Card className="transition-all hover:shadow-md hover:border-primary/20">
                        <CardContent className="p-3">
                          <p className="text-[13px] font-medium">
                            {c.firstName} {c.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {c.jobReq.title}
                          </p>

                          {/* Metadata row */}
                          <div className="mt-2 flex flex-wrap items-center gap-1.5">
                            {c.source !== "direct" && (
                              <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                                {c.source}
                              </span>
                            )}
                            {c.previousApplication && (
                              <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">
                                Repeat
                              </span>
                            )}
                            {c.screeningResult && (
                              <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                                {c.screeningResult.overallScore}/5
                              </span>
                            )}
                          </div>

                          <p className="mt-2 font-mono text-[10px] text-muted-foreground/60">
                            {new Date(c.appliedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
