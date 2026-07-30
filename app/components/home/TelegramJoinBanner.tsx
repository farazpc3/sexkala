// app/components/home/TelegramJoinBanner.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Send, Users, CheckCircle, ArrowLeft } from "lucide-react";

interface TelegramJoinBannerProps {
  channelUsername: string;
  inviteLink: string;
}

export default function TelegramJoinBanner({
  channelUsername = "sexyy_toys",
  inviteLink = "https://t.me/sexyy_toys",
}: TelegramJoinBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    // Check if user has already been prompted
    const hasSeenTelegramPrompt = localStorage.getItem("telegram_prompt_seen");
    const hasJoinedTelegram = localStorage.getItem("telegram_joined");

    if (hasJoinedTelegram === "true") {
      setHasJoined(true);
      return;
    }

    // Show banner after 3 seconds if they haven't seen it
    if (!hasSeenTelegramPrompt) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        localStorage.setItem("telegram_prompt_seen", "true");
      }, 3000);

      return () => clearTimeout(timer);
    }

    // If they've seen it before but haven't joined, show minimized version
    if (hasSeenTelegramPrompt === "true" && !hasJoinedTelegram) {
      setIsMinimized(true);
      setIsVisible(true);
    }
  }, []);

  const handleJoin = () => {
    // Open Telegram channel in new tab
    window.open(inviteLink, "_blank");

    // Show joining state
    setHasJoined(true);
    localStorage.setItem("telegram_joined", "true");

    // After 3 seconds, show success message
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("telegram_joined", "dismissed");
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleExpand = () => {
    setIsMinimized(false);
  };

  if (!isVisible) return null;

  if (hasJoined) {
    return (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4">
        <div className="glass rounded-2xl p-4 shadow-2xl border border-green-500/30 animate-in slide-in-from-bottom-5 duration-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">به کانال تلگرام پیوستید!</p>
              <p className="text-xs text-muted">از محصولات جدید مطلع شوید</p>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={handleExpand}
          className="glass rounded-full p-3 shadow-2xl hover:scale-105 transition-all duration-300 group"
          aria-label="عضویت در تلگرام"
        >
          <div className="relative">
            <Send className="w-6 h-6 text-blue-500" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 animate-in slide-in-from-bottom-5 duration-500">
      <div className="glass rounded-2xl p-5 shadow-2xl border border-white/10 backdrop-blur-xl">
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="flex items-start gap-4">
          {/* Telegram Icon */}
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 text-white"
              fill="currentColor"
            >
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
          </div>

          {/* Text */}
          <div className="flex-1">
            <h3 className="font-bold text-base">به کانال تلگرام بپیوندید</h3>
            <p className="text-sm text-muted mt-0.5">
              برای مشاهده محصولات جدید، تخفیف‌ها و ثبت سفارش
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-500">
                @{channelUsername}
              </span>
              <span className="text-xs text-muted">•</span>
              <span className="text-xs text-muted">تخفیف‌های ویژه</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleJoin}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium text-sm hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            عضویت در کانال
          </button>

          <button
            onClick={handleMinimize}
            className="px-4 py-2.5 rounded-xl glass hover:bg-white/10 transition-colors text-sm"
          >
            بعداً
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            +۲,۵۰۰ عضو
          </span>
          <span>•</span>
          <span>ارسال محرمانه</span>
          <span>•</span>
          <span>پرداخت درب منزل</span>
        </div>
      </div>
    </div>
  );
}
