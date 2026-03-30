"use client";

import { useBuilderNotes } from "./builder-notes-provider";
import { Hammer, Eye, EyeOff } from "lucide-react";

export function BuilderNotesToggle() {
  const { visible, toggle } = useBuilderNotes();

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-[#E8E5E0] bg-white px-4 py-2.5 text-xs font-medium shadow-lg transition-all hover:border-[#D97757] hover:shadow-xl"
    >
      <Hammer className="h-3.5 w-3.5 text-[#D97757]" />
      <span>Builder&apos;s Notes</span>
      {visible ? (
        <Eye className="h-3.5 w-3.5 text-[#6B6B6B]" />
      ) : (
        <EyeOff className="h-3.5 w-3.5 text-[#9B9B9B]" />
      )}
    </button>
  );
}
