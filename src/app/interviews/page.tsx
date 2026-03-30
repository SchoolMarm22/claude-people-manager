import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { RecommendationBadge } from "@/components/shared/recommendation-badge";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function InterviewsPage() {
  const interviews = await prisma.interview.findMany({
    include: {
      candidate: { include: { jobReq: true } },
      feedback: true,
    },
    orderBy: { scheduledAt: "desc" },
  });

  const scheduled = interviews.filter((i) => i.status === "scheduled");
  const completed = interviews.filter((i) => i.status === "completed");

  return (
    <div className="px-8 py-6">
      <PageHeader
        title="Interviews"
        description={`${scheduled.length} upcoming, ${completed.length} completed`}
      />

      <div className="space-y-8">
        {scheduled.length > 0 && (
          <section>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Upcoming
            </h2>
            <div className="space-y-2">
              {scheduled.map((i) => (
                <Card key={i.id}>
                  <CardContent className="flex items-center justify-between py-4">
                    <div>
                      <Link
                        href={`/candidates/${i.candidateId}`}
                        className="text-[13px] font-medium hover:text-primary transition-colors"
                      >
                        {i.candidate.firstName} {i.candidate.lastName}
                      </Link>
                      <span className="mx-1.5 text-muted-foreground/40">&middot;</span>
                      <span className="text-[13px]">{i.interviewType} interview</span>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {i.interviewerName} ({i.interviewerRole.replace(/_/g, " ")})
                        <span className="mx-1 text-muted-foreground/40">&middot;</span>
                        {i.candidate.jobReq.title}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="rounded-full border px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                        Scheduled
                      </span>
                      <p className="mt-1 font-mono text-[11px] text-muted-foreground/60">
                        {new Date(i.scheduledAt).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                        {" at "}
                        {new Date(i.scheduledAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Completed
          </h2>
          <div className="space-y-2">
            {completed.map((i) => (
              <Card key={i.id}>
                <CardContent className="flex items-center justify-between py-4">
                  <div>
                    <Link
                      href={`/candidates/${i.candidateId}`}
                      className="text-[13px] font-medium hover:text-primary transition-colors"
                    >
                      {i.candidate.firstName} {i.candidate.lastName}
                    </Link>
                    <span className="mx-1.5 text-muted-foreground/40">&middot;</span>
                    <span className="text-[13px]">{i.interviewType} interview</span>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {i.interviewerName} ({i.interviewerRole.replace(/_/g, " ")})
                      <span className="mx-1 text-muted-foreground/40">&middot;</span>
                      {i.candidate.jobReq.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {i.feedback && (
                      <>
                        <div className="hidden text-right text-xs text-muted-foreground sm:block">
                          <span className="font-mono">{i.feedback.overallRating}/4</span>
                          {i.feedback.technicalRating && (
                            <span className="ml-2 font-mono">T:{i.feedback.technicalRating}/5</span>
                          )}
                        </div>
                        <RecommendationBadge recommendation={i.feedback.recommendation} />
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
