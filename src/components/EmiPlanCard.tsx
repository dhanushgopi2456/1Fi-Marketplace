import React from 'react';
import { EmiPlan } from '../types/emi';
import { formatCurrency } from '../lib/utils';
import { Sparkles, Gift } from 'lucide-react';

interface EmiPlanCardProps {
  plan: EmiPlan;
  isSelected: boolean;
  onSelect: (plan: EmiPlan) => void;
}

export const EmiPlanCard: React.FC<EmiPlanCardProps> = ({ plan, isSelected, onSelect }) => {
  return (
    <div
      id={`emi-plan-card-${plan.tenureMonths}-months`}
      onClick={() => onSelect(plan)}
      className={`group relative p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
        isSelected
          ? 'border-[#FF6B00] bg-orange-50/70 shadow-md shadow-orange-500/10'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
      }`}
    >
      {/* Top row: Radio button + Monthly Payment + Tenure */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {/* Custom Radio Circle */}
          <div
            className={`w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
              isSelected ? 'border-[#FF6B00] bg-white' : 'border-slate-300 bg-white group-hover:border-slate-400'
            }`}
          >
            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]" />}
          </div>

          <div>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-lg sm:text-xl font-extrabold text-slate-900">
                {formatCurrency(plan.monthlyPayment)}
              </span>
              <span className="text-xs font-semibold text-slate-500">/ month</span>
            </div>

            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs sm:text-sm font-bold text-slate-700">
                {plan.tenureMonths} Months
              </span>
              <span className="text-slate-300">•</span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                  plan.interestRate === 0
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {plan.interestRate === 0 ? '0% Interest' : `${plan.interestRate}% Interest`}
              </span>
            </div>
          </div>
        </div>

        {/* Popular / Recommended Tag on 6 or 12 months */}
        {(plan.tenureMonths === 6 || plan.tenureMonths === 12) && (
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
            <Sparkles className="w-2.5 h-2.5 text-[#FF6B00]" />
            Recommended
          </span>
        )}
      </div>

      {/* Bottom details: Cashback & Processing Fee Breakdown */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-orange-700 font-semibold">
          <Gift className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span>Additional cashback of {formatCurrency(plan.cashback)}</span>
        </div>

        <div className="text-right text-slate-500 font-medium text-[11px]">
          <span>Total: {formatCurrency(plan.totalPayable)}</span>
          {plan.processingFee > 0 && (
            <span className="text-slate-400 ml-1">(Fee: {formatCurrency(plan.processingFee)})</span>
          )}
        </div>
      </div>
    </div>
  );
};
