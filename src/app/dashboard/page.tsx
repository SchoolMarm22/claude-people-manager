import { prisma } from "@/lib/db";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { StageBadge } from "@/components/shared/stage-badge";
import { AiBadge } from "@/components/shared/ai-badge";
import Link from "next/link";
import {
  Users,
  Briefcase,
  MessageSquare,
  AlertTriangle,
  ArrowUpRight,
  RefreshCw,
  Sparkles,
  GitCompareArrows,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [candidates, jobReqs, interviews, recentCandidates] =
    await Promise.all([
      prisma.candidate.groupBy({
        by: ["stage"],
        _count: { id: true },
      }),
      prisma.jobRequisition.findMany({
        where: { status: "open" },
        include: { _count: { select: { candidates: true } } },
      }),
      prisma.interview.findMany({
        where: { status: "scheduled" },
        include: { candidate: true },
        orderBy: { scheduledAt: "asc" },
        take: 5,
      }),
      prisma.candidate.findMany({
        orderBy: { appliedAt: "desc" },
        take: 5,
        include: { jobReq: true, screeningResult: true },
      }),
    ]);

  const stageMap = Object.fromEntries(
    candidates.map((c) => [c.stage, c._count.id])
  );
  const totalCandidates = candidates.reduce(
    (sum, c) => sum + c._count.id,
    0
  );
  const needsScreening = stageMap["applied"] || 0;
  const inInterview = stageMap["interview"] || 0;
  const pendingOffer = stageMap["offer"] || 0;

  return (
    <div className="px-8 py-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your people pipeline"
      />

      {/* Stat cards */}
      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Candidates"
          value={totalCandidates}
          sub={`Across ${jobReqs.length} open roles`}
          icon={Users}
        />
        <StatCard
          label="Needs Screening"
          value={needsScreening}
          sub="Awaiting AI-assisted review"
          icon={AlertTriangle}
          accent
        />
        <StatCard
          label="In Interviews"
          value={inInterview}
          sub="Active interview loops"
          icon={MessageSquare}
        />
        <StatCard
          label="Pending Offers"
          value={pendingOffer}
          sub="Ready for offer stage"
          icon={Briefcase}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column: Open Roles + Recent */}
        <div className="space-y-6 lg:col-span-2">
          {/* Open Roles */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-[15px]">Open Roles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {jobReqs.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                  >
                    <div>
                      <Link
                        href={`/hiring?req=${req.id}`}
                        className="text-sm font-medium hover:text-primary transition-colors"
                      >
                        {req.title}
                        <ArrowUpRight className="ml-1 inline h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {req.department} &middot; {req.level}
                      </p>
                    </div>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 font-mono text-xs text-muted-foreground">
                      {req._count.candidates}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Applications */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-[15px]">
                Recent Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {recentCandidates.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/candidates/${c.id}`}
                        className="text-sm font-medium hover:text-primary transition-colors"
                      >
                        {c.firstName} {c.lastName}
                      </Link>
                      <p className="truncate text-xs text-muted-foreground">
                        {c.jobReq.title}
                      </p>
                    </div>
                    <StageBadge stage={c.stage} size="sm" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column: AI Insights + Upcoming */}
        <div className="space-y-6">
          {/* AI Insights */}
          <Card className="border-primary/20 bg-primary/[0.02]">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <CardTitle className="text-[15px]">AI Insights</CardTitle>
                <AiBadge />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <InsightCard
                icon={RefreshCw}
                title="Repeat Candidate Detected"
                description="James Chen has reapplied for Senior Software Engineer. Previous application was Sept 2025 — he's been promoted since."
                variant="warn"
              />
              <InsightCard
                icon={GitCompareArrows}
                title="Interview Divergence"
                description='Marcus Johnson: "strong hire" from behavioral, "no hire" from technical. Investigate before bar raiser.'
                variant="info"
              />
              <InsightCard
                icon={Sparkles}
                title={`${needsScreening} Awaiting Screening`}
                description="Use the AI screener to evaluate new applicants with structured, transparent scoring."
                variant="default"
              />
            </CardContent>
          </Card>

          {/* Upcoming Interviews */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-[15px]">
                Upcoming Interviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              {interviews.length === 0 ? (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  No upcoming interviews
                </p>
              ) : (
                <div className="divide-y">
                  {interviews.map((i) => (
                    <div key={i.id} className="py-3 first:pt-0 last:pb-0">
                      <Link
                        href={`/candidates/${i.candidateId}`}
                        className="text-sm font-medium hover:text-primary transition-colors"
                      >
                        {i.candidate.firstName} {i.candidate.lastName}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {i.interviewType} &middot; {i.interviewerName}
                      </p>
                      <p className="mt-0.5 font-mono text-[11px] text-muted-foreground/70">
                        {new Date(i.scheduledAt).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number;
  sub: string;
  icon: typeof Users;
  accent?: boolean;
}) {
  return (
    <Card className={accent ? "border-primary/20 bg-primary/[0.03]" : ""}>
      <CardContent className="pt-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {label}
            </p>
            <p className="mt-1 font-mono text-3xl font-semibold tabular-nums">
              {value}
            </p>
          </div>
          <div className={accent ? "rounded-md bg-primary/10 p-2" : "rounded-md bg-muted p-2"}>
            <Icon className={`h-4 w-4 ${accent ? "text-primary" : "text-muted-foreground"}`} />
          </div>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
      </CardContent>
    </Card>
  );
}

function InsightCard({
  icon: Icon,
  title,
  description,
  variant = "default",
}: {
  icon: typeof Sparkles;
  title: string;
  description: string;
  variant?: "default" | "warn" | "info";
}) {
  const styles = {
    default: "border-border bg-card",
    warn: "border-amber-200/60 bg-amber-50/50",
    info: "border-blue-200/60 bg-blue-50/50",
  };

  const iconStyles = {
    default: "text-muted-foreground",
    warn: "text-amber-600",
    info: "text-blue-600",
  };

  return (
    <div className={`rounded-lg border p-3 ${styles[variant]}`}>
      <div className="flex gap-2.5">
        <Icon className={`mt-0.5 h-3.5 w-3.5 flex-shrink-0 ${iconStyles[variant]}`} />
        <div>
          <p className="text-[13px] font-medium leading-tight">{title}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
