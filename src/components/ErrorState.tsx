import React from 'react';
import { AlertTriangle, RefreshCcw, Home, Search } from 'lucide-react';
import { Link } from 'wouter';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  type?: 'error' | 'not-found' | 'empty';
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'Failed to communicate with database APIs. Please try again.',
  onRetry,
  type = 'error',
}) => {
  return (
    <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-3xl border border-slate-200 text-center shadow-xs space-y-4">
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto ${
          type === 'not-found'
            ? 'bg-amber-100 text-amber-600'
            : type === 'empty'
            ? 'bg-slate-100 text-slate-500'
            : 'bg-rose-100 text-rose-600'
        }`}
      >
        {type === 'empty' ? (
          <Search className="w-7 h-7" />
        ) : (
          <AlertTriangle className="w-7 h-7" />
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed">{message}</p>
      </div>

      <div className="pt-2 flex items-center justify-center gap-2">
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FF6B00] hover:bg-[#E05300] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        )}

        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Back to Products</span>
        </Link>
      </div>
    </div>
  );
};
