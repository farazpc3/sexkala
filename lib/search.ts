// lib/search.ts

import { Product, FilterState, SearchResult } from "@/types/product";

export interface SearchOptions {
  fuzzy?: boolean;
  matchAll?: boolean;
  minScore?: number;
  limit?: number;
  fields?: SearchField[];
}

export type SearchField =
  | "name.fa"
  | "name.en"
  | "code"
  | "description.short"
  | "description.full"
  | "keywords"
  | "tagIds"
  | "categoryId";

export class ProductSearch {
  private products: Product[];
  private options: SearchOptions;

  constructor(products: Product[], options: SearchOptions = {}) {
    this.products = products;
    this.options = {
      fuzzy: true,
      matchAll: false,
      minScore: 0.3,
      limit: 50,
      fields: [
        "name.fa",
        "name.en",
        "code",
        "description.short",
        "keywords",
        "tagIds",
        "categoryId",
      ],
      ...options,
    };
  }

  // Main search method
  search(query: string, filters?: Partial<FilterState>): SearchResult {
    const normalizedQuery = this.normalizeText(query.trim());

    if (!normalizedQuery) {
      return {
        products: this.applyFilters(this.products, filters || {}),
        total: this.products.length,
        query: "",
        suggestions: [],
        filters: filters as FilterState,
      };
    }

    // Score all products
    const scored = this.products.map((product) => ({
      product,
      score: this.calculateScore(product, normalizedQuery),
    }));

    // Filter by minimum score
    let results = scored
      .filter((item) => item.score >= (this.options.minScore || 0))
      .sort((a, b) => b.score - a.score);

    // Apply filters
    let filteredProducts = results.map((r) => r.product);
    if (filters) {
      filteredProducts = this.applyFilters(filteredProducts, filters);
    }

    // Get suggestions
    const suggestions = this.getSuggestions(normalizedQuery);

    return {
      products: filteredProducts.slice(0, this.options.limit || 50),
      total: filteredProducts.length,
      query: query,
      suggestions: suggestions,
      filters: filters as FilterState,
    };
  }

  // Calculate relevance score for a product
  private calculateScore(product: Product, query: string): number {
    let score = 0;
    const fields = this.options.fields || [];

    for (const field of fields) {
      const value = this.getFieldValue(product, field);
      const fieldScore = this.matchScore(value, query, field);
      score += fieldScore * this.getFieldWeight(field);
    }

    // Bonus for exact code match
    if (product.code.toLowerCase() === query) {
      score += 2;
    }

    // Bonus for matching tags
    if (product.tagIds?.some((tag) => tag.includes(query))) {
      score += 0.5;
    }

    return score;
  }

  // Get field value from product
  private getFieldValue(product: Product, field: SearchField): string {
    switch (field) {
      case "name.fa":
        return product.name.fa;
      case "name.en":
        return product.name.en;
      case "code":
        return product.code;
      case "description.short":
        return product.description.short;
      case "description.full":
        return product.description.full;
      case "keywords":
        return (product.keywords || []).join(" ");
      case "tagIds":
        return (product.tagIds || []).join(" ");
      case "categoryId":
        return product.categoryId;
      default:
        return "";
    }
  }

  // Calculate match score between text and query
  private matchScore(text: string, query: string, field: SearchField): number {
    const normalizedText = this.normalizeText(text);
    const normalizedQuery = this.normalizeText(query);

    // Exact match (highest score)
    if (normalizedText === normalizedQuery) {
      return 1.0;
    }

    // Contains query (high score)
    if (normalizedText.includes(normalizedQuery)) {
      const position = normalizedText.indexOf(normalizedQuery);
      const proximityBonus = 1 - (position / normalizedText.length) * 0.5;
      return 0.9 * proximityBonus;
    }

    // Word match (medium score)
    const textWords = normalizedText.split(/\s+/);
    const queryWords = normalizedQuery.split(/\s+/);

    let matchCount = 0;
    let totalQueryWords = queryWords.length;

    for (const queryWord of queryWords) {
      for (const textWord of textWords) {
        if (textWord.includes(queryWord) || queryWord.includes(textWord)) {
          matchCount++;
          break;
        }
      }
    }

    if (matchCount > 0) {
      const ratio = matchCount / totalQueryWords;
      return 0.6 * ratio;
    }

    // Partial match with fuzzy (low score)
    if (this.options.fuzzy) {
      for (const textWord of textWords) {
        const distance = this.levenshteinDistance(textWord, normalizedQuery);
        const maxLength = Math.max(textWord.length, normalizedQuery.length);
        if (maxLength > 0) {
          const similarity = 1 - distance / maxLength;
          if (similarity > 0.6) {
            return 0.4 * similarity;
          }
        }
      }
    }

    return 0;
  }

  // Get field weight based on importance
  private getFieldWeight(field: SearchField): number {
    switch (field) {
      case "name.fa":
        return 1.5;
      case "name.en":
        return 1.2;
      case "code":
        return 2.0;
      case "description.short":
        return 0.8;
      case "description.full":
        return 0.5;
      case "keywords":
        return 0.9;
      case "tagIds":
        return 0.7;
      case "categoryId":
        return 0.4;
      default:
        return 0.5;
    }
  }

  // Normalize text for search
  private normalizeText(text: string): string {
    return (
      text
        .toLowerCase()
        .trim()
        // Normalize Persian/Arabic characters
        .replace(/[یي]/g, "ی")
        .replace(/[كک]/g, "ک")
        .replace(/[ۀ]/g, "ه")
        .replace(/[إأآا]/g, "ا")
        .replace(/[ؤ]/g, "و")
        .replace(/[ئ]/g, "ی")
        // Remove extra spaces
        .replace(/\s+/g, " ")
        // Remove special characters but keep Persian/English letters and numbers
        .replace(/[^a-zA-Z0-9آ-ی\s]/g, "")
    );
  }

  // Levenshtein distance for fuzzy matching
  private levenshteinDistance(a: string, b: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        const cost = a[j - 1] === b[i - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost,
        );
      }
    }

    return matrix[b.length][a.length];
  }

  // Apply filters to products
  private applyFilters(
    products: Product[],
    filters: Partial<FilterState>,
  ): Product[] {
    let results = [...products];

    // Category filter
    if (filters.categories && filters.categories.length > 0) {
      results = results.filter((p) =>
        filters.categories!.includes(p.categoryId),
      );
    }

    // Subcategory filter
    if (filters.subcategories && filters.subcategories.length > 0) {
      results = results.filter(
        (p) =>
          p.subcategoryId && filters.subcategories!.includes(p.subcategoryId),
      );
    }

    // Material filter
    if (filters.materials && filters.materials.length > 0) {
      results = results.filter((p) =>
        p.materialIds?.some((m) => filters.materials!.includes(m)),
      );
    }

    // Color filter
    if (filters.colors && filters.colors.length > 0) {
      results = results.filter((p) =>
        p.colorIds?.some((c) => filters.colors!.includes(c)),
      );
    }

    // Tag filter
    if (filters.tags && filters.tags.length > 0) {
      results = results.filter((p) =>
        p.tagIds?.some((t) => filters.tags!.includes(t)),
      );
    }

    // Size filter
    if (filters.sizes && filters.sizes.length > 0) {
      results = results.filter(
        (p) =>
          p.specifications.size &&
          filters.sizes!.includes(p.specifications.size),
      );
    }

    // Price range filter
    if (filters.priceRange) {
      if (filters.priceRange.min !== null) {
        results = results.filter(
          (p) =>
            p.price !== null &&
            p.price !== undefined &&
            p.price >= filters.priceRange!.min!,
        );
      }
      if (filters.priceRange.max !== null) {
        results = results.filter(
          (p) =>
            p.price !== null &&
            p.price !== undefined &&
            p.price <= filters.priceRange!.max!,
        );
      }
    }

    // Badge filter
    if (filters.badges && filters.badges.length > 0) {
      results = results.filter((p) =>
        p.badges?.some((b) => filters.badges!.includes(b)),
      );
    }

    // In stock filter
    if (filters.inStock) {
      results = results.filter((p) => p.status === "available");
    }

    // On sale filter
    if (filters.onSale) {
      results = results.filter((p) => p.salePrice !== undefined);
    }

    return results;
  }

  // Get search suggestions
  private getSuggestions(query: string): string[] {
    const suggestions: string[] = [];
    const seen = new Set<string>();

    // Collect suggestions from product names
    for (const product of this.products) {
      const nameFa = this.normalizeText(product.name.fa);
      if (nameFa.includes(query) && !seen.has(nameFa)) {
        suggestions.push(product.name.fa);
        seen.add(nameFa);
      }

      const nameEn = this.normalizeText(product.name.en);
      if (nameEn.includes(query) && !seen.has(nameEn)) {
        suggestions.push(product.name.en);
        seen.add(nameEn);
      }
    }

    // Collect suggestions from tags
    for (const product of this.products) {
      for (const tag of product.tagIds || []) {
        const normalizedTag = this.normalizeText(tag);
        if (normalizedTag.includes(query) && !seen.has(tag)) {
          suggestions.push(tag);
          seen.add(tag);
        }
      }
    }

    // Collect suggestions from keywords
    for (const product of this.products) {
      for (const keyword of product.keywords || []) {
        const normalizedKeyword = this.normalizeText(keyword);
        if (normalizedKeyword.includes(query) && !seen.has(keyword)) {
          suggestions.push(keyword);
          seen.add(keyword);
        }
      }
    }

    // Sort by relevance (closest match first)
    return suggestions
      .sort((a, b) => {
        const aScore = this.matchScore(a, query, "name.fa");
        const bScore = this.matchScore(b, query, "name.fa");
        return bScore - aScore;
      })
      .slice(0, 10);
  }

  // Highlight search term in text
  highlight(text: string, query: string): string {
    const normalizedQuery = this.normalizeText(query);
    const normalizedText = this.normalizeText(text);

    if (!normalizedText.includes(normalizedQuery)) {
      return text;
    }

    // Find the matched part in the original text (case-insensitive)
    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );
    return text.replace(regex, "<mark>$1</mark>");
  }

  // Get autocomplete suggestions
  autocomplete(query: string): string[] {
    const normalizedQuery = this.normalizeText(query);
    const suggestions: string[] = [];
    const seen = new Set<string>();

    if (!normalizedQuery) {
      return [];
    }

    // Get from product names
    for (const product of this.products) {
      const nameFa = product.name.fa;
      const normalizedNameFa = this.normalizeText(nameFa);
      if (normalizedNameFa.startsWith(normalizedQuery) && !seen.has(nameFa)) {
        suggestions.push(nameFa);
        seen.add(nameFa);
      }

      const nameEn = product.name.en;
      const normalizedNameEn = this.normalizeText(nameEn);
      if (normalizedNameEn.startsWith(normalizedQuery) && !seen.has(nameEn)) {
        suggestions.push(nameEn);
        seen.add(nameEn);
      }
    }

    // Get from tags
    for (const product of this.products) {
      for (const tag of product.tagIds || []) {
        const normalizedTag = this.normalizeText(tag);
        if (normalizedTag.startsWith(normalizedQuery) && !seen.has(tag)) {
          suggestions.push(tag);
          seen.add(tag);
        }
      }
    }

    return suggestions.slice(0, 10);
  }
}

// Helper function for fuzzy search
export function fuzzySearch(
  products: Product[],
  query: string,
  threshold: number = 0.6,
): Product[] {
  const searcher = new ProductSearch(products, {
    fuzzy: true,
    minScore: threshold,
  });
  const result = searcher.search(query);
  return result.products;
}

// Helper function for exact search
export function exactSearch(products: Product[], query: string): Product[] {
  const searcher = new ProductSearch(products, { fuzzy: false });
  const result = searcher.search(query);
  return result.products;
}

// Helper function for quick search (used in navbar)
export function quickSearch(
  products: Product[],
  query: string,
  limit: number = 5,
): Product[] {
  const searcher = new ProductSearch(products, { limit, minScore: 0.4 });
  const result = searcher.search(query);
  return result.products;
}

// Helper to get search suggestions for UI
export function getSearchSuggestions(
  products: Product[],
  query: string,
): string[] {
  const searcher = new ProductSearch(products);
  return searcher.autocomplete(query);
}
