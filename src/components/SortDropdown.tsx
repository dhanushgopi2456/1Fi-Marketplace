import React from 'react';
import { ArrowUpDown } from 'lucide-react';

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center">
        <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
        <select
          id="product-sort-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none pl-8 pr-8 py-2 bg-white text-xs font-semibold text-slate-700 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent cursor-pointer shadow-2xs"
        >
          <option value="popularity">Sort by: Popularity</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="newest">Newest First</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
