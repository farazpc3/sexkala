import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { SupportChat } from "@/components/layout/support-chat";
import { Footer } from "@/components/layout/footer";
import { TopNav } from "@/components/layout/top-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "سک‌کالا",
  description: "فروشگاه آنلاین با پرداخت کارت‌به‌کارت و پشتیبانی آنلاین",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={cn(inter.className, "bg-background text-foreground")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <TopNav />
          {children}
          <SupportChat />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
