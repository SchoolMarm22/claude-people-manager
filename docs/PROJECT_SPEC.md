# People Products Demo — Project Spec

**What this is:** A working prototype demonstrating AI-native internal tools for the employee lifecycle, built as part of Chris Martin's application for Engineering Manager, People Products at Anthropic.

**What this is NOT:** A production application. This is a demo showcasing product thinking, architectural judgment, and the ability to ship. Mock data is expected everywhere except the two live Claude API integrations.

**Audience:** The Anthropic People Products hiring team. They build these tools daily. They will be evaluating judgment, taste, and builder instincts — not feature count.

---

## Core Concept: Spec-Driven AI Management Tools

The central architectural insight of this demo is **spec files** — natural language configuration documents that managers write to customize how AI assists with their specific hiring, onboarding, and team management needs.

This is genuinely LLM-native. Traditional HR tools use dropdown menus and checkbox filters. Spec files let managers express nuance: "prefer startup experience because full-stack at a 5-person company means something different than full-stack at Meta" — something no dropdown can capture.

Every module in this demo is driven by spec files. Different managers get different AI behavior without code changes.

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (Anthropic-inspired design system — see DESIGN.md)
- **AI:** Anthropic Claude API (claude-sonnet-4-20250514) for two live integrations
- **Analytics:** PostHog (Chris's existing account — just needs a new project)
- **Deployment:** Vercel
- **State:** React state only (no database, no auth, no backend beyond API routes for Claude calls)

---

## Site Structure

### Landing Page (`/`)

A clean hero explaining what the reviewer is looking at.

**Content:**
- Title: "People Products: AI-Native Manager Tools"
- Subtitle: "A working prototype by Chris Martin"
- 1-2 sentences: "This demo explores what spec-driven, AI-native people tools could look like — from screening to onboarding. Some features use live Claude API calls. Most use representative mock data. All include Builder's Notes explaining the thinking behind each decision."
- Link to Chris's resume, LinkedIn, book
- Grid of module cards (the lifecycle stages)

**Module Cards (clickable, leading to individual pages):**

1. **Job Posting** — "Spec-Driven Job Templates" — stub/light
2. **Application Screening** — "AI Resume Analysis" — ⭐ LIVE CLAUDE API — deep
3. **Interview Prep** — "Tailored Question Generation" — ⭐ LIVE CLAUDE API — deep
4. **Interview Debrief** — "Cross-Interviewer Synthesis" — mocked but detailed
5. **Onboarding** — "Spec-Driven Ramp Plans" — mocked, medium depth
6. **Ongoing Management** — "1:1s, Performance, Growth" — stub with vision notes

Each card should indicate its status:
- 🟢 "Live AI" for the two API-powered modules
- 🔵 "Interactive Demo" for mocked-but-functional modules
- ⚪ "Vision" for stubs

---

## Module Specifications

### Module 1: Job Posting (Light)

**Route:** `/job-posting`

**What it shows:**
- A sample job posting generated from a spec file
- The spec file visible alongside the posting (side-by-side layout)
- How legal requirements (state salary laws, veteran screening, disability accommodations) are automatically incorporated based on location metadata in the spec

**Mock data:** One pre-built job posting for a "Full-Stack Software Engineer" role.

**Builder's Notes for this module:**
- "LLMs can draft job postings from specs, but a human must own the final version. The language in a posting shapes who applies — that's too important to fully automate."
- "In production, this integrates with Greenhouse and Indeed via MCP connectors. The spec file becomes the single source of truth that feeds both internal tracking and external posting platforms."
- "State-level compliance (salary transparency laws, veteran preference screening) is a perfect use case for AI — the rules are complex, change frequently, and missing one creates legal exposure. But the AI should flag and suggest, not silently insert."

---

### Module 2: Application Screening (Deep — LIVE CLAUDE API) ⭐

**Route:** `/screening`

**This is the showpiece.** It demonstrates:
1. The spec-driven architecture in action
2. Live Claude API integration
3. Thoughtful evaluation beyond keyword matching
4. Bias awareness

**Layout:** Three-panel design
- **Left panel:** Spec file editor (editable markdown/text area with syntax-style formatting)
- **Center panel:** Resume viewer (pre-loaded with Chris's resume, with option to paste/upload another)
- **Right panel:** AI assessment output

**Pre-loaded spec files (selectable via tabs or dropdown):**
- "Cindi's Spec — Full-Stack SWE (Startup-Focused)" — see `sample-hiring-specs/fullstack-startup.md`
- "James's Spec — Angular Front-End Specialist" — see `sample-hiring-specs/angular-specialist.md`

**The spec file is editable.** The reviewer can modify criteria and re-run the screening. This is the key interactive moment — it shows that the same resume gets evaluated differently based on different manager priorities, and that this is BY DESIGN, not a bug.

**"Run Screening" button → Claude API call:**

The API call sends:
- The spec file content
- The resume content
- A system prompt (see API_PROMPTS section below)

**Output format (right panel):**
- **Fit Score:** 1-10 with brief justification
- **Strengths:** 3-5 bullet points referencing specific resume items
- **Concerns:** 2-3 bullet points (honest, not softened)
- **Spec Alignment:** How well the candidate matches each criterion in the spec (item by item)
- **Bias Check:** A brief note on whether any assessment might be influenced by non-relevant factors
- **Recommendation:** One of: Strong Yes / Yes / Maybe / No — with a one-sentence rationale

**Pre-loaded resume:** Chris Martin's actual resume (PDF or text). The reviewer can also paste in any other resume text.

**Error handling:** If the API call fails, show a graceful message: "Claude is taking a break. Here's a pre-generated example of what this output looks like." Then display a cached mock result.

**Builder's Notes for this module:**
- "Traditional ATS systems match keywords. This misses context: 'full-stack at a 5-person startup' is qualitatively different from 'full-stack at Meta.' Spec files let managers express that nuance in natural language."
- "The Bias Check section exists because AI screening at scale amplifies any bias present in the spec. Making bias visibility a default output — not an opt-in audit — is an architectural decision about what kind of tool this should be."
- "Notice that different specs produce different assessments of the same resume. This is the point. Cindi and James have legitimately different needs. The tool respects that instead of imposing a universal scoring rubric."
- "In production, this module would pull applications from Greenhouse via API/MCP, store assessments in a persistent database, and feed into a candidate pipeline view. The spec file would live in version control so teams can iterate on evaluation criteria collaboratively."

---

### Module 3: Interview Prep (Deep — LIVE CLAUDE API) ⭐

**Route:** `/interview-prep`

**What it shows:** Given a candidate's resume and the role spec, Claude generates tailored interview questions with context for the interviewer.

**Layout:** Two-panel
- **Left panel:** Candidate info (resume summary or key points) + role spec (pre-loaded, editable)
- **Right panel:** Generated interview prep package

**"Generate Interview Prep" button → Claude API call**

**Output format:**
- **Candidate Snapshot:** 3-4 sentence summary of who this person is and what to focus on
- **Recommended Questions** (8-10 total, categorized):
  - Technical Depth (2-3): Questions that probe specific claims on the resume
  - Experience Verification (2-3): Questions designed to distinguish real ownership from proximity
  - Culture & Collaboration (2-3): Questions tailored to the candidate's background
  - Growth Areas (1-2): Questions that explore potential weaknesses constructively
- Each question includes:
  - The question itself
  - **Why this question:** 1 sentence on what signal it's looking for
  - **What good looks like:** Brief description of a strong answer
  - **Red flag:** What would be concerning in a response
- **Interviewer Context:** Background info the interviewer should know (e.g., "Candidate's startup experience means they may frame individual contributions as team work — probe for specifics on team size and their exact role")

**Error handling:** Same pattern — graceful fallback to a pre-generated mock example.

**Builder's Notes for this module:**
- "We COULD have Claude conduct the interview itself. We intentionally chose not to. These are potential colleagues — they deserve a human conversation. AI's role here is to make the human interviewer better prepared, not to replace them."
- "The 'Why this question' annotations serve two purposes: they help interviewers understand the method, and they create a feedback loop — if an interviewer consistently ignores certain question types, that's data about interviewer calibration."
- "The 'Experience Verification' category exists because of a specific problem: candidates who were on a team that did something impressive vs. candidates who drove that work. LLMs are good at generating questions that tease this apart."
- "In production, generated questions would be stored alongside the candidate record, and post-interview, the interviewer's notes would map back to which questions they actually asked. This creates a dataset for improving question generation over time."

---

### Module 4: Interview Debrief (Medium — Mocked)

**Route:** `/debrief`

**What it shows:** After a hiring loop, multiple interviewers submit feedback. This module shows how Claude synthesizes those assessments into a structured committee brief.

**Layout:** 
- **Top:** Tabs or cards for 4 mock interviewers (each with their scorecard visible)
- **Bottom:** The synthesized debrief output

**Mock data:** 4 interviewer scorecards for a fictional candidate "Alex Rivera" applying for Full-Stack SWE:
- Interviewer 1 (Technical): Strong yes. Impressed by system design depth.
- Interviewer 2 (Technical): Lean yes. Good coding but worried about attention to edge cases.
- Interviewer 3 (Culture): Strong yes. Great communicator, asked insightful questions.
- Interviewer 4 (Hiring Manager): Maybe. Concerned about lack of experience at scale. Disagrees with Interviewer 1's assessment of system design.

**Synthesized output (pre-generated, displayed as if Claude produced it):**
- **Consensus Strengths:** Where interviewers agree the candidate excels
- **Consensus Concerns:** Shared worries
- **Contradictions:** Specifically call out where Interviewer 1 and 4 disagree on system design, and frame the question the committee needs to resolve
- **Bias Flags:** Note if any assessments correlate with non-job-relevant factors
- **Committee Discussion Guide:** 3 questions the hiring committee should focus on to make their decision
- **Overall Signal:** Summary recommendation with confidence level

**Builder's Notes for this module:**
- "The most important output isn't the recommendation — it's the Contradictions section. Hiring committees tend to converge around whoever speaks loudest. Surfacing specific disagreements forces the committee to actually resolve them instead of glossing over them."
- "This is fully mock data, but the output format is what a production version would generate via Claude API. The interviewer scorecards would come from Greenhouse's structured feedback forms."
- "Bias flags are structurally integrated, not an afterthought audit. The system checks: did any interviewer's assessment correlate with something other than job-relevant criteria? This doesn't accuse — it asks the question."

---

### Module 5: Onboarding (Medium — Mocked)

**Route:** `/onboarding`

**What it shows:** Spec-driven onboarding checklists that distinguish between company-level and team-level onboarding.

**Layout:**
- Two-column: Company onboarding (left) vs. Team onboarding (right)
- Progress bars showing completion
- Each checklist item is interactive (checkable, for demo purposes)

**Mock data:** Onboarding for "Alex Rivera" — hired from Module 4's debrief. This creates narrative continuity across modules.

**Company-level checklist:**
- IT equipment ordered / received
- System accounts provisioned (email, Slack, GitHub)
- Required trainings: HR compliance, security (PCI/SOC2), code of conduct
- Background check cleared
- Direct deposit / payroll setup
- Building access / badge
- Benefits enrollment

**Team-level checklist (driven by a team spec file):**
- Dev environment setup (with links to setup guides)
- Codebase walkthrough sessions scheduled
- First PR target: "Fix a good-first-issue within week 1"
- Meet the team: 1:1s with each team member scheduled
- Architecture overview session
- Current sprint briefing
- "Ask Claude, not your neighbor" — links to internal Claude-powered knowledge tools

**Builder's Notes for this module:**
- "Company-level onboarding is roughly the same everywhere. Team-level is where it gets interesting — and where most companies fail. A spec file per team means the DevOps team's onboarding looks nothing like the Design team's, which is correct."
- "The 'Ask Claude, not your neighbor' item is a real architectural decision. New hires generate enormous interrupt load on existing team members. An AI knowledge tool that can answer 'where is the staging environment?' or 'how do we deploy?' reduces ramp time AND protects team productivity."
- "I once onboarded 8 developers simultaneously across time zones. Company-level onboarding was the bottleneck — not because it was hard, but because tracking 8 people × 15 checklist items across 3 departments was pure overhead. This is a coordination problem, and coordination problems are where software earns its keep."
- "In production, these checklists would integrate with Jira/Linear for ticket tracking, Okta/Google Workspace for account provisioning, and the team's existing documentation platform. The spec file defines WHAT needs to happen; integrations handle the HOW."

---

### Module 6: Ongoing Management (Stub)

**Route:** `/management`

**What it shows:** Cards or tiles for features that exist in the full vision but weren't built for this demo. Each card has a title, one-line description, and a Builder's Note explaining the vision.

**Cards:**
1. **1:1 Notes & Tracking** — "Structured notes that feed into promotion packets and growth plans."
   - Builder's Note: "1:1s generate the most valuable signal about an employee's trajectory — and it almost always lives in a manager's private notebook or scattered Google Docs. Centralizing this with AI-assisted summarization creates institutional memory that survives manager transitions."

2. **Performance Reviews** — "Spec-driven review frameworks that adapt to role and level."
   - Builder's Note: "The military taught me what happens when performance systems optimize for conformity instead of capability. Fitness reports that don't measure fitness. Spec-driven reviews let each team define what 'excellent' looks like for their context."

3. **Promotion Packets** — "AI-assembled evidence packages from 1:1 notes, peer feedback, and project outcomes."
   - Builder's Note: "Promotions shouldn't depend on who writes the best self-advocacy document. An AI that can surface concrete evidence from a year of 1:1 notes and project records removes one source of inequity."

4. **Internal Transfers** — "Managed handoffs between teams with knowledge transfer checklists."
   - Builder's Note: "Transfers are offboarding + onboarding compressed. Most companies treat them as paperwork. They're actually the highest-risk moment for institutional knowledge loss."

5. **Offboarding** — "Equipment collection, access revocation, knowledge capture, exit interviews."
   - Builder's Note: "Access revocation is a security function. Knowledge capture is a product function. Most offboarding systems handle the first and ignore the second. An AI-assisted exit interview that asks the right questions and synthesizes across departures could surface systemic issues that no single exit interview reveals."

6. **PTO & Timesheet Approvals** — "API-driven workflow integrations."
   - Builder's Note: "This is pure API integration work — not LLM-native. Including it here because a complete People Products vision must account for the mundane alongside the innovative. But if I had limited engineering hours, this gets built last."

---

## Builder's Notes System

**Implementation (Phase 1 — Callouts):**
Builder's Notes are styled callout boxes that appear inline within each module. They should be visually distinct from the product UI — clearly meta-commentary, not part of the "product."

**Styling:**
- Light warm background (slightly different from page background — see DESIGN.md)
- Left border accent in the Anthropic brand color
- Small icon or label: "🔨 Builder's Note" or similar
- Slightly smaller font than body text
- Collapsible if there are more than 2 in a row (click to expand)

**Phase 2 (if time allows) — Toggle Mode:**
A floating toggle in the corner: "Builder's Notes: ON / OFF"
- ON: All notes visible (default for demo reviewers)
- OFF: Clean product view without meta-commentary
- This itself is a product decision worth calling out — it demonstrates thinking about user experience modes

---

## API Integration Details

### Route: `/api/screen-resume` (POST)

**Request body:**
```json
{
  "resume": "string (resume text content)",
  "spec": "string (the hiring spec file content)"
}
```

**System prompt for Claude:**
```
You are an AI-powered resume screening assistant for a People Products platform. You evaluate candidates against a manager-defined spec file.

Your evaluation must be:
- Honest: Don't inflate scores. A "Maybe" is a valid and useful signal.
- Specific: Reference exact items from the resume, not vague impressions.
- Bias-aware: Flag if any part of your assessment might be influenced by factors not relevant to the role requirements in the spec.
- Structured: Follow the output format exactly.

SPEC FILE:
{spec}

RESUME:
{resume}

Respond in JSON format:
{
  "fit_score": <1-10>,
  "fit_justification": "<1-2 sentences>",
  "strengths": ["<specific strength referencing resume>", ...],
  "concerns": ["<specific concern>", ...],
  "spec_alignment": [
    {"criterion": "<from spec>", "assessment": "<how candidate matches>", "signal": "strong|moderate|weak|none"}
  ],
  "bias_check": "<brief note on potential bias factors>",
  "recommendation": "Strong Yes|Yes|Maybe|No",
  "recommendation_rationale": "<1 sentence>"
}
```

### Route: `/api/interview-prep` (POST)

**Request body:**
```json
{
  "resume": "string",
  "spec": "string",
  "role_title": "string"
}
```

**System prompt for Claude:**
```
You are an AI interview preparation assistant. Given a candidate's resume and a role spec, generate a tailored interview preparation package for the INTERVIEWER (not the candidate).

Your goal is to help the interviewer:
1. Understand who this candidate is before they walk in
2. Ask questions that reveal real signal, not rehearsed answers
3. Distinguish genuine ownership from proximity to impressive work
4. Explore growth areas constructively, not gotcha-style

ROLE: {role_title}

SPEC FILE:
{spec}

CANDIDATE RESUME:
{resume}

Respond in JSON format:
{
  "candidate_snapshot": "<3-4 sentence summary>",
  "questions": [
    {
      "category": "Technical Depth|Experience Verification|Culture & Collaboration|Growth Areas",
      "question": "<the interview question>",
      "why_this_question": "<what signal it's looking for>",
      "what_good_looks_like": "<brief strong answer description>",
      "red_flag": "<what would be concerning>"
    }
  ],
  "interviewer_context": "<background the interviewer should know>"
}

Generate 8-10 questions total, distributed across categories.
```

### Error Handling Pattern

```javascript
try {
  const response = await fetch('/api/screen-resume', { ... });
  if (!response.ok) throw new Error('API call failed');
  const data = await response.json();
  setResult(data);
} catch (error) {
  // Show pre-generated mock result with a banner:
  // "Live AI is temporarily unavailable. Showing a representative example."
  setResult(MOCK_SCREENING_RESULT);
  setShowFallbackBanner(true);
}
```

### API Key Handling

The Claude API key is stored as a Vercel environment variable (`ANTHROPIC_API_KEY`). API calls are made server-side via Next.js API routes — the key never touches the client.

---

## PostHog Integration

Add PostHog tracking for:
- Page views (automatic)
- Module clicks from landing page (event: `module_clicked`, properties: `{ module: string }`)
- "Run Screening" button clicks (event: `screening_run`, properties: `{ spec_type: string }`)
- "Generate Interview Prep" clicks (event: `interview_prep_run`)
- Builder's Notes interactions if toggle is implemented (event: `builders_notes_toggled`, properties: `{ state: 'on' | 'off' }`)
- Time on page per module

PostHog project key will be provided as env var `NEXT_PUBLIC_POSTHOG_KEY`.

---

## File Structure

```
app/
  layout.tsx              — Root layout with Anthropic-inspired styling, nav, PostHog
  page.tsx                — Landing page with module grid
  job-posting/
    page.tsx              — Job posting module
  screening/
    page.tsx              — Resume screening module (live API)
  interview-prep/
    page.tsx              — Interview prep module (live API)
  debrief/
    page.tsx              — Interview debrief module (mocked)
  onboarding/
    page.tsx              — Onboarding module (mocked)
  management/
    page.tsx              — Ongoing management stubs
  api/
    screen-resume/
      route.ts            — Claude API route for screening
    interview-prep/
      route.ts            — Claude API route for interview prep
components/
  BuilderNote.tsx         — Reusable Builder's Note callout component
  ModuleCard.tsx          — Landing page module card component
  ModuleLayout.tsx        — Shared layout for module pages (back nav, title, status badge)
  SpecEditor.tsx          — Editable text area with spec file content
  ResumeViewer.tsx        — Resume display component
  StatusBadge.tsx         — 🟢 Live AI / 🔵 Interactive Demo / ⚪ Vision badges
  LoadingState.tsx        — Skeleton/loading UI for API calls
lib/
  mock-data.ts            — All mock data (interviewer scorecards, onboarding checklists, etc.)
  sample-specs.ts         — The hiring spec file contents (exported as strings)
  chris-resume.ts         — Chris's resume text (for pre-loading in screening module)
  prompts.ts              — System prompts for Claude API calls
public/
  — any static assets
```

---

## What This Demo Communicates About the Builder

1. **Product judgment:** Knowing what to automate (screening, question generation) and what not to (the actual interview, the final hiring decision).

2. **Architectural judgment:** Spec-driven configuration over hard-coded rules. Bias checks as default output, not optional audit. Graceful fallbacks for API failures.

3. **Communication skills:** Builder's Notes show the ability to explain technical decisions to non-technical stakeholders — a core EM skill.

4. **Taste:** Matching Anthropic's design language isn't mimicry — it's showing you understand the environment and can build within it.

5. **Shipping ability:** This is deployed, live, and works. Not a Figma mockup. Not a slide deck. Working code.

6. **Scope management:** Clear decisions about what to build deep, what to mock, and what to stub. Every cut is explained, not hidden.
