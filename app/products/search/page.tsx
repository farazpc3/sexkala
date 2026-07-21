import { prisma } from "@/lib/prisma";
import ProductGrid from "../../_components/product-grid";

export const dynamic = "force-dynamic";

interface SearchParams {
  q?: string;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const q = searchParams.q ?? "";

  const products = await prisma.product.findMany({
    where: {
      title: { contains: q, mode: "insensitive" },
    },
    include: { category: true },
  });

  return (
    <div className="max-w-6xl mx-auto p-6 text-right">
      <h2 className="text-xl mb-4">نتایج جستجو برای: {q}</h2>
      <ProductGrid products={products} />
    </div>
  );
}
