// app/components/StructuredData.tsx
"use client";

import { Product } from "@/types/product";
import Script from "next/script";

interface StructuredDataProps {
  type: "WebSite" | "Product" | "BreadcrumbList" | "CollectionPage";
  data: any;
}

export function WebSiteStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "سکس کالا",
    url: "https://sexkala.com",
    description: "فروشگاه تخصصی محصولات جنسی با ارسال محرمانه",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://sexkala.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    sameAs: [
      "https://t.me/sexyy_toys",
      // Add other social media links
    ],
  };

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ProductStructuredData({ product }: { product: Product }) {
  const price = product.salePrice ?? product.price;
  const images = product.images?.map((img) => img.src) || [];

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name.fa,
    description: product.description.short,
    sku: product.code,
    productID: product.id,
    brand: {
      "@type": "Brand",
      name: product.brandId || "سکس کالا",
    },
    category: product.categoryId,
    offers: {
      "@type": "Offer",
      price: price?.toString() || "0",
      priceCurrency: product.currency || "IRT",
      availability:
        product.status === "available"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `https://sexkala.com/products/${product.slug}`,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    },
    image: images,
    url: `https://sexkala.com/products/${product.slug}`,
    ...(product.tagIds && {
      keywords: product.tagIds.join(", "),
    }),
    ...(product.specifications && {
      additionalProperty: Object.entries(product.specifications)
        .filter(([, value]) => value !== null && value !== undefined)
        .map(([name, value]) => ({
          "@type": "PropertyValue",
          name,
          value: String(value),
        })),
    }),
  };

  return (
    <Script
      id={`product-structured-data-${product.id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbStructuredData({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function CollectionPageStructuredData({
  products,
  name,
  description,
}: {
  products: Product[];
  name: string;
  description?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description: description || `لیست محصولات ${name}`,
    url: "https://sexkala.com/products",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name.fa,
          url: `https://sexkala.com/products/${product.slug}`,
          image: product.images?.find((img) => img.isCover)?.src || "",
          sku: product.code,
        },
      })),
    },
  };

  return (
    <Script
      id="collection-page-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
