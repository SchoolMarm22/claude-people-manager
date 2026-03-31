"use client";

import { useState } from "react";
import { ModuleLayout } from "@/components/layout/module-layout";
import { ChrisNote } from "@/components/shared/chris-note";
import { ONBOARDING_COMPANY, ONBOARDING_TEAM } from "@/lib/mock-data";
import { CheckCircle, Circle, Clock, ArrowRight } from "lucide-react";

const STATUS_ICON: Record<string, typeof CheckCircle> = {
  complete: CheckCircle,
  in_progress: Clock,
  not_started: Circle,
  scheduled: Clock,
};

const STATUS_STYLE: Record<string, string> = {
  complete: "text-green-600",
  in_progress: "text-amber-500",
  not_started: "text-[#9B9B9B]",
  scheduled: "text-blue-500",
};

interface ChecklistItem {
  id: number;
  task: string;
  status: string;
  owner: string;
  dueDate?: string;
  scheduledDate?: string;
  progress?: string;
}

function ChecklistSection({
  title,
  items: initialItems,
  completedCount: initCompleted,
  totalCount,
}: {
  title: string;
  items: ChecklistItem[];
  completedCount: number;
  totalCount: number;
}) {
  const [items, setItems] = useState(initialItems);
  const [completed, setCompleted] = useState(initCompleted);

  function toggleItem(id: number) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const newStatus = item.status === "complete" ? "not_started" : "complete";
        if (newStatus === "complete") setCompleted((c) => c + 1);
        else setCompleted((c) => c - 1);
        return { ...item, status: newStatus };
      })
    );
  }

  const pct = Math.round((completed / totalCount) * 100);

  return (
    <div className="rounded-lg border border-[#E8E5E0] bg-white">
      <div className="border-b border-[#E8E5E0] px-5 py-3">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9B9B9B]">
            {title}
          </p>
          <span className="font-mono text-xs text-[#6B6B6B]">
            {completed}/{totalCount}
          </span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-[#F5F3EF]">
          <div
            className="h-1.5 rounded-full bg-[#D97757] transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <div className="divide-y divide-[#E8E5E0]">
        {items.map((item) => {
          const Icon = STATUS_ICON[item.status] || Circle;
          const style = STATUS_STYLE[item.status] || STATUS_STYLE.not_started;
          return (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className="flex w-full items-start gap-3 px-5 py-3 text-left transition-colors hover:bg-[#FAFAF8]"
            >
              <Icon className={`mt-0.5 h-4 w-4 flex-shrink-0 ${style}`} />
              <div className="flex-1">
                <p
                  className={`text-[13px] leading-snug ${
                    item.status === "complete"
                      ? "text-[#9B9B9B] line-through"
                      : "text-[#1A1A1A]"
                  }`}
                >
                  {item.task}
                </p>
                <p className="mt-0.5 text-[10px] text-[#9B9B9B]">
                  {item.owner}
                  {item.dueDate && ` · Due ${item.dueDate}`}
                  {item.scheduledDate && ` · ${item.scheduledDate}`}
                  {item.progress && ` · ${item.progress}`}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  const companyCompleted = ONBOARDING_COMPANY.items.filter(
    (i) => i.status === "complete"
  ).length;
  const teamCompleted = ONBOARDING_TEAM.items.filter(
    (i) => i.status === "complete"
  ).length;

  return (
    <ModuleLayout
      title="Onboarding"
      description="Spec-driven ramp plans that distinguish between company-level and team-level onboarding — informed by interview signal."
      status="demo"
    >
      <ChrisNote>
        <p>
          Onboarding is very team-specific, which is why a spec-driven process is
          so helpful here. There&apos;s company-level onboarding (HR, IT, compliance)
          and team-level onboarding (tools, codebase, introductions).
        </p>
        <p>
          We may need API access to Jira/Linear for tickets, or other tracking
          systems. Is their laptop finished by IT? Have they completed required
          trainings (HR, PCI, OWASP)? Have background checks cleared? This can
          provide a manager with an at-a-glance understanding of where their new
          hire is.
        </p>
        <p>
          If you onboard 1 person, that&apos;s easy enough.{" "}
          <strong>
            I once had to onboard 8 devs in India all at once, and it was tough
            from a paperwork perspective!
          </strong>
        </p>
        <p>
          Then there is team-level onboarding — tooling setup, account setup,
          code base tours, introductions. There is a perfect way to condense this
          down into spec files, or using tools (looking at you Claude Code and
          Claude Cowork) to help get new hires up to speed ASAP. Basically, ask
          these LLMs instead of having a person hold your hand.
        </p>
      </ChrisNote>

      {/* Context */}
      <div className="mb-6 rounded-lg border border-[#E8E5E0] bg-white p-5">
        <p className="text-sm">
          Onboarding <strong>{ONBOARDING_COMPANY.employee}</strong> &middot;
          Start date:{" "}
          {new Date(ONBOARDING_COMPANY.startDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}{" "}
          &middot; Manager: {ONBOARDING_COMPANY.manager}
        </p>
        <div className="mt-3 flex gap-2 rounded-md border border-[#D97757]/20 bg-[#D97757]/5 p-3">
          <ArrowRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#D97757]" />
          <p className="text-xs text-[#4A4A4A]">
            <strong className="text-[#1A1A1A]">
              AI-powered personalization:
            </strong>{" "}
            This plan is informed by Alex&apos;s interview feedback. Technical
            interviewers confirmed deep system design skills, so we skip
            &ldquo;Intro to Distributed Systems.&rdquo; The behavioral
            interviewer noted a gap in interpersonal dynamics, so we prioritize
            1:1 coffee chats.
          </p>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChecklistSection
          title="Company Onboarding"
          items={ONBOARDING_COMPANY.items}
          completedCount={companyCompleted}
          totalCount={ONBOARDING_COMPANY.items.length}
        />
        <ChecklistSection
          title={`Team Onboarding — ${ONBOARDING_TEAM.teamName}`}
          items={ONBOARDING_TEAM.items as ChecklistItem[]}
          completedCount={teamCompleted}
          totalCount={ONBOARDING_TEAM.items.length}
        />
      </div>
    </ModuleLayout>
  );
}
