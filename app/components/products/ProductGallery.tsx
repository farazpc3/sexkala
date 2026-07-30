// app/components/products/ProductGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductImage, ProductVideo } from "@/types/product";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: ProductImage[];
  videos?: ProductVideo[];
}

export default function ProductGallery({
  images,
  videos = [],
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<ProductVideo | null>(null);
  const [imageError, setImageError] = useState(false);

  const allMedia = [
    ...images.map((img) => ({ type: "image" as const, data: img })),
    ...videos.map((vid) => ({ type: "video" as const, data: vid })),
  ];

  const selectedMedia = allMedia[selectedIndex];

  const nextMedia = () => {
    setSelectedIndex((prev) => (prev + 1) % allMedia.length);
  };

  const prevMedia = () => {
    setSelectedIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  const openVideo = (video: ProductVideo) => {
    setSelectedVideo(video);
    setIsVideoOpen(true);
  };

  if (allMedia.length === 0) {
    return (
      <div className="aspect-square glass rounded-xl flex items-center justify-center">
        <span className="text-muted">بدون تصویر</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Media Display */}
      <div className="relative aspect-square glass rounded-xl overflow-hidden">
        {selectedMedia?.type === "image" ? (
          <Image
            src={selectedMedia.data.src}
            alt={selectedMedia.data.alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={() => setImageError(true)}
          />
        ) : selectedMedia?.type === "video" ? (
          <div className="relative w-full h-full">
            <video
              src={selectedMedia.data.src}
              poster={selectedMedia.data.thumbnail}
              className="w-full h-full object-contain"
              controls
            />
          </div>
        ) : null}

        {/* Navigation Arrows */}
        {allMedia.length > 1 && (
          <>
            <button
              onClick={prevMedia}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full glass hover:bg-white/20 transition-colors z-10"
              aria-label="قبلی"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={nextMedia}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full glass hover:bg-white/20 transition-colors z-10"
              aria-label="بعدی"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Video Play Button Overlay */}
        {selectedMedia?.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => openVideo(selectedMedia.data as ProductVideo)}
              className="w-16 h-16 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform z-10"
            >
              <Play className="w-8 h-8 text-white" />
            </button>
          </div>
        )}

        {/* Media Counter */}
        {allMedia.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass px-3 py-1 rounded-full text-xs z-10">
            {selectedIndex + 1} / {allMedia.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {allMedia.length > 1 && (
        <div className="grid grid-cols-6 gap-2">
          {allMedia.map((media, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                selectedIndex === index
                  ? "ring-2 ring-primary ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              {media.type === "image" ? (
                <Image
                  src={media.data.src}
                  alt={media.data.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 16vw, 10vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black/20">
                  <Play className="w-4 h-4" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Video Modal */}
      {isVideoOpen && selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative max-w-3xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <video
              src={selectedVideo.src}
              poster={selectedVideo.thumbnail}
              className="w-full rounded-xl"
              controls
              autoPlay
            />
          </div>
        </div>
      )}
    </div>
  );
}
