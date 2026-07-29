// lib/categories.ts
import {
  getAllProducts,
  getAllCategories as getCategoriesFromProducts,
  getCategoryBySlug as getCategoryFromProducts,
  getCategoriesData,
  getSubcategoriesData,
} from "./products";
import { Category } from "@/types/product";

// Re-export helper functions
export { getCategoriesData, getSubcategoriesData } from "./products";

// Get all categories with product counts (automatically fetches products)
export async function getAllCategories(): Promise<Category[]> {
  const products = await getAllProducts();
  return getCategoriesFromProducts(products);
}

// Get category by slug (automatically fetches products)
export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  return getCategoryFromProducts(slug);
}
