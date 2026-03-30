import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

export interface FeedbackInput {
  candidateName: string;
  jobTitle: string;
  interviewFeedback: {
    interviewerRole: string;
    interviewType: string;
    overallRating: number;
    technicalRating?: number;
    communicationRating?: number;
    strengths: string;
    concerns: string;
    rawNotes: string;
    recommendation: string;
  }[];
}

export interface FeedbackSynthesisOutput {
  summary: string;
  consensusPoints: string[];
  divergencePoints: string[];
  riskFactors: string[];
  recommendation: string;
  confidence: "high" | "medium" | "low";
}

/**
 * Interview Feedback Synthesis
 *
 * EM Note: This is where the real magic happens — and also where the real danger lives.
 *
 * The problem I've seen repeatedly: 4 interviewers submit feedback. The hiring manager
 * reads them in order, anchors on the first one, and the debrief becomes a confirmation
 * bias exercise. Or worse, one loud voice dominates the room and everyone else defers.
 *
 * Claude's job here is NOT to make the decision. It's to:
 * 1. Surface consensus (what did everyone agree on?)
 * 2. Surface divergence (where did interviewers disagree, and why might that be?)
 * 3. Flag potential bias patterns (e.g., "communication concerns" that may correlate
 *    with accent/cultural differences rather than actual communication ability)
 *
 * The divergence detection is the most valuable piece. When one interviewer says
 * "strong no hire" and another says "strong hire," that's a signal that needs
 * human investigation, not algorithmic averaging.
 */
export async function synthesizeFeedback(
  input: FeedbackInput
): Promise<FeedbackSynthesisOutput> {
  const systemPrompt = `You are an expert at analyzing interview feedback to help hiring managers make informed decisions.

YOUR ROLE:
- Synthesize multiple interviewer perspectives into a clear picture
- Surface areas of AGREEMENT (consensus) and DISAGREEMENT (divergence)
- Flag potential bias patterns without making accusations
- Provide a recommendation WITH a confidence level

BIAS AWARENESS:
- Watch for "culture fit" concerns that may mask demographic bias
- Flag when "communication" concerns appear for only some candidates
- Note if concerns are about SKILLS vs. STYLE (skills matter, style often doesn't)
- If interviewers wildly disagree, flag this as needing human investigation

IMPORTANT: You are providing analysis to INFORM a human decision, not making the decision.
Your recommendation should include clear reasoning about your confidence level.`;

  const feedbackBlock = input.interviewFeedback
    .map(
      (f, i) => `
INTERVIEWER ${i + 1} (${f.interviewerRole}, ${f.interviewType} interview):
  Overall Rating: ${f.overallRating}/4
  ${f.technicalRating ? `Technical Rating: ${f.technicalRating}/5` : ""}
  ${f.communicationRating ? `Communication Rating: ${f.communicationRating}/5` : ""}
  Recommendation: ${f.recommendation}
  Strengths: ${f.strengths}
  Concerns: ${f.concerns}
  Notes: ${f.rawNotes}
`
    )
    .join("\n---\n");

  const userPrompt = `Synthesize the following interview feedback for ${input.candidateName}, candidate for ${input.jobTitle}.

${feedbackBlock}

Respond with a JSON object matching this exact schema:
{
  "summary": "<3-5 sentence synthesis of the overall interview picture>",
  "consensusPoints": ["<point all/most interviewers agreed on>", ...],
  "divergencePoints": ["<point where interviewers significantly disagreed, with context on why>", ...],
  "riskFactors": ["<potential bias indicator or process concern>", ...],
  "recommendation": "<1-2 sentence recommendation with reasoning>",
  "confidence": "<high|medium|low>"
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
    return JSON.parse(text) as FeedbackSynthesisOutput;
  } catch {
    return {
      summary:
        "Feedback synthesis produced unstructured output. Manual review recommended.",
      consensusPoints: [],
      divergencePoints: [],
      riskFactors: ["Automated synthesis failed — review feedback manually"],
      recommendation: "Manual review required",
      confidence: "low",
    };
  }
}
