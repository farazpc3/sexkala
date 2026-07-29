// components/products/FilterSidebar.tsx
"use client";

import { useState } from "react";
import { Product, FilterState, FilterOptions } from "@/types/product";
import { ProductFilter } from "@/lib/fitlers";
import { ChevronDown, ChevronUp, X } from "lucide-react";

interface FilterSidebarProps {
  products: Product[];
  currentFilters: FilterState;
}

export default function FilterSidebar({
  products,
  currentFilters,
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    categories: true,
    materials: true,
    colors: true,
    sizes: true,
    badges: true,
  });

  const filterOptions = ProductFilter.getFilterOptions(products);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderFilterSection = (
    title: string,
    sectionKey: string,
    options: { id: string; label: string; count: number }[],
    selectedIds: string[],
  ) => {
    if (options.length === 0) return null;

    const isExpanded = expandedSections[sectionKey] !== false;

    return (
      <div className="filter-section border-b border-white/10 pb-4">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="filter-section-title w-full flex justify-between items-center"
        >
          <span>{title}</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {isExpanded && (
          <div className="space-y-2 mt-2">
            {options.map((option) => (
              <label key={option.id} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(option.id)}
                  onChange={() => {
                    // Handle filter toggle - this would need to update URL or state
                    console.log(`Toggle ${option.id}`);
                  }}
                />
                <span>{option.label}</span>
                <span className="text-xs text-muted">({option.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="glass rounded-xl p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">فیلترها</h3>
        <button
          className="text-sm text-muted hover:text-primary transition-colors flex items-center gap-1"
          onClick={() => {
            // Clear filters logic
            console.log("Clear filters");
          }}
        >
          <X className="w-4 h-4" />
          پاک کردن همه
        </button>
      </div>

      {renderFilterSection(
        "دسته‌بندی",
        "categories",
        filterOptions.categories,
        currentFilters.categories,
      )}

      {renderFilterSection(
        "جنس",
        "materials",
        filterOptions.materials,
        currentFilters.materials,
      )}

      {renderFilterSection(
        "رنگ",
        "colors",
        filterOptions.colors,
        currentFilters.colors,
      )}

      {renderFilterSection(
        "سایز",
        "sizes",
        filterOptions.sizes,
        currentFilters.sizes,
      )}

      {renderFilterSection(
        "برچسب‌ها",
        "badges",
        filterOptions.badges,
        currentFilters.badges,
      )}
    </div>
  );
}
