/**
 * MCP Integration Type Definitions
 *
 * These type definitions document the interface contracts for MCP server
 * integrations that would connect this platform to production HR tools.
 * See ADR-003 for the full architecture.
 *
 * In production, each of these would be implemented as an MCP server that
 * Claude can invoke as tools during its reasoning. For this prototype,
 * they serve as documentation of the integration surface area.
 */

// ============================================================================
// Greenhouse ATS Integration
// ============================================================================

export interface GreenhouseMCPTools {
  /** Pull candidates from a specific job */
  getCandidates: (params: { jobId: string; status?: string }) => Promise<{
    candidates: GreenhouseCandidate[];
    total: number;
  }>;

  /** Get a specific candidate's full profile */
  getCandidate: (params: { candidateId: string }) => Promise<GreenhouseCandidate>;

  /** Update candidate stage in Greenhouse */
  updateCandidateStage: (params: {
    candidateId: string;
    stage: string;
    notes?: string;
  }) => Promise<{ success: boolean }>;

  /** Add a note to a candidate (e.g., screening results) */
  addNote: (params: {
    candidateId: string;
    note: string;
    visibility: "private" | "public";
  }) => Promise<{ noteId: string }>;
}

export interface GreenhouseCandidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  currentStage: string;
  source: string;
  appliedAt: string;
  jobId: string;
  jobTitle: string;
}

// ============================================================================
// Workday HRIS Integration
// ============================================================================

export interface WorkdayMCPTools {
  /** Get employee profile */
  getEmployee: (params: { employeeId: string }) => Promise<WorkdayEmployee>;

  /** Get team members for a manager */
  getTeamMembers: (params: {
    managerId: string;
  }) => Promise<WorkdayEmployee[]>;

  /** Get org structure */
  getOrgChart: (params: {
    departmentId: string;
  }) => Promise<WorkdayOrgNode>;
}

export interface WorkdayEmployee {
  id: string;
  name: string;
  title: string;
  department: string;
  managerId: string;
  startDate: string;
  level: string;
}

export interface WorkdayOrgNode {
  employee: WorkdayEmployee;
  directReports: WorkdayOrgNode[];
}

// ============================================================================
// Slack Integration
// ============================================================================

export interface SlackMCPTools {
  /** Send a notification to a channel */
  sendMessage: (params: {
    channel: string;
    text: string;
    blocks?: unknown[];
  }) => Promise<{ messageId: string }>;

  /** Send a DM to a user */
  sendDM: (params: {
    userId: string;
    text: string;
  }) => Promise<{ messageId: string }>;

  /** Post interview feedback form */
  postFeedbackForm: (params: {
    interviewerId: string;
    candidateName: string;
    interviewType: string;
    formUrl: string;
  }) => Promise<{ messageId: string }>;
}

// ============================================================================
// Calendar Integration
// ============================================================================

export interface CalendarMCPTools {
  /** Check availability for a list of people */
  checkAvailability: (params: {
    userIds: string[];
    dateRange: { start: string; end: string };
    durationMinutes: number;
  }) => Promise<CalendarSlot[]>;

  /** Suggest optimal interview times */
  suggestInterviewSlots: (params: {
    interviewerIds: string[];
    candidateTimezone: string;
    durationMinutes: number;
    preferences?: {
      avoidBackToBack?: boolean;
      preferMornings?: boolean;
    };
  }) => Promise<CalendarSlot[]>;
}

export interface CalendarSlot {
  start: string;
  end: string;
  availableInterviewers: string[];
  score: number; // How optimal is this slot (0-1)
  reasoning: string; // Why this slot was ranked this way
}
