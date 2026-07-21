"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

export default function HomePage() {
  return (
    <div
      className="
        min-h-screen 
        bg-background text-foreground 
        transition-colors 
        relative overflow-hidden
      "
    >
      {/* Romantic Mesh Background */}
      <div
        className="
          absolute inset-0 -z-10 opacity-60
          bg-[radial-gradient(circle_at_30%_20%,#e11d48_0%,transparent_60%),radial-gradient(circle_at_70%_80%,#9333ea_0%,transparent_60%),radial-gradient(circle_at_50%_50%,#fbbf24_0%,transparent_70%)]
        "
      />

      {/* Curved SVG Overlay */}
      <div className="absolute top-0 left-0 right-0 -z-10 opacity-30">
        <svg viewBox="0 0 1440 320">
          <path
            fill="#e11d48"
            fillOpacity="0.25"
            d="M0,256L48,240C96,224,192,192,288,170.7C384,149,480,139,576,154.7C672,171,768,213,864,229.3C960,245,1056,235,1152,218.7C1248,203,1344,181,1392,170.7L1440,160V0H0Z"
          />
        </svg>
      </div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto p-6 text-center mt-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground drop-shadow-lg">
          سک‌کالا — تجربه‌ای متفاوت از خرید محصولات بزرگسالان
        </h1>

        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
          مجموعه‌ای از محصولات باکیفیت، بسته‌بندی محرمانه، ارسال سریع و پشتیبانی
          حرفه‌ای.
        </p>

        <Button
          className="
            text-lg px-8 py-4 rounded-xl 
            bg-primary hover:bg-primary/80 
            shadow-lg shadow-rose-900/30
          "
        >
          مشاهده محصولات
        </Button>
      </section>

      {/* Product Grid */}
      <section className="max-w-6xl mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4 text-right">محصولات جدید</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card
              key={i}
              className="
                text-right rounded-xl 
                bg-card/60 backdrop-blur-sm 
                border border-border/40 
                shadow-lg shadow-black/20
              "
            >
              <CardHeader>
                <CardTitle className="font-semibold">محصول شماره {i}</CardTitle>
              </CardHeader>

              <CardContent>
                <Image
                  src="/placeholder.png"
                  alt="product"
                  width={300}
                  height={300}
                  className="rounded-xl mb-3 shadow-md"
                />

                <p className="text-muted-foreground mb-3 leading-relaxed">
                  توضیحات کوتاه محصول
                </p>

                <Button
                  className="
                    w-full rounded-lg 
                    bg-accent text-accent-foreground 
                    hover:bg-accent/80
                  "
                >
                  افزودن به سبد
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Support Chat Widget */}
      <div className="fixed bottom-4 right-4">
        <Sheet>
          <SheetTrigger
            className="
              rounded-full px-5 py-3 
              shadow-xl shadow-black/30 
              bg-primary text-primary-foreground
            "
          >
            پشتیبانی آنلاین
          </SheetTrigger>

          <SheetContent
            side="bottom"
            className="
              h-80 p-4 
              bg-card/80 backdrop-blur-md 
              border-t border-border/40
            "
          >
            <h3 className="text-lg font-semibold mb-2 text-right">
              چت با پشتیبانی
            </h3>

            <div className="flex flex-col gap-3 h-full">
              <div className="flex-1 border rounded-md p-3 overflow-auto text-right bg-muted/20">
                <p className="text-muted-foreground">
                  سلام! چطور می‌تونم کمک کنم؟
                </p>
              </div>

              <Input
                placeholder="پیام خود را بنویسید..."
                className="text-right"
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
