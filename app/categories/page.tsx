// app/categories/page.tsx
import { getAllCategories } from "@/lib/categories";
import CategoryCard from "@/app/components/categories/CategoryCard";

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8">دسته‌بندی محصولات</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </>
  );
}
