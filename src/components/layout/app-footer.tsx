"use client";

import { useState } from "react";

export function AppFooter() {
  const [hovered, setHovered] = useState(false);

  return (
    <footer
      className="flex h-32 flex-shrink-0 items-center justify-center border-t border-[#E8E5E0] bg-[#FAFAF8]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p className="text-base text-[#9B9B9B] transition-colors">
        <span
          className={`inline-block transition-all duration-300 ${
            hovered ? "scale-110 opacity-100" : "scale-0 opacity-0"
          }`}
        >
          &hearts;&nbsp;
        </span>
        Built by{" "}
        <a
          href="https://www.linkedin.com/in/chris-martin-dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#4A4A4A] underline underline-offset-2 transition-colors hover:text-[#D97757]"
        >
          Chris Martin
        </a>{" "}
        and Claude Code
        <span
          className={`inline-block transition-all duration-300 ${
            hovered ? "scale-110 opacity-100" : "scale-0 opacity-0"
          }`}
        >
          &nbsp;&hearts;
        </span>
      </p>
    </footer>
  );
}
