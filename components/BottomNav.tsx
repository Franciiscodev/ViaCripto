
import React from 'react';
import type { Screen } from '../App';
import ChartIcon from './icons/ChartIcon';
import ConverterIcon from './icons/ConverterIcon';
import SettingsIcon from './icons/SettingsIcon';

interface BottomNavProps {
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
}

const NavButton: React.FC<{
  label: string;
  screen: Screen;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => {
  const activeClasses = 'text-blue-600 dark:text-blue-400';
  const inactiveClasses = 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200';

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${isActive ? activeClasses : inactiveClasses}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {icon}
      <span className="text-xs font-medium mt-1">{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, setActiveScreen }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 shadow-t-lg z-50">
      <div className="flex justify-around items-center h-full max-w-md mx-auto">
        <NavButton
          label="Dashboard"
          screen="dashboard"
          icon={<ChartIcon className="w-6 h-6" />}
          isActive={activeScreen === 'dashboard'}
          onClick={() => setActiveScreen('dashboard')}
        />
        <NavButton
          label="Converter"
          screen="converter"
          icon={<ConverterIcon className="w-6 h-6" />}
          isActive={activeScreen === 'converter'}
          onClick={() => setActiveScreen('converter')}
        />
        <NavButton
          label="Ajustes"
          screen="settings"
          icon={<SettingsIcon className="w-6 h-6" />}
          isActive={activeScreen === 'settings'}
          onClick={() => setActiveScreen('settings')}
        />
      </div>
    </nav>
  );
};

export default BottomNav;
