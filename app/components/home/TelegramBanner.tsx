"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TelegramBanner() {
  return (
    <section className="relative mb-16">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 -z-10 opacity-60 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,#ff8fb8_0%,transparent_60%),radial-gradient(circle_at_90%_80%,#b83280_0%,transparent_60%),radial-gradient(circle_at_50%_50%,#fbbf24_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_10%_20%,#4b1035_0%,transparent_60%),radial-gradient(circle_at_90%_80%,#8b1c4a_0%,transparent_60%),radial-gradient(circle_at_50%_50%,#1a0b1f_0%,transparent_70%)]" />
      </div>

      {/* Glassmorphism card */}
      <Card className="glass rounded-3xl shadow-2xl float-animation border border-white/20 dark:border-white/10 backdrop-blur-xl">
        <CardContent className="p-8 md:p-10 flex flex-col md:flex-row items-center gap-10">
          {/* Banner image placeholder */}
          <div className="w-full md:w-1/3">
            <div className="w-full h-40 md:h-56 rounded-2xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 backdrop-blur-md flex items-center justify-center text-sm font-semibold text-white/80">
              بنر تلگرام
            </div>
          </div>

          {/* Text + CTA */}
          <div className="w-full md:w-2/3 space-y-4 text-center md:text-right">
            <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
              ثبت سفارش فقط از طریق تلگرام
            </h3>

            <p className="text-base md:text-lg text-white/90 leading-relaxed">
              کد محصول را از سایت بردارید و در تلگرام ارسال کنید. پاسخ‌دهی سریع،
              ارسال محرمانه.
            </p>

            <div className="pt-4">
              <Button
                className="
                  px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold
                  shadow-[0_0_25px_rgba(59,130,246,0.5)]
                  hover:shadow-[0_0_40px_rgba(59,130,246,0.8)]
                  transition-all
                "
              >
                کانال تلگرام سکسکالا
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
