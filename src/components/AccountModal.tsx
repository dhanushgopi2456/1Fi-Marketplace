import React from 'react';
import { motion } from 'motion/react';
import {
  X,
  User,
  ShieldCheck,
  CreditCard,
  LogOut,
  TrendingUp,
  Clock,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  UserPlus,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../lib/utils';
import { Link } from 'wouter';

export const AccountModal: React.FC = () => {
  const {
    isAccountModalOpen,
    closeAccountModal,
    user,
    activeLoans,
    openPayEmiModal,
    openLogoutModal,
    openLoginModal,
  } = useAuth();

  if (!isAccountModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeAccountModal}
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
        <div className="bg-slate-900 p-6 text-white relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-[#FF6B00]/25 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#E05300] flex items-center justify-center text-white font-black text-lg shadow-md shadow-orange-500/20">
                {user ? user.name.charAt(0) : 'G'}
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-white leading-tight">
                  {user ? user.name : 'Guest User'}
                </h3>
                <p className="text-xs text-slate-300">
                  {user ? user.email : 'Not signed in'} • {user ? user.phone : ''}
                </p>
              </div>
            </div>

            <button
              onClick={closeAccountModal}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* KYC status pill */}
          {user && (
            <div className="mt-4 flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                CAMS & KFintech KYC Verified
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-orange-300 font-medium">Lien ID: 1FI-CAMS-99824</span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {user ? (
            <>
              {/* Mutual Fund Lien Portfolio Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-orange-50/40 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Mutual Fund Portfolio Lien
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Active & Compounding
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] text-slate-500">Pledged Fund Value</span>
                    <p className="text-lg font-black text-slate-900">
                      {formatCurrency(user.camsPortfolioValue)}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500">Available Shopping Limit</span>
                    <p className="text-lg font-black text-[#FF6B00]">
                      {formatCurrency(user.pledgedLienLimit)}
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-200/60 pt-2">
                  Your funds stay invested in HDFC & Mirae Asset portfolios. Monthly dividends & capital gains continue accruing normally.
                </p>
              </div>

              {/* Active EMIs section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span>My Active Devices & EMIs ({activeLoans.length})</span>
                  </h4>

                  <button
                    type="button"
                    onClick={() => {
                      closeAccountModal();
                      openPayEmiModal();
                    }}
                    className="text-xs font-bold text-[#FF6B00] hover:underline cursor-pointer"
                  >
                    Pay EMI
                  </button>
                </div>

                {activeLoans.length > 0 ? (
                  <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                    {activeLoans.map((loan) => (
                      <div
                        key={loan.loanId}
                        className="p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={loan.image}
                            alt={loan.productName}
                            className="w-10 h-10 object-cover rounded-lg border border-slate-100 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate">
                              {loan.productName}
                            </p>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                              <span>Due: {loan.nextDueDate}</span>
                              <span>•</span>
                              <span className="font-semibold text-emerald-600">
                                {loan.paidTenure}/{loan.totalTenure} Paid
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            closeAccountModal();
                            openPayEmiModal(loan);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-orange-50 text-[#FF6B00] hover:bg-orange-100 font-bold text-xs shrink-0 transition-colors cursor-pointer"
                        >
                          Pay {formatCurrency(loan.monthlyPayment)}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 py-3 text-center border border-dashed rounded-xl">
                    No active loan devices. Explore the catalog to start shopping!
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    closeAccountModal();
                    openLoginModal('register');
                  }}
                  className="text-xs font-bold text-[#FF6B00] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register Another User</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    closeAccountModal();
                    openLogoutModal();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <User className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-slate-900">Welcome to 1Fi</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                  Access your mutual fund credit line, active EMI installments, and 0% interest pre-approvals.
                </p>
              </div>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    closeAccountModal();
                    openLoginModal('register');
                  }}
                  className="w-full py-3 rounded-xl bg-[#FF6B00] hover:bg-[#E05300] text-white font-bold text-xs shadow-md shadow-orange-500/20 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register New User</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    closeAccountModal();
                    openLoginModal('demo');
                  }}
                  className="w-full py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Demo User Login (Gopi Dhanush)
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
