import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { AiBadge } from "@/components/shared/ai-badge";
import { MessageSquare, UserCheck, Sparkles } from "lucide-react";

export default function ManagerToolsPage() {
  return (
    <div className="px-8 py-6">
      <PageHeader
        title="Manager Effectiveness"
        description="AI-assisted tools for better 1:1s, feedback, and growth"
        stub
      />

      <div className="space-y-4">
        <VisionCard
          icon={MessageSquare}
          title="1:1 Intelligence"
          description="Claude prepares 1:1 agendas by synthesizing signals from across the platform."
          items={[
            "Recent code review patterns — trending up or down?",
            "PTO patterns — have they taken time off recently?",
            "Sprint contribution trends — more or less scope?",
            "Pending growth goals from last conversation",
          ]}
          note="A good 1:1 is informed by data currently in 5 tools. Unified data lets Claude surface what's worth talking about."
        />

        <VisionCard
          icon={UserCheck}
          title="Growth & Promotion Tracking"
          description="Continuously collect evidence as it happens, not through retrospective archaeology."
          items={[
            "Ships a feature → logged as evidence of execution",
            "Mentors a teammate → logged as leadership",
            "Resolves an incident → logged as ownership",
            "Gets peer recognition → logged as collaboration",
          ]}
          note="Claude drafts promotion narratives from accumulated evidence rather than last-minute digging through 12 months of PRs and Slack."
        />

        <VisionCard
          icon={Sparkles}
          title="Feedback Quality Coaching"
          description="Claude reviews manager-written feedback before delivery."
          items={[
            "Specificity — \"this feedback would be stronger with a concrete example\"",
            "Actionability — \"what should they do differently?\"",
            "Consistency — \"you used 'aggressive' in 3 of 5 recent reviews — examine if applied evenly\"",
            "Growth orientation — \"add what the expected behavior looks like\"",
          ]}
        />
      </div>

      <p className="mt-6 text-[11px] text-muted-foreground/60 italic">
        See docs/vision/manager-effectiveness.md for the full vision.
      </p>
    </div>
  );
}

function VisionCard({
  icon: Icon,
  title,
  description,
  items,
  note,
}: {
  icon: typeof MessageSquare;
  title: string;
  description: string;
  items: string[];
  note?: string;
}) {
  return (
    <Card className="border-dashed">
      <CardHeader>
        <div className="flex items-center gap-2.5">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-[15px]">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-[13px] leading-relaxed">{description}</p>
        <ul className="ml-4 list-disc space-y-1 text-xs text-muted-foreground">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        {note && (
          <p className="text-xs text-muted-foreground/70">{note}</p>
        )}
      </CardContent>
    </Card>
  );
}
