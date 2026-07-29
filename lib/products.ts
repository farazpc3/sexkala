// lib/products.ts
import fs from "fs";
import path from "path";
import { Product, Category, Subcategory } from "@/types/product";

const productsDirectory = path.join(process.cwd(), "data/products");

// Cache for products to avoid reading files on every request
let productsCache: Product[] | null = null;
let productsCacheTime: number = 0;
const CACHE_TTL = 60000; // 1 minute

// Get all products
export async function getAllProducts(): Promise<Product[]> {
  // Check cache
  const now = Date.now();
  if (productsCache && now - productsCacheTime < CACHE_TTL) {
    return productsCache;
  }

  try {
    // Check if directory exists
    if (!fs.existsSync(productsDirectory)) {
      console.warn("Products directory not found, returning empty array");
      return [];
    }

    const productFolders = fs.readdirSync(productsDirectory);

    const products: Product[] = [];

    for (const folder of productFolders) {
      const productPath = path.join(productsDirectory, folder, "product.json");

      if (fs.existsSync(productPath)) {
        try {
          const fileContent = fs.readFileSync(productPath, "utf-8");
          const product = JSON.parse(fileContent) as Product;
          products.push(product);
        } catch (error) {
          console.error(`Error reading product ${folder}:`, error);
        }
      }
    }

    // Sort by sortOrder
    products.sort(
      (a, b) => (a.display?.sortOrder || 0) - (b.display?.sortOrder || 0),
    );

    // Update cache
    productsCache = products;
    productsCacheTime = now;

    return products;
  } catch (error) {
    console.error("Error loading products:", error);
    return [];
  }
}

// Get product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getAllProducts();
  return products.find((product) => product.slug === slug) || null;
}

// Get product by ID
export async function getProductById(id: string): Promise<Product | null> {
  const products = await getAllProducts();
  return products.find((product) => product.id === id) || null;
}

// Get products by category
export function getProductsByCategory(
  products: Product[],
  categoryId: string,
): Product[] {
  return products.filter((product) => product.categoryId === categoryId);
}

// Get products by subcategory
export function getProductsBySubcategory(
  products: Product[],
  subcategoryId: string,
): Product[] {
  return products.filter((product) => product.subcategoryId === subcategoryId);
}

// Get featured products
export function getFeaturedProducts(products: Product[]): Product[] {
  return products.filter((product) => product.display?.featured === true);
}

// Get new products (sorted by ID descending)
export function getNewProducts(
  products: Product[],
  limit: number = 10,
): Product[] {
  return [...products]
    .sort((a, b) => parseInt(b.id) - parseInt(a.id))
    .slice(0, limit);
}

// Get popular products (by reactions)
export function getPopularProducts(
  products: Product[],
  limit: number = 10,
): Product[] {
  return [...products]
    .sort((a, b) => (b.reactions || 0) - (a.reactions || 0))
    .slice(0, limit);
}

// Get related products
export function getRelatedProducts(
  products: Product[],
  product: Product,
  limit: number = 6,
): Product[] {
  // Get products from same category, excluding the current product
  const sameCategory = products.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id,
  );

  // If we have enough products from same category, return them
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  // Otherwise, get products with similar tags
  const remaining = limit - sameCategory.length;
  const productTagIds = product.tagIds || [];

  const similarByTags = products
    .filter(
      (p) =>
        p.id !== product.id &&
        !sameCategory.includes(p) &&
        (p.tagIds || []).some((tag) => productTagIds.includes(tag)),
    )
    .slice(0, remaining);

  return [...sameCategory, ...similarByTags];
}

// Get all categories with product counts
export async function getAllCategories(
  products: Product[],
): Promise<Category[]> {
  const categoryMap = new Map<
    string,
    { count: number; subcategories: Map<string, number> }
  >();

  for (const product of products) {
    if (!categoryMap.has(product.categoryId)) {
      categoryMap.set(product.categoryId, {
        count: 0,
        subcategories: new Map(),
      });
    }

    const categoryData = categoryMap.get(product.categoryId)!;
    categoryData.count++;

    if (product.subcategoryId) {
      const subCount =
        categoryData.subcategories.get(product.subcategoryId) || 0;
      categoryData.subcategories.set(product.subcategoryId, subCount + 1);
    }
  }

  // Import category names from data
  const categoriesData = await getCategoriesData();

  const categories: Category[] = [];

  for (const [id, data] of categoryMap) {
    const categoryInfo = categoriesData.find((c) => c.id === id);

    const subcategories: Subcategory[] = [];
    const subcategoriesData = await getSubcategoriesData();

    for (const [subId, count] of data.subcategories) {
      const subInfo = subcategoriesData.find((s) => s.id === subId);
      subcategories.push({
        id: subId,
        name: {
          fa: subInfo?.name?.fa || subId,
          en: subInfo?.name?.en || subId,
        },
        slug: subInfo?.slug || subId,
        categoryId: id,
        count,
      });
    }

    categories.push({
      id,
      name: {
        fa: categoryInfo?.name?.fa || id,
        en: categoryInfo?.name?.en || id,
      },
      slug: categoryInfo?.slug || id,
      count: data.count,
      subcategories: subcategories.sort((a, b) => b.count - a.count),
    });
  }

  return categories.sort((a, b) => b.count - a.count);
}

// Get category by slug
export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  const categoriesData = await getCategoriesData();
  const categoryInfo = categoriesData.find((c) => c.slug === slug);

  if (!categoryInfo) return null;

  const products = await getAllProducts();
  const categoryProducts = getProductsByCategory(products, categoryInfo.id);

  const subcategoriesData = await getSubcategoriesData();
  const subcategories: Subcategory[] = [];

  // Get subcategories for this category
  const productSubcategories = new Set<string>();
  for (const product of categoryProducts) {
    if (product.subcategoryId) {
      productSubcategories.add(product.subcategoryId);
    }
  }

  for (const subId of productSubcategories) {
    const subInfo = subcategoriesData.find((s) => s.id === subId);
    const count = categoryProducts.filter(
      (p) => p.subcategoryId === subId,
    ).length;
    subcategories.push({
      id: subId,
      name: {
        fa: subInfo?.name?.fa || subId,
        en: subInfo?.name?.en || subId,
      },
      slug: subInfo?.slug || subId,
      categoryId: categoryInfo.id,
      count,
    });
  }

  return {
    id: categoryInfo.id,
    name: categoryInfo.name,
    slug: categoryInfo.slug,
    count: categoryProducts.length,
    subcategories: subcategories.sort((a, b) => b.count - a.count),
  };
}

// Helper: Get categories data from JSON (EXPORTED)
export async function getCategoriesData(): Promise<
  Array<{ id: string; name: { fa: string; en: string }; slug: string }>
> {
  try {
    const filePath = path.join(process.cwd(), "data/categories.json");
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(content);
    }
  } catch (error) {
    console.error("Error loading categories:", error);
  }

  // Fallback data
  return [
    {
      id: "butt-plugs",
      name: { fa: "بات پلاگ", en: "Butt Plugs" },
      slug: "butt-plugs",
    },
    { id: "dildos", name: { fa: "دیلدو", en: "Dildos" }, slug: "dildos" },
    {
      id: "vibrators",
      name: { fa: "ویبراتور", en: "Vibrators" },
      slug: "vibrators",
    },
    {
      id: "penis-sleeves",
      name: { fa: "روکش آلت", en: "Penis Sleeves" },
      slug: "penis-sleeves",
    },
    { id: "whips", name: { fa: "شلاق", en: "Whips" }, slug: "whips" },
    {
      id: "cock-rings",
      name: { fa: "حلقه تاخیر", en: "Cock Rings" },
      slug: "cock-rings",
    },
    {
      id: "bondage",
      name: { fa: "بی دی اس ام", en: "Bondage" },
      slug: "bondage",
    },
    { id: "gags", name: { fa: "گگ", en: "Gags" }, slug: "gags" },
    {
      id: "anal-beads",
      name: { fa: "آنال بال", en: "Anal Beads" },
      slug: "anal-beads",
    },
    { id: "belts", name: { fa: "کمربند", en: "Belts" }, slug: "belts" },
  ];
}

// Helper: Get subcategories data from JSON (EXPORTED)
export async function getSubcategoriesData(): Promise<
  Array<{
    id: string;
    name: { fa: string; en: string };
    slug: string;
    categoryId: string;
  }>
> {
  try {
    const filePath = path.join(process.cwd(), "data/subcategories.json");
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(content);
    }
  } catch (error) {
    console.error("Error loading subcategories:", error);
  }

  // Fallback data
  return [
    {
      id: "silicone",
      name: { fa: "سیلیکونی", en: "Silicone" },
      slug: "silicone",
      categoryId: "butt-plugs",
    },
    {
      id: "steel",
      name: { fa: "استیل", en: "Steel" },
      slug: "steel",
      categoryId: "butt-plugs",
    },
    {
      id: "remote-controlled",
      name: { fa: "کنترل از راه دور", en: "Remote Controlled" },
      slug: "remote-controlled",
      categoryId: "vibrators",
    },
    {
      id: "suction",
      name: { fa: "مکنده", en: "Suction" },
      slug: "suction",
      categoryId: "vibrators",
    },
    {
      id: "mini",
      name: { fa: "مینی", en: "Mini" },
      slug: "mini",
      categoryId: "vibrators",
    },
    {
      id: "electric",
      name: { fa: "برقی", en: "Electric" },
      slug: "electric",
      categoryId: "vibrators",
    },
    {
      id: "rechargeable",
      name: { fa: "شارژی", en: "Rechargeable" },
      slug: "rechargeable",
      categoryId: "vibrators",
    },
    {
      id: "multi-function",
      name: { fa: "چند کاره", en: "Multi-Function" },
      slug: "multi-function",
      categoryId: "vibrators",
    },
    {
      id: "double-ended",
      name: { fa: "دو سر", en: "Double Ended" },
      slug: "double-ended",
      categoryId: "dildos",
    },
    {
      id: "anal",
      name: { fa: "مقعدی", en: "Anal" },
      slug: "anal",
      categoryId: "dildos",
    },
    {
      id: "strapless",
      name: { fa: "کمری", en: "Strapless" },
      slug: "strapless",
      categoryId: "dildos",
    },
    {
      id: "sets",
      name: { fa: "ست", en: "Sets" },
      slug: "sets",
      categoryId: "bondage",
    },
  ];
}

// Search products
export async function searchProducts(query: string): Promise<Product[]> {
  const products = await getAllProducts();
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) {
    return products;
  }

  return products.filter((product) => {
    // Search in Persian name
    if (product.name.fa.includes(normalizedQuery)) return true;
    // Search in English name
    if (product.name.en.toLowerCase().includes(normalizedQuery)) return true;
    // Search in code
    if (product.code.toLowerCase().includes(normalizedQuery)) return true;
    // Search in description
    if (product.description.short.includes(normalizedQuery)) return true;
    if (product.description.full.includes(normalizedQuery)) return true;
    // Search in keywords
    if (product.keywords?.some((k) => k.includes(normalizedQuery))) return true;
    // Search in tags
    if (product.tagIds?.some((t) => t.includes(normalizedQuery))) return true;

    return false;
  });
}

// Get products by tag
export function getProductsByTag(
  products: Product[],
  tagId: string,
): Product[] {
  return products.filter((product) => product.tagIds?.includes(tagId));
}

// Get products by material
export function getProductsByMaterial(
  products: Product[],
  materialId: string,
): Product[] {
  return products.filter((product) =>
    product.materialIds?.includes(materialId),
  );
}

// Get products by color
export function getProductsByColor(
  products: Product[],
  colorId: string,
): Product[] {
  return products.filter((product) => product.colorIds?.includes(colorId));
}

// Get product count by category
export function getCategoryProductCount(
  products: Product[],
  categoryId: string,
): number {
  return products.filter((p) => p.categoryId === categoryId).length;
}

// Get price range for products
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

// Clear cache (useful for development)
export function clearProductsCache(): void {
  productsCache = null;
  productsCacheTime = 0;
}
