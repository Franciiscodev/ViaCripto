import React from 'react';
import BybitIcon from './BybitIcon';
import BinanceIcon from './BinanceIcon';
import WiseIcon from './WiseIcon';
import RemitlyIcon from './RemitlyIcon';
import InstaremIcon from './InstaremIcon';
import PaypalIcon from './PaypalIcon';
import MoneygramIcon from './MoneygramIcon';

interface ProviderIconProps {
  providerName: string;
  logoUrl: string;
  className?: string;
}

const ProviderIcon: React.FC<ProviderIconProps> = ({ providerName, logoUrl, className }) => {
  const name = providerName.toLowerCase();

  if (name.includes('bybit')) {
    return <BybitIcon className={className} />;
  }
  if (name.includes('binance')) {
    return <BinanceIcon className={className} />;
  }
  if (name.includes('wise')) {
    return <WiseIcon className={className} />;
  }
  if (name.includes('remitly')) {
    return <RemitlyIcon className={className} />;
  }
  if (name.includes('instarem')) {
    return <InstaremIcon className={className} />;
  }
  if (name.includes('paypal')) {
    return <PaypalIcon className={className} />;
  }
  if (name.includes('moneygram')) {
    return <MoneygramIcon className={className} />;
  }

  // Fallback para outros provedores (caso a API retorne algum inesperado)
  return <img src={logoUrl} alt={`${providerName} logo`} className={className} />;
};

export default ProviderIcon;
