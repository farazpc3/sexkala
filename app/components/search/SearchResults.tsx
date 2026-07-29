// components/search/SearchResults.tsx
"use client";

import { Product } from "@/types/product";
import ProductCard from "../products/ProductCard";
import { Search } from "lucide-react";

interface SearchResultsProps {
  query: string;
  products: Product[];
  total: number;
  suggestions: string[];
}

export default function SearchResults({
  query,
  products,
  total,
  suggestions,
}: SearchResultsProps) {
  if (!query) {
    return (
      <div className="text-center py-12">
        <Search className="w-16 h-16 mx-auto text-muted mb-4" />
        <p className="text-muted">برای جستجو، عبارت مورد نظر را وارد کنید</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl mb-2">نتیجه‌ای برای "{query}" یافت نشد</p>
        {suggestions && suggestions.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-muted mb-2">پیشنهادات:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.slice(0, 5).map((suggestion) => (
                <span
                  key={suggestion}
                  className="px-3 py-1 text-sm rounded-full glass cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => {
                    window.location.href = `/search?q=${encodeURIComponent(suggestion)}`;
                  }}
                >
                  {suggestion}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm text-muted">
          {total} نتیجه برای "{query}"
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
