
import React from 'react';
import CurrencyConverter from './CurrencyConverter';

const ConverterScreen: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 flex flex-col items-center justify-center min-h-full">
        <div className="w-full max-w-md mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-slate-800 dark:text-slate-100 mb-2">
            Conversor de Moedas
            </h1>
            <p className="text-center text-slate-500 dark:text-slate-400 mb-6 sm:mb-8">
            Taxas de câmbio em tempo real.
            </p>
            <CurrencyConverter />
        </div>
        <footer className="text-center mt-8 text-slate-400 dark:text-slate-500 text-sm">
            <p>Desenvolvido com React e TypeScript</p>
        </footer>
    </div>
  );
};

export default ConverterScreen;
