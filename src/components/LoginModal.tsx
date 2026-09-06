import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  User,
  ShieldCheck,
  Smartphone,
  Mail,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Lock,
  Sparkles,
  Zap,
  UserPlus,
  TrendingUp,
  FileCheck2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, loginModalTab, closeLoginModal, login, register } = useAuth();

  const [mode, setMode] = useState<'register' | 'otp' | 'email' | 'demo'>('register');
  const [mobileNumber, setMobileNumber] = useState('+91 98765 43210');
  const [emailInput, setEmailInput] = useState('gopidhanush615@gmail.com');
  const [nameInput, setNameInput] = useState('Gopi Dhanush');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // New User Registration Form States
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPan, setRegPan] = useState('');
  const [regFolio, setRegFolio] = useState('');
  const [regPortfolioVal, setRegPortfolioVal] = useState('300000');
  const [regSuccess, setRegSuccess] = useState(false);

  // Synchronize mode when loginModalTab changes
  useEffect(() => {
    if (loginModalTab === 'register') {
      setMode('register');
    } else if (loginModalTab === 'demo') {
      setMode('demo');
    } else if (loginModalTab === 'otp') {
      setMode('otp');
    } else {
      setMode('login' as any === 'login' ? 'register' : 'demo');
    }
    setOtpStep(false);
    setErrorMsg(null);
    setRegSuccess(false);
  }, [loginModalTab, isLoginModalOpen]);

  if (!isLoginModalOpen) return null;

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!regName.trim() || regName.trim().length < 2) {
      setErrorMsg('Please enter your full legal name.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!regPhone.trim() || regPhone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsLoading(true);
    try {
      const parsedPortfolio = Number(regPortfolioVal) || 250000;
      await register({
        name: regName.trim(),
        email: regEmail.trim().toLowerCase(),
        phone: regPhone.trim(),
        panNumber: regPan.trim().toUpperCase() || undefined,
        camsFolioNumber: regFolio.trim() || undefined,
        estimatedPortfolioValue: parsedPortfolio,
      });
      setRegSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed. Please check your details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!mobileNumber.trim() || mobileNumber.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpStep(true);
      setOtpCode('829415'); // Helpful auto-seed for demo
    }, 600);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (otpCode.length < 4) {
      setErrorMsg('Please enter a valid OTP code.');
      return;
    }
    setIsLoading(true);
    try {
      await login({
        phone: mobileNumber,
        name: nameInput || 'Verified Customer',
        email: emailInput || 'customer@1fi.in',
      });
      setOtpStep(false);
    } catch (e: any) {
      setErrorMsg('Verification failed. Try demo login.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      await login({ isDemo: true });
    } catch (e) {
      setErrorMsg('Demo login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setIsLoading(true);
    try {
      await login({
        email: emailInput,
        name: nameInput || emailInput.split('@')[0],
      });
    } catch (e) {
      setErrorMsg('Sign in failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeLoginModal}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      {/* Main Animated Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', duration: 0.35, bounce: 0.2 }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden z-10 my-8 max-h-[92vh] flex flex-col"
      >
        {/* Brand Top Header */}
        <div className="bg-slate-900 px-6 pt-5 pb-4 text-white relative overflow-hidden shrink-0">
          <div className="absolute -right-8 -top-8 w-36 h-36 bg-[#FF6B00]/30 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#E05300] flex items-center justify-center text-white font-black text-base shadow-md shadow-orange-500/20">
                1Fi
              </div>
              <div>
                <span className="font-extrabold text-white text-base tracking-tight leading-none">
                  {mode === 'register' ? 'Register New User' : '1Fi Account Access'}
                </span>
                <p className="text-[11px] text-orange-400 font-medium mt-0.5">
                  Instant Mutual Fund Credit • 0% Interest EMIs
                </p>
              </div>
            </div>

            <button
              onClick={closeLoginModal}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-3 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2 text-xs text-slate-300">
            <Sparkles className="w-4 h-4 text-[#FF6B00] shrink-0" />
            <span>Borrow against Mutual Funds with zero prepayment penalties or CAMS paperwork.</span>
          </div>
        </div>

        {/* Tab Header - 4 Options */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-1.5 overflow-x-auto scrollbar-none shrink-0">
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMsg(null);
            }}
            className={`py-2.5 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              mode === 'register'
                ? 'border-[#FF6B00] text-[#FF6B00] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register New</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('demo');
              setOtpStep(false);
              setErrorMsg(null);
            }}
            className={`py-2.5 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              mode === 'demo'
                ? 'border-[#FF6B00] text-[#FF6B00] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>1-Click Demo</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('otp');
              setOtpStep(false);
              setErrorMsg(null);
            }}
            className={`py-2.5 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              mode === 'otp'
                ? 'border-[#FF6B00] text-[#FF6B00] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Phone OTP</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('email');
              setOtpStep(false);
              setErrorMsg(null);
            }}
            className={`py-2.5 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              mode === 'email'
                ? 'border-[#FF6B00] text-[#FF6B00] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Sign In</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <X className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Mode 0: REGISTER NEW USER FORM */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="p-3.5 bg-orange-50/70 border border-orange-200/80 rounded-2xl flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-[#FF6B00] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-extrabold text-slate-900 block">
                    Instant Credit Line Registration
                  </span>
                  <span className="text-slate-600 leading-relaxed">
                    Create a new shopper account to link your CAMS / KFintech mutual fund portfolio and unlock instant 0% EMI purchase power.
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Legal Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="register-name-input"
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#FF6B00] focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="register-email-input"
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="rahul.sharma@example.com"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#FF6B00] focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="register-phone-input"
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+91 98123 45678"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#FF6B00] focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    PAN Card Number <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="register-pan-input"
                    type="text"
                    value={regPan}
                    onChange={(e) => setRegPan(e.target.value.toUpperCase())}
                    placeholder="ABCDE1234F"
                    maxLength={10}
                    className="w-full px-3.5 py-2.5 text-xs uppercase tracking-wider bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#FF6B00] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mutual Fund Portfolio (₹)
                  </label>
                  <select
                    id="register-portfolio-select"
                    value={regPortfolioVal}
                    onChange={(e) => setRegPortfolioVal(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#FF6B00] focus:bg-white"
                  >
                    <option value="150000">₹1,50,000 (Limit: ₹75,000)</option>
                    <option value="300000">₹3,00,000 (Limit: ₹1,50,000)</option>
                    <option value="500000">₹5,00,000 (Limit: ₹2,50,000)</option>
                    <option value="1000000">₹10,00,000 (Limit: ₹5,00,000)</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 block">Instant Approved Limit:</span>
                  <span className="text-sm font-black text-[#FF6B00]">
                    ₹{(Number(regPortfolioVal) * 0.5 || 150000).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[11px]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>CAMS Auto-Verified</span>
                </div>
              </div>

              <button
                id="register-submit-btn"
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#FF6B00] hover:bg-[#E05300] text-white font-extrabold text-sm shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Account & Provisioning Lien...</span>
                  </>
                ) : (
                  <>
                    <span>Register New Account & Unlock Credit</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setMode('demo')}
                  className="text-xs text-slate-500 hover:text-[#FF6B00] font-semibold cursor-pointer underline"
                >
                  Or explore with pre-loaded demo account (Gopi Dhanush)
                </button>
              </div>
            </form>
          )}

          {/* Mode 1: 1-Click Fast Demo Login */}
          {mode === 'demo' && (
            <div className="space-y-4">
              <div className="p-4 bg-orange-50/70 border border-orange-200/80 rounded-2xl space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FF6B00] text-white flex items-center justify-center font-black text-sm shadow-xs">
                    GD
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">Gopi Dhanush</h4>
                    <p className="text-xs text-slate-500">gopidhanush615@gmail.com</p>
                  </div>
                </div>

                <div className="pt-2 grid grid-cols-2 gap-2 text-xs border-t border-orange-100/80">
                  <div>
                    <span className="text-[11px] text-slate-500">KYC Status</span>
                    <p className="font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500">Pre-Approved Limit</span>
                    <p className="font-bold text-slate-900">₹2,25,000</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#FF6B00] hover:bg-[#E05300] text-white font-extrabold text-sm shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in as Gopi Dhanush...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In Instantly as Demo User</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-xs text-slate-500 hover:text-[#FF6B00] font-semibold cursor-pointer underline"
                >
                  Need a different account? Register as New User
                </button>
              </div>
            </div>
          )}

          {/* Mode 2: Phone OTP flow */}
          {mode === 'otp' && (
            <>
              {!otpStep ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#FF6B00] focus:bg-white"
                      required
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      An OTP will be sent to verify your mutual fund linked phone.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#FF6B00] hover:bg-[#E05300] text-white font-extrabold text-sm shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending OTP...</span>
                      </>
                    ) : (
                      <>
                        <span>Get Verification Code</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700">Enter 6-Digit OTP</label>
                      <button
                        type="button"
                        onClick={() => setOtpStep(false)}
                        className="text-[11px] text-[#FF6B00] hover:underline cursor-pointer"
                      >
                        Change Number
                      </button>
                    </div>

                    <input
                      type="text"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="829415"
                      className="w-full px-3.5 py-2.5 text-center tracking-widest text-lg font-bold bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#FF6B00] focus:bg-white"
                      autoFocus
                    />
                    <p className="text-[11px] text-emerald-600 font-medium mt-1 text-center">
                      Auto-filled demo OTP: 829415
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#FF6B00] hover:bg-[#E05300] text-white font-extrabold text-sm shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying OTP...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm & Access 1Fi</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </>
          )}

          {/* Mode 3: Email flow */}
          {mode === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Gopi Dhanush"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#FF6B00] focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#FF6B00] focus:bg-white"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#FF6B00] hover:bg-[#E05300] text-white font-extrabold text-sm shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Continue to 1Fi</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5 shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>SEBI & CAMS compliant digital lien authentication</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
