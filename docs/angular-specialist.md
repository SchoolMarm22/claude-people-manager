# Hiring Spec: Senior Front-End Engineer (Angular)
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

### Moderate Positive Signals
- TypeScript expertise beyond basic typing — generics, utility types, type guards, discriminated unions.
- CI/CD pipeline experience specific to Angular (build optimization, differential loading).
- Accessibility (a11y) expertise — our enterprise users include government agencies with strict compliance requirements.
- Has mentored junior Angular developers.

### Negative Signals — PAY ATTENTION TO THESE
- **React, Vue, Next.js, Gatsby, Svelte as primary experience.** If their resume leads with React and mentions Angular as a secondary skill, this is a pass. We need Angular-first engineers, not "I can learn any framework" generalists. We've made this hire before and it doesn't work — the codebase is too complex for someone to learn Angular on the job.
- **AngularJS (1.x) experience listed as "Angular" experience.** These are fundamentally different frameworks. If we can't tell from the resume whether they mean Angular or AngularJS, that's a concern.
- **No evidence of working in large existing codebases.** If all their work is greenfield/startup, they may struggle with our legacy patterns and migration constraints.
- **"Full-stack" positioning.** We need a frontend specialist. Candidates who position themselves as full-stack are usually not deep enough in Angular for what we need.

### Evaluation Weighting
- Angular depth and version migration experience: 40%
- Large codebase / enterprise experience: 25%
- Testing philosophy and migration capability: 15%
- TypeScript and tooling sophistication: 10%
- Cultural fit and mentorship ability: 10%

### Notes
I want to be very clear: this is not a "we use Angular so you should know it" role. This is a "you ARE an Angular engineer and that's your identity" role. The ideal candidate has opinions about Angular's roadmap, has probably filed issues on the Angular GitHub, and gets excited about signal-based reactivity. Framework-agnostic generalists will not succeed here.
