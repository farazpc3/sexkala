"use client";

import ThemeToggle from "./ThemeToggle";
import Image from "next/image";

interface HeaderProps {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ isDark, setIsDark }: HeaderProps) {
  return (
    <header className="border-b border-border py-4 mb-6">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
            <Image
              src={isDark ? "/logo-dark.svg" : "/logo-light.svg"}
              alt="Sexkala Logo"
              width={60}
              height={60}
              priority
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">
              سکسکالا – فروشگاه محصولات زناشویی
            </h1>
            <p className="text-sm text-muted-foreground">sexkala.com</p>
          </div>
        </div>

        <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
      </div>
    </header>
  );
}
