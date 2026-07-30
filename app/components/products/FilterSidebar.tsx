// app/components/products/FilterSidebar.tsx
"use client";

import { useState, useEffect } from "react";
import { Product, AppliedFilters } from "@/types/product";
import { ProductFilter } from "@/lib/filters";
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterSidebarProps {
  products: Product[];
  currentFilters: AppliedFilters;
}

export default function FilterSidebar({
  products,
  currentFilters,
}: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    categories: true,
    materials: true,
    colors: true,
    sizes: true,
    badges: true,
    price: true,
  });

  const filterOptions = ProductFilter.getFilterOptions(products);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Get current URL params as a string
  const getParamsString = (): string => {
    return searchParams?.toString() || "";
  };

  // Build URL with filters
  const buildFilterUrl = (key: string, value: string): string => {
    const params = new URLSearchParams(searchParams?.toString() || "");

    // Handle different filter types
    if (key === "price") {
      return `/products?${params.toString()}`;
    }

    const currentValues = params.get(key)?.split(",") || [];
    if (currentValues.includes(value)) {
      const newValues = currentValues.filter((v) => v !== value);
      if (newValues.length > 0) {
        params.set(key, newValues.join(","));
      } else {
        params.delete(key);
      }
    } else {
      currentValues.push(value);
      params.set(key, currentValues.join(","));
    }

    return `/products?${params.toString()}`;
  };

  const isFilterActive = (key: string, value: string): boolean => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    const values = params.get(key)?.split(",") || [];
    return values.includes(value);
  };

  const clearAllFilters = () => {
    router.push("/products");
  };

  const hasActiveFilters = (): boolean => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    const filterKeys = [
      "categories",
      "materials",
      "colors",
      "sizes",
      "badges",
      "tags",
    ];
    for (const key of filterKeys) {
      if (params.get(key)) return true;
    }
    if (params.get("minPrice") || params.get("maxPrice")) return true;
    if (params.get("sort")) return true;
    return false;
  };

  const getActiveFilterCount = (): number => {
    let count = 0;
    const params = new URLSearchParams(searchParams?.toString() || "");
    const filterKeys = [
      "categories",
      "materials",
      "colors",
      "sizes",
      "badges",
      "tags",
    ];
    for (const key of filterKeys) {
      const values = params.get(key)?.split(",") || [];
      count += values.length;
    }
    if (params.get("minPrice") || params.get("maxPrice")) count++;
    return count;
  };

  // Get display label for filter values
  const getDisplayLabel = (key: string, id: string): string => {
    // For categories, use the category name from the options
    if (key === "categories") {
      const option = filterOptions.categories.find((c) => c.id === id);
      return option?.label || id;
    }
    if (key === "materials") {
      const option = filterOptions.materials.find((c) => c.id === id);
      return option?.label || id;
    }
    if (key === "colors") {
      const option = filterOptions.colors.find((c) => c.id === id);
      return option?.label || id;
    }
    if (key === "sizes") {
      const option = filterOptions.sizes.find((c) => c.id === id);
      return option?.label || id;
    }
    if (key === "badges") {
      const option = filterOptions.badges.find((c) => c.id === id);
      return option?.label || id;
    }
    return id;
  };

  const renderFilterSection = (
    title: string,
    sectionKey: string,
    options: { id: string; label: string; count: number }[],
    icon?: string,
  ) => {
    if (options.length === 0) return null;

    const isExpanded = expandedSections[sectionKey] !== false;
    const activeCount = options.filter((opt) =>
      isFilterActive(sectionKey, opt.id),
    ).length;

    return (
      <div className="border-b border-white/10 dark:border-white/5 pb-4 last:border-0">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex items-center justify-between py-2 hover:text-primary transition-colors group"
        >
          <div className="flex items-center gap-2">
            {icon && <span className="text-lg">{icon}</span>}
            <span className="font-medium text-sm">{title}</span>
            {activeCount > 0 && (
              <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">
                {activeCount}
              </span>
            )}
          </div>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
          )}
        </button>

        {isExpanded && (
          <div className="mt-2 space-y-1.5 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
            {options.map((option) => {
              const active = isFilterActive(sectionKey, option.id);
              return (
                <a
                  key={option.id}
                  href={buildFilterUrl(sectionKey, option.id)}
                  className={`
                    flex items-center justify-between px-2 py-1.5 rounded-lg
                    transition-all duration-200 text-sm
                    hover:bg-white/10 dark:hover:bg-white/5
                    ${active ? "bg-primary/10 text-primary" : "text-muted hover:text-primary"}
                  `}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(buildFilterUrl(sectionKey, option.id));
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`
                      w-4 h-4 rounded border-2 flex items-center justify-center
                      transition-all duration-200
                      ${
                        active
                          ? "border-primary bg-primary"
                          : "border-muted/30 hover:border-primary/50"
                      }
                    `}
                    >
                      {active && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </span>
                    <span className={active ? "font-medium" : ""}>
                      {option.label}
                    </span>
                  </span>
                  <span className="text-xs text-muted">{option.count}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const activeCount = getActiveFilterCount();

  return (
    <>
      {/* Mobile Trigger Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed bottom-6 left-6 z-40 p-4 rounded-full glass shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <div className="relative">
          <SlidersHorizontal className="w-6 h-6" />
          {activeCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-primary text-white rounded-full flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
      </button>

      {/* Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:sticky top-20
          w-72 max-w-[85vw] h-[calc(100vh-6rem)] md:h-auto
          bg-background/95 dark:bg-background/95
          backdrop-blur-xl
          border-l md:border border-white/10 dark:border-white/5
          rounded-l-2xl md:rounded-2xl
          shadow-2xl md:shadow-lg
          transition-transform duration-300 ease-out
          z-50 md:z-auto
          flex flex-col
          ${isMobileOpen ? "right-0 translate-x-0" : "right-0 translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 dark:border-white/5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" />
            <h3 className="font-bold">فیلترها</h3>
            {activeCount > 0 && (
              <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                {activeCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters() && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-muted hover:text-primary transition-colors flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                پاک کردن همه
              </button>
            )}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Sections */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {renderFilterSection(
            "دسته‌بندی",
            "categories",
            filterOptions.categories,
            "📁",
          )}

          {renderFilterSection(
            "جنس",
            "materials",
            filterOptions.materials,
            "🔧",
          )}

          {renderFilterSection("رنگ", "colors", filterOptions.colors, "🎨")}

          {renderFilterSection("سایز", "sizes", filterOptions.sizes, "📐")}

          {renderFilterSection(
            "برچسب‌ها",
            "badges",
            filterOptions.badges,
            "🏷️",
          )}

          {/* Price Range Filter */}
          <div className="border-b border-white/10 dark:border-white/5 pb-4">
            <button
              onClick={() => toggleSection("price")}
              className="w-full flex items-center justify-between py-2 hover:text-primary transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">💰</span>
                <span className="font-medium text-sm">قیمت</span>
              </div>
              {expandedSections.price !== false ? (
                <ChevronUp className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
              )}
            </button>

            {expandedSections.price !== false && (
              <div className="mt-3 px-1">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-muted">از</label>
                    <input
                      type="number"
                      placeholder="۰"
                      className="w-full mt-1 px-3 py-1.5 text-sm rounded-lg glass bg-transparent outline-none border border-white/10 focus:border-primary transition-colors"
                      onChange={(e) => {
                        const params = new URLSearchParams(
                          searchParams?.toString() || "",
                        );
                        if (e.target.value) {
                          params.set("minPrice", e.target.value);
                        } else {
                          params.delete("minPrice");
                        }
                        router.push(`/products?${params.toString()}`);
                      }}
                      defaultValue={searchParams?.get("minPrice") || ""}
                    />
                  </div>
                  <span className="text-muted text-sm">تا</span>
                  <div className="flex-1">
                    <label className="text-xs text-muted">تا</label>
                    <input
                      type="number"
                      placeholder="∞"
                      className="w-full mt-1 px-3 py-1.5 text-sm rounded-lg glass bg-transparent outline-none border border-white/10 focus:border-primary transition-colors"
                      onChange={(e) => {
                        const params = new URLSearchParams(
                          searchParams?.toString() || "",
                        );
                        if (e.target.value) {
                          params.set("maxPrice", e.target.value);
                        } else {
                          params.delete("maxPrice");
                        }
                        router.push(`/products?${params.toString()}`);
                      }}
                      defaultValue={searchParams?.get("maxPrice") || ""}
                    />
                  </div>
                </div>
                <div className="text-xs text-muted mt-2 text-center">
                  قیمت به تومان
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 dark:border-white/5">
          <button
            onClick={() => setIsMobileOpen(false)}
            className="w-full py-2.5 rounded-xl glass hover:bg-white/10 transition-colors text-sm font-medium md:hidden"
          >
            اعمال فیلترها
          </button>
        </div>
      </div>
    </>
  );
}
