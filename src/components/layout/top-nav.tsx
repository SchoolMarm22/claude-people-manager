import Link from "next/link";

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E5E0] bg-white">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-[15px] font-semibold tracking-tight">
          People Products Demo
        </Link>
        <div className="flex items-center gap-4 text-xs text-[#6B6B6B]">
          <span>Built by Chris Martin</span>
          <span className="text-[#E8E5E0]">|</span>
          <a
            href="https://www.linkedin.com/in/christophermartindenver/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D97757] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://www.amazon.com/Chasing-Alexander-Marines-Journey-Afghanistan-ebook/dp/B098JWHJLV"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D97757] transition-colors"
          >
            Book
          </a>
        </div>
      </div>
    </header>
  );
}
