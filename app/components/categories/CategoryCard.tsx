// app/components/categories/CategoryCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types/product";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

interface CategoryCardProps {
  category: Category;
  image?: string;
}

export default function CategoryCard({ category, image }: CategoryCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/categories/${category.slug}`} className="block">
      <div className="glass rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] group">
        <div className="relative h-32 overflow-hidden bg-gradient-to-br from-pink-100/20 to-purple-100/20 dark:from-pink-900/10 dark:to-purple-900/10">
          {image && !imageError ? (
            <Image
              src={image}
              alt={category.name.fa}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">
              📦
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="font-medium text-sm text-white drop-shadow-lg text-right">
              {category.name.fa}
            </h3>
            <p className="text-xs text-white/80 text-right">
              {category.count} محصول
            </p>
          </div>
        </div>
        <div className="p-3 text-center">
          <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronLeft className="w-4 h-4 mx-auto text-primary" />
          </div>
        </div>
      </div>
    </Link>
  );
}
