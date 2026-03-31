import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import Anthropic from "@anthropic-ai/sdk";

// Import specs using relative paths (running outside Next.js)
import { SPECS } from "../lib/sample-specs.js";

const server = new McpServer({
  name: "people-products-specs",
  version: "1.0.0",
  description:
    "Exposes hiring spec files and AI screening tools for the People Products platform.",
});

// ──────────────────────────────────────────────
// RESOURCES: Hiring Spec Files
// ──────────────────────────────────────────────

for (const [key, spec] of Object.entries(SPECS)) {
  server.resource(
    `spec-${key}`,
    `spec://${key}`,
    {
      description: `${spec.label} — ${spec.team} team hiring spec`,
      mimeType: "text/markdown",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          text: spec.content,
          mimeType: "text/markdown",
        },
      ],
    })
  );
}

// ──────────────────────────────────────────────
// TOOLS: Resume Screening
// ──────────────────────────────────────────────

server.tool(
  "screen_resume",
  "Screen a resume against a hiring spec file using Claude AI. Returns a structured assessment with fit score, strengths, concerns, and recommendation.",
  {
    resume: z.string().describe("The candidate's resume text"),
    spec_key: z
      .enum(["fullstack-startup", "angular-specialist", "marketing-growth", "marketing-content"])
      .describe("Which hiring spec to screen against"),
  },
  async ({ resume, spec_key }) => {
    const spec = SPECS[spec_key as keyof typeof SPECS];
    if (!spec) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Error: Unknown spec key "${spec_key}". Available: ${Object.keys(SPECS).join(", ")}`,
          },
        ],
      };
    }

    try {
      const anthropic = new Anthropic();

      const response = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        system: `You are an AI-powered resume screening assistant for a People Products platform. You evaluate candidates against a manager-defined spec file.

Your evaluation must be:
- Honest: Don't inflate scores. A "Maybe" is a valid and useful signal.
- Specific: Reference exact items from the resume, not vague impressions.
- Bias-aware: Flag if any part of your assessment might be influenced by factors not relevant to the role requirements in the spec.
- Structured: Follow the output format exactly.`,
        messages: [
          {
            role: "user",
            content: `Evaluate this resume against the following hiring spec.

SPEC FILE:
${spec.content}

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

Return ONLY valid JSON, no markdown formatting.`,
          },
        ],
      });

      const text =
        response.content[0].type === "text" ? response.content[0].text : "";

      return {
        content: [{ type: "text" as const, text }],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Screening failed: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

// ──────────────────────────────────────────────
// START SERVER
// ──────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
