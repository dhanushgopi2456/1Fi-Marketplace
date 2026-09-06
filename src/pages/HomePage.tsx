import React, { useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/LoadingSkeleton';
import { ErrorState } from '../components/ErrorState';
import { ProductSummary } from '../types/product';
import { ArrowRight, Zap, ShieldCheck, TrendingUp, Sparkles, Smartphone, CheckCircle2 } from 'lucide-react';
import { Link } from 'wouter';

export const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<ProductSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to load products from database');
      const data = await res.json();
      setFeaturedProducts(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Database connection error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <Hero />

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#FF6B00] text-xs font-bold mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Direct Database Synchronized</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Flagship Smartphones
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Top devices available with zero-cost and mutual-fund backed EMI tenures.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#FF6B00] hover:text-[#E05300] transition-colors group cursor-pointer"
          >
            <span>View All Devices</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </div>
        )}

        {/* Error State */}
        {error && (
          <ErrorState
            title="Unable to load products"
            message={error}
            onRetry={fetchProducts}
          />
        )}

        {/* Products Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* How 1Fi Mutual Fund EMI Works */}
      <section className="bg-white border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider">
              Smart Financing Explained
            </h3>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              How Mutual Fund Backed EMI Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Instead of liquidating your investments or relying on expensive personal loans, pledge your mutual fund units to enjoy low or 0% interest EMIs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 relative space-y-3">
              <span className="w-8 h-8 rounded-full bg-[#FF6B00] text-white font-black text-sm flex items-center justify-center shadow-xs">
                1
              </span>
              <h4 className="font-bold text-slate-900 text-base">Select Your Device & Plan</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose from Apple, Samsung, Google flagship smartphones and pick a tenure from 3 to 60 months with attractive cashback.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 relative space-y-3">
              <span className="w-8 h-8 rounded-full bg-[#FF6B00] text-white font-black text-sm flex items-center justify-center shadow-xs">
                2
              </span>
              <h4 className="font-bold text-slate-900 text-base">Instant Digital Lien</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Verify your mutual fund portfolio online with a secure CAMS/KFintech OTP. No paperwork, no branch visits, and zero asset sale.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 relative space-y-3">
              <span className="w-8 h-8 rounded-full bg-[#FF6B00] text-white font-black text-sm flex items-center justify-center shadow-xs">
                3
              </span>
              <h4 className="font-bold text-slate-900 text-base">Doorstep Delivery & Compounding</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your device ships immediately with zero downpayment while your mutual fund continues compounding and generating returns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Comparison Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 bg-orange-500/20 border border-orange-400/30 text-orange-400 text-xs font-bold rounded-full uppercase tracking-wider">
              Fintech Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Why 1Fi Beats Traditional Credit Cards
            </h2>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero impact on your credit card limit or CIBIL utilization</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Keep earning SIP dividends and NAV appreciation while servicing installments</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Guaranteed cashback up to ₹7,500 credited back to your account</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF6B00] hover:bg-[#E05300] text-white text-xs sm:text-sm font-bold shadow-md shadow-orange-500/30 transition-all cursor-pointer"
              >
                <span>Browse Marketplace</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
