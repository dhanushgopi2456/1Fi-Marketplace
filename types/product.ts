import { EmiPlan } from './emi.js';

export interface ProductImage {
  id: string;
  variantId: string;
  url: string;
  alt: string;
  sortOrder: number;
}

export interface ProductVariant {
  id: string;
  productId: string;
  color: string;
  colorHex?: string;
  storage: string;
  sku: string;
  mrp: number;
  price: number;
  stock: number;
  images: ProductImage[];
  emiPlans: EmiPlan[];
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  variants: ProductVariant[];
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface ProductSummary {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  defaultVariant: ProductVariant;
  startingEmi: number;
  availableColors: string[];
  availableStorages: string[];
  variantCount: number;
}

export interface Order {
  id: string;
  userId: string;
  variantId: string;
  emiPlanId: string;
  status: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  variant?: ProductVariant;
  emiPlan?: EmiPlan;
}
