import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Sidebar } from "@/components/layout/sidebar";
import { AppFooter } from "@/components/layout/app-footer";

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
      <body className="flex h-full overflow-hidden font-sans">
        <Sidebar />
        <main className="flex flex-1 flex-col overflow-y-auto">
          <div className="flex-1">{children}</div>
          <AppFooter />
        </main>
        <Analytics />
      </body>
    </html>
  );
}
