import React from 'react';
import { Product, ProductVariant } from '../types/product';
import { EmiPlan } from '../types/emi';
import { VariantSelector } from './VariantSelector';
import { EmiPlanList } from './EmiPlanList';
import { formatCurrency, calculateDiscount, calculateSavings } from '../lib/utils';
import { Truck, ShieldCheck, RefreshCw, Zap, Star } from 'lucide-react';

interface ProductInfoProps {
  product: Product;
  selectedVariant: ProductVariant;
  selectedPlan: EmiPlan | null;
  onSelectVariant: (variant: ProductVariant) => void;
  onSelectPlan: (plan: EmiPlan) => void;
  onProceedCheckout: () => void;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  selectedVariant,
  selectedPlan,
  onSelectVariant,
  onSelectPlan,
  onProceedCheckout,
}) => {
  if (!selectedVariant) {
    return null;
  }

  const discount = calculateDiscount(selectedVariant.mrp, selectedVariant.price);
  const savings = calculateSavings(selectedVariant.mrp, selectedVariant.price);

  return (
    <div className="space-y-6">
      {/* Product Titles & Ratings */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-bold text-[#FF6B00] bg-orange-100/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            NEW RELEASE
          </span>
          <span className="text-xs font-semibold text-slate-500">{product.brand}</span>
          <div className="ml-auto flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-50 px-2 py-0.5 rounded-md">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>4.9</span>
            <span className="text-slate-400 font-normal">(1,248)</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {product.name}
        </h1>

        <p className="text-sm font-semibold text-slate-600 mt-1">
          {selectedVariant.color} • {selectedVariant.storage}
        </p>
      </div>

      {/* Pricing Showcase Block */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="text-3xl font-black text-slate-900">
            {formatCurrency(selectedVariant.price)}
          </span>
          {selectedVariant.mrp > selectedVariant.price && (
            <span className="text-sm font-semibold text-slate-400 line-through">
              MRP {formatCurrency(selectedVariant.mrp)}
            </span>
          )}
          {discount > 0 && (
            <span className="text-xs font-extrabold text-white bg-[#FF6B00] px-2.5 py-1 rounded-md">
              {discount}% OFF
            </span>
          )}
        </div>

        {savings > 0 && (
          <p className="text-xs text-emerald-700 font-semibold mt-1.5">
            You save {formatCurrency(savings)} with 1Fi direct market pricing
          </p>
        )}

        <div className="mt-2.5 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
          <span>Inclusive of all taxes</span>
          <span className="text-emerald-600 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            In Stock ({selectedVariant.stock} units available)
          </span>
        </div>
      </div>

      {/* Variant Selector (Colors & Storages) */}
      <VariantSelector
        variants={product.variants}
        selectedVariant={selectedVariant}
        onSelectVariant={onSelectVariant}
      />

      {/* Product Description */}
      <div className="pt-2">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
          About Product
        </h4>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Assurance Badges */}
      <div className="grid grid-cols-3 gap-2.5 py-3 border-y border-slate-200/80 text-center">
        <div className="p-2 rounded-xl bg-slate-50 flex flex-col items-center">
          <Truck className="w-4 h-4 text-[#FF6B00] mb-1" />
          <span className="text-[11px] font-bold text-slate-800">Free Express</span>
          <span className="text-[10px] text-slate-400">2-3 Day Delivery</span>
        </div>
        <div className="p-2 rounded-xl bg-slate-50 flex flex-col items-center">
          <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1" />
          <span className="text-[11px] font-bold text-slate-800">100% Genuine</span>
          <span className="text-[10px] text-slate-400">Brand Warranty</span>
        </div>
        <div className="p-2 rounded-xl bg-slate-50 flex flex-col items-center">
          <RefreshCw className="w-4 h-4 text-blue-600 mb-1" />
          <span className="text-[11px] font-bold text-slate-800">7 Days Return</span>
          <span className="text-[10px] text-slate-400">Hassle Free</span>
        </div>
      </div>

      {/* EMI Plans Section */}
      <EmiPlanList
        plans={selectedVariant.emiPlans}
        selectedPlan={selectedPlan}
        onSelectPlan={onSelectPlan}
        onProceed={onProceedCheckout}
      />
    </div>
  );
};
