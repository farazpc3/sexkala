"use client";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

export function SupportChat() {
  return (
    <div className="fixed bottom-4 right-4">
      <Sheet>
        <SheetTrigger
          className="
            rounded-full px-5 py-3 
            shadow-xl shadow-black/40 
            bg-[hsl(342,72%,45%)] 
            text-white
          "
        >
          پشتیبانی آنلاین
        </SheetTrigger>

        <SheetContent
          side="bottom"
          className="
            h-80 p-4 
            bg-[hsl(330,20%,10%)]/95 
            backdrop-blur-xl 
            border-t border-[hsl(330,20%,20%)]
            text-white
          "
        >
          <h3 className="text-lg font-semibold mb-2 text-right">
            چت با پشتیبانی
          </h3>

          <div className="flex flex-col gap-3 h-full">
            <div
              className="
                flex-1 border rounded-md p-3 overflow-auto text-right 
                bg-[hsl(330,20%,20%)]/40 
                border-[hsl(330,20%,30%)]
              "
            >
              <p className="text-[hsl(330,10%,75%)]">
                سلام! چطور می‌تونم کمک کنم؟
              </p>
            </div>

            <Input
              placeholder="پیام خود را بنویسید..."
              className="
                text-right 
                bg-[hsl(330,20%,20%)]/40 
                border-[hsl(330,20%,30%)]
                text-white
              "
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
