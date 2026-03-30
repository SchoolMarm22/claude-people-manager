"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  Briefcase,
  MessageSquare,
  LayoutDashboard,
  ClipboardList,
  Clock,
  UserCheck,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon: typeof LayoutDashboard;
  stub?: boolean;
}

const NAV_SECTIONS: { label: string; items: NavItem[] }[] = [
  {
    label: "Pipeline",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Hiring Pipeline", href: "/hiring", icon: Briefcase },
      { name: "Candidates", href: "/candidates", icon: Users },
      { name: "Interviews", href: "/interviews", icon: MessageSquare },
    ],
  },
  {
    label: "People Ops",
    items: [
      { name: "Onboarding", href: "/onboarding", icon: ClipboardList, stub: true },
      { name: "Time & PTO", href: "/timesheet", icon: Clock, stub: true },
      { name: "Manager Tools", href: "/manager", icon: UserCheck, stub: true },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-60 flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2.5 px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-sidebar-primary">
          <Sparkles className="h-3.5 w-3.5 text-sidebar-primary-foreground" />
        </div>
        <div className="leading-none">
          <p className="text-[13px] font-semibold text-sidebar-accent-foreground">
            People Manager
          </p>
          <p className="text-[10px] text-sidebar-foreground/50">
            by Claude
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pt-2">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} className="mb-4">
            <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-sidebar-foreground/40">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname?.startsWith(item.href + "/");

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-4 w-4 flex-shrink-0",
                        isActive
                          ? "text-sidebar-primary"
                          : "text-sidebar-foreground/40 group-hover:text-sidebar-foreground/60"
                      )}
                    />
                    {item.name}
                    {item.stub && (
                      <span className="ml-auto rounded border border-sidebar-border px-1 py-px text-[9px] font-normal tracking-wide text-sidebar-foreground/30">
                        VISION
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border px-5 py-3">
        <p className="text-[10px] leading-relaxed text-sidebar-foreground/30">
          Portfolio project for Anthropic&apos;s
          <br />
          EM, People Products role
        </p>
      </div>
    </aside>
  );
}
