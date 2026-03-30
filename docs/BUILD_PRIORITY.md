# Build Priority Guide

Chris has ~8 hours. Claude Code should build in this order, treating each phase as a shippable state. If time runs out at any phase, the demo still works.

---

## Phase 1: Foundation (Target: 90 minutes)

**The demo must be deployable after this phase.**

1. Set up the design system: Tailwind config with Anthropic colors, Inter font, global styles
2. Build shared components: `BuilderNote`, `ModuleCard`, `ModuleLayout`, `StatusBadge`
3. Build the landing page with module card grid
4. Build the top navigation bar
5. Set up PostHog (just the script tag + page view tracking — events come later)
6. Verify it deploys to Vercel

**Definition of done:** A reviewer can visit the URL and see a clean, Anthropic-styled landing page with 6 clickable module cards. Nothing else needs to work yet.

---

## Phase 2: The Showpiece — Resume Screening (Target: 2.5 hours)

**This is the most important module. It gets the most time.**

1. Build the three-panel layout (spec editor | resume viewer | output panel)
2. Implement the spec editor with tab switching between Cindi's and James's specs
3. Pre-load Chris's resume text in the resume viewer
4. Build the API route (`/api/screen-resume`) with the Claude system prompt
5. Build the output display component (fit score, strengths, concerns, spec alignment, bias check, recommendation)
6. Add loading state with skeleton UI
7. Add error fallback with mock result
8. Add Builder's Notes (the 4 notes from the project spec)
9. Add PostHog events for screening runs

**Definition of done:** A reviewer can switch between two spec files, click "Run Screening," see Claude analyze the resume in real-time, and read 4 Builder's Notes explaining the thinking.

**Critical test:** Run screening with both specs and verify they produce meaningfully different results for the same resume. This IS the demo.

---

## Phase 3: Interview Prep (Target: 1.5 hours)

1. Build the two-panel layout (candidate info + spec | output)
2. Pre-load with resume summary and spec
3. Build the API route (`/api/interview-prep`) with system prompt
4. Build the output display (candidate snapshot, categorized questions with annotations)
5. Loading state + error fallback
6. Builder's Notes (especially the "we could have AI interview people, but shouldn't" note)

**Definition of done:** A reviewer can generate a tailored interview prep package and see the judgment call about not automating the interview itself.

---

## Phase 4: Mocked Modules (Target: 2 hours)

Build in this order:

### 4a. Interview Debrief (~45 min)
- Display the 4 interviewer scorecards (tabbed or card layout)
- Display the synthesized debrief output
- Highlight the Sarah/David contradiction
- Builder's Notes

### 4b. Onboarding (~30 min)
- Two-column checklist layout (company vs. team)
- Interactive checkboxes (state only, no persistence)
- Progress bars
- Builder's Notes

### 4c. Job Posting (~30 min)
- Side-by-side: spec file and generated posting
- Compliance badges showing which legal requirements are covered
- Builder's Notes

### 4d. Management Stubs (~15 min)
- Grid of cards with title, description, icon, and Builder's Note
- Each card is clearly a "vision" item, not a built feature

**Definition of done:** All routes are navigable. Every module has content and Builder's Notes. The demo feels complete.

---

## Phase 5: Polish (Remaining time)

- Builder's Notes toggle (ON/OFF) — if there's time
- Mobile responsiveness fixes
- Cross-browser check (Chrome + Safari minimum)
- Final Builder's Notes review — are they specific enough? Do they sound like Chris?
- Add a subtle footer: "Built with Claude Code + Claude API · March 2026 · Chris Martin"
- Final Vercel deploy + test all routes

---

## Things That Should NOT Be Built

- Authentication / login
- Database / persistent storage
- File upload (paste text is sufficient for resume input)
- Dark mode
- Admin panel
- Any kind of user management
- Real Greenhouse integration
- Email sending
- Calendar integration

These are all valid production features. They are mentioned in Builder's Notes as "in production, this would..." but are explicitly out of scope for a demo.

---

## Chris's Resume Text

This needs to be embedded in the app for pre-loading. Chris should paste the final text version of his resume into `lib/chris-resume.ts`. If this isn't ready yet, use a placeholder that says "[Chris's resume will be pre-loaded here]" and the screening module should still work with pasted text.

---

## Environment Variables Needed

```
ANTHROPIC_API_KEY=sk-ant-...       # Chris's Anthropic API key
NEXT_PUBLIC_POSTHOG_KEY=phc_...    # PostHog project key (create new project in PostHog)
```

Both go in `.env.local` for development and Vercel environment variables for production.
