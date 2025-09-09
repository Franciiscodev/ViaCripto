import React from 'react';
import type { Provider } from '../types';
import CloseIcon from './icons/CloseIcon';
import ProviderIcon from './icons/ProviderIcon';

interface ProviderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: Provider;
  sourceCurrency: string;
  targetCurrency: string;
  sendAmount: number;
}

const ProviderDetailsModal: React.FC<ProviderDetailsModalProps> = ({
  isOpen,
  onClose,
  provider,
  sourceCurrency,
  targetCurrency,
  sendAmount,
}) => {
  if (!isOpen) {
    return null;
  }
  
  const quote = provider.quotes[0];
  const fee = quote?.fee ?? 0;
  const rate = quote?.rate ?? 0;

  const amountToConvert = sendAmount - fee;
  const receivedAmount = amountToConvert * rate;
  
  const formatCurrency = (amount: number, currency: string) => {
    return (amount ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: currency });
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Fechar"
        >
          <CloseIcon />
        </button>
        
        <div className="flex items-center space-x-3 sm:space-x-4 mb-6">
          <ProviderIcon providerName={provider.name} logoUrl={provider.logoUrl} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-contain" />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">{provider.name}</h2>
            <p className="text-sm text-slate-500">Detalhes da transferência</p>
          </div>
        </div>

        <div className="space-y-3 text-slate-700">
          <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
            <span className="font-medium">Você envia</span>
            <span className="font-bold">{formatCurrency(sendAmount, sourceCurrency)}</span>
          </div>
          <div className="flex justify-between items-center p-3">
            <span className="font-medium">Taxa de serviço</span>
            <span className="font-bold text-red-600">- {formatCurrency(fee, sourceCurrency)}</span>
          </div>
           <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
            <span className="font-medium">Valor a converter</span>
            <span className="font-bold">{formatCurrency(amountToConvert, sourceCurrency)}</span>
          </div>
          <div className="flex justify-between items-center p-3">
            <span className="font-medium">Taxa de câmbio</span>
            <span className="font-bold">{(rate ?? 0).toFixed(5)}</span>
          </div>
          <div className="flex justify-between items-center p-3 border-t border-slate-200 mt-2 pt-4">
            <span className="font-medium text-lg">Eles recebem</span>
            <span className="font-bold text-lg text-green-600">{formatCurrency(receivedAmount, targetCurrency)}</span>
          </div>
        </div>
        
        {quote?.estimatedDelivery && (
          <div className="mt-6 text-center text-sm text-slate-500">
              <p>Estimativa de entrega: <span className="font-medium">{quote.estimatedDelivery}</span></p>
          </div>
        )}

        <div className="mt-8">
            <button className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors">
                Enviar Dinheiro
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetailsModal;
