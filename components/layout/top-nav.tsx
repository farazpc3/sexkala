"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu, ShoppingCart, User, Moon, Sun, Search } from "lucide-react";
import { useTheme } from "next-themes";

export function TopNav() {
  const { theme, setTheme } = useTheme();

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
                href="/dashboard"
                className="text-lg hover:text-[hsl(45,90%,65%)]"
              >
                داشبورد
              </Link>
              <Link
                href="/support"
                className="text-lg hover:text-[hsl(45,90%,65%)]"
              >
                پشتیبانی
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
          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-[hsl(45,90%,65%)]"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-[hsl(45,90%,65%)]"
            >
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-[hsl(45,90%,65%)]"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
