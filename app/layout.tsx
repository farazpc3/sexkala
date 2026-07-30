// app/layout.tsx
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { type ReactNode } from "react";
import { Metadata } from "next";
import TelegramFloatingWidget from "./components/TelegramFloatingWidget";

// ✅ Metadata must be in a Server Component
export const metadata: Metadata = {
  metadataBase: new URL("https://sexkala.com"),
  title: {
    template: "%s | سکس کالا - فروشگاه تخصصی محصولات جنسی",
    default: "سکس کالا | فروشگاه تخصصی محصولات جنسی با ارسال محرمانه",
  },
  description:
    "فروشگاه اینترنتی سکس کالا | خرید انواع دیلدو، ویبراتور، بات پلاگ و محصولات جنسی با کیفیت بالا. ارسال محرمانه و پرداخت درب منزل.",
  keywords: [
    "سکس کالا",
    "خرید محصولات جنسی",
    "دیلدو",
    "ویبراتور",
    "بات پلاگ",
    "ارسال محرمانه",
    "فروشگاه جنسی",
    "محصولات بزرگسالان",
  ],
  authors: [{ name: "سکس کالا" }],
  creator: "سکس کالا",
  publisher: "سکس کالا",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "سکس کالا | فروشگاه تخصصی محصولات جنسی",
    description:
      "خرید انواع دیلدو، ویبراتور، بات پلاگ و محصولات جنسی با کیفیت بالا. ارسال محرمانه و پرداخت درب منزل.",
    url: "https://sexkala.com",
    siteName: "سکس کالا",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "سکس کالا - فروشگاه تخصصی محصولات جنسی",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "سکس کالا | فروشگاه تخصصی محصولات جنسی",
    description:
      "خرید انواع دیلدو، ویبراتور، بات پلاگ و محصولات جنسی با کیفیت بالا.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://sexkala.com",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning className="font-sans">
      <body className="min-h-screen transition-colors">
        <div className="mesh-glow" />
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="glass rounded-3xl p-6 md:p-10 space-y-10">
            {children}
          </div>
        </main>
        <Footer />
        <TelegramFloatingWidget />
      </body>
    </html>
  );
}
