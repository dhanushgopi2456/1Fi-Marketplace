import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ToastNotification: React.FC = () => {
  const { toast, hideToast } = useAuth();

  return (
    <div className="fixed bottom-5 right-5 z-50 pointer-events-none flex flex-col gap-2 max-w-sm w-full">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="pointer-events-auto bg-slate-900 text-white p-4 rounded-2xl shadow-xl border border-slate-800 flex items-start gap-3 relative overflow-hidden"
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
              {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-400" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
            </div>

            <div className="flex-1 min-w-0 pr-6">
              <p className="text-xs font-semibold text-slate-100 leading-snug">{toast.message}</p>
              {toast.actionLabel && toast.onAction && (
                <button
                  type="button"
                  onClick={() => {
                    toast.onAction?.();
                    hideToast();
                  }}
                  className="mt-2 text-xs font-extrabold text-[#FF6B00] hover:underline cursor-pointer"
                >
                  {toast.actionLabel}
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={hideToast}
              className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
