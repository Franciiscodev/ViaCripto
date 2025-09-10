
import React from 'react';

const TradeArrowsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M7 10l5-5 5 5" />
    <path d="M12 19V5" />
    <path d="M17 14l-5 5-5-5" />
  </svg>
);

export default TradeArrowsIcon;
