"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu, ShoppingCart, User, Moon, Sun, Search } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function TopNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && theme === "dark";

  return (
    <header
      className="
        sticky top-0 z-50 
        bg-[hsl(330,20%,10%)]/90 
        backdrop-blur-xl 
        border-b border-[hsl(330,20%,20%)]
      "
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger
            className="
              p-2 rounded-md 
              border border-[hsl(330,20%,20%)]
              text-[hsl(330,10%,96%)]
            "
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="
              w-64 text-right 
              bg-[hsl(330,20%,10%)] 
              text-[hsl(330,10%,96%)]
              border-l border-[hsl(330,20%,20%)]
            "
          >
            <nav className="flex flex-col gap-4 mt-6">
              {/* Storefront */}
              <Link href="/" className="text-lg hover:text-[hsl(45,90%,65%)]">
                خانه
              </Link>
              <Link
                href="/products"
                className="text-lg hover:text-[hsl(45,90%,65%)]"
              >
                محصولات
              </Link>
              <Link
                href="/products/categories"
                className="text-lg hover:text-[hsl(45,90%,65%)]"
              >
                دسته‌بندی‌ها
              </Link>
              <Link
                href="/products/search"
                className="text-lg hover:text-[hsl(45,90%,65%)]"
              >
                جستجو
              </Link>
              <Link
                href="/cart"
                className="text-lg hover:text-[hsl(45,90%,65%)]"
              >
                سبد خرید
              </Link>

              {/* Auth */}
              <Link
                href="/login"
                className="text-lg hover:text-[hsl(45,90%,65%)]"
              >
                ورود
              </Link>
              <Link
                href="/register"
                className="text-lg hover:text-[hsl(45,90%,65%)]"
              >
                ثبت‌نام
              </Link>
              <Link
                href="/forgot-password"
                className="text-lg hover:text-[hsl(45,90%,65%)]"
              >
                فراموشی رمز عبور
              </Link>

              {/* User Dashboard */}
              <Link
                href="/dashboard"
                className="text-lg hover:text-[hsl(45,90%,65%)]"
              >
                داشبورد
              </Link>
              <Link
                href="/dashboard/orders"
                className="text-lg hover:text-[hsl(45,90%,65%)]"
              >
                سفارش‌ها
              </Link>
              <Link
                href="/dashboard/profile"
                className="text-lg hover:text-[hsl(45,90%,65%)]"
              >
                پروفایل
              </Link>
              <Link
                href="/dashboard/settings"
                className="text-lg hover:text-[hsl(45,90%,65%)]"
              >
                تنظیمات
              </Link>

              {/* Admin */}
              <Link
                href="/admin"
                className="text-lg hover:text-[hsl(45,90%,65%)]"
              >
                مدیریت
              </Link>
              <Link
                href="/admin/products"
                className="text-lg hover:text-[hsl(45,90%,65%)]"
              >
                مدیریت محصولات
              </Link>
              <Link
                href="/admin/orders"
                className="text-lg hover:text-[hsl(45,90%,65%)]"
              >
                مدیریت سفارش‌ها
              </Link>
              <Link
                href="/admin/users"
                className="text-lg hover:text-[hsl(45,90%,65%)]"
              >
                مدیریت کاربران
              </Link>

              {/* Info */}
              <Link
                href="/about"
                className="text-lg hover:text-[hsl(45,90%,65%)]"
              >
                درباره ما
              </Link>
              <Link
                href="/contact"
                className="text-lg hover:text-[hsl(45,90%,65%)]"
              >
                تماس با ما
              </Link>
              <Link
                href="/faq"
                className="text-lg hover:text-[hsl(45,90%,65%)]"
              >
                سوالات متداول
              </Link>
              <Link
                href="/support"
                className="text-lg hover:text-[hsl(45,90%,65%)]"
              >
                پشتیبانی
              </Link>

              {/* Legal */}
              <Link
                href="/privacy"
                className="text-lg hover:text-[hsl(45,90%,65%)]"
              >
                حریم خصوصی
              </Link>
              <Link
                href="/terms"
                className="text-lg hover:text-[hsl(45,90%,65%)]"
              >
                قوانین
              </Link>
              <Link
                href="/refund-policy"
                className="text-lg hover:text-[hsl(45,90%,65%)]"
              >
                بازگشت وجه
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Search */}
        <div className="hidden md:block flex-1 mx-4">
          <div className="relative">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-[hsl(330,10%,75%)]" />
            <Input
              placeholder="جستجوی محصول..."
              className="
                pr-10 text-right 
                bg-[hsl(330,20%,20%)]/40 
                border-[hsl(330,20%,30%)]
                text-white
              "
            />
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-[hsl(45,90%,65%)]"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>

          {/* Account */}
          <Link href="/dashboard">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-[hsl(45,90%,65%)]"
            >
              <User className="h-5 w-5" />
            </Button>
          </Link>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-[hsl(45,90%,65%)]"
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            {mounted ? (
              isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )
            ) : (
              <div className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
