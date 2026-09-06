import React from 'react';
import { ProductVariant } from '../types/product';
import { Check } from 'lucide-react';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
}

// Map color names to realistic CSS visual swatches
const COLOR_HEX_MAP: Record<string, string> = {
  Silver: '#E3E4E5',
  Orange: '#FF6B00',
  Blue: '#2D5584',
  'Titanium Black': '#282828',
  'Titanium Gray': '#8E8E93',
  'Titanium Blue': '#3C4B5E',
  Obsidian: '#202124',
  Hazel: '#7B8277',
  Porcelain: '#F5F5F0',
};

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariant,
  onSelectVariant,
}) => {
  // Extract distinct available colors
  const availableColors: string[] = Array.from(new Set(variants.map((v) => v.color)));

  // Extract distinct storage options
  const availableStorages: string[] = Array.from(new Set(variants.map((v) => v.storage)));

  const handleColorChange = (newColor: string) => {
    // Try to keep currently selected storage if available in new color
    const match =
      variants.find((v) => v.color === newColor && v.storage === selectedVariant.storage) ||
      variants.find((v) => v.color === newColor);

    if (match) {
      onSelectVariant(match);
    }
  };

  const handleStorageChange = (newStorage: string) => {
    // Try to keep currently selected color if available in new storage
    const match =
      variants.find((v) => v.storage === newStorage && v.color === selectedVariant.color) ||
      variants.find((v) => v.storage === newStorage);

    if (match) {
      onSelectVariant(match);
    }
  };

  return (
    <div className="space-y-6 pt-2">
      {/* Color Swatches */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Color:{' '}
            <span className="text-[#FF6B00] font-bold normal-case tracking-normal ml-1">
              {selectedVariant.color}
            </span>
          </label>
          <span className="text-xs text-slate-400 font-medium">
            {availableColors.length} Finishes
          </span>
        </div>

        <div className="flex items-center gap-3">
          {availableColors.map((colorName: string) => {
            const isSelected = selectedVariant.color === colorName;
            const hex = COLOR_HEX_MAP[colorName] || '#CBD5E1';

            return (
              <button
                key={colorName}
                id={`color-swatch-${colorName.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleColorChange(colorName)}
                className={`group relative flex items-center justify-center w-10 h-10 rounded-full transition-all cursor-pointer p-0.5 ${
                  isSelected
                    ? 'ring-2 ring-[#FF6B00] ring-offset-2 scale-110'
                    : 'hover:scale-105 opacity-85 hover:opacity-100'
                }`}
                title={colorName}
                aria-label={`Select color ${colorName}`}
              >
                <span
                  className="w-full h-full rounded-full border border-black/10 shadow-xs flex items-center justify-center"
                  style={{ backgroundColor: hex }}
                >
                  {isSelected && (
                    <Check
                      className={`w-4 h-4 ${
                        colorName === 'Silver' || colorName === 'Porcelain'
                          ? 'text-slate-800'
                          : 'text-white'
                      }`}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Storage Selectable Pills */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Storage:{' '}
            <span className="text-[#FF6B00] font-bold normal-case tracking-normal ml-1">
              {selectedVariant.storage}
            </span>
          </label>
          <span className="text-xs text-slate-400 font-medium">Internal Memory</span>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {availableStorages.map((storageOption: string) => {
            const isSelected = selectedVariant.storage === storageOption;
            // Check if this storage is available in current color
            const isAvailableForColor = variants.some(
              (v) => v.storage === storageOption && v.color === selectedVariant.color
            );

            return (
              <button
                key={storageOption}
                id={`storage-pill-${storageOption.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleStorageChange(storageOption)}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#FF6B00] text-white border-[#FF6B00] shadow-sm shadow-orange-500/20'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                } ${!isAvailableForColor ? 'border-dashed' : ''}`}
              >
                {storageOption}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
