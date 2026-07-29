// app/api/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAllProducts } from "@/lib/products";
import { ProductSearch } from "@/lib/search";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "";
  const limit = parseInt(searchParams.get("limit") || "20");

  if (!query) {
    return NextResponse.json({
      products: [],
      total: 0,
      query: "",
      suggestions: [],
    });
  }

  const allProducts = await getAllProducts();
  const searcher = new ProductSearch(allProducts, { limit });
  const result = searcher.search(query);

  return NextResponse.json({
    products: result.products,
    total: result.total,
    query: result.query,
    suggestions: result.suggestions,
  });
}
