
import React from 'react';

const PixIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
        <path d="M8.5 4.5l8 8"/>
        <path d="M12 12l6 6"/>
        <path d="M5 8.5l3.5 3.5"/>
        <path d="m19 5-3 3"/>
        <path d="m3.5 13.5 4 4"/>
        <path d="M12 3v2"/>
        <path d="M12 19v2"/>
        <path d="M19 12h2"/>
        <path d="M3 12h2"/>
    </svg>
);

export default PixIcon;
