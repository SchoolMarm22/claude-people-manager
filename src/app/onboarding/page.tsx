"use client";

import { useState } from "react";
import { ModuleLayout } from "@/components/layout/module-layout";
import { BuilderNote } from "@/components/shared/builder-note";
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
      {/* Context */}
      <div className="mb-6 rounded-lg border border-[#E8E5E0] bg-white p-5">
        <p className="text-sm">
          Onboarding <strong>{ONBOARDING_COMPANY.employee}</strong> ·
          Start date:{" "}
          {new Date(ONBOARDING_COMPANY.startDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}{" "}
          · Manager: {ONBOARDING_COMPANY.manager}
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

      <BuilderNote>
        Company-level onboarding is roughly the same everywhere. Team-level is where it gets interesting — and where most companies fail. A spec file per team means the DevOps team&apos;s onboarding looks nothing like the Design team&apos;s, which is correct.
      </BuilderNote>

      <BuilderNote>
        The &ldquo;Ask Claude, not your neighbor&rdquo; item is a real architectural decision. New hires generate enormous interrupt load on existing team members. An AI knowledge tool that can answer &ldquo;where is the staging environment?&rdquo; or &ldquo;how do we deploy?&rdquo; reduces ramp time AND protects team productivity.
      </BuilderNote>

      <BuilderNote>
        I once onboarded 8 developers simultaneously across time zones. Company-level onboarding was the bottleneck — not because it was hard, but because tracking 8 people × 15 checklist items across 3 departments was pure overhead. This is a coordination problem, and coordination problems are where software earns its keep.
      </BuilderNote>

      <BuilderNote>
        In production, these checklists would integrate with Jira/Linear for ticket tracking, Okta/Google Workspace for account provisioning, and the team&apos;s existing documentation platform. The spec file defines WHAT needs to happen; integrations handle the HOW.
      </BuilderNote>
    </ModuleLayout>
  );
}
