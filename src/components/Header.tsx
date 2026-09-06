import React, { useState, useEffect } from 'react';
import {
  Search,
  Menu,
  User,
  ShoppingBag,
  CreditCard,
  Sparkles,
  ChevronDown,
  LogOut,
  LogIn,
  UserPlus,
  X,
} from 'lucide-react';
import { Link, useLocation, useSearch } from 'wouter';
import { MobileMenu } from './MobileMenu';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onSearch?: (query: string) => void;
  categories?: { name: string; count?: number }[];
}

export const Header: React.FC<HeaderProps> = ({ onSearch, categories = [] }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [location, setLocation] = useLocation();
  const searchString = useSearch();

  // Sync searchQuery with current URL search param
  useEffect(() => {
    const params = new URLSearchParams(searchString);
    const searchParam = params.get('search');
    if (searchParam !== null) {
      setSearchQuery(searchParam);
    } else if (location === '/' || location === '/products') {
      setSearchQuery('');
    }
  }, [searchString, location]);

  const {
    user,
    openLoginModal,
    openLogoutModal,
    openPayEmiModal,
    openAccountModal,
    openInfoModal,
  } = useAuth();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (onSearch) {
      onSearch(q);
    }
    setShowMobileSearch(false);
    if (q) {
      setLocation(`/products?search=${encodeURIComponent(q)}`);
    } else {
      setLocation('/products');
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    if (onSearch) {
      onSearch('');
    }
    const params = new URLSearchParams(searchString);
    if (params.has('search')) {
      params.delete('search');
      const qs = params.toString();
      setLocation(`/products${qs ? `?${qs}` : ''}`);
    }
  };

  const navCategories = [
    { name: 'Deals', path: '/products?zeroInterestOnly=true', highlight: true, key: 'deals' },
    { name: 'Smartphones', path: '/products?category=Smartphones', key: 'smartphones' },
    { name: 'Electronics', path: '/products?category=Electronics', key: 'electronics' },
    { name: 'TV & Appliances', path: '/products?category=TV%2C%20AC%20%26%20Appliances', key: 'tv' },
    { name: 'Kitchen & Home', path: '/products?category=Kitchen%20%26%20Home', key: 'kitchen' },
    { name: 'Health & Wellness', path: '/products?category=Health%20%26%20Wellness', key: 'health' },
    { name: 'Fashion', path: '/products?category=Fashion', key: 'fashion' },
    { name: 'Baby & Kids', path: '/products?category=Baby%20%26%20Kids', key: 'baby' },
    { name: 'Sports & Fitness', path: '/products?category=Sports%20%26%20Fitness', key: 'sports' },
  ];

  // Helper to check if a subnav item is currently active
  const isNavActive = (item: typeof navCategories[0]) => {
    if (!location.startsWith('/products')) return false;
    const params = new URLSearchParams(searchString);
    if (item.key === 'deals') {
      return params.get('zeroInterestOnly') === 'true';
    }
    const activeCat = (params.get('category') || '').toLowerCase();
    if (!activeCat) return false;
    return activeCat.includes(item.key);
  };

  const handleNavClick = (item: typeof navCategories[0]) => {
    setLocation(item.path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Banner with trust highlight & functional modal triggers */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-white">Smart Shopping:</span>
            <span>Get flexible EMI plans backed by your mutual funds with instant digital lien</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button
              type="button"
              onClick={() => openInfoModal('about', 'Download 1Fi App')}
              className="hover:text-white cursor-pointer transition-colors"
            >
              Download 1Fi App
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => openInfoModal('support', '24x7 Priority Support')}
              className="hover:text-white cursor-pointer transition-colors"
            >
              24x7 Support
            </button>
            <span>•</span>
            <span className="text-orange-400 font-semibold">0% Downpayment Available</span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Mobile hamburger & Logo */}
          <div className="flex items-center gap-3">
            <button
              id="header-mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-1 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg md:hidden cursor-pointer"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#E05300] flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                1Fi
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight leading-none group-hover:text-[#FF6B00] transition-colors">
                  Marketplace
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 tracking-wide">
                  Mutual Fund Backed EMI
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <div className="relative flex items-center">
                <input
                  id="desktop-search-input"
                  type="text"
                  placeholder="Search for smartphones, brands, electronics or EMI plans..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-28 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 border border-slate-200 rounded-full focus:outline-hidden focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition-all shadow-2xs"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-20 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  id="desktop-search-submit-btn"
                  type="submit"
                  className="absolute right-1.5 px-4 py-1.5 bg-[#FF6B00] hover:bg-[#E05300] text-white text-xs font-semibold rounded-full transition-colors shadow-2xs cursor-pointer"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Search Toggle */}
            <button
              id="mobile-search-toggle"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg md:hidden cursor-pointer"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Pay EMI CTA - Opens Animated PayEmiModal */}
            <button
              id="header-pay-emi-btn"
              type="button"
              onClick={() => openPayEmiModal()}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-orange-200 bg-orange-50/80 text-[#FF6B00] hover:bg-orange-100 hover:border-orange-300 text-xs font-bold transition-all shadow-2xs cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Pay EMI</span>
            </button>

            {/* Explore Products Button */}
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-orange-400" />
              <span>All Products</span>
            </Link>

            {/* Sign In / User Profile Drawer Trigger */}
            <div className="flex items-center gap-2 border-l border-slate-200 pl-2 sm:pl-3">
              {user ? (
                <div className="flex items-center gap-1">
                  <button
                    id="header-user-account-btn"
                    type="button"
                    onClick={openAccountModal}
                    className="flex items-center gap-2 py-1.5 px-2.5 rounded-xl hover:bg-slate-100 transition-colors text-left cursor-pointer group"
                    title={`Account: ${user.name}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#E05300] text-white flex items-center justify-center font-black text-xs shadow-2xs">
                      {user.name.charAt(0)}
                    </div>
                    <div className="hidden xl:block">
                      <p className="text-xs font-bold text-slate-900 leading-none group-hover:text-[#FF6B00] transition-colors">
                        {user.name}
                      </p>
                      <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                        KYC Verified
                      </p>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:block" />
                  </button>

                  <button
                    type="button"
                    onClick={openLogoutModal}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer hidden sm:block"
                    title="Sign Out"
                    aria-label="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    id="header-register-btn"
                    type="button"
                    onClick={() => openLoginModal('register')}
                    className="flex items-center gap-1.5 py-2 px-3 sm:px-3.5 rounded-xl bg-[#FF6B00] hover:bg-[#E05300] text-white text-xs font-bold shadow-xs transition-all cursor-pointer whitespace-nowrap"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Register</span>
                  </button>

                  <button
                    id="header-login-btn"
                    type="button"
                    onClick={() => openLoginModal('demo')}
                    className="hidden sm:flex items-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer whitespace-nowrap"
                  >
                    <LogIn className="w-3.5 h-3.5 text-slate-400" />
                    <span>Sign In</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search input expander */}
        {showMobileSearch && (
          <div className="py-2 pb-3 md:hidden border-t border-slate-100">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                id="mobile-search-input"
                type="text"
                placeholder="Search products, brands, or EMI..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-24 py-2 bg-slate-100 focus:bg-white text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#FF6B00]"
                autoFocus
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-18 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1 px-3 py-1 bg-[#FF6B00] text-white text-xs font-semibold rounded-md cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Subnavigation Categories Bar - Works on both mobile and desktop */}
      <div className="bg-slate-50 border-t border-slate-200/80 overflow-x-auto scrollbar-none shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-1.5 sm:space-x-3 py-2 text-xs font-semibold whitespace-nowrap">
            {navCategories.map((item) => {
              const active = isNavActive(item);
              return (
                <button
                  key={item.name}
                  id={`nav-category-${item.key}`}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  className={`py-1.5 px-3 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold select-none ${
                    active
                      ? item.highlight
                        ? 'bg-[#FF6B00] text-white font-bold shadow-xs'
                        : 'bg-slate-900 text-white font-bold shadow-xs'
                      : item.highlight
                      ? 'text-[#FF6B00] hover:bg-orange-100/70 font-bold bg-orange-50/80'
                      : 'text-slate-700 hover:text-[#FF6B00] hover:bg-slate-100'
                  }`}
                >
                  {item.highlight && (
                    <Sparkles className={`w-3.5 h-3.5 ${active ? 'text-white' : 'text-[#FF6B00]'}`} />
                  )}
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        categories={categories}
      />
    </header>
  );
};
