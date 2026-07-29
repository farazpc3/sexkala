// app/components/products/ProductGrid.tsx
"use client";

import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  total?: number;
  columns?: 2 | 3 | 4 | 5;
  showCount?: boolean;
}

export default function ProductGrid({
  products,
  total,
  columns = 4,
  showCount = true,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-xl text-muted">محصولی یافت نشد</p>
        <p className="text-sm text-muted mt-2">
          لطفاً فیلترهای خود را تغییر دهید
        </p>
      </div>
    );
  }

  const colClasses = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  };

  return (
    <div>
      {showCount && (
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-muted">
            {total || products.length} محصول
          </span>
        </div>
      )}

      <div className={`grid ${colClasses[columns]} gap-4`}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
