import React from 'react';
import { Link } from 'wouter';
import { ShieldCheck, HeartHandshake, Zap, HelpCircle, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Footer: React.FC = () => {
  const { openInfoModal, openPayEmiModal } = useAuth();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      {/* Trust Highlights Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 border-b border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            onClick={() => openInfoModal('lien', 'Mutual Fund Collateral Lien Explained')}
            className="flex items-start gap-3 cursor-pointer group p-2 rounded-xl hover:bg-slate-800/40 transition-colors"
          >
            <div className="p-2.5 rounded-xl bg-slate-800 text-[#FF6B00] group-hover:scale-110 transition-transform shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-bold flex items-center gap-1 group-hover:text-[#FF6B00] transition-colors">
                <span>Mutual Fund Backed</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-[#FF6B00]" />
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Leverage your portfolio for zero-cost credit without liquidating your investments.
              </p>
            </div>
          </div>

          <div
            onClick={() => openInfoModal('returns', '100% Genuine Brand Warranty')}
            className="flex items-start gap-3 cursor-pointer group p-2 rounded-xl hover:bg-slate-800/40 transition-colors"
          >
            <div className="p-2.5 rounded-xl bg-slate-800 text-[#FF6B00] group-hover:scale-110 transition-transform shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-bold flex items-center gap-1 group-hover:text-[#FF6B00] transition-colors">
                <span>100% Genuine Products</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-[#FF6B00]" />
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Direct brand warranty and official manufacturer packaging on all devices.
              </p>
            </div>
          </div>

          <div
            onClick={() => openInfoModal('faq', 'Zero Hidden Fees & Cashback')}
            className="flex items-start gap-3 cursor-pointer group p-2 rounded-xl hover:bg-slate-800/40 transition-colors"
          >
            <div className="p-2.5 rounded-xl bg-slate-800 text-[#FF6B00] group-hover:scale-110 transition-transform shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-bold flex items-center gap-1 group-hover:text-[#FF6B00] transition-colors">
                <span>Transparent & No Hidden Fees</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-[#FF6B00]" />
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Clear monthly breakdowns, pre-approved cashback, and flexible tenures up to 60 months.
              </p>
            </div>
          </div>

          <div
            onClick={() => openInfoModal('support', '24x7 Priority Support')}
            className="flex items-start gap-3 cursor-pointer group p-2 rounded-xl hover:bg-slate-800/40 transition-colors"
          >
            <div className="p-2.5 rounded-xl bg-slate-800 text-[#FF6B00] group-hover:scale-110 transition-transform shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-bold flex items-center gap-1 group-hover:text-[#FF6B00] transition-colors">
                <span>24x7 Dedicated Support</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-[#FF6B00]" />
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Fintech customer assistance to guide your paperless lien and doorstep delivery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FF6B00] flex items-center justify-center text-white font-black text-base shadow-xs">
                1Fi
              </div>
              <span className="font-extrabold text-white text-xl tracking-tight">Marketplace</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Flexible shopping with convenient EMI plans. 1Fi Marketplace unlocks seamless purchasing power for premium devices, powered by India's first mutual fund lien credit engine.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800/80 rounded-full text-xs font-medium text-emerald-400 border border-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                RBI & SEBI Compliant Partner Network
              </span>
              <button
                type="button"
                onClick={() => openPayEmiModal()}
                className="px-3 py-1 bg-[#FF6B00]/20 text-[#FF6B00] hover:bg-[#FF6B00]/30 border border-[#FF6B00]/40 rounded-full text-xs font-bold transition-colors cursor-pointer"
              >
                Pay Active EMI
              </button>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Company</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => openInfoModal('about', 'About 1Fi Marketplace')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openInfoModal('about', 'Careers at 1Fi')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openInfoModal('lien', 'How 1Fi Works')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Mutual Fund Lien
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openInfoModal('contact', 'Contact 1Fi Support')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Categories</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products?category=Smartphones" className="hover:text-white transition-colors">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link href="/products?category=Electronics" className="hover:text-white transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/products?category=TV%2C%20AC%20%26%20Appliances" className="hover:text-white transition-colors">
                  TV & Appliances
                </Link>
              </li>
              <li>
                <Link href="/products?category=Kitchen%20%26%20Home" className="hover:text-white transition-colors">
                  Kitchen & Home
                </Link>
              </li>
              <li>
                <Link href="/products?category=Sports%20%26%20Fitness" className="hover:text-white transition-colors">
                  Sports & Fitness
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Support</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => openInfoModal('faq', 'Frequently Asked Questions')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openInfoModal('returns', 'Return & Replacement Policy')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Return Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openInfoModal('terms', 'Terms & Conditions')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openInfoModal('privacy', 'Security & Privacy Policy')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} 1Fi Marketplace. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 font-medium">Made in India 🇮🇳</span>
          <span>•</span>
          <span className="text-slate-400">Assignment Demo Project</span>
        </div>
      </div>
    </footer>
  );
};
