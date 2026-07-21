import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  const product = await prisma.product.create({
    data: {
      title: data.title,
      description: data.description,
      price: data.price,
      images: data.images,
      categoryId: data.categoryId,
    },
  });

  return NextResponse.json(product);
}
