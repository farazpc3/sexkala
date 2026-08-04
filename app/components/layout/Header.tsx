// app/components/layout/Header.tsx
"use client";

import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SearchBar from "../search/SearchBar";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setIsDark(prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const isProductsPage =
    pathname?.startsWith("/products") || pathname?.startsWith("/search");
  const isHomePage = pathname === "/";

  return (
    <header
      className="
        sticky top-0 z-50
        backdrop-blur-xl glass
        border-b border-white/20 dark:border-white/10
        shadow-[0_0_25px_rgba(236,72,153,0.25)]
      "
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo + Title */}
          <Link href="/" className="flex items-center gap-4 flex-shrink-0">
            <div
              className="
                w-12 h-12 rounded-2xl
                bg-white/10 dark:bg-black/20
                backdrop-blur-md
                border border-white/20 dark:border-white/10
                flex items-center justify-center
                shadow-[0_0_20px_rgba(255,255,255,0.2)]
                transition-all
              "
            >
              <Image
                src={isDark ? "/logo-dark.svg" : "/logo-light.svg"}
                alt="لاویلا"
                width={40}
                height={40}
                priority
              />
            </div>
            <div className="hidden sm:block space-y-0.5">
              <h1 className="text-lg md:text-xl font-bold text-primary dark:text-inverse drop-shadow-lg">
                لاویلا
              </h1>
              <p className="text-xs text-secondary">lovilla.shop</p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="flex-1 max-w-md hidden md:block">
            <SearchBar placeholder="جستجو..." />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Search Button - Mobile */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 rounded-full glass hover:bg-white/20 transition-colors"
              aria-label="جستجو"
            >
              <svg
                className="w-5 h-5 text-primary dark:text-inverse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Products / Home Link */}
            <Link
              href={isProductsPage ? "/" : "/products"}
              className={`
                px-3 py-1.5 rounded-full text-sm
                transition-all duration-200
                ${
                  isProductsPage
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.3)]"
                    : "glass hover:bg-white/20 text-primary dark:text-inverse"
                }
                hidden sm:block
              `}
            >
              {isProductsPage ? "خانه" : "محصولات"}
            </Link>

            {/* Telegram CTA */}
            <Link
              href="https://t.me/sexyy_toys"
              target="_blank"
              className="
                flex items-center gap-2 px-3 py-1.5 rounded-full text-sm
                bg-gradient-to-r from-blue-500 to-purple-600
                text-inverse font-semibold
                shadow-[0_0_20px_rgba(59,130,246,0.5)]
                hover:shadow-[0_0_30px_rgba(59,130,246,0.8)]
                transition-all
                hidden sm:flex
              "
            >
              <Image
                src="/icons/telegram.svg"
                alt="Telegram"
                width={16}
                height={16}
              />
              <span className="hidden lg:inline">تلگرام فروشگاه</span>
            </Link>

            {/* Theme toggle */}
            <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="mt-3 md:hidden">
            <SearchBar placeholder="جستجو..." />
          </div>
        )}
      </div>
    </header>
  );
}
