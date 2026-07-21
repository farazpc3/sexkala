"use client";

import Image from "next/image";
import Link from "next/link";
import { Product as PrismaProduct, Category } from "@prisma/client";

interface ProductGridProps {
  products: (PrismaProduct & { category: Category })[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        const price = Number(product.price).toLocaleString();

        const images = Array.isArray(product.images)
          ? (product.images as string[])
          : [];

        return (
          <div key={product.id} className="border rounded-lg p-4">
            <Image
              src={images[0] ?? "/placeholder.png"}
              alt={product.title}
              width={300}
              height={300}
              className="rounded-md mb-3"
            />

            <h3 className="text-sm font-medium">{product.title}</h3>

            <p className="text-primary font-semibold mt-1">{price} تومان</p>
          </div>
        );
      })}
    </div>
  );
}
