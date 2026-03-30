# Vision: Unified Timesheet & PTO with Longitudinal Insights

## The EM Pain Point

At my company, I use:
- **Workday** for timesheets
- **BambooHR** for PTO requests/approvals
- **Jira** for sprint capacity planning
- **Google Calendar** to eyeball who's out when

None of these talk to each other. The result: sprint planning is guesswork, PTO conflicts are discovered too late, and burnout patterns are invisible.

## The AI-Native Opportunity

Unifying this data creates relationships that don't exist in siloed systems. See ADR-005 for the full argument.

Key Claude-powered features:

### Predictive Sprint Capacity
"Based on approved PTO and historical patterns, Sprint 14 will have approximately 65% team capacity. Similar sprints in the past delivered 8-10 story points. Consider scoping accordingly."

### Burnout Signal Detection
"[Private to manager] Alex hasn't taken PTO in 14 weeks. Their commit pattern shows increasing late-night activity. This diverges from the team norm. Worth checking in."

### Cross-Team Conflict Detection
"Both the Platform and API teams have senior engineers on PTO during the week of March 15. This overlaps with the planned API migration. Flagging for coordination."

## Data Model Extension

```prisma
model TimeEntry {
  id         String @id @default(cuid())
  employeeId String
  date       DateTime
  hours      Float
  project    String
  category   String // "development", "code_review", "meetings", "admin"
  notes      String?
}

model PTORequest {
  id          String @id @default(cuid())
  employeeId  String
  startDate   DateTime
  endDate     DateTime
  type        String // "vacation", "sick", "personal", "parental"
  status      String @default("pending") // pending, approved, denied
  approvedBy  String?
  notes       String?
}

model SprintCapacity {
  id          String @id @default(cuid())
  sprintId    String
  teamId      String

  // Claude-calculated
  totalCapacityHours    Float
  availableCapacityHours Float
  ptoImpactHours        Float
  historicalVelocity    Float?
  predictedVelocity     Float?
  reasoning             String // Why Claude predicted this capacity
}
```

## MCP Integration Points

- **Workday MCP**: Sync timesheets bidirectionally
- **BambooHR MCP**: Sync PTO requests and approvals
- **Jira MCP**: Pull sprint data, push capacity predictions
- **Google Calendar MCP**: Read calendar events for availability
