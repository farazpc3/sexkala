// components/Breadcrumbs.tsx
"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface Breadcrumb {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: Breadcrumb[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      className="flex items-center gap-2 text-sm text-muted mb-6"
      aria-label="مسیر راهنما"
    >
      {items.map((item, index) => (
        <span key={item.url} className="flex items-center gap-2">
          {index === items.length - 1 ? (
            <span className="text-primary font-medium">{item.name}</span>
          ) : (
            <>
              <Link
                href={item.url}
                className="hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
              <ChevronLeft className="w-4 h-4" />
            </>
          )}
        </span>
      ))}
    </nav>
  );
}
