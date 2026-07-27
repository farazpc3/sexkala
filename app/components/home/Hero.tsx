"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function Hero() {
  return (
    <section className="mb-14 relative">
      {/* Mesh gradient background layer */}
      <div className="absolute inset-0 -z-10 opacity-80 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#ff8fb8_0%,transparent_60%),radial-gradient(circle_at_80%_70%,#b83280_0%,transparent_60%),radial-gradient(circle_at_50%_50%,#fbbf24_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_20%_30%,#4b1035_0%,transparent_60%),radial-gradient(circle_at_80%_70%,#8b1c4a_0%,transparent_60%),radial-gradient(circle_at_50%_50%,#1a0b1f_0%,transparent_70%)]" />
      </div>

      {/* Glassmorphism hero card */}
      <Card className="glass rounded-3xl shadow-2xl float-animation border border-white/20 dark:border-white/10">
        <CardContent className="p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
          {/* Image placeholder */}
          <div className="w-full md:w-1/3">
            <div className="w-full h-48 md:h-64 rounded-2xl border border-white/30 dark:border-white/20 bg-white/10 dark:bg-black/20 backdrop-blur-xl flex items-center justify-center text-sm font-semibold text-white/80">
              تصویر اصلی فروشگاه
            </div>
          </div>

          {/* Text content */}
          <div className="w-full md:w-2/3 space-y-4 text-center md:text-right">
            <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
              ارسال محرمانه، بسته‌بندی امن
            </h2>

            <p className="text-base md:text-lg text-white/90 leading-relaxed">
              این وب‌سایت فقط برای نمایش محصولات است. ثبت سفارش و پرداخت فقط از
              طریق تلگرام انجام می‌شود.
            </p>

            <div className="pt-4">
              <a
                href="#categories"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:shadow-[0_0_40px_rgba(236,72,153,0.8)] transition-all"
              >
                مشاهده دسته‌بندی‌ها
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
