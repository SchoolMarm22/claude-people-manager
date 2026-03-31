"use client";

import { useState } from "react";
import { ModuleLayout } from "@/components/layout/module-layout";
import { ChrisNote } from "@/components/shared/chris-note";
import { SPECS, type SpecKey } from "@/lib/sample-specs";
import { CHRIS_RESUME } from "@/lib/chris-resume";
import { MOCK_INTERVIEW_PREP } from "@/lib/mock-data";
import { Loader2, Sparkles, ChevronDown, ChevronUp } from "lucide-react";

interface PrepQuestion {
  category: string;
  question: string;
  why_this_question: string;
  what_good_looks_like: string;
  red_flag: string;
}

interface PrepResult {
  candidate_snapshot: string;
  questions: PrepQuestion[];
  interviewer_context: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  "Technical Depth": "bg-blue-100 text-blue-800",
  "Experience Verification": "bg-amber-100 text-amber-800",
  "Culture & Collaboration": "bg-green-100 text-green-800",
  "Growth Areas": "bg-purple-100 text-purple-800",
};

export default function InterviewPrepPage() {
  const [activeSpec, setActiveSpec] = useState<SpecKey>("fullstack-startup");
  const [result, setResult] = useState<PrepResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [expandedQ, setExpandedQ] = useState<number | null>(null);

  async function generatePrep() {
    setLoading(true);
    setFallback(false);
    try {
      const res = await fetch("/api/interview-prep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume: CHRIS_RESUME,
          spec: SPECS[activeSpec].content,
          role_title: activeSpec === "fullstack-startup"
            ? "Full-Stack Software Engineer"
            : activeSpec === "angular-specialist"
            ? "Senior Front-End Engineer (Angular)"
            : activeSpec === "marketing-growth"
            ? "Growth Marketing Manager"
            : "Content Marketing Lead",
        }),
      });
      if (!res.ok) throw new Error("API call failed");
      const data = await res.json();
      setResult(data);
    } catch {
      setResult(MOCK_INTERVIEW_PREP as PrepResult);
      setFallback(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ModuleLayout
      title="Interview Prep"
      description="Given a candidate's resume and role spec, Claude generates tailored interview questions with context for the interviewer — not the candidate."
      status="live"
    >
      <ChrisNote>
        <p>
          This is an area where, as a hiring manager, I personally struggle. I&apos;m
          in the middle of things and I have to jump on a 30-minute screening call.
          I often end up defaulting to a stock list of questions while I re-review
          their resume.
        </p>
        <p>
          It&apos;s not empathetic with the interviewee and I end up making snap
          judgements based on some questions I always use.
        </p>
        <p>
          Having an LLM draw up a list of questions and items to investigate
          personalizes the interview. It can compare the application and resume
          with the posting and spec requirements, to find areas of congruence to
          dive into, and interesting follow-up questions or differences. It can
          find assertions to push back on, generate deeper questions, etc.
        </p>
        <p>
          It can even output a quick summary of the candidate as a much-needed
          refresher when you&apos;re going through 6 interviews in a day.{" "}
          <strong>This is something I really wish I had at my current position!</strong>
        </p>
      </ChrisNote>

      {/* Controls */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="text-xs font-medium text-[#6B6B6B]">Using spec:</span>
        {(Object.keys(SPECS) as SpecKey[]).map((key) => (
          <button
            key={key}
            onClick={() => { setActiveSpec(key); setResult(null); setFallback(false); }}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activeSpec === key
                ? "bg-[#D97757] text-white"
                : "border border-[#E8E5E0] bg-white text-[#6B6B6B] hover:border-[#D1CCC4]"
            }`}
          >
            {SPECS[key].label}
          </button>
        ))}
        <button
          onClick={generatePrep}
          disabled={loading}
          className="ml-auto inline-flex items-center gap-1.5 rounded-md bg-[#D97757] px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#C4684A] disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5" />
              Generate Interview Prep
            </>
          )}
        </button>
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Left: Candidate Info */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-[#E8E5E0] bg-white p-5">
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#9B9B9B]">
              Candidate
            </h3>
            <p className="text-lg font-medium">Chris Martin</p>
            <p className="text-xs text-[#6B6B6B]">Engineering Manager &middot; Denver, CO</p>
            <div className="mt-4 max-h-[400px] overflow-y-auto rounded-md bg-[#F5F3EF] p-3 font-mono text-[10px] leading-relaxed text-[#4A4A4A]">
              {CHRIS_RESUME.split("\n").slice(0, 30).join("\n")}
              <span className="text-[#9B9B9B]">
                {"\n"}... (resume continues)
              </span>
            </div>
          </div>
        </div>

        {/* Right: Generated Prep */}
        <div className="lg:col-span-3">
          {loading && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-[#E8E5E0] bg-white py-20 text-center">
              <Loader2 className="mb-3 h-6 w-6 animate-spin text-[#D97757]" />
              <p className="text-sm font-medium">Generating interview prep...</p>
              <p className="mt-1 text-xs text-[#9B9B9B]">This usually takes 10-15 seconds</p>
            </div>
          )}

          {!loading && !result && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[#E8E5E0] bg-white py-20 text-center">
              <p className="text-sm text-[#9B9B9B]">
                Click &ldquo;Generate Interview Prep&rdquo; to create a tailored
                question package.
              </p>
            </div>
          )}

          {!loading && result && (
            <div className="space-y-5">
              {fallback && (
                <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700">
                  Live AI is temporarily unavailable. Showing a representative example.
                </div>
              )}

              {/* Candidate Snapshot */}
              <div className="rounded-lg border border-[#E8E5E0] bg-white p-5">
                <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#9B9B9B]">
                  Candidate Snapshot
                </h3>
                <p className="text-sm leading-relaxed">{result.candidate_snapshot}</p>
              </div>

              {/* Questions */}
              <div className="space-y-3">
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#9B9B9B]">
                  Recommended Questions ({result.questions.length})
                </h3>
                {result.questions.map((q, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-[#E8E5E0] bg-white"
                  >
                    <button
                      onClick={() => setExpandedQ(expandedQ === i ? null : i)}
                      className="flex w-full items-start justify-between p-4 text-left"
                    >
                      <div className="flex-1">
                        <div className="mb-1.5 flex items-center gap-2">
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                              CATEGORY_COLORS[q.category] || "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {q.category}
                          </span>
                        </div>
                        <p className="text-sm font-medium leading-snug">
                          {q.question}
                        </p>
                      </div>
                      {expandedQ === i ? (
                        <ChevronUp className="ml-3 mt-1 h-4 w-4 flex-shrink-0 text-[#9B9B9B]" />
                      ) : (
                        <ChevronDown className="ml-3 mt-1 h-4 w-4 flex-shrink-0 text-[#9B9B9B]" />
                      )}
                    </button>
                    {expandedQ === i && (
                      <div className="border-t border-[#E8E5E0] px-4 py-3 text-xs space-y-2">
                        <div>
                          <span className="font-semibold text-[#6B6B6B]">
                            Why this question:{" "}
                          </span>
                          <span className="text-[#4A4A4A]">{q.why_this_question}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-green-700">
                            What good looks like:{" "}
                          </span>
                          <span className="text-[#4A4A4A]">{q.what_good_looks_like}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-red-700">
                            Red flag:{" "}
                          </span>
                          <span className="text-[#4A4A4A]">{q.red_flag}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Interviewer Context */}
              <div className="rounded-lg border border-[#E8E5E0] bg-[#F5F3EF] p-5">
                <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#9B9B9B]">
                  Interviewer Context
                </h3>
                <p className="text-sm leading-relaxed text-[#4A4A4A]">
                  {result.interviewer_context}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </ModuleLayout>
  );
}
