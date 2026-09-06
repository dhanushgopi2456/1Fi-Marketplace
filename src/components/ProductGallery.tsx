import React, { useState, useEffect } from 'react';
import { ProductImage } from '../types/product';
import { ZoomIn, ImageOff } from 'lucide-react';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  // Reset to first image if images array changes (e.g., variant change)
  useEffect(() => {
    setSelectedIndex(0);
    setIsImageLoading(true);
    setHasError(false);
  }, [images]);

  const currentImage = images[selectedIndex] || images[0];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 w-full">
      {/* Thumbnails list (vertical on md screens, horizontal on small screens) */}
      <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto max-h-[460px] pb-2 md:pb-0 scrollbar-none">
        {images.map((img, idx) => {
          const isSelected = idx === selectedIndex;
          return (
            <button
              key={img.id || idx}
              id={`gallery-thumb-${idx}`}
              onClick={() => {
                setSelectedIndex(idx);
                setIsImageLoading(true);
                setHasError(false);
              }}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl p-1 bg-white border-2 transition-all shrink-0 cursor-pointer overflow-hidden ${
                isSelected
                  ? 'border-[#FF6B00] ring-2 ring-orange-500/20 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
              }`}
              aria-label={`Select product image ${idx + 1}`}
            >
              <img
                src={img.url}
                alt={img.alt || `${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </button>
          );
        })}
      </div>

      {/* Main Large Display Image */}
      <div className="relative flex-1 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 flex items-center justify-center min-h-[340px] sm:min-h-[460px] overflow-hidden group">
        {/* Loading Spinner / Skeleton */}
        {isImageLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50/70 animate-pulse">
            <div className="w-8 h-8 border-3 border-orange-200 border-t-[#FF6B00] rounded-full animate-spin" />
          </div>
        )}

        {/* Fallback if error */}
        {hasError ? (
          <div className="flex flex-col items-center justify-center text-slate-400 py-12">
            <ImageOff className="w-12 h-12 mb-2 stroke-1" />
            <p className="text-xs">Product image unavailable</p>
          </div>
        ) : (
          <img
            id="gallery-main-image"
            src={currentImage?.url}
            alt={currentImage?.alt || productName}
            onLoad={() => setIsImageLoading(false)}
            onError={() => {
              setIsImageLoading(false);
              setHasError(true);
            }}
            className="w-auto max-h-[320px] sm:max-h-[420px] max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        )}

        {/* Zoom cue */}
        <div className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-slate-900/10 backdrop-blur-xs text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
