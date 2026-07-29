// app/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import ProductDetails from "@/app/components/products/ProductDetails";
import ProductGallery from "@/app/components/products/ProductGallery";
import RelatedProducts from "@/app/components/products/RelatedProducts";
import ProductSpecs from "@/app/components/products/ProductSpecs";
import { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  // Use a Set to deduplicate slugs
  const uniqueSlugs = new Set(products.map((product) => product.slug));
  return Array.from(uniqueSlugs).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  // ✅ Must await params before accessing its properties
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "محصول یافت نشد",
    };
  }

  return {
    title: product.seo?.title || product.name.fa,
    description: product.seo?.description || product.description.short,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  // ✅ Must await params before accessing its properties
  const { slug } = await params;

  const allProducts = await getAllProducts();
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(allProducts, product);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductGallery
          images={product.images || []}
          videos={product.videos || []}
        />
        <ProductDetails product={product} />
      </div>

      <ProductSpecs product={product} />

      {relatedProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-right">محصولات مرتبط</h2>
          <RelatedProducts products={relatedProducts} />
        </section>
      )}
    </>
  );
}
