# Claude People Manager

**An AI-native people management platform** — built as a portfolio project for Anthropic's [Engineering Manager, People Products](https://job-boards.greenhouse.io/anthropic/jobs/5119478008) role.

## The Thesis

**Spec files are the universal abstraction for people management.**

LLMs convert English into other things — code, actions, API requests, analysis. The same principle applies to managerial work. Hiring managers hold context in their heads as they screen resumes, prep for interviews, and run onboarding. We can get that context out of their heads and into markdown spec files, then let Claude apply those specs consistently at scale.

This project demonstrates that approach across the full employee lifecycle: hiring, interviewing, onboarding, 1:1s, performance reviews, and offboarding.

## What's Built

### Live AI Features (Claude API)
- **Application Screening** — Claude evaluates resumes against manager-defined spec files. Same resume, different spec = different score. Try it with 4 different resumes and 4 different specs.
- **Interview Prep** — Given a resume + spec, Claude generates tailored questions with "what good looks like" and "red flags" for each.
- **1:1 Note Summarization** — Claude summarizes structured 1:1 notes across time, surfacing patterns and retention signals.
- **1:1 Chat** — Ask questions about your notes on any engineer, with full context passed to Claude.

### Interactive Demos (Mock Data)
- **Dashboard** — Pipeline metrics, candidate journey timeline (Alex Rivera from application to onboarding), and full candidate table.
- **Job Postings** — Spec-driven posting generation with compliance badges and outbound architecture diagram.
- **Interview Notes** — Cross-interviewer synthesis surfacing consensus, contradictions, and bias flags.
- **Onboarding** — Company-level + team-level checklists informed by interview signal.
- **MCP Server** — Working Model Context Protocol server exposing specs as resources and screening as a tool.

### Concept Pages (Intentionally Blank)
- **Interview** — Deliberately left blank with notes on why AI shouldn't be blindly applied here.
- **Performance Reviews** — Notes on spec-driven review frameworks adapted per role/level.
- **Offboarding** — Notes on access revocation vs. knowledge capture.

## Architecture

```
src/
├── app/
│   ├── overview/           # Spec-driven approach explainer
│   ├── dashboard/          # Pipeline metrics + candidate journey
│   ├── job-posting/        # Spec → posting generation + outbound flow
│   ├── screening/          # Live AI resume screening (4 specs × 4 resumes)
│   ├── interview-prep/     # Live AI question generation
│   ├── interview/          # Concept — intentionally blank
│   ├── debrief/            # Interview notes + AI synthesis
│   ├── onboarding/         # Company + team onboarding checklists
│   ├── one-on-ones/        # 1:1 notes + AI summary + chat
│   ├── performance-reviews/# Concept with product notes
│   ├── offboarding/        # Concept with product notes
│   ├── mcp-server/         # MCP architecture + code samples
│   ├── account/            # Closing pitch + spec recap
│   └── api/
│       ├── screen-resume/       # Claude screening endpoint
│       ├── interview-prep/      # Claude question generation
│       ├── one-on-one-summary/  # Claude 1:1 summarization
│       └── one-on-one-chat/     # Claude conversational recall
├── mcp/
│   └── index.ts            # Working MCP server (stdio transport)
├── components/
│   ├── layout/             # Sidebar, footer, module layout
│   ├── shared/             # ChrisNote callout component
│   └── diagrams/           # Outbound/inbound flow diagrams
└── lib/
    ├── sample-specs.ts     # 4 hiring spec files
    ├── mock-data.ts        # Engineers, candidates, scorecards
    ├── mock-resumes.ts     # 3 fictional resumes
    ├── chris-resume.ts     # Chris's actual resume
    └── pipeline-data.ts    # Dashboard metrics + timeline
```

## Tech Stack

- **Next.js 16** (App Router, Server Components + Client Components)
- **TypeScript**
- **Tailwind CSS v4** (Anthropic-inspired warm palette)
- **Claude API** (`@anthropic-ai/sdk`) for live AI features
- **Model Context Protocol** (`@modelcontextprotocol/sdk`) for MCP server
- **shadcn/ui** components

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment (needed for live AI features)
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env

# Run development server
npm run dev
```

The app works without an API key — live AI features fall back to representative mock data.

### MCP Server

The MCP server can be used with Claude Desktop or any MCP-compatible client:

```bash
# Start the MCP server directly
npm run mcp:start

# Or configure in Claude Desktop
# ~/Library/Application Support/Claude/claude_desktop_config.json
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

## Design Decisions

Every page includes "Notes from Chris" callouts explaining product thinking, technical tradeoffs, and areas where AI should (or shouldn't) be applied. These are the most important part of the demo — they show judgment, not just code.

Key architectural decisions:
- **Spec-driven everything** — Every feature traces back to configurable markdown spec files
- **Live AI with graceful fallback** — Claude API calls with mock data fallback when unavailable
- **Always-visible product notes** — Not hidden behind toggles; the thinking is the product
- **Intentional gaps** — Some pages are blank on purpose, with notes on why

## About Me

I'm Christopher Martin, an engineering manager who believes the intersection of AI and people practices is one of the most impactful — and most responsibility-laden — areas in tech right now. This project is my attempt to show both the opportunity and the restraint required to do it well.

[LinkedIn](https://www.linkedin.com/in/chris-martin-dev/)
