import { ModuleLayout } from "@/components/layout/module-layout";
import { BuilderNote } from "@/components/shared/builder-note";
import { MANAGEMENT_STUBS } from "@/lib/mock-data";
import {
  MessageSquare,
  BarChart3,
  Rocket,
  ArrowRightLeft,
  DoorOpen,
  CalendarDays,
} from "lucide-react";

const ICONS = [MessageSquare, BarChart3, Rocket, ArrowRightLeft, DoorOpen, CalendarDays];

export default function ManagementPage() {
  return (
    <ModuleLayout
      title="Ongoing Management"
      description="Cards for features that exist in the full vision but weren't built for this demo. Each includes a Builder's Note explaining the thinking."
      status="vision"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {MANAGEMENT_STUBS.map((stub, i) => {
          const Icon = ICONS[i] || MessageSquare;
          return (
            <div
              key={i}
              className="rounded-lg border border-dashed border-[#E8E5E0] bg-white p-5"
            >
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#F5F3EF]">
                  <Icon className="h-4 w-4 text-[#6B6B6B]" />
                </div>
                <h3 className="text-[15px] font-medium">{stub.title}</h3>
              </div>
              <p className="mb-4 text-sm text-[#6B6B6B]">{stub.description}</p>
              <div className="rounded-r-md border-l-[3px] border-l-[#D97757] bg-[#FDF8F0] p-3">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#D97757]">
                  Builder&apos;s Note
                </p>
                <p className="text-[12px] leading-relaxed text-[#4A4A4A]">
                  {stub.buildersNote}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <BuilderNote>
        These stubs are intentional scope decisions, not unfinished features. A demo that builds 6 modules shallowly communicates less than one that builds 3 deep and explains why the others were deferred. Every cut is explained, not hidden — because scope management is an EM skill.
      </BuilderNote>
    </ModuleLayout>
  );
}
