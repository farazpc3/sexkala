import { Card, CardContent } from "@/components/ui/card";

export default function Hero() {
  return (
    <section className="mb-10">
      <Card className="bg-gradient-to-l from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900">
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-1/3">
            <div className="w-full h-40 md:h-56 rounded-xl border-2 border-dashed border-pink-400 dark:border-pink-300 flex items-center justify-center text-sm font-semibold">
              جای‌نگهدار تصویر اصلی فروشگاه
            </div>
          </div>

          <div className="w-full md:w-2/3 space-y-3">
            <h2 className="text-lg md:text-2xl font-bold">
              حریم خصوصی، ارسال محرمانه
            </h2>
            <p className="text-sm md:text-base leading-relaxed">
              سکسکالا فقط برای نمایش محصولات است. پرداخت و ثبت سفارش فقط از طریق
              تلگرام انجام می‌شود.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
