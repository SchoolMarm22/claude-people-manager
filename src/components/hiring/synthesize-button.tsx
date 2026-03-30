"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function SynthesizeButton({
  candidateId,
  candidateName,
  interviewCount,
}: {
  candidateId: string;
  candidateName: string;
  interviewCount: number;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSynthesize() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/feedback-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidateId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Synthesis failed");
      }

      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Button onClick={handleSynthesize} disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Synthesizing {interviewCount} interviews...
          </>
        ) : (
          <>
            <Bot className="mr-2 h-4 w-4" />
            Synthesize {interviewCount} Interviews with Claude
          </>
        )}
      </Button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {loading && (
        <p className="mt-2 text-xs text-muted-foreground">
          Claude is analyzing interview feedback to surface consensus,
          divergence, and potential bias patterns. This helps hiring managers
          make informed decisions with full visibility into the signal.
        </p>
      )}
    </div>
  );
}
