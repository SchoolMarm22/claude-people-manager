# ADR-004: Unified Candidate/Employee Data Model

**Status:** Accepted
**Date:** 2026-03-24
**Author:** Christopher Martin

## Context

Traditional HR systems maintain separate databases for candidates (ATS like Greenhouse) and employees (HRIS like Workday). When a candidate is hired, their data is essentially re-entered into a new system. The interview feedback, screening notes, and hiring context are left behind in the ATS.

## Decision

We use a unified data model that can represent a person across their entire lifecycle: candidate → employee → (potentially) alumni → (potentially) re-applicant.

## Rationale

### The Re-Application Problem

*From my experience as an EM:* We once re-screened a candidate who had applied 6 months earlier. Nobody remembered the previous application. We put them through the same interview loop, got the same "not quite ready" feedback, and wasted 8 hours of interviewer time.

With a unified model, Claude can surface: "This candidate applied in September 2025 and was rejected at the interview stage. Notes indicate they needed more distributed systems experience. Their updated resume shows they've since led two major distributed systems projects. **This is a meaningfully different candidate than last time.**"

### The Onboarding Continuity Problem

When a candidate becomes an employee, their interview feedback contains valuable signal for onboarding:
- What they're already strong at (skip those training modules)
- Where interviewers flagged concerns (focus onboarding energy there)
- What the team was specifically excited about (put them on that project)

Separate systems can't carry this context forward. A unified model can.

### The Alumni Boomerang Problem

People leave and come back. When they do, you want:
- Their original interview context
- Their employment history (what teams, what projects)
- Why they left (if documented)
- What's changed since

## Data Model Design

```
Candidate (current prototype)
  ├── previousApplicationId → Candidate (self-referential for repeats)
  ├── ScreeningResult
  ├── Interview[]
  ├── FeedbackSummary
  └── JobRequisition

Employee (future extension)
  ├── candidateId → Candidate (preserves hiring context)
  ├── OnboardingPlan
  ├── Timesheet[]
  ├── PTORequest[]
  ├── OneOnOneNote[]
  └── GrowthProfile
```

The key design choice: `Employee.candidateId` links back to the full hiring history. The interview feedback that informed the hiring decision is always accessible.

## Trade-offs

- **Complexity**: A unified model is more complex than separate models
- **Privacy**: We need to be careful about what hiring data follows someone into employment (e.g., interviewer concerns should not be visible to peers)
- **Data retention**: How long do we keep candidate data for non-hires? (Legal/compliance consideration)

## Consequences

- The Prisma schema uses a self-referential `Candidate` relation for repeat applications
- Future `Employee` model will reference `Candidate` for lifecycle continuity
- Access controls will need to differentiate between candidate data and employee data
