// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/dashboard/", "/cart/", "/checkout/"],
    },
    sitemap: "https://www.lovilla.shop/sitemap.xml",
  };
}
