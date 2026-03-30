# ADR-003: MCP Integration Architecture

**Status:** Proposed (Stubs Only)
**Date:** 2026-03-24
**Author:** Christopher Martin

## Context

In production, this platform would need to integrate with existing HR tools rather than replace them entirely. Anthropic's Model Context Protocol (MCP) provides a standardized way for Claude to interact with external systems.

## Proposed MCP Servers

### Greenhouse MCP Server (ATS Integration)
```
Purpose: Sync candidate data, job postings, and pipeline stages
Direction: Bidirectional
- Read: Pull new applications, job requisitions, interview schedules
- Write: Push screening results, stage transitions, notes

Why MCP over REST: Claude can reason about Greenhouse data in context.
Instead of: "fetch candidate → process → update candidate"
We get: "Claude, review this candidate's full history in Greenhouse
         and our internal notes, then recommend next steps"
```

### Workday MCP Server (Employee Records)
```
Purpose: Bridge candidate → employee transition, access org data
Direction: Primarily read
- Read: Org structure, team composition, employee profiles
- Write: Trigger onboarding workflows post-hire

Key value: When Claude screens a candidate, it can consider:
- What the team currently looks like (skills gaps to fill)
- Who would be their manager/peers
- Historical hiring patterns for this team
```

### Slack MCP Server (Communication)
```
Purpose: Notifications, interview scheduling, feedback collection
Direction: Bidirectional
- Read: Interview feedback submitted via Slack forms
- Write: Screening result notifications, interview reminders

Why this matters: Interviewers already live in Slack. Meeting them
where they are reduces friction in the feedback loop.
```

### Calendar MCP Server (Scheduling)
```
Purpose: Interview scheduling optimization
Direction: Read + suggest
- Read: Interviewer availability
- Suggest: Optimal interview slots considering panel diversity,
  interviewer load balancing, and candidate timezone

This is where Claude shines: "Schedule a system design interview
with someone who hasn't interviewed this week and has distributed
systems expertise" is a natural language query that MCP makes possible.
```

## Architecture

```
┌─────────────────────────────────────────┐
│        Claude People Manager            │
│                                         │
│  ┌─────────┐  ┌──────────┐  ┌────────┐ │
│  │Screening│  │Interviews│  │Pipeline│ │
│  └────┬────┘  └────┬─────┘  └───┬────┘ │
│       │            │            │       │
│  ┌────┴────────────┴────────────┴────┐  │
│  │       MCP Client Layer            │  │
│  │  (standardized tool interface)    │  │
│  └──┬──────┬──────────┬──────────┬───┘  │
└─────┼──────┼──────────┼──────────┼──────┘
      │      │          │          │
   ┌──┴──┐ ┌─┴──┐ ┌────┴───┐ ┌───┴────┐
   │Green│ │Work│ │ Slack  │ │Calendar│
   │house│ │day │ │        │ │        │
   └─────┘ └────┘ └────────┘ └────────┘
```

## Why Stubs, Not Implementations

1. MCP servers require access to real instances of these tools
2. The protocol is still evolving — better to document the architecture than build against a moving target
3. The value proposition is clear from the architecture alone

## What the Stubs Show

The `src/lib/mcp/` directory contains type definitions and interface contracts for each MCP server. These demonstrate:
- Understanding of MCP's tool/resource model
- Awareness of data flow patterns between systems
- Practical knowledge of what these HR tools expose
