import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

export interface ScreeningInput {
  resumeText: string;
  jobTitle: string;
  jobDescription: string;
  jobRequirements: string[];
  jobNiceToHaves?: string[];
}

export interface ScreeningOutput {
  overallScore: number;
  relevanceScore: number;
  skillsScore: number;
  experienceScore: number;
  summary: string;
  strengths: string[];
  concerns: string[];
  reasoning: string;
  recommendation: "advance" | "hold" | "reject";
}

/**
 * AI-Native Resume Screening
 *
 * Design philosophy: Claude isn't a black box here. We use structured output
 * to force explicit reasoning at every step. The `reasoning` field captures
 * Claude's full thought process, which serves two purposes:
 *
 * 1. Transparency for the hiring manager reviewing the screening
 * 2. Audit trail for bias evals (see ADR-002)
 *
 * In production, we'd version-control the prompt and correlate prompt versions
 * with bias eval outcomes over time. For this prototype, the prompt is inline
 * but the versioning infrastructure is in the data model (ScreeningResult.promptVersion).
 */
export async function screenResume(
  input: ScreeningInput
): Promise<ScreeningOutput> {
  const systemPrompt = `You are an expert technical recruiter assistant. Your job is to evaluate resumes against job requirements with structured, evidence-based reasoning.

CRITICAL GUIDELINES:
- Base your evaluation ONLY on skills, experience, and qualifications evident in the resume
- Do NOT make assumptions about candidates based on names, schools, or other demographic signals
- Focus on what the candidate CAN do, not where they come from
- If a requirement is not clearly met or refuted by the resume, note it as "unclear" rather than penalizing
- Provide specific evidence from the resume for every score you give

SCORING RUBRIC:
1 = Significantly below requirements
2 = Below requirements, notable gaps
3 = Meets basic requirements
4 = Exceeds requirements in key areas
5 = Exceptional match, exceeds in most areas`;

  const userPrompt = `Evaluate this resume against the following job posting.

JOB TITLE: ${input.jobTitle}

JOB DESCRIPTION:
${input.jobDescription}

REQUIREMENTS:
${input.jobRequirements.map((r, i) => `${i + 1}. ${r}`).join("\n")}

${input.jobNiceToHaves?.length ? `NICE TO HAVES:\n${input.jobNiceToHaves.map((r, i) => `${i + 1}. ${r}`).join("\n")}` : ""}

RESUME:
${input.resumeText}

Respond with a JSON object matching this exact schema:
{
  "overallScore": <1-5>,
  "relevanceScore": <1-5>,
  "skillsScore": <1-5>,
  "experienceScore": <1-5>,
  "summary": "<2-3 sentence overview of the candidate's fit>",
  "strengths": ["<strength 1>", "<strength 2>", ...],
  "concerns": ["<concern 1>", "<concern 2>", ...],
  "reasoning": "<Your complete reasoning chain: what you looked for, what you found, how you scored each dimension, and why>",
  "recommendation": "<advance|hold|reject>"
}

Return ONLY valid JSON, no markdown formatting.`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";

  try {
    const result = JSON.parse(text) as ScreeningOutput;
    return result;
  } catch {
    // If Claude returns non-JSON, wrap it in a default structure
    // In production, this would trigger an alert and retry
    return {
      overallScore: 3,
      relevanceScore: 3,
      skillsScore: 3,
      experienceScore: 3,
      summary: "Screening produced unstructured output. Manual review recommended.",
      strengths: [],
      concerns: ["Automated screening did not produce structured results"],
      reasoning: text,
      recommendation: "hold",
    };
  }
}
