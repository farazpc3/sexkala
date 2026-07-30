// app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAllProducts } from "@/lib/products";
import { ProductFilter } from "@/lib/filters";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const allProducts = await getAllProducts();

  const filter = new ProductFilter(allProducts);

  // Build filter state from query params
  const filterState: any = {};

  const categories = searchParams.get("categories");
  if (categories) {
    filterState.categories = categories.split(",");
  }

  const materials = searchParams.get("materials");
  if (materials) {
    filterState.materials = materials.split(",");
  }

  const colors = searchParams.get("colors");
  if (colors) {
    filterState.colors = colors.split(",");
  }

  const tags = searchParams.get("tags");
  if (tags) {
    filterState.tags = tags.split(",");
  }

  const sizes = searchParams.get("sizes");
  if (sizes) {
    filterState.sizes = sizes.split(",");
  }

  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  if (minPrice || maxPrice) {
    filterState.priceRange = {
      min: minPrice ? parseInt(minPrice) : null,
      max: maxPrice ? parseInt(maxPrice) : null,
    };
  }

  const sortBy = searchParams.get("sortBy");
  if (sortBy) {
    filterState.sortBy = sortBy;
  }

  const search = searchParams.get("search");
  if (search) {
    filterState.search = search;
  }

  const inStock = searchParams.get("inStock");
  if (inStock === "true") {
    filterState.inStock = true;
  }

  const onSale = searchParams.get("onSale");
  if (onSale === "true") {
    filterState.onSale = true;
  }

  filter.setFilters(filterState);
  const products = filter.apply();

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const start = (page - 1) * limit;
  const end = start + limit;

  return NextResponse.json({
    products: products.slice(start, end),
    total: products.length,
    page,
    limit,
    totalPages: Math.ceil(products.length / limit),
  });
}
