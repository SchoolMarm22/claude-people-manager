"use client";

import { useState } from "react";
import Link from "next/link";
import { ModuleLayout } from "@/components/layout/module-layout";
import { ChrisNote } from "@/components/shared/chris-note";
import {
  ALEX_TIMELINE,
  PIPELINE_CANDIDATES,
  PIPELINE_METRICS,
  type PipelineCandidate,
} from "@/lib/pipeline-data";
import {
  FileText,
  Users,
  UserCheck,
  Clock,
  CheckCircle,
  Circle,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";

const STAGE_COLORS: Record<string, string> = {
  applied: "bg-gray-100 text-gray-700",
  screening: "bg-blue-100 text-blue-700",
  "interview-prep": "bg-indigo-100 text-indigo-700",
  interviewing: "bg-purple-100 text-purple-700",
  debrief: "bg-amber-100 text-amber-700",
  offer: "bg-green-100 text-green-700",
  onboarding: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-600",
};

function MetricCard({
  icon: Icon,
  label,
  value,
  sublabel,
}: {
  icon: typeof FileText;
  label: string;
  value: string | number;
  sublabel?: string;
}) {
  return (
    <div className="rounded-lg border border-[#E8E5E0] bg-white p-4">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-[#D97757]" />
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9B9B9B]">
          {label}
        </p>
      </div>
      <p className="mt-2 text-2xl font-bold text-[#1A1A1A]">{value}</p>
      {sublabel && (
        <p className="mt-0.5 text-[11px] text-[#9B9B9B]">{sublabel}</p>
      )}
    </div>
  );
}

function TimelineNode({
  event,
  isLast,
}: {
  event: (typeof ALEX_TIMELINE)[0];
  isLast: boolean;
}) {
  const statusStyles = {
    complete: "bg-green-500 border-green-500",
    current: "bg-[#D97757] border-[#D97757] ring-4 ring-[#D97757]/20",
    upcoming: "bg-white border-[#E8E5E0]",
  };

  return (
    <div className="flex gap-4">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <div
          className={`h-3 w-3 flex-shrink-0 rounded-full border-2 ${statusStyles[event.status]}`}
        />
        {!isLast && <div className="w-0.5 flex-1 bg-[#E8E5E0]" />}
      </div>

      {/* Content */}
      <div className={`pb-6 ${isLast ? "pb-0" : ""}`}>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-[#9B9B9B]">
            {new Date(event.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="rounded-full bg-[#F5F3EF] px-2 py-0.5 text-[10px] font-medium text-[#6B6B6B]">
            {event.stage}
          </span>
        </div>
        <p className="mt-1 text-sm font-medium text-[#1A1A1A]">
          {event.title}
        </p>
        <p className="mt-0.5 text-xs leading-relaxed text-[#6B6B6B]">
          {event.description}
        </p>
        <Link
          href={event.moduleLink}
          className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-[#D97757] hover:text-[#C4684A]"
        >
          View in module <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

function CandidateRow({ candidate }: { candidate: PipelineCandidate }) {
  return (
    <div className="flex items-center gap-4 border-b border-[#E8E5E0] px-4 py-3 last:border-b-0">
      <div className="flex-1">
        <p className="text-sm font-medium">{candidate.name}</p>
        <p className="text-[11px] text-[#9B9B9B]">{candidate.role}</p>
      </div>
      <span
        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
          STAGE_COLORS[candidate.stage] || STAGE_COLORS.applied
        }`}
      >
        {candidate.stageLabel}
      </span>
      {candidate.score !== undefined && (
        <span className="font-mono text-xs text-[#6B6B6B]">
          {candidate.score}/10
        </span>
      )}
      <span className="text-[10px] text-[#9B9B9B]">{candidate.source}</span>
    </div>
  );
}

export default function DashboardPage() {
  const [showRejected, setShowRejected] = useState(false);
  const activeCandidates = PIPELINE_CANDIDATES.filter(
    (c) => c.stage !== "rejected"
  );
  const rejectedCandidates = PIPELINE_CANDIDATES.filter(
    (c) => c.stage === "rejected"
  );

  return (
    <ModuleLayout
      title="Dashboard"
      description="The command center — at-a-glance pipeline health, candidate journeys, and hiring velocity."
      status="demo"
    >
      <ChrisNote>
        <p>
          If this tool is the operating system for people managers, this
          dashboard is the command center. At a glance: how many positions are
          open, where are candidates in the pipeline, what needs attention today?
        </p>
        <p>
          Below you can see Alex Rivera&apos;s full journey — from application to
          onboarding — threading through every module in this demo. Each node
          links to the relevant feature page. That&apos;s the unified view that makes
          this more than a collection of tools.
        </p>
      </ChrisNote>

      {/* Metrics Row */}
      <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <MetricCard
          icon={FileText}
          label="Active Postings"
          value={PIPELINE_METRICS.activePostings}
          sublabel={
            PIPELINE_METRICS.postingNames.slice(0, 2).join(", ") + "..."
          }
        />
        <MetricCard
          icon={Users}
          label="In Pipeline"
          value={PIPELINE_METRICS.inPipeline}
          sublabel={`${PIPELINE_METRICS.inScreening} screening, ${PIPELINE_METRICS.inInterview} interview`}
        />
        <MetricCard
          icon={UserCheck}
          label="Offers / Onboarding"
          value={`${PIPELINE_METRICS.offersExtended} / ${PIPELINE_METRICS.onboarding}`}
        />
        <MetricCard
          icon={Clock}
          label="Avg. Time to Hire"
          value={PIPELINE_METRICS.avgTimeToHire}
        />
        <MetricCard
          icon={CheckCircle}
          label="Avg. Screen Score"
          value={PIPELINE_METRICS.avgScreeningScore}
          sublabel="across all specs"
        />
      </div>

      {/* Two columns: Timeline + Pipeline Table */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: Alex Rivera Timeline */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">
              Candidate Journey: Alex Rivera
            </h2>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
              Onboarding
            </span>
          </div>
          <div className="rounded-lg border border-[#E8E5E0] bg-white p-5">
            {ALEX_TIMELINE.map((event, i) => (
              <TimelineNode
                key={event.stage}
                event={event}
                isLast={i === ALEX_TIMELINE.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Right: Pipeline Table */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">
              All Candidates ({PIPELINE_CANDIDATES.length})
            </h2>
            <div className="flex gap-1">
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] text-blue-700">
                {PIPELINE_METRICS.inScreening} screening
              </span>
              <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] text-purple-700">
                {PIPELINE_METRICS.inInterview} interview
              </span>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] text-amber-700">
                {PIPELINE_METRICS.inDebrief} debrief
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-[#E8E5E0] bg-white">
            <div className="flex items-center gap-4 border-b border-[#E8E5E0] bg-[#FAFAF8] px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#9B9B9B]">
              <span className="flex-1">Candidate</span>
              <span>Stage</span>
              <span>Score</span>
              <span>Source</span>
            </div>
            {activeCandidates.map((c) => (
              <CandidateRow key={c.id} candidate={c} />
            ))}
          </div>

          <button
            onClick={() => setShowRejected(!showRejected)}
            className="mt-3 flex items-center gap-1.5 text-xs text-[#9B9B9B] hover:text-[#6B6B6B]"
          >
            {showRejected ? (
              <Circle className="h-3 w-3" />
            ) : (
              <AlertTriangle className="h-3 w-3" />
            )}
            {showRejected ? "Hide" : "Show"} not moving forward (
            {rejectedCandidates.length})
          </button>

          {showRejected && (
            <div className="mt-2 rounded-lg border border-[#E8E5E0] bg-white opacity-60">
              {rejectedCandidates.map((c) => (
                <CandidateRow key={c.id} candidate={c} />
              ))}
            </div>
          )}
        </div>
      </div>
    </ModuleLayout>
  );
}
