"use client";

import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { useState, useEffect, type ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setIsDark(prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning className="font-sans">
      <body className="min-h-screen transition-colors">
        <div className="mesh-glow" />

        <Header isDark={isDark} setIsDark={setIsDark} />

        <main className="max-w-5xl mx-auto px-4 py-10">
          <div className="glass rounded-3xl p-6 md:p-10 shadow-2xl space-y-10">
            {children}
          </div>
        </main>

        <Footer />
      </body>
    </html>
  );
}
