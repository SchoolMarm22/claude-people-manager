import { ChrisNote } from "@/components/shared/chris-note";

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">
        Thanks for checking this out!
      </h1>
      <p className="mt-2 text-sm text-[#6B6B6B]">
        A closing note from Chris
      </p>

      <div className="mt-8">
        <ChrisNote>
          <p>
            Thank you for checking out my little demo here. Hopefully some of
            these ideas are resonating with you!
          </p>
          <p>
            One thing I really want to highlight is the{" "}
            <strong>spec-based abstraction</strong> that runs through this entire
            project.
          </p>
          <p>
            I don&apos;t have any internal knowledge on the direction of this
            position, beyond helping Anthropic find, hire, and retain the best
            possible people. But I also know that tools like Claude Code and
            Claude Cowork were built to scratch an internal itch and turned into
            massive product successes.
          </p>
          <p>
            This spec-driven approach can provide the same type of tooling for
            enterprises and SMBs. Every feature in this demo — from screening to
            onboarding to 1:1s — is driven by configurable spec files that adapt
            to different teams, roles, and processes.
          </p>
          <p>
            Building a wonderful internal product is clearly the primary goal,
            but keeping it abstracted and spec-driven provides an opportunity for
            further product extensions into the Claude ecosystem.
          </p>
          <p>
            That&apos;s the kind of thinking I&apos;d bring to this role every day.
          </p>
        </ChrisNote>
      </div>

      {/* Spec-driven recap */}
      <div className="mt-8 rounded-xl border border-[#E8E5E0] bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">
          The spec-driven pattern, everywhere:
        </h2>
        <div className="space-y-3">
          {[
            {
              feature: "Job Postings",
              spec: "Spec files define requirements → postings generated with compliance",
            },
            {
              feature: "Screening",
              spec: "Spec files define evaluation criteria → AI screens against them",
            },
            {
              feature: "Interview Prep",
              spec: "Spec files + resume → tailored questions for the interviewer",
            },
            {
              feature: "Interview Notes",
              spec: "Spec-defined rubrics → structured cross-interviewer synthesis",
            },
            {
              feature: "Onboarding",
              spec: "Company spec + team spec → personalized ramp plans",
            },
            {
              feature: "1:1s",
              spec: "Structured notes + AI recall → institutional memory that persists",
            },
          ].map((item) => (
            <div
              key={item.feature}
              className="flex items-start gap-3 rounded-md border border-[#E8E5E0] bg-[#FAFAF8] p-3"
            >
              <span className="flex-shrink-0 rounded-md bg-[#D97757]/10 px-2 py-0.5 text-xs font-medium text-[#D97757]">
                {item.feature}
              </span>
              <p className="text-sm text-[#4A4A4A]">{item.spec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="mt-8 rounded-xl border border-[#D97757]/20 bg-[#FDF8F0] p-6 text-center">
        <p className="text-base font-medium text-[#1A1A1A]">
          Let&apos;s talk about building this for real.
        </p>
        <div className="mt-3 flex items-center justify-center text-sm">
          <a
            href="https://www.linkedin.com/in/chris-martin-dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#D97757] hover:text-[#C4684A] transition-colors"
          >
            Connect on LinkedIn &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
