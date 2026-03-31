# ADR-003: MCP Integration Architecture

**Status:** Partially Implemented
**Date:** 2026-03-24 (Updated 2026-03-30)
**Author:** Christopher Martin

## Context

This platform needs to integrate with existing HR tools rather than replace them. Anthropic's Model Context Protocol (MCP) provides a standardized way for Claude to interact with external systems through a resource/tool model.

## What We Built

### Spec File MCP Server (Implemented)

A working MCP server (`src/mcp/index.ts`) that:

1. **Exposes hiring specs as resources** — 4 spec files available via `spec://` URI scheme
2. **Provides a screening tool** — `screen_resume` tool calls Claude API to evaluate resumes against specs
3. **Uses StdioServerTransport** — Compatible with Claude Desktop, Claude Code, and any MCP client

This proves the core thesis: spec files are portable. The same specs that drive the web app's screening UI can be accessed from any MCP-compatible surface. A recruiter can say "pull up Cindi's hiring spec and screen this resume" in Claude Desktop without ever opening the web app.

### Configuration

```json
{
  "mcpServers": {
    "people-products": {
      "command": "npx",
      "args": ["tsx", "src/mcp/index.ts"],
      "cwd": "/path/to/claude-people-manager"
    }
  }
}
```

## Proposed Future MCP Servers

### Greenhouse MCP Server (ATS Integration)
- **Direction:** Bidirectional
- **Read:** Pull new applications, job requisitions, interview schedules
- **Write:** Push screening results, stage transitions, notes
- **Value:** Claude can reason about Greenhouse data in context, not just shuttle data between systems

### Workday MCP Server (Employee Records)
- **Direction:** Primarily read
- **Read:** Org structure, team composition, employee profiles
- **Write:** Trigger onboarding workflows post-hire
- **Value:** When screening, Claude can consider what the team currently looks like and what skills gaps need filling

### Slack MCP Server (Communication)
- **Direction:** Bidirectional
- **Read:** Interview feedback submitted via Slack forms
- **Write:** Screening result notifications, interview reminders
- **Value:** Meet interviewers where they already work

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
│  └──┬──────┬──────────┬─────────────┘  │
└─────┼──────┼──────────┼────────────────┘
      │      │          │
   ┌──┴──┐ ┌─┴──┐ ┌────┴───┐
   │Green│ │Work│ │ Slack  │
   │house│ │day │ │        │
   └─────┘ └────┘ └────────┘

   + Spec File MCP Server (implemented)
   Exposes: 4 resources, 1 tool
   Transport: stdio
```

## Trade-offs

- **Implemented server is read-only + screening** — No write operations back to external systems yet
- **Spec files are in-memory** — Production would need persistent storage with versioning
- **Single transport** — stdio works for local usage; production would likely need SSE or HTTP for remote access
