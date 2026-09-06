import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, Shield, CheckCircle2, UserPlus } from 'lucide-react';
import { Link } from 'wouter';
import { useAuth } from '../context/AuthContext';

export const Hero: React.FC = () => {
  const { user, openLoginModal } = useAuth();
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50/20 to-slate-50 border-b border-slate-200">
      {/* Subtle decorative background shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-orange-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-32 w-80 h-80 rounded-full bg-blue-50/60 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100/80 border border-orange-200/60 text-[#FF6B00] text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen FinTech Commerce</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Shop Smarter with <br className="hidden sm:inline" />
              <span className="text-[#FF6B00] relative inline-block">
                1Fi Marketplace
                <svg
                  className="absolute -bottom-1 left-0 w-full h-2 text-orange-300 -z-10"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
              Discover products with flexible EMI plans backed by mutual funds. Keep your investments growing while enjoying premium smartphones and gadgets with 0% interest tenures.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/products"
                id="hero-explore-products-btn"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF6B00] hover:bg-[#E05300] text-white text-sm font-bold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {!user && (
                <button
                  type="button"
                  id="hero-register-btn"
                  onClick={() => openLoginModal('register')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#FF6B00] text-sm font-bold border border-orange-200 shadow-xs transition-colors cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register New User</span>
                </button>
              )}

              <Link
                href="/products?zeroInterestOnly=true"
                id="hero-view-zero-interest-btn"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold border border-slate-200 shadow-xs transition-colors cursor-pointer"
              >
                <span>0% Interest Deals</span>
              </Link>
            </div>

            {/* Trust checkmarks */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Zero Downpayment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Instant Digital Lien Approval</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Up to ₹7,500 Additional Cashback</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic / Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/50 p-5 space-y-4">
              {/* Product mini showcase */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-orange-100 text-[#FF6B00] font-bold text-[11px] rounded-md uppercase">
                    Featured
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Mutual Fund Lien</span>
                </div>
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Portfolio Active
                </span>
              </div>

              {/* Device representation */}
              <Link
                href="/products/iphone-17-pro"
                className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100 hover:border-orange-200 transition-colors cursor-pointer group"
              >
                <div className="w-16 h-20 bg-white rounded-lg p-1.5 border border-slate-200 shadow-2xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <img
                    src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=300&q=80"
                    alt="iPhone 17 Pro"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] text-slate-400 font-bold uppercase">Apple</span>
                  <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-[#FF6B00] transition-colors">
                    Apple iPhone 17 Pro
                  </h4>
                  <p className="text-xs text-slate-500">Silver • 256 GB</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-sm font-extrabold text-slate-900">₹1,27,400</span>
                    <span className="text-xs text-slate-400 line-through">₹1,34,900</span>
                    <span className="text-[10px] font-bold text-[#FF6B00]">5% OFF</span>
                  </div>
                </div>
              </Link>

              {/* Sample EMI Card */}
              <div className="p-3 rounded-xl border-2 border-[#FF6B00] bg-orange-50/60 flex items-center justify-between shadow-xs">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base font-extrabold text-[#FF6B00]">₹21,233</span>
                    <span className="text-xs font-semibold text-slate-600">/ month</span>
                  </div>
                  <div className="text-xs text-slate-600 font-medium mt-0.5">
                    <span>6 Months</span> • <span className="text-emerald-700 font-bold">0% Interest</span>
                  </div>
                  <div className="text-[11px] text-orange-700 font-medium mt-0.5">
                    Additional cashback ₹7,500
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-[#FF6B00] flex items-center justify-center bg-white">
                  <div className="w-3 h-3 rounded-full bg-[#FF6B00]" />
                </div>
              </div>

              {/* Financial Protection Badge */}
              <div className="pt-1 flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg">
                <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="leading-tight">
                  Your mutual fund units remain invested and continue earning returns while servicing EMIs.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
