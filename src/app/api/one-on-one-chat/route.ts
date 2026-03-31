import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const { engineerName, engineerRole, notes, messages } =
      await request.json();

    if (!engineerName || !notes || !messages) {
      return NextResponse.json(
        { error: "engineerName, notes, and messages are required" },
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
      max_tokens: 500,
      system: `You are an AI assistant helping an engineering manager recall and analyze their 1:1 notes for ${engineerName} (${engineerRole}).

Here are all the manager's 1:1 notes for this person:

${notesText}

Answer questions about these notes accurately. If the answer isn't in the notes, say so. Be concise and helpful. You're speaking to the manager privately — be candid and practical.`,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("1:1 chat error:", error);
    return NextResponse.json(
      { error: "Chat failed." },
      { status: 500 }
    );
  }
}
