"use client";

import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

export default function ThemeToggle({ isDark, setIsDark }: ThemeToggleProps) {
  return (
    <Button
      variant="outline"
      onClick={() => setIsDark(!isDark)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="
        text-secondary text-sm
        px-4 py-2 rounded-full
        transition-all duration-300
        hover:text-inverse
        hover:shadow-[0_0_15px_rgba(236,72,153,0.4)]
        active:scale-95
      "
    >
      {isDark ? "حالت روشن" : "حالت تیره"}
    </Button>
  );
}
