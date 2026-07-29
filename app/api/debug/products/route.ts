// app/api/debug/products/route.ts
import { NextResponse } from "next/server";
import { getAllProducts } from "@/lib/products";

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json({
      count: products.length,
      products: products.map((p) => ({
        id: p.id,
        code: p.code,
        name: p.name.fa,
        slug: p.slug,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: String(error),
        message: "Failed to load products",
      },
      { status: 500 },
    );
  }
}
