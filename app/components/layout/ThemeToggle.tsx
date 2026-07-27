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
      className="text-sm"
    >
      {isDark ? "حالت روشن" : "حالت تیره"}
    </Button>
  );
}
