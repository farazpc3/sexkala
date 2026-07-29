// app/components/products/ProductDetails.tsx
"use client";

import { Product } from "@/types/product";
import { Heart, ShoppingCart, Share2, Check, AlertCircle } from "lucide-react";
import { useState } from "react";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const price = product.salePrice ?? product.price;
  const hasSale =
    product.salePrice !== undefined && product.salePrice !== product.price;

  const handleAddToCart = () => {
    // Add to cart logic
    console.log(`Added ${quantity} of ${product.name.fa} to cart`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name.fa,
          text: product.description.short,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      alert("لینک محصول کپی شد!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold">{product.name.fa}</h1>

      {/* Code */}
      <div className="text-sm text-muted">کد محصول: {product.code}</div>

      {/* Price */}
      <div className="space-y-2">
        {hasSale ? (
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-primary">
              {product.salePrice?.toLocaleString()}
            </span>
            <span className="text-lg text-muted line-through">
              {product.price?.toLocaleString()}
            </span>
            <span className="text-sm text-muted">تومان</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">
              {price?.toLocaleString()}
            </span>
            <span className="text-sm text-muted">تومان</span>
          </div>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center gap-2">
        {product.status === "available" ? (
          <>
            <Check className="w-5 h-5 text-green-500" />
            <span className="text-green-500">موجود در انبار</span>
          </>
        ) : product.status === "pre-order" ? (
          <>
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            <span className="text-yellow-500">پیش‌سفارش</span>
          </>
        ) : (
          <>
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-500">ناموجود</span>
          </>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h3 className="font-semibold">توضیحات</h3>
        <p className="text-secondary leading-relaxed">
          {product.description.full}
        </p>
      </div>

      {/* Tags */}
      {product.tagIds && product.tagIds.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {product.tagIds.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs rounded-full glass hover:bg-white/10 transition-colors cursor-default"
            >
              #{tag.replace(/_/g, " ")}
            </span>
          ))}
        </div>
      )}

      {/* Features */}
      {product.featureIds && product.featureIds.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold">ویژگی‌ها</h3>
          <div className="flex flex-wrap gap-2">
            {product.featureIds.map((feature) => (
              <span
                key={feature}
                className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
              >
                {feature.replace(/-/g, " ")}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">تعداد:</label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-8 h-8 rounded-lg glass hover:bg-white/10 transition-colors flex items-center justify-center"
          >
            -
          </button>
          <span className="w-12 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-8 h-8 rounded-lg glass hover:bg-white/10 transition-colors flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 pt-4">
        <button
          onClick={handleAddToCart}
          disabled={product.status !== "available"}
          className="flex-1 px-6 py-3 rounded-xl glass hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>افزودن به سبد خرید</span>
        </button>

        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="px-4 py-3 rounded-xl glass hover:bg-white/20 transition-colors"
          aria-label="افزودن به علاقه‌مندی‌ها"
        >
          <Heart
            className={`w-5 h-5 ${
              isWishlisted ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </button>

        <button
          onClick={handleShare}
          className="px-4 py-3 rounded-xl glass hover:bg-white/20 transition-colors"
          aria-label="اشتراک‌گذاری"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
