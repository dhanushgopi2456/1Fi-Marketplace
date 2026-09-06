import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Zap,
  ArrowRight,
  TrendingUp,
  Receipt,
  Download,
  Building2,
  Smartphone,
  Check,
} from 'lucide-react';
import { useAuth, UserLoan, EmiPaymentReceipt } from '../context/AuthContext';
import { formatCurrency } from '../lib/utils';

export const PayEmiModal: React.FC = () => {
  const {
    isPayEmiModalOpen,
    closePayEmiModal,
    activeLoans,
    selectedLoanForPayment,
    recordEmiPayment,
    user,
    openLoginModal,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'loans' | 'manual'>('loans');
  const [currentLoan, setCurrentLoan] = useState<UserLoan | null>(null);
  const [manualLoanId, setManualLoanId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'netbanking' | 'mandate'>('upi');
  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState<EmiPaymentReceipt | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedLoanForPayment) {
      setCurrentLoan(selectedLoanForPayment);
      setActiveTab('loans');
    } else if (activeLoans.length > 0) {
      setCurrentLoan(activeLoans[0]);
    } else {
      setActiveTab('manual');
    }
  }, [selectedLoanForPayment, activeLoans]);

  useEffect(() => {
    if (isPayEmiModalOpen) {
      setReceipt(null);
      setErrorMessage(null);
      setIsProcessing(false);
    }
  }, [isPayEmiModalOpen]);

  if (!isPayEmiModalOpen) return null;

  const handlePaySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const loanIdToPay =
      activeTab === 'loans'
        ? currentLoan?.loanId
        : manualLoanId.trim() || '1FI-LN-CUSTOM';

    const amountToPay =
      activeTab === 'loans' && currentLoan ? currentLoan.monthlyPayment : 8499;

    if (!loanIdToPay) {
      setErrorMessage('Please specify or select a valid loan to pay.');
      return;
    }

    if (paymentMethod === 'upi' && !upiId.trim()) {
      setUpiId('user@okhdfcbank'); // Default helpful auto-fill
    }

    setIsProcessing(true);

    try {
      const res = await fetch('/api/emi/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          loanId: loanIdToPay,
          amount: amountToPay,
          paymentMethod:
            paymentMethod === 'upi'
              ? 'UPI Instant'
              : paymentMethod === 'netbanking'
              ? `Net Banking (${selectedBank})`
              : 'Mutual Fund Auto-Debit Lien Mandate',
          upiId: paymentMethod === 'upi' ? upiId || 'user@okhdfcbank' : undefined,
          bankName: paymentMethod === 'netbanking' ? selectedBank : undefined,
        }),
      });

      if (!res.ok) {
        throw new Error('Payment processing failed. Please check network.');
      }

      const data = await res.json();
      setReceipt(data.receipt);
      recordEmiPayment(data.receipt);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closePayEmiModal}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      {/* Main Animated Modal Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', duration: 0.35, bounce: 0.2 }}
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden z-10 my-8"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-5 text-white flex items-center justify-between relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#FF6B00]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#E05300] flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white tracking-tight flex items-center gap-2">
                <span>Pay Your Active EMI</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Instant Lien
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                Mutual Fund Backed • 0% Penalty • Instant NOC Settlement
              </p>
            </div>
          </div>

          <button
            onClick={closePayEmiModal}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Success Receipt State */}
          {receipt ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4 space-y-5"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-lg shadow-emerald-500/20 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-black text-slate-900">Payment Successful!</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Your mutual fund lien has been adjusted with zero impact on fund growth.
                </p>
              </div>

              {/* Receipt Box */}
              <div className="bg-slate-50 rounded-2xl p-4 text-left border border-slate-200/80 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-sans font-medium">Transaction ID:</span>
                  <span className="font-bold text-slate-900">{receipt.transactionId}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-sans font-medium">Loan Reference:</span>
                  <span className="font-bold text-slate-900">{receipt.loanId}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-sans font-medium">Amount Paid:</span>
                  <span className="font-bold text-emerald-600 text-sm font-sans">
                    {formatCurrency(receipt.amountPaid)}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-sans font-medium">Payment Mode:</span>
                  <span className="font-medium text-slate-800">{receipt.paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-sans font-medium">Paid Timestamp:</span>
                  <span className="text-slate-700">{receipt.paidAt}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans font-medium">Next Due Date:</span>
                  <span className="font-bold text-[#FF6B00] font-sans">{receipt.nextDueDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => alert(`Receipt downloaded for ${receipt.transactionId}`)}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Receipt</span>
                </button>
                <button
                  type="button"
                  onClick={closePayEmiModal}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#FF6B00] hover:bg-[#E05300] text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handlePaySubmit} className="space-y-5">
              {/* Not Logged In Notice */}
              {!user && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs text-amber-800">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>You are currently in Guest mode.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      closePayEmiModal();
                      openLoginModal();
                    }}
                    className="font-bold text-amber-900 underline cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>
              )}

              {/* Tab Selector: Active Loans vs Manual */}
              <div className="flex rounded-xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('loans')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'loans'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>My Active Loans ({activeLoans.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('manual')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'manual'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Receipt className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>Pay by Loan ID</span>
                </button>
              </div>

              {/* Tab 1: Active Loans List */}
              {activeTab === 'loans' && (
                <div className="space-y-3">
                  {activeLoans.length > 0 ? (
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {activeLoans.map((loan) => {
                        const isSelected = currentLoan?.loanId === loan.loanId;
                        return (
                          <div
                            key={loan.loanId}
                            onClick={() => setCurrentLoan(loan)}
                            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                              isSelected
                                ? 'border-[#FF6B00] bg-orange-50/50 ring-1 ring-[#FF6B00]'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <img
                                src={loan.image}
                                alt={loan.productName}
                                className="w-12 h-12 object-cover rounded-xl border border-slate-100 bg-white shrink-0"
                              />
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-slate-900 truncate">
                                  {loan.productName}
                                </p>
                                <p className="text-[11px] text-slate-500">
                                  Loan: <span className="font-mono font-semibold">{loan.loanId}</span> • Due: {loan.nextDueDate}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                                    Tenure: {loan.paidTenure}/{loan.totalTenure} Paid
                                  </span>
                                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                                    <TrendingUp className="w-3 h-3" />
                                    MF Pledged
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              <p className="text-sm font-black text-slate-900">
                                {formatCurrency(loan.monthlyPayment)}
                              </p>
                              <span className="text-[10px] text-emerald-600 font-bold uppercase">
                                0% Interest
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-6 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                      <p className="text-xs text-slate-500">No active loans found on this account.</p>
                      <button
                        type="button"
                        onClick={() => setActiveTab('manual')}
                        className="text-xs font-bold text-[#FF6B00] mt-2 underline"
                      >
                        Enter Loan ID manually
                      </button>
                    </div>
                  )}

                  {/* Selected Loan Fund Lien Breakdown */}
                  {currentLoan && (
                    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5 text-xs">
                      <div className="flex justify-between text-slate-600">
                        <span>Pledged Mutual Fund:</span>
                        <span className="font-semibold text-slate-800 text-right truncate max-w-[240px]">
                          {currentLoan.pledgedFund}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Installment Due:</span>
                        <span className="font-black text-slate-900">
                          {formatCurrency(currentLoan.monthlyPayment)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Manual Loan Input */}
              {activeTab === 'manual' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Loan Number or Registered Mobile Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. 1FI-LN-8829 or 9876543210"
                        value={manualLoanId}
                        onChange={(e) => setManualLoanId(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#FF6B00] focus:bg-white"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setManualLoanId('1FI-LN-8829')}
                        className="absolute right-2 top-2 text-[11px] font-bold text-[#FF6B00] px-2 py-1 hover:bg-orange-50 rounded"
                      >
                        Use Demo ID
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">Standard Installment Amount:</span>
                    <span className="font-black text-slate-900 text-sm">{formatCurrency(8499)}</span>
                  </div>
                </div>
              )}

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'upi'
                        ? 'border-[#FF6B00] bg-orange-50/60 ring-1 ring-[#FF6B00] text-slate-900 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 font-medium'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-[#FF6B00]" />
                    <span className="text-xs">UPI Apps</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'netbanking'
                        ? 'border-[#FF6B00] bg-orange-50/60 ring-1 ring-[#FF6B00] text-slate-900 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 font-medium'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-[#FF6B00]" />
                    <span className="text-xs">Net Banking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mandate')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'mandate'
                        ? 'border-[#FF6B00] bg-orange-50/60 ring-1 ring-[#FF6B00] text-slate-900 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 font-medium'
                    }`}
                  >
                    <Zap className="w-4 h-4 text-[#FF6B00]" />
                    <span className="text-xs">MF Mandate</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Payment Input details */}
              {paymentMethod === 'upi' && (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    {['GPay', 'PhonePe', 'Paytm', 'user@okhdfc'].map((app) => (
                      <button
                        key={app}
                        type="button"
                        onClick={() => setUpiId(`${app.toLowerCase()}@upi`)}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                      >
                        {app}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Enter UPI ID (e.g. yourname@okhdfcbank)"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#FF6B00] focus:bg-white"
                  />
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="grid grid-cols-2 gap-2">
                  {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setSelectedBank(b)}
                      className={`p-2 rounded-lg text-xs font-semibold border text-left transition-all ${
                        selectedBank === b
                          ? 'border-[#FF6B00] bg-orange-50 text-slate-900'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              )}

              {paymentMethod === 'mandate' && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Auto-Debit from linked bank account via SEBI e-Mandate
                  </p>
                  <p className="text-[11px] text-emerald-700">
                    Zero debit fees. No liquidations of units occur unless requested.
                  </p>
                </div>
              )}

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Pay Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#E05300] hover:from-[#E05300] hover:to-[#D04900] text-white font-extrabold text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Digital Settlement...</span>
                  </>
                ) : (
                  <>
                    <span>
                      Pay{' '}
                      {formatCurrency(
                        activeTab === 'loans' && currentLoan
                          ? currentLoan.monthlyPayment
                          : 8499
                      )}{' '}
                      Now
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>256-bit Encrypted FinTech Payment Gateway • NPCI & RBI Certified</span>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
