# ADR-002: Eval Strategy for Hiring Bias — Why This Is a "Slow Down" Zone

**Status:** Proposed (Architecture Only)
**Date:** 2026-03-24
**Author:** Christopher Martin

## Context

We're using Claude to screen resumes and synthesize interview feedback. Both of these are high-stakes decisions that directly affect people's careers. AI bias in hiring isn't theoretical — it's been documented extensively (Amazon's recruiting tool, HireVue lawsuits, etc.).

**This is where we slow down.**

Building the screening feature was fast. Building the eval framework to ensure it's fair is where the real engineering challenge lives. This ADR documents what we would build, why, and how — even though the prototype intentionally stops short of implementing it.

## The Eval Framework (What We Would Build)

### 1. Demographic Swap Tests

The simplest and most intuitive bias test:

```
Given: A resume with name "James Smith" that scores 4/5
When: We swap the name to "Jamal Washington" / "Wei Zhang" / "Priya Patel"
Then: The score should remain 4/5 (within tolerance of ±0.5)
```

**Implementation:**
- Maintain a name bank across demographic categories
- For each resume in the eval set, generate N variants with swapped names
- Run all variants through the screening pipeline
- Statistical test: scores across demographic groups should not differ significantly

**Why this matters:** Even with explicit "do not consider names" prompting, LLMs can exhibit implicit bias from training data. We need to verify, not assume.

### 2. Rubric Consistency Tests

Same resume, run 10 times. Scores should be consistent within ±1 point.

**Why this matters:** If Claude gives a 2 on one run and a 4 on another, the system isn't reliable enough for high-stakes decisions. Inconsistency is a precursor to bias — if outcomes are random, they'll correlate with whatever pattern the model happens to latch onto.

### 3. Feedback Synthesis Bias Detection

For the interview feedback synthesis:
- Does Claude's synthesis amplify or dampen individual interviewer biases?
- When one interviewer uses potentially biased language ("not a culture fit", "communication concerns"), does Claude propagate it or contextualize it?
- Does the synthesis preserve the strength of minority opinions, or does it default to majority consensus?

### 4. Longitudinal Tracking

This is why we version-track prompts and models in the database:

```
ScreeningResult.modelVersion = "claude-sonnet-4-20250514"
ScreeningResult.promptVersion = "v1"
```

When we update prompts, we can re-run the eval suite and compare:
- Did the new prompt version change score distributions?
- Did it introduce or eliminate bias on specific dimensions?
- Did it change the rejection rate for any demographic group?

## Where Evals Would Run

### CI Pipeline
- Demographic swap tests run on every prompt change
- Consistency tests run weekly
- Blocking: no prompt change ships if swap test fails

### Monitoring Dashboard
- Score distributions by demographic group (if we have this data)
- Rejection rate trends over time
- Divergence alerts when patterns shift

### Periodic Deep Dives
- Quarterly manual review of a sample of screenings
- Red team exercises: can we craft resumes that exploit biases?
- External audit readiness

## Why We Didn't Build This Yet

This is a prototype. The eval framework is the most important part of a production system, but it's also the part that requires:

1. **A real eval dataset** — synthetic data won't catch real-world biases
2. **Statistical rigor** — we need enough samples to draw meaningful conclusions
3. **Domain expertise** — I/O psychologists and DEI experts should inform the eval criteria
4. **Legal review** — using demographic data even for bias testing has legal implications

Building a half-baked eval suite would be worse than no eval suite — it would create false confidence.

## What We DID Do

1. Designed the data model to support eval tracking (prompt/model versioning)
2. Made Claude's reasoning transparent and auditable
3. Separated concerns so evals can be layered in without refactoring
4. Documented this architecture so the intent is clear

## Recommended Reading

- "Auditing AI Systems for Bias" — Anthropic's responsible scaling commitments
- EEOC guidance on AI in hiring decisions
- "Fairness and Machine Learning" (Barocas, Hardt, Narayanan)
