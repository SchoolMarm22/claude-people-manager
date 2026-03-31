"use client";

import { useState } from "react";
import { ModuleLayout } from "@/components/layout/module-layout";
import { ChrisNote } from "@/components/shared/chris-note";
import {
  CANDIDATE_ALEX,
  INTERVIEWER_SCORECARDS,
  MOCK_DEBRIEF,
} from "@/lib/mock-data";
import {
  CheckCircle,
  AlertTriangle,
  GitCompareArrows,
  Shield,
  MessageSquare,
} from "lucide-react";

const RATING_COLORS: Record<string, string> = {
  "Strong Yes": "bg-green-100 text-green-800 border-green-200",
  "Lean Yes": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Lean No": "bg-amber-50 text-amber-700 border-amber-200",
  "Strong No": "bg-red-100 text-red-800 border-red-200",
};

export default function DebriefPage() {
  const [activeInterviewer, setActiveInterviewer] = useState(0);
  const card = INTERVIEWER_SCORECARDS[activeInterviewer];

  return (
    <ModuleLayout
      title="Interview Notes"
      description="Cross-interviewer synthesis that surfaces consensus, contradictions, and potential bias — so the hiring committee can have a better conversation."
      status="demo"
    >
      <ChrisNote>
        <p>
          This one is a big challenge at my current position. We have a shared
          Trello board that people leave notes (of extremely variable quality)
          on candidates&apos; cards. That helps track people who&apos;ve interviewed
          multiple times, but typically it&apos;s just the hiring manager typing out
          a sentence — maybe 3 — with a yes or no on next steps.
        </p>
        <p>
          Systematizing the feedback, across rounds and interviewers, provides a
          much more comprehensive view of the candidate. Assessments can be
          quantified, and various text inputs can be added based on the spec file
          for the requirements!
        </p>
        <p>
          And LLMs can summarize all of the various commenters&apos; notes and
          assessments, and most interestingly — they can also{" "}
          <strong>highlight internal disagreements!</strong> Finding points of
          friction vs. points of agreement is a valuable signal to a team!
        </p>
        <p>
          Additionally, the interviewers themselves can be assessed. Does
          Interviewer A always rank a gender lower? Does Interviewer B uniformly
          provide negative feedback? Does Interviewer C just phone it in, adding
          &ldquo;LGTM&rdquo;? These internal patterns can help hiring managers
          improve their interview pipelines!
        </p>
      </ChrisNote>

      {/* Candidate header */}
      <div className="mb-6 rounded-lg border border-[#E8E5E0] bg-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-medium">{CANDIDATE_ALEX.name}</p>
            <p className="text-sm text-[#6B6B6B]">
              {CANDIDATE_ALEX.role} &middot; Applied{" "}
              {new Date(CANDIDATE_ALEX.applied).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
            {CANDIDATE_ALEX.status}
          </span>
        </div>
      </div>

      {/* Interviewer tabs */}
      <div className="mb-6">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#9B9B9B]">
          Interviewer Feedback ({INTERVIEWER_SCORECARDS.length})
        </p>
        <div className="flex gap-2 overflow-x-auto">
          {INTERVIEWER_SCORECARDS.map((sc, i) => (
            <button
              key={i}
              onClick={() => setActiveInterviewer(i)}
              className={`flex-shrink-0 rounded-md border px-3 py-2 text-left transition-colors ${
                activeInterviewer === i
                  ? "border-[#D97757] bg-[#D97757]/5"
                  : "border-[#E8E5E0] bg-white hover:border-[#D1CCC4]"
              }`}
            >
              <p className="text-xs font-medium">{sc.interviewer}</p>
              <p className="text-[10px] text-[#9B9B9B]">{sc.interviewType}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Active scorecard */}
      <div className="mb-8 rounded-lg border border-[#E8E5E0] bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[15px] font-medium">{card.interviewer}</p>
            <p className="text-xs text-[#6B6B6B]">
              {card.title} &middot; {card.interviewType}
            </p>
          </div>
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
              RATING_COLORS[card.overallRating] || "bg-gray-100 text-gray-700"
            }`}
          >
            {card.overallRating}
          </span>
        </div>

        {/* Scores */}
        <div className="mb-4 flex flex-wrap gap-2">
          {Object.entries(card.scores).map(([key, value]) => (
            <div
              key={key}
              className="rounded-md border border-[#E8E5E0] bg-[#F5F3EF] px-2.5 py-1.5"
            >
              <span className="text-[10px] text-[#9B9B9B]">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </span>
              <span className="ml-1.5 font-mono text-xs font-medium">
                {value}/5
              </span>
            </div>
          ))}
        </div>

        {/* Summary */}
        <p className="mb-4 text-sm leading-relaxed text-[#4A4A4A]">
          {card.summary}
        </p>

        {/* Strengths & Concerns */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-md border border-green-100 bg-green-50/50 p-3">
            <h4 className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-green-700">
              Strengths
            </h4>
            <ul className="space-y-1">
              {card.strengths.map((s, i) => (
                <li key={i} className="text-[12px] leading-snug text-green-900/80">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-red-100 bg-red-50/50 p-3">
            <h4 className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-red-700">
              Concerns
            </h4>
            <ul className="space-y-1">
              {card.concerns.map((c, i) => (
                <li key={i} className="text-[12px] leading-snug text-red-900/80">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Synthesis */}
      <div className="mb-6">
        <div className="mb-3 flex items-center gap-2">
          <h2 className="text-xl font-semibold">AI Synthesis</h2>
          <span className="rounded-full bg-[#D97757]/10 px-2 py-0.5 text-[10px] font-medium text-[#D97757]">
            Claude
          </span>
        </div>
        <p className="text-xs text-[#9B9B9B]">
          Pre-generated synthesis of all 4 interviewer assessments
        </p>
      </div>

      <div className="space-y-5">
        {/* Consensus Strengths */}
        <div className="rounded-lg border border-green-100 bg-green-50/50 p-5">
          <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-green-700">
            <CheckCircle className="h-3.5 w-3.5" />
            Consensus Strengths
          </h3>
          <ul className="space-y-2">
            {MOCK_DEBRIEF.consensusStrengths.map((s, i) => (
              <li key={i} className="text-[13px] leading-relaxed text-green-900/80">
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Consensus Concerns */}
        <div className="rounded-lg border border-amber-100 bg-amber-50/50 p-5">
          <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700">
            <AlertTriangle className="h-3.5 w-3.5" />
            Consensus Concerns
          </h3>
          <ul className="space-y-2">
            {MOCK_DEBRIEF.consensusConcerns.map((c, i) => (
              <li key={i} className="text-[13px] leading-relaxed text-amber-900/80">
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Contradictions */}
        {MOCK_DEBRIEF.contradictions.map((ct, i) => (
          <div
            key={i}
            className="rounded-lg border border-[#D97757]/30 bg-[#D97757]/5 p-5"
          >
            <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#D97757]">
              <GitCompareArrows className="h-3.5 w-3.5" />
              Contradiction: {ct.topic}
            </h3>
            <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="rounded-md bg-white p-3">
                <p className="text-[11px] font-medium text-[#6B6B6B]">
                  {ct.interviewerA}
                </p>
              </div>
              <div className="rounded-md bg-white p-3">
                <p className="text-[11px] font-medium text-[#6B6B6B]">
                  {ct.interviewerB}
                </p>
              </div>
            </div>
            <p className="mb-2 text-[13px] leading-relaxed text-[#4A4A4A]">
              {ct.analysis}
            </p>
            <div className="rounded-md bg-white p-3">
              <p className="text-[11px] font-semibold text-[#D97757]">
                Question for the committee:
              </p>
              <p className="mt-0.5 text-[12px] text-[#4A4A4A]">
                {ct.questionForCommittee}
              </p>
            </div>
          </div>
        ))}

        {/* Bias Flags */}
        <div className="rounded-lg border border-blue-100 bg-blue-50/30 p-5">
          <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <Shield className="h-3.5 w-3.5" />
            Bias Flags
          </h3>
          {MOCK_DEBRIEF.biasFlags.map((f, i) => (
            <p key={i} className="text-[13px] leading-relaxed text-blue-900/80">
              {f}
            </p>
          ))}
        </div>

        {/* Committee Discussion Guide */}
        <div className="rounded-lg border border-[#E8E5E0] bg-[#F5F3EF] p-5">
          <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
            <MessageSquare className="h-3.5 w-3.5" />
            Committee Discussion Guide
          </h3>
          <ol className="list-decimal space-y-2 pl-4">
            {MOCK_DEBRIEF.committeeDiscussionGuide.map((q, i) => (
              <li key={i} className="text-[13px] leading-relaxed text-[#4A4A4A]">
                {q}
              </li>
            ))}
          </ol>
        </div>

        {/* Overall Signal */}
        <div className="rounded-lg border border-[#E8E5E0] bg-white p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
              Overall Signal
            </h3>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                {MOCK_DEBRIEF.overallSignal.confidence} confidence
              </span>
              <span className="font-medium text-sm">
                {MOCK_DEBRIEF.overallSignal.recommendation}
              </span>
            </div>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-[#4A4A4A]">
            {MOCK_DEBRIEF.overallSignal.rationale}
          </p>
        </div>
      </div>
    </ModuleLayout>
  );
}
