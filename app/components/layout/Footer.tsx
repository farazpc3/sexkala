"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="
        relative mt-20 pt-10 pb-6
        glass backdrop-blur-xl
        border-t border-white/20 dark:border-white/10
        shadow-[0_0_25px_rgba(236,72,153,0.25)]
      "
    >
      {/* Background mesh */}
      <div className="absolute inset-0 -z-10 opacity-50 pointer-events-none">
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_10%_20%,#ff8fb8_0%,transparent_60%),radial-gradient(circle_at_90%_80%,#b83280_0%,transparent_60%),radial-gradient(circle_at_50%_50%,#fbbf24_0%,transparent_70%)]
            dark:bg-[radial-gradient(circle_at_10%_20%,#4b1035_0%,transparent_60%),radial-gradient(circle_at_90%_80%,#8b1c4a_0%,transparent_60%),radial-gradient(circle_at_50%_50%,#1a0b1f_0%,transparent_70%)]
          "
        />
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 text-center space-y-4">
        {/* Title */}
        <h3
          className="text-lg font-bold text-primary dark:text-inverse
 drop-shadow-lg"
        >
          سکس کالا – sexkala.com
        </h3>

        {/* Description */}
        <p className="text-sm text-secondary leading-relaxed">
          ثبت سفارش فقط از طریق تلگرام انجام می‌شود.
        </p>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          {/* Telegram link */}
          <Link
            href="https://t.me/sexyy_toys"
            target="_blank"
            className="
              flex items-center gap-2 text-secondary hover:text-inverse
              transition-colors duration-200
            "
          >
            <Image
              src="/icons/telegram.svg"
              alt="Telegram"
              width={18}
              height={18}
            />
            کانال تلگرام
          </Link>

          <span className="text-muted">|</span>

          {/* Support */}
          <span className="text-secondary">
            پشتیبانی: <span className="font-bold">@Ads_shopes</span>
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-muted mt-4">
          © {new Date().getFullYear()} تمامی حقوق محفوظ است.
        </p>
      </div>
    </footer>
  );
}
