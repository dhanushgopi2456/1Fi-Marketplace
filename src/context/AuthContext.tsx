import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  kycStatus: 'VERIFIED' | 'PENDING' | 'UNVERIFIED';
  camsPortfolioValue: number;
  pledgedLienLimit: number;
  panNumber?: string;
  folioNumber?: string;
}

export interface UserLoan {
  loanId: string;
  orderId?: string;
  productName: string;
  image: string;
  monthlyPayment: number;
  totalTenure: number;
  paidTenure: number;
  nextDueDate: string;
  pledgedFund: string;
  interestRate: number;
  status: string;
}

export interface EmiPaymentReceipt {
  transactionId: string;
  loanId: string;
  amountPaid: number;
  paymentMethod: string;
  details: string;
  paidAt: string;
  status: string;
  nextDueDate: string;
}

export type InfoModalType = 'faq' | 'lien' | 'terms' | 'privacy' | 'about' | 'contact' | 'returns' | 'support';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  actionLabel?: string;
  onAction?: () => void;
}

export interface RegisterUserData {
  name: string;
  email: string;
  phone: string;
  panNumber?: string;
  camsFolioNumber?: string;
  estimatedPortfolioValue?: number;
}

interface AuthContextType {
  user: UserProfile | null;
  activeLoans: UserLoan[];
  isLoadingLoans: boolean;
  login: (data?: { email?: string; phone?: string; name?: string; isDemo?: boolean }) => Promise<void>;
  register: (data: RegisterUserData) => Promise<UserProfile>;
  logout: () => Promise<void>;
  refreshLoans: () => Promise<void>;
  recordEmiPayment: (receipt: EmiPaymentReceipt) => void;

  // Modal controls
  isLoginModalOpen: boolean;
  loginModalTab: 'login' | 'register' | 'demo' | 'otp';
  openLoginModal: (initialTab?: 'login' | 'register' | 'demo' | 'otp') => void;
  closeLoginModal: () => void;

  isLogoutModalOpen: boolean;
  openLogoutModal: () => void;
  closeLogoutModal: () => void;

  isPayEmiModalOpen: boolean;
  selectedLoanForPayment: UserLoan | null;
  openPayEmiModal: (loan?: UserLoan | null) => void;
  closePayEmiModal: () => void;

  isAccountModalOpen: boolean;
  openAccountModal: () => void;
  closeAccountModal: () => void;

  infoModalData: { type: InfoModalType; title: string } | null;
  openInfoModal: (type: InfoModalType, title: string) => void;
  closeInfoModal: () => void;

  // Toast
  toast: ToastState | null;
  showToast: (message: string, type?: ToastState['type'], actionLabel?: string, onAction?: () => void) => void;
  hideToast: () => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr_demo_01',
  name: 'Gopi Dhanush',
  email: 'gopidhanush615@gmail.com',
  phone: '+91 98765 43210',
  kycStatus: 'VERIFIED',
  camsPortfolioValue: 450000,
  pledgedLienLimit: 225000,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('1fi_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read user from storage', e);
    }
    return DEFAULT_USER; // Default logged in for rich initial experience
  });

  const [activeLoans, setActiveLoans] = useState<UserLoan[]>([]);
  const [isLoadingLoans, setIsLoadingLoans] = useState<boolean>(false);

  // Modal States
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginModalTab, setLoginModalTab] = useState<'login' | 'register' | 'demo' | 'otp'>('login');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isPayEmiModalOpen, setIsPayEmiModalOpen] = useState(false);
  const [selectedLoanForPayment, setSelectedLoanForPayment] = useState<UserLoan | null>(null);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [infoModalData, setInfoModalData] = useState<{ type: InfoModalType; title: string } | null>(null);

  // Toast State
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (
    message: string,
    type: ToastState['type'] = 'success',
    actionLabel?: string,
    onAction?: () => void
  ) => {
    const id = Math.random().toString();
    setToast({ id, message, type, actionLabel, onAction });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 4500);
  };

  const hideToast = () => setToast(null);

  const fetchLoans = async () => {
    if (!user) {
      setActiveLoans([]);
      return;
    }
    setIsLoadingLoans(true);
    try {
      const res = await fetch(`/api/user/loans?email=${encodeURIComponent(user.email)}`);
      if (res.ok) {
        const data = await res.json();
        setActiveLoans(data);
      }
    } catch (err) {
      console.error('Failed to fetch user loans:', err);
    } finally {
      setIsLoadingLoans(false);
    }
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem('1fi_user', JSON.stringify(user));
      fetchLoans();
    } else {
      localStorage.removeItem('1fi_user');
      setActiveLoans([]);
    }
  }, [user]);

  const login = async (data?: { email?: string; phone?: string; name?: string; isDemo?: boolean }) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data || { isDemo: true }),
      });
      if (res.ok) {
        const result = await res.json();
        setUser(result.user);
        setIsLoginModalOpen(false);
        showToast(`Welcome back, ${result.user.name}! Your mutual fund credit line is active.`, 'success');
      }
    } catch (e) {
      console.error(e);
      // Fallback local demo login
      setUser(DEFAULT_USER);
      setIsLoginModalOpen(false);
      showToast('Welcome back, Gopi Dhanush! (Demo Mode)', 'success');
    }
  };

  const register = async (data: RegisterUserData): Promise<UserProfile> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      setUser(result.user);
      setIsLoginModalOpen(false);
      showToast(
        `Welcome to 1Fi, ${result.user.name}! Your mutual fund limit of ₹${result.user.pledgedLienLimit.toLocaleString('en-IN')} is unlocked.`,
        'success'
      );
      return result.user;
    } catch (err: any) {
      console.warn('Register API unavailable, using verified local session fallback:', err);
      const portfolioVal = data.estimatedPortfolioValue && data.estimatedPortfolioValue > 0
        ? data.estimatedPortfolioValue
        : 350000;
      const fallbackUser: UserProfile = {
        id: 'usr_' + Date.now(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        kycStatus: 'VERIFIED',
        camsPortfolioValue: portfolioVal,
        pledgedLienLimit: Math.round(portfolioVal * 0.5),
        panNumber: data.panNumber ? data.panNumber.toUpperCase() : 'ABCDE1234F',
        folioNumber: data.camsFolioNumber || 'CAMS-FOLIO-77218',
      };
      setUser(fallbackUser);
      setIsLoginModalOpen(false);
      showToast(
        `Welcome to 1Fi, ${fallbackUser.name}! Your mutual fund limit of ₹${fallbackUser.pledgedLienLimit.toLocaleString('en-IN')} is unlocked.`,
        'success'
      );
      return fallbackUser;
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.warn('Logout network notice', e);
    }
    setUser(null);
    setIsLogoutModalOpen(false);
    setIsAccountModalOpen(false);
    showToast('You have been logged out. Browsing as Guest.', 'info', 'Sign In', () => {
      setIsLoginModalOpen(true);
    });
  };

  const recordEmiPayment = (receipt: EmiPaymentReceipt) => {
    setActiveLoans((prev) =>
      prev.map((l) => {
        if (l.loanId === receipt.loanId) {
          const newPaid = Math.min(l.totalTenure, l.paidTenure + 1);
          return {
            ...l,
            paidTenure: newPaid,
            nextDueDate: '15th Nov 2026',
            status: newPaid >= l.totalTenure ? 'COMPLETED' : 'ACTIVE',
          };
        }
        return l;
      })
    );
    showToast(`EMI of ₹${receipt.amountPaid.toLocaleString('en-IN')} paid successfully!`, 'success');
  };

  const openPayEmiModal = (loan: UserLoan | null = null) => {
    setSelectedLoanForPayment(loan || (activeLoans.length > 0 ? activeLoans[0] : null));
    setIsPayEmiModalOpen(true);
  };

  const closePayEmiModal = () => {
    setIsPayEmiModalOpen(false);
    setSelectedLoanForPayment(null);
  };

  const openLoginModal = (initialTab: 'login' | 'register' | 'demo' | 'otp' = 'login') => {
    setLoginModalTab(initialTab);
    setIsLoginModalOpen(true);
  };
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const openAccountModal = () => setIsAccountModalOpen(true);
  const closeAccountModal = () => setIsAccountModalOpen(false);

  const openInfoModal = (type: InfoModalType, title: string) => setInfoModalData({ type, title });
  const closeInfoModal = () => setInfoModalData(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        activeLoans,
        isLoadingLoans,
        login,
        register,
        logout,
        refreshLoans: fetchLoans,
        recordEmiPayment,
        isLoginModalOpen,
        loginModalTab,
        openLoginModal,
        closeLoginModal,
        isLogoutModalOpen,
        openLogoutModal,
        closeLogoutModal,
        isPayEmiModalOpen,
        selectedLoanForPayment,
        openPayEmiModal,
        closePayEmiModal,
        isAccountModalOpen,
        openAccountModal,
        closeAccountModal,
        infoModalData,
        openInfoModal,
        closeInfoModal,
        toast,
        showToast,
        hideToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
