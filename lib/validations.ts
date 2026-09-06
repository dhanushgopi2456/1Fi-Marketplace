import { z } from 'zod';

export const productsQuerySchema = z.object({
  category: z.string().optional(),
  brand: z.string().optional(),
  search: z.string().optional(),
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  tenure: z.coerce.number().positive().optional(),
  zeroInterestOnly: z.enum(['true', 'false']).transform((v) => v === 'true').optional(),
  inStockOnly: z.enum(['true', 'false']).transform((v) => v === 'true').optional(),
  sort: z.enum(['popularity', 'price_asc', 'price_desc', 'newest', 'price-low-high', 'price-high-low', 'emi-low-high']).default('popularity'),
});

export const createOrderSchema = z.object({
  variantId: z.string().min(1, 'variantId is required'),
  emiPlanId: z.string().min(1, 'emiPlanId is required'),
  userId: z.string().optional(),
  userName: z.string().min(2, 'Name must be at least 2 characters').default('Gopi Dhanush'),
  userEmail: z.string().email('Invalid email address').default('gopidhanush615@gmail.com'),
  userPhone: z.string().optional().default('+91 98765 43210'),
  address: z.string().optional().default('Flat 402, Lotus Towers, Bangalore, KA 560103'),
});

export const registerUserSchema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Mobile number must be at least 10 digits'),
  panNumber: z.string().optional(),
  camsFolioNumber: z.string().optional(),
  estimatedPortfolioValue: z.number().optional(),
});

export type ProductsQuery = z.infer<typeof productsQuerySchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type RegisterUserInput = z.infer<typeof registerUserSchema>;
