import type { ComparisonResponse } from '../types';

const API_BASE_URL = 'https://api.wise.com/v3/comparisons';

// A lista de provedores permitidos. Os slugs são geralmente os nomes em minúsculas.
const ALLOWED_PROVIDERS = [
  'wise',
  'remitly',
  'instarem',
  'paypal',
  'moneygram'
].join(',');


export const fetchComparisonData = async (
  from: string,
  to: string,
  amount: number
): Promise<ComparisonResponse> => {
  if (amount <= 0) {
      return { providers: [] };
  }
  
  const url = new URL(API_BASE_URL);
  url.searchParams.append('sourceCurrency', from);
  url.searchParams.append('targetCurrency', to);
  url.searchParams.append('sendAmount', amount.toString());
  url.searchParams.append('providers', ALLOWED_PROVIDERS);

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ComparisonResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching comparison data:", error);
    throw new Error("Não foi possível obter os dados de comparação.");
  }
};
