import React, { useState } from 'react';
import type { Provider } from '../types';
import ComparisonSkeleton from './ComparisonSkeleton';
import ProviderDetailsModal from './ProviderDetailsModal';
import ProviderIcon from './icons/ProviderIcon';

interface ComparisonTableProps {
  providers: Provider[];
  isLoading: boolean;
  error: string | null;
  sourceCurrency: string;
  targetCurrency: string;
  sendAmount: number;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({
  providers,
  isLoading,
  error,
  sourceCurrency,
  targetCurrency,
  sendAmount
}) => {
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  if (isLoading) {
    return <ComparisonSkeleton />;
  }

  if (error) {
    return (
      <div className="mt-8 text-center p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">
        <p><strong>Oops!</strong> {error}</p>
      </div>
    );
  }

  if (providers.length === 0 && sendAmount > 0) {
    return (
        <div className="mt-8 text-center p-4 bg-binance-gray border border-binance-light-gray text-binance-text-secondary rounded-lg">
            <p>Nenhuma provedora encontrada para esta combinação.</p>
        </div>
    );
  }

  if (sendAmount <= 0) {
      return null;
  }

  const providersWithCalculations = providers
    .map(provider => {
      const quote = provider.quotes[0];
      const fee = quote?.fee ?? 0;
      const rate = quote?.rate ?? 0;
      const receivedAmount = (sendAmount - fee) * rate;
      
      return { ...provider, calculatedQuote: { fee, rate, receivedAmount } };
    })
    .filter(p => p.calculatedQuote.receivedAmount > 0)
    .sort((a, b) => b.calculatedQuote.receivedAmount - a.calculatedQuote.receivedAmount);

  const bestAmount = providersWithCalculations[0]?.calculatedQuote.receivedAmount ?? 0;

  if (providersWithCalculations.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg sm:text-xl font-bold text-binance-text mb-4">Compare o custo</h2>
      <div className="space-y-3">
        {providersWithCalculations.map((provider, index) => {
          const { receivedAmount, fee, rate } = provider.calculatedQuote;
          const isBest = index === 0;
          const missedOutAmount = bestAmount - receivedAmount;
          const quote = provider.quotes[0]; // For estimatedDelivery

          return (
            <div
              key={provider.id}
              onClick={() => setSelectedProvider(provider)}
              className={`p-4 border rounded-lg bg-binance-gray hover:bg-binance-light-gray/60 hover:shadow-md cursor-pointer transition-all relative ${isBest ? 'border-binance-yellow border-2' : 'border-binance-light-gray'}`}
            >
              {isBest && <div className="text-xs font-bold text-binance-yellow bg-binance-yellow/10 px-2 py-1 rounded-full inline-block mb-2">MELHOR VALOR</div>}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center space-x-4 sm:space-x-6">
                   <ProviderIcon providerName={provider.name} logoUrl={provider.logoUrl} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-contain" />
                  <div>
                    {quote?.estimatedDelivery && <p className="text-xs sm:text-sm text-binance-text-secondary">{quote.estimatedDelivery}</p>}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-base sm:text-lg text-green-500">
                    {receivedAmount.toLocaleString('pt-BR', { style: 'currency', currency: targetCurrency })}
                  </p>
                  {!isBest && missedOutAmount > 0.01 && (
                     <p className="text-xs sm:text-sm text-red-500">
                        - {missedOutAmount.toLocaleString('pt-BR', { style: 'currency', currency: targetCurrency })}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-binance-light-gray/50">
                <p className="text-xs sm:text-sm text-binance-text-secondary text-center">
                  Tarifa: {fee.toLocaleString('pt-BR', { style: 'currency', currency: sourceCurrency })} • Câmbio: {rate.toFixed(4)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      {selectedProvider && (
        <ProviderDetailsModal
          isOpen={!!selectedProvider}
          onClose={() => setSelectedProvider(null)}
          provider={selectedProvider}
          sourceCurrency={sourceCurrency}
          targetCurrency={targetCurrency}
          sendAmount={sendAmount}
        />
      )}
    </div>
  );
};

export default ComparisonTable;