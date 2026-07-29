// app/categories/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getAllProducts, getProductsByCategory } from "@/lib/products";
import { getAllCategories, getCategoryBySlug } from "@/lib/categories";
import ProductGrid from "@/app/components/products/ProductGrid";
import Link from "next/link";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // ✅ Must await params before accessing its properties
  const { slug } = await params;

  const allProducts = await getAllProducts();
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(allProducts, category.id);

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted mb-2">
          <Link
            href="/categories"
            className="hover:text-primary transition-colors"
          >
            همه دسته‌بندی‌ها
          </Link>
          <span>›</span>
          <span>{category.name.fa}</span>
        </div>
        <h1 className="text-3xl font-bold">{category.name.fa}</h1>
        <p className="text-muted mt-1">{products.length} محصول</p>

        {category.subcategories && category.subcategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {category.subcategories.map((sub) => (
              <span
                key={sub.id}
                className="px-3 py-1 text-sm rounded-full glass"
              >
                {sub.name.fa} ({sub.count})
              </span>
            ))}
          </div>
        )}
      </div>

      <ProductGrid products={products} columns={4} />
    </>
  );
}
