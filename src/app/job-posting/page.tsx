import { ModuleLayout } from "@/components/layout/module-layout";
import { BuilderNote } from "@/components/shared/builder-note";
import { MOCK_JOB_POSTING } from "@/lib/mock-data";
import { SPECS } from "@/lib/sample-specs";
import { CheckCircle } from "lucide-react";

export default function JobPostingPage() {
  const spec = SPECS["fullstack-startup"];

  return (
    <ModuleLayout
      title="Job Posting"
      description="Spec-driven job templates with automatic legal compliance. The spec file is the single source of truth — the posting is generated from it."
      status="demo"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: Spec File */}
        <div className="rounded-lg border border-[#E8E5E0] bg-white">
          <div className="border-b border-[#E8E5E0] px-5 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9B9B9B]">
              Source: Hiring Spec File
            </p>
            <p className="mt-0.5 text-xs text-[#9B9B9B]">
              {spec.label}
            </p>
          </div>
          <div className="max-h-[600px] overflow-y-auto bg-[#F5F3EF] p-5 font-mono text-xs leading-relaxed text-[#4A4A4A]">
            <pre className="whitespace-pre-wrap">{spec.content}</pre>
          </div>
        </div>

        {/* Right: Generated Posting */}
        <div>
          <div className="rounded-lg border border-[#E8E5E0] bg-white">
            <div className="border-b border-[#E8E5E0] px-5 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9B9B9B]">
                Generated Job Posting
              </p>
              <p className="mt-0.5 text-xs text-[#9B9B9B]">
                {MOCK_JOB_POSTING.title} · {MOCK_JOB_POSTING.team}
              </p>
            </div>
            <div className="p-5">
              <div className="mb-4 flex flex-wrap gap-2 text-xs text-[#6B6B6B]">
                <span className="rounded-md border border-[#E8E5E0] px-2 py-1">
                  {MOCK_JOB_POSTING.location}
                </span>
                <span className="rounded-md border border-[#E8E5E0] px-2 py-1">
                  {MOCK_JOB_POSTING.salary}
                </span>
                <span className="rounded-md border border-[#E8E5E0] px-2 py-1">
                  Manager: {MOCK_JOB_POSTING.manager}
                </span>
              </div>
              <div className="prose prose-sm max-w-none whitespace-pre-wrap text-[13px] leading-relaxed text-[#4A4A4A]">
                {MOCK_JOB_POSTING.generatedPosting}
              </div>
            </div>
          </div>

          {/* Compliance Badges */}
          <div className="mt-4 rounded-lg border border-[#E8E5E0] bg-white p-5">
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#9B9B9B]">
              Automatic Compliance
            </h3>
            <div className="space-y-2">
              {MOCK_JOB_POSTING.complianceNotes.map((note, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                  <span className="text-xs font-medium">{note.type}</span>
                  <span className="text-[10px] text-[#9B9B9B]">
                    {note.jurisdictions}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BuilderNote>
        LLMs can draft job postings from specs, but a human must own the final version. The language in a posting shapes who applies — that&apos;s too important to fully automate.
      </BuilderNote>

      <BuilderNote>
        State-level compliance (salary transparency laws, veteran preference screening) is a perfect use case for AI — the rules are complex, change frequently, and missing one creates legal exposure. But the AI should flag and suggest, not silently insert.
      </BuilderNote>

      <BuilderNote>
        In production, this integrates with Greenhouse and Indeed via MCP connectors. The spec file becomes the single source of truth that feeds both internal tracking and external posting platforms. See ADR-003 for the MCP integration architecture.
      </BuilderNote>
    </ModuleLayout>
  );
}
