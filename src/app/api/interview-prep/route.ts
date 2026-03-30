import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const { resume, spec, role_title } = await request.json();

    if (!resume || !spec) {
      return NextResponse.json(
        { error: "resume and spec are required" },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an AI interview preparation assistant. Given a candidate's resume and a role spec, generate a tailored interview preparation package for the INTERVIEWER (not the candidate).

Your goal is to help the interviewer:
1. Understand who this candidate is before they walk in
2. Ask questions that reveal real signal, not rehearsed answers
3. Distinguish genuine ownership from proximity to impressive work
4. Explore growth areas constructively, not gotcha-style`;

    const userPrompt = `ROLE: ${role_title || "Software Engineer"}

SPEC FILE:
${spec}

CANDIDATE RESUME:
${resume}

Respond in JSON format:
{
  "candidate_snapshot": "<3-4 sentence summary>",
  "questions": [
    {
      "category": "Technical Depth|Experience Verification|Culture & Collaboration|Growth Areas",
      "question": "<the interview question>",
      "why_this_question": "<what signal it's looking for>",
      "what_good_looks_like": "<brief strong answer description>",
      "red_flag": "<what would be concerning>"
    }
  ],
  "interviewer_context": "<background the interviewer should know>"
}

Generate 8-10 questions total, distributed across categories.
Return ONLY valid JSON, no markdown formatting.`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 3000,
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
    console.error("Interview prep error:", error);
    return NextResponse.json(
      { error: "Interview prep failed. Claude may be unavailable." },
      { status: 500 }
    );
  }
}
