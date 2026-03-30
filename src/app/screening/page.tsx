"use client";

import { useState } from "react";
import { ModuleLayout } from "@/components/layout/module-layout";
import { BuilderNote } from "@/components/shared/builder-note";
import { SPECS, type SpecKey } from "@/lib/sample-specs";
import { CHRIS_RESUME } from "@/lib/chris-resume";
import { MOCK_SCREENING_RESULT } from "@/lib/mock-data";
import { Loader2, Sparkles } from "lucide-react";

type ScreeningResult = typeof MOCK_SCREENING_RESULT;

const SIGNAL_COLORS: Record<string, string> = {
  strong: "bg-green-100 text-green-800",
  moderate: "bg-amber-100 text-amber-800",
  weak: "bg-red-100 text-red-800",
  none: "bg-gray-100 text-gray-600",
};

export default function ScreeningPage() {
  const [activeSpec, setActiveSpec] = useState<SpecKey>("fullstack-startup");
  const [specContent, setSpecContent] = useState(SPECS["fullstack-startup"].content);
  const [resumeText, setResumeText] = useState(CHRIS_RESUME);
  const [result, setResult] = useState<ScreeningResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [fallback, setFallback] = useState(false);

  function handleSpecSwitch(key: SpecKey) {
    setActiveSpec(key);
    setSpecContent(SPECS[key].content);
    setResult(null);
    setFallback(false);
  }

  async function runScreening() {
    setLoading(true);
    setFallback(false);
    try {
      const res = await fetch("/api/screen-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume: resumeText, spec: specContent }),
      });
      if (!res.ok) throw new Error("API call failed");
      const data = await res.json();
      setResult(data);
    } catch {
      setResult(MOCK_SCREENING_RESULT);
      setFallback(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ModuleLayout
      title="Application Screening"
      description="AI resume analysis powered by manager-defined spec files. Edit the spec, swap between managers, and see how the same resume gets different assessments."
      status="live"
    >
      <BuilderNote>
        Traditional ATS systems match keywords. This misses context: &ldquo;full-stack at a 5-person startup&rdquo; is qualitatively different from &ldquo;full-stack at Meta.&rdquo; Spec files let managers express that nuance in natural language. The same resume evaluated against different specs produces meaningfully different results — and that&apos;s the point.
      </BuilderNote>

      {/* Three-panel layout */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Left: Spec Editor */}
        <div className="flex flex-col rounded-lg border border-[#E8E5E0] bg-white">
          <div className="border-b border-[#E8E5E0] px-4 py-3">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#9B9B9B]">
              Hiring Spec File
            </p>
            <div className="flex gap-1">
              {(Object.keys(SPECS) as SpecKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => handleSpecSwitch(key)}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    activeSpec === key
                      ? "bg-[#D97757] text-white"
                      : "bg-[#F5F3EF] text-[#6B6B6B] hover:bg-[#E8E5E0]"
                  }`}
                >
                  {SPECS[key].manager}
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={specContent}
            onChange={(e) => setSpecContent(e.target.value)}
            className="flex-1 resize-none bg-[#F5F3EF] p-4 font-mono text-xs leading-relaxed text-[#1A1A1A] focus:outline-none"
            style={{ minHeight: "400px" }}
          />
        </div>

        {/* Center: Resume Viewer */}
        <div className="flex flex-col rounded-lg border border-[#E8E5E0] bg-white">
          <div className="border-b border-[#E8E5E0] px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9B9B9B]">
              Resume
            </p>
            <p className="mt-0.5 text-xs text-[#9B9B9B]">
              Pre-loaded with Chris Martin&apos;s resume. Paste another to compare.
            </p>
          </div>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className="flex-1 resize-none bg-[#F5F3EF] p-4 font-mono text-xs leading-relaxed text-[#1A1A1A] focus:outline-none"
            style={{ minHeight: "400px" }}
          />
        </div>

        {/* Right: Output */}
        <div className="flex flex-col rounded-lg border border-[#E8E5E0] bg-white">
          <div className="flex items-center justify-between border-b border-[#E8E5E0] px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9B9B9B]">
              AI Assessment
            </p>
            <button
              onClick={runScreening}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#D97757] px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#C4684A] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Screening...
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  Run Screening
                </>
              )}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {loading && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Loader2 className="mb-3 h-6 w-6 animate-spin text-[#D97757]" />
                <p className="text-sm font-medium">Claude is reviewing...</p>
                <p className="mt-1 text-xs text-[#9B9B9B]">
                  This usually takes 5-10 seconds
                </p>
              </div>
            )}

            {!loading && !result && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-sm text-[#9B9B9B]">
                  Click &ldquo;Run Screening&rdquo; to evaluate the resume
                  against the spec.
                </p>
                <p className="mt-2 text-xs text-[#9B9B9B]">
                  Try switching specs to see different assessments.
                </p>
              </div>
            )}

            {!loading && result && (
              <div className="space-y-5">
                {fallback && (
                  <div className="rounded-md bg-amber-50 border border-amber-200 p-3 text-xs text-amber-700">
                    Live AI is temporarily unavailable. Showing a representative example.
                  </div>
                )}

                {/* Fit Score */}
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-4xl font-bold text-[#1A1A1A]">
                    {result.fit_score}
                  </span>
                  <span className="text-sm text-[#9B9B9B]">/ 10</span>
                </div>
                <p className="text-sm leading-relaxed text-[#6B6B6B]">
                  {result.fit_justification}
                </p>

                {/* Strengths */}
                <div>
                  <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-green-700">
                    Strengths
                  </h4>
                  <ul className="space-y-1.5">
                    {result.strengths.map((s: string, i: number) => (
                      <li
                        key={i}
                        className="text-[13px] leading-snug text-[#4A4A4A]"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Concerns */}
                <div>
                  <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-red-700">
                    Concerns
                  </h4>
                  <ul className="space-y-1.5">
                    {result.concerns.map((c: string, i: number) => (
                      <li
                        key={i}
                        className="text-[13px] leading-snug text-[#4A4A4A]"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Spec Alignment */}
                <div>
                  <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#6B6B6B]">
                    Spec Alignment
                  </h4>
                  <div className="space-y-2">
                    {result.spec_alignment.map(
                      (
                        item: { criterion: string; assessment: string; signal: string },
                        i: number
                      ) => (
                        <div
                          key={i}
                          className="rounded-md border border-[#E8E5E0] p-2.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium">
                              {item.criterion}
                            </span>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                                SIGNAL_COLORS[item.signal] || SIGNAL_COLORS.none
                              }`}
                            >
                              {item.signal}
                            </span>
                          </div>
                          <p className="mt-1 text-[11px] text-[#6B6B6B]">
                            {item.assessment}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Bias Check */}
                <div className="rounded-md border border-blue-200 bg-blue-50/50 p-3">
                  <h4 className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700">
                    Bias Check
                  </h4>
                  <p className="text-[12px] leading-relaxed text-blue-800/80">
                    {result.bias_check}
                  </p>
                </div>

                {/* Recommendation */}
                <div className="rounded-md border border-[#E8E5E0] bg-[#F5F3EF] p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B6B6B]">
                      Recommendation:
                    </span>
                    <span className="font-medium">{result.recommendation}</span>
                  </div>
                  <p className="mt-1 text-xs text-[#6B6B6B]">
                    {result.recommendation_rationale}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <BuilderNote>
        The Bias Check section exists because AI screening at scale amplifies any bias present in the spec. Making bias visibility a default output — not an opt-in audit — is an architectural decision about what kind of tool this should be. See ADR-002 for the full eval strategy.
      </BuilderNote>

      <BuilderNote>
        Notice that different specs produce different assessments of the same resume. This is by design. Cindi and James have legitimately different needs — Cindi wants startup instincts, James wants deep Angular expertise. The tool respects that instead of imposing a universal scoring rubric.
      </BuilderNote>

      <BuilderNote>
        In production, this module would pull applications from Greenhouse via MCP connectors, store assessments in a persistent database, and feed into a candidate pipeline view. The spec file would live in version control so teams can iterate on evaluation criteria collaboratively. See ADR-003 for the MCP integration architecture.
      </BuilderNote>
    </ModuleLayout>
  );
}
