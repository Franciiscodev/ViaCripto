
import React, { useState, useEffect } from 'react';
import DashboardScreen from './components/DashboardScreen';
import ConverterScreen from './components/ConverterScreen';
import SettingsScreen from './components/SettingsScreen';
import BottomNav from './components/BottomNav';

export type Screen = 'dashboard' | 'converter' | 'settings';
export type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>('dashboard');
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
  }, [theme]);

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'converter':
        return <ConverterScreen />;
      case 'settings':
        return <SettingsScreen currentTheme={theme} setTheme={setTheme} />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div className="font-sans">
      <main className="bg-slate-100 dark:bg-slate-900 min-h-screen w-full pb-24">
        {renderScreen()}
      </main>
      <BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
    </div>
  );
};

export default App;
