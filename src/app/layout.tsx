import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopNav } from "@/components/layout/top-nav";
import { BuilderNotesProvider } from "@/components/shared/builder-notes-provider";
import { BuilderNotesToggle } from "@/components/shared/builder-notes-toggle";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "People Products Demo — Chris Martin",
  description:
    "AI-native people management tools. A working prototype exploring spec-driven hiring, onboarding, and team management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full font-sans">
        <BuilderNotesProvider>
          <TopNav />
          <main>{children}</main>
          <BuilderNotesToggle />
        </BuilderNotesProvider>
      </body>
    </html>
  );
}
