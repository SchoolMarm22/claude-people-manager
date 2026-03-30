import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const STAGES = ["applied", "screening", "interview", "offer", "hired"];

export function PipelineProgress({ stage }: { stage: string }) {
  const currentIndex = STAGES.indexOf(stage);
  const isRejected = stage === "rejected";

  return (
    <div className="flex items-center">
      {STAGES.map((s, i) => {
        const isCompleted = !isRejected && i < currentIndex;
        const isCurrent = !isRejected && i === currentIndex;

        return (
          <div key={s} className="flex items-center">
            {/* Step indicator */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors",
                  isRejected
                    ? "bg-red-100 text-red-600"
                    : isCompleted
                    ? "bg-primary text-primary-foreground"
                    : isCurrent
                    ? "border-2 border-primary bg-primary/10 text-primary"
                    : "border border-border bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <span className="text-[10px]">{i + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "mt-1.5 text-[10px] font-medium",
                  isCurrent ? "text-primary" : "text-muted-foreground"
                )}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </span>
            </div>

            {/* Connector line */}
            {i < STAGES.length - 1 && (
              <div
                className={cn(
                  "mx-1.5 h-px w-8 sm:w-12",
                  !isRejected && i < currentIndex
                    ? "bg-primary"
                    : "bg-border"
                )}
              />
            )}
          </div>
        );
      })}

      {isRejected && (
        <>
          <div className="mx-1.5 h-px w-8 bg-red-200 sm:w-12" />
          <div className="flex flex-col items-center">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-xs font-medium text-red-600">
              &times;
            </div>
            <span className="mt-1.5 text-[10px] font-medium text-red-600">
              Rejected
            </span>
          </div>
        </>
      )}
    </div>
  );
}
