"use client";

import ThemeToggle from "./ThemeToggle";
import Image from "next/image";

interface HeaderProps {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ isDark, setIsDark }: HeaderProps) {
  return (
    <header
      className="
        sticky top-0 z-50
        backdrop-blur-xl
        glass
        border-b border-white/20 dark:border-white/10
        shadow-[0_0_25px_rgba(236,72,153,0.25)]
      "
    >
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center gap-4">
          {/* Logo container */}
          <div
            className="
              w-14 h-14 rounded-2xl
              bg-white/10 dark:bg-black/20
              backdrop-blur-md
              border border-white/20 dark:border-white/10
              flex items-center justify-center
              shadow-[0_0_20px_rgba(255,255,255,0.2)]
            "
          >
            <Image
              src={isDark ? "/logo-dark.svg" : "/logo-light.svg"}
              alt="Sexkala Logo"
              width={48}
              height={48}
              priority
            />
          </div>

          {/* Title */}
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
              سکسکالا
            </h1>
            <p className="text-sm text-white/70">sexkala.com</p>
          </div>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
      </div>
    </header>
  );
}
