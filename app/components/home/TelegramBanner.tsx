import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TelegramBanner() {
  return (
    <section className="mb-10">
      <Card>
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-4">
          <div className="w-full md:w-1/3">
            <div className="w-full h-32 rounded-xl border-2 border-dashed border-blue-400 flex items-center justify-center text-sm font-semibold">
              جای‌نگهدار بنر تلگرام
            </div>
          </div>

          <div className="w-full md:w-2/3 space-y-2">
            <h3 className="text-lg font-semibold">
              ثبت سفارش فقط از طریق تلگرام
            </h3>
            <p className="text-sm text-muted-foreground">
              کد محصول را از سایت بردارید و در تلگرام ارسال کنید.
            </p>

            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              کانال تلگرام سکسکالا
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
