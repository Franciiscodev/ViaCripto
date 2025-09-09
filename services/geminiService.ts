
import type { ExchangeRateResponse, HistoricalRates } from '../types';

// The FrankFurter API response structure
interface FrankfurterResponse {
  amount: number;
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
}

export const fetchExchangeRate = async (from: string, to: string): Promise<ExchangeRateResponse> => {
  if (from === to) {
    return { rate: 1 };
  }

  const apiUrl = `https://api.frankfurter.app/latest?from=${from}&to=${to}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data: FrankfurterResponse = await response.json();
    
    const rate = data.rates[to];

    if (typeof rate === 'number' && !isNaN(rate)) {
      return { rate };
    } else {
      throw new Error(`Não foi possível obter a taxa para o par ${from}-${to}.`);
    }

  } catch (error: any) {
    console.error("Error fetching exchange rate from Frankfurter API:", error);
    // Re-throw a user-friendly message
    throw new Error("Não foi possível obter a taxa de câmbio. Tente novamente.");
  }
};


export const fetchHistoricalRates = async (from: string, to: string, days = 30): Promise<HistoricalRates> => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const apiUrl = `https://api.frankfurter.app/${formatDate(startDate)}..${formatDate(endDate)}?from=${from}&to=${to}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const data: HistoricalRates = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching historical rates from Frankfurter API:", error);
    throw new Error("Não foi possível obter o histórico de taxas.");
  }
};
