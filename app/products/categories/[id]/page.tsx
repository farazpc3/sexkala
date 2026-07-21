import { prisma } from "@/lib/prisma";
import ProductGrid from "../../../_components/product-grid";

export default async function CategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const categoryId = Number(params.id);

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) return <div>دسته‌بندی یافت نشد</div>;

  const products = await prisma.product.findMany({
    where: { categoryId },
    include: { category: true },
  });

  return (
    <div className="max-w-6xl mx-auto p-6 text-right">
      <h2 className="text-2xl font-bold mb-6">دسته‌بندی: {category.name}</h2>
      <ProductGrid products={products} />
    </div>
  );
}
