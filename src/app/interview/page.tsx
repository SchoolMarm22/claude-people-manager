import { ModuleLayout } from "@/components/layout/module-layout";
import { ChrisNote } from "@/components/shared/chris-note";

export default function InterviewPage() {
  return (
    <ModuleLayout
      title="Interview"
      description="The actual interview experience — intentionally left as a concept."
      status="blank"
    >
      <ChrisNote>
        <p>This page is intentionally blank — and that&apos;s a deliberate product decision.</p>
        <p>
          There are a myriad of ways to interview people, and it&apos;s difficult to
          shoehorn in a solution here. I&apos;d rather think on this one instead of
          putting out a half-baked idea full of holes.
        </p>
        <p>
          What if it&apos;s in person? Do we record the whole thing so an LLM
          can ingest it? That&apos;s not empathetic to the interviewee or interviewers.
        </p>
        <p>
          What if it&apos;s on Webex or Google Meet or Zoom? Same deal — should
          we treat this person&apos;s time as a commodity for transcription?
        </p>
        <p>
          I don&apos;t have solid ideas on this one at the moment, other than to
          highlight: <strong>this is a case where AI can be used, but &ldquo;should it
          be used&rdquo; is the better question.</strong>
        </p>
        <p>
          Recognizing where AI shouldn&apos;t be applied is just as important as
          knowing where it should. Shipping a mediocre solution here would
          undermine the principles driving the rest of this demo.
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
