import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Qehwa Pashto LLM",
  description: "Pashto's First Large Language Model - AI Optimized for Pashto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ps">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
