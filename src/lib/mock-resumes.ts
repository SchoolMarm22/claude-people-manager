export interface MockResume {
  id: string;
  name: string;
  label: string;
  content: string;
}

export const MOCK_RESUMES: MockResume[] = [
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    label: "Startup Fit",
    content: `PRIYA SHARMA
Full-Stack Engineer | YC Startup Veteran | AWS Certified
San Francisco, CA | priya.dev

SUMMARY
Full-stack engineer with 4 years building products at high-growth Y Combinator startups. Shipped 3 products from zero to production serving 50K+ users. Comfortable owning the entire stack — from Postgres schema design to React component libraries. AWS Solutions Architect certified. Active open source contributor (2,400+ GitHub stars across personal projects).

EXPERIENCE

Senior Software Engineer — Stackflow (YC W23, Series A) (2024–Present)
• Lead engineer on billing platform processing $3M/month through Stripe
• Built real-time analytics dashboard using Next.js, Python/FastAPI, and PostHog
• Reduced deployment time from 45 minutes to 8 minutes by migrating CI/CD to GitHub Actions + AWS CDK
• Mentored 2 junior engineers; both promoted within 12 months

Full-Stack Engineer — Snapform (YC S21, Acquired 2024) (2022–2024)
• Employee #3. Built the entire front-end from scratch using React + TypeScript
• Designed and implemented REST API layer (Node.js/Express) handling 10K requests/minute
• Led integration of Stripe Connect for marketplace payments — reduced payment failures by 60%
• Instrumented full product analytics stack (Mixpanel → migrated to PostHog)
• Participated in YC Demo Day prep; product demo'd to 500+ investors

Software Engineer — Launchpad Studios (Seed Stage) (2021–2022)
• Built MVP for 3 client products in 6 months, all reaching production with paying users
• Full ownership: customer interviews, wireframes, implementation, deployment, iteration
• Introduced automated testing (Jest + Cypress) — reduced regression bugs by 70%
• Managed AWS infrastructure: EC2, RDS, S3, CloudFront, Lambda

EDUCATION
B.S. Computer Science — UC Berkeley (2021)
AWS Solutions Architect – Associate (2023)

SKILLS
Languages: TypeScript, Python, JavaScript, SQL
Frontend: React, Next.js, Tailwind CSS, Framer Motion
Backend: Node.js, FastAPI, Express, PostgreSQL, Redis
Infrastructure: AWS (CDK, Lambda, ECS, RDS, S3), Vercel, Docker
Tools: Stripe, PostHog, Mixpanel, GA4, GitHub Actions, Figma

OPEN SOURCE
• react-form-engine — Headless form builder for React (1,400 stars)
• fastapi-stripe — Stripe webhook handler for FastAPI (600 stars)
• aws-cdk-patterns — Reusable CDK constructs (400 stars)`,
  },
  {
    id: "daniel-okonkwo",
    name: "Daniel Okonkwo",
    label: "Enterprise Angular",
    content: `DANIEL OKONKWO
Senior Front-End Engineer | Angular Expert | Enterprise Platform Specialist
Chicago, IL | daniel-okonkwo.dev

SUMMARY
Front-end engineer with 6 years of deep Angular expertise at Fortune 500 scale. Led the Angular 12 → 17 migration for a 400-component enterprise application serving 80,000+ internal users at Baxter International. Specialist in large-codebase architecture, performance optimization, and design system development. Nx monorepo advocate. Core contributor to the company's shared Angular component library.

EXPERIENCE

Senior Front-End Engineer — Baxter International (2022–Present)
• Led Angular 12 → 17 migration for flagship internal platform (400+ components, 200K+ LOC)
  - Migrated from NgModules to standalone components across 3 phases over 8 months
  - Implemented signal-based reactivity for critical performance paths — reduced change detection cycles by 40%
  - Replaced Karma/Jasmine test suite with Vitest — test execution time dropped from 12 minutes to 90 seconds
• Architect and maintainer of "Helix UI" shared component library (60+ components, used by 8 teams)
• Established Angular coding standards and review guidelines adopted org-wide
• Mentored 4 front-end engineers on Angular patterns, RxJS, and testing strategies

Front-End Engineer — Baxter International (2020–2022)
• Built complex data visualization dashboards for supply chain analytics using Angular + D3.js
• Implemented lazy loading strategy that reduced initial bundle from 4.2MB to 890KB
• Designed and built accessible form system handling 200+ form variations across the platform
• Introduced Nx monorepo tooling — consolidated 6 separate Angular repos into unified workspace

Front-End Developer — Accenture (2019–2020)
• Worked on Angular enterprise applications for 3 Fortune 500 clients
• Specialized in complex state management patterns using NgRx
• Built reusable Angular schematics for project scaffolding across client engagements

Junior Front-End Developer — Accenture (2018–2019)
• Began career in Angular 6, progressed through versions 7 and 8
• Built internal tooling dashboard for project resource allocation
• Completed Accenture's Angular mastery certification program

EDUCATION
B.S. Information Systems — University of Illinois at Chicago (2018)

SKILLS
Framework: Angular (2–17), RxJS, NgRx, Angular CDK, Angular Material
Tooling: Nx, Vitest, Jest, Testing Library, Webpack, ESBuild
Languages: TypeScript (advanced), JavaScript, HTML5, CSS3, SCSS
Libraries: D3.js, ag-Grid, PrimeNG, Tailwind CSS
Methods: Design systems, accessibility (WCAG 2.1 AA), performance optimization, monorepo architecture

COMMUNITY
• Presenter at ng-conf 2024: "Migrating 200K Lines of Angular to Standalone Components"
• Filed 12 issues on Angular GitHub repo, 3 accepted as feature requests
• Author of "Angular Migration Playbook" internal whitepaper (shared publicly on dev.to, 8K views)`,
  },
  {
    id: "maria-santos",
    name: "Maria Santos",
    label: "Career Changer",
    content: `MARIA SANTOS
Software Engineer | Former Educator | Community Builder
Austin, TX | mariasantos.dev

SUMMARY
Software engineer with 1.5 years of professional development experience, transitioning from a 7-year career in public education. Brings deep communication skills, curriculum design experience, and a passion for building tools that help people. Completed Turing School of Software & Design (7-month intensive). Active open source contributor focused on accessibility and educational technology. Strongest in JavaScript/React with growing backend skills.

EXPERIENCE

Software Engineer — Bright Pixel Agency (2025–Present)
• Build client websites and web applications using React, Next.js, and Node.js
• Shipped 6 client projects in 14 months, including an e-commerce platform (Shopify + custom React storefront)
• Built internal project management tool used by 15-person agency — replaced spreadsheet-based tracking
• Introduced component testing with Testing Library — first engineer to establish testing practices at the agency
• Regularly translate client requirements into technical specifications

Junior Software Engineer — Bright Pixel Agency (2024–2025)
• Completed 3-month onboarding building internal tools and learning agency codebase
• Paired with senior engineers on 4 client projects, progressing to independent feature ownership within 4 months
• Built accessible contact form system compliant with WCAG 2.1 AA, now used as agency template

High School Computer Science & Mathematics Teacher — Austin ISD (2017–2024)
• Taught AP Computer Science Principles and Algebra II to 120+ students annually
• Designed curriculum for new CS program — grew enrollment from 15 to 80 students in 3 years
• Mentored students in FIRST Robotics competition — team advanced to state finals 2022
• Led professional development workshops for faculty on educational technology tools
• Received "Innovator of the Year" award (2022) for integrating coding across math curriculum

EDUCATION
Turing School of Software & Design — Back-End Engineering Program (2024)
  • 7-month intensive, 1500+ hours of instruction
  • Capstone: Built "ClassConnect" — a parent-teacher communication platform (React + Express + PostgreSQL)
B.A. Mathematics Education — University of Texas at Austin (2017)

SKILLS
Languages: JavaScript, TypeScript, Ruby, SQL, HTML, CSS
Frontend: React, Next.js, Tailwind CSS, Accessibility (WCAG 2.1)
Backend: Node.js, Express, PostgreSQL, MongoDB (learning)
Tools: Git, GitHub, Vercel, Netlify, Figma, Notion

OPEN SOURCE CONTRIBUTIONS
• a11y-react-components — Accessible React component library (contributed 8 components, 340 stars)
• freeCodeCamp — Contributed 3 curriculum updates for JavaScript algorithms section
• ClassConnect (personal project) — Open-sourced capstone; 12 forks, used by 2 schools in Austin

VOLUNTEER
• Code2College — Volunteer instructor teaching web development to underserved high school students
• Austin Women in Tech — Mentorship program participant (mentee → now mentor)`,
  },
];
