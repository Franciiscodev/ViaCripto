import React from 'react';
import { CURRENCIES } from '../constants';
import type { Currency } from '../types';

interface CurrencyInputProps {
  label: string;
  amount: number | string;
  currency: string;
  onAmountChange: (value: string) => void;
  onCurrencyChange: (currencyCode: string) => void;
  isReadOnly?: boolean;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  label,
  amount,
  currency,
  onAmountChange,
  onCurrencyChange,
  isReadOnly = false,
}) => {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and a single decimal point.
    // This regex prevents multiple decimal points and non-numeric characters (except the first dot).
    if (/^[0-9]*\.?[0-9]*$/.test(value)) {
      onAmountChange(value);
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 w-full">
      <label className="text-sm text-slate-500 block mb-2">{label}</label>
      <div className="flex items-center space-x-4">
        <input
          type="text" // Using text for better control over value and to avoid number input spinners
          inputMode="decimal" // This brings up the numeric keyboard on mobile devices
          pattern="[0-9]*\.?[0-9]*" // Helps with validation and further hints numeric input
          value={amount}
          onChange={handleAmountChange}
          readOnly={isReadOnly}
          className={`w-full text-2xl sm:text-3xl font-bold text-slate-800 bg-transparent focus:outline-none ${isReadOnly ? 'cursor-default' : ''}`}
          placeholder="0"
          autoComplete="off"
        />
        <div className="h-8 w-px bg-slate-200"></div>
        <select
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className="bg-transparent text-lg sm:text-xl font-semibold text-slate-800 focus:outline-none cursor-pointer"
        >
          {CURRENCIES.map((c: Currency) => (
            <option key={c.code} value={c.code}>
              {c.code}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CurrencyInput;