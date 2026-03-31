import { ChrisNote } from "@/components/shared/chris-note";
import Link from "next/link";

export default function OverviewPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          The Spec-Driven Approach
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[#6B6B6B]">
          Why markdown files are the key to AI-powered people management
        </p>
      </div>

      <ChrisNote>
        <p>
          A gross generalization is that LLMs convert English into other things.
          Code, actions, API requests, data analysis, etc. My thought process
          here is that we can do the same thing with managerial work.
        </p>
        <p>
          <strong>
            The goal is to take the innovations of Claude Code, and apply it to
            people management.
          </strong>
        </p>
      </ChrisNote>

      {/* Core Insight */}
      <div className="mb-8 rounded-xl border border-[#E8E5E0] bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">The core insight</h2>
        <p className="text-sm leading-relaxed text-[#4A4A4A]">
          Consider reviewing candidate resumes. Hiring managers have a sense of
          what the team needs, both in terms of skills and intangibles. They hold
          that context in their head as they scan through stacks of cover
          letters, CVs, resumes, and the like — screening candidates against
          this unspoken rubric.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#4A4A4A]">
          We can get that out of their head and into markdown files!
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#4A4A4A]">
          Then LLMs can proactively compare application materials against
          whatever written spec we want. And this approach is nicely abstracted
          and extensible — we can use it to hire marketers just as easily as
          HR reps and software engineers.
        </p>
      </div>

      {/* Spec Types */}
      <div className="mb-8 rounded-xl border border-[#E8E5E0] bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">
          Different steps, different specs
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-[#4A4A4A]">
          Different stages of the employee lifecycle require different spec
          files. Each one becomes a source of truth that&apos;s easily expanded,
          repurposed, edited, and updated.
        </p>
        <div className="space-y-2">
          {[
            {
              stage: "Job Postings",
              spec: "Role requirements, team context, legal compliance",
              href: "/job-posting",
            },
            {
              stage: "Resume Screening",
              spec: "Evaluation criteria, team values, dealbreakers",
              href: "/screening",
            },
            {
              stage: "Interview Prep",
              spec: "Role-specific questions, what good looks like",
              href: "/interview-prep",
            },
            {
              stage: "Onboarding",
              spec: "Company-level + team-level ramp plans",
              href: "/onboarding",
            },
            {
              stage: "Performance Reviews",
              spec: "Role-specific criteria, level expectations",
              href: "/performance-reviews",
            },
            {
              stage: "Offboarding",
              spec: "Role-appropriate knowledge capture + access",
              href: "/offboarding",
            },
          ].map((item) => (
            <Link
              key={item.stage}
              href={item.href}
              className="flex items-start gap-3 rounded-md border border-[#E8E5E0] bg-[#FAFAF8] p-3 transition-colors hover:border-[#D97757]/30 hover:bg-[#FDF8F0]"
            >
              <span className="flex-shrink-0 rounded-md bg-[#D97757]/10 px-2 py-0.5 text-xs font-medium text-[#D97757]">
                {item.stage}
              </span>
              <p className="text-sm text-[#4A4A4A]">{item.spec}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Key Benefits */}
      <div className="mb-8 rounded-xl border border-[#D97757]/20 bg-[#FDF8F0] p-6">
        <h2 className="mb-4 text-lg font-semibold">Why this works</h2>
        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#D97757] text-xs font-bold text-white">
              1
            </span>
            <div>
              <p className="font-medium text-[#1A1A1A]">
                Human expertise, machine scale
              </p>
              <p className="mt-1 text-sm text-[#6B6B6B]">
                Managers write the specs with their real-world judgment. LLMs
                apply those specs consistently across hundreds of candidates,
                docs, and reviews.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#D97757] text-xs font-bold text-white">
              2
            </span>
            <div>
              <p className="font-medium text-[#1A1A1A]">
                Portable and composable
              </p>
              <p className="mt-1 text-sm text-[#6B6B6B]">
                Specs are just markdown. They work in this app, via the MCP
                server, in Claude Desktop, or anywhere else. No lock-in.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#D97757] text-xs font-bold text-white">
              3
            </span>
            <div>
              <p className="font-medium text-[#1A1A1A]">
                Transparent and auditable
              </p>
              <p className="mt-1 text-sm text-[#6B6B6B]">
                Every decision traces back to a spec file. You can always see
                what criteria was used and why.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-sm text-[#6B6B6B]">
          See it in action &rarr;{" "}
          <Link
            href="/screening"
            className="font-medium text-[#D97757] underline underline-offset-2 hover:text-[#C4684A]"
          >
            try screening the same resume against different specs
          </Link>
        </p>
      </div>
    </div>
  );
}
