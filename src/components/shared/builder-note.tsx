"use client";

import { useBuilderNotes } from "./builder-notes-provider";
import { Hammer } from "lucide-react";

export function BuilderNote({ children }: { children: React.ReactNode }) {
  const { visible } = useBuilderNotes();

  if (!visible) return null;

  return (
    <div className="my-6 rounded-r-md border-l-[3px] border-l-[#D97757] bg-[#FDF8F0] p-4">
      <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#D97757]">
        <Hammer className="h-3 w-3" />
        Builder&apos;s Note
      </p>
      <div className="text-sm leading-relaxed text-[#4A4A4A]">{children}</div>
    </div>
  );
}
