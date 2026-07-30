// app/components/TelegramFloatingWidget.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Send, X } from "lucide-react";

export default function TelegramFloatingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasDismissed = localStorage.getItem("telegram_widget_dismissed");
    if (hasDismissed === "true") {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("telegram_widget_dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-14 h-14 rounded-full shadow-2xl
          bg-gradient-to-r from-blue-500 to-purple-600
          text-white flex items-center justify-center
          transition-all duration-300 hover:scale-110
          ${isOpen ? "rotate-45" : ""}
        `}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Send className="w-6 h-6" />}
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-72 glass rounded-2xl p-4 shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <Send className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-sm">کانال تلگرام</h4>
              <p className="text-xs text-muted">عضویت و دریافت تخفیف</p>
            </div>
          </div>

          <Link
            href="https://t.me/sexyy_toys"
            target="_blank"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium text-center block hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300"
            onClick={() => {
              localStorage.setItem("telegram_joined", "true");
              setIsOpen(false);
            }}
          >
            عضویت در کانال
          </Link>

          <button
            onClick={handleDismiss}
            className="w-full mt-2 py-1.5 text-xs text-muted hover:text-primary transition-colors"
          >
            دیگر نمایش نده
          </button>
        </div>
      )}
    </div>
  );
}
