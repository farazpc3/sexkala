import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) },
    include: { category: true },
  });

  if (!product) return <div>محصول یافت نشد</div>;

  const images = Array.isArray(product.images)
    ? (product.images as string[])
    : [];

  return (
    <div className="max-w-4xl mx-auto p-6 text-right">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {images.map((img, i) => (
            <Image
              key={i}
              src={img ?? "/placeholder.png"}
              alt={product.title}
              width={600}
              height={600}
              className="rounded-xl mb-4"
            />
          ))}
        </div>

        <div>
          <p className="text-muted-foreground mb-4">{product.description}</p>

          <p className="text-xl font-semibold mb-4">
            {Number(product.price).toLocaleString()} تومان
          </p>

          <p className="text-sm text-muted-foreground mb-4">
            دسته‌بندی: {product.category?.name}
          </p>

          <a
            href={`/cart/add?id=${product.id}`}
            className="block bg-primary text-primary-foreground py-3 rounded-lg text-center"
          >
            افزودن به سبد خرید
          </a>
        </div>
      </div>
    </div>
  );
}
