// app/components/layout/Header.tsx (Alternative with breadcrumb)
"use client";

import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SearchBar from "../search/SearchBar";
import { ChevronLeft } from "lucide-react";

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

  // Get navigation items based on current route
  const getNavItems = () => {
    if (pathname === "/") {
      return [{ label: "محصولات", href: "/products" }];
    }
    if (pathname?.startsWith("/products")) {
      // Check if it's a product detail page
      const isDetailPage = pathname !== "/products";
      return [
        { label: "خانه", href: "/" },
        ...(isDetailPage ? [{ label: "محصولات", href: "/products" }] : []),
      ];
    }
    if (pathname?.startsWith("/search")) {
      return [
        { label: "خانه", href: "/" },
        { label: "محصولات", href: "/products" },
        { label: "جستجو", href: "/search" },
      ];
    }
    if (pathname?.startsWith("/categories")) {
      return [
        { label: "خانه", href: "/" },
        { label: "محصولات", href: "/products" },
      ];
    }
    return [{ label: "محصولات", href: "/products" }];
  };

  const navItems = getNavItems();

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
          {/* Logo */}
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
                alt="Logo"
                width={40}
                height={40}
                priority
              />
            </div>
            <div className="hidden sm:block space-y-0.5">
              <h1 className="text-lg md:text-xl font-bold text-primary dark:text-inverse drop-shadow-lg">
                سکس کالا
              </h1>
              <p className="text-xs text-secondary">sexkala.com</p>
            </div>
          </Link>

          {/* Breadcrumb Navigation */}
          <div className="hidden md:flex items-center gap-2 text-sm">
            {navItems.map((item, index) => (
              <span key={item.href} className="flex items-center gap-2">
                <Link
                  href={item.href}
                  className={`
                    transition-colors hover:text-primary
                    ${
                      index === navItems.length - 1
                        ? "text-primary font-medium"
                        : "text-muted"
                    }
                  `}
                >
                  {item.label}
                </Link>
                {index < navItems.length - 1 && (
                  <ChevronLeft className="w-4 h-4 text-muted" />
                )}
              </span>
            ))}
          </div>

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

            {/* Products / Home Link - Mobile */}
            <Link
              href={pathname === "/" ? "/products" : "/"}
              className="sm:hidden px-3 py-1.5 rounded-full text-sm glass hover:bg-white/20 transition-colors text-primary dark:text-inverse"
            >
              {pathname === "/" ? "محصولات" : "خانه"}
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
