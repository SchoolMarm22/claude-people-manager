import Link from "next/link";
import {
  FileText,
  Search,
  MessageSquare,
  Users,
  ClipboardList,
  UserCheck,
} from "lucide-react";

const MODULES = [
  {
    title: "Job Posting",
    description: "Spec-driven job templates with automatic compliance",
    href: "/job-posting",
    icon: FileText,
    status: "demo" as const,
  },
  {
    title: "Application Screening",
    description: "AI resume analysis powered by manager-defined spec files",
    href: "/screening",
    icon: Search,
    status: "live" as const,
  },
  {
    title: "Interview Prep",
    description: "Tailored question generation for interviewers",
    href: "/interview-prep",
    icon: MessageSquare,
    status: "live" as const,
  },
  {
    title: "Interview Debrief",
    description: "Cross-interviewer synthesis surfacing consensus and contradictions",
    href: "/debrief",
    icon: Users,
    status: "demo" as const,
  },
  {
    title: "Onboarding",
    description: "Spec-driven ramp plans informed by interview signal",
    href: "/onboarding",
    icon: ClipboardList,
    status: "demo" as const,
  },
  {
    title: "Ongoing Management",
    description: "1:1s, performance, growth tracking, and offboarding",
    href: "/management",
    icon: UserCheck,
    status: "vision" as const,
  },
];

const STATUS_STYLES = {
  live: { label: "Live AI", dot: "bg-green-500", badge: "bg-green-50 text-green-700 border-green-200" },
  demo: { label: "Interactive Demo", dot: "bg-blue-500", badge: "bg-blue-50 text-blue-700 border-blue-200" },
  vision: { label: "Vision", dot: "bg-gray-400", badge: "bg-gray-50 text-gray-600 border-gray-200" },
};

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {/* Hero */}
      <div className="mb-16 max-w-2xl">
        <h1 className="text-[40px] font-semibold leading-[1.15] tracking-tight">
          People Products:
          <br />
          AI-Native Manager Tools
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[#6B6B6B]">
          A working prototype by{" "}
          <span className="font-medium text-[#1A1A1A]">Chris Martin</span>
        </p>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#6B6B6B]">
          This demo explores what spec-driven, AI-native people tools could look
          like — from screening to onboarding. Some features use live Claude API
          calls. Most use representative mock data. All include Builder&apos;s Notes
          explaining the thinking behind each decision.
        </p>
        <div className="mt-6 flex items-center gap-4 text-sm">
          <a
            href="https://www.linkedin.com/in/christophermartindenver/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#D97757] hover:text-[#C4684A] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://www.amazon.com/Chasing-Alexander-Marines-Journey-Afghanistan-ebook/dp/B098JWHJLV"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#D97757] hover:text-[#C4684A] transition-colors"
          >
            Book
          </a>
          <a
            href="https://github.com/christophermartin"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#D97757] hover:text-[#C4684A] transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {MODULES.map((mod) => {
          const style = STATUS_STYLES[mod.status];
          return (
            <Link
              key={mod.href}
              href={mod.href}
              className="group rounded-lg border border-[#E8E5E0] bg-white p-6 transition-all hover:border-[#D1CCC4] hover:shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#F5F3EF]">
                    <mod.icon className="h-4.5 w-4.5 text-[#6B6B6B] group-hover:text-[#D97757] transition-colors" />
                  </div>
                  <h2 className="text-lg font-medium">{mod.title}</h2>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${style.badge}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                  {style.label}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#6B6B6B]">
                {mod.description}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-[#E8E5E0] pt-6 text-center text-xs text-[#9B9B9B]">
        Built with Claude Code + Claude API · March 2026 · Chris Martin
      </footer>
    </div>
  );
}
