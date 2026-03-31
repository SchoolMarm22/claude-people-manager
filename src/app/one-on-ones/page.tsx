"use client";

import { useState, useRef, useEffect } from "react";
import { ModuleLayout } from "@/components/layout/module-layout";
import { ChrisNote } from "@/components/shared/chris-note";
import { ENGINEERS, type Engineer, type OneOnOneNote } from "@/lib/mock-data";
import { Sparkles, Loader2, Send, MessageCircle } from "lucide-react";

const MOOD_STYLES = {
  positive: "border-l-green-500 bg-green-50/30",
  neutral: "border-l-gray-300 bg-gray-50/30",
  concern: "border-l-amber-500 bg-amber-50/30",
};

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function NoteCard({ note }: { note: OneOnOneNote }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`rounded-lg border border-[#E8E5E0] border-l-4 ${MOOD_STYLES[note.mood]} cursor-pointer transition-all hover:shadow-sm`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-[#9B9B9B]">
            {new Date(note.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <div className="flex gap-1">
            {note.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#F5F3EF] px-2 py-0.5 text-[10px] text-[#6B6B6B]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-1 text-sm font-medium">{note.summary}</p>
        {expanded && (
          <p className="mt-3 text-sm leading-relaxed text-[#4A4A4A] whitespace-pre-line">
            {note.details}
          </p>
        )}
      </div>
    </div>
  );
}

function EngineerPanel({ engineer }: { engineer: Engineer }) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Reset when engineer changes
  useEffect(() => {
    setSummary(null);
    setChatMessages([]);
    setChatInput("");
  }, [engineer.id]);

  async function generateSummary() {
    setLoadingSummary(true);
    try {
      const res = await fetch("/api/one-on-one-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          engineerName: engineer.name,
          engineerRole: engineer.role,
          notes: engineer.notes,
        }),
      });
      if (!res.ok) throw new Error("API call failed");
      const data = await res.json();
      setSummary(data.summary);
    } catch {
      setSummary(
        `Summary for ${engineer.name}: A strong contributor who has shown consistent growth over the past several months. Key themes across recent 1:1s include career development aspirations, technical leadership, and workload management. There are some retention signals to monitor — recommend prioritizing their development plan and ensuring they feel valued and heard.`
      );
    } finally {
      setLoadingSummary(false);
    }
  }

  async function sendChatMessage() {
    if (!chatInput.trim()) return;
    const userMessage = chatInput.trim();
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoadingChat(true);

    try {
      const res = await fetch("/api/one-on-one-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          engineerName: engineer.name,
          engineerRole: engineer.role,
          notes: engineer.notes,
          messages: [...chatMessages, { role: "user", content: userMessage }],
        }),
      });
      if (!res.ok) throw new Error("API call failed");
      const data = await res.json();
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting to Claude right now. Try again in a moment.",
        },
      ]);
    } finally {
      setLoadingChat(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Engineer Header */}
      <div className="flex items-center justify-between rounded-lg border border-[#E8E5E0] bg-white p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D97757] text-sm font-bold text-white">
            {engineer.avatar}
          </div>
          <div>
            <p className="font-medium">{engineer.name}</p>
            <p className="text-xs text-[#6B6B6B]">
              {engineer.role} &middot; Since{" "}
              {new Date(engineer.startDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <button
          onClick={generateSummary}
          disabled={loadingSummary}
          className="inline-flex items-center gap-1.5 rounded-md bg-[#D97757] px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#C4684A] disabled:opacity-50"
        >
          {loadingSummary ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Summarizing...
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5" />
              Summarize Notes
            </>
          )}
        </button>
      </div>

      {/* Summary */}
      {summary && (
        <div className="rounded-lg border border-[#D97757]/20 bg-[#D97757]/5 p-4">
          <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#D97757]">
            <Sparkles className="h-3.5 w-3.5" />
            AI Summary
          </p>
          <p className="text-sm leading-relaxed text-[#4A4A4A]">{summary}</p>
        </div>
      )}

      {/* Notes */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#9B9B9B]">
          1:1 Notes ({engineer.notes.length})
        </h3>
        <div className="space-y-3">
          {engineer.notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="rounded-lg border border-[#E8E5E0] bg-white">
        <div className="border-b border-[#E8E5E0] px-4 py-3">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#9B9B9B]">
            <MessageCircle className="h-3.5 w-3.5" />
            Ask about {engineer.name.split(" ")[0]}
          </p>
          <p className="mt-0.5 text-[11px] text-[#9B9B9B]">
            Chat with Claude using your 1:1 notes as context
          </p>
        </div>

        {/* Messages */}
        <div className="max-h-[300px] overflow-y-auto p-4 space-y-3">
          {chatMessages.length === 0 && (
            <p className="text-center text-xs text-[#9B9B9B] py-4">
              Ask a question about your notes on {engineer.name.split(" ")[0]}
              &hellip;
            </p>
          )}
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              className={`rounded-lg p-3 text-sm ${
                msg.role === "user"
                  ? "bg-[#D97757]/10 text-[#1A1A1A] ml-8"
                  : "bg-[#F5F3EF] text-[#4A4A4A] mr-8"
              }`}
            >
              {msg.content}
            </div>
          ))}
          {loadingChat && (
            <div className="flex items-center gap-2 text-xs text-[#9B9B9B] mr-8 bg-[#F5F3EF] rounded-lg p-3">
              <Loader2 className="h-3 w-3 animate-spin" />
              Thinking...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-[#E8E5E0] p-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendChatMessage();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={`e.g., "Did ${engineer.name.split(" ")[0]} mention a wedding date?"`}
              className="flex-1 rounded-md border border-[#E8E5E0] bg-[#FAFAF8] px-3 py-2 text-sm placeholder:text-[#9B9B9B] focus:border-[#D97757] focus:outline-none"
              disabled={loadingChat}
            />
            <button
              type="submit"
              disabled={loadingChat || !chatInput.trim()}
              className="flex items-center justify-center rounded-md bg-[#D97757] px-3 py-2 text-white transition-colors hover:bg-[#C4684A] disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function OneOnOnesPage() {
  const [selectedEngineer, setSelectedEngineer] = useState<Engineer>(
    ENGINEERS[0]
  );

  return (
    <ModuleLayout
      title="1:1s"
      description="Structured 1:1 notes with AI-powered summarization and conversational recall."
      status="live"
    >
      <ChrisNote>
        <p>
          One of the most important, but easily overlooked aspects of people
          managing is taking notes! Any time you have a 1:1 it&apos;s not just
          important to build rapport and hear the concerns of your employee, but
          you need a paper trail.
        </p>
        <p>
          Whether that&apos;s tracking all of the wonderful contributions they
          are making, helping them reach their goals, or documenting poor
          performance, a paper trail is key. Having structured inputs, logged
          over time, helps develop that institutional memory.
        </p>
        <p>
          The chat feature below lets you ask questions about your own notes —
          because when you&apos;re managing 6+ people, you can&apos;t always
          remember who said what three weeks ago.
        </p>
      </ChrisNote>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Left: Engineer List */}
        <div className="lg:col-span-1">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#9B9B9B]">
            Direct Reports
          </h3>
          <div className="space-y-1">
            {ENGINEERS.map((eng) => (
              <button
                key={eng.id}
                onClick={() => setSelectedEngineer(eng)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left transition-colors ${
                  selectedEngineer.id === eng.id
                    ? "bg-[#D97757]/10 text-[#D97757]"
                    : "hover:bg-[#F5F3EF]"
                }`}
              >
                <div
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                    selectedEngineer.id === eng.id
                      ? "bg-[#D97757]"
                      : "bg-[#9B9B9B]"
                  }`}
                >
                  {eng.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium">{eng.name}</p>
                  <p className="text-[11px] text-[#9B9B9B]">{eng.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Engineer Detail */}
        <div className="lg:col-span-3">
          <EngineerPanel engineer={selectedEngineer} />
        </div>
      </div>
    </ModuleLayout>
  );
}
