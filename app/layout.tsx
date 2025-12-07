// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { JamesNav } from "@/components/JamesNav";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "James Conquest Yarrow",
  description: "BW8 Studio – James portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* GLOBAL HEADER – same on every page */}
        <header className="site-header">
          <div className="badge">BW8 Studio</div>
          <JamesNav />
        </header>

        {children}
      </body>
    </html>
  );
}
