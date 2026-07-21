"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer
      className="
        mt-12 
        bg-[hsl(330,20%,10%)] 
        text-[hsl(330,10%,96%)]
        border-t border-[hsl(330,20%,20%)]
        backdrop-blur-md
      "
    >
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-right">
          {/* Column 1 */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[hsl(342,72%,55%)]">
              سک‌کالا
            </h3>
            <p className="text-[hsl(330,10%,75%)] leading-relaxed">
              فروشگاه آنلاین با بسته‌بندی محرمانه، ارسال سریع و پشتیبانی
              حرفه‌ای.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[hsl(342,72%,55%)]">
              لینک‌های مهم
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products"
                  className="hover:text-[hsl(45,90%,65%)] transition-colors"
                >
                  محصولات
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-[hsl(45,90%,65%)] transition-colors"
                >
                  داشبورد کاربر
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="hover:text-[hsl(45,90%,65%)] transition-colors"
                >
                  پشتیبانی
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[hsl(45,90%,65%)] transition-colors"
                >
                  درباره ما
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[hsl(342,72%,55%)]">
              ارتباط با ما
            </h3>
            <ul className="space-y-3">
              <li className="text-[hsl(330,10%,75%)]">
                ایمیل: support@sexkala.com
              </li>
              <li className="text-[hsl(330,10%,75%)]">تلفن: 0912-000-0000</li>
              <li>
                <Button
                  className="
                    mt-2 w-full 
                    bg-[hsl(45,80%,55%)] 
                    text-[hsl(330,20%,10%)]
                    hover:bg-[hsl(45,90%,65%)]
                    font-semibold
                  "
                >
                  چت آنلاین
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-[hsl(330,20%,20%)]" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[hsl(330,10%,75%)] text-sm gap-4">
          <p>© {new Date().getFullYear()} سک‌کالا — تمامی حقوق محفوظ است.</p>

          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-[hsl(45,90%,65%)] transition-colors"
            >
              حریم خصوصی
            </Link>
            <Link
              href="/terms"
              className="hover:text-[hsl(45,90%,65%)] transition-colors"
            >
              قوانین و مقررات
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
