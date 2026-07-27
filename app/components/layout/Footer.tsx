"use client";

export default function Footer() {
  return (
    <footer
      className="
        relative mt-20 pt-10 pb-6
        glass
        backdrop-blur-xl
        border-t border-white/20 dark:border-white/10
        shadow-[0_0_25px_rgba(236,72,153,0.25)]
      "
    >
      {/* Mesh gradient background */}
      <div className="absolute inset-0 -z-10 opacity-50 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,#ff8fb8_0%,transparent_60%),radial-gradient(circle_at_90%_80%,#b83280_0%,transparent_60%),radial-gradient(circle_at_50%_50%,#fbbf24_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_10%_20%,#4b1035_0%,transparent_60%),radial-gradient(circle_at_90%_80%,#8b1c4a_0%,transparent_60%),radial-gradient(circle_at_50%_50%,#1a0b1f_0%,transparent_70%)]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 text-center space-y-3">
        <h3 className="text-lg font-bold text-white drop-shadow-lg">
          سکسکالا – sexkala.com
        </h3>

        <p className="text-sm text-white/80 leading-relaxed">
          این وب‌سایت فقط برای نمایش محصولات است. ثبت سفارش و پرداخت فقط از طریق
          تلگرام انجام می‌شود.
        </p>

        <p className="text-xs text-white/60 mt-4">
          © {new Date().getFullYear()} تمامی حقوق محفوظ است.
        </p>
      </div>
    </footer>
  );
}
