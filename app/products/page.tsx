// app/products/page.tsx
import { getAllProducts } from "@/lib/products";
import { ProductFilter } from "@/lib/filters";
import ProductGrid from "@/app/components/products/ProductGrid";
import FilterSidebar from "@/app/components/products/FilterSidebar";
import { FilterState } from "@/types/product";
import { Suspense } from "react";

interface ProductsPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    categories?: string;
    materials?: string;
    colors?: string;
    sizes?: string;
    badges?: string;
    tags?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  // ✅ Must await searchParams before accessing its properties
  const params = await searchParams;

  const allProducts = await getAllProducts();
  const filter = new ProductFilter(allProducts);

  // Build filter state from URL params
  const filterState: Partial<FilterState> = {};

  // Search
  if (params.q) {
    filterState.search = params.q;
  }

  // Categories (supports both single and multiple)
  if (params.categories) {
    filterState.categories = params.categories.split(",");
  } else if (params.category) {
    filterState.categories = [params.category];
  }

  // Materials
  if (params.materials) {
    filterState.materials = params.materials.split(",");
  }

  // Colors
  if (params.colors) {
    filterState.colors = params.colors.split(",");
  }

  // Sizes
  if (params.sizes) {
    filterState.sizes = params.sizes.split(",");
  }

  // Badges
  if (params.badges) {
    filterState.badges = params.badges.split(",");
  }

  // Tags
  if (params.tags) {
    filterState.tags = params.tags.split(",");
  }

  // Price range
  if (params.minPrice || params.maxPrice) {
    filterState.priceRange = {
      min: params.minPrice ? parseInt(params.minPrice) : null,
      max: params.maxPrice ? parseInt(params.maxPrice) : null,
    };
  }

  // Sort
  if (params.sort) {
    filterState.sortBy = params.sort as FilterState["sortBy"];
  }

  filter.setFilters(filterState);
  const products = filter.apply();

  return (
    <Suspense
      fallback={<div className="text-center py-12">در حال بارگذاری...</div>}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <FilterSidebar
          products={allProducts}
          currentFilters={filter.getFilters()}
        />
        <main className="flex-1">
          <ProductGrid products={products} total={products.length} />
        </main>
      </div>
    </Suspense>
  );
}
