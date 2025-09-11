
import React from 'react';
import CloseIcon from './icons/CloseIcon';
import BankIcon from './icons/BankIcon';
import TradeArrowsIcon from './icons/TradeArrowsIcon';
import UsdtIcon from './icons/UsdtIcon';
import PixIcon from './icons/PixIcon';

interface CryptoTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TutorialStep: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 bg-binance-dark text-binance-yellow rounded-full p-3">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-md sm:text-lg text-binance-text">{title}</h3>
        <p className="text-sm sm:text-base text-binance-text-secondary">{description}</p>
      </div>
    </div>
  );
};

const CryptoTutorialModal: React.FC<CryptoTutorialModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-binance-gray rounded-2xl shadow-xl w-full max-w-lg p-6 sm:p-8 relative border border-binance-light-gray"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-binance-text-secondary hover:text-binance-text transition-colors"
          aria-label="Fechar"
        >
          <CloseIcon className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-binance-text">Como Enviar Dinheiro com Cripto</h2>
          <p className="text-sm text-binance-text-secondary mt-1">
            Usando Bybit ou Binance para converter EUR para BRL.
          </p>
        </div>

        <div className="space-y-6 relative">
          {/* Dotted line connecting steps */}
          <div className="absolute left-6 top-8 bottom-8 w-px bg-binance-light-gray border-l-2 border-dashed"></div>

          <TutorialStep
            icon={<BankIcon className="w-6 h-6" />}
            title="1. Deposite Euros (EUR)"
            description="Transfira Euros da sua conta bancária para a corretora (Bybit/Binance) usando o IBAN fornecido por eles."
          />
          <TutorialStep
            icon={<TradeArrowsIcon className="w-6 h-6" />}
            title="2. Compre USDT com EUR"
            description="Na corretora, encontre o par de moedas EUR/USDT e execute uma ordem de compra (trade) para converter seus Euros em USDT (uma criptomoeda estável)."
          />
          <TutorialStep
            icon={<UsdtIcon className="w-6 h-6" />}
            title="3. Compre Reais (BRL) com USDT"
            description="Agora, encontre o par de moedas USDT/BRL e execute outra ordem de compra para converter seus USDT em Reais."
          />
           <TutorialStep
            icon={<PixIcon className="w-6 h-6" />}
            title="4. Saque os Reais (BRL) via PIX"
            description="Com o saldo em Reais na corretora, solicite um saque para sua conta bancária brasileira utilizando a opção de transferência via PIX."
          />
        </div>

        <div className="mt-8 text-center">
            <button 
              onClick={onClose}
              className="w-full sm:w-auto bg-binance-yellow text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-binance-yellow focus:ring-opacity-50 transition-colors"
            >
                Entendi
            </button>
        </div>
      </div>
    </div>
  );
};

export default CryptoTutorialModal;