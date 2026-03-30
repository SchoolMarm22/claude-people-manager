import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { synthesizeFeedback } from "@/lib/claude/feedback-synthesis";

export async function POST(request: NextRequest) {
  try {
    const { candidateId } = await request.json();

    if (!candidateId) {
      return NextResponse.json(
        { error: "candidateId is required" },
        { status: 400 }
      );
    }

    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
      include: {
        jobReq: true,
        interviews: {
          where: { status: "completed" },
          include: { feedback: true },
        },
      },
    });

    if (!candidate) {
      return NextResponse.json(
        { error: "Candidate not found" },
        { status: 404 }
      );
    }

    const completedWithFeedback = candidate.interviews.filter(
      (i) => i.feedback
    );

    if (completedWithFeedback.length < 2) {
      return NextResponse.json(
        { error: "Need at least 2 completed interviews with feedback" },
        { status: 400 }
      );
    }

    // Check for existing summary
    const existing = await prisma.feedbackSummary.findUnique({
      where: { candidateId },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Feedback summary already exists" },
        { status: 409 }
      );
    }

    // Run Claude synthesis
    const result = await synthesizeFeedback({
      candidateName: `${candidate.firstName} ${candidate.lastName}`,
      jobTitle: candidate.jobReq.title,
      interviewFeedback: completedWithFeedback.map((i) => ({
        interviewerRole: i.interviewerRole,
        interviewType: i.interviewType,
        overallRating: i.feedback!.overallRating,
        technicalRating: i.feedback!.technicalRating ?? undefined,
        communicationRating: i.feedback!.communicationRating ?? undefined,
        strengths: i.feedback!.strengths,
        concerns: i.feedback!.concerns,
        rawNotes: i.feedback!.rawNotes,
        recommendation: i.feedback!.recommendation,
      })),
    });

    // Store result
    const summary = await prisma.feedbackSummary.create({
      data: {
        candidateId,
        summary: result.summary,
        consensusPoints: JSON.stringify(result.consensusPoints),
        divergencePoints: JSON.stringify(result.divergencePoints),
        riskFactors: JSON.stringify(result.riskFactors),
        recommendation: result.recommendation,
        confidence: result.confidence,
      },
    });

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Synthesis error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
