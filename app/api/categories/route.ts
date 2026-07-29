// app/api/categories/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAllCategories } from "@/lib/categories";

export async function GET(request: NextRequest) {
  const categories = await getAllCategories();
  return NextResponse.json(categories);
}
