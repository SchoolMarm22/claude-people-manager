export const SPECS = {
  "fullstack-startup": {
    label: "Cindi's Spec — Full-Stack SWE (Startup-Focused)",
    manager: "Cindi Alvarez",
    team: "Product Engineering",
    content: `# Hiring Spec: Full-Stack Software Engineer
## Manager: Cindi Alvarez | Team: Product Engineering

### Role Context
We're a 12-person product engineering team building the core platform. We move fast, ship weekly, and everyone touches everything. This is NOT a "full-stack" role where you do React and occasionally look at a Node endpoint. This is a role where you'll architect database schemas on Monday, build a complex React flow on Tuesday, debug a Lambda on Wednesday, and review someone else's infrastructure PR on Thursday.

### Must-Have Criteria
- **Real startup experience.** Full-stack at a 200-person company is different from full-stack at a 5-15 person company. At a small startup, "full-stack" means you were the stack. Prefer candidates who have been in environments where there was no one else to hand the backend work to.
- **React + Python (or Node).** We need both. Strong frontend-only or backend-only candidates aren't a fit regardless of other qualifications.
- **Has shipped production code that real users touched.** Side projects count if they have real users. Bootcamp capstones do not.
- **Can write clearly.** We're async-heavy. If their resume or cover letter is poorly written, that's a signal.

### Strong Positive Signals
- AWS experience (we're all-in on AWS). Bonus: any AWS certifications.
- Analytics tool experience — GA4, Mixpanel, PostHog, Amplitude. We're data-driven and expect engineers to instrument their own features.
- Experience with Stripe, payment integrations, or billing systems. Our billing is complex and everyone eventually touches it.
- Contributions to open source. Shows they can work in public and collaborate with strangers.
- Founded something, even if it failed. Shows ownership instinct.

### Moderate Positive Signals
- CS degree from a strong program (but not required — we have great engineers from bootcamps and self-taught backgrounds).
- Experience with our specific stack: Next.js, TypeScript, Supabase, Tailwind.
- Has written technical blog posts or documentation.

### Negative Signals
- Resume lists 8+ languages/frameworks with no depth indicators. Breadth without evidence of depth is a red flag.
- All experience at large companies (500+ employees) with no evidence of operating independently.
- No shipped products — only "contributed to" or "participated in."
- Cover letter is clearly AI-generated boilerplate with no specifics about our company.

### Evaluation Weighting
- Startup / small-team experience: 30%
- Technical depth (React + backend): 25%
- Shipped production work: 20%
- Communication quality: 15%
- Bonus signals (AWS, analytics, payments): 10%

### Notes
I'd rather hire someone with 2 years at a real startup than 5 years at Google. I want people who've felt the pain of being the only person who can fix the thing at 2am. That's the instinct we need.`,
  },
  "angular-specialist": {
    label: "James's Spec — Angular Front-End Specialist",
    manager: "James Okonkwo",
    team: "Enterprise Platform",
    content: `# Hiring Spec: Senior Front-End Engineer (Angular)
## Manager: James Okonkwo | Team: Enterprise Platform

### Role Context
We maintain a large-scale Angular enterprise application serving 50,000+ internal users. This is not a greenfield project. This is a mature, complex codebase that requires deep Angular expertise — not someone who "also knows Angular." We're mid-migration from Angular 14 to Angular 19 and need someone who can lead that effort technically.

### Must-Have Criteria
- **Deep Angular expertise.** Minimum 3 years working primarily in Angular (not AngularJS — Angular 2+). Must understand the module system, dependency injection, change detection strategies, and RxJS at a non-trivial level.
- **Angular version migration experience.** Ideally has migrated across major versions (e.g., 12→15 or 15→18). Understands the standalone components migration, the new control flow syntax, and signal-based reactivity.
- **Large codebase experience.** Has worked in applications with 100+ components, complex routing, and shared component libraries. Understands lazy loading, code splitting, and performance optimization at scale.
- **Testing philosophy.** We're moving from Jasmine/Karma to Vitest. Candidates who have experience with or strong opinions about this migration are immediately interesting.

### Strong Positive Signals
- Has performed or led an Angular version migration across a large codebase. This is the #1 thing we need right now.
- Knows Vitest, Jest, or Testing Library in an Angular context. The Jasmine/Karma → modern testing migration is our second biggest priority.
- Experience with Nx monorepo tooling.
- Has built or maintained a shared component library / design system in Angular.
- Performance optimization work: bundle analysis, lazy loading strategies, change detection tuning (OnPush, signals).

### Negative Signals — PAY ATTENTION TO THESE
- **React, Vue, Next.js, Gatsby, Svelte as primary experience.** If their resume leads with React and mentions Angular as a secondary skill, this is a pass. We need Angular-first engineers, not "I can learn any framework" generalists.
- **AngularJS (1.x) experience listed as "Angular" experience.** These are fundamentally different frameworks.
- **No evidence of working in large existing codebases.** If all their work is greenfield/startup, they may struggle with our legacy patterns and migration constraints.
- **"Full-stack" positioning.** We need a frontend specialist. Candidates who position themselves as full-stack are usually not deep enough in Angular for what we need.

### Evaluation Weighting
- Angular depth and version migration experience: 40%
- Large codebase / enterprise experience: 25%
- Testing philosophy and migration capability: 15%
- TypeScript and tooling sophistication: 10%
- Cultural fit and mentorship ability: 10%

### Notes
I want to be very clear: this is not a "we use Angular so you should know it" role. This is a "you ARE an Angular engineer and that's your identity" role. The ideal candidate has opinions about Angular's roadmap, has probably filed issues on the Angular GitHub, and gets excited about signal-based reactivity. Framework-agnostic generalists will not succeed here.`,
  },
};

export type SpecKey = keyof typeof SPECS;
