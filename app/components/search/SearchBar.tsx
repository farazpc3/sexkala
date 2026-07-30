// app/components/search/SearchBar.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Product } from "@/types/product";

interface SearchBarProps {
  initialQuery?: string;
  placeholder?: string;
  showResults?: boolean;
}

export default function SearchBar({
  initialQuery = "",
  placeholder = "جستجوی محصولات...",
  showResults = true,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (query.trim().length > 1 && showResults) {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
  }, [query, showResults]);

  const fetchSuggestions = async (searchQuery: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}&limit=5`,
      );
      const data = await response.json();
      setSuggestions(data.products || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsFocused(false);
      setSuggestions([]);
    }
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
    setSuggestions([]);
  };

  const handleSelectSuggestion = (slug: string) => {
    router.push(`/products/${slug}`);
    setIsFocused(false);
    setSuggestions([]);
    setQuery("");
  };

  return (
    <div className="relative w-full">
      <form
        onSubmit={handleSubmit}
        className={`relative flex items-center glass rounded-xl transition-all duration-300 ${
          isFocused ? "ring-2 ring-primary ring-offset-2" : ""
        }`}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setTimeout(() => setIsFocused(false), 200);
          }}
          placeholder={placeholder}
          className="w-full px-4 py-3 pr-12 bg-transparent outline-none text-right"
          dir="rtl"
        />

        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="پاک کردن"
          >
            <X className="w-4 h-4 text-muted" />
          </button>
        )}
      </form>

      {/* Suggestions Dropdown */}
      {isFocused && suggestions.length > 0 && showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 glass rounded-xl overflow-hidden shadow-lg z-50 max-h-80 overflow-y-auto">
          {suggestions.map((product) => (
            <button
              key={product.id}
              onClick={() => handleSelectSuggestion(product.slug)}
              className="w-full text-right px-4 py-3 hover:bg-white/10 transition-colors flex items-center gap-3 border-b border-white/5 last:border-0"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                {product.images?.[0] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.images[0].src}
                    alt={product.name.fa}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">
                  {product.name.fa}
                </div>
                <div className="text-xs text-muted">{product.code}</div>
              </div>
            </button>
          ))}
          <Link
            href={`/search?q=${encodeURIComponent(query)}`}
            className="block text-center py-2 text-sm text-primary hover:bg-white/10 transition-colors border-t border-white/5"
          >
            مشاهده همه نتایج
          </Link>
        </div>
      )}

      {isLoading && isFocused && showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 glass rounded-xl p-4 text-center text-muted z-50">
          در حال جستجو...
        </div>
      )}
    </div>
  );
}
