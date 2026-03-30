# Vision: Manager Effectiveness Tools

## The Problem

Engineering management is a craft that suffers from a data problem. The signals that indicate how well a manager is supporting their team are scattered across:
- 1:1 notes (often in personal docs that no system can see)
- Performance review cycles (annual, backward-looking)
- Team health surveys (infrequent, aggregated)
- Informal observation (unstructured, biased by recency)

## AI-Native Manager Tools

### 1:1 Intelligence

Before each 1:1, Claude prepares a brief by synthesizing:
- **Last 1:1 notes**: What was discussed? Were there action items?
- **Recent work patterns**: Commits, PRs, code reviews — is this person's output trending up/down?
- **PTO/time data**: Have they taken time off recently?
- **Growth goals**: What are they working toward? Any recent evidence of progress?
- **Team context**: Anything happening on the team they might be affected by?

The output is NOT a surveillance report — it's a conversation starter. "Based on recent work, Jamie seems to be spending more time on code reviews. Worth discussing if this is intentional growth or if they need support delegating."

### Growth & Promotion Tracking

**Current state:** Promotion cases are built by archaeology — digging through months of PRs, docs, and Slack the week before the committee meets.

**Proposed state:** Continuous evidence collection. When someone:
- Ships a significant feature → logged as evidence of execution
- Mentors a teammate → logged as evidence of leadership
- Resolves an incident → logged as evidence of ownership
- Gets peer recognition → logged as evidence of collaboration

Claude drafts promotion narratives from accumulated evidence: "Over the past 6 months, Jamie has: led the cache redesign (technical execution), mentored 2 junior engineers (leadership), and was the primary responder for 3 incidents (ownership). This evidence supports advancement to L5."

### Feedback Quality Coaching

Before a manager delivers written feedback, Claude reviews it for:
- **Specificity**: "This feedback would be stronger with a concrete example"
- **Actionability**: "What should they do differently next time?"
- **Consistency**: "You used 'aggressive' to describe assertive behavior in 3 of 5 recent reviews — worth examining if this framing is applied evenly"
- **Growth orientation**: "This feedback focuses on what went wrong. Consider adding what the expected behavior looks like."

## Privacy Architecture

This module has the strictest privacy requirements in the platform:
- 1:1 notes are visible only to the manager and direct report
- Growth profiles are visible only to the employee, their manager, and designated reviewers
- Claude's analysis of work patterns never leaves the manager's view
- No data from this module flows to hiring or compensation without explicit consent
- All Claude analysis includes confidence levels and caveats

## Data Model Extension

```prisma
model OneOnOneNote {
  id          String @id @default(cuid())
  managerId   String
  reportId    String
  date        DateTime

  // Human-written
  notes       String
  actionItems String // JSON array

  // Claude-generated prep (before the meeting)
  aiPrep      String?
  aiPrepContext String? // What signals Claude used
}

model GrowthEvidence {
  id          String @id @default(cuid())
  employeeId  String
  date        DateTime
  category    String // "execution", "leadership", "ownership", "collaboration"
  title       String
  description String
  source      String // "pr", "incident", "peer_recognition", "manual"
  sourceUrl   String?
}

model GrowthProfile {
  id          String @id @default(cuid())
  employeeId  String @unique
  currentLevel String
  targetLevel  String?
  narrative    String? // Claude-drafted promotion narrative
  lastUpdated  DateTime
}
```
