
export interface Currency {
  code: string;
  name: string;
}

export interface ExchangeRateResponse {
  rate: number;
}

// New types for comparison API
export interface ProviderQuote {
    fee: number;
    rate: number;
    sourceAmount: number;
    targetAmount: number;
    estimatedDelivery: string;
}

export interface Provider {
    id: number;
    name: string;
    logoUrl: string;
    quotes: ProviderQuote[];
}

export interface ComparisonResponse {
    providers: Provider[];
}

// New type for historical rates
export interface HistoricalRates {
  amount: number;
  base: string;
  start_date: string;
  end_date: string;
  rates: {
    [date: string]: {
      [currency: string]: number;
    };
  };
}
