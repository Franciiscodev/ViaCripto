
import React, { useState, useEffect } from 'react';
import { fetchTickerData, TickerResponse } from '../services/awesomeApiService';

const TickerSkeleton: React.FC = () => (
    <div className="bg-binance-gray p-4 rounded-lg space-y-3 animate-pulse border border-binance-light-gray">
        <div className="flex justify-between items-center">
            <div className="h-5 w-20 bg-binance-light-gray rounded"></div>
            <div className="h-5 w-24 bg-binance-light-gray rounded"></div>
            <div className="h-5 w-16 bg-binance-light-gray rounded"></div>
        </div>
        <div className="flex justify-between items-center">
            <div className="h-5 w-20 bg-binance-light-gray rounded"></div>
            <div className="h-5 w-24 bg-binance-light-gray rounded"></div>
            <div className="h-5 w-16 bg-binance-light-gray rounded"></div>
        </div>
    </div>
);

const TickerWidget: React.FC = () => {
    const [tickers, setTickers] = useState<TickerResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const data = await fetchTickerData();
            setTickers(data);
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); // Initial fetch
        const intervalId = setInterval(fetchData, 30000); // Refresh every 30 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    if (loading) {
        return <TickerSkeleton />;
    }

    if (error) {
        return (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg text-center">
                <p>{error}</p>
            </div>
        );
    }
    
    const tickerList = tickers ? Object.values(tickers) : [];

    return (
        <div className="bg-binance-gray p-4 rounded-lg border border-binance-light-gray">
            <div className="space-y-3">
            {tickerList.length > 0 ? tickerList.map(ticker => {
                const isPositive = parseFloat(ticker.pctChange) >= 0;
                const price = parseFloat(ticker.bid).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                return (
                    <div key={ticker.code} className="flex justify-between items-center text-sm sm:text-base">
                        <span className="font-bold text-binance-text">{ticker.code}/BRL</span>
                        <span className="font-semibold text-binance-text">{price}</span>
                        <span className={`font-bold tabular-nums ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                            {isPositive ? '+' : ''}{parseFloat(ticker.pctChange).toFixed(2)}%
                        </span>
                    </div>
                );
            }) : <p className="text-binance-text-secondary text-center">Nenhuma cotação disponível.</p>}
            </div>
             <p className="text-xs text-binance-text-secondary text-right mt-3">
                Fonte: AwesomeAPI
            </p>
        </div>
    );
};

export default TickerWidget;
