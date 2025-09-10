import React, { useState } from 'react';
import RateChart from './RateChart';
import CryptoTutorialModal from './CryptoTutorialModal';
import SparklesIcon from './icons/SparklesIcon';
import AdvantagesCard from './AdvantagesCard';

const DashboardScreen: React.FC = () => {
  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState(false);

  return (
    <>
      <div className="p-4 sm:p-6">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-6">
            Dashboard
          </h1>
          <div className="space-y-8">
            <RateChart from="USD" to="BRL" />
            <RateChart from="EUR" to="BRL" />
          </div>

          {/* Tutorial and Advantages Section */}
          <div className="mt-8 space-y-4">
            {/* Tutorial Card */}
            <button 
              onClick={() => setIsTutorialModalOpen(true)}
              className="w-full text-left bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all flex items-center space-x-4"
            >
              <div className="bg-blue-100 dark:bg-slate-700 p-3 rounded-full">
                <SparklesIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-grow">
                <h2 className="font-bold text-slate-800 dark:text-slate-100">Aprenda a transferir via Crypto</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Guia para usar Binance ou Bybit.</p>
              </div>
              <div className="flex-shrink-0">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </div>
            </button>

            {/* Advantages Card */}
            <AdvantagesCard />
            
          </div>
        </div>
      </div>

      <CryptoTutorialModal 
        isOpen={isTutorialModalOpen} 
        onClose={() => setIsTutorialModalOpen(false)} 
      />
    </>
  );
};

export default DashboardScreen;