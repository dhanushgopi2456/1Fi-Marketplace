import React, { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { Product, ProductVariant } from '../types/product';
import { EmiPlan } from '../types/emi';
import { ProductGallery } from '../components/ProductGallery';
import { ProductInfo } from '../components/ProductInfo';
import { CheckoutModal } from '../components/CheckoutModal';
import { ProductDetailSkeleton } from '../components/LoadingSkeleton';
import { ErrorState } from '../components/ErrorState';
import { ChevronRight, ArrowLeft } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const [, params] = useRoute<{ slug: string }>('/products/:slug');
  const slug = params ? params.slug : undefined;

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<EmiPlan | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  const fetchProduct = async () => {
    if (!slug) return;
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/products/${slug}`);
      if (res.status === 404) {
        throw new Error('Product not found in database');
      }
      if (!res.ok) {
        throw new Error('Failed to load product details');
      }

      const data: Product = await res.json();
      setProduct(data);

      // Default to first variant
      const initialVariant = data.variants?.[0];
      setSelectedVariant(initialVariant || null);

      // Default to the 6-month or first EMI plan if available
      if (initialVariant?.emiPlans?.length > 0) {
        const defaultPlan =
          initialVariant.emiPlans.find((p) => p.tenureMonths === 6) ||
          initialVariant.emiPlans[0];
        setSelectedPlan(defaultPlan);
      } else {
        setSelectedPlan(null);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error communicating with server');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  // Handle variant switch: keep same tenure if available in new variant
  const handleVariantChange = (newVariant: ProductVariant) => {
    setSelectedVariant(newVariant);

    if (newVariant.emiPlans?.length > 0) {
      const currentTenure = selectedPlan?.tenureMonths;
      const matchingPlan = currentTenure
        ? newVariant.emiPlans.find((p) => p.tenureMonths === currentTenure)
        : null;

      setSelectedPlan(matchingPlan || newVariant.emiPlans[0]);
    } else {
      setSelectedPlan(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] py-8">
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (error || !product || !selectedVariant) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] py-12">
        <ErrorState
          type="not-found"
          title="Product not found"
          message={error || 'The requested smartphone could not be located in our database.'}
          onRetry={fetchProduct}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/products" className="hover:text-slate-900 transition-colors">
            Smartphones
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Back link */}
        <div className="mb-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#FF6B00] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all products</span>
          </Link>
        </div>

        {/* Main 2-Column Product Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Image Gallery */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <ProductGallery
              images={selectedVariant.images}
              productName={`${product.name} ${selectedVariant.color}`}
            />
          </div>

          {/* Right Column: Information, Pricing, Variants & EMI Plans */}
          <div className="lg:col-span-6">
            <ProductInfo
              product={product}
              selectedVariant={selectedVariant}
              selectedPlan={selectedPlan}
              onSelectVariant={handleVariantChange}
              onSelectPlan={(plan) => setSelectedPlan(plan)}
              onProceedCheckout={() => setIsCheckoutOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Checkout Confirmation Modal */}
      {selectedPlan && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          product={product}
          variant={selectedVariant}
          emiPlan={selectedPlan}
        />
      )}
    </div>
  );
};
