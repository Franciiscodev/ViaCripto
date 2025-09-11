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
          <h1 className="text-3xl sm:text-4xl font-bold text-binance-text mb-6">
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
              className="w-full text-left bg-binance-gray rounded-xl border border-binance-light-gray p-4 hover:shadow-lg hover:border-binance-yellow/50 transition-all flex items-center space-x-4"
            >
              <div className="bg-binance-dark p-3 rounded-full">
                <SparklesIcon className="w-6 h-6 text-binance-yellow" />
              </div>
              <div className="flex-grow">
                <h2 className="font-bold text-binance-text">Aprenda a transferir via Crypto</h2>
                <p className="text-sm text-binance-text-secondary">Guia para usar Binance ou Bybit.</p>
              </div>
              <div className="flex-shrink-0">
                 <svg xmlns="http://www.w.org/2000/svg" className="h-5 w-5 text-binance-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
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