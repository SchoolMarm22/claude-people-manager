import { prisma } from "@/lib/db";
import { StageBadge } from "@/components/shared/stage-badge";
import { PageHeader } from "@/components/shared/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CandidatesPage() {
  const candidates = await prisma.candidate.findMany({
    include: {
      jobReq: true,
      screeningResult: true,
      tags: true,
      previousApplication: true,
      _count: { select: { interviews: true } },
    },
    orderBy: { appliedAt: "desc" },
  });

  return (
    <div className="px-8 py-6">
      <PageHeader
        title="All Candidates"
        description={`${candidates.length} candidates across all roles`}
      />

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Name</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Role</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Stage</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Source</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider">AI Score</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Interviews</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Applied</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Flags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates.map((c) => (
              <TableRow key={c.id} className="group">
                <TableCell>
                  <Link
                    href={`/candidates/${c.id}`}
                    className="text-[13px] font-medium group-hover:text-primary transition-colors"
                  >
                    {c.firstName} {c.lastName}
                  </Link>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {c.jobReq.title}
                </TableCell>
                <TableCell>
                  <StageBadge stage={c.stage} size="sm" />
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{c.source}</TableCell>
                <TableCell>
                  {c.screeningResult ? (
                    <span className="font-mono text-xs tabular-nums">
                      {c.screeningResult.overallScore}/5
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground/50">&mdash;</span>
                  )}
                </TableCell>
                <TableCell>
                  {c._count.interviews > 0 ? (
                    <span className="font-mono text-xs tabular-nums">{c._count.interviews}</span>
                  ) : (
                    <span className="text-xs text-muted-foreground/50">&mdash;</span>
                  )}
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {new Date(c.appliedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  {c.previousApplication && (
                    <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">
                      Repeat
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
