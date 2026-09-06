import React from 'react';
import { EmiPlan } from '../types/emi';
import { EmiPlanCard } from './EmiPlanCard';
import { ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

interface EmiPlanListProps {
  plans: EmiPlan[];
  selectedPlan: EmiPlan | null;
  onSelectPlan: (plan: EmiPlan) => void;
  onProceed: () => void;
}

export const EmiPlanList: React.FC<EmiPlanListProps> = ({
  plans,
  selectedPlan,
  onSelectPlan,
  onProceed,
}) => {
  // Sort plans ascending by tenure months
  const sortedPlans = [...plans].sort((a, b) => a.tenureMonths - b.tenureMonths);

  const ctaText = selectedPlan
    ? `Proceed with ${selectedPlan.tenureMonths} Months EMI`
    : 'Proceed with EMI';

  return (
    <div className="space-y-4 pt-4">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
            <span>EMI plans backed by mutual funds</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Choose a tenure that fits your cash flow. Pre-approved without portfolio sale.
          </p>
        </div>
      </div>

      {/* Plan Cards Stack */}
      <div className="space-y-3">
        {sortedPlans.map((plan) => (
          <EmiPlanCard
            key={plan.id}
            plan={plan}
            isSelected={selectedPlan?.id === plan.id}
            onSelect={onSelectPlan}
          />
        ))}
      </div>

      {/* Action CTA Button */}
      <div className="pt-2 sticky bottom-4 z-20 bg-white/95 backdrop-blur-xs p-3 -mx-3 rounded-2xl border border-slate-200/80 shadow-lg">
        <button
          id="proceed-with-emi-btn"
          onClick={onProceed}
          disabled={!selectedPlan}
          className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 cursor-pointer ${
            selectedPlan
              ? 'bg-[#FF6B00] hover:bg-[#E05300] text-white shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>{ctaText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {selectedPlan && (
          <p className="text-[11px] text-center text-slate-500 mt-2 font-medium">
            Instant paperless lien via OTP • 100% RBI/SEBI compliant
          </p>
        )}
      </div>
    </div>
  );
};
