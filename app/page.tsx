// app/page.tsx
import Link from "next/link";
import {
  getAllProducts,
  getFeaturedProducts,
  getNewProducts,
} from "@/lib/products";
import { getAllCategories } from "@/lib/categories";
import Hero from "./components/home/Hero";
import Categories from "./components/home/Categories";
import TelegramBanner from "./components/home/TelegramBanner";
import ProductGrid from "./components/products/ProductGrid";

export default async function HomePage() {
  const allProducts = await getAllProducts();
  const featuredProducts = getFeaturedProducts(allProducts);
  const newProducts = getNewProducts(allProducts);
  const categories = await getAllCategories();

  return (
    <>
      <Hero />
      <Categories categories={categories} />

      {/* New Products Section */}
      <section className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-right">جدیدترین محصولات</h2>
          <Link
            href="/products?sort=newest"
            className="text-sm text-muted hover:text-primary transition-colors flex items-center gap-1"
          >
            مشاهده همه
            <span className="text-xs">←</span>
          </Link>
        </div>
        <ProductGrid
          products={newProducts.slice(0, 8)}
          showCount={false}
          columns={4}
        />
      </section>

      {/* Featured Products Section */}
      <section className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-right">محصولات ویژه</h2>
          <Link
            href="/products"
            className="text-sm text-muted hover:text-primary transition-colors flex items-center gap-1"
          >
            مشاهده همه
            <span className="text-xs">←</span>
          </Link>
        </div>
        <ProductGrid
          products={featuredProducts.slice(0, 8)}
          showCount={false}
          columns={4}
        />
      </section>

      {/* All Products Section */}
      <section className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-right">همه محصولات</h2>
          <Link
            href="/products"
            className="text-sm text-muted hover:text-primary transition-colors flex items-center gap-1"
          >
            مشاهده همه
            <span className="text-xs">←</span>
          </Link>
        </div>
        <ProductGrid
          products={allProducts.slice(0, 8)}
          showCount={false}
          columns={4}
        />
      </section>

      <TelegramBanner />
    </>
  );
}
