import { ChrisNote } from "@/components/shared/chris-note";

function FlowNode({
  label,
  sublabel,
  variant = "default",
}: {
  label: string;
  sublabel?: string;
  variant?: "default" | "primary" | "security" | "external";
}) {
  const styles = {
    default: "border-[#E8E5E0] bg-white text-[#1A1A1A]",
    primary: "border-[#D97757]/30 bg-[#D97757]/5 text-[#D97757]",
    security: "border-blue-200 bg-blue-50 text-blue-700",
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

export function InboundFlow() {
  return (
    <div className="mt-8">
      <h3 className="mb-4 text-sm font-semibold text-[#1A1A1A]">
        Architecture: Inbound Application Flow
      </h3>
      <div className="rounded-xl border border-[#E8E5E0] bg-[#FAFAF8] p-6">
        {/* Main flow */}
        <div className="flex flex-col items-center gap-0 lg:flex-row lg:gap-0">
          <FlowNode
            label="Greenhouse Webhook"
            sublabel="New application event"
            variant="external"
          />
          <Arrow className="hidden lg:flex px-2" />
          <ArrowDown />
          <FlowNode
            label="Normalize"
            sublabel="Standard candidate schema"
          />
          <Arrow className="hidden lg:flex px-2" />
          <ArrowDown />
          <FlowNode
            label="PII Redaction"
            sublabel="Email, phone, address"
            variant="security"
          />
          <Arrow className="hidden lg:flex px-2" />
          <ArrowDown />
          <FlowNode
            label="Store"
            sublabel="Encrypted candidate DB"
          />
          <Arrow className="hidden lg:flex px-2" />
          <ArrowDown />
          <FlowNode
            label="Ready for Screening"
            sublabel="Spec-driven AI review"
            variant="primary"
          />
        </div>

        {/* Annotations */}
        <div className="mt-6 grid grid-cols-1 gap-3 border-t border-[#E8E5E0] pt-4 sm:grid-cols-3">
          <div className="rounded-md bg-white p-3">
            <p className="text-[10px] font-semibold uppercase text-blue-600">
              PII Security
            </p>
            <p className="mt-1 text-[11px] text-[#6B6B6B]">
              Resumes contain emails, phone numbers, addresses. PII is
              stripped before the AI screening step and stored separately
              with role-based access controls.
            </p>
          </div>
          <div className="rounded-md bg-white p-3">
            <p className="text-[10px] font-semibold uppercase text-[#D97757]">
              Webhook vs. Polling
            </p>
            <p className="mt-1 text-[11px] text-[#6B6B6B]">
              Greenhouse supports webhooks for real-time application events.
              This is preferred over polling their API — lower latency, less
              API quota usage.
            </p>
          </div>
          <div className="rounded-md bg-white p-3">
            <p className="text-[10px] font-semibold uppercase text-[#D97757]">
              Normalization
            </p>
            <p className="mt-1 text-[11px] text-[#6B6B6B]">
              Different ATS platforms structure candidate data differently.
              A normalization layer maps to our internal schema so screening
              works regardless of source.
            </p>
          </div>
        </div>
      </div>

      <ChrisNote>
        <p>
          Security is a real concern here — not just from external threats, but
          internal access too. You don&apos;t want anyone in the org to be able to
          find applicants&apos; phone numbers or addresses. The PII redaction step
          isn&apos;t optional — it&apos;s architecturally required before data
          enters the screening pipeline. Finding ways of presenting resumes while
          obfuscating PII is an interesting design challenge that depends on API
          outputs from Greenhouse or wherever the data originates.
        </p>
      </ChrisNote>
    </div>
  );
}
