import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const { resume, spec } = await request.json();

    if (!resume || !spec) {
      return NextResponse.json(
        { error: "resume and spec are required" },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an AI-powered resume screening assistant for a People Products platform. You evaluate candidates against a manager-defined spec file.

Your evaluation must be:
- Honest: Don't inflate scores. A "Maybe" is a valid and useful signal.
- Specific: Reference exact items from the resume, not vague impressions.
- Bias-aware: Flag if any part of your assessment might be influenced by factors not relevant to the role requirements in the spec.
- Structured: Follow the output format exactly.`;

    const userPrompt = `Evaluate this resume against the following hiring spec.

SPEC FILE:
${spec}

RESUME:
${resume}

Respond in JSON format:
{
  "fit_score": <1-10>,
  "fit_justification": "<1-2 sentences>",
  "strengths": ["<specific strength referencing resume>", ...],
  "concerns": ["<specific concern>", ...],
  "spec_alignment": [
    {"criterion": "<from spec>", "assessment": "<how candidate matches>", "signal": "strong|moderate|weak|none"}
  ],
  "bias_check": "<brief note on potential bias factors>",
  "recommendation": "Strong Yes|Yes|Maybe|No",
  "recommendation_rationale": "<1 sentence>"
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
      const result = JSON.parse(text);
      return NextResponse.json(result);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse Claude response", raw: text },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Screening error:", error);
    return NextResponse.json(
      { error: "Screening failed. Claude may be unavailable." },
      { status: 500 }
    );
  }
}
