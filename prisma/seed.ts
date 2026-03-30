import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.candidateTag.deleteMany();
  await prisma.feedbackSummary.deleteMany();
  await prisma.interviewFeedback.deleteMany();
  await prisma.interview.deleteMany();
  await prisma.screeningResult.deleteMany();
  await prisma.candidate.deleteMany();
  await prisma.jobRequisition.deleteMany();

  // ============================================================================
  // JOB REQUISITIONS
  // ============================================================================

  const seniorEngineer = await prisma.jobRequisition.create({
    data: {
      id: "req-senior-eng",
      title: "Senior Software Engineer, Platform",
      department: "Engineering",
      level: "L5",
      description:
        "We're looking for a senior engineer to help build and scale our core platform services. You'll work on distributed systems, API design, and developer experience tooling.",
      requirements: JSON.stringify([
        "5+ years of software engineering experience",
        "Strong experience with distributed systems",
        "Proficiency in Go, Python, or TypeScript",
        "Experience with cloud infrastructure (AWS/GCP)",
        "Track record of technical leadership on complex projects",
      ]),
      niceToHaves: JSON.stringify([
        "Experience with Kubernetes and container orchestration",
        "Contributions to open-source projects",
        "Experience with ML/AI infrastructure",
      ]),
      status: "open",
    },
  });

  const emRole = await prisma.jobRequisition.create({
    data: {
      id: "req-em",
      title: "Engineering Manager, Growth",
      department: "Engineering",
      level: "M1",
      description:
        "Lead a team of 6-8 engineers building growth and activation features. You'll balance hands-on technical work with people management and cross-functional collaboration.",
      requirements: JSON.stringify([
        "3+ years of engineering management experience",
        "Strong technical background with ability to review code and make architectural decisions",
        "Experience scaling teams and hiring",
        "Track record of shipping user-facing features",
        "Excellent communication skills",
      ]),
      niceToHaves: JSON.stringify([
        "Experience with growth/activation metrics",
        "Background in full-stack web development",
        "Experience in high-growth startups",
      ]),
      status: "open",
    },
  });

  const dataEngineer = await prisma.jobRequisition.create({
    data: {
      id: "req-data-eng",
      title: "Data Engineer",
      department: "Data",
      level: "L4",
      description:
        "Build and maintain data pipelines that power our analytics and ML systems. Work closely with data scientists and product teams.",
      requirements: JSON.stringify([
        "3+ years of data engineering experience",
        "Strong SQL and Python skills",
        "Experience with data pipeline tools (Airflow, dbt, Spark)",
        "Understanding of data modeling and warehouse design",
      ]),
      niceToHaves: JSON.stringify([
        "Experience with real-time streaming (Kafka, Flink)",
        "Familiarity with ML feature stores",
      ]),
      status: "open",
    },
  });

  // ============================================================================
  // CANDIDATES — diverse set at various pipeline stages
  // ============================================================================

  // --- Candidate 1: Strong match, fully through pipeline ---
  const candidate1 = await prisma.candidate.create({
    data: {
      id: "cand-1",
      firstName: "Priya",
      lastName: "Sharma",
      email: "priya.sharma@email.com",
      phone: "+1-555-0101",
      linkedIn: "linkedin.com/in/priyasharma",
      source: "referral",
      stage: "offer",
      resumeText: `PRIYA SHARMA
Senior Software Engineer

EXPERIENCE:
Staff Engineer, CloudScale Inc. (2020-Present)
- Led migration of monolithic API to microservices architecture serving 50M requests/day
- Designed and implemented distributed caching layer reducing p99 latency by 65%
- Mentored team of 4 junior engineers, 2 promoted within 18 months
- Built internal developer platform used by 200+ engineers

Senior Engineer, TechFlow (2017-2020)
- Core contributor to real-time data pipeline processing 2TB/day
- Implemented service mesh using Istio, reducing inter-service failures by 80%
- Led technical design reviews for platform team

Software Engineer, StartupXYZ (2014-2017)
- Full-stack development of B2B SaaS platform
- Built CI/CD pipeline reducing deployment time from 2 hours to 15 minutes

SKILLS: Go, Python, TypeScript, Kubernetes, AWS, Terraform, gRPC, PostgreSQL, Redis, Kafka

EDUCATION: MS Computer Science, University of Washington`,
      jobReqId: seniorEngineer.id,
      appliedAt: new Date("2026-03-01"),
      tags: {
        create: [{ tag: "strong-match" }, { tag: "referral" }],
      },
    },
  });

  // Screening result for candidate 1
  await prisma.screeningResult.create({
    data: {
      candidateId: candidate1.id,
      overallScore: 5,
      relevanceScore: 5,
      skillsScore: 5,
      experienceScore: 5,
      summary:
        "Exceptional candidate with deep distributed systems experience. Currently operating at Staff level with strong leadership track record. Direct experience with the exact tech stack we use.",
      strengths: JSON.stringify([
        "Led large-scale microservices migration — directly relevant to our platform work",
        "Quantifiable impact: 65% latency reduction, 50M req/day scale",
        "Strong mentorship track record — 2 direct reports promoted",
        "Full breadth of required skills: Go, Python, K8s, AWS",
      ]),
      concerns: JSON.stringify([
        "May be overqualified for L5 — could be a flight risk if not given Staff-level scope",
        "All experience at smaller companies — unclear how she navigates large org politics",
      ]),
      reasoning:
        "This candidate exceeds requirements across every dimension. Her experience leading the CloudScale microservices migration maps directly to our platform challenges. The mentorship track record suggests she could grow into a tech lead role. My only concern is retention — she may expect Staff-level scope and compensation, which we should address proactively in the offer.",
      recommendation: "advance",
    },
  });

  // Interviews for candidate 1
  const interview1a = await prisma.interview.create({
    data: {
      candidateId: candidate1.id,
      interviewerName: "Alex Chen",
      interviewerRole: "hiring_manager",
      interviewType: "system_design",
      scheduledAt: new Date("2026-03-08T10:00:00Z"),
      completedAt: new Date("2026-03-08T11:00:00Z"),
      status: "completed",
      feedback: {
        create: {
          overallRating: 4,
          technicalRating: 5,
          communicationRating: 5,
          strengths:
            "Designed an elegant solution for the distributed cache invalidation problem. Drew clear system diagrams and explained tradeoffs thoroughly. Asked excellent clarifying questions.",
          concerns:
            "None significant. She pushed back on my suggestion to use eventual consistency, which was actually the right call — she correctly identified a case where it would cause data corruption.",
          rawNotes:
            "System design: distributed notification system. She immediately identified the fan-out problem and proposed a tiered approach. When I pushed on consistency requirements, she walked through exactly which components needed strong vs eventual consistency with specific examples. Best system design interview I've conducted this quarter.",
          recommendation: "strong_hire",
        },
      },
    },
  });

  const interview1b = await prisma.interview.create({
    data: {
      candidateId: candidate1.id,
      interviewerName: "Jordan Rivera",
      interviewerRole: "peer",
      interviewType: "technical",
      scheduledAt: new Date("2026-03-08T13:00:00Z"),
      completedAt: new Date("2026-03-08T14:00:00Z"),
      status: "completed",
      feedback: {
        create: {
          overallRating: 4,
          technicalRating: 5,
          communicationRating: 4,
          strengths:
            "Solved the coding problem efficiently with clean, well-tested code. Proactively discussed edge cases before I prompted. Her Go code was idiomatic and production-quality.",
          concerns:
            "Minor: she was very focused on getting the optimal solution and spent less time explaining her thought process. Had to ask her to verbalize more. Not a red flag, just a style difference.",
          rawNotes:
            "Coding: concurrent rate limiter in Go. Solved in 25 mins with tests. Code was clean, used channels appropriately. Added graceful shutdown handling without being asked. When I asked about alternative approaches, she compared token bucket vs sliding window with clear tradeoffs.",
          recommendation: "strong_hire",
        },
      },
    },
  });

  const interview1c = await prisma.interview.create({
    data: {
      candidateId: candidate1.id,
      interviewerName: "Sam Washington",
      interviewerRole: "cross_functional",
      interviewType: "behavioral",
      scheduledAt: new Date("2026-03-09T10:00:00Z"),
      completedAt: new Date("2026-03-09T11:00:00Z"),
      status: "completed",
      feedback: {
        create: {
          overallRating: 3,
          communicationRating: 4,
          strengths:
            "Gave concrete examples of conflict resolution. Her story about pushing back on a VP's technical direction was compelling — she escalated through data, not politics.",
          concerns:
            "Some of her answers felt rehearsed. When I dug deeper on the mentoring question, her examples were all about technical mentoring. I didn't get a strong sense of how she handles interpersonal team dynamics or emotional situations.",
          rawNotes:
            "Behavioral interview. Good STAR format responses. Conflict example: VP wanted to rebuild a working system, she created a cost analysis showing it wasn't worth it. Mentoring: helped junior devs with code quality and system design. Gap: when asked about a time she helped a struggling team member with non-technical issues, she pivoted back to technical coaching. Could indicate she's less comfortable with the people side.",
          recommendation: "hire",
        },
      },
    },
  });

  // Feedback summary for candidate 1
  await prisma.feedbackSummary.create({
    data: {
      candidateId: candidate1.id,
      summary:
        "Strong consensus across all interviewers that Priya is technically exceptional and would be a high-impact hire. She demonstrated elite system design and coding skills with production-quality output. The only area of divergence is around interpersonal/soft skills — the behavioral interviewer noted she may be more comfortable with technical mentoring than navigating emotional or interpersonal team dynamics.",
      consensusPoints: JSON.stringify([
        "Technically outstanding — one of the strongest candidates this quarter",
        "Clean, production-quality code with attention to edge cases",
        "Strong communication of technical concepts and tradeoffs",
        "Would be immediately productive on platform work",
      ]),
      divergencePoints: JSON.stringify([
        "Interpersonal depth: Technical interviewers saw strong communication. Behavioral interviewer noted potential gap in handling non-technical people challenges. This divergence may reflect different interview contexts rather than a real gap — worth exploring in a follow-up.",
      ]),
      riskFactors: JSON.stringify([
        "One interviewer noted answers felt 'rehearsed' — this is common for experienced candidates and is not inherently a negative signal",
        "Concern about 'less comfortable with the people side' should be investigated with specific scenarios rather than treated as a disqualifier",
      ]),
      recommendation:
        "Strong advance to offer. Technical skills clearly exceed the bar. The soft skills question is worth a follow-up conversation but should not block an offer given the strength of the overall signal.",
      confidence: "high",
    },
  });

  // --- Candidate 2: Mixed signals, interview stage ---
  const candidate2 = await prisma.candidate.create({
    data: {
      id: "cand-2",
      firstName: "Marcus",
      lastName: "Johnson",
      email: "marcus.johnson@email.com",
      phone: "+1-555-0102",
      source: "linkedin",
      stage: "interview",
      resumeText: `MARCUS JOHNSON
Engineering Manager

EXPERIENCE:
Engineering Manager, FinServTech (2022-Present)
- Manage team of 8 engineers building payment processing platform
- Grew team from 3 to 8, established hiring process and interview rubrics
- Shipped new payment reconciliation system reducing errors by 40%
- Introduced sprint planning and retro processes that improved velocity by 25%

Senior Software Engineer, BigCorp (2018-2022)
- Led backend development for customer-facing API platform
- Migrated legacy Java services to Node.js microservices
- Promoted to tech lead after 2 years, managed 3 junior engineers

Software Engineer, WebAgency (2015-2018)
- Full-stack development for e-commerce clients
- Built custom CMS used by 50+ client sites

SKILLS: Node.js, TypeScript, Python, React, AWS, PostgreSQL, Docker, Terraform

EDUCATION: BS Computer Science, Howard University
MBA, part-time (in progress)`,
      jobReqId: emRole.id,
      appliedAt: new Date("2026-03-05"),
      tags: {
        create: [{ tag: "interview-stage" }],
      },
    },
  });

  await prisma.screeningResult.create({
    data: {
      candidateId: candidate2.id,
      overallScore: 4,
      relevanceScore: 4,
      skillsScore: 4,
      experienceScore: 4,
      summary:
        "Strong EM candidate with relevant management experience and technical depth. Currently managing a larger team than the role requires, with demonstrated hiring and process improvement skills.",
      strengths: JSON.stringify([
        "Direct team scaling experience: grew team from 3 to 8",
        "Established hiring processes — directly relevant to the role",
        "Quantifiable impact on team velocity and error reduction",
        "Pursuing MBA shows investment in management career path",
      ]),
      concerns: JSON.stringify([
        "Experience is primarily in fintech — unclear how growth/activation domain maps",
        "Node.js/TypeScript stack aligns but no Go experience",
      ]),
      reasoning:
        "Marcus presents a solid EM profile with the right mix of technical background and management experience. His team scaling experience is particularly relevant. The domain gap (fintech → growth) is a consideration but not a blocker — good management practices transfer across domains. The in-progress MBA is a positive signal about his commitment to the management track.",
      recommendation: "advance",
    },
  });

  // Two completed interviews, one pending for candidate 2
  await prisma.interview.create({
    data: {
      candidateId: candidate2.id,
      interviewerName: "Lisa Park",
      interviewerRole: "hiring_manager",
      interviewType: "behavioral",
      scheduledAt: new Date("2026-03-15T10:00:00Z"),
      completedAt: new Date("2026-03-15T11:00:00Z"),
      status: "completed",
      feedback: {
        create: {
          overallRating: 4,
          communicationRating: 5,
          strengths:
            "Exceptional communicator. His examples of managing team conflict were nuanced and showed real emotional intelligence. The way he handled a low-performer situation — clear expectations, documentation, but also genuine empathy — was textbook good management.",
          concerns:
            "I want to see how he handles technical decisions. His behavioral examples were heavily people-focused. Need the technical interview to validate he can still dive deep.",
          rawNotes:
            "Behavioral: focused on team scaling, conflict resolution, and performance management. Best answers were about the difficult conversations — he clearly has practice. Gave a great answer about 'disagree and commit' with product leadership. One concern: when I asked about a technical decision he made recently, he deferred to 'my tech lead handled the architecture.' Want to validate technical depth.",
          recommendation: "strong_hire",
        },
      },
    },
  });

  await prisma.interview.create({
    data: {
      candidateId: candidate2.id,
      interviewerName: "David Kim",
      interviewerRole: "peer",
      interviewType: "technical",
      scheduledAt: new Date("2026-03-16T14:00:00Z"),
      completedAt: new Date("2026-03-16T15:00:00Z"),
      status: "completed",
      feedback: {
        create: {
          overallRating: 2,
          technicalRating: 2,
          communicationRating: 3,
          strengths:
            "Good high-level architectural thinking. He correctly identified the bottleneck in the system design problem.",
          concerns:
            "Struggled significantly with the hands-on coding portion. His solution worked but was inefficient and had several bugs. For an EM role that requires 'ability to review code and make architectural decisions,' I'm concerned about the depth of his current technical skills. He also seemed uncomfortable when I asked him to optimize his solution.",
          rawNotes:
            "System design + coding. Design phase was okay — he drew reasonable boxes but couldn't go deep on any of them. Coding: task was a simple graph traversal. Took 40 minutes and the solution was O(n^2) when O(n) was straightforward. When I pointed out the inefficiency, he struggled to optimize. I wonder if he's been away from code too long. For an IC-heavy EM role, this is a concern.",
          recommendation: "no_hire",
        },
      },
    },
  });

  // Pending interview
  await prisma.interview.create({
    data: {
      candidateId: candidate2.id,
      interviewerName: "Rachel Torres",
      interviewerRole: "bar_raiser",
      interviewType: "culture",
      scheduledAt: new Date("2026-03-25T10:00:00Z"),
      status: "scheduled",
    },
  });

  // --- Candidate 3: Just applied, needs screening ---
  await prisma.candidate.create({
    data: {
      id: "cand-3",
      firstName: "Aisha",
      lastName: "Okafor",
      email: "aisha.okafor@email.com",
      source: "direct",
      stage: "applied",
      resumeText: `AISHA OKAFOR
Data Engineer

EXPERIENCE:
Senior Data Engineer, AnalyticsCo (2023-Present)
- Built and maintain ETL pipelines processing 500GB/day using Airflow and Spark
- Designed dimensional data model for product analytics warehouse
- Reduced pipeline failures by 70% through monitoring and alerting improvements
- Mentoring 2 junior data engineers

Data Engineer, DataStartup (2021-2023)
- Developed real-time streaming pipeline using Kafka and Flink
- Built feature store serving ML models in production
- Created data quality framework adopted across engineering

Junior Data Engineer, ConsultingFirm (2019-2021)
- SQL and Python development for client data projects
- Built dashboards and automated reporting

SKILLS: Python, SQL, Spark, Airflow, Kafka, Flink, dbt, AWS (S3, Redshift, EMR), Terraform, Docker

EDUCATION: BS Statistics, University of Michigan
AWS Data Analytics Specialty Certification`,
      jobReqId: dataEngineer.id,
      appliedAt: new Date("2026-03-22"),
    },
  });

  // --- Candidate 4: Rejected after screening ---
  await prisma.candidate.create({
    data: {
      id: "cand-4",
      firstName: "Tyler",
      lastName: "Brooks",
      email: "tyler.brooks@email.com",
      source: "direct",
      stage: "rejected",
      resumeText: `TYLER BROOKS
Junior Developer

EXPERIENCE:
Junior Web Developer, SmallAgency (2024-Present)
- Build WordPress sites for local businesses
- Basic HTML/CSS customization

Freelance, Self-employed (2023-2024)
- Created personal portfolio website
- Completed several Udemy courses on web development

SKILLS: HTML, CSS, JavaScript basics, WordPress, Photoshop

EDUCATION: BA Communications, State University
Self-taught programmer (6 months)`,
      jobReqId: seniorEngineer.id,
      appliedAt: new Date("2026-03-10"),
      tags: {
        create: [{ tag: "experience-gap" }],
      },
    },
  });

  await prisma.screeningResult.create({
    data: {
      candidateId: "cand-4",
      overallScore: 1,
      relevanceScore: 1,
      skillsScore: 1,
      experienceScore: 1,
      summary:
        "Candidate is very early in their engineering career with approximately 6 months of self-taught experience and junior-level web development. This does not align with the Senior Software Engineer requirements.",
      strengths: JSON.stringify([
        "Self-motivated learner — pursuing engineering career change",
        "Has shipped real work (WordPress sites for clients)",
      ]),
      concerns: JSON.stringify([
        "6 months of coding experience vs. 5+ years required",
        "No experience with distributed systems, Go, Python (beyond basics), or cloud infrastructure",
        "Current skill set (HTML/CSS/WordPress) does not overlap with role requirements",
      ]),
      reasoning:
        "While Tyler shows initiative in their career transition, there is a fundamental experience gap. The role requires 5+ years of engineering experience with distributed systems expertise. Tyler has approximately 6 months of self-taught development focused on WordPress. This is not a skills gap that can be bridged by a strong interview — it's a career stage mismatch. I'd recommend Tyler consider applying for entry-level or internship positions.",
      recommendation: "reject",
    },
  });

  // --- Candidate 5: Screening stage, decent match ---
  await prisma.candidate.create({
    data: {
      id: "cand-5",
      firstName: "Elena",
      lastName: "Volkov",
      email: "elena.volkov@email.com",
      linkedIn: "linkedin.com/in/elenavolkov",
      source: "referral",
      stage: "screening",
      resumeText: `ELENA VOLKOV
Software Engineer

EXPERIENCE:
Software Engineer III, MidSizeTech (2021-Present)
- Backend development for API gateway serving 10M requests/day
- Implemented rate limiting and circuit breaker patterns
- Led migration from self-hosted to AWS EKS
- On-call rotation lead, reduced MTTR from 45min to 15min

Software Engineer, AnotherStartup (2019-2021)
- Built REST and GraphQL APIs in Go and Python
- Developed internal monitoring dashboards
- Contributed to open-source Go libraries (500+ GitHub stars)

Intern → Junior Engineer, TechCorp (2017-2019)
- Full-stack development in Python/Django and React

SKILLS: Go, Python, TypeScript, Kubernetes, AWS, Terraform, PostgreSQL, Redis, GraphQL, gRPC

EDUCATION: BS Computer Science, Georgia Tech
Open source contributor: go-resilience (personal project, 500+ stars)`,
      jobReqId: seniorEngineer.id,
      appliedAt: new Date("2026-03-18"),
      tags: {
        create: [{ tag: "referral" }, { tag: "open-source" }],
      },
    },
  });

  await prisma.screeningResult.create({
    data: {
      candidateId: "cand-5",
      overallScore: 4,
      relevanceScore: 4,
      skillsScore: 4,
      experienceScore: 3,
      summary:
        "Solid candidate with relevant distributed systems experience and strong open-source presence. Slightly below the experience bar (7 years including internship, but 5 years of professional-level work) but technical depth and OSS contributions suggest she may operate above her title.",
      strengths: JSON.stringify([
        "Direct Go and Kubernetes experience — core tech stack match",
        "Open-source contributions demonstrate initiative and code quality",
        "Operational experience (on-call, MTTR reduction) shows production mindset",
        "API gateway work at 10M req/day is relevant scale",
      ]),
      concerns: JSON.stringify([
        "Current title is 'Engineer III' — may be a step up to Senior",
        "No explicit distributed systems architecture experience (has implemented patterns but hasn't designed systems from scratch)",
        "No mentorship/leadership examples in resume",
      ]),
      reasoning:
        "Elena is a strong technical candidate who may be on the boundary between L4 and L5. Her open-source work and operational excellence suggest she's ready for senior-level work, but the resume doesn't show architectural ownership or team leadership. I'd recommend advancing to interview with a focus on assessing her ability to own system-level design decisions.",
      recommendation: "advance",
    },
  });

  // --- Candidate 6: Repeat candidate ---
  await prisma.candidate.create({
    data: {
      id: "cand-6-prev",
      firstName: "James",
      lastName: "Chen",
      email: "james.chen@email.com",
      source: "direct",
      stage: "rejected",
      resumeText: `JAMES CHEN
Software Engineer (2025 application)
Previous resume — see updated application`,
      jobReqId: seniorEngineer.id,
      appliedAt: new Date("2025-09-15"),
      notes: "Previous application. Rejected at interview stage — strong technically but needed more distributed systems experience.",
      tags: {
        create: [{ tag: "previous-application" }],
      },
    },
  });

  await prisma.candidate.create({
    data: {
      id: "cand-6",
      firstName: "James",
      lastName: "Chen",
      email: "james.chen.new@email.com", // Different email, same person
      source: "direct",
      stage: "screening",
      previousApplicationId: "cand-6-prev",
      resumeText: `JAMES CHEN
Senior Software Engineer

EXPERIENCE:
Software Engineer → Senior Engineer, GrowthCo (2020-Present)
- Promoted to Senior in 2025 after leading distributed cache redesign
- Architected event-driven system processing 100K events/second
- Led cross-team initiative to standardize API contracts using gRPC
- Mentored 3 engineers, one promoted to mid-level

Software Engineer, WebPlatform (2018-2020)
- Backend development in Go and Python
- Built monitoring and alerting infrastructure
- Contributed to internal service mesh adoption

SKILLS: Go, Python, gRPC, Kafka, Redis, PostgreSQL, AWS, Kubernetes, Terraform

EDUCATION: MS Computer Science, Stanford University

NOTABLE: Since last application (Sept 2025), promoted to Senior and led two major distributed systems projects.`,
      jobReqId: seniorEngineer.id,
      appliedAt: new Date("2026-03-20"),
      notes:
        "Repeat candidate — previously rejected Sept 2025. Has been promoted since and gained significant distributed systems experience. Worth re-evaluating.",
      tags: {
        create: [
          { tag: "repeat-candidate" },
          { tag: "significant-growth" },
        ],
      },
    },
  });

  // --- Candidates 7-10: Various stages for pipeline fullness ---

  await prisma.candidate.create({
    data: {
      id: "cand-7",
      firstName: "Sofia",
      lastName: "Martinez",
      email: "sofia.martinez@email.com",
      source: "linkedin",
      stage: "applied",
      resumeText: `SOFIA MARTINEZ
Platform Engineer
5 years experience in distributed systems, Kubernetes, and Go.
Currently at ScaleUp Inc. building cloud infrastructure.
BS Computer Science, MIT.`,
      jobReqId: seniorEngineer.id,
      appliedAt: new Date("2026-03-23"),
    },
  });

  await prisma.candidate.create({
    data: {
      id: "cand-8",
      firstName: "Daniel",
      lastName: "Obi",
      email: "daniel.obi@email.com",
      source: "referral",
      stage: "applied",
      resumeText: `DANIEL OBI
Senior Data Engineer at DataFlow Systems
6 years experience. Expert in Spark, Airflow, and real-time streaming.
Built ML feature pipeline serving 10M predictions/day.
MS Data Science, Carnegie Mellon.`,
      jobReqId: dataEngineer.id,
      appliedAt: new Date("2026-03-23"),
    },
  });

  await prisma.candidate.create({
    data: {
      id: "cand-9",
      firstName: "Kim",
      lastName: "Nguyen",
      email: "kim.nguyen@email.com",
      source: "direct",
      stage: "interview",
      resumeText: `KIM NGUYEN
Engineering Manager at HealthTech Corp
4 years management, 6 years IC. Team of 10.
Shipped patient portal used by 2M users.
Strong cross-functional skills.`,
      jobReqId: emRole.id,
      appliedAt: new Date("2026-03-12"),
    },
  });

  await prisma.screeningResult.create({
    data: {
      candidateId: "cand-9",
      overallScore: 4,
      relevanceScore: 3,
      skillsScore: 4,
      experienceScore: 4,
      summary:
        "Experienced EM with strong team management track record. HealthTech domain is different from growth but management skills are transferable.",
      strengths: JSON.stringify([
        "4 years management experience with large team (10)",
        "Shipped user-facing product at scale (2M users)",
        "Cross-functional collaboration experience",
      ]),
      concerns: JSON.stringify([
        "Healthcare domain may not directly translate to growth metrics",
        "Resume is brief — would want to dig deeper in interview",
      ]),
      reasoning:
        "Kim has the management experience and scale we need. The domain gap is real but not a blocker.",
      recommendation: "advance",
    },
  });

  await prisma.interview.create({
    data: {
      candidateId: "cand-9",
      interviewerName: "Lisa Park",
      interviewerRole: "hiring_manager",
      interviewType: "behavioral",
      scheduledAt: new Date("2026-03-24T14:00:00Z"),
      status: "scheduled",
    },
  });

  await prisma.candidate.create({
    data: {
      id: "cand-10",
      firstName: "Alex",
      lastName: "Rivera",
      email: "alex.rivera@email.com",
      source: "linkedin",
      stage: "screening",
      resumeText: `ALEX RIVERA
Full-Stack Engineer at E-Commerce Inc.
3 years experience. React, Node.js, PostgreSQL.
Built checkout flow processing $50M/year.
BS Computer Science, UC Berkeley.`,
      jobReqId: seniorEngineer.id,
      appliedAt: new Date("2026-03-19"),
    },
  });

  console.log("Seed data created successfully!");
  console.log("  - 3 job requisitions");
  console.log("  - 11 candidates (including 1 repeat)");
  console.log("  - 5 screening results");
  console.log("  - 6 interviews (4 completed with feedback, 2 scheduled)");
  console.log("  - 1 feedback summary");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
