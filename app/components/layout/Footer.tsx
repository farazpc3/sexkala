// app/components/layout/Footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass border-t border-white/20 dark:border-white/10 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">ل</span>
              </div>
              <h3 className="text-xl font-bold">لاویلا</h3>
            </div>
            <p className="text-sm text-muted">
              فروشگاه تخصصی محصولات جنسی با ارسال محرمانه
            </p>
            <p className="text-xs text-muted">lovilla.shop</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold">لینک‌های سریع</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link
                  href="/products"
                  className="hover:text-primary transition-colors"
                >
                  همه محصولات
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="hover:text-primary transition-colors"
                >
                  دسته‌بندی‌ها
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="hover:text-primary transition-colors"
                >
                  جستجو
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-semibold">دسته‌بندی‌ها</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link
                  href="/categories/vibrators"
                  className="hover:text-primary transition-colors"
                >
                  ویبراتور
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/dildos"
                  className="hover:text-primary transition-colors"
                >
                  دیلدو
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/butt-plugs"
                  className="hover:text-primary transition-colors"
                >
                  بات پلاگ
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/bdsm"
                  className="hover:text-primary transition-colors"
                >
                  BDSM
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-semibold">ارتباط با ما</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a
                  href="https://t.me/sexyy_toys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Image
                    src="/icons/telegram.svg"
                    alt="Telegram"
                    width={16}
                    height={16}
                  />
                  @sexyy_toys
                </a>
              </li>
              <li>
                <span className="text-xs">ثبت سفارش: @Ads_shopes</span>
              </li>
              <li>
                <span className="text-xs">پرداخت درب منزل</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 dark:border-white/5 mt-8 pt-6 text-center text-xs text-muted">
          <p>© {currentYear} لاویلا. تمامی حقوق محفوظ است.</p>
          <p className="mt-1">lovilla.shop</p>
        </div>
      </div>
    </footer>
  );
}
