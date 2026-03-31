import { ModuleLayout } from "@/components/layout/module-layout";
import { ChrisNote } from "@/components/shared/chris-note";

export default function OffboardingPage() {
  return (
    <ModuleLayout
      title="Offboarding"
      description="Equipment collection, access revocation, knowledge capture, and exit interviews."
      status="blank"
    >
      <ChrisNote>
        <p>Another intentionally blank page — but with a thought worth sharing.</p>
        <p>
          Access revocation is a security function. Knowledge capture is a
          product function. Most offboarding systems handle the first and
          completely ignore the second.
        </p>
        <p>
          An AI-assisted exit interview process that synthesizes across
          departures could surface systemic issues that no single conversation
          reveals. Are people leaving because of management? Compensation?
          Lack of growth? The patterns are in the data, but only if you
          structure the collection.
        </p>
        <p>
          The spec-driven approach applies here too — offboarding a contractor
          looks very different from offboarding a staff engineer who&apos;s been
          with the company for 5 years.
        </p>
      </ChrisNote>

      <div className="rounded-lg border border-dashed border-[#E8E5E0] bg-[#FAFAF8] p-12 text-center">
        <p className="text-sm text-[#9B9B9B]">
          This space intentionally left for future exploration.
        </p>
      </div>
    </ModuleLayout>
  );
}
