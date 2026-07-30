// app/categories/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getAllProducts, getProductsByCategory } from "@/lib/products";
import { getAllCategories, getCategoryBySlug } from "@/lib/categories";
import ProductGrid from "@/app/components/products/ProductGrid";
import Link from "next/link";
import { Category } from "@/types/product"; // ✅ Add this import

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const categories = await getAllCategories();
    return categories.map((category) => ({
      slug: category.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  try {
    const allProducts = await getAllProducts();
    let category: Category | null = await getCategoryBySlug(slug);

    // If category not found by slug, try to find by id
    if (!category) {
      const allCategories = await getAllCategories();
      const found = allCategories.find((c) => c.id === slug || c.slug === slug);
      category = found || null;

      if (!category) {
        // Try to find by mapping old slugs to new ones
        const slugMap: Record<string, string> = {
          bondage: "bondage",
          "penis-sleeves": "penis-sleeves",
        };

        const mappedSlug = slugMap[slug];
        if (mappedSlug) {
          const found = allCategories.find(
            (c) => c.slug === mappedSlug || c.id === mappedSlug,
          );
          category = found || null;
        }
      }
    }

    if (!category) {
      console.log(`❌ Category not found for slug: ${slug}`);
      notFound();
    }

    const products = getProductsByCategory(allProducts, category.id);

    console.log(
      `✅ Found ${products.length} products for category: ${category.name.fa}`,
    );

    // If no products found, show a message
    if (products.length === 0) {
      return (
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-2">{category.name.fa}</h1>
          <p className="text-muted">هیچ محصولی در این دسته‌بندی یافت نشد</p>
          <Link
            href="/products"
            className="inline-block mt-4 px-6 py-2 rounded-full glass hover:bg-white/10 transition-colors"
          >
            مشاهده همه محصولات
          </Link>
        </div>
      );
    }

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
  } catch (error) {
    console.error("Error loading category page:", error);
    notFound();
  }
}
