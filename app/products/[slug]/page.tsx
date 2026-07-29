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
import {
  ProductStructuredData,
  BreadcrumbStructuredData,
} from "@/app/components/StructuredData";
import Breadcrumbs from "@/app/components/Breadcrumbs";

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
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "محصول یافت نشد | سکس کالا",
      robots: { index: false },
    };
  }

  const price = product.salePrice ?? product.price;
  const priceText = price ? `${price.toLocaleString()} تومان` : "قیمت نامشخص";
  const productUrl = `https://sexkala.com/products/${product.slug}`;
  const coverImage =
    product.images?.find((img) => img.isCover) || product.images?.[0];

  return {
    title: `${product.name.fa} | قیمت و خرید | سکس کالا`,
    description: product.seo?.description || product.description.short,
    keywords: [
      product.name.fa,
      product.name.en,
      ...(product.keywords || []),
      ...(product.tagIds || []),
      "خرید",
      "قیمت",
      "فروش",
    ].join(", "),
    openGraph: {
      title: `${product.name.fa} | سکس کالا`,
      description: product.description.short,
      url: productUrl,
      siteName: "سکس کالا",
      locale: "fa_IR",
      type: "website", // ✅ Changed from "product" to "website"
      images: coverImage
        ? [
            {
              url: coverImage.src,
              width: 1200,
              height: 630,
              alt: product.name.fa,
            },
          ]
        : [
            {
              url: `/api/og?title=${encodeURIComponent(product.name.fa)}&description=${encodeURIComponent(product.description.short)}`,
              width: 1200,
              height: 630,
              alt: product.name.fa,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name.fa} | سکس کالا`,
      description: product.description.short,
      images: coverImage ? [coverImage.src] : [],
    },
    alternates: {
      canonical: productUrl,
    },
    other: {
      "product:brand": product.brandId || "سکس کالا",
      "product:category": product.categoryId,
      "product:retailer_item_id": product.id,
      "product:condition": "new",
      "product:price:amount": price?.toString() || "0",
      "product:price:currency": product.currency || "IRT",
      "product:availability":
        product.status === "available" ? "in stock" : "out of stock",
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const allProducts = await getAllProducts();
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(allProducts, product);

  // Breadcrumb items
  const breadcrumbItems = [
    { name: "خانه", url: "https://sexkala.com" },
    { name: "محصولات", url: "https://sexkala.com/products" },
    {
      name: product.name.fa,
      url: `https://sexkala.com/products/${product.slug}`,
    },
  ];

  return (
    <>
      {/* Structured Data */}
      <ProductStructuredData product={product} />
      <BreadcrumbStructuredData items={breadcrumbItems} />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Page Content */}
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
