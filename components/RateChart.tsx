
import React, { useState, useEffect } from 'react';
import { fetchHistoricalRates } from '../services/geminiService';
import type { HistoricalRates } from '../types';

interface RateChartProps {
  from: string;
  to: string;
}

const ChartSkeleton: React.FC = () => (
    <div className="w-full h-[180px] bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse"></div>
);

const RateChart: React.FC<RateChartProps> = ({ from, to }) => {
  const [data, setData] = useState<HistoricalRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRates = async () => {
      try {
        setLoading(true);
        setError(null);
        const historicalData = await fetchHistoricalRates(from, to);
        setData(historicalData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getRates();
  }, [from, to]);

  const renderChart = () => {
    if (!data?.rates) return null;

    const rates = Object.entries(data.rates)
      .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
      .map(([date, currencyData]) => ({ date, rate: currencyData[to] }));

    if (rates.length < 2) return <p className="text-center text-slate-500">Dados insuficientes para o gráfico.</p>;

    const rateValues = rates.map(r => r.rate);
    const minRate = Math.min(...rateValues);
    const maxRate = Math.max(...rateValues);
    
    const svgWidth = 300;
    const svgHeight = 100;
    const padding = 5;

    const getX = (index: number) => (index / (rates.length - 1)) * (svgWidth - 2 * padding) + padding;
    const getY = (rate: number) => {
        const range = maxRate - minRate;
        if (range === 0) return svgHeight / 2;
        return (svgHeight - 2 * padding) - ((rate - minRate) / range) * (svgHeight - 2 * padding) + padding;
    };
    
    const pathData = rates.map((point, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(point.rate)}`).join(' ');

    const lastRate = rates[rates.length-1].rate;
    const firstRate = rates[0].rate;
    const change = lastRate - firstRate;
    const percentChange = (change / firstRate) * 100;
    const isPositive = change >= 0;

    return (
        <div>
            <div className="flex justify-between items-baseline mb-2">
                <div>
                    <p className="font-bold text-lg text-slate-800 dark:text-slate-100">{from} / {to}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Últimos 30 dias</p>
                </div>
                <div className="text-right">
                    <p className="font-semibold text-slate-700 dark:text-slate-200">{lastRate.toFixed(4)}</p>
                    <p className={`text-sm font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {isPositive ? '+' : ''}{change.toFixed(4)} ({percentChange.toFixed(2)}%)
                    </p>
                </div>
            </div>
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto">
                <path d={pathData} fill="none" stroke="#3b82f6" strokeWidth="2" />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: 'rgba(59, 130, 246, 0.2)' }} />
                        <stop offset="100%" style={{ stopColor: 'rgba(59, 130, 246, 0)' }} />
                    </linearGradient>
                </defs>
                <path d={`${pathData} L ${getX(rates.length - 1)} ${svgHeight} L ${getX(0)} ${svgHeight} Z`} fill="url(#gradient)" />
            </svg>
            <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500 mt-1">
                <span>{rates[0].date}</span>
                <span>{rates[rates.length-1].date}</span>
            </div>
        </div>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
      {loading && <ChartSkeleton />}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!loading && !error && data && renderChart()}
    </div>
  );
};

export default RateChart;
