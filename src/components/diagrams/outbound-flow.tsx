import { ChrisNote } from "@/components/shared/chris-note";

function FlowNode({
  label,
  sublabel,
  variant = "default",
}: {
  label: string;
  sublabel?: string;
  variant?: "default" | "primary" | "external";
}) {
  const styles = {
    default: "border-[#E8E5E0] bg-white text-[#1A1A1A]",
    primary: "border-[#D97757]/30 bg-[#D97757]/5 text-[#D97757]",
    external: "border-[#E8E5E0] bg-[#F5F3EF] text-[#6B6B6B]",
  };

  return (
    <div
      className={`rounded-lg border-2 px-4 py-3 text-center ${styles[variant]}`}
    >
      <p className="text-xs font-semibold">{label}</p>
      {sublabel && (
        <p className="mt-0.5 text-[10px] text-[#9B9B9B]">{sublabel}</p>
      )}
    </div>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
        <path
          d="M0 8h20M16 2l6 6-6 6"
          stroke="#D97757"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function ArrowDown() {
  return (
    <div className="flex justify-center py-1 lg:hidden">
      <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
        <path
          d="M8 0v20M2 16l6 6 6-6"
          stroke="#D97757"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function OutboundFlow() {
  return (
    <div className="mt-8">
      <h3 className="mb-4 text-sm font-semibold text-[#1A1A1A]">
        Architecture: Outbound Job Posting Flow
      </h3>
      <div className="rounded-xl border border-[#E8E5E0] bg-[#FAFAF8] p-6">
        {/* Main flow */}
        <div className="flex flex-col items-center gap-0 lg:flex-row lg:gap-0">
          <FlowNode label="Spec File" sublabel="Team requirements" variant="primary" />
          <Arrow className="hidden lg:flex px-2" />
          <ArrowDown />
          <FlowNode label="AI: Generate Posting" sublabel="Claude API" />
          <Arrow className="hidden lg:flex px-2" />
          <ArrowDown />
          <FlowNode label="Compliance Check" sublabel="Salary, EEO, ADA" />
          <Arrow className="hidden lg:flex px-2" />
          <ArrowDown />
          <FlowNode label="Normalize DTO" sublabel="Transform per platform" />
          <Arrow className="hidden lg:flex px-2" />
          <ArrowDown />

          {/* Branching outputs */}
          <div className="space-y-2">
            <FlowNode label="Greenhouse API" variant="external" />
            <FlowNode label="LinkedIn API" variant="external" />
            <FlowNode label="Indeed API" variant="external" />
          </div>
        </div>

        {/* Annotations */}
        <div className="mt-6 grid grid-cols-1 gap-3 border-t border-[#E8E5E0] pt-4 sm:grid-cols-3">
          <div className="rounded-md bg-white p-3">
            <p className="text-[10px] font-semibold uppercase text-[#D97757]">
              DTO Layer
            </p>
            <p className="mt-1 text-[11px] text-[#6B6B6B]">
              Each platform has different field requirements. A normalization
              layer transforms our internal posting format into platform-specific
              payloads.
            </p>
          </div>
          <div className="rounded-md bg-white p-3">
            <p className="text-[10px] font-semibold uppercase text-[#D97757]">
              Auth Strategy
            </p>
            <p className="mt-1 text-[11px] text-[#6B6B6B]">
              OAuth2 tokens per platform, stored encrypted. Fallback: formatted
              output for manual copy-paste — more secure, less automated.
            </p>
          </div>
          <div className="rounded-md bg-white p-3">
            <p className="text-[10px] font-semibold uppercase text-[#D97757]">
              Approval Gate
            </p>
            <p className="mt-1 text-[11px] text-[#6B6B6B]">
              Optional review step before publishing. Legal, HR, or hiring
              manager approval depending on org policy.
            </p>
          </div>
        </div>
      </div>

      <ChrisNote>
        <p>
          The DTO normalization layer is key here. Indeed&apos;s API expects different
          fields than Greenhouse&apos;s, which differ from LinkedIn&apos;s. A simple
          transform layer that maps our internal posting schema to each platform&apos;s
          format keeps the core clean. And the manual copy-paste fallback isn&apos;t
          lazy engineering — it&apos;s acknowledging that auth integration with
          third-party HR platforms is complex and sometimes a simpler approach is
          more secure.
        </p>
      </ChrisNote>
    </div>
  );
}
