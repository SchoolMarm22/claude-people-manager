type ModuleStatus = "live" | "demo" | "vision" | "blank";

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
    className: "bg-violet-50 text-violet-600 border-violet-200",
  },
  blank: {
    label: "Concept",
    className: "bg-violet-50 text-violet-600 border-violet-200",
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
    <div className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">
            {title}
          </h1>
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${badge.className}`}
          >
            {badge.label}
          </span>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-[#6B6B6B]">
          {description}
        </p>
      </div>

      {children}
    </div>
  );
}
