// app/products/page.tsx
import { getAllProducts } from "@/lib/products";
import { ProductFilter } from "@/lib/filters";
import ProductGrid from "@/app/components/products/ProductGrid";
import FilterSidebar from "@/app/components/products/FilterSidebar";
import { FilterState } from "@/types/product";
import { Suspense } from "react";

interface ProductsPageProps {
  searchParams: {
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
  };
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const allProducts = await getAllProducts();
  const filter = new ProductFilter(allProducts);

  // Build filter state from URL params
  const filterState: Partial<FilterState> = {};

  // Search
  if (searchParams.q) {
    filterState.search = searchParams.q;
  }

  // Categories (supports both single and multiple)
  if (searchParams.categories) {
    filterState.categories = searchParams.categories.split(",");
  } else if (searchParams.category) {
    filterState.categories = [searchParams.category];
  }

  // Materials
  if (searchParams.materials) {
    filterState.materials = searchParams.materials.split(",");
  }

  // Colors
  if (searchParams.colors) {
    filterState.colors = searchParams.colors.split(",");
  }

  // Sizes
  if (searchParams.sizes) {
    filterState.sizes = searchParams.sizes.split(",");
  }

  // Badges
  if (searchParams.badges) {
    filterState.badges = searchParams.badges.split(",");
  }

  // Tags
  if (searchParams.tags) {
    filterState.tags = searchParams.tags.split(",");
  }

  // Price range
  if (searchParams.minPrice || searchParams.maxPrice) {
    filterState.priceRange = {
      min: searchParams.minPrice ? parseInt(searchParams.minPrice) : null,
      max: searchParams.maxPrice ? parseInt(searchParams.maxPrice) : null,
    };
  }

  // Sort
  if (searchParams.sort) {
    filterState.sortBy = searchParams.sort as FilterState["sortBy"];
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
