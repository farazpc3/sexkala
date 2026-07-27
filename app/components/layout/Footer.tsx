export default function Footer() {
  return (
    <footer className="border-t border-border pt-4 mt-10 text-xs text-muted-foreground">
      <p>© {new Date().getFullYear()} سکسکالا – sexkala.com</p>
      <p className="mt-1">
        این وب‌سایت فقط برای نمایش محصولات زناشویی است. پرداخت فقط از طریق
        تلگرام انجام می‌شود.
      </p>
    </footer>
  );
}
