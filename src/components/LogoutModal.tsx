import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LogOut, X, AlertTriangle, ShieldAlert, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LogoutModal: React.FC = () => {
  const { isLogoutModalOpen, closeLogoutModal, logout, user } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!isLogoutModalOpen) return null;

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeLogoutModal}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      {/* Main Animated Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', duration: 0.3, bounce: 0.2 }}
        className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden z-10 my-8 p-6 text-center space-y-5"
      >
        <button
          onClick={closeLogoutModal}
          className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Icon with red/amber ring */}
        <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-inner">
          <LogOut className="w-7 h-7" />
        </div>

        <div>
          <h3 className="text-lg font-extrabold text-slate-900">Sign Out of 1Fi?</h3>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            You are currently logged in as{' '}
            <strong className="text-slate-800">{user?.name || 'Verified User'}</strong>. Logging
            out will lock active EMI plan views and mutual fund credit lines until you log back in.
          </p>
        </div>

        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-left text-xs space-y-1">
          <div className="flex justify-between text-slate-500">
            <span>Portfolio Lien:</span>
            <span className="font-semibold text-slate-700">Protected</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Active EMIs:</span>
            <span className="font-semibold text-slate-700">Auto-Debit Stays On</span>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            onClick={closeLogoutModal}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
          >
            Stay Signed In
          </button>

          <button
            type="button"
            onClick={handleConfirmLogout}
            disabled={isLoggingOut}
            className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-500/20 transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing out...</span>
              </>
            ) : (
              <span>Confirm Sign Out</span>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
