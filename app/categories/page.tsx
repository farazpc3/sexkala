// app/categories/page.tsx
import { getAllProducts } from "@/lib/products";
import { getAllCategories } from "@/lib/categories";
import CategoryCard from "@/app/components/categories/CategoryCard";

export default async function CategoriesPage() {
  const allProducts = await getAllProducts();
  const categories = await getAllCategories();

  // Get a random image for each category
  const categoryImages: Record<string, string> = {};

  for (const category of categories) {
    const categoryProducts = allProducts.filter(
      (p) => p.categoryId === category.id,
    );
    if (categoryProducts.length > 0) {
      // Pick a random product from this category
      const randomProduct =
        categoryProducts[Math.floor(Math.random() * categoryProducts.length)];
      const coverImage =
        randomProduct.images?.find((img) => img.isCover) ||
        randomProduct.images?.[0];
      if (coverImage) {
        categoryImages[category.id] = coverImage.src;
      }
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8">دسته‌بندی محصولات</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            image={categoryImages[category.id]}
          />
        ))}
      </div>
    </>
  );
}
