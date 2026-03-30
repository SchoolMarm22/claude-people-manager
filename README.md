# Claude People Manager

**An AI-native people management platform** — built as a portfolio project for Anthropic's [Engineering Manager, People Products](https://job-boards.greenhouse.io/anthropic/jobs/5119478008) role.

## The Thesis

HR workflows are fragmented across a dozen siloed tools. The integration of LLMs creates an opportunity not just to unify them, but to make them *smarter* — with appropriate guardrails.

This project demonstrates what that looks like for the hiring pipeline: Claude as a transparent, auditable participant in resume screening and interview feedback synthesis.

## What's Built

### Hiring Pipeline (Fully Functional)
- **AI Resume Screening**: Claude evaluates candidates against job requirements with structured scores, explicit reasoning chains, and enumerated recommendations
- **Interview Feedback Collection**: Structured feedback forms with per-dimension scoring
- **AI Feedback Synthesis**: Claude aggregates multiple interviewer perspectives, surfaces consensus and divergence, and flags potential bias patterns
- **Candidate Pipeline**: Kanban-style pipeline view across hiring stages
- **Repeat Candidate Detection**: Automatic detection of re-applicants with context from previous applications

### What's Intentionally Stubbed (with Vision Docs)

Each stub module includes a dedicated vision document explaining the problem, the AI-native solution, and the data model extension:

| Module | Vision Doc | Key Insight |
|--------|-----------|-------------|
| **Onboarding** | [docs/vision/onboarding.md](docs/vision/onboarding.md) | Interview feedback should inform onboarding — skip what they're strong at, focus where concerns were raised |
| **Timesheet & PTO** | [docs/vision/timesheet-pto.md](docs/vision/timesheet-pto.md) | Unified time data enables predictive capacity planning and burnout detection |
| **Manager Effectiveness** | [docs/vision/manager-effectiveness.md](docs/vision/manager-effectiveness.md) | 1:1 prep, growth tracking, and feedback quality coaching |

### Architecture Decision Records

| ADR | Topic |
|-----|-------|
| [ADR-001](docs/adrs/001-structured-outputs.md) | Why structured Claude outputs over free-text |
| [ADR-002](docs/adrs/002-eval-strategy.md) | **Eval strategy for hiring bias — why this is a "slow down" zone** |
| [ADR-003](docs/adrs/003-mcp-integration.md) | MCP integration architecture (Greenhouse, Workday, Slack) |
| [ADR-004](docs/adrs/004-unified-data-model.md) | Unified candidate/employee data model |
| [ADR-005](docs/adrs/005-longitudinal-pto.md) | The case for longitudinal PTO data in sprint planning |

## Why I Built This

I'm an engineering manager. Every day I live in the gap between what HR tools do and what I actually need:

- **Interview feedback** lives in Google Docs, Greenhouse, and Slack DMs. By the time we make a decision, half the signal is lost.
- **Onboarding** is a one-size-fits-all checklist that ignores everything we learned about the person during interviews.
- **PTO tracking** across 3 tools means sprint planning is guesswork.
- **Promotion cases** are built by archaeology the week before the committee meets.

This project is my vision for what a unified, AI-native people platform looks like — and, critically, where it needs guardrails.

## The Most Important File in This Repo

[ADR-002: Eval Strategy for Hiring Bias](docs/adrs/002-eval-strategy.md)

I deliberately chose NOT to build the eval framework. Not because it's unimportant — it's the *most* important part — but because a half-baked bias eval suite is worse than no eval suite. It creates false confidence.

ADR-002 documents what we would build, why, and how. It's where I demonstrate that I understand the stakes of AI in hiring: demographic swap tests, rubric consistency, feedback synthesis bias detection, and longitudinal tracking.

**This is where you slow down and get it right.**

## Tech Stack

- **Next.js 16** (App Router, Server Components)
- **TypeScript**
- **Prisma + SQLite** (simple, portable)
- **Claude API** (`@anthropic-ai/sdk`) with structured outputs
- **Tailwind CSS + shadcn/ui**

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env

# Initialize database
npx prisma migrate dev

# Seed with synthetic data
npm run db:seed

# Run development server
npm run dev
```

The app ships with pre-seeded synthetic data: 3 job requisitions, 11 candidates at various pipeline stages, completed interviews with feedback, and AI screening results. You can explore the full pipeline immediately.

To trigger live AI screening or feedback synthesis, you'll need an `ANTHROPIC_API_KEY` in your `.env`.

## Project Structure

```
src/
├── app/
│   ├── dashboard/          # Overview with AI insights
│   ├── hiring/             # Kanban pipeline view
│   ├── candidates/[id]/    # Candidate detail with AI screening
│   ├── interviews/         # Interview management
│   ├── onboarding/         # Stub with vision narrative
│   ├── timesheet/          # Stub with EM pain narrative
│   ├── manager/            # Stub with vision narrative
│   └── api/
│       ├── screening/      # Claude resume screening endpoint
│       └── feedback-summary/ # Claude feedback synthesis endpoint
├── lib/
│   ├── claude/             # Claude integration (screening, synthesis)
│   ├── db/                 # Prisma client
│   └── mcp/               # MCP integration type stubs
├── components/
│   ├── hiring/             # Screen & synthesize buttons
│   └── layout/             # Sidebar navigation
docs/
├── adrs/                   # Architectural Decision Records
├── vision/                 # Module vision docs
└── evals/                  # Eval methodology (see ADR-002)
prisma/
├── schema.prisma           # Data model (heavily commented)
└── seed.ts                 # Synthetic demo data
```

## About Me

I'm Christopher Martin, an engineering manager who believes the intersection of AI and people practices is one of the most impactful — and most responsibility-laden — areas in tech right now. This project is my attempt to show both the opportunity and the restraint required to do it well.
