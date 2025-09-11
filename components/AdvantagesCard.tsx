import React, { useState, useEffect } from 'react';
import { fetchComparisonData } from '../services/comparisonService';
import { fetchExchangeRate } from '../services/geminiService';
import type { Provider } from '../types';
import ShieldCheckIcon from './icons/ShieldCheckIcon';

const AdvantagesCardSkeleton: React.FC = () => (
    <div className="w-full text-left bg-binance-gray rounded-xl border border-binance-light-gray p-4 flex items-start space-x-4 animate-pulse">
        <div className="bg-binance-light-gray p-3 rounded-full flex-shrink-0">
            <div className="w-6 h-6"></div>
        </div>
        <div className="flex-grow">
            <div className="h-5 w-3/4 bg-binance-light-gray rounded mb-2"></div>
            <div className="h-4 w-full bg-binance-light-gray rounded mt-1"></div>
            <div className="h-4 w-5/6 bg-binance-light-gray rounded mt-1"></div>
        </div>
    </div>
);


const AdvantagesCard: React.FC = () => {
    const [wiseAmount, setWiseAmount] = useState<number | null>(null);
    const [cryptoAmount, setCryptoAmount] = useState<number | null>(null);
    const [wiseTotalFees, setWiseTotalFees] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const SEND_AMOUNT = 1000;
    const FROM_CURRENCY = 'EUR';
    const TO_CURRENCY = 'BRL';
    const IOF_RATE = 0.0038; // 0.38%

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch Wise data
                const comparisonResponse = await fetchComparisonData(FROM_CURRENCY, TO_CURRENCY, SEND_AMOUNT);
                const wiseProvider = comparisonResponse.providers.find(p => p.name.toLowerCase().includes('wise'));

                if (wiseProvider && wiseProvider.quotes[0]) {
                    const wiseQuote = wiseProvider.quotes[0];
                    const receivedBeforeIof = wiseQuote.targetAmount;
                    const iofFee = receivedBeforeIof * IOF_RATE;
                    const finalWiseAmount = receivedBeforeIof - iofFee;
                    const wiseServiceFeeInBrl = wiseQuote.fee * wiseQuote.rate; // Approximate fee in target currency
                    
                    setWiseAmount(finalWiseAmount);
                    setWiseTotalFees(wiseServiceFeeInBrl + iofFee);
                } else {
                     // If Wise is not found, we can't make a comparison
                     throw new Error('Não foi possível obter os dados da Wise para comparação.');
                }
                
                // Fetch Crypto (mid-market) rate
                const rateResponse = await fetchExchangeRate(FROM_CURRENCY, TO_CURRENCY);
                const midMarketRate = rateResponse.rate;
                const finalCryptoAmount = SEND_AMOUNT * midMarketRate;
                setCryptoAmount(finalCryptoAmount);

            } catch (err: any) {
                setError(err.message || 'Erro ao carregar dados de comparação.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatCurrency = (amount: number, currency: string) => {
        return amount.toLocaleString('pt-BR', { style: 'currency', currency: currency, minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    if (loading) {
        return <AdvantagesCardSkeleton />;
    }

    if (error) {
        return (
            <div className="w-full text-left bg-red-500/10 rounded-xl border border-red-500/20 p-4 flex items-start space-x-4">
                <div className="bg-red-500/10 p-3 rounded-full flex-shrink-0">
                    <ShieldCheckIcon className="w-6 h-6 text-red-400" />
                </div>
                <div className="flex-grow">
                    <h2 className="font-bold text-red-300">Erro ao Comparar</h2>
                    <p className="text-sm text-red-400 mt-1">{error}</p>
                </div>
            </div>
        );
    }

    const economy = (cryptoAmount && wiseAmount) ? cryptoAmount - wiseAmount : 0;

    return (
        <div className="w-full text-left bg-binance-gray rounded-xl border border-binance-light-gray p-4 flex items-start space-x-4">
            <div className="bg-green-500/10 p-3 rounded-full flex-shrink-0 mt-1">
                <ShieldCheckIcon className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex-grow">
                <h2 className="font-bold text-binance-text">Economize nas suas transferências</h2>
                <p className="text-sm text-binance-text-secondary mt-1 mb-3">
                    Comparativo para enviar <strong>{formatCurrency(SEND_AMOUNT, FROM_CURRENCY)}</strong> para o Brasil:
                </p>
                
                <div className="text-sm space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-binance-text-secondary">Com a Wise:</span>
                        <div className="text-right">
                           <span className="font-semibold text-binance-text">{wiseAmount ? formatCurrency(wiseAmount, TO_CURRENCY) : '...'}</span>
                           {wiseTotalFees && <p className="text-xs text-red-500">(-{formatCurrency(wiseTotalFees, TO_CURRENCY)} em taxas)</p>}
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-binance-text-secondary">Via Cripto:</span>
                       <div className="text-right">
                         <span className="font-semibold text-binance-text">{cryptoAmount ? formatCurrency(cryptoAmount, TO_CURRENCY) : '...'}</span>
                         <p className="text-xs text-binance-text-secondary">(sem IOF, taxas baixas)</p>
                       </div>
                    </div>

                    {economy > 0 && (
                         <div className="!mt-4 pt-2 border-t border-binance-light-gray flex justify-between items-center">
                            <span className="font-bold text-green-400">Sua economia:</span>
                            <span className="font-bold text-lg text-green-400">{formatCurrency(economy, TO_CURRENCY)}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdvantagesCard;