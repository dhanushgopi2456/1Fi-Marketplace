import React from 'react';

export const ProductCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 animate-pulse">
    <div className="h-44 bg-slate-100 rounded-xl w-full" />
    <div className="space-y-2">
      <div className="h-3 bg-slate-100 rounded w-1/3" />
      <div className="h-5 bg-slate-200 rounded w-3/4" />
      <div className="h-3 bg-slate-100 rounded w-1/2" />
    </div>
    <div className="h-12 bg-orange-50/60 rounded-xl w-full" />
    <div className="h-10 bg-slate-100 rounded-xl w-full" />
  </div>
);

export const ProductDetailSkeleton: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Left Gallery Skeleton */}
      <div className="lg:col-span-6 flex flex-col-reverse md:flex-row gap-4">
        <div className="flex md:flex-col gap-2.5">
          <div className="w-16 h-16 bg-slate-200 rounded-xl" />
          <div className="w-16 h-16 bg-slate-200 rounded-xl" />
          <div className="w-16 h-16 bg-slate-200 rounded-xl" />
        </div>
        <div className="flex-1 min-h-[380px] bg-slate-200 rounded-2xl" />
      </div>

      {/* Right Info Skeleton */}
      <div className="lg:col-span-6 space-y-6">
        <div className="space-y-2">
          <div className="h-4 bg-orange-100 rounded w-24" />
          <div className="h-8 bg-slate-200 rounded w-3/4" />
          <div className="h-4 bg-slate-100 rounded w-1/3" />
        </div>

        <div className="h-24 bg-slate-100 rounded-2xl" />

        <div className="space-y-3">
          <div className="h-4 bg-slate-200 rounded w-1/4" />
          <div className="flex gap-2">
            <div className="w-9 h-9 rounded-full bg-slate-200" />
            <div className="w-9 h-9 rounded-full bg-slate-200" />
            <div className="w-9 h-9 rounded-full bg-slate-200" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="h-20 bg-slate-100 rounded-2xl" />
          <div className="h-20 bg-slate-100 rounded-2xl" />
          <div className="h-20 bg-slate-100 rounded-2xl" />
        </div>
      </div>
    </div>
  </div>
);
