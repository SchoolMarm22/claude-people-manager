import { MessageCircle } from "lucide-react";

export function ChrisNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 rounded-xl border border-[#D97757]/20 bg-[#FDF8F0] p-5">
      <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D97757]">
        <MessageCircle className="h-4 w-4" />
        Notes from Chris
      </p>
      <div className="text-sm leading-relaxed text-[#4A4A4A] space-y-3">{children}</div>
    </div>
  );
}
