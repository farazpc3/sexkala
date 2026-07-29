// components/categories/CategoryHeader.tsx
"use client";

import { Category } from "@/types/product";

interface CategoryHeaderProps {
  category: Category;
  totalProducts: number;
}

export default function CategoryHeader({
  category,
  totalProducts,
}: CategoryHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">{category.name.fa}</h1>
      {category.description && (
        <p className="text-muted">{category.description}</p>
      )}
      <p className="text-sm text-muted mt-2">
        {totalProducts} محصول در این دسته‌بندی
      </p>

      {category.subcategories && category.subcategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {category.subcategories.map((sub) => (
            <span
              key={sub.id}
              className="px-3 py-1 text-xs rounded-full glass cursor-default"
            >
              {sub.name.fa} ({sub.count})
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
