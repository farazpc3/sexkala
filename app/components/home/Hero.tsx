"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="mb-14 relative">
      {/* Background mesh */}
      <div className="absolute inset-0 -z-10 opacity-80 pointer-events-none">
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_20%_30%,#ff8fb8_0%,transparent_60%),radial-gradient(circle_at_80%_70%,#b83280_0%,transparent_60%),radial-gradient(circle_at_50%_50%,#fbbf24_0%,transparent_70%)]
            dark:bg-[radial-gradient(circle_at_20%_30%,#4b1035_0%,transparent_60%),radial-gradient(circle_at_80%_70%,#8b1c4a_0%,transparent_60%),radial-gradient(circle_at_50%_50%,#1a0b1f_0%,transparent_70%)]
          "
        />
      </div>

      <Card
        className="
    glass rounded-3xl float-animation
    shadow-[0_0_35px_rgba(255,255,255,0.15),0_0_10px_rgba(0,0,0,0.15)]
    dark:shadow-[0_0_25px_rgba(255,255,255,0.08),0_0_15px_rgba(0,0,0,0.4)]
  "
      >
        <CardContent className="p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
          <div className="w-full md:w-1/3">
            <div
              className="
    w-full h-48 md:h-64 rounded-2xl overflow-hidden
    border border-white/30 dark:border-white/20
    bg-white/10 dark:bg-black/20 backdrop-blur-xl
    shadow-[0_0_20px_rgba(255,255,255,0.15)]
    flex items-center justify-center
  "
            >
              <svg
                viewBox="0 0 400 400"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full object-cover"
              >
                <defs>
                  <linearGradient
                    id="shopBg"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#ff8fb8" />
                    <stop offset="50%" stopColor="#b83280" />
                    <stop offset="100%" stopColor="#4b1035" />
                  </linearGradient>

                  <linearGradient
                    id="shopFront"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.6)" />
                  </linearGradient>

                  <linearGradient
                    id="shopWindow"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                  </linearGradient>

                  <linearGradient
                    id="shopSign"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>

                {/* Background */}
                <rect width="400" height="400" fill="url(#shopBg)" />

                {/* Ground */}
                <rect
                  y="260"
                  width="400"
                  height="140"
                  fill="rgba(0,0,0,0.25)"
                />

                {/* Shop body */}
                <rect
                  x="70"
                  y="140"
                  width="260"
                  height="140"
                  rx="20"
                  fill="url(#shopFront)"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="3"
                />

                {/* Awning */}
                <path
                  d="M70 140 H330 V170 Q320 185 305 170 Q290 185 275 170 Q260 185 245 170 Q230 185 215 170 Q200 185 185 170 Q170 185 155 170 Q140 185 125 170 Q110 185 95 170 Q80 185 70 170 Z"
                  fill="rgba(255,255,255,0.9)"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="2"
                />

                {/* Window */}
                <rect
                  x="90"
                  y="185"
                  width="110"
                  height="70"
                  rx="10"
                  fill="url(#shopWindow)"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="2"
                />

                {/* Door */}
                <rect
                  x="215"
                  y="185"
                  width="90"
                  height="95"
                  rx="12"
                  fill="rgba(75,12,60,0.8)"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="2"
                />
                <circle cx="295" cy="235" r="4" fill="rgba(255,255,255,0.9)" />

                {/* Sign */}
                <rect
                  x="120"
                  y="110"
                  width="160"
                  height="24"
                  rx="12"
                  fill="url(#shopSign)"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="2"
                />
                <text
                  x="200"
                  y="127"
                  textAnchor="middle"
                  fontSize="12"
                  fill="white"
                  style={{ fontFamily: "sans-serif" }}
                >
                  SEXKALA SHOP
                </text>

                {/* Shopping bag */}
                <rect
                  x="115"
                  y="210"
                  width="60"
                  height="55"
                  rx="10"
                  fill="rgba(236,72,153,0.9)"
                />
                <path
                  d="M125 210 Q145 190 165 210"
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth="3"
                  fill="none"
                />
                <circle cx="135" cy="210" r="3" fill="rgba(255,255,255,0.9)" />
                <circle cx="155" cy="210" r="3" fill="rgba(255,255,255,0.9)" />

                {/* Glow */}
                <circle
                  cx="200"
                  cy="200"
                  r="140"
                  fill="rgba(255,255,255,0.08)"
                />
              </svg>
            </div>
          </div>

          {/* Text section */}
          <div className="w-full md:w-2/3 space-y-4 text-center md:text-right">
            <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-inverse drop-shadow-lg">
              ارسال محرمانه، بسته‌بندی امن
            </h2>

            <p className="text-base md:text-lg text-primary leading-relaxed">
              این وب‌سایت فقط برای نمایش محصولات است. ثبت سفارش فقط از طریق
              تلگرام انجام می‌شود.
            </p>

            <p className="text-secondary text-sm font-semibold">
              پرداخت درب منزل — پرداخت کارت به کارت یعنی کلا برداری
            </p>

            <Link
              href="#categories"
              className="
          inline-block px-8 py-3 rounded-full
          bg-gradient-to-r from-pink-500 to-purple-600
          text-primary dark:text-inverse font-semibold
          shadow-[0_0_25px_rgba(236,72,153,0.5)]
          hover:shadow-[0_0_40px_rgba(236,72,153,0.8)]
          transition-all
        "
            >
              مشاهده دسته‌بندی‌ها
            </Link>

            <p className="text-secondary text-sm pt-2">
              ثبت سفارش:{" "}
              <Link
                href="https://t.me/sexyy_toys"
                target="_blank"
                className="underline text-primary dark:text-inverse hover:text-inverse transition-colors"
              >
                t.me/sexyy_toys
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
