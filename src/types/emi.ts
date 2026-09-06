export interface EmiPlan {
  id: string;
  variantId: string;
  tenureMonths: number;
  monthlyPayment: number;
  interestRate: number;
  cashback: number;
  processingFee: number;
  totalPayable: number;
  active: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface EmiSelectionState {
  planId: string;
  tenureMonths: number;
  monthlyPayment: number;
  interestRate: number;
  cashback: number;
  totalPayable: number;
}
