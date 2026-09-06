import React from 'react';
import { motion } from 'motion/react';
import {
  X,
  HelpCircle,
  ShieldCheck,
  FileText,
  HeartHandshake,
  Phone,
  RotateCcw,
  CheckCircle2,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import { useAuth, InfoModalType } from '../context/AuthContext';

export const InfoModal: React.FC = () => {
  const { infoModalData, closeInfoModal, openLoginModal, openPayEmiModal } = useAuth();

  if (!infoModalData) return null;

  const { type, title } = infoModalData;

  const renderContent = (modalType: InfoModalType) => {
    switch (modalType) {
      case 'faq':
        return (
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <h5 className="font-bold text-slate-900 text-sm">
                How does mutual fund-backed shopping work?
              </h5>
              <p className="text-slate-600 leading-relaxed">
                When you purchase a product on 1Fi, instead of taking an unsecured loan or liquidating your investments, a digital lien is marked on your existing mutual funds via CAMS or KFintech OTP. Your funds continue to generate returns and compound daily while you repay the EMI.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <h5 className="font-bold text-slate-900 text-sm">
                Will my mutual fund units be sold or redeemed?
              </h5>
              <p className="text-slate-600 leading-relaxed">
                No! Your mutual funds remain 100% yours. You continue to earn dividends and portfolio appreciation. Units are never sold as long as monthly installments are met. Once the tenure finishes, the lien is instantly released automatically.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <h5 className="font-bold text-slate-900 text-sm">
                What are the available tenure options and interest rates?
              </h5>
              <p className="text-slate-600 leading-relaxed">
                We offer tenures ranging from 3, 6, 12, 24, 36, 48, to 60 months. Tenures of 3, 6, 12, and 24 months qualify for 0% interest on eligible products with pre-approved cashback up to ₹15,000.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <h5 className="font-bold text-slate-900 text-sm">
                How do I pay my monthly installment?
              </h5>
              <p className="text-slate-600 leading-relaxed">
                You can pay using our 1Fi Pay EMI portal via UPI, Netbanking, or set up an e-Mandate for automatic debits with zero bounce penalties.
              </p>
            </div>
          </div>
        );

      case 'lien':
        return (
          <div className="space-y-4 text-xs">
            <p className="text-slate-600 leading-relaxed">
              1Fi's digital lien process complies fully with RBI lending guidelines and SEBI depositories (CAMS and KFintech).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-orange-50 border border-orange-100 text-center space-y-1">
                <span className="w-7 h-7 rounded-full bg-[#FF6B00] text-white font-bold text-xs flex items-center justify-center mx-auto">
                  1
                </span>
                <h6 className="font-bold text-slate-900">Portfolio Fetch</h6>
                <p className="text-[11px] text-slate-500">Fast lookup using registered PAN & mobile OTP.</p>
              </div>
              <div className="p-3 rounded-xl bg-orange-50 border border-orange-100 text-center space-y-1">
                <span className="w-7 h-7 rounded-full bg-[#FF6B00] text-white font-bold text-xs flex items-center justify-center mx-auto">
                  2
                </span>
                <h6 className="font-bold text-slate-900">Digital Lien Mark</h6>
                <p className="text-[11px] text-slate-500">One-time OTP authorization with depository.</p>
              </div>
              <div className="p-3 rounded-xl bg-orange-50 border border-orange-100 text-center space-y-1">
                <span className="w-7 h-7 rounded-full bg-[#FF6B00] text-white font-bold text-xs flex items-center justify-center mx-auto">
                  3
                </span>
                <h6 className="font-bold text-slate-900">Instant Release</h6>
                <p className="text-[11px] text-slate-500">Lien auto-lifted upon completing tenure.</p>
              </div>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <p>
              <strong>1Fi Marketplace</strong> is India's pioneer in collateral-empowered e-commerce. We believe retail consumers shouldn't have to choose between financial wealth creation and enjoying modern gadgets.
            </p>
            <p>
              By engineering an automated bridge between registered Mutual Fund RTAs (CAMS, KFintech) and brand authorized electronics distributors, 1Fi delivers 0% interest financing without asset liquidation.
            </p>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Our Commitments:</span>
              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                <li>Zero hidden charges or pre-closure penalties</li>
                <li>Direct brand warranty & official packaging on all devices</li>
                <li>Bank-grade 256-bit encryption for all lien mandates</li>
              </ul>
            </div>
          </div>
        );

      case 'returns':
        return (
          <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <h5 className="font-bold text-slate-900 text-sm">7-Day Replacement & Easy Returns</h5>
            <p>
              Every electronic device and appliance purchased through 1Fi comes with standard 7-day doorstep replacement for defective or transit-damaged items.
            </p>
            <p>
              Upon return approval, your mutual fund lien is unlocked within 24 business hours with zero cancellation charges.
            </p>
          </div>
        );

      case 'terms':
      case 'privacy':
        return (
          <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <p>
              <strong>Data Privacy & Security:</strong> 1Fi never stores your banking or depository passwords. Lien creation is authorized strictly through dynamic two-factor OTP directly validated by SEBI-registered RTAs.
            </p>
            <p>
              <strong>Terms of Credit:</strong> The EMI facility is provided by licensed NBFC partners under RBI guidelines. Downpayment is 0% for eligible portfolios exceeding 2x the product invoice value.
            </p>
          </div>
        );

      case 'contact':
      case 'support':
      default:
        return (
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Need assistance with your mutual fund lien, device delivery, or EMI schedule? Our concierge support team is available 24x7.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
                  Toll-Free Helpline
                </span>
                <p className="text-slate-700 font-mono font-semibold">1800-266-1FI (1800-266-134)</p>
                <p className="text-[11px] text-slate-500">Available Mon-Sun, 9 AM - 9 PM</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-[#FF6B00]" />
                  Priority Email
                </span>
                <p className="text-slate-700 font-mono font-semibold">support@1fi.in</p>
                <p className="text-[11px] text-slate-500">Average response time: 15 minutes</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeInfoModal}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', duration: 0.35, bounce: 0.2 }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden z-10 my-8"
      >
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B00] flex items-center justify-center text-white">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-base text-white tracking-tight">{title}</h3>
          </div>
          <button
            onClick={closeInfoModal}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">{renderContent(type)}</div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={closeInfoModal}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
