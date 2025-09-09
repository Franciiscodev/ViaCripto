import React from 'react';

const ComparisonSkeleton: React.FC = () => {
  return (
    <div className="mt-6" aria-label="Carregando comparações">
      <div className="h-5 sm:h-6 w-48 bg-slate-200 rounded animate-pulse mb-4"></div>
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 border border-slate-200 rounded-lg bg-white">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-200 rounded-full animate-pulse"></div>
                <div>
                  <div className="h-4 sm:h-5 w-24 bg-slate-200 rounded animate-pulse mb-1"></div>
                  <div className="h-3 sm:h-4 w-20 bg-slate-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="h-5 sm:h-6 w-28 bg-slate-200 rounded animate-pulse mb-1"></div>
                <div className="h-3 sm:h-4 w-20 bg-slate-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonSkeleton;