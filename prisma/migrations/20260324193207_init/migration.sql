-- CreateTable
CREATE TABLE "Candidate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "linkedIn" TEXT,
    "resumeText" TEXT NOT NULL,
    "resumeUrl" TEXT,
    "source" TEXT NOT NULL DEFAULT 'direct',
    "stage" TEXT NOT NULL DEFAULT 'applied',
    "stageUpdatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "previousApplicationId" TEXT,
    "appliedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "notes" TEXT,
    "jobReqId" TEXT NOT NULL,
    CONSTRAINT "Candidate_previousApplicationId_fkey" FOREIGN KEY ("previousApplicationId") REFERENCES "Candidate" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Candidate_jobReqId_fkey" FOREIGN KEY ("jobReqId") REFERENCES "JobRequisition" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "JobRequisition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "niceToHaves" TEXT,
    "status" TEXT NOT NULL DEFAULT 'open',
    "hiringManagerId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ScreeningResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "candidateId" TEXT NOT NULL,
    "overallScore" INTEGER NOT NULL,
    "relevanceScore" INTEGER NOT NULL,
    "skillsScore" INTEGER NOT NULL,
    "experienceScore" INTEGER NOT NULL,
    "summary" TEXT NOT NULL,
    "strengths" TEXT NOT NULL,
    "concerns" TEXT NOT NULL,
    "reasoning" TEXT NOT NULL,
    "recommendation" TEXT NOT NULL,
    "modelVersion" TEXT NOT NULL DEFAULT 'claude-sonnet-4-20250514',
    "promptVersion" TEXT NOT NULL DEFAULT 'v1',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ScreeningResult_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "candidateId" TEXT NOT NULL,
    "interviewerName" TEXT NOT NULL,
    "interviewerRole" TEXT NOT NULL,
    "interviewType" TEXT NOT NULL,
    "scheduledAt" DATETIME NOT NULL,
    "completedAt" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Interview_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InterviewFeedback" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "interviewId" TEXT NOT NULL,
    "overallRating" INTEGER NOT NULL,
    "technicalRating" INTEGER,
    "communicationRating" INTEGER,
    "strengths" TEXT NOT NULL,
    "concerns" TEXT NOT NULL,
    "rawNotes" TEXT NOT NULL,
    "recommendation" TEXT NOT NULL,
    "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "InterviewFeedback_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FeedbackSummary" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "candidateId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "consensusPoints" TEXT NOT NULL,
    "divergencePoints" TEXT NOT NULL,
    "riskFactors" TEXT NOT NULL,
    "recommendation" TEXT NOT NULL,
    "confidence" TEXT NOT NULL,
    "modelVersion" TEXT NOT NULL DEFAULT 'claude-sonnet-4-20250514',
    "promptVersion" TEXT NOT NULL DEFAULT 'v1',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FeedbackSummary_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CandidateTag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "candidateId" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    CONSTRAINT "CandidateTag_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_email_key" ON "Candidate"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ScreeningResult_candidateId_key" ON "ScreeningResult"("candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewFeedback_interviewId_key" ON "InterviewFeedback"("interviewId");

-- CreateIndex
CREATE UNIQUE INDEX "FeedbackSummary_candidateId_key" ON "FeedbackSummary"("candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateTag_candidateId_tag_key" ON "CandidateTag"("candidateId", "tag");
