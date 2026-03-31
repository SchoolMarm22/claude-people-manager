import { ModuleLayout } from "@/components/layout/module-layout";
import { ChrisNote } from "@/components/shared/chris-note";

const SERVER_CODE = `import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SPECS } from "../lib/sample-specs.js";

const server = new McpServer({
  name: "people-products-specs",
  version: "1.0.0",
});

// Expose each hiring spec as a resource
for (const [key, spec] of Object.entries(SPECS)) {
  server.resource(
    \`spec-\${key}\`,
    \`spec://\${key}\`,
    { description: spec.label, mimeType: "text/markdown" },
    async (uri) => ({
      contents: [{ uri: uri.href, text: spec.content, mimeType: "text/markdown" }]
    })
  );
}`;

const TOOL_CODE = `// Screen a resume against any spec via Claude API
server.tool(
  "screen_resume",
  "Screen a resume against a hiring spec using Claude AI.",
  {
    resume: z.string().describe("The candidate's resume text"),
    spec_key: z.enum([
      "fullstack-startup",
      "angular-specialist",
      "marketing-growth",
      "marketing-content"
    ]).describe("Which hiring spec to screen against"),
  },
  async ({ resume, spec_key }) => {
    const spec = SPECS[spec_key];
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      system: screeningSystemPrompt,
      messages: [{ role: "user", content: buildScreeningPrompt(resume, spec) }],
    });
    return { content: [{ type: "text", text: response.content[0].text }] };
  }
);`;

const CONFIG_CODE = `{
  "mcpServers": {
    "people-products": {
      "command": "npx",
      "args": ["tsx", "src/mcp/index.ts"],
      "cwd": "/path/to/claude-people-manager"
    }
  }
}`;

function CodeBlock({ title, code, language = "typescript" }: { title: string; code: string; language?: string }) {
  return (
    <div className="rounded-lg border border-[#E8E5E0] bg-white overflow-hidden">
      <div className="border-b border-[#E8E5E0] bg-[#FAFAF8] px-4 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9B9B9B]">
          {title}
        </p>
      </div>
      <pre className="overflow-x-auto p-4 text-[12px] leading-relaxed">
        <code className={`language-${language} text-[#4A4A4A]`}>{code}</code>
      </pre>
    </div>
  );
}

export default function McpServerPage() {
  return (
    <ModuleLayout
      title="Spec File MCP"
      description="A Model Context Protocol server that exposes hiring specs as resources and resume screening as a tool — making this platform available to any MCP-compatible client."
      status="demo"
    >
      <ChrisNote>
        <p>
          The entire thesis of this demo is that spec files are the universal
          abstraction for people management tools. So what if those specs were
          available not just in this web app, but in <strong>any AI tool</strong>?
        </p>
        <p>
          That&apos;s what MCP (Model Context Protocol) enables. This small MCP
          server exposes our hiring specs as <strong>resources</strong> and the
          screening API as a <strong>tool</strong>. Connect it to Claude Desktop,
          Claude Code, or any MCP-compatible client — and a recruiter can say
          &ldquo;pull up Cindi&apos;s hiring spec and screen this resume&rdquo;
          without ever opening this web app.
        </p>
        <p>
          This is the synthesis layer in action: the spec files live in one place,
          and MCP makes them portable to any AI surface. It&apos;s a small proof of
          concept, but it demonstrates how a spec-driven architecture naturally
          extends into the Claude ecosystem.
        </p>
      </ChrisNote>

      {/* Architecture Diagram */}
      <div className="mb-8">
        <h3 className="mb-4 text-sm font-semibold text-[#1A1A1A]">
          Architecture
        </h3>
        <div className="rounded-xl border border-[#E8E5E0] bg-[#FAFAF8] p-6">
          <div className="flex flex-col items-center gap-3 lg:flex-row lg:justify-center lg:gap-0">
            {/* MCP Clients */}
            <div className="space-y-2 text-center">
              <div className="rounded-lg border-2 border-[#E8E5E0] bg-white px-4 py-2">
                <p className="text-xs font-semibold">Claude Desktop</p>
              </div>
              <div className="rounded-lg border-2 border-[#E8E5E0] bg-white px-4 py-2">
                <p className="text-xs font-semibold">Claude Code</p>
              </div>
              <div className="rounded-lg border-2 border-[#E8E5E0] bg-white px-4 py-2">
                <p className="text-xs font-semibold">Any MCP Client</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center px-4">
              <svg width="80" height="40" viewBox="0 0 80 40" fill="none" className="hidden lg:block">
                <path d="M0 20h65M60 10l10 10-10 10" stroke="#D97757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <text x="30" y="12" textAnchor="middle" fontSize="9" fill="#9B9B9B">stdio</text>
              </svg>
              <svg width="24" height="40" viewBox="0 0 24 40" fill="none" className="lg:hidden">
                <path d="M12 0v30M6 24l6 6 6-6" stroke="#D97757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* MCP Server */}
            <div className="rounded-xl border-2 border-[#D97757]/30 bg-[#D97757]/5 px-6 py-4 text-center">
              <p className="text-xs font-bold text-[#D97757]">MCP Server</p>
              <p className="text-[10px] text-[#9B9B9B]">people-products-specs</p>
              <div className="mt-3 space-y-1.5">
                <div className="rounded-md bg-white px-3 py-1.5">
                  <p className="text-[10px] font-semibold text-blue-600">Resources</p>
                  <p className="text-[9px] text-[#9B9B9B]">4 hiring spec files</p>
                </div>
                <div className="rounded-md bg-white px-3 py-1.5">
                  <p className="text-[10px] font-semibold text-green-600">Tools</p>
                  <p className="text-[9px] text-[#9B9B9B]">screen_resume</p>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center px-4">
              <svg width="80" height="40" viewBox="0 0 80 40" fill="none" className="hidden lg:block">
                <path d="M0 20h65M60 10l10 10-10 10" stroke="#D97757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <text x="30" y="12" textAnchor="middle" fontSize="9" fill="#9B9B9B">imports</text>
              </svg>
              <svg width="24" height="40" viewBox="0 0 24 40" fill="none" className="lg:hidden">
                <path d="M12 0v30M6 24l6 6 6-6" stroke="#D97757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Data Sources */}
            <div className="space-y-2 text-center">
              <div className="rounded-lg border-2 border-[#E8E5E0] bg-white px-4 py-2">
                <p className="text-xs font-semibold">Spec Files</p>
                <p className="text-[9px] text-[#9B9B9B]">sample-specs.ts</p>
              </div>
              <div className="rounded-lg border-2 border-[#E8E5E0] bg-white px-4 py-2">
                <p className="text-xs font-semibold">Claude API</p>
                <p className="text-[9px] text-[#9B9B9B]">Screening prompts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Samples */}
      <div className="space-y-6">
        <h3 className="text-sm font-semibold text-[#1A1A1A]">Implementation</h3>

        <CodeBlock
          title="Resources — Exposing Spec Files"
          code={SERVER_CODE}
        />

        <CodeBlock
          title="Tools — AI Resume Screening"
          code={TOOL_CODE}
        />

        <CodeBlock
          title="Claude Desktop Configuration"
          code={CONFIG_CODE}
          language="json"
        />
      </div>

      {/* How to run */}
      <div className="mt-8 rounded-xl border border-[#E8E5E0] bg-white p-6">
        <h3 className="mb-3 text-sm font-semibold text-[#1A1A1A]">
          Try It Yourself
        </h3>
        <p className="mb-4 text-xs leading-relaxed text-[#6B6B6B]">
          This MCP server runs locally on your machine. Clone the repo, configure
          Claude Desktop to use it, and you can interact with the hiring specs
          and screening tool directly from Claude.
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#D97757] text-[10px] font-bold text-white">
              1
            </span>
            <div>
              <p className="text-sm font-medium">Clone the repo and install</p>
              <code className="block rounded bg-[#F5F3EF] px-2 py-1 text-xs text-[#6B6B6B]">
                git clone https://github.com/chris-martin-dev/claude-people-manager.git &amp;&amp; cd claude-people-manager &amp;&amp; npm install
              </code>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#D97757] text-[10px] font-bold text-white">
              2
            </span>
            <div>
              <p className="text-sm font-medium">
                Set your API key
              </p>
              <code className="block rounded bg-[#F5F3EF] px-2 py-1 text-xs text-[#6B6B6B]">
                echo &quot;ANTHROPIC_API_KEY=your-key-here&quot; &gt; .env
              </code>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#D97757] text-[10px] font-bold text-white">
              3
            </span>
            <div>
              <p className="text-sm font-medium">
                Add to Claude Desktop config
              </p>
              <code className="block rounded bg-[#F5F3EF] px-2 py-1 text-xs text-[#6B6B6B]">
                ~/Library/Application Support/Claude/claude_desktop_config.json
              </code>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#D97757] text-[10px] font-bold text-white">
              4
            </span>
            <div>
              <p className="text-sm font-medium">
                Ask Claude to screen a resume
              </p>
              <code className="block rounded bg-[#F5F3EF] px-2 py-1 text-xs text-[#6B6B6B]">
                &ldquo;Pull up Cindi&apos;s hiring spec and screen this resume
                against it&rdquo;
              </code>
            </div>
          </div>
        </div>
        <p className="mt-4 text-[11px] text-[#9B9B9B]">
          The screen_resume tool requires an ANTHROPIC_API_KEY. Resource browsing
          (spec files) works without it.
        </p>
      </div>

      {/* Available Resources */}
      <div className="mt-6 rounded-xl border border-[#E8E5E0] bg-white p-6">
        <h3 className="mb-3 text-sm font-semibold text-[#1A1A1A]">
          Available Resources &amp; Tools
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-blue-600">
              Resources (4)
            </p>
            <div className="space-y-1.5">
              {[
                { uri: "spec://fullstack-startup", label: "Cindi's Full-Stack SWE Spec" },
                { uri: "spec://angular-specialist", label: "James's Angular Specialist Spec" },
                { uri: "spec://marketing-growth", label: "Diana's Growth Marketing Spec" },
                { uri: "spec://marketing-content", label: "Diana's Content Marketing Spec" },
              ].map((r) => (
                <div key={r.uri} className="rounded-md border border-[#E8E5E0] bg-[#FAFAF8] px-3 py-2">
                  <code className="text-[10px] text-[#D97757]">{r.uri}</code>
                  <p className="text-[11px] text-[#6B6B6B]">{r.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-green-600">
              Tools (1)
            </p>
            <div className="rounded-md border border-[#E8E5E0] bg-[#FAFAF8] px-3 py-2">
              <code className="text-[10px] text-[#D97757]">screen_resume</code>
              <p className="text-[11px] text-[#6B6B6B]">
                Takes a resume text and spec key. Returns a structured AI
                assessment with fit score, strengths, concerns, bias check, and
                recommendation.
              </p>
              <div className="mt-2 flex gap-2">
                <span className="rounded bg-[#F5F3EF] px-1.5 py-0.5 text-[9px] font-mono text-[#6B6B6B]">
                  resume: string
                </span>
                <span className="rounded bg-[#F5F3EF] px-1.5 py-0.5 text-[9px] font-mono text-[#6B6B6B]">
                  spec_key: enum
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModuleLayout>
  );
}
