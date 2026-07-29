// app/robots.ts
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/cart/", "/checkout/"],
    },
    sitemap: "https://sexkala.com/sitemap.xml",
  };
}
