// app/products/page.tsx
import { getAllProducts } from "@/lib/products";
import { ProductFilter } from "@/lib/fitlers";
import ProductGrid from "@/app/components/products/ProductGrid";
import FilterSidebar from "@/app/components/products/FilterSidebar";
import { FilterState } from "@/types/product";

interface ProductsPageProps {
  searchParams: {
    q?: string;
    category?: string;
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

  if (searchParams.q) {
    filterState.search = searchParams.q;
  }

  if (searchParams.category) {
    filterState.categories = [searchParams.category];
  }

  if (searchParams.sort) {
    filterState.sortBy = searchParams.sort as FilterState["sortBy"];
  }

  filter.setFilters(filterState);
  const products = filter.apply();

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <aside className="md:w-72 flex-shrink-0">
        <FilterSidebar
          products={allProducts}
          currentFilters={filter.getFilters()}
        />
      </aside>
      <main className="flex-1">
        <ProductGrid products={products} total={products.length} />
      </main>
    </div>
  );
}
