// lib/filters.ts

import { Product, FilterState, FilterOption } from "@/types/product";

export interface FilterOptions {
  categories: FilterOption[];
  subcategories: FilterOption[];
  materials: FilterOption[];
  colors: FilterOption[];
  tags: FilterOption[];
  sizes: FilterOption[];
  priceRange: {
    min: number;
    max: number;
  };
  badges: FilterOption[];
}

export interface AppliedFilters {
  categories: string[];
  subcategories: string[];
  materials: string[];
  colors: string[];
  tags: string[];
  sizes: string[];
  priceRange: {
    min: number | null;
    max: number | null;
  };
  badges: string[];
  search: string;
  sortBy: "newest" | "popular" | "price-asc" | "price-desc" | "relevance";
  inStock: boolean;
  onSale: boolean;
}

export class ProductFilter {
  private products: Product[];
  private filters: AppliedFilters;

  constructor(products: Product[], initialFilters?: Partial<AppliedFilters>) {
    this.products = products;
    this.filters = {
      categories: [],
      subcategories: [],
      materials: [],
      colors: [],
      tags: [],
      sizes: [],
      priceRange: { min: null, max: null },
      badges: [],
      search: "",
      sortBy: "relevance",
      inStock: false,
      onSale: false,
      ...initialFilters,
    };
  }

  // Get all unique filter options from products
  static getFilterOptions(products: Product[]): FilterOptions {
    const categories = new Map<string, number>();
    const subcategories = new Map<string, number>();
    const materials = new Map<string, number>();
    const colors = new Map<string, number>();
    const tags = new Map<string, number>();
    const sizes = new Map<string, number>();
    const badges = new Map<string, number>();

    let minPrice = Infinity;
    let maxPrice = -Infinity;

    for (const product of products) {
      // Categories
      if (product.categoryId) {
        categories.set(
          product.categoryId,
          (categories.get(product.categoryId) || 0) + 1,
        );
      }

      // Subcategories
      if (product.subcategoryId) {
        subcategories.set(
          product.subcategoryId,
          (subcategories.get(product.subcategoryId) || 0) + 1,
        );
      }

      // Materials
      for (const materialId of product.materialIds || []) {
        materials.set(materialId, (materials.get(materialId) || 0) + 1);
      }

      // Colors
      for (const colorId of product.colorIds || []) {
        colors.set(colorId, (colors.get(colorId) || 0) + 1);
      }

      // Tags
      for (const tagId of product.tagIds || []) {
        tags.set(tagId, (tags.get(tagId) || 0) + 1);
      }

      // Sizes
      if (product.specifications?.size) {
        sizes.set(
          product.specifications.size,
          (sizes.get(product.specifications.size) || 0) + 1,
        );
      }

      // Badges
      for (const badge of product.badges || []) {
        badges.set(badge, (badges.get(badge) || 0) + 1);
      }

      // Price range
      if (product.price !== null && product.price !== undefined) {
        if (product.price < minPrice) minPrice = product.price;
        if (product.price > maxPrice) maxPrice = product.price;
      }
    }

    // Helper to get label for category IDs
    const getCategoryLabel = (id: string): string => {
      const labels: Record<string, string> = {
        // Main categories
        vibrators: "ویبراتور",
        dildos: "دیلدو",
        "anal-toys": "اسباب‌بازی مقعدی",
        "male-toys": "اسباب‌بازی مردانه",
        "strap-ons": "استرپ‌آن",
        bdsm: "BDSM",
        lubricants: "روان‌کننده",
        "delay-products": "محصولات تاخیری",
        condoms: "کاندوم",
        "cleaning-products": "محصولات نظافتی",
        accessories: "لوازم جانبی",

        // Subcategories
        "butt-plugs": "بات پلاگ",
        "sleeves-extenders": "روکش و اکستندر",
        "cock-rings": "حلقه آلت",
        "artificial-vagina": "واژن مصنوعی",
        whips: "شلاق",
        gags: "گگ",
        belts: "کمربند",

        // Legacy (keep for backward compatibility)
        "penis-sleeves": "روکش آلت",
        bondage: "بی دی اس ام",
        "anal-beads": "آنال بال",
      };
      return labels[id] || id;
    };

    // Helper to get label for material IDs
    const getMaterialLabel = (id: string): string => {
      const labels: Record<string, string> = {
        silicone: "سیلیکونی",
        steel: "استیل",
        "pu-leather": "چرم PU",
        wood: "چوبی",
        abs: "ABS",
        silk: "ابریشم",
        glass: "شیشه‌ای",
        metal: "فلزی",
        tpe: "TPE",
        cyberskin: "سایبراسکین",
        latex: "لاتکس",
        rubber: "لاستیک",
      };
      return labels[id] || id;
    };

    // Helper to get label for color IDs
    const getColorLabel = (id: string): string => {
      const labels: Record<string, string> = {
        random: "رندوم",
        red: "قرمز",
        pink: "صورتی",
        black: "مشکی",
        "skin-tone": "رنگ پوست",
        cream: "کرمی",
        silver: "نقره‌ای",
        gold: "طلایی",
        purple: "بنفش",
        blue: "آبی",
        green: "سبز",
        white: "سفید",
        clear: "شفاف",
        rainbow: "رنگین‌کمان",
        "multi-color": "چند رنگ",
      };
      return labels[id] || id;
    };

    // Helper to get label for size IDs
    const getSizeLabel = (id: string): string => {
      const labels: Record<string, string> = {
        XS: "XXS",
        S: "کوچک",
        M: "متوسط",
        L: "بزرگ",
        XL: "بزرگتر",
        XXL: "غول",
        adjustable: "قابل تنظیم",
        "one-size": "یک سایز",
      };
      return labels[id] || id;
    };

    // Helper to get label for badge IDs
    const getBadgeLabel = (id: string): string => {
      const labels: Record<string, string> = {
        new: "جدید",
        popular: "محبوب",
        "best-seller": "پرفروش",
        premium: "ویژه",
        trending: "پرطرفدار",
        recommended: "پیشنهادی",
        budget: "اقتصادی",
        compact: "جمع و جور",
        beginner: "مناسب مبتدیان",
        anal: "مقعدی",
        couples: "دو نفره",
        bdsm: "BDSM",
        rechargeable: "شارژی",
        powerful: "قدرتمند",
        challenge: "چالش‌برانگیز",
        xl: "بزرگ",
        xxl: "غول",
        electric: "برقی",
        classic: "کلاسیک",
        imported: "وارداتی",
        "on-sale": "تخفیف",
        limited: "محدود",
      };
      return labels[id] || id;
    };

    return {
      categories: Array.from(categories.entries())
        .map(([id, count]) => ({
          id,
          label: getCategoryLabel(id),
          count,
        }))
        .sort((a, b) => b.count - a.count),
      subcategories: Array.from(subcategories.entries())
        .map(([id, count]) => ({
          id,
          label: id.replace(/_/g, " "),
          count,
        }))
        .sort((a, b) => b.count - a.count),
      materials: Array.from(materials.entries())
        .map(([id, count]) => ({
          id,
          label: getMaterialLabel(id),
          count,
        }))
        .sort((a, b) => b.count - a.count),
      colors: Array.from(colors.entries())
        .map(([id, count]) => ({
          id,
          label: getColorLabel(id),
          count,
        }))
        .sort((a, b) => b.count - a.count),
      tags: Array.from(tags.entries())
        .map(([id, count]) => ({
          id,
          label: id.replace(/_/g, " "),
          count,
        }))
        .sort((a, b) => b.count - a.count),
      sizes: Array.from(sizes.entries())
        .map(([id, count]) => ({
          id,
          label: getSizeLabel(id),
          count,
        }))
        .sort((a, b) => b.count - a.count),
      badges: Array.from(badges.entries())
        .map(([id, count]) => ({
          id,
          label: getBadgeLabel(id),
          count,
        }))
        .sort((a, b) => b.count - a.count),
      priceRange: {
        min: minPrice === Infinity ? 0 : minPrice,
        max: maxPrice === -Infinity ? 0 : maxPrice,
      },
    };
  }

  // Apply all filters and return filtered products
  apply(): Product[] {
    let results = [...this.products];

    // Search filter
    if (this.filters.search.trim()) {
      const searchTerm = this.filters.search.toLowerCase().trim();
      results = results.filter((product) => {
        const nameFa = product.name.fa.toLowerCase();
        const nameEn = product.name.en.toLowerCase();
        const code = product.code.toLowerCase();
        const keywords = (product.keywords || []).join(" ").toLowerCase();
        const description = product.description.short.toLowerCase();

        return (
          nameFa.includes(searchTerm) ||
          nameEn.includes(searchTerm) ||
          code.includes(searchTerm) ||
          keywords.includes(searchTerm) ||
          description.includes(searchTerm)
        );
      });
    }

    // Category filter
    if (this.filters.categories.length > 0) {
      results = results.filter((product) =>
        this.filters.categories.includes(product.categoryId),
      );
    }

    // Subcategory filter
    if (this.filters.subcategories.length > 0) {
      results = results.filter(
        (product) =>
          product.subcategoryId &&
          this.filters.subcategories.includes(product.subcategoryId),
      );
    }

    // Material filter
    if (this.filters.materials.length > 0) {
      results = results.filter((product) =>
        product.materialIds?.some((m) => this.filters.materials.includes(m)),
      );
    }

    // Color filter
    if (this.filters.colors.length > 0) {
      results = results.filter((product) =>
        product.colorIds?.some((c) => this.filters.colors.includes(c)),
      );
    }

    // Tag filter
    if (this.filters.tags.length > 0) {
      results = results.filter((product) =>
        product.tagIds?.some((t) => this.filters.tags.includes(t)),
      );
    }

    // Size filter
    if (this.filters.sizes.length > 0) {
      results = results.filter(
        (product) =>
          product.specifications?.size &&
          this.filters.sizes.includes(product.specifications.size),
      );
    }

    // Price range filter
    if (this.filters.priceRange.min !== null) {
      results = results.filter(
        (product) =>
          product.price !== null &&
          product.price !== undefined &&
          product.price >= this.filters.priceRange.min!,
      );
    }
    if (this.filters.priceRange.max !== null) {
      results = results.filter(
        (product) =>
          product.price !== null &&
          product.price !== undefined &&
          product.price <= this.filters.priceRange.max!,
      );
    }

    // Badge filter
    if (this.filters.badges.length > 0) {
      results = results.filter((product) =>
        product.badges?.some((b) => this.filters.badges.includes(b)),
      );
    }

    // In stock filter
    if (this.filters.inStock) {
      results = results.filter((product) => product.status === "available");
    }

    // On sale filter (price reduced)
    if (this.filters.onSale) {
      results = results.filter((product) => product.salePrice !== undefined);
    }

    // Sort
    results = this.sort(results);

    return results;
  }

  // Sort products
  private sort(products: Product[]): Product[] {
    const { sortBy } = this.filters;

    switch (sortBy) {
      case "newest":
        return products.sort((a, b) => parseInt(b.id) - parseInt(a.id));

      case "popular":
        return products.sort((a, b) => (b.reactions || 0) - (a.reactions || 0));

      case "price-asc":
        return products.sort((a, b) => {
          const priceA = a.salePrice ?? a.price ?? Infinity;
          const priceB = b.salePrice ?? b.price ?? Infinity;
          return priceA - priceB;
        });

      case "price-desc":
        return products.sort((a, b) => {
          const priceA = a.salePrice ?? a.price ?? 0;
          const priceB = b.salePrice ?? b.price ?? 0;
          return priceB - priceA;
        });

      case "relevance":
      default:
        return products;
    }
  }

  // Update filters
  setFilters(filters: Partial<AppliedFilters>): void {
    this.filters = { ...this.filters, ...filters };
  }

  // Get current filters
  getFilters(): AppliedFilters {
    return { ...this.filters };
  }

  // Clear all filters
  clearFilters(): void {
    this.filters = {
      categories: [],
      subcategories: [],
      materials: [],
      colors: [],
      tags: [],
      sizes: [],
      priceRange: { min: null, max: null },
      badges: [],
      search: "",
      sortBy: "relevance",
      inStock: false,
      onSale: false,
    };
  }

  // Toggle a filter value
  toggleFilter(
    filterType: keyof Omit<
      AppliedFilters,
      "priceRange" | "search" | "sortBy" | "inStock" | "onSale"
    >,
    value: string,
  ): void {
    const current = this.filters[filterType] as string[];
    const index = current.indexOf(value);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(value);
    }
  }

  // Check if a filter is active
  isFilterActive(
    filterType: keyof Omit<
      AppliedFilters,
      "priceRange" | "search" | "sortBy" | "inStock" | "onSale"
    >,
    value: string,
  ): boolean {
    const current = this.filters[filterType] as string[];
    return current.includes(value);
  }

  // Get active filter count
  getActiveFilterCount(): number {
    let count = 0;
    if (this.filters.categories.length) count++;
    if (this.filters.subcategories.length) count++;
    if (this.filters.materials.length) count++;
    if (this.filters.colors.length) count++;
    if (this.filters.tags.length) count++;
    if (this.filters.sizes.length) count++;
    if (this.filters.badges.length) count++;
    if (
      this.filters.priceRange.min !== null ||
      this.filters.priceRange.max !== null
    )
      count++;
    if (this.filters.inStock) count++;
    if (this.filters.onSale) count++;
    if (this.filters.search.trim()) count++;
    return count;
  }
}

// Helper function to get price range for slider
export function getPriceRange(products: Product[]): {
  min: number;
  max: number;
} {
  const prices = products
    .map((p) => p.salePrice ?? p.price)
    .filter((p): p is number => p !== null && p !== undefined);

  if (prices.length === 0) {
    return { min: 0, max: 0 };
  }

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

// Helper to check if product matches search
export function productMatchesSearch(
  product: Product,
  searchTerm: string,
): boolean {
  const term = searchTerm.toLowerCase().trim();
  if (!term) return true;

  const searchableFields = [
    product.name.fa,
    product.name.en,
    product.code,
    product.description.short,
    ...(product.keywords || []),
    ...(product.tagIds || []),
  ];

  return searchableFields.some((field) => field.toLowerCase().includes(term));
}

// Export default for easier importing
export default ProductFilter;
