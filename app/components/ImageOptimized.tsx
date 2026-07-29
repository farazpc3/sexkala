// components/ImageOptimized.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageOptimizedProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export default function ImageOptimized({
  src,
  alt,
  width,
  height,
  fill,
  className,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw",
  priority = false,
}: ImageOptimizedProps) {
  const [error, setError] = useState(false);

  // Use placeholder if image fails to load
  if (error || !src) {
    return (
      <div
        className={`bg-gradient-to-br from-pink-100/20 to-purple-100/20 flex items-center justify-center ${className}`}
      >
        <span className="text-4xl">📦</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      onError={() => setError(true)}
      placeholder="blur"
      blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3C/svg%3E"
    />
  );
}
