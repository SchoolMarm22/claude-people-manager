import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { screenResume } from "@/lib/claude/screening";

export async function POST(request: NextRequest) {
  try {
    const { candidateId } = await request.json();

    if (!candidateId) {
      return NextResponse.json(
        { error: "candidateId is required" },
        { status: 400 }
      );
    }

    // Fetch candidate and job req
    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
      include: { jobReq: true },
    });

    if (!candidate) {
      return NextResponse.json(
        { error: "Candidate not found" },
        { status: 404 }
      );
    }

    // Check if already screened
    const existing = await prisma.screeningResult.findUnique({
      where: { candidateId },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Candidate already screened" },
        { status: 409 }
      );
    }

    // Run Claude screening
    const result = await screenResume({
      resumeText: candidate.resumeText,
      jobTitle: candidate.jobReq.title,
      jobDescription: candidate.jobReq.description,
      jobRequirements: JSON.parse(candidate.jobReq.requirements),
      jobNiceToHaves: candidate.jobReq.niceToHaves
        ? JSON.parse(candidate.jobReq.niceToHaves)
        : undefined,
    });

    // Store result
    const screeningResult = await prisma.screeningResult.create({
      data: {
        candidateId,
        overallScore: result.overallScore,
        relevanceScore: result.relevanceScore,
        skillsScore: result.skillsScore,
        experienceScore: result.experienceScore,
        summary: result.summary,
        strengths: JSON.stringify(result.strengths),
        concerns: JSON.stringify(result.concerns),
        reasoning: result.reasoning,
        recommendation: result.recommendation,
      },
    });

    // Update candidate stage
    await prisma.candidate.update({
      where: { id: candidateId },
      data: { stage: "screening", stageUpdatedAt: new Date() },
    });

    return NextResponse.json({ screeningResult });
  } catch (error) {
    console.error("Screening error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
