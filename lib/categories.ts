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
  const categories = await getCategoriesFromProducts(products);

  // Ensure categories have Persian names
  return categories.map((cat) => ({
    ...cat,
    name: {
      fa: getPersianCategoryName(cat.id),
      en: cat.name.en,
    },
  }));
}

// Get category by slug (automatically fetches products)
export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  const category = await getCategoryFromProducts(slug);

  if (!category) return null;

  // Ensure category has Persian name
  return {
    ...category,
    name: {
      fa: getPersianCategoryName(category.id),
      en: category.name.en,
    },
  };
}

// Helper function to get Persian category names
function getPersianCategoryName(id: string): string {
  const names: Record<string, string> = {
    "butt-plugs": "بات پلاگ",
    dildos: "دیلدو",
    vibrators: "ویبراتور",
    "penis-sleeves": "روکش آلت",
    whips: "شلاق",
    "cock-rings": "حلقه تاخیر",
    bondage: "بی دی اس ام",
    gags: "گگ",
    "anal-beads": "آنال بال",
    belts: "کمربند",
    "artificial-vagina": "واژن مصنوعی",
    lubricants: "روان‌کننده",
    massagers: "ماساژور",
    pumps: "پمپ",
    kits: "ست",
  };
  return names[id] || id;
}
