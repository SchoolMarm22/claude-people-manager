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
  "marketing-growth": {
    label: "Diana's Spec — Growth Marketing Manager",
    manager: "Diana Reyes",
    team: "Marketing",
    content: `# Hiring Spec: Growth Marketing Manager
## Manager: Diana Reyes | Team: Marketing

### Role Context
We're a 6-person marketing team at a Series B B2B SaaS company ($15M ARR). This is a growth marketing role, not brand marketing. You'll own the full funnel from paid acquisition through activation and retention. We need someone who's as comfortable in a SQL query as they are writing ad copy. Our current paid channels (Google, LinkedIn, Reddit) are profitable but plateauing, and we need someone to unlock the next phase of growth.

### Must-Have Criteria
- **B2B SaaS growth experience.** Consumer marketing doesn't transfer cleanly. We need someone who understands long sales cycles, multi-touch attribution, and the difference between MQLs and actual pipeline.
- **Has managed real ad budgets.** $50K+/month across multiple channels. Not just "I helped optimize campaigns" — actually owned the budget and P&L for paid acquisition.
- **Analytical mindset with tools to match.** Must be comfortable in GA4, Looker/Tableau, and ideally can write basic SQL. We're data-driven and "I have a feeling this will work" isn't sufficient.
- **Content marketing instincts.** Not a writer per se, but understands how content drives SEO and demand gen. Has worked with content teams or freelancers to produce high-performing assets.

### Strong Positive Signals
- Has scaled a B2B SaaS from $5M to $20M+ ARR and can articulate what they did specifically.
- Experience with PLG (product-led growth) motions alongside traditional sales-led. We're hybrid.
- ABM (account-based marketing) experience. Our enterprise segment is growing and we need targeted approaches.
- Has built or improved marketing attribution models. Bonus: has opinions about why most attribution is broken.
- Experience marketing developer tools or technical products. Our buyers are technical.

### Negative Signals
- **Agency background only.** Agency marketers often lack the depth of owning a single product's growth. If their resume is all agency work, they need to show they can go deep.
- **Heavy brand/creative focus.** If their portfolio is campaigns and brand guidelines but no growth metrics, this isn't the role.
- **No quantified results.** Marketing resumes without numbers (CAC, LTV, conversion rates, pipeline generated) suggest someone who can't or doesn't measure their impact.
- **Only managed one channel.** We need a generalist who can operate across paid, organic, email, and events.

### Evaluation Weighting
- Growth track record with quantified results: 35%
- Analytical depth (SQL, attribution, experimentation): 25%
- B2B SaaS domain expertise: 20%
- Strategic thinking and channel diversification: 15%
- Cultural fit and collaboration: 5%

### Notes
The biggest risk with growth marketing hires is people who've ridden a wave vs. people who've created one. If they joined a company that was already growing 3x and they "managed" the paid program, that's very different from someone who took a stagnant pipeline and found new channels. I want to hear about what they CHANGED, not what they maintained.`,
  },
  "marketing-content": {
    label: "Diana's Spec — Content Marketing Lead",
    manager: "Diana Reyes",
    team: "Marketing",
    content: `# Hiring Spec: Content Marketing Lead
## Manager: Diana Reyes | Team: Marketing

### Role Context
We sell a technical B2B product and our buyers are engineering leaders and DevOps teams. Our content needs to be genuinely useful, not marketing fluff. Think Stripe's documentation quality applied to thought leadership. This person will own our content strategy end-to-end: blog, case studies, whitepapers, webinars, and newsletter. They'll work closely with our engineering team to produce content that developers actually want to read.

### Must-Have Criteria
- **Can write for a technical audience without being an engineer.** Must be able to take a complex technical concept and make it accessible without dumbing it down. We'll test this in the interview.
- **SEO-driven content strategy experience.** Understands keyword research, topic clusters, and how to build a content engine that compounds over time. Not just "wrote blog posts" but "built a content program that drove measurable organic traffic growth."
- **Has produced multiple content types.** Blog posts, case studies, whitepapers, email sequences. Versatility is key — we're a small team and you'll do all of these.
- **Portfolio required.** Must have a portfolio of published work. No exceptions.

### Strong Positive Signals
- Has written for developer audiences before (DevRel background, technical writing, developer documentation).
- Can show a direct line from content they produced to pipeline or revenue. Not just traffic — actual business impact.
- Experience with content tools: CMS platforms, SEO tools (Ahrefs/SEMrush), email platforms (HubSpot/Customer.io).
- Has managed freelancers or agencies. We'll likely augment with contractors and need someone who can brief and QA external writers.
- Has a personal blog or newsletter. Shows they actually enjoy writing, not just that they can.

### Negative Signals
- **All consumer-facing content.** B2C content skills don't transfer well to B2B technical audiences.
- **No portfolio.** Content marketers without published samples are a non-starter.
- **Only short-form.** If they've never produced anything longer than a blog post, they'll struggle with our case studies and whitepapers.
- **Can't explain SEO basics.** If they can't discuss keyword strategy, internal linking, or content decay, they're not strategic enough for this role.

### Evaluation Weighting
- Writing quality and portfolio strength: 35%
- SEO and content strategy sophistication: 25%
- Experience with technical/developer audiences: 20%
- Content-to-pipeline attribution understanding: 15%
- Cultural fit and independence: 5%

### Notes
I'd rather hire a strong writer who can learn our product than a product expert who writes mediocre content. Writing quality is the hardest thing to teach. Strategy, SEO, and product knowledge can all be learned on the job. But if the writing is flat, nothing else matters.`,
  },
};

export type SpecKey = keyof typeof SPECS;
