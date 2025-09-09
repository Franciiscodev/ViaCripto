
import React from 'react';
import RateChart from './RateChart';

const DashboardScreen: React.FC = () => {
  return (
    <div className="p-4 sm:p-6">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-6">
          Dashboard
        </h1>
        <div className="space-y-8">
          <RateChart from="USD" to="BRL" />
          <RateChart from="EUR" to="BRL" />
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
