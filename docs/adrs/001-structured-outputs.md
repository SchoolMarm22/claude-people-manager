# ADR-001: Structured Claude Outputs Over Free-Text

**Status:** Accepted
**Date:** 2026-03-24
**Author:** Christopher Martin

## Context

When integrating Claude into hiring workflows, we have a choice: let Claude produce free-text assessments (like a human would write), or enforce structured output (JSON with defined fields, scores, and reasoning chains).

## Decision

We use structured output for all Claude integrations in the hiring pipeline.

Every Claude evaluation produces:
- **Numeric scores** on defined dimensions (1-5 scale)
- **Enumerated recommendations** (advance/hold/reject)
- **Separate fields** for strengths, concerns, and reasoning
- **Full reasoning chain** preserved as a separate field

## Rationale

1. **Auditability**: Structured output creates a consistent audit trail. When we run bias evals (see ADR-002), we need comparable data across candidates. Free-text makes this nearly impossible.

2. **Transparency**: Hiring managers can see *exactly* how Claude scored each dimension. The reasoning chain shows *why*. This builds trust and enables meaningful human override.

3. **Eval-ability**: You can't run systematic evals on free-text. With structured scores, we can detect patterns like "Claude consistently rates candidates from X background lower on communication" — which would be invisible in free-text summaries.

4. **Human override**: When a hiring manager disagrees with Claude's assessment, structured output makes it clear *which dimension* they disagree on. "I think the experience score should be 4, not 3, because..." is more actionable than "I disagree with the overall assessment."

## Trade-offs

- **Loss of nuance**: Structured output forces Claude to commit to discrete scores. A "3.5" becomes either a 3 or a 4. We mitigate this with the free-text reasoning field.
- **Prompt complexity**: Structured output prompts are more complex and fragile. We mitigate this with version tracking (see `ScreeningResult.promptVersion`).
- **Risk of false precision**: A score of "4/5" feels more authoritative than it should. We address this in the UI by always showing the reasoning alongside the score.

## Consequences

- All Claude integration prompts must define and enforce output schemas
- We track prompt versions in the database to correlate with eval results over time
- The UI always surfaces reasoning alongside scores to prevent false precision
