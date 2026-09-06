import React, { useState, useEffect } from 'react';
import { useLocation, useSearch } from 'wouter';
import { ProductCard } from '../components/ProductCard';
import { Filters } from '../components/Filters';
import { SortDropdown } from '../components/SortDropdown';
import { ProductCardSkeleton } from '../components/LoadingSkeleton';
import { ErrorState } from '../components/ErrorState';
import { ProductSummary } from '../types/product';
import { Filter, SlidersHorizontal, X, Search } from 'lucide-react';

export const ProductListingPage: React.FC = () => {
  const [location, setLocation] = useLocation();
  const searchString = useSearch();

  // Parse initial query params from URL search string
  const parseQueryParams = (queryStr: string) => {
    const raw = queryStr || window.location.search || '';
    const params = new URLSearchParams(raw.startsWith('?') ? raw.slice(1) : raw);

    return {
      category: params.get('category') || undefined,
      brand: params.get('brand') || undefined,
      search: params.get('search') || undefined,
      minPrice: params.get('minPrice') ? Number(params.get('minPrice')) : undefined,
      maxPrice: params.get('maxPrice') ? Number(params.get('maxPrice')) : undefined,
      tenure: params.get('tenure') ? Number(params.get('tenure')) : undefined,
      zeroInterestOnly: params.get('zeroInterestOnly') === 'true',
      inStockOnly: params.get('inStockOnly') === 'true',
      sort: params.get('sort') || 'popularity',
    };
  };

  const [filters, setFilters] = useState(parseQueryParams(searchString));
  const [sort, setSort] = useState(parseQueryParams(searchString).sort || 'popularity');
  const [inPageSearch, setInPageSearch] = useState(parseQueryParams(searchString).search || '');
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);

  // Sync state whenever URL query params change (e.g. from header search, nav clicks, browser back/forward)
  useEffect(() => {
    const updated = parseQueryParams(searchString);
    setFilters({
      category: updated.category,
      brand: updated.brand,
      search: updated.search,
      minPrice: updated.minPrice,
      maxPrice: updated.maxPrice,
      tenure: updated.tenure,
      zeroInterestOnly: updated.zeroInterestOnly,
      inStockOnly: updated.inStockOnly,
    });
    setInPageSearch(updated.search || '');
    if (updated.sort) setSort(updated.sort);
  }, [searchString, location]);

  const updateUrlWithFilters = (newFilters: typeof filters, newSort = sort) => {
    const params = new URLSearchParams();
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.brand) params.set('brand', newFilters.brand);
    if (newFilters.search) params.set('search', newFilters.search);
    if (newFilters.minPrice) params.set('minPrice', String(newFilters.minPrice));
    if (newFilters.maxPrice) params.set('maxPrice', String(newFilters.maxPrice));
    if (newFilters.tenure) params.set('tenure', String(newFilters.tenure));
    if (newFilters.zeroInterestOnly) params.set('zeroInterestOnly', 'true');
    if (newFilters.inStockOnly) params.set('inStockOnly', 'true');
    if (newSort && newSort !== 'popularity') params.set('sort', newSort);

    const qs = params.toString();
    setLocation(`/products${qs ? `?${qs}` : ''}`);
  };

  // Fetch products from backend whenever filters or sort changes
  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (filters.category) params.set('category', filters.category);
    if (filters.brand) params.set('brand', filters.brand);
    if (filters.search) params.set('search', filters.search);
    if (filters.minPrice) params.set('minPrice', String(filters.minPrice));
    if (filters.maxPrice) params.set('maxPrice', String(filters.maxPrice));
    if (filters.tenure) params.set('tenure', String(filters.tenure));
    if (filters.zeroInterestOnly) params.set('zeroInterestOnly', 'true');
    if (filters.inStockOnly) params.set('inStockOnly', 'true');
    if (sort) params.set('sort', sort);

    try {
      const url = `/api/products?${params.toString()}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`);
      const data = await res.json();
      setProducts(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Database query failed');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters, sort]);

  const handleResetFilters = () => {
    setInPageSearch('');
    setLocation('/products');
  };

  const handleInPageSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = inPageSearch.trim();
    updateUrlWithFilters({
      ...filters,
      search: q || undefined,
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {filters.category
                ? filters.category
                : filters.brand
                ? `${filters.brand} Catalog`
                : filters.zeroInterestOnly
                ? '0% Interest EMI Deals'
                : filters.search
                ? `Results for "${filters.search}"`
                : 'All Products & Appliances'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 flex flex-wrap items-center gap-2">
              <span>
                {filters.category
                  ? `Explore top-rated products in ${filters.category} with instant mutual fund collateral approval.`
                  : filters.brand
                  ? `Discover official ${filters.brand} products with genuine manufacturer warranty & flexible tenures.`
                  : filters.zeroInterestOnly
                  ? 'Handpicked zero-cost EMI offers with pre-approved CAMS/KFintech mutual fund credit.'
                  : 'Browse flagship electronics, appliances, and lifestyle products with mutual fund-backed flexible EMI plans.'}
              </span>
              {!isLoading && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-200/80 text-slate-700">
                  {products.length} {products.length === 1 ? 'item' : 'items'}
                </span>
              )}
            </p>
          </div>

          {/* Controls: In-page search, Mobile filter toggle & Desktop sort */}
          <div className="flex flex-wrap items-center gap-2.5 self-end md:self-auto">
            {/* In-page Search Bar */}
            <form onSubmit={handleInPageSearchSubmit} className="relative flex items-center">
              <input
                id="catalog-search-input"
                type="text"
                placeholder="Search this catalog..."
                value={inPageSearch}
                onChange={(e) => setInPageSearch(e.target.value)}
                className="w-44 sm:w-56 pl-8 pr-7 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#FF6B00] shadow-2xs transition-all"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
              {inPageSearch && (
                <button
                  type="button"
                  onClick={() => {
                    setInPageSearch('');
                    updateUrlWithFilters({ ...filters, search: undefined });
                  }}
                  className="absolute right-2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </form>

            {/* Mobile Filter Button */}
            <button
              id="mobile-filters-trigger"
              onClick={() => setIsMobileFiltersOpen(true)}
              className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-2xs cursor-pointer hover:bg-slate-50"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#FF6B00]" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <SortDropdown
              value={sort}
              onChange={(val) => {
                setSort(val);
                updateUrlWithFilters(filters, val);
              }}
            />
          </div>
        </div>

        {/* Active Filter Tags Bar */}
        {(filters.category || filters.brand || filters.search || filters.zeroInterestOnly || filters.tenure) && (
          <div className="flex flex-wrap items-center gap-2 py-4">
            <span className="text-xs font-semibold text-slate-400">Active filters:</span>
            {filters.search && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100 text-[#FF6B00] rounded-full text-xs font-bold shadow-2xs">
                Search: "{filters.search}"
                <X
                  className="w-3 h-3 cursor-pointer hover:opacity-75"
                  onClick={() => {
                    setInPageSearch('');
                    updateUrlWithFilters({ ...filters, search: undefined });
                  }}
                />
              </span>
            )}
            {filters.brand && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-200 text-slate-800 rounded-full text-xs font-semibold shadow-2xs">
                Brand: {filters.brand}
                <X
                  className="w-3 h-3 cursor-pointer hover:opacity-75"
                  onClick={() => updateUrlWithFilters({ ...filters, brand: undefined })}
                />
              </span>
            )}
            {filters.category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 text-white rounded-full text-xs font-bold shadow-2xs">
                Category: {filters.category}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-orange-300"
                  onClick={() => updateUrlWithFilters({ ...filters, category: undefined })}
                />
              </span>
            )}
            {filters.zeroInterestOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold shadow-2xs">
                0% Interest Only
                <X
                  className="w-3 h-3 cursor-pointer hover:opacity-75"
                  onClick={() => updateUrlWithFilters({ ...filters, zeroInterestOnly: false })}
                />
              </span>
            )}
            {filters.tenure && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-200 text-slate-800 rounded-full text-xs font-semibold shadow-2xs">
                {filters.tenure} Months Tenure
                <X
                  className="w-3 h-3 cursor-pointer hover:opacity-75"
                  onClick={() => updateUrlWithFilters({ ...filters, tenure: undefined })}
                />
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="text-xs text-orange-600 hover:text-orange-700 hover:underline font-semibold ml-2 cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden md:block md:col-span-3">
            <Filters
              filters={filters}
              onChange={(newFilters) => updateUrlWithFilters(newFilters)}
              onReset={handleResetFilters}
            />
          </aside>

          {/* Product Grid Area */}
          <main className="col-span-1 md:col-span-9">
            {/* Loading */}
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </div>
            )}

            {/* Error */}
            {error && (
              <ErrorState
                title="Failed to fetch products"
                message={error}
                onRetry={fetchProducts}
              />
            )}

            {/* Empty State */}
            {!isLoading && !error && products.length === 0 && (
              <ErrorState
                type="empty"
                title="No products match your criteria"
                message="Try adjusting your filters or price range to find available devices."
                onRetry={handleResetFilters}
              />
            )}

            {/* Grid */}
            {!isLoading && !error && products.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Slide-over Modal */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="relative z-10 w-4/5 max-w-xs bg-white h-full shadow-2xl p-4 overflow-y-auto ml-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <span className="font-bold text-slate-900 text-sm">Filter Products</span>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <Filters
              filters={filters}
              onChange={(newFilters) => updateUrlWithFilters(newFilters)}
              onReset={handleResetFilters}
            />
            <div className="pt-4">
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full py-2.5 bg-[#FF6B00] text-white text-xs font-bold rounded-xl"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
