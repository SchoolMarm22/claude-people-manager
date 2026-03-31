export interface TimelineEvent {
  stage: string;
  date: string;
  title: string;
  description: string;
  moduleLink: string;
  status: "complete" | "current" | "upcoming";
}

export interface PipelineCandidate {
  id: string;
  name: string;
  role: string;
  stage: "applied" | "screening" | "interview-prep" | "interviewing" | "debrief" | "offer" | "onboarding" | "rejected";
  stageLabel: string;
  appliedDate: string;
  lastActivity: string;
  score?: number;
  source: string;
}

export const ALEX_TIMELINE: TimelineEvent[] = [
  {
    stage: "Applied",
    date: "2026-03-15",
    title: "Application received via Greenhouse",
    description: "Applied for Full-Stack Software Engineer — Product Engineering team.",
    moduleLink: "/screening",
    status: "complete",
  },
  {
    stage: "Screening",
    date: "2026-03-16",
    title: "AI Screening: 7/10 — Recommended Yes",
    description: "Strong alignment on startup experience and shipped products. Gaps in AWS depth and analytics tooling. Screened against Cindi Alvarez's spec.",
    moduleLink: "/screening",
    status: "complete",
  },
  {
    stage: "Interview Prep",
    date: "2026-03-17",
    title: "Interview package generated — 5 custom questions",
    description: "Questions focused on system design ownership, startup-vs-enterprise transition, and technical depth verification. Distributed to 4 interviewers.",
    moduleLink: "/interview-prep",
    status: "complete",
  },
  {
    stage: "Interviews",
    date: "2026-03-18",
    title: "4 interviews completed over 3 days",
    description: "Sarah Chen (Strong Yes), Marcus Johnson (Lean Yes), Priya Patel (Strong Yes), David Kim (Lean Yes). System design capability flagged as point of disagreement.",
    moduleLink: "/debrief",
    status: "complete",
  },
  {
    stage: "Debrief",
    date: "2026-03-22",
    title: "Committee decision: Lean Hire (moderate confidence)",
    description: "3 of 4 interviewers recommend hiring. Key discussion: system design at scale — Sarah rated 5/5, David rated 3/5. Committee resolved to extend offer with structured mentorship plan.",
    moduleLink: "/debrief",
    status: "complete",
  },
  {
    stage: "Offer",
    date: "2026-03-25",
    title: "Offer extended — accepted March 27",
    description: "$185K base + equity. Alex accepted within 48 hours. Start date set for April 7.",
    moduleLink: "/onboarding",
    status: "complete",
  },
  {
    stage: "Onboarding",
    date: "2026-04-07",
    title: "Onboarding in progress — 40% complete",
    description: "Company onboarding: 4/10 tasks done. Team onboarding: 2/10 tasks done. Laptop configured, accounts provisioned. Codebase walkthrough scheduled with Sarah Chen.",
    moduleLink: "/onboarding",
    status: "current",
  },
];

export const PIPELINE_CANDIDATES: PipelineCandidate[] = [
  // Full pipeline - Alex
  {
    id: "alex-rivera",
    name: "Alex Rivera",
    role: "Full-Stack SWE",
    stage: "onboarding",
    stageLabel: "Onboarding",
    appliedDate: "2026-03-15",
    lastActivity: "2026-04-07",
    score: 7,
    source: "Greenhouse",
  },
  // Screening stage
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    role: "Full-Stack SWE",
    stage: "screening",
    stageLabel: "Screening",
    appliedDate: "2026-03-27",
    lastActivity: "2026-03-27",
    source: "LinkedIn",
  },
  {
    id: "daniel-okonkwo",
    name: "Daniel Okonkwo",
    role: "Sr. Front-End (Angular)",
    stage: "screening",
    stageLabel: "Screening",
    appliedDate: "2026-03-26",
    lastActivity: "2026-03-26",
    source: "Greenhouse",
  },
  {
    id: "maria-santos",
    name: "Maria Santos",
    role: "Full-Stack SWE",
    stage: "screening",
    stageLabel: "Screening",
    appliedDate: "2026-03-28",
    lastActivity: "2026-03-28",
    source: "Direct",
  },
  {
    id: "james-liu",
    name: "James Liu",
    role: "Full-Stack SWE",
    stage: "screening",
    stageLabel: "Screening",
    appliedDate: "2026-03-29",
    lastActivity: "2026-03-29",
    source: "Referral",
  },
  // Interview stage
  {
    id: "fatima-hassan",
    name: "Fatima Hassan",
    role: "Growth Marketing Mgr",
    stage: "interviewing",
    stageLabel: "Interviewing",
    appliedDate: "2026-03-10",
    lastActivity: "2026-03-25",
    score: 8,
    source: "Greenhouse",
  },
  {
    id: "ben-crawford",
    name: "Ben Crawford",
    role: "Sr. Front-End (Angular)",
    stage: "interview-prep",
    stageLabel: "Interview Prep",
    appliedDate: "2026-03-18",
    lastActivity: "2026-03-24",
    score: 6,
    source: "LinkedIn",
  },
  // Debrief
  {
    id: "sofia-petrov",
    name: "Sofia Petrov",
    role: "Content Marketing Lead",
    stage: "debrief",
    stageLabel: "Debrief",
    appliedDate: "2026-03-05",
    lastActivity: "2026-03-28",
    score: 9,
    source: "Referral",
  },
  // Rejected
  {
    id: "ryan-mcallister",
    name: "Ryan McAllister",
    role: "Full-Stack SWE",
    stage: "rejected",
    stageLabel: "Not Moving Forward",
    appliedDate: "2026-03-20",
    lastActivity: "2026-03-22",
    score: 3,
    source: "Indeed",
  },
  {
    id: "lisa-wong",
    name: "Lisa Wong",
    role: "Growth Marketing Mgr",
    stage: "rejected",
    stageLabel: "Not Moving Forward",
    appliedDate: "2026-03-12",
    lastActivity: "2026-03-15",
    score: 4,
    source: "LinkedIn",
  },
];

export const PIPELINE_METRICS = {
  activePostings: 4,
  postingNames: ["Full-Stack SWE", "Sr. Angular FE", "Growth Marketing Mgr", "Content Marketing Lead"],
  totalApplicants: 47,
  inPipeline: 8,
  inScreening: 4,
  inInterview: 3,
  inDebrief: 1,
  offersExtended: 1,
  onboarding: 1,
  rejected: 2,
  avgTimeToHire: "18 days",
  avgScreeningScore: 6.2,
};
