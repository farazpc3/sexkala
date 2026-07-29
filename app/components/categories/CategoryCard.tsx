// components/categories/CategoryCard.tsx
"use client";

import Link from "next/link";
import { Category } from "@/types/product";
import { ChevronLeft } from "lucide-react";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`} className="block">
      <div className="glass rounded-xl p-4 text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] group">
        <div className="text-4xl mb-3">📦</div>
        <h3 className="font-medium text-sm mb-1">{category.name.fa}</h3>
        <p className="text-xs text-muted">{category.count} محصول</p>
        <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronLeft className="w-4 h-4 mx-auto text-primary" />
        </div>
      </div>
    </Link>
  );
}
