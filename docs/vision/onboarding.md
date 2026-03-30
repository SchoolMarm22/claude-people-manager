# Vision: AI-Personalized Onboarding

## Problem Statement

Every new hire gets the same onboarding regardless of their background, skills, or what we learned about them during the interview process. This wastes time for experienced hires and misses targeted support opportunities for areas flagged during interviews.

## Proposed Solution

Claude generates personalized onboarding plans by synthesizing:

1. **Role requirements** from the job requisition
2. **Interview feedback** — what the candidate is strong at (skip those modules) and where concerns were raised (focus there)
3. **Team context** — who they'll work with, what the team is currently working on
4. **Repeat candidate context** — if they've been through the process before, what's changed

## Data Model Extension

```prisma
model OnboardingPlan {
  id          String @id @default(cuid())
  employeeId  String @unique
  candidateId String // Links back to their hiring data

  // Claude-generated plan
  planJson    String // Structured week-by-week plan
  reasoning   String // Why these specific modules/pairings were chosen

  // Customization
  managerOverrides String? // Manager can adjust the AI plan

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model OnboardingMilestone {
  id              String @id @default(cuid())
  onboardingPlanId String

  title           String
  description     String
  weekNumber      Int
  category        String // "technical", "team", "process", "culture"
  status          String @default("pending")

  // Why this milestone was included
  source          String // "standard", "interview_feedback", "team_need"
  sourceContext   String? // e.g., "Interviewer noted gap in deployment process knowledge"
}
```

## Key Architectural Decision

The onboarding plan references `candidateId` to maintain continuity with the hiring process. This means:

- If an interviewer noted "strong technical skills but limited experience with our specific tech stack," the onboarding plan can prioritize tech stack ramp-up.
- If the behavioral interview raised interpersonal concerns, the plan can include more team bonding activities early on.
- The plan's reasoning chain is transparent — the new hire (and their manager) can see *why* specific modules were prioritized.

## MCP Integration Points

- **Notion/Confluence MCP**: Pull team documentation to include relevant reading in the plan
- **GitHub MCP**: Identify "good first issue" tickets for the new hire based on their skills
- **Slack MCP**: Set up intro channel, schedule coffee chats with key collaborators
