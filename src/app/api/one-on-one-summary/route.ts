import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const { engineerName, engineerRole, notes } = await request.json();

    if (!engineerName || !notes) {
      return NextResponse.json(
        { error: "engineerName and notes are required" },
        { status: 400 }
      );
    }

    const notesText = notes
      .map(
        (n: { date: string; summary: string; details: string; mood: string; tags: string[] }) =>
          `[${n.date}] (${n.mood}) ${n.summary}\n${n.details}\nTags: ${n.tags.join(", ")}`
      )
      .join("\n\n---\n\n");

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: `You are an AI assistant helping an engineering manager review their 1:1 notes for a direct report. Provide a concise, actionable summary that highlights:
1. Key themes across recent conversations
2. Any retention risks or concerns
3. Growth trajectory and career aspirations
4. Recommended action items for the manager

Be direct and specific. Reference actual details from the notes. Write in a tone appropriate for a manager reviewing their own private notes — candid and practical.`,
      messages: [
        {
          role: "user",
          content: `Summarize my 1:1 notes for ${engineerName} (${engineerRole}):\n\n${notesText}`,
        },
      ],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    return NextResponse.json({ summary: text });
  } catch (error) {
    console.error("1:1 summary error:", error);
    return NextResponse.json(
      { error: "Summary generation failed." },
      { status: 500 }
    );
  }
}
