"use client";

import { Card } from "@/components/ui/card";
import Link from "next/link";

const categories = [
  { id: 1, title: "دسته ۱" },
  { id: 2, title: "دسته ۲" },
  { id: 3, title: "دسته ۳" },
  { id: 4, title: "دسته ۴" },
];

export default function Categories() {
  return (
    <section id="categories" className="relative mb-16">
      {/* Background mesh */}
      <div className="absolute inset-0 -z-10 opacity-60 pointer-events-none">
        <div
          className="absolute inset-0 
          bg-[radial-gradient(circle_at_10%_20%,#ff8fb8_0%,transparent_60%),radial-gradient(circle_at_90%_80%,#b83280_0%,transparent_60%),radial-gradient(circle_at_50%_50%,#fbbf24_0%,transparent_70%)]
          dark:bg-[radial-gradient(circle_at_10%_20%,#4b1035_0%,transparent_60%),radial-gradient(circle_at_90%_80%,#8b1c4a_0%,transparent_60%),radial-gradient(circle_at_50%_50%,#1a0b1f_0%,transparent_70%)]
        "
        />
      </div>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-primary dark:text-inverse mb-8 drop-shadow-lg text-center">
        دسته‌بندی‌ها
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Card
            key={cat.id}
            className="
              glass rounded-2xl p-6 text-center shadow-xl
              border border-white/20 dark:border-white/10
              backdrop-blur-xl transition-all
              hover:scale-[1.05] hover:-translate-y-1
              hover:shadow-[0_0_35px_rgba(236,72,153,0.5)]
              duration-300 ease-out
            "
          >
            {/* Image placeholder */}
            <div
              className="
              h-24 rounded-xl 
              bg-white/10 dark:bg-black/20 
              border border-white/20 dark:border-white/10 
              backdrop-blur-md 
              flex items-center justify-center 
              text-sm text-secondary 
              mb-4
            "
            >
              تصویر دسته {cat.id}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-primary dark:text-inverse drop-shadow-md">
              {cat.title}
            </h3>
          </Card>
        ))}
      </div>

      {/* Footer text */}
      <p className="text-center text-secondary text-sm mt-6">
        برای خرید، کد محصول را در تلگرام ارسال کنید:{" "}
        <span className="font-bold">@Ads_shopes</span>
      </p>

      <p className="text-center text-secondary text-sm mt-2 font-semibold">
        پرداخت درب منزل — پرداخت کارت به کارت یعنی کلا برداری
      </p>
    </section>
  );
}
