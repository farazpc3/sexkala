// app/components/products/ProductCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { Heart, Eye } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  showWishlist?: boolean;
}

export default function ProductCard({
  product,
  showWishlist = true,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);

  const coverImage =
    product.images?.find((img) => img.isCover) || product.images?.[0];
  const price = product.salePrice ?? product.price;
  const hasSale =
    product.salePrice !== undefined && product.salePrice !== product.price;

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Link href={`/products/${product.slug}`} className="block">
      <div className="glass rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(236,72,153,0.2)] dark:hover:shadow-[0_0_40px_rgba(236,72,153,0.1)] group">
        {/* Image Container */}
        <div className="relative aspect-square bg-white/5 dark:bg-black/20 overflow-hidden">
          {coverImage && !imageError ? (
            <Image
              src={coverImage.src}
              alt={coverImage.alt || product.name.fa}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted bg-gradient-to-br from-pink-100/20 to-purple-100/20 dark:from-pink-900/10 dark:to-purple-900/10">
              <span className="text-sm">📦</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {product.badges?.includes("new") && (
              <span className="px-2 py-1 text-xs font-medium rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg">
                جدید
              </span>
            )}
            {product.badges?.includes("best-seller") && (
              <span className="px-2 py-1 text-xs font-medium rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg">
                پرفروش
              </span>
            )}
            {product.badges?.includes("premium") && (
              <span className="px-2 py-1 text-xs font-medium rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg">
                ویژه
              </span>
            )}
            {hasSale && (
              <span className="px-2 py-1 text-xs font-medium rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg">
                تخفیف
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          {showWishlist && (
            <button
              onClick={toggleWishlist}
              className="absolute top-2 left-2 p-1.5 rounded-full glass hover:bg-white/20 transition-colors"
              aria-label="افزودن به علاقه‌مندی‌ها"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isWishlisted
                    ? "fill-red-500 text-red-500"
                    : "text-white/80 hover:text-red-400"
                }`}
              />
            </button>
          )}

          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="glass px-4 py-2 rounded-lg text-white text-sm font-medium backdrop-blur-md">
              مشاهده محصول
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 space-y-2">
          {/* Code */}
          <div className="text-xs text-muted">{product.code}</div>

          <h3 className="text-sm font-medium text-right line-clamp-2 text-primary">
            {product.name.fa}
          </h3>

          {/* Tags */}
          {product.tagIds && product.tagIds.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.tagIds.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 dark:bg-white/5 text-muted"
                >
                  #{tag.replace(/_/g, " ")}
                </span>
              ))}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {hasSale ? (
                <>
                  <span className="text-sm font-bold text-primary">
                    {product.salePrice?.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted line-through">
                    {product.price?.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-sm font-bold text-primary">
                  {price?.toLocaleString()}
                </span>
              )}
              <span className="text-xs text-muted">تومان</span>
            </div>

            {product.reactions !== undefined && product.reactions > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted">
                <Eye className="w-3 h-3" />
                <span>{product.reactions}</span>
              </div>
            )}
          </div>

          {/* Status */}
          {product.status === "available" ? (
            <div className="text-xs text-green-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
              موجود
            </div>
          ) : product.status === "pre-order" ? (
            <div className="text-xs text-yellow-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 inline-block"></span>
              پیش‌سفارش
            </div>
          ) : (
            <div className="text-xs text-red-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
              ناموجود
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
