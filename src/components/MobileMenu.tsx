import React from 'react';
import {
  X,
  User,
  ChevronRight,
  HelpCircle,
  Phone,
  FileText,
  ShieldCheck,
  Tag,
  Smartphone,
  CreditCard,
  LogOut,
  LogIn,
  UserPlus,
  RotateCcw,
} from 'lucide-react';
import { Link } from 'wouter';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: { name: string; count?: number }[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const {
    user,
    openLoginModal,
    openLogoutModal,
    openPayEmiModal,
    openAccountModal,
    openInfoModal,
  } = useAuth();

  if (!isOpen) return null;

  const categoriesList = [
    { name: 'Smartphones', path: '/products?category=Smartphones' },
    { name: 'Electronics', path: '/products?category=Electronics' },
    { name: 'TV & Appliances', path: '/products?category=TV%2C%20AC%20%26%20Appliances' },
    { name: 'Kitchen & Home', path: '/products?category=Kitchen%20%26%20Home' },
    { name: 'Health & Wellness', path: '/products?category=Health%20%26%20Wellness' },
    { name: 'Fashion', path: '/products?category=Fashion' },
    { name: 'Baby & Kids', path: '/products?category=Baby%20%26%20Kids' },
    { name: 'Sports & Fitness', path: '/products?category=Sports%20%26%20Fitness' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        id="mobile-menu-backdrop"
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        id="mobile-menu-drawer"
        className="relative z-10 w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto"
      >
        <div>
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#FF6B00] text-white font-black text-sm tracking-tight shadow-xs">
                1Fi
              </span>
              <span className="font-bold text-slate-900 text-lg tracking-tight">Marketplace</span>
            </div>
            <button
              id="close-mobile-menu-btn"
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-md hover:bg-slate-200/60 cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Account Tile */}
          <div className="p-4 border-b border-slate-100">
            {user ? (
              <div
                onClick={() => {
                  onClose();
                  openAccountModal();
                }}
                className="flex items-center gap-3 p-3 bg-orange-50/70 border border-orange-200/70 rounded-xl cursor-pointer hover:bg-orange-100/70 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#E05300] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-extrabold text-slate-900 truncate">{user.name}</p>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-100 px-1.5 py-0.2 rounded">
                      Verified
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">
                    Limit: {formatCurrency(user.pledgedLienLimit)}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-orange-400 shrink-0" />
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    openLoginModal('register');
                  }}
                  className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl cursor-pointer hover:bg-orange-100 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FF6B00] text-white flex items-center justify-center font-bold shadow-xs shrink-0">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-[#FF6B00] font-black uppercase tracking-wider">
                      New Shopper
                    </p>
                    <p className="text-sm font-bold text-slate-900 leading-tight">Register New User</p>
                    <p className="text-[11px] text-slate-500">Get Instant Mutual Fund Lien</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-orange-400 shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    openLoginModal('demo');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5 text-slate-400" />
                  <span>Existing User / Demo Sign In</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick CTAs: Pay EMI and Deals */}
          <div className="p-3 border-b border-slate-100 space-y-1">
            <button
              type="button"
              onClick={() => {
                onClose();
                openPayEmiModal();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#FF6B00] font-bold text-xs transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Pay Active EMI
              </span>
              <span className="text-[10px] bg-white text-[#FF6B00] px-2 py-0.5 rounded-full border border-orange-200">
                Fast Pay
              </span>
            </button>

            <Link
              href="/products"
              onClick={onClose}
              className="flex items-center justify-between p-2.5 rounded-lg text-slate-700 hover:bg-slate-50 text-sm font-medium"
            >
              <span className="flex items-center gap-2.5">
                <Smartphone className="w-4 h-4 text-[#FF6B00]" />
                Browse All Products
              </span>
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-semibold">
                Catalog
              </span>
            </Link>

            <Link
              href="/products?zeroInterestOnly=true"
              onClick={onClose}
              className="flex items-center justify-between p-2.5 rounded-lg text-slate-700 hover:bg-slate-50 text-sm font-medium"
            >
              <span className="flex items-center gap-2.5">
                <Tag className="w-4 h-4 text-[#FF6B00]" />
                0% Interest Deals
              </span>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                Special
              </span>
            </Link>
          </div>

          {/* Categories */}
          <div className="p-4 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Categories
            </h4>
            <div className="space-y-1">
              {categoriesList.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.path}
                  onClick={onClose}
                  className="flex items-center justify-between py-2 px-2 rounded text-slate-700 hover:text-[#FF6B00] text-sm hover:bg-orange-50/50"
                >
                  <span>{cat.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Support and Info Links */}
          <div className="p-4 space-y-1">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Help & Legal
            </h4>
            <button
              type="button"
              onClick={() => {
                onClose();
                openInfoModal('faq', 'Frequently Asked Questions');
              }}
              className="w-full flex items-center gap-2.5 py-2 px-2 text-slate-600 hover:text-slate-900 text-sm cursor-pointer text-left"
            >
              <HelpCircle className="w-4 h-4 text-slate-400" />
              FAQs & Mutual Fund Lien
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                openInfoModal('contact', 'Contact 1Fi Concierge');
              }}
              className="w-full flex items-center gap-2.5 py-2 px-2 text-slate-600 hover:text-slate-900 text-sm cursor-pointer text-left"
            >
              <Phone className="w-4 h-4 text-slate-400" />
              Contact Us & Support
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                openInfoModal('returns', 'Replacement & Returns Policy');
              }}
              className="w-full flex items-center gap-2.5 py-2 px-2 text-slate-600 hover:text-slate-900 text-sm cursor-pointer text-left"
            >
              <RotateCcw className="w-4 h-4 text-slate-400" />
              Returns & Replacement
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                openInfoModal('privacy', 'Security & Privacy Policy');
              }}
              className="w-full flex items-center gap-2.5 py-2 px-2 text-slate-600 hover:text-slate-900 text-sm cursor-pointer text-left"
            >
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              Privacy & CAMS Security
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                openInfoModal('terms', 'Terms & Conditions');
              }}
              className="w-full flex items-center gap-2.5 py-2 px-2 text-slate-600 hover:text-slate-900 text-sm cursor-pointer text-left"
            >
              <FileText className="w-4 h-4 text-slate-400" />
              Terms & Conditions
            </button>

            {user && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  openLogoutModal();
                }}
                className="w-full flex items-center gap-2.5 py-2 px-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-semibold cursor-pointer text-left mt-2"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                Sign Out
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
          <p className="text-xs text-slate-500 font-medium">1Fi Marketplace • Made in India 🇮🇳</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Mutual fund backed zero-cost EMIs</p>
        </div>
      </div>
    </div>
  );
};
