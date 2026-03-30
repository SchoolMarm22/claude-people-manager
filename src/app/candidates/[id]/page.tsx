import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StageBadge } from "@/components/shared/stage-badge";
import { AiBadge } from "@/components/shared/ai-badge";
import { PipelineProgress } from "@/components/candidates/pipeline-progress";
import { ScreeningResultCard } from "@/components/candidates/screening-result-card";
import { FeedbackSynthesisCard } from "@/components/candidates/feedback-synthesis-card";
import { InterviewCard } from "@/components/candidates/interview-card";
import { ScreenButton } from "@/components/hiring/screen-button";
import { SynthesizeButton } from "@/components/hiring/synthesize-button";
import { RefreshCw, Mail, Phone, ExternalLink, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CandidateDetailPage({ params }: PageProps) {
  const { id } = await params;

  const candidate = await prisma.candidate.findUnique({
    where: { id },
    include: {
      jobReq: true,
      screeningResult: true,
      interviews: {
        include: { feedback: true },
        orderBy: { scheduledAt: "asc" },
      },
      feedbackSummary: true,
      tags: true,
      previousApplication: {
        include: { jobReq: true },
      },
      futureApplications: true,
    },
  });

  if (!candidate) return notFound();

  const completedInterviews = candidate.interviews.filter(
    (i) => i.status === "completed" && i.feedback
  );

  return (
    <div className="px-8 py-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">
            {candidate.firstName} {candidate.lastName}
          </h1>
          <StageBadge stage={candidate.stage} />
        </div>
        <p className="mt-1 text-[15px] text-muted-foreground">
          {candidate.jobReq.title}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Mail className="h-3 w-3" />
            {candidate.email}
          </span>
          {candidate.phone && (
            <span className="inline-flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {candidate.phone}
            </span>
          )}
          {candidate.linkedIn && (
            <span className="inline-flex items-center gap-1">
              <ExternalLink className="h-3 w-3" />
              {candidate.linkedIn}
            </span>
          )}
          <span className="rounded bg-muted px-1.5 py-0.5 text-[10px]">
            Source: {candidate.source}
          </span>
        </div>
      </div>

      {/* Repeat candidate alert */}
      {candidate.previousApplication && (
        <div className="mb-6 flex gap-3 rounded-lg border border-amber-200/60 bg-amber-50/50 p-4">
          <RefreshCw className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
          <div>
            <p className="text-[13px] font-medium text-amber-800">
              Repeat Candidate
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-amber-700/80">
              Previously applied for{" "}
              <strong>{candidate.previousApplication.jobReq.title}</strong> on{" "}
              {new Date(
                candidate.previousApplication.appliedAt
              ).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              .
              {candidate.previousApplication.notes && (
                <span className="mt-1 block italic">
                  &ldquo;{candidate.previousApplication.notes}&rdquo;
                </span>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Pipeline progress */}
      <PipelineProgress stage={candidate.stage} />

      {/* Tabs */}
      <Tabs defaultValue="screening" className="mt-8">
        <TabsList>
          <TabsTrigger value="screening">
            <Sparkles className="mr-1.5 h-3 w-3" />
            AI Screening
          </TabsTrigger>
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="interviews">
            Interviews
            <span className="ml-1.5 rounded-full bg-muted px-1.5 py-px font-mono text-[10px]">
              {candidate.interviews.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="synthesis">
            <Sparkles className="mr-1.5 h-3 w-3" />
            AI Synthesis
          </TabsTrigger>
        </TabsList>

        {/* AI Screening */}
        <TabsContent value="screening">
          {candidate.screeningResult ? (
            <ScreeningResultCard result={candidate.screeningResult} />
          ) : (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2.5">
                  <CardTitle className="text-[15px]">Resume Screening</CardTitle>
                  <AiBadge />
                </div>
                <CardDescription>
                  Evaluate this candidate against job requirements with
                  structured, transparent scoring.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScreenButton
                  candidateId={candidate.id}
                  candidateName={`${candidate.firstName} ${candidate.lastName}`}
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Resume */}
        <TabsContent value="resume">
          <Card>
            <CardHeader>
              <CardTitle className="text-[15px]">Resume</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap rounded-lg border bg-muted/30 p-5 font-mono text-[13px] leading-relaxed">
                {candidate.resumeText}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Interviews */}
        <TabsContent value="interviews">
          {candidate.interviews.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-sm text-muted-foreground">
                No interviews scheduled yet.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {candidate.interviews.map((interview) => (
                <InterviewCard key={interview.id} interview={interview} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* AI Synthesis */}
        <TabsContent value="synthesis">
          {candidate.feedbackSummary ? (
            <FeedbackSynthesisCard summary={candidate.feedbackSummary} />
          ) : completedInterviews.length >= 2 ? (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2.5">
                  <CardTitle className="text-[15px]">
                    Feedback Synthesis
                  </CardTitle>
                  <AiBadge />
                </div>
                <CardDescription>
                  Synthesize {completedInterviews.length} completed interviews,
                  surfacing consensus, divergence, and potential bias patterns.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SynthesizeButton
                  candidateId={candidate.id}
                  candidateName={`${candidate.firstName} ${candidate.lastName}`}
                  interviewCount={completedInterviews.length}
                />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-sm text-muted-foreground">
                Need at least 2 completed interviews to generate a synthesis.
                <br />
                <span className="font-mono text-xs">
                  Currently: {completedInterviews.length}
                </span>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
