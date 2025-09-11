

import React from 'react';
import type { Theme } from '../App';

interface SettingsScreenProps {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ currentTheme, setTheme }) => {
  return (
    <div className="p-4 sm:p-6 text-binance-text">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">Configurações</h1>

        <div className="space-y-6">
          {/* Theme Selector */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Tema</h2>
            <div className="flex space-x-2 bg-binance-dark p-1 rounded-lg">
              <button
                onClick={() => setTheme('light')}
                className={`w-full py-2 px-4 rounded-md text-sm font-bold transition-colors ${
                  currentTheme === 'light' ? 'bg-slate-200 text-slate-900 shadow' : 'text-binance-text-secondary'
                }`}
              >
                Claro
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`w-full py-2 px-4 rounded-md text-sm font-bold transition-colors ${
                  currentTheme === 'dark' ? 'bg-binance-yellow text-black shadow' : 'text-binance-text-secondary'
                }`}
              >
                Escuro
              </button>
            </div>
          </div>

          {/* Placeholder: About */}
          <div className="opacity-50">
            <h2 className="text-lg font-semibold mb-3">Sobre</h2>
            <div className="bg-binance-gray p-4 rounded-lg text-center">
                <p className="text-binance-text-secondary">Informações do desenvolvedor (Em breve)</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;