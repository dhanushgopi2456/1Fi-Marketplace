import React from 'react';
import { RotateCcw, Filter, Check, Zap } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

interface FiltersState {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  tenure?: number;
  zeroInterestOnly?: boolean;
  inStockOnly?: boolean;
}

interface FiltersProps {
  filters: FiltersState;
  onChange: (newFilters: FiltersState) => void;
  onReset: () => void;
  categories?: { name: string; count?: number }[];
}

export const Filters: React.FC<FiltersProps> = ({
  filters,
  onChange,
  onReset,
  categories = [],
}) => {
  const defaultCategories = [
    'Smartphones',
    'Electronics',
    'TV, AC & Appliances',
    'Kitchen & Home',
    'Health & Wellness',
    'Fashion',
    'Baby & Kids',
    'Sports & Fitness',
  ];

  const availableCategories =
    categories.length > 0 ? categories.map((c) => c.name) : defaultCategories;

  const brands = [
    'Apple',
    'Samsung',
    'Google',
    'Sony',
    'LG',
    'Dyson',
    'Philips',
    'Nike',
    'Garmin',
  ];
  const tenures = [3, 6, 12, 24, 36, 48, 60];

  const isCategorySelected = (cat: string) => {
    if (!filters.category) return false;
    if (filters.category.toLowerCase() === cat.toLowerCase()) return true;
    const fc = filters.category.toLowerCase();
    const c = cat.toLowerCase();
    if (fc.includes('tv') && fc.includes('appliance') && c.includes('tv') && c.includes('appliance')) {
      return true;
    }
    return false;
  };

  const handleCategoryClick = (cat: string) => {
    const isSelected = isCategorySelected(cat);
    onChange({
      ...filters,
      category: isSelected ? undefined : cat,
    });
  };

  const handleBrandClick = (brandName: string) => {
    onChange({
      ...filters,
      brand: filters.brand === brandName ? undefined : brandName,
    });
  };

  const handleTenureClick = (t: number) => {
    onChange({
      ...filters,
      tenure: filters.tenure === t ? undefined : t,
    });
  };

  const hasActiveFilters =
    filters.category ||
    filters.brand ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.tenure ||
    filters.zeroInterestOnly ||
    filters.inStockOnly;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <Filter className="w-4 h-4 text-[#FF6B00]" />
          <span>Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            id="reset-filters-btn"
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-semibold text-[#FF6B00] hover:text-[#E05300] cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* 0% Interest Fast Toggle */}
      <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200/70 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#FF6B00]" />
          <span className="text-xs font-bold text-slate-900">0% Interest Only</span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={filters.zeroInterestOnly}
          onClick={() => onChange({ ...filters, zeroInterestOnly: !filters.zeroInterestOnly })}
          className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
            filters.zeroInterestOnly ? 'bg-[#FF6B00]' : 'bg-slate-300'
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
              filters.zeroInterestOnly ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Brands */}
      <div>
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2.5">
          Brand
        </label>
        <div className="space-y-1.5">
          {brands.map((b) => {
            const isSelected = filters.brand?.toLowerCase() === b.toLowerCase();
            return (
              <button
                key={b}
                onClick={() => handleBrandClick(b)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-orange-100/80 text-[#FF6B00] font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{b}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#FF6B00]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2.5">
          Category
        </label>
        <div className="space-y-1.5">
          {availableCategories.map((cat) => {
            const isSelected = isCategorySelected(cat);
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-orange-100/80 text-[#FF6B00] font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{cat}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#FF6B00]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2.5">
          Price Range
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[10px] text-slate-400 font-semibold">Min (₹)</span>
            <input
              type="number"
              placeholder="50,000"
              value={filters.minPrice || ''}
              onChange={(e) =>
                onChange({
                  ...filters,
                  minPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="w-full mt-1 px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#FF6B00] focus:outline-hidden"
            />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold">Max (₹)</span>
            <input
              type="number"
              placeholder="1,60,000"
              value={filters.maxPrice || ''}
              onChange={(e) =>
                onChange({
                  ...filters,
                  maxPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="w-full mt-1 px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#FF6B00] focus:outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* EMI Tenure Filter */}
      <div>
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2.5">
          EMI Tenure (Months)
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {tenures.map((t) => {
            const isSelected = filters.tenure === t;
            return (
              <button
                key={t}
                onClick={() => handleTenureClick(t)}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#FF6B00] text-white border-[#FF6B00]'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {t} Mo
              </button>
            );
          })}
        </div>
      </div>

      {/* Availability */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-700">In Stock Only</span>
        <input
          type="checkbox"
          checked={!!filters.inStockOnly}
          onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })}
          className="rounded border-slate-300 text-[#FF6B00] focus:ring-[#FF6B00] w-4 h-4 cursor-pointer"
        />
      </div>
    </div>
  );
};
