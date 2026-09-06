import React from 'react';
import { Link } from 'wouter';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { ProductSummary } from '../types/product';
import { formatCurrency, calculateDiscount } from '../lib/utils';

interface ProductCardProps {
  product: ProductSummary;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const variant = product.defaultVariant || (product as any).variants?.[0];
  const image = variant?.images?.[0]?.url || (product as any).thumbnail || 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80';
  const price = variant?.price ?? (product as any).startingPrice ?? 0;
  const mrp = variant?.mrp ?? (product as any).originalPrice ?? price;
  const discount = calculateDiscount(mrp, price);
  const storage = variant?.storage || product.availableStorages?.[0] || '';
  const color = variant?.color || product.availableColors?.[0] || '';
  const availableColorsCount = product.availableColors?.length || (product as any).variants?.length || 1;

  return (
    <div
      id={`product-card-${product.slug}`}
      className="group bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-orange-300 transition-all duration-200 flex flex-col justify-between overflow-hidden"
    >
      <div>
        {/* Card Header Badges & Image */}
        <div className="relative p-5 bg-slate-50/70 border-b border-slate-100 flex items-center justify-center min-h-[220px]">
          {/* Discount Pill */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-[#FF6B00] text-white text-[11px] font-bold shadow-xs">
              {discount}% OFF
            </div>
          )}

          {/* Zero Cost EMI badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold">
            <Zap className="w-3 h-3" />
            <span>0% EMI</span>
          </div>

          {/* Product Image */}
          <Link href={`/products/${product.slug}`} className="w-full flex items-center justify-center">
            <img
              src={image}
              alt={variant?.images?.[0]?.alt || product.name}
              className="h-44 w-auto max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </Link>
        </div>

        {/* Product Details Content */}
        <div className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
            <span>{product.brand}</span>
            {storage && <span>{storage}</span>}
          </div>

          <Link href={`/products/${product.slug}`}>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-[#FF6B00] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
            {color ? `${color} • ` : ''}{availableColorsCount} finishes available
          </p>

          {/* Pricing Block */}
          <div className="mt-3.5 flex items-baseline gap-2 flex-wrap">
            <span className="text-lg font-extrabold text-slate-900">
              {formatCurrency(price)}
            </span>
            {mrp > price && (
              <span className="text-xs text-slate-400 line-through">
                {formatCurrency(mrp)}
              </span>
            )}
          </div>

          {/* EMI Starting Highlight Pill */}
          <div className="mt-3 p-2.5 rounded-xl bg-orange-50/80 border border-orange-200/70 flex items-center justify-between">
            <div className="text-left">
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight">
                EMI starting from
              </p>
              <p className="text-sm font-extrabold text-[#FF6B00]">
                {formatCurrency(product.startingEmi)}
                <span className="text-xs font-semibold text-slate-600"> / mo</span>
              </p>
            </div>
            <span className="text-[10px] font-bold text-orange-700 bg-orange-100/90 px-2 py-1 rounded-md">
              Mutual Fund Lien
            </span>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-5 pt-0">
        <Link
          href={`/products/${product.slug}`}
          id={`view-product-btn-${product.slug}`}
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-[#FF6B00] text-white text-xs font-bold transition-colors cursor-pointer group/btn"
        >
          <span>View Product & Plans</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
