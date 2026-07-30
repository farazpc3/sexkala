// app/components/home/Categories.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface Category {
  id: string;
  name: {
    fa: string;
    en: string;
  };
  slug: string;
  count: number;
  icon?: string;
  image?: string;
}

interface CategoriesProps {
  categories?: Category[];
  productImages?: Record<string, string[]>;
}

export default function Categories({
  categories = [],
  productImages = {},
}: CategoriesProps) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Debug: log what categories we have
  console.log(
    "📂 Categories received:",
    categories.map((c) => ({ id: c.id, slug: c.slug, name: c.name.fa })),
  );

  // If no categories passed, show placeholder
  const displayCategories =
    categories.length > 0
      ? categories
      : [
          {
            id: "vibrators",
            name: { fa: "ویبراتور", en: "Vibrators" },
            slug: "vibrators",
            count: 0,
          },
          {
            id: "dildos",
            name: { fa: "دیلدو", en: "Dildos" },
            slug: "dildos",
            count: 0,
          },
          {
            id: "butt-plugs",
            name: { fa: "بات پلاگ", en: "Butt Plugs" },
            slug: "butt-plugs",
            count: 0,
          },
          {
            id: "male-toys",
            name: { fa: "اسباب‌بازی مردانه", en: "Male Toys" },
            slug: "male-toys",
            count: 0,
          },
        ];

  // Filter out categories with 0 products (optional - remove this if you want to show all categories)
  const filteredCategories = displayCategories.filter((cat) => cat.count > 0);

  // If no categories with products, use all categories
  const finalCategories =
    filteredCategories.length > 0 ? filteredCategories : displayCategories;

  const getCategoryImage = (categoryId: string): string | null => {
    const images = productImages[categoryId];
    if (images && images.length > 0) {
      const randomIndex = Math.floor(Math.random() * images.length);
      return images[randomIndex];
    }
    return null;
  };

  const handleImageError = (categoryId: string) => {
    setImageErrors((prev) => ({ ...prev, [categoryId]: true }));
  };

  const categoryIcons: Record<string, string> = {
    vibrators: "⚡",
    dildos: "🍆",
    "butt-plugs": "🔌",
    "anal-toys": "🔵",
    "male-toys": "👤",
    "sleeves-extenders": "🧤",
    "cock-rings": "⭕",
    "strap-ons": "🔗",
    bdsm: "⛓️",
    lubricants: "💧",
    "delay-products": "⏱️",
    condoms: "🛡️",
    "cleaning-products": "🧹",
    accessories: "📦",
    "artificial-vagina": "🌸",
    whips: "鞭",
    gags: "🔇",
    belts: "🎀",
  };

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
        {finalCategories.map((cat) => {
          const image = getCategoryImage(cat.id);
          const hasError = imageErrors[cat.id];

          return (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="
                glass rounded-2xl overflow-hidden text-center shadow-xl
                border border-white/20 dark:border-white/10
                backdrop-blur-xl transition-all
                hover:scale-[1.05] hover:-translate-y-1
                hover:shadow-[0_0_35px_rgba(236,72,153,0.5)]
                duration-300 ease-out group
              "
            >
              {/* Image Container */}
              <div className="relative h-32 md:h-40 overflow-hidden bg-gradient-to-br from-pink-100/20 to-purple-100/20 dark:from-pink-900/10 dark:to-purple-900/10">
                {image && !hasError ? (
                  <Image
                    src={image}
                    alt={cat.name.fa}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    onError={() => handleImageError(cat.id)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl">
                    {cat.icon || categoryIcons[cat.id] || "📦"}
                  </div>
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Category name on image */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-sm md:text-base font-bold text-white drop-shadow-lg text-right">
                    {cat.name.fa}
                  </h3>
                  <p className="text-xs text-white/80 text-right">
                    {cat.count} محصول
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* View All Categories */}
      <div className="text-center mt-8">
        <Link
          href="/categories"
          className="
            inline-block px-6 py-2 rounded-full
            glass hover:bg-white/10 transition-colors
            text-sm font-medium
          "
        >
          مشاهده همه دسته‌بندی‌ها
        </Link>
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
