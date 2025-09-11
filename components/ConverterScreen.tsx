
import React from 'react';
import CurrencyConverter from './CurrencyConverter';

const ConverterScreen: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 flex flex-col items-center justify-center min-h-full">
        <div className="w-full max-w-md mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-binance-text mb-2">
            Conversor de Moedas
            </h1>
            <p className="text-center text-binance-text-secondary mb-6 sm:mb-8">
            Taxas de câmbio em tempo real.
            </p>
            <CurrencyConverter />
        </div>
        <footer className="text-center mt-8 text-binance-text-secondary text-sm">
            <p>&copy; {new Date().getFullYear()} ViaCripto &bull; Desenvolvido com React e TypeScript</p>
        </footer>
    </div>
  );
};

export default ConverterScreen;