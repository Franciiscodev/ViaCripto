import React, { useState, useEffect, useCallback, useRef } from 'react';
import CurrencyInput from './CurrencyInput';
import { fetchExchangeRate } from '../services/geminiService';
import { fetchComparisonData } from '../services/comparisonService';
import SwapIcon from './icons/SwapIcon';
import ComparisonTable from './ComparisonTable';
import type { Provider } from '../types';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number | string>(1000);
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [convertedAmount, setConvertedAmount] = useState<number | string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [comparisonProviders, setComparisonProviders] = useState<Provider[]>([]);
  const [isComparisonLoading, setIsComparisonLoading] = useState(true);
  const [comparisonError, setComparisonError] = useState<string | null>(null);
  
  const debounceTimeoutRef = useRef<number | null>(null);

  const getRate = useCallback(async (isSilentRefresh = false) => {
    if (fromCurrency === toCurrency) {
      setExchangeRate(1);
      setError(null);
      return;
    }
    if (!isSilentRefresh) {
      setIsLoading(true);
    }
    setError(null);
    try {
      const response = await fetchExchangeRate(fromCurrency, toCurrency);
      setExchangeRate(response.rate);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro desconhecido.');
      setExchangeRate(null);
    } finally {
      if (!isSilentRefresh) {
        setIsLoading(false);
      }
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    // Fetch rate immediately on currency change (with loading indicator)
    getRate(false);

    // Set up an interval to silently refresh the rate every 30 seconds
    const intervalId = setInterval(() => {
      getRate(true);
    }, 30000);

    // Clean up the interval when currencies change or component unmounts
    return () => clearInterval(intervalId);
  }, [getRate]);

  useEffect(() => {
    const numericAmount = Number(amount);
    if (exchangeRate !== null && !isNaN(numericAmount) && numericAmount > 0) {
      const result = numericAmount * exchangeRate;
      setConvertedAmount(result.toFixed(2));
    } else {
      setConvertedAmount('');
    }
  }, [amount, exchangeRate]);
  
  useEffect(() => {
    const getComparison = async () => {
      const numericAmount = Number(amount);
      if (isNaN(numericAmount) || numericAmount <= 0 || fromCurrency === toCurrency || exchangeRate === null) {
        setComparisonProviders([]);
        setIsComparisonLoading(false);
        return;
      }
      
      setIsComparisonLoading(true);
      setComparisonError(null);
      try {
        const response = await fetchComparisonData(fromCurrency, toCurrency, numericAmount);
        
        // Create fictitious providers
        const bybitProvider: Provider = {
          id: -1,
          name: 'Bybit',
          logoUrl: '', // Handled by ProviderIcon
          quotes: [{
            fee: 1,
            rate: exchangeRate,
            sourceAmount: numericAmount,
            targetAmount: (numericAmount - 1) * exchangeRate,
            estimatedDelivery: 'Instantâneo'
          }]
        };
        
        const binanceProvider: Provider = {
          id: -2,
          name: 'Binance',
          logoUrl: '', // Handled by ProviderIcon
          quotes: [{
            fee: 2,
            rate: exchangeRate,
            sourceAmount: numericAmount,
            targetAmount: (numericAmount - 2) * exchangeRate,
            estimatedDelivery: 'Instantâneo'
          }]
        };

        const allProviders = [bybitProvider, binanceProvider, ...response.providers];
        setComparisonProviders(allProviders);
      } catch (err: any) {
        setComparisonError(err.message || 'Ocorreu um erro desconhecido.');
        setComparisonProviders([]);
      } finally {
        setIsComparisonLoading(false);
      }
    };
    
    if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
    }
    
    debounceTimeoutRef.current = window.setTimeout(() => {
        getComparison();
    }, 500);

    return () => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
    };

  }, [amount, fromCurrency, toCurrency, exchangeRate]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  
  const handleAmountChange = (newAmount: string) => {
    setAmount(newAmount);
  };

  return (
    <div className="w-full">
      <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 space-y-4 relative">
        <CurrencyInput
          label="Você envia"
          amount={amount}
          currency={fromCurrency}
          onAmountChange={handleAmountChange}
          onCurrencyChange={setFromCurrency}
        />

        <div className="flex items-center justify-center -my-2">
          <button
            onClick={handleSwapCurrencies}
            className="bg-white border-4 border-slate-100 rounded-full p-2 text-slate-500 hover:text-blue-600 hover:rotate-180 transition-transform duration-300 z-10"
            aria-label="Trocar moedas"
          >
            <SwapIcon />
          </button>
        </div>
        
        <CurrencyInput
          label="Eles recebem (Taxa de Câmbio Média)"
          amount={convertedAmount}
          currency={toCurrency}
          onAmountChange={() => {}} 
          onCurrencyChange={setToCurrency}
          isReadOnly={true}
        />
        
        <div className="pt-4 text-center text-slate-600">
          {isLoading && <p className="animate-pulse">Obtendo a taxa de câmbio...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!isLoading && !error && exchangeRate !== null && (
            <p className="font-semibold text-lg">
              1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
            </p>
          )}
        </div>
      </div>
      
      <ComparisonTable 
          providers={comparisonProviders}
          isLoading={isComparisonLoading}
          error={comparisonError}
          sourceCurrency={fromCurrency}
          targetCurrency={toCurrency}
          sendAmount={Number(amount) || 0}
      />
    </div>
  );
};

export default CurrencyConverter;