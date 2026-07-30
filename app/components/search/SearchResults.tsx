// app/components/search/SearchResults.tsx
"use client";

import { Product } from "@/types/product";
import ProductCard from "../products/ProductCard";
import { Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

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
      <div className="text-center py-16">
        <Search className="w-20 h-20 mx-auto text-muted mb-6 opacity-30" />
        <p className="text-xl text-muted">
          برای جستجو، عبارت مورد نظر را وارد کنید
        </p>
        <p className="text-sm text-muted mt-2">
          مثلاً: دیلدو، ویبراتور، بات پلاگ
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-xl font-bold mb-2">
          نتیجه‌ای برای "{query}" یافت نشد
        </p>
        <p className="text-muted text-sm">لطفاً عبارت دیگری را امتحان کنید</p>

        {suggestions && suggestions.length > 0 && (
          <div className="mt-6">
            <p className="text-sm text-muted mb-3">پیشنهادات:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.slice(0, 5).map((suggestion) => (
                <Link
                  key={suggestion}
                  href={`/search?q=${encodeURIComponent(suggestion)}`}
                  className="px-4 py-2 text-sm rounded-full glass hover:bg-white/10 transition-colors"
                >
                  {suggestion}
                </Link>
              ))}
            </div>
          </div>
        )}

        <Link
          href="/products"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full glass hover:bg-white/10 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          مشاهده همه محصولات
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <span className="text-muted text-sm">
          {total} نتیجه برای{" "}
          <span className="font-bold text-primary">"{query}"</span>
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
