import React, { useState } from 'react';
import { Product, ProductVariant } from '../types/product';
import { EmiPlan } from '../types/emi';
import { formatCurrency } from '../lib/utils';
import { X, CheckCircle, ArrowRight, ShieldCheck, AlertCircle, Loader2, CreditCard } from 'lucide-react';
import { Link } from 'wouter';
import { useAuth } from '../context/AuthContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  variant: ProductVariant;
  emiPlan: EmiPlan;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  product,
  variant,
  emiPlan,
}) => {
  const { user, refreshLoans, openPayEmiModal, showToast } = useAuth();

  const [userName, setUserName] = useState(user?.name || 'Gopi Dhanush');
  const [userEmail, setUserEmail] = useState(user?.email || 'gopidhanush615@gmail.com');
  const [userPhone, setUserPhone] = useState(user?.phone || '+91 98765 43210');
  const [address, setAddress] = useState('Flat 402, Lotus Towers, Indiranagar, Bangalore, KA 560038');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderResult, setOrderResult] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          variantId: variant.id,
          emiPlanId: emiPlan.id,
          userName,
          userEmail,
          userPhone,
          address,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to confirm EMI plan');
      }

      setOrderResult(data.order);
      refreshLoans();
      showToast('EMI order placed! Digital mutual fund lien initiated.', 'success');
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Something went wrong. Please retry.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="checkout-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div
        id="checkout-modal-container"
        className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          id="checkout-modal-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors z-10 cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {orderResult ? (
          /* Success Screen */
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                EMI Plan Selected Successfully
              </h2>
              <p className="text-sm text-slate-600 font-medium">
                Your selected plan has been saved.
              </p>
            </div>

            {/* Order Confirmation Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
                <span className="text-slate-500 font-medium">Order Reference:</span>
                <span className="font-mono font-bold text-slate-900">{orderResult.id}</span>
              </div>

              <div>
                <p className="text-xs text-slate-500">Product & Variant</p>
                <p className="text-sm font-bold text-slate-900">{product.name}</p>
                <p className="text-xs text-slate-600">{variant.color} • {variant.storage}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500">Monthly EMI:</span>
                  <p className="font-bold text-[#FF6B00] text-sm">
                    {formatCurrency(emiPlan.monthlyPayment)}/mo
                  </p>
                </div>
                <div>
                  <span className="text-slate-500">Tenure:</span>
                  <p className="font-bold text-slate-900 text-sm">{emiPlan.tenureMonths} Months</p>
                </div>
                <div>
                  <span className="text-slate-500">Interest Rate:</span>
                  <p className="font-bold text-emerald-700">{emiPlan.interestRate}%</p>
                </div>
                <div>
                  <span className="text-slate-500">Cashback:</span>
                  <p className="font-bold text-slate-900">{formatCurrency(emiPlan.cashback)}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">Total Payable:</span>
                <span className="font-extrabold text-slate-900 text-sm">
                  {formatCurrency(emiPlan.totalPayable)}
                </span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl flex items-center gap-2 text-left">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Our partner NBFC has initiated the paperless lien verification with your mutual fund registrar.
              </span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  openPayEmiModal({
                    loanId: `1FI-LN-${Math.floor(1000 + Math.random() * 9000)}`,
                    orderId: orderResult.id,
                    productName: `${product.name} (${variant.storage}, ${variant.color})`,
                    image: variant.images[0]?.url || '',
                    monthlyPayment: emiPlan.monthlyPayment,
                    totalTenure: emiPlan.tenureMonths,
                    paidTenure: 0,
                    nextDueDate: '15th Oct 2026',
                    pledgedFund: 'Mutual Fund Lien Mandate (Active)',
                    interestRate: emiPlan.interestRate,
                    status: 'ACTIVE',
                  });
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#E05300] hover:from-[#E05300] hover:to-[#D04900] text-white text-xs font-bold transition-all shadow-md shadow-orange-500/20 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Pay 1st EMI Now</span>
              </button>

              <button
                id="checkout-success-done-btn"
                onClick={onClose}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Confirmation & Review Screen */
          <form onSubmit={handleContinue} className="p-6 sm:p-8 space-y-5">
            <div>
              <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider">
                Step 2 of 2 • Review & Confirm
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                Confirm EMI Plan Selection
              </h2>
              <p className="text-xs text-slate-500">
                Please verify your device, chosen EMI terms, and contact details.
              </p>
            </div>

            {/* Error banner */}
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Summary Breakdown Card */}
            <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{product.name}</h4>
                  <p className="text-xs text-slate-600 font-medium">
                    {variant.color} • {variant.storage} (SKU: {variant.sku})
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-slate-900">
                    {formatCurrency(variant.price)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-orange-200/60 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">Monthly EMI</span>
                  <span className="font-extrabold text-[#FF6B00] text-sm">
                    {formatCurrency(emiPlan.monthlyPayment)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Tenure</span>
                  <span className="font-bold text-slate-800 text-sm">
                    {emiPlan.tenureMonths} Mo
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Interest Rate</span>
                  <span className="font-bold text-emerald-700 text-sm">
                    {emiPlan.interestRate}%
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Cashback</span>
                  <span className="font-bold text-slate-800 text-sm">
                    {formatCurrency(emiPlan.cashback)}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-orange-200/60 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-600">Total Payable Amount:</span>
                <span className="text-base font-black text-slate-900">
                  {formatCurrency(emiPlan.totalPayable)}
                </span>
              </div>
            </div>

            {/* Contact details inputs */}
            <div className="space-y-3 pt-1">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Applicant & Delivery Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Phone (for OTP lien)
                  </label>
                  <input
                    type="text"
                    required
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Delivery Address
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-hidden"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                id="checkout-cancel-btn"
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                id="checkout-continue-btn"
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-[#E05300] text-white text-xs font-bold transition-all shadow-md shadow-orange-500/20 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Plan...</span>
                  </>
                ) : (
                  <>
                    <span>Continue & Confirm</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
