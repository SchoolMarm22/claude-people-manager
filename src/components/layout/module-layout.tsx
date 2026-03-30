import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type ModuleStatus = "live" | "demo" | "vision";

const STATUS_CONFIG: Record<ModuleStatus, { label: string; className: string }> = {
  live: {
    label: "Live AI",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  demo: {
    label: "Interactive Demo",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  vision: {
    label: "Vision",
    className: "bg-gray-50 text-gray-600 border-gray-200",
  },
};

export function ModuleLayout({
  title,
  description,
  status,
  children,
}: {
  title: string;
  description: string;
  status: ModuleStatus;
  children: React.ReactNode;
}) {
  const badge = STATUS_CONFIG[status];

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-[#6B6B6B] transition-colors hover:text-[#D97757]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Overview
      </Link>

      <div className="mb-8 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-[32px] font-semibold leading-10 tracking-tight">
              {title}
            </h1>
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${badge.className}`}
            >
              {badge.label}
            </span>
          </div>
          <p className="mt-1.5 text-[15px] leading-relaxed text-[#6B6B6B]">
            {description}
          </p>
        </div>
      </div>

      {children}
    </div>
  );
}
