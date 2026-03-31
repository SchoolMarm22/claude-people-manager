"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Search,
  MessageSquare,
  Video,
  ClipboardList,
  UserCheck,
  Users,
  BarChart3,
  DoorOpen,
  Settings,
  Sparkles,
  Star,
  LayoutDashboard,
  Server,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon: typeof FileText;
  badge?: "live" | "demo" | "concept";
  attention?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Overview", href: "/overview", icon: BookOpen },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, badge: "demo" },
  { name: "Job Postings", href: "/job-posting", icon: FileText, badge: "demo" },
  { name: "Application Screening", href: "/screening", icon: Search, badge: "live" },
  { name: "Interview Prep", href: "/interview-prep", icon: MessageSquare, badge: "live" },
  { name: "Interview", href: "/interview", icon: Video, badge: "concept" },
  { name: "Interview Notes", href: "/debrief", icon: ClipboardList, badge: "demo" },
  { name: "Onboarding", href: "/onboarding", icon: UserCheck, badge: "demo" },
  { name: "1:1s", href: "/one-on-ones", icon: Users, badge: "live" },
  { name: "Performance Reviews", href: "/performance-reviews", icon: BarChart3, badge: "concept" },
  { name: "Offboarding", href: "/offboarding", icon: DoorOpen, badge: "concept" },
  { name: "Spec File MCP", href: "/mcp-server", icon: Server, badge: "demo" },
];

const BADGE_STYLES = {
  live: "bg-green-100 text-green-700 border-green-200",
  demo: "bg-blue-100 text-blue-700 border-blue-200",
  concept: "bg-violet-100 text-violet-600 border-violet-200",
};

const BADGE_LABELS = {
  live: "Live AI",
  demo: "Demo",
  concept: "Concept",
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-shrink-0 flex-col border-r border-[#E8E5E0] bg-white">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 px-5 py-4 border-b border-[#E8E5E0]">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D97757]">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-[#1A1A1A]">People Products</p>
          <p className="text-[11px] text-[#9B9B9B]">by Chris Martin</p>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        <div className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname?.startsWith(item.href + "/");

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#D97757]/10 text-[#D97757]"
                    : "text-[#4A4A4A] hover:bg-[#F5F3EF] hover:text-[#1A1A1A]"
                )}
              >
                <item.icon
                  className={cn(
                    "h-4 w-4 flex-shrink-0",
                    isActive
                      ? "text-[#D97757]"
                      : "text-[#9B9B9B] group-hover:text-[#6B6B6B]"
                  )}
                />
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <span
                    className={cn(
                      "rounded-full border px-1.5 py-px text-[9px] font-medium",
                      BADGE_STYLES[item.badge]
                    )}
                  >
                    {BADGE_LABELS[item.badge]}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Divider */}
        <div className="my-3 border-t border-[#E8E5E0]" />

        {/* Account */}
        <Link
          href="/account"
          className={cn(
            "group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            pathname === "/account"
              ? "bg-[#D97757]/10 text-[#D97757]"
              : "text-[#4A4A4A] hover:bg-[#F5F3EF] hover:text-[#1A1A1A]"
          )}
        >
          <Settings
            className={cn(
              "h-4 w-4 flex-shrink-0",
              pathname === "/account"
                ? "text-[#D97757]"
                : "text-[#9B9B9B] group-hover:text-[#6B6B6B]"
            )}
          />
          <span className="flex-1">Account</span>
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
        </Link>
      </nav>
    </aside>
  );
}
