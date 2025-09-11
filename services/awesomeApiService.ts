export interface TickerData {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
}

export interface TickerResponse {
  [key: string]: TickerData;
}

export const fetchTickerData = async (): Promise<TickerResponse> => {
  const API_URL = 'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL';
  try {
    const response = await fetch(API_URL, { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: TickerResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching ticker data:", error);
    throw new Error("Não foi possível obter as cotações.");
  }
};