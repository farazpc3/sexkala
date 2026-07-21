import { prisma } from "@/lib/prisma";
import ProductGrid from "../_components/product-grid";

interface SearchParams {
  q?: string;
  categoryId?: string;
  sort?: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const q = searchParams.q ?? "";
  const categoryId = searchParams.categoryId
    ? Number(searchParams.categoryId)
    : null;
  const sort = searchParams.sort ?? "new";

  const products = await prisma.product.findMany({
    where: {
      AND: [
        q ? { title: { contains: q, mode: "insensitive" } } : {},
        categoryId ? { categoryId } : {},
      ],
    },
    include: { category: true },
    orderBy: sort === "price" ? { price: "asc" } : { createdAt: "desc" },
  });

  return <ProductGrid products={products} />;
}
