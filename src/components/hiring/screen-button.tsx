"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function ScreenButton({
  candidateId,
  candidateName,
}: {
  candidateId: string;
  candidateName: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleScreen() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/screening", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidateId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Screening failed");
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
      <Button onClick={handleScreen} disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Screening {candidateName}...
          </>
        ) : (
          <>
            <Bot className="mr-2 h-4 w-4" />
            Screen with Claude
          </>
        )}
      </Button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {loading && (
        <p className="mt-2 text-xs text-muted-foreground">
          Claude is evaluating the resume against job requirements. This
          produces structured scores, strengths/concerns, and a full reasoning
          chain for transparency.
        </p>
      )}
    </div>
  );
}
