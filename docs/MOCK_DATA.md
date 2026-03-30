# Mock Data Definitions

All mock data for the demo. These should be exported from `lib/mock-data.ts` and imported where needed.

---

## Candidate: Alex Rivera (used across Debrief + Onboarding modules)

This is a fictional candidate who creates narrative continuity across modules. The reviewer sees Alex screened, prepped for, debriefed on, and onboarded — a complete lifecycle.

```typescript
const CANDIDATE_ALEX = {
  name: "Alex Rivera",
  role: "Full-Stack Software Engineer",
  email: "alex.rivera@email.com",
  applied: "2026-03-15",
  status: "Offer Extended",
  resumeHighlights: [
    "3 years at a Series A startup (Patchwork, 8 people → 35 people)",
    "Led migration from Create React App to Next.js 14",
    "Built payment processing pipeline (Stripe) handling $2M ARR",
    "BS Computer Science, University of Washington",
    "Active open source contributor — 3 packages with 500+ GitHub stars",
    "Previously at AWS for 1.5 years on the S3 console team"
  ]
};
```

---

## Interview Scorecards (Debrief Module)

Four interviewers with intentionally varied assessments — including a specific contradiction between Interviewer 1 and Interviewer 4 on system design capability.

```typescript
const INTERVIEWER_SCORECARDS = [
  {
    interviewer: "Sarah Chen",
    title: "Staff Engineer",
    interviewType: "Technical — System Design",
    overallRating: "Strong Yes",
    scores: {
      technicalDepth: 4, // out of 5
      systemDesign: 5,
      codeQuality: 4,
      communication: 4,
      problemSolving: 5
    },
    summary: "Alex's system design skills are exceptional. When I asked them to design a real-time notification system, they didn't just whiteboard the architecture — they proactively discussed failure modes, cache invalidation strategies, and how they'd instrument it for observability. The Patchwork migration experience is real: they could speak to specific tradeoffs around incremental adoption of Next.js app router vs. pages router. I'd hire this person today.",
    strengths: [
      "Proactively discussed edge cases before I asked about them",
      "Drew from real production experience, not textbook answers",
      "Asked clarifying questions that showed product thinking, not just engineering thinking"
    ],
    concerns: [
      "Spoke quickly when excited — might need to slow down when explaining to non-technical stakeholders"
    ]
  },
  {
    interviewer: "Marcus Johnson",
    title: "Senior Engineer",
    interviewType: "Technical — Coding",
    overallRating: "Lean Yes",
    scores: {
      technicalDepth: 4,
      systemDesign: 3,
      codeQuality: 3,
      communication: 4,
      problemSolving: 4
    },
    summary: "Solid coding skills. Alex solved the main problem efficiently and had a clean approach to the data structure question. My concern is around edge case handling — they got the happy path quickly but missed two boundary conditions that I had to prompt them to consider. Once prompted, they handled them well. Not sure if this is interview nerves or a pattern. Code was readable and well-organized.",
    strengths: [
      "Clean code structure — named things well, broke into functions naturally",
      "Good instinct for choosing the right data structure",
      "Recovered well when pointed toward missed edge cases"
    ],
    concerns: [
      "Missed two edge cases (empty input, duplicate keys) without prompting",
      "Didn't write tests until I asked — prefer candidates who test-drive naturally"
    ]
  },
  {
    interviewer: "Priya Patel",
    title: "Engineering Manager",
    interviewType: "Behavioral — Culture & Collaboration",
    overallRating: "Strong Yes",
    scores: {
      teamwork: 5,
      communication: 5,
      ownership: 5,
      growth: 4,
      missionAlignment: 4
    },
    summary: "One of the best behavioral interviews I've conducted this quarter. Alex told a story about a launch that went sideways at Patchwork — their payment processing pipeline dropped transactions during a spike. What stood out wasn't the technical fix (they implemented an idempotency layer) but how they handled it: they called each affected customer personally, wrote a post-mortem that the whole company read, and used the incident to get buy-in for an observability investment. That's ownership. They also asked me thoughtful questions about how we handle disagreements and how we think about AI safety — felt mission-aligned, not just interviewing well.",
    strengths: [
      "Took personal ownership of a production failure — didn't blame the team or the tooling",
      "Communication is exceptional — clear, structured, specific",
      "Asked questions that showed genuine curiosity about our mission and culture"
    ],
    concerns: [
      "Only concern is that all examples came from Patchwork. Would like to have heard about the AWS experience too — was that environment a poor fit, or did they not grow there?"
    ]
  },
  {
    interviewer: "David Kim",
    title: "VP of Engineering",
    interviewType: "Hiring Manager — Final Round",
    overallRating: "Lean Yes",
    scores: {
      technicalDepth: 3,
      leadership: 4,
      strategicThinking: 4,
      communication: 4,
      overallFit: 3
    },
    summary: "I'm going to disagree with Sarah on system design. Alex's whiteboard solution was solid but conventional. When I pushed on how they'd handle our specific scale (50x their Patchwork traffic), they didn't have a confident answer. That's not disqualifying — nobody designs perfectly for scale they haven't experienced — but I want the committee to discuss it rather than assume the system design round was a slam dunk. On the positive side, Alex's product instincts are strong. They asked me about our roadmap and immediately started riffing on where they'd add value. That kind of proactive thinking is rare. I'm a lean yes but want to hear the committee's read on the scale question.",
    strengths: [
      "Strong product intuition — thinks about user impact, not just code",
      "Proactively identified where they could contribute based on our roadmap",
      "Honest about what they don't know — didn't bluff on the scale question"
    ],
    concerns: [
      "System design confidence drops significantly above 100K concurrent users",
      "All production experience is at Patchwork scale (~5K concurrent). We're at 250K.",
      "AWS experience seems like a gap year — need to understand why they left after 1.5 years"
    ]
  }
];
```

---

## Synthesized Debrief Output (Mock — displayed as if Claude generated it)

```typescript
const MOCK_DEBRIEF = {
  candidateName: "Alex Rivera",
  role: "Full-Stack Software Engineer",
  interviewDate: "2026-03-20",
  committeeDate: "2026-03-22",
  
  consensusStrengths: [
    "Exceptional communication skills — every interviewer rated communication 4+/5. Alex explains complex topics clearly and structures their thinking visibly.",
    "Strong ownership instinct — the Patchwork payment incident story was cited by multiple interviewers as evidence of genuine accountability, not just responsibility.",
    "Product-minded engineer — asks 'why' and 'for whom' before 'how.' Multiple interviewers noted Alex thinking about user impact unprompted."
  ],
  
  consensusConcerns: [
    "All meaningful experience comes from one company (Patchwork). The 1.5-year AWS stint is unexplored and potentially concerning.",
    "Edge case handling in live coding was reactive rather than proactive — Alex caught issues when prompted but didn't surface them independently."
  ],
  
  contradictions: [
    {
      topic: "System Design Capability",
      interviewerA: "Sarah Chen (Staff Engineer) — rated 5/5, called it 'exceptional'",
      interviewerB: "David Kim (VP Eng) — rated 3/5, found it 'solid but conventional'",
      analysis: "This likely reflects different evaluation baselines. Sarah assessed system design fundamentals and architectural thinking — which Alex demonstrated strongly. David assessed design at scale beyond Alex's direct experience — where Alex was honest about uncertainty. Both assessments may be accurate. The committee question: is scaling knowledge learnable on the job, or is it a prerequisite?",
      questionForCommittee: "If Alex joins and faces a 250K-concurrent-user design challenge in month 2, do we trust them to figure it out with support? Or do we need someone who's already operated at that scale?"
    }
  ],
  
  biasFlags: [
    "No bias concerns identified in this round. All assessments reference job-relevant criteria. Note: Alex's open source contributions received positive attention from technical interviewers — verify this doesn't inadvertently disadvantage candidates who contribute to their work in other ways (internal tooling, mentorship, documentation)."
  ],
  
  committeeDiscussionGuide: [
    "Resolve the system design disagreement: Is Sarah's or David's bar the right bar for this role at our current scale?",
    "Explore the AWS gap: Should we back-channel or ask Alex directly about why they left after 1.5 years?",
    "Assess the edge case concern: Is Marcus's observation about missed boundary conditions a pattern or an interview artifact? Can we check against the take-home if one was submitted?"
  ],
  
  overallSignal: {
    recommendation: "Lean Hire",
    confidence: "Moderate",
    rationale: "Three of four interviewers recommend hiring. The one dissent (David) is not a No — it's a 'let's discuss.' Alex's communication skills, ownership instinct, and product thinking are clear strengths. The scale concern is legitimate but may be addressable through onboarding and mentorship. The committee should make an explicit decision on the scale question rather than averaging across interviewers."
  }
};
```

---

## Onboarding Checklist Data

```typescript
const ONBOARDING_COMPANY = {
  employee: "Alex Rivera",
  startDate: "2026-04-07",
  manager: "David Kim",
  items: [
    { id: 1, task: "Laptop ordered and configured by IT", status: "complete", owner: "IT", dueDate: "2026-04-01" },
    { id: 2, task: "Email and Slack accounts provisioned", status: "complete", owner: "IT", dueDate: "2026-04-04" },
    { id: 3, task: "GitHub org access granted", status: "complete", owner: "IT", dueDate: "2026-04-04" },
    { id: 4, task: "Building access badge created", status: "complete", owner: "Facilities", dueDate: "2026-04-07" },
    { id: 5, task: "HR compliance training", status: "in_progress", owner: "Alex", dueDate: "2026-04-14" },
    { id: 6, task: "Security training (SOC2 / data handling)", status: "not_started", owner: "Alex", dueDate: "2026-04-14" },
    { id: 7, task: "Code of conduct acknowledgment", status: "not_started", owner: "Alex", dueDate: "2026-04-14" },
    { id: 8, task: "Background check cleared", status: "in_progress", owner: "HR", dueDate: "2026-04-11" },
    { id: 9, task: "Direct deposit and payroll setup", status: "complete", owner: "Alex", dueDate: "2026-04-07" },
    { id: 10, task: "Benefits enrollment", status: "not_started", owner: "Alex", dueDate: "2026-04-21" }
  ]
};

const ONBOARDING_TEAM = {
  teamName: "Product Engineering",
  specFile: "product-eng-onboarding-spec.md",
  items: [
    { id: 1, task: "Dev environment setup (follow setup guide)", status: "in_progress", owner: "Alex", dueDate: "2026-04-08", link: "#" },
    { id: 2, task: "Codebase walkthrough with Sarah Chen", status: "scheduled", owner: "Sarah Chen", scheduledDate: "2026-04-08 2:00 PM" },
    { id: 3, task: "Architecture overview with David Kim", status: "scheduled", owner: "David Kim", scheduledDate: "2026-04-09 10:00 AM" },
    { id: 4, task: "First PR: Pick from good-first-issues", status: "not_started", owner: "Alex", dueDate: "2026-04-11", link: "#" },
    { id: 5, task: "1:1 with each team member (8 scheduled)", status: "in_progress", owner: "Alex", progress: "2/8 complete" },
    { id: 6, task: "Current sprint briefing", status: "scheduled", owner: "Marcus Johnson", scheduledDate: "2026-04-07 3:00 PM" },
    { id: 7, task: "CI/CD pipeline walkthrough", status: "not_started", owner: "Marcus Johnson", dueDate: "2026-04-10" },
    { id: 8, task: "Internal tools orientation (including Claude-powered search)", status: "not_started", owner: "Priya Patel", dueDate: "2026-04-09" },
    { id: 9, task: "Review team spec files and norms document", status: "not_started", owner: "Alex", dueDate: "2026-04-09", link: "#" },
    { id: 10, task: "Shadow a support rotation shift", status: "not_started", owner: "Alex", dueDate: "2026-04-18" }
  ]
};
```

---

## Job Posting Mock Data

```typescript
const MOCK_JOB_POSTING = {
  title: "Full-Stack Software Engineer",
  team: "Product Engineering",
  location: "San Francisco, CA (Hybrid — 3 days/week in office)",
  salary: "$160,000 - $210,000",
  specFile: "fullstack-startup.md",
  manager: "Cindi Alvarez",
  
  generatedPosting: `We're looking for a Full-Stack Software Engineer to join our Product Engineering team. You'll work across the entire stack — from database design to user-facing React components — in a fast-paced, small-team environment where everyone ships production code weekly.

This role is ideal for engineers who thrive in startup-like environments and want deep ownership over the features they build. You'll work closely with design, product, and infrastructure to deliver features that directly impact our users.

What You'll Do:
• Build and ship full-stack features using Next.js, TypeScript, and Python
• Own features end-to-end: design, build, test, deploy, and monitor
• Contribute to architectural decisions as we scale from 5K to 50K concurrent users
• Instrument your features with analytics and use data to iterate
• Participate in code review, on-call rotation, and technical planning

What We're Looking For:
• 3+ years building production web applications
• Strong experience with React (preferably Next.js) and a backend language (Python or Node.js)
• Experience at a small company (seed to Series B) where you wore multiple hats
• Track record of shipping features that real users rely on
• Clear written communication skills — we're async-heavy

Nice to Have:
• AWS experience or certifications
• Experience with payment systems (Stripe)
• Analytics platform experience (PostHog, Mixpanel, GA4)
• Open source contributions

Salary: $160,000 - $210,000 (posted per Colorado and California salary transparency requirements)

We are an equal opportunity employer and value diversity. We encourage applications from veterans and individuals with disabilities.`,

  complianceNotes: [
    { type: "salary_transparency", jurisdictions: ["California", "Colorado", "New York City", "Washington"], status: "included" },
    { type: "veteran_preference", status: "included" },
    { type: "disability_accommodation", status: "included" },
    { type: "equal_opportunity", status: "included" }
  ]
};
```

---

## Mock Screening Result (Fallback if API fails)

```typescript
const MOCK_SCREENING_RESULT = {
  fit_score: 7,
  fit_justification: "Strong full-stack profile with real startup experience and shipped products. Some gaps in specific technical areas mentioned in the spec, but overall profile shows the builder instinct and ownership mentality the spec prioritizes.",
  strengths: [
    "Co-founded two startups — demonstrates exactly the 'you were the stack' experience the spec requires",
    "Built and deployed multiple AI-native applications solo, showing end-to-end ownership",
    "Published author indicates exceptional communication skills, which the spec lists as a must-have",
    "Led a 16-developer portal redesign — shows ability to operate at scale while maintaining startup instincts"
  ],
  concerns: [
    "Current employer is a large enterprise (Charter Communications) — most recent experience is not startup-environment",
    "No explicit AWS certification mentioned, though deployment experience is evident",
    "Analytics tool experience not explicitly mentioned on resume"
  ],
  spec_alignment: [
    { criterion: "Real startup experience", assessment: "Strong — two co-founded startups with full-stack ownership", signal: "strong" },
    { criterion: "React + Python/Node", assessment: "React/Next.js confirmed. Node/TypeScript confirmed. Python not explicitly listed.", signal: "moderate" },
    { criterion: "Shipped production code", assessment: "Multiple live products with real users — SpeechCraft, FCK.School, Charter features serving 700K+ monthly users", signal: "strong" },
    { criterion: "Clear written communication", assessment: "Published a 200+ page book. Exceptional signal.", signal: "strong" },
    { criterion: "AWS experience", assessment: "Deployment experience implied (Vercel) but no specific AWS mentions", signal: "weak" },
    { criterion: "Analytics tools", assessment: "PostHog integration on SpeechCraft products — direct experience", signal: "moderate" }
  ],
  bias_check: "No bias concerns identified. Assessment based entirely on spec-defined criteria. Note: military experience is not a factor in this spec's evaluation criteria and was weighted neutrally.",
  recommendation: "Yes",
  recommendation_rationale: "Strong alignment on the highest-weighted criteria (startup experience, shipped products, communication). Gaps are in lower-weighted nice-to-haves that are learnable."
};
```

---

## Management Stubs Data

```typescript
const MANAGEMENT_STUBS = [
  {
    title: "1:1 Notes & Tracking",
    description: "Structured notes that feed into promotion packets and growth plans.",
    icon: "📝",
    buildersNote: "1:1s generate the most valuable signal about an employee's trajectory — and it almost always lives in a manager's private notebook or scattered Google Docs. Centralizing this with AI-assisted summarization creates institutional memory that survives manager transitions."
  },
  {
    title: "Performance Reviews",
    description: "Spec-driven review frameworks that adapt to role and level.",
    icon: "📊",
    buildersNote: "The military taught me what happens when performance systems optimize for conformity instead of capability. Fitness reports that don't measure fitness. Spec-driven reviews let each team define what 'excellent' looks like for their context."
  },
  {
    title: "Promotion Packets",
    description: "AI-assembled evidence packages from 1:1 notes, peer feedback, and project outcomes.",
    icon: "🚀",
    buildersNote: "Promotions shouldn't depend on who writes the best self-advocacy document. An AI that can surface concrete evidence from a year of 1:1 notes and project records removes one source of inequity."
  },
  {
    title: "Internal Transfers",
    description: "Managed handoffs between teams with knowledge transfer checklists.",
    icon: "🔄",
    buildersNote: "Transfers are offboarding + onboarding compressed. Most companies treat them as paperwork. They're actually the highest-risk moment for institutional knowledge loss."
  },
  {
    title: "Offboarding",
    description: "Equipment collection, access revocation, knowledge capture, exit interviews.",
    icon: "👋",
    buildersNote: "Access revocation is a security function. Knowledge capture is a product function. Most offboarding systems handle the first and ignore the second. An AI-assisted exit interview that synthesizes across departures could surface systemic issues no single conversation reveals."
  },
  {
    title: "PTO & Timesheet Approvals",
    description: "API-driven workflow integrations.",
    icon: "📅",
    buildersNote: "This is pure API integration work — not LLM-native. Including it because a complete People Products vision must account for the mundane alongside the innovative. But if I had limited engineering hours, this gets built last."
  }
];
```
