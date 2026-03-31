"use client";

import { useState } from "react";
import { ModuleLayout } from "@/components/layout/module-layout";
import { ChrisNote } from "@/components/shared/chris-note";
import { InboundFlow } from "@/components/diagrams/inbound-flow";
import { SPECS, type SpecKey } from "@/lib/sample-specs";
import { CHRIS_RESUME } from "@/lib/chris-resume";
import { MOCK_RESUMES } from "@/lib/mock-resumes";
import { MOCK_SCREENING_RESULT } from "@/lib/mock-data";
import { Loader2, Sparkles } from "lucide-react";

type ScreeningResult = typeof MOCK_SCREENING_RESULT;

const SIGNAL_COLORS: Record<string, string> = {
  strong: "bg-green-100 text-green-800",
  moderate: "bg-amber-100 text-amber-800",
  weak: "bg-red-100 text-red-800",
  none: "bg-gray-100 text-gray-600",
};

const ALL_RESUMES = [
  { id: "chris-martin", name: "Chris Martin", label: "Chris Martin", sublabel: "EM / Portfolio", content: CHRIS_RESUME },
  ...MOCK_RESUMES.map((r) => ({ ...r, sublabel: r.label })),
];

export default function ScreeningPage() {
  const [activeSpec, setActiveSpec] = useState<SpecKey>("fullstack-startup");
  const [specContent, setSpecContent] = useState(SPECS["fullstack-startup"].content);
  const [activeResume, setActiveResume] = useState("chris-martin");
  const [resumeText, setResumeText] = useState(CHRIS_RESUME);
  const [result, setResult] = useState<ScreeningResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [fallback, setFallback] = useState(false);

  function handleResumeSwitch(id: string) {
    const resume = ALL_RESUMES.find((r) => r.id === id);
    if (!resume) return;
    setActiveResume(id);
    setResumeText(resume.content);
    setResult(null);
    setFallback(false);
  }

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
      <ChrisNote>
        <p>
          This is the critical area in my opinion. Prospective employees and
          hiring managers are in an AI arms race. It&apos;s trivial now for people
          to apply to thousands of positions, so hiring managers have a massive
          number of applications to review.
        </p>
        <p>LLM review as a first pass helps with several things:</p>
        <p>
          <strong>1)</strong> It can help remove latent bias from the process.{" "}
          <strong>2)</strong> It can screen a candidate more holistically than ATS
          keyword monitors. <strong>3)</strong> It can take in personalized
          screening criteria via spec files.
        </p>
        <p>
          This third point is the one that gets me the most excited! Consider:
          Candidate A was a full stack dev at Meta for 3 years. Candidate B was a
          full stack dev at a seed-funded startup for 3 years. On paper, very
          similar — but a spec file lets the hiring manager inject the{" "}
          <em>art</em> they use when screening. We&apos;re comparing: the posting,
          the application, the spec file — and having an LLM assess and critique
          the applicant. Try switching specs below to see this in action!
        </p>
        <p>
          <strong>Technical Note:</strong> We&apos;d need APIs to pull applicants in,
          tag with unique identifiers, and store their data. Since resumes contain
          PII (email, phone, address), security is a real concern — not just
          externally, but internally too. Finding ways of presenting resumes while
          obfuscating PII is an interesting design challenge.
        </p>
      </ChrisNote>

      {/* Instructions */}
      <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50/50 p-4">
        <p className="text-sm font-medium text-blue-800">
          How to use this demo
        </p>
        <p className="mt-1 text-xs leading-relaxed text-blue-700/80">
          Pick a <strong>hiring spec</strong> on the left (each represents a
          different manager&apos;s criteria) and a <strong>resume</strong> in the
          center. Then click <strong>&ldquo;Run Screening&rdquo;</strong> to see
          Claude evaluate the resume against that spec in real time. Try
          switching specs to see how the same resume gets dramatically different
          scores based on what the team actually needs.
        </p>
      </div>

      {/* Three-panel layout */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Left: Spec Editor */}
        <div className="flex flex-col rounded-lg border border-[#E8E5E0] bg-white">
          <div className="border-b border-[#E8E5E0] px-4 py-3">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#9B9B9B]">
              Hiring Spec File
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(SPECS) as SpecKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => handleSpecSwitch(key)}
                  className={`rounded-md px-2.5 py-1.5 text-left transition-colors ${
                    activeSpec === key
                      ? "bg-[#D97757] text-white"
                      : "bg-[#F5F3EF] text-[#6B6B6B] hover:bg-[#E8E5E0]"
                  }`}
                >
                  <span className="block text-[11px] font-medium">{SPECS[key].manager}</span>
                  <span className={`block text-[9px] ${activeSpec === key ? "text-white/70" : "text-[#9B9B9B]"}`}>
                    {SPECS[key].label.replace(/^.*?—\s*/, "").slice(0, 30)}
                  </span>
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
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#9B9B9B]">
              Resume
            </p>
            <div className="flex flex-wrap gap-1.5">
              {ALL_RESUMES.map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleResumeSwitch(r.id)}
                  className={`rounded-md px-2.5 py-1.5 text-left transition-colors ${
                    activeResume === r.id
                      ? "bg-[#1A1A1A] text-white"
                      : "bg-[#F5F3EF] text-[#6B6B6B] hover:bg-[#E8E5E0]"
                  }`}
                >
                  <span className="block text-[11px] font-medium">{r.name}</span>
                  <span className={`block text-[9px] ${activeResume === r.id ? "text-white/60" : "text-[#9B9B9B]"}`}>
                    {r.sublabel}
                  </span>
                </button>
              ))}
            </div>
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

      <div className="mt-8">
        <InboundFlow />
      </div>
    </ModuleLayout>
  );
}
