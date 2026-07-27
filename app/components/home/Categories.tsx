import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const items = [
  "ویبراتور و اسباب‌بازی‌های جنسی",
  "ژل و اسپری تاخیری",
  "کاندوم و محصولات بهداشتی",
  "لباس زیر فانتزی",
  "ست‌های زوجی",
  "محصولات افزایش لذت",
];

export default function Categories() {
  return (
    <section className="mb-10">
      <h3 className="text-lg font-semibold mb-4">دسته‌بندی محصولات</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {items.map((title, idx) => (
          <Card key={idx}>
            <CardContent className="p-4 flex flex-col gap-3">
              <div className="w-full h-32 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-xs">
                جای‌نگهدار عکس محصول
              </div>

              <div className="w-full h-10 rounded-md border border-dotted border-purple-300 dark:border-purple-700 flex items-center justify-center text-[11px]">
                جای‌نگهدار پس‌زمینه و تم
              </div>

              <h4 className="text-sm font-semibold">{title}</h4>
              <p className="text-xs text-muted-foreground">
                توضیحات کوتاه درباره این دسته.
              </p>

              <Button className="mt-auto text-xs">مشاهده محصولات</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
