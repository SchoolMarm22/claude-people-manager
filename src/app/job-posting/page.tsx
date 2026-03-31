"use client";

import { useState } from "react";
import { ModuleLayout } from "@/components/layout/module-layout";
import { ChrisNote } from "@/components/shared/chris-note";
import { OutboundFlow } from "@/components/diagrams/outbound-flow";
import { MOCK_JOB_POSTING } from "@/lib/mock-data";
import { SPECS, type SpecKey } from "@/lib/sample-specs";
import { CheckCircle } from "lucide-react";

export default function JobPostingPage() {
  const [activeSpec, setActiveSpec] = useState<SpecKey>("fullstack-startup");
  const spec = SPECS[activeSpec];

  return (
    <ModuleLayout
      title="Job Postings"
      description="Spec-driven job templates with automatic legal compliance. The spec file is the single source of truth — the posting is generated from it."
      status="demo"
    >
      <ChrisNote>
        <p><strong>Product Notes:</strong></p>
        <p>
          There are legal requirements in job postings — salary transparency in some
          states, disability and veterans acknowledgements, etc. So there is some need
          for a templatized approach, for HR and legal reasons.
        </p>
        <p>
          Different hiring departments and teams need different positions, so we need a
          way for them to input exactly what skills, experience, etc. they need.
          Additionally, there may be some corporate boilerplate that is included as well.
        </p>
        <p>
          So, we can have saveable spec files that tailor individual postings based on
          team requirements. Depending on internal processes (legal, HR, or compliance
          review) there could be some way of submitting the posting for review, requiring
          approval before it&apos;s free to submit.
        </p>
        <p><strong>Technical Notes:</strong></p>
        <p>
          There are existing sites that people post job openings on. So we&apos;ll need
          some kind of API to post these openings to. We&apos;d likely need a
          normalization layer to handle differences in API requirements from Indeed or
          LinkedIn or Greenhouse, etc. A simple DTO that transforms the inputs into the
          appropriate structure should work well enough.
        </p>
        <p>
          Auth into those portals is trickier. SSO is a potential — we can pass along
          some kind of token, maybe — but just because we <em>can</em> doesn&apos;t
          mean we <em>should</em>. A more manual, but more secure approach would be
          outputting formatted data that can be easily copy and pasted into the job site.
        </p>
      </ChrisNote>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: Spec File */}
        <div className="flex flex-col rounded-lg border border-[#E8E5E0] bg-white">
          <div className="border-b border-[#E8E5E0] px-5 py-3">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#9B9B9B]">
              Source: Hiring Spec File
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(SPECS) as SpecKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveSpec(key)}
                  className={`rounded-md px-2.5 py-1.5 text-left transition-colors ${
                    activeSpec === key
                      ? "bg-[#D97757] text-white"
                      : "bg-[#F5F3EF] text-[#6B6B6B] hover:bg-[#E8E5E0]"
                  }`}
                >
                  <span className="block text-[11px] font-medium">{SPECS[key].manager}</span>
                  <span className={`block text-[9px] ${activeSpec === key ? "text-white/70" : "text-[#9B9B9B]"}`}>
                    {SPECS[key].label}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="h-[500px] overflow-y-auto bg-[#F5F3EF] p-5 font-mono text-xs leading-relaxed text-[#4A4A4A]">
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
                {MOCK_JOB_POSTING.title} &middot; {MOCK_JOB_POSTING.team}
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

      <div className="mt-8">
        <OutboundFlow />
      </div>
    </ModuleLayout>
  );
}
