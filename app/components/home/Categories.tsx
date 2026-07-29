"use client";

import Link from "next/link";

// This will be passed from the parent page with real category data
interface CategoriesProps {
  categories?: Array<{
    id: string;
    name: {
      fa: string;
      en: string;
    };
    slug: string;
    count: number;
    icon?: string;
  }>;
}

export default function Categories({ categories = [] }: CategoriesProps) {
  // If no categories passed, show placeholder
  const displayCategories =
    categories.length > 0
      ? categories
      : [
          {
            id: "butt-plugs",
            name: { fa: "بات پلاگ", en: "Butt Plugs" },
            slug: "butt-plugs",
            count: 0,
          },
          {
            id: "dildos",
            name: { fa: "دیلدو", en: "Dildos" },
            slug: "dildos",
            count: 0,
          },
          {
            id: "vibrators",
            name: { fa: "ویبراتور", en: "Vibrators" },
            slug: "vibrators",
            count: 0,
          },
          {
            id: "penis-sleeves",
            name: { fa: "روکش آلت", en: "Penis Sleeves" },
            slug: "penis-sleeves",
            count: 0,
          },
        ];

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
        {displayCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="
              glass rounded-2xl p-6 text-center shadow-xl
              border border-white/20 dark:border-white/10
              backdrop-blur-xl transition-all
              hover:scale-[1.05] hover:-translate-y-1
              hover:shadow-[0_0_35px_rgba(236,72,153,0.5)]
              duration-300 ease-out
            "
          >
            {/* Icon placeholder - you can replace with actual icons */}
            <div
              className="
              h-24 rounded-xl 
              bg-white/10 dark:bg-black/20 
              border border-white/20 dark:border-white/10 
              backdrop-blur-md 
              flex items-center justify-center 
              text-4xl
              mb-4
            "
            >
              {cat.icon || "📦"}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-primary dark:text-inverse drop-shadow-md">
              {cat.name.fa}
            </h3>

            {/* Count */}
            <p className="text-sm text-muted mt-1">{cat.count} محصول</p>
          </Link>
        ))}
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
