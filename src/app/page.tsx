import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* Greeting */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          Hi, I&apos;m Chris!
        </h1>
        <p className="mt-3 text-base leading-relaxed text-[#4A4A4A]">
          I&apos;m applying for the{" "}
          <a
            href="https://job-boards.greenhouse.io/anthropic/jobs/5119478008"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#D97757] underline underline-offset-2 hover:text-[#C4684A]"
          >
            Engineering Manager of People Products
          </a>{" "}
          position at Anthropic.
        </p>
        <p className="mt-3 text-base leading-relaxed text-[#4A4A4A]">
          Since this position is about shipping products, I thought I&apos;d make a
          demo of some of my ideas. Some of the features have live Claude API
          integrations and some use mocked data — you&apos;ll see the notes on each
          page explaining which is which and why.
        </p>
      </div>

      {/* Foundational Thoughts */}
      <div className="mb-10 rounded-xl border border-[#E8E5E0] bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">
          A couple foundational thoughts that drove this project:
        </h2>
        <div className="space-y-4">
          <div className="flex gap-3">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#D97757] text-xs font-bold text-white">
              1
            </span>
            <div>
              <p className="font-medium text-[#1A1A1A]">
                This is a tool for humans working with other humans.
              </p>
              <p className="mt-1 text-sm text-[#6B6B6B]">
                AI should be used to enhance and improve that experience, but
                never to replace a human&apos;s judgement or subordinate humans to
                computers.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#D97757] text-xs font-bold text-white">
              2
            </span>
            <div>
              <p className="font-medium text-[#1A1A1A]">
                This should be configurable based on needs.
              </p>
              <p className="mt-1 text-sm text-[#6B6B6B]">
                Hiring and managing the cleaning crew has different needs and
                processes than hiring for DevOps engineers. The system should
                enable and adapt to the needs at hand.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#D97757] text-xs font-bold text-white">
              3
            </span>
            <div>
              <p className="font-medium text-[#1A1A1A]">
                This should function as a synthesis layer over existing tools.
              </p>
              <p className="mt-1 text-sm text-[#6B6B6B]">
                There are lots of existing tools around hiring and managing. We
                can preserve those systems of record while creating a better,
                unified user experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Teaser CTA */}
      <div className="rounded-xl border border-[#D97757]/20 bg-[#FDF8F0] p-6">
        <p className="text-base leading-relaxed text-[#4A4A4A]">
          Please, take a look! Play around with it! I&apos;ve included a lot of
          notes on my thinking, from both a product and technical perspective.
        </p>
        <p className="mt-3 text-sm text-[#6B6B6B]">
          Start with the{" "}
          <Link
            href="/overview"
            className="font-medium text-[#D97757] underline underline-offset-2 hover:text-[#C4684A]"
          >
            Overview
          </Link>{" "}
          to understand the spec-driven approach, or jump straight to{" "}
          <Link
            href="/screening"
            className="font-medium text-[#D97757] underline underline-offset-2 hover:text-[#C4684A]"
          >
            Application Screening
          </Link>{" "}
          to watch the same resume score a 7/10 against one spec and a 4/10
          against another.
        </p>
      </div>
    </div>
  );
}
