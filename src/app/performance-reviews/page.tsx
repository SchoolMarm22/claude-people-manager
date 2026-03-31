import { ModuleLayout } from "@/components/layout/module-layout";
import { ChrisNote } from "@/components/shared/chris-note";

export default function PerformanceReviewsPage() {
  return (
    <ModuleLayout
      title="Performance Reviews"
      description="Spec-driven review frameworks that adapt to role and level — concept only."
      status="blank"
    >
      <ChrisNote>
        <p>This one is intentionally left blank as well.</p>
        <p>
          I&apos;m just spinning up a prototype, and I haven&apos;t put enough
          thought into this one yet to present something I&apos;d stand behind.
        </p>
        <p>
          Obviously this is critically important — getting talented people
          into positions where they can have the most impact is one of the most
          valuable things a manager does. Performance reviews, done well, are
          the mechanism for that.
        </p>
        <p>
          What I will say: the spec-driven approach applies here beautifully.
          Different roles and levels need different review criteria. A senior
          IC&apos;s review should look nothing like a junior engineer&apos;s review, and
          neither should look like a manager&apos;s review. Spec files per role/level
          would let each team define what &ldquo;excellent&rdquo; looks like for their context.
        </p>
        <p>
          The military taught me what happens when performance systems optimize
          for conformity instead of capability. Fitness reports that don&apos;t
          measure fitness. I&apos;d want to get this one right.
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
