// app/search/page.tsx
import { getAllProducts } from "@/lib/products";
import { ProductSearch } from "@/lib/search";
import SearchResults from "@/app/components/search/SearchResults";
import SearchBar from "@/app/components/search/SearchBar";
import { Product } from "@/types/product";

interface SearchPageProps {
  searchParams: {
    q?: string;
    page?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const allProducts = await getAllProducts();
  const query = searchParams.q || "";

  let products: Product[] = [];
  let total = 0;
  let suggestions: string[] = [];

  if (query) {
    const searcher = new ProductSearch(allProducts);
    const result = searcher.search(query);
    products = result.products;
    total = result.total;
    suggestions = result.suggestions || [];
  }

  return (
    <>
      <div className="max-w-2xl mx-auto mb-8">
        <SearchBar initialQuery={query} />
      </div>

      <SearchResults
        query={query}
        products={products}
        total={total}
        suggestions={suggestions}
      />
    </>
  );
}
